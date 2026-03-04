import type { Headphone } from "../../redux/slices/headphones/slice";
import { useHeadphonePicturePopupRectContext } from "../headphonePicture/HeadphonePicture";
import { useThemeColorContext } from "../themeColorContextProvider/ThemeColorContextProvider";
import styles from "./HeadphoneNamePopup.module.css";
import classNames from "classnames";

export default function HeadphoneNamePopup({
  headphoneName,
}: {
  headphoneName: Headphone["name"];
}) {
  const { popupWidth, popupHeight, popupLeft, popupTop } =
    useHeadphonePicturePopupRectContext();

  const { themeColor } = useThemeColorContext();

  return (
    <div
      style={{
        width: typeof popupWidth === "number" ? `${popupWidth}px` : popupWidth,
        height:
          typeof popupHeight === "number" ? `${popupHeight}px` : popupHeight,
        left: `${popupLeft}px`,
        top: `${popupTop}px`,
      }}
      className={classNames(styles.popup, styles[`popup--${themeColor}`])}
    >
      <p className={classNames(styles.text, styles[`text--${themeColor}`])}>
        {headphoneName}
      </p>
    </div>
  );
}
