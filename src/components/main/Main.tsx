import { useRef } from "react";
import { useThemeColorContext } from "../themeColorContextProvider/ThemeColorContextProvider";
import styles from "./Main.module.css";
import classNames from "classnames";
import { useMainMinHeight } from "../../hooks/useMainMinHeight";

export default function Main() {
  const mainRef = useRef<HTMLElement>(null!);

  useMainMinHeight(mainRef);

  const { themeColor } = useThemeColorContext();

  return (
    <main
      ref={mainRef}
      className={classNames(styles.main, styles[`main--${themeColor}`])}
    ></main>
  );
}
