import {
  createContext,
  useCallback,
  useContext,
  useRef,
  type DragEvent,
} from "react";
import { useImageURL } from "../../hooks/useImageURL";
import type { HeadphoneImage } from "../../redux/slices/headphonesImages/slice";
import { useThemeColorContext } from "../themeColorContextProvider/ThemeColorContextProvider";
import styles from "./HeadphonePicture.module.css";
import classNames from "classnames";
import { useHeadphonePicturePopup } from "../../hooks/useHeadphonePicturePopup";
import type { PopupRectState } from "../../hooks/usePopupRect";
import HeadphoneNamePopupContainer from "../headphoneNamePopup/HeadphoneNamePopupContainer";

interface HeadphonePicturePopupRectContextValue {
  popupWidth: PopupRectState["width"];
  popupHeight: PopupRectState["height"];
  popupLeft: PopupRectState["left"];
  popupTop: PopupRectState["top"];
}

const HeadphonePicturePopupRectContext =
  createContext<HeadphonePicturePopupRectContextValue>({
    popupWidth: "auto",
    popupHeight: "auto",
    popupLeft: 0,
    popupTop: 0,
  });

export const useHeadphonePicturePopupRectContext =
  (): HeadphonePicturePopupRectContextValue =>
    useContext(HeadphonePicturePopupRectContext);

export default function HeadphonePicture({
  headphoneImage,
}: {
  headphoneImage: HeadphoneImage;
}) {
  const imgRef = useRef<HTMLImageElement>(null!);

  const { popupRectState, onPointerCancel } = useHeadphonePicturePopup(imgRef);

  const headphoneImageURL = useImageURL(headphoneImage.blob);

  const onDragStart = useCallback(
    (event: DragEvent<HTMLImageElement>): void => {
      event.preventDefault();
    },
    [],
  );

  const { themeColor } = useThemeColorContext();

  return (
    <>
      <img
        src={headphoneImageURL}
        ref={imgRef}
        onPointerCancel={onPointerCancel}
        onDragStart={onDragStart}
        className={classNames(styles.img, styles[`img--${themeColor}`])}
      />
      {!popupRectState.hidden && (
        <HeadphonePicturePopupRectContext.Provider
          value={{
            popupWidth: popupRectState.width,
            popupHeight: popupRectState.height,
            popupLeft: popupRectState.left,
            popupTop: popupRectState.top,
          }}
        >
          <HeadphoneNamePopupContainer />
        </HeadphonePicturePopupRectContext.Provider>
      )}
    </>
  );
}
