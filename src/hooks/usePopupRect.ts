import type { AnyAction } from "@reduxjs/toolkit";
import { useCallback, useReducer } from "react";

export interface PopupRectState {
  hidden: boolean;
  width: number | string;
  height: number | string;
  left: number;
  top: number;
}

interface UsePopupRectReturn {
  popupRectState: PopupRectState;
  showPopup: () => void;
  hidePopup: () => void;
  setWidth: (width: number | string) => void;
  setHeight: (height: number | string) => void;
  setLeft: (left: number) => void;
  setTop: (top: number) => void;
  resetSize: () => void;
  resetOffset: () => void;
  reset: () => void;
}

const INITIAL_POPUP_RECT_STATE: PopupRectState = {
  hidden: true,
  width: "auto",
  height: "auto",
  left: 0,
  top: 0,
};

const SHOW_POPUP_ACTION = "showPopup";
const HIDE_POPUP_ACTION = "hidePopup";
const SET_WIDTH_ACTION = "setWidth";
const SET_HEIGHT_ACTION = "setHeight";
const SET_LEFT_ACTION = "setLeft";
const SET_TOP_ACTION = "setTop";
const RESET_SIZE_ACTION = "resetSize";
const RESET_OFFSET_ACTION = "resetOffset";
const RESET_ACTION = "reset";

const reducer = (
  prevState: PopupRectState,
  { type, payload }: AnyAction,
): PopupRectState => {
  switch (type) {
    case SHOW_POPUP_ACTION:
      return { ...prevState, hidden: false };

    case HIDE_POPUP_ACTION:
      return { ...prevState, hidden: true };

    case SET_WIDTH_ACTION:
      return { ...prevState, width: payload };

    case SET_HEIGHT_ACTION:
      return { ...prevState, height: payload };

    case SET_LEFT_ACTION:
      return { ...prevState, left: payload };

    case SET_TOP_ACTION:
      return { ...prevState, top: payload };

    case RESET_SIZE_ACTION:
      return {
        ...prevState,
        width: INITIAL_POPUP_RECT_STATE.width,
        height: INITIAL_POPUP_RECT_STATE.height,
      };

    case RESET_OFFSET_ACTION:
      return {
        ...prevState,
        left: INITIAL_POPUP_RECT_STATE.left,
        top: INITIAL_POPUP_RECT_STATE.top,
      };

    case RESET_ACTION:
      return { ...INITIAL_POPUP_RECT_STATE };

    default:
      return prevState;
  }
};

export const usePopupRect = (): UsePopupRectReturn => {
  const [popupRectState, dispatch] = useReducer(
    reducer,
    INITIAL_POPUP_RECT_STATE,
  );

  const showPopup = useCallback(
    (): void => dispatch({ type: SHOW_POPUP_ACTION }),
    [],
  );

  const hidePopup = useCallback(
    (): void => dispatch({ type: HIDE_POPUP_ACTION }),
    [],
  );

  const setWidth = useCallback(
    (width: number | string): void =>
      dispatch({ type: SET_WIDTH_ACTION, payload: width }),
    [],
  );

  const setHeight = useCallback(
    (height: number | string): void =>
      dispatch({ type: SET_HEIGHT_ACTION, payload: height }),
    [],
  );

  const setLeft = useCallback(
    (left: number): void => dispatch({ type: SET_LEFT_ACTION, payload: left }),
    [],
  );

  const setTop = useCallback(
    (top: number): void => dispatch({ type: SET_TOP_ACTION, payload: top }),
    [],
  );

  const resetSize = useCallback(
    (): void => dispatch({ type: RESET_SIZE_ACTION }),
    [],
  );

  const resetOffset = useCallback(
    (): void => dispatch({ type: RESET_OFFSET_ACTION }),
    [],
  );

  const reset = useCallback((): void => dispatch({ type: RESET_ACTION }), []);

  return {
    popupRectState,
    showPopup,
    hidePopup,
    setWidth,
    setHeight,
    setLeft,
    setTop,
    resetSize,
    resetOffset,
    reset,
  };
};
