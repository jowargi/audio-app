import RouterLink from "../routerLink/RouterLink";
import { useThemeColorContext } from "../themeColorContextProvider/ThemeColorContextProvider";
import styles from "./HeadphoneNavigation.module.css";
import classNames from "classnames";

export default function HeadphoneNavigation() {
  const { themeColor } = useThemeColorContext();

  return (
    <nav>
      <ul className={classNames(styles.list, styles[`list--${themeColor}`])}>
        <li>
          <RouterLink to="info">Info</RouterLink>
        </li>
        <li>
          <RouterLink to="reviews">Reviews</RouterLink>
        </li>
      </ul>
    </nav>
  );
}
