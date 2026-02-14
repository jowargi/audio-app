import { useParams } from "react-router-dom";
import { useRequest } from "../../redux/hooks/useRequest";
import { getHeadphoneImageById } from "../../redux/slices/headphonesImages/getHeadphoneImageById";
import {
  selectFetchByIdError,
  selectHeadphoneImageById,
  type HeadphoneImage,
} from "../../redux/slices/headphonesImages/slice";
import type { Headphone } from "../../redux/slices/headphones/slice";
import { useSelector } from "react-redux";
import type { GlobalState } from "../../redux/store";
import {
  REQUEST_STATUS_IDLE,
  REQUEST_STATUS_PENDING,
  REQUEST_STATUS_REJECTED,
} from "../../redux/constants/requestStatuses";
import ErrorFallback from "../errorFallback/ErrorFallback";
import HeadphonePicture from "./HeadphonePicture";
import HeadphonePictureSkeleton from "../../skeletons/headphonePicture/headphonePictureSkeleton";

export default function HeadphonePictureContainer() {
  const { headphoneId } = useParams();

  const requestStatus = useRequest<HeadphoneImage, Headphone["id"]>({
    thunk: getHeadphoneImageById,
    thunkArg: headphoneId,
  });

  const headphoneImage = useSelector(
    (state: GlobalState): HeadphoneImage | undefined =>
      selectHeadphoneImageById(state, headphoneId),
  );

  const fetchByIdError = useSelector(selectFetchByIdError);

  if (requestStatus === REQUEST_STATUS_IDLE) return null;

  if (requestStatus === REQUEST_STATUS_PENDING)
    return <HeadphonePictureSkeleton />;

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

  return headphoneImage ? (
    <HeadphonePicture headphoneImage={headphoneImage} />
  ) : null;
}
