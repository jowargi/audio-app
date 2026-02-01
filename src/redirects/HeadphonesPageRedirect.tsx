import { Navigate, Outlet, useParams } from "react-router-dom";
import { useRequest } from "../redux/hooks/useRequest";
import { getHeadphones } from "../redux/slices/headphones/getHeadphones";
import {
  selectFetchAllError,
  selectHeadphonesIds,
  type Headphone,
} from "../redux/slices/headphones/slice";
import { useSelector } from "react-redux";
import {
  REQUEST_STATUS_IDLE,
  REQUEST_STATUS_PENDING,
  REQUEST_STATUS_REJECTED,
} from "../redux/constants/requestStatuses";
import Spinner from "../components/spinner/Spinner";
import ErrorFallback from "../components/errorFallback/ErrorFallback";

export default function HeadphonesPageRedirect() {
  const { headphoneId } = useParams();

  const requestStatus = useRequest<Headphone[]>({ thunk: getHeadphones });

  const headphonesIds = useSelector(selectHeadphonesIds);
  const fetchAllError = useSelector(selectFetchAllError);

  if (requestStatus === REQUEST_STATUS_IDLE) return null;

  if (requestStatus === REQUEST_STATUS_PENDING) return <Spinner />;

  if (
    requestStatus === REQUEST_STATUS_REJECTED &&
    fetchAllError?.name !== "ConditionError"
  )
    return (
      <ErrorFallback
        name={fetchAllError?.name}
        message={fetchAllError?.message}
      />
    );

  if (headphoneId) return <Outlet />;

  console.log(headphonesIds);

  return <Navigate to={`/headphones/${headphonesIds[0]}`} replace />;
}
