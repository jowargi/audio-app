import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import type { GlobalState } from "../../redux/store";
import {
  selectHeadphoneById,
  type Headphone,
} from "../../redux/slices/headphones/slice";
import InfoPage from "./InfoPage";

export default function InfoPageContainer() {
  const { headphoneId } = useParams();

  const headphone = useSelector((state: GlobalState): Headphone | undefined =>
    selectHeadphoneById(state, headphoneId),
  );

  if (!headphone) return null;

  const {
    name: headphoneName,
    type: headphoneType,
    maxVolume: headphoneMaxVolume,
    brand: headphoneBrand,
  }: Headphone = headphone;

  return (
    <InfoPage
      headphoneName={headphoneName}
      headphoneType={headphoneType}
      headphoneMaxVolume={headphoneMaxVolume}
      headphoneBrand={headphoneBrand}
    />
  );
}
