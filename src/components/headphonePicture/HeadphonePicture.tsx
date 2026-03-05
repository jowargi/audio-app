import { useCallback, type DragEvent } from "react";
import { useImageURL } from "../../hooks/useImageURL";
import type { HeadphoneImage } from "../../redux/slices/headphonesImages/slice";
import { useThemeColorContext } from "../themeColorContextProvider/ThemeColorContextProvider";
import styles from "./HeadphonePicture.module.css";
import classNames from "classnames";

export default function HeadphonePicture({
  headphoneImage,
}: {
  headphoneImage: HeadphoneImage;
}) {
  const headphoneImageURL = useImageURL(headphoneImage.blob);

  const onDragStart = useCallback(
    (event: DragEvent<HTMLImageElement>): void => {
      event.preventDefault();
    },
    [],
  );

  const { themeColor } = useThemeColorContext();

  return (
    <img
      src={headphoneImageURL}
      onDragStart={onDragStart}
      className={classNames(styles.img, styles[`img--${themeColor}`])}
    />
  );
}
