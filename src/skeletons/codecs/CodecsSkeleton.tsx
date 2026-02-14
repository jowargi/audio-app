import type { JSX } from "react";
import { useThemeColorContext } from "../../components/themeColorContextProvider/ThemeColorContextProvider";
import styles from "./CodecsSkeleton.module.css";
import classNames from "classnames";

export default function CodecsSkeleton() {
  const { themeColor } = useThemeColorContext();

  return (
    <div className={styles.container}>
      <h5
        className={classNames(styles.title, styles[`title--${themeColor}`])}
      />
      <ul className={styles.list}>
        {new Array(3).fill(undefined).map(
          (_: undefined, index: number): JSX.Element => (
            <li
              key={index}
              className={classNames(styles.item, styles[`item--${themeColor}`])}
            />
          ),
        )}
      </ul>
    </div>
  );
}
