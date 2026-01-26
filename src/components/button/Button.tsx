import { useThemeColorContext } from "../themeColorContextProvider/ThemeColorContextProvider";
import styles from "./Button.module.css";
import classNames from "classnames";

interface ButtonProps {
  children: React.ReactNode;
  type?: "submit" | "reset" | "button" | undefined;
  onClick: React.MouseEventHandler<HTMLButtonElement> | undefined;
  style?: React.CSSProperties | undefined;
  disabled?: boolean | undefined;
}

export default function Button({
  children,
  type = "button",
  onClick,
  style,
  disabled = false,
}: ButtonProps) {
  const { themeColor } = useThemeColorContext();

  return (
    <button
      type={type}
      onClick={onClick}
      style={style}
      disabled={disabled}
      className={classNames(styles.button, styles[`button--${themeColor}`], {
        [styles[`button--${themeColor}--disabled`]]: disabled,
      })}
    >
      {children}
    </button>
  );
}
