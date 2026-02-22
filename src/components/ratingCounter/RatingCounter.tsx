import type { MouseEventHandler } from "react";
import Counter from "../counter/Counter";
import { useThemeColorContext } from "../themeColorContextProvider/ThemeColorContextProvider";
import styles from "./RatingCounter.module.css";
import classNames from "classnames";

interface RatingCounterProps {
  count: number;
  increment: MouseEventHandler<HTMLButtonElement> | undefined;
  decrement: MouseEventHandler<HTMLButtonElement> | undefined;
}

export default function RatingCounter({
  count,
  increment,
  decrement,
}: RatingCounterProps) {
  const { themeColor } = useThemeColorContext();

  return (
    <div className={styles.container}>
      <p className={classNames(styles.text, styles[`text--${themeColor}`])}>
        Your current rating for the headphone:
      </p>
      <Counter count={count} increment={increment} decrement={decrement} />
    </div>
  );
}
