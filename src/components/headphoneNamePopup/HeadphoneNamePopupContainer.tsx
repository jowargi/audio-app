import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import type { GlobalState } from "../../redux/store";
import {
  selectHeadphoneById,
  type Headphone,
} from "../../redux/slices/headphones/slice";
import HeadphoneNamePopup from "./HeadphoneNamePopup";

export default function HeadphoneNamePopupContainer() {
  const { headphoneId } = useParams();

  const headphone = useSelector((state: GlobalState): Headphone | undefined =>
    selectHeadphoneById(state, headphoneId),
  );

  const { name: headphoneName } = headphone || {};

  return headphoneName ? (
    <HeadphoneNamePopup headphoneName={headphoneName} />
  ) : null;
}
