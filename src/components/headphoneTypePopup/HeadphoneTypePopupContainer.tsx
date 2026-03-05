import type { PopupRectState } from "../../hooks/usePopupRect";
import { useSelector } from "react-redux";
import type { GlobalState } from "../../redux/store";
import {
  selectHeadphoneById,
  type Headphone,
} from "../../redux/slices/headphones/slice";
import HeadphoneTypePopup from "./HeadphoneTypePopup";

interface HeadphoneTypePopupContainerProps {
  headphoneId: Headphone["id"];
  popupRect: Omit<PopupRectState, "hidden">;
}

export default function HeadphoneTypePopupContainer({
  headphoneId,
  popupRect,
}: HeadphoneTypePopupContainerProps) {
  const headphone = useSelector((state: GlobalState): Headphone | undefined =>
    selectHeadphoneById(state, headphoneId),
  );

  const { type: headphoneType } = headphone || {};

  return headphoneType ? (
    <HeadphoneTypePopup headphoneType={headphoneType} popupRect={popupRect} />
  ) : null;
}
