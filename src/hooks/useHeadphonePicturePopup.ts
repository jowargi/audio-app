import {
  useCallback,
  useEffect,
  type PointerEvent,
  type RefObject,
} from "react";
import { usePopup } from "./usePopup";
import type { PopupRectState } from "./usePopupRect";
import { HoverIntent } from "../hoverIntent/HoverIntent";

interface GetElementPageOffsetReturn {
  left: number;
  top: number;
}

interface UseHeadphonePicturePopupReturn {
  popupRectState: PopupRectState;
  onPointerCancel: (event: PointerEvent) => void;
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

export const useHeadphonePicturePopup = (
  imgRef: RefObject<HTMLImageElement>,
): UseHeadphonePicturePopupReturn => {
  const { popupRectState, addPopup, removePopup } = usePopup();

  const onPointerCancel = useCallback(
    (event: PointerEvent): void => {
      event.stopPropagation();

      removePopup();
    },
    [removePopup],
  );

  useEffect((): (() => void) => {
    const over = (): void => {
      const target = imgRef.current;
      const targetPageOffset = getElementPageOffset(target);

      const popupWidth =
        10 * parseFloat(getComputedStyle(document.documentElement).fontSize);
      const popupLeft =
        targetPageOffset.left + target.offsetWidth / 2 - popupWidth / 2;
      const popupTop = targetPageOffset.top + target.offsetHeight + 5;

      addPopup({ popupWidth, popupLeft, popupTop });
    };

    const out = (): void => {
      removePopup();
    };

    const hoverIntent = new HoverIntent({ element: imgRef.current, over, out });

    return (): void => {
      hoverIntent.destroy();
    };
  }, [imgRef, addPopup, removePopup]);

  return {
    popupRectState,
    onPointerCancel,
  };
};
