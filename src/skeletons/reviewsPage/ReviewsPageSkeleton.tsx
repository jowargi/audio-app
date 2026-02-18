import type { JSX } from "react";
import { useThemeColorContext } from "../../components/themeColorContextProvider/ThemeColorContextProvider";
import styles from "./ReviewsPageSkeleton.module.css";
import classNames from "classnames";

export default function ReviewsPageSkeleton() {
  const { themeColor } = useThemeColorContext();

  return (
    <div
      className={classNames(
        styles.container,
        styles[`container--${themeColor}`],
      )}
    >
      <h4
        className={classNames(styles.title, styles[`title--${themeColor}`])}
      />
      <ul className={styles.list}>
        {new Array(4).fill(undefined).map(
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
