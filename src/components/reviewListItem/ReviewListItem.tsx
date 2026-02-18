import ReviewListItemContent from "../reviewListItemContent/ReviewListItemContent";
import { useThemeColorContext } from "../themeColorContextProvider/ThemeColorContextProvider";
import styles from "./ReviewListItem.module.css";
import classNames from "classnames";

export default function ReviewListItem() {
  const { themeColor } = useThemeColorContext();

  return (
    <li className={classNames(styles.item, styles[`item--${themeColor}`])}>
      <ReviewListItemContent />
    </li>
  );
}
