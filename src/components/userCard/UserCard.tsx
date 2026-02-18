import type { User } from "../../redux/slices/authorizedUsers/slice";
import { useThemeColorContext } from "../themeColorContextProvider/ThemeColorContextProvider";
import styles from "./UserCard.module.css";
import classNames from "classnames";

export default function UserCard({ userName }: { userName: User["name"] }) {
  const { themeColor } = useThemeColorContext();

  return (
    <h5 className={classNames(styles.title, styles[`title--${themeColor}`])}>
      {userName}
    </h5>
  );
}
