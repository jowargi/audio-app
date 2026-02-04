import { useSelector } from "react-redux";
import { useRequest } from "../../redux/hooks/useRequest";
import { getHeadphoneById } from "../../redux/slices/headphones/getHeadphoneById";
import {
  selectFetchByIdError,
  selectHeadphoneById,
  type Headphone,
} from "../../redux/slices/headphones/slice";
import type { GlobalState } from "../../redux/store";
import {
  REQUEST_STATUS_IDLE,
  REQUEST_STATUS_PENDING,
  REQUEST_STATUS_REJECTED,
} from "../../redux/constants/requestStatuses";
import Spinner from "../spinner/Spinner";
import ErrorFallback from "../errorFallback/ErrorFallback";
import HeadphoneCard from "./HeadphoneCard";

export default function HeadphoneCardContainer({
  headphoneId,
}: {
  headphoneId: Headphone["id"];
}) {
  const requestStatus = useRequest<Headphone, Headphone["id"]>({
    thunk: getHeadphoneById,
    thunkArg: headphoneId,
  });

  const headphone = useSelector((state: GlobalState): Headphone | undefined =>
    selectHeadphoneById(state, headphoneId),
  );

  const fetchByIdError = useSelector(selectFetchByIdError);

  if (requestStatus === REQUEST_STATUS_IDLE) return null;

  if (requestStatus === REQUEST_STATUS_PENDING) return <Spinner />;

  if (
    requestStatus === REQUEST_STATUS_REJECTED &&
    fetchByIdError?.name !== "ConditionError"
  )
    return (
      <ErrorFallback
        name={fetchByIdError?.name}
        message={fetchByIdError?.message}
      />
    );

  const { name: headphoneName } = headphone || {};

  return headphoneName ? <HeadphoneCard headphoneName={headphoneName} /> : null;
}
