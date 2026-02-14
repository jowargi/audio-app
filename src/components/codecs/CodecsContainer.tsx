import { useParams } from "react-router-dom";
import { useRequest } from "../../redux/hooks/useRequest";
import { getCodecsByHeadphoneId } from "../../redux/slices/codecs/getCodecsByHeadphoneId";
import {
  selectCodecsIdsByHeadphoneId,
  selectFetchByHeadphoneIdError,
  type Codec,
} from "../../redux/slices/codecs/slice";
import { useSelector } from "react-redux";
import type { GlobalState } from "../../redux/store";
import {
  REQUEST_STATUS_IDLE,
  REQUEST_STATUS_PENDING,
  REQUEST_STATUS_REJECTED,
} from "../../redux/constants/requestStatuses";
import ErrorFallback from "../errorFallback/ErrorFallback";
import Codecs from "./Codecs";
import type { Headphone } from "../../redux/slices/headphones/slice";
import CodecsSkeleton from "../../skeletons/codecs/CodecsSkeleton";

export default function CodecsContainer() {
  const { headphoneId } = useParams();

  const requestStatus = useRequest<Codec[], Headphone["id"]>({
    thunk: getCodecsByHeadphoneId,
    thunkArg: headphoneId,
  });

  const codecsIds = useSelector(
    (state: GlobalState): Codec["id"][] | undefined =>
      selectCodecsIdsByHeadphoneId(state, headphoneId),
  );

  const fetchByHeadphoneIdError = useSelector(selectFetchByHeadphoneIdError);

  if (requestStatus === REQUEST_STATUS_IDLE) return null;

  if (requestStatus === REQUEST_STATUS_PENDING) return <CodecsSkeleton />;

  if (
    requestStatus === REQUEST_STATUS_REJECTED &&
    fetchByHeadphoneIdError?.name !== "ConditionError"
  )
    return (
      <ErrorFallback
        name={fetchByHeadphoneIdError?.name}
        message={fetchByHeadphoneIdError?.message}
      />
    );

  return codecsIds?.length ? <Codecs codecsIds={codecsIds} /> : null;
}
