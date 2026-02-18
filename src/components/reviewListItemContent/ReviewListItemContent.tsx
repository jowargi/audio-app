import { useReviewContentContext } from "../reviewListItem/ReviewListItemContainer";
import { useThemeColorContext } from "../themeColorContextProvider/ThemeColorContextProvider";
import UserCardContainer from "../userCard/UserCardContainer";
import styles from "./ReviewListItemContent.module.css";
import classNames from "classnames";

export default function ReviewListItemContent() {
  const { userId, reviewText, reviewRating } = useReviewContentContext();

  const { themeColor } = useThemeColorContext();

  return (
    <div className={styles.container}>
      <div>
        <UserCardContainer userId={userId} />
        <p className={classNames(styles.text, styles[`text--${themeColor}`])}>
          {reviewText}
        </p>
      </div>
      <p className={classNames(styles.rating, styles[`rating--${themeColor}`])}>
        {new Array((reviewRating || 0) + 1).join("★")}
      </p>
    </div>
  );
}
