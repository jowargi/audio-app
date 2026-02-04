import { NavLink } from "react-router-dom";
import styles from "./RouterLink.module.css";
import classNames from "classnames";
import { useThemeColorContext } from "../themeColorContextProvider/ThemeColorContextProvider";

interface RouterLinkProps {
  children: React.ReactNode;
  to: string;
  ref?: React.Ref<HTMLAnchorElement> | undefined;
  onPointerCancel?: React.PointerEventHandler<HTMLAnchorElement> | undefined;
  onClick?: React.MouseEventHandler<HTMLAnchorElement> | undefined;
  style?: React.CSSProperties | undefined;
}

export default function RouterLink({
  children,
  to,
  ref,
  onPointerCancel,
  onClick,
  style,
}: RouterLinkProps) {
  const { themeColor } = useThemeColorContext();

  return (
    <NavLink
      to={to}
      ref={ref}
      onPointerCancel={onPointerCancel}
      onClick={onClick}
      style={style}
      className={({ isActive }: { isActive: boolean }): string =>
        classNames(styles.link, styles[`link--${themeColor}`], {
          [styles[`link--${themeColor}--active`]]: isActive,
        })
      }
    >
      {children}
    </NavLink>
  );
}
