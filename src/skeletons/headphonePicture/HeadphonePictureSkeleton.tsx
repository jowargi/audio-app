import { useThemeColorContext } from "../../components/themeColorContextProvider/ThemeColorContextProvider";
import styles from "./HeadphonePictureSkeleton.module.css";
import classNames from "classnames";

export default function HeadphonePictureSkeleton() {
  const { themeColor } = useThemeColorContext();

  return (
    <div className={classNames(styles.img, styles[`img--${themeColor}`])} />
  );
}
