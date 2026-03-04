import { useCallback, useEffect, useRef } from "react";
import { usePopupRect, type PopupRectState } from "./usePopupRect";

interface AddPopupParams {
  popupWidth?: PopupRectState["width"];
  popupHeight?: PopupRectState["height"];
  popupLeft?: PopupRectState["left"];
  popupTop?: PopupRectState["top"];
}

interface UsePopupReturn {
  popupRectState: PopupRectState;
  addPopup: ({
    popupWidth,
    popupHeight,
    popupLeft,
    popupTop,
  }: AddPopupParams) => void;
  removePopup: () => void;
}

export const usePopup = (): UsePopupReturn => {
  const {
    popupRectState,
    showPopup,
    setWidth,
    setHeight,
    setLeft,
    setTop,
    reset,
  } = usePopupRect();

  const isPopupHiddenRef = useRef<boolean>(null!);

  isPopupHiddenRef.current = popupRectState.hidden;

  const addPopup = useCallback(
    ({
      popupWidth,
      popupHeight,
      popupLeft,
      popupTop,
    }: AddPopupParams): void => {
      if (!isPopupHiddenRef.current) return;

      showPopup();

      if (popupWidth !== undefined) setWidth(popupWidth);

      if (popupHeight !== undefined) setHeight(popupHeight);

      if (popupLeft !== undefined) setLeft(popupLeft);

      if (popupTop !== undefined) setTop(popupTop);
    },
    [showPopup, setWidth, setHeight, setLeft, setTop],
  );

  const removePopup = useCallback((): void => {
    if (isPopupHiddenRef.current) return;

    reset();
  }, [reset]);

  useEffect((): (() => void) => (): void => removePopup(), [removePopup]);

  return { popupRectState, addPopup, removePopup };
};
