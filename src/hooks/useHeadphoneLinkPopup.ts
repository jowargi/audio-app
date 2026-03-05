import { useCallback, useEffect, type RefObject } from "react";
import { usePopup } from "./usePopup";
import type { PopupRectState } from "./usePopupRect";
import { HoverIntent } from "../hoverIntent/HoverIntent";

interface UseHeadphoneLinkPopupReturn {
  popupRectState: PopupRectState;
  onPointerCancel: () => void;
  onClick: () => void;
}

interface GetElementPageOffsetReturn {
  left: number;
  top: number;
}

const getElementPageOffset = (
  element: HTMLElement,
): GetElementPageOffsetReturn => {
  const rect = element.getBoundingClientRect();

  return {
    left: rect.left + window.pageXOffset,
    top: rect.top + window.pageYOffset,
  };
};

export const useHeadphoneLinkPopup = (
  linkRef: RefObject<HTMLAnchorElement>,
): UseHeadphoneLinkPopupReturn => {
  const { popupRectState, addPopup, removePopup } = usePopup();

  const onPointerCancel = useCallback((): void => removePopup(), [removePopup]);
  const onClick = useCallback((): void => removePopup(), [removePopup]);

  useEffect((): (() => void) => {
    const over = (): void => {
      const target = linkRef.current;
      const targetPageOffset = getElementPageOffset(target);

      const popupWidth =
        5 * parseFloat(getComputedStyle(document.documentElement).fontSize);
      const popupLeft =
        targetPageOffset.left + target.offsetWidth / 2 - popupWidth / 2;
      const popupTop = targetPageOffset.top + target.offsetHeight + 5;

      addPopup({ popupWidth, popupLeft, popupTop });
    };

    const out = (): void => {
      removePopup();
    };

    const hoverIntent = new HoverIntent({
      element: linkRef.current,
      over,
      out,
    });

    return (): void => {
      hoverIntent.destroy();
    };
  }, [linkRef, addPopup, removePopup]);

  return { popupRectState, onPointerCancel, onClick };
};
