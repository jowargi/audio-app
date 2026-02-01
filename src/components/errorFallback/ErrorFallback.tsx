import { useThemeColorContext } from "../themeColorContextProvider/ThemeColorContextProvider";
import styles from "./ErrorFallback.module.css";
import classNames from "classnames";

interface ErrorFallbackProps {
  name?: string;
  message?: string;
}

export default function ErrorFallback({ name, message }: ErrorFallbackProps) {
  const { themeColor } = useThemeColorContext();

  return (
    <div
      className={classNames(
        styles.container,
        styles[`container--${themeColor}`],
      )}
    >
      <h2 className={classNames(styles.name, styles[`name--${themeColor}`])}>
        {name || "Error"}
      </h2>
      <p
        className={classNames(styles.message, styles[`message--${themeColor}`])}
      >
        {message || "An unexpected error occurred"}
      </p>
    </div>
  );
}
