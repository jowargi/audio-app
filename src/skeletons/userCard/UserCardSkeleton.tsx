import { useThemeColorContext } from "../../components/themeColorContextProvider/ThemeColorContextProvider";
import styles from "./UserCardSkeleton.module.css";
import classNames from "classnames";

export default function UserCardSkeleton() {
  const { themeColor } = useThemeColorContext();

  return (
    <h5 className={classNames(styles.title, styles[`title--${themeColor}`])} />
  );
}
