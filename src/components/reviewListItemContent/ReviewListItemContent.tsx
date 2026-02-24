import type { Review } from "../../redux/api/reviews/api";
import { useThemeColorContext } from "../themeColorContextProvider/ThemeColorContextProvider";
import UserCardContainer from "../userCard/UserCardContainer";
import styles from "./ReviewListItemContent.module.css";
import classNames from "classnames";

export interface ReviewListItemContentProps {
  userId: Review["user"] | undefined;
  reviewText: Review["text"] | undefined;
  reviewRating: Review["rating"] | undefined;
}

export default function ReviewListItemContent({
  userId,
  reviewText,
  reviewRating,
}: ReviewListItemContentProps) {
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
