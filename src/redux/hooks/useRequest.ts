import { useDispatch, useSelector } from "react-redux";
import type { GlobalDispatch, GlobalState } from "../store";
import type { AsyncThunk, AsyncThunkConfig } from "@reduxjs/toolkit";
import { useEffect, useState } from "react";
import { deleteRequestById, selectStatus } from "../slices/requests/slice";
import type { RequestStatus } from "../constants/requestStatuses";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
interface Request extends Promise<any> {
  requestId: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [extraProps: string]: any;
}

export const useRequest = <Returned, ThunkArg = void>({
  thunk,
  thunkArg,
  abortAfterMs,
}: {
  thunk: AsyncThunk<Returned, ThunkArg, AsyncThunkConfig>;
  thunkArg?: ThunkArg;
  abortAfterMs?: number;
}) => {
  const [request, setRequest] = useState<Request | undefined>(undefined);

  const dispatch = useDispatch<GlobalDispatch>();

  const requestStatus = useSelector(
    (state: GlobalState): RequestStatus =>
      selectStatus(state, request?.requestId),
  );

  useEffect(() => {
    const request = dispatch(thunk(thunkArg as ThunkArg & undefined));

    setRequest(request);

    let timeout: number | undefined;

    if (abortAfterMs !== undefined) {
      timeout = setTimeout(() => request.abort(), abortAfterMs);
    }

    return () => {
      request.abort();

      setRequest(undefined);

      dispatch(deleteRequestById(request.requestId));

      if (timeout !== undefined) clearTimeout(timeout);
    };
  }, [thunk, thunkArg, abortAfterMs, dispatch]);

  return requestStatus;
};
