import { useNavigate } from "react-router-dom";
import AuthStatusControlCompound from "../authStatusControlCompound/AuthStatusControlCompound";
import { useCallback } from "react";
import ThemeColorToggle from "../themeColorToggle/ThemeColorToggle";
import styles from "./Header.module.css";
import classNames from "classnames";
import { useThemeColorContext } from "../themeColorContextProvider/ThemeColorContextProvider";
import CartToggle from "../cartToggle/CartToggle";

const AuthStatusControl = () => {
  return (
    <AuthStatusControlCompound>
      <AuthStatusControlCompound.UserName />
      <AuthStatusControlCompound.AuthButton />
    </AuthStatusControlCompound>
  );
};

export default function Header() {
  const navigate = useNavigate();

  const onPointerDown = useCallback(
    (event: React.PointerEvent<HTMLHeadElement>): void =>
      event.preventDefault(),
    [],
  );

  const onClick = useCallback((): void => {
    navigate("/");
  }, [navigate]);

  const { themeColor } = useThemeColorContext();

  return (
    <header
      className={classNames(
        styles.header,
        styles[`header--${themeColor}`],
        "clearfix",
      )}
    >
      <h1
        onPointerDown={onPointerDown}
        onClick={onClick}
        className={classNames(styles.title, styles[`title--${themeColor}`])}
      >
        Audio App
      </h1>
      <div className={styles.container}>
        <CartToggle />
        <AuthStatusControl />
        <ThemeColorToggle />
      </div>
    </header>
  );
}
