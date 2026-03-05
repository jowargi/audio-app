import type { PopupRectState } from "../../hooks/usePopupRect";
import type { Headphone } from "../../redux/slices/headphones/slice";
import { useThemeColorContext } from "../themeColorContextProvider/ThemeColorContextProvider";
import styles from "./HeadphoneTypePopup.module.css";
import classNames from "classnames";

interface HeadphoneTypePopupProps {
  headphoneType: Headphone["type"];
  popupRect: Omit<PopupRectState, "hidden">;
}

export default function HeadphoneTypePopup({
  headphoneType,
  popupRect,
}: HeadphoneTypePopupProps) {
  const { width, height, left, top } = popupRect;

  const { themeColor } = useThemeColorContext();

  return (
    <div
      style={{
        width: typeof width === "number" ? `${width}px` : width,
        height: typeof height === "number" ? `${height}px` : height,
        left: `${left}px`,
        top: `${top}px`,
      }}
      className={classNames(styles.popup, styles[`popup--${themeColor}`])}
    >
      <p className={classNames(styles.text, styles[`text--${themeColor}`])}>
        {headphoneType}
      </p>
    </div>
  );
}
