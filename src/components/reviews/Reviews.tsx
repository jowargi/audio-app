import type { JSX } from "react";
import type { Review } from "../../redux/api/reviews/api";
import { useThemeColorContext } from "../themeColorContextProvider/ThemeColorContextProvider";
import styles from "./Reviews.module.css";
import classNames from "classnames";
import ReviewListItemContainer from "../reviewListItem/ReviewListItemContainer";

export default function Reviews({
  reviewsIds,
}: {
  reviewsIds: Review["id"][];
}) {
  const { themeColor } = useThemeColorContext();

  if (!reviewsIds.length)
    return (
      <p className={classNames(styles.text, styles[`text--${themeColor}`])}>
        No reviews yet. Be the first!
      </p>
    );

  return (
    <ul className={styles.list}>
      {reviewsIds.map(
        (reviewId: Review["id"]): JSX.Element => (
          <ReviewListItemContainer key={reviewId} reviewId={reviewId} />
        ),
      )}
    </ul>
  );
}
