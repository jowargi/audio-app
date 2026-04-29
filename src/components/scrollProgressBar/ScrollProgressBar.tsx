import { useScrollProgress } from "../../hooks/useScrollProgress";
import { useThemeColorContext } from "../themeColorContextProvider/ThemeColorContextProvider";
import styles from "./ScrollProgressBar.module.css";
import classNames from "classnames";

export default function ScrollProgressBar() {
  const { themeColor } = useThemeColorContext();

  const scrollProgress = useScrollProgress();

  return (
    <div
      className={classNames(styles.bar, styles[`bar--${themeColor}`])}
      style={{ width: `${scrollProgress}vw` }}
    />
  );
}
