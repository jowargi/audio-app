import { useRef } from "react";
import type { Headphone } from "../../redux/slices/headphones/slice";
import RouterLink from "../routerLink/RouterLink";
import { useHeadphoneLinkPopup } from "../../hooks/useHeadphoneLinkPopup";
import HeadphoneTypePopupContainer from "../headphoneTypePopup/HeadphoneTypePopupContainer";

interface HeadphoneLinkProps {
  headphoneId: Headphone["id"];
  headphoneName: Headphone["name"];
}

export default function HeadphoneLink({
  headphoneId,
  headphoneName,
}: HeadphoneLinkProps) {
  const linkRef = useRef<HTMLAnchorElement>(null!);

  const { popupRectState, onPointerCancel, onClick } =
    useHeadphoneLinkPopup(linkRef);

  return (
    <>
      <RouterLink
        to={`/headphones/${headphoneId}`}
        ref={linkRef}
        onPointerCancel={onPointerCancel}
        onClick={onClick}
      >
        {headphoneName}
      </RouterLink>
      {!popupRectState.hidden && (
        <HeadphoneTypePopupContainer
          headphoneId={headphoneId}
          popupRect={{
            width: popupRectState.width,
            height: popupRectState.height,
            left: popupRectState.left,
            top: popupRectState.top,
          }}
        />
      )}
    </>
  );
}
