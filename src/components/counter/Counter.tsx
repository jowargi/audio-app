import Button from "../button/Button";
import { useThemeColorContext } from "../themeColorContextProvider/ThemeColorContextProvider";
import styles from "./Counter.module.css";
import classNames from "classnames";

interface CounterProps {
  count: number;
  increment: React.MouseEventHandler<HTMLButtonElement> | undefined;
  decrement: React.MouseEventHandler<HTMLButtonElement> | undefined;
}

export default function Counter({ count, increment, decrement }: CounterProps) {
  const { themeColor } = useThemeColorContext();

  return (
    <div
      className={classNames(styles.counter, styles[`counter--${themeColor}`])}
    >
      <Button onClick={decrement}>-</Button>
      <span
        className={classNames(styles.count, styles[`count--${themeColor}`])}
      >
        {count}
      </span>
      <Button onClick={increment}>+</Button>
    </div>
  );
}
