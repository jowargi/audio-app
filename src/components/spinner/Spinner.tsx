import { useThemeColorContext } from "../themeColorContextProvider/ThemeColorContextProvider";
import styles from "./Spinner.module.css";
import classNames from "classnames";

export default function Spinner() {
  const { themeColor } = useThemeColorContext();

  return (
    <div className={styles["spinner-outer"]}>
      <div
        className={classNames(
          styles["spinner-inner"],
          styles[`spinner-inner--${themeColor}`],
        )}
      />
    </div>
  );
}
