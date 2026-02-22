import ReviewFormContainer from "../../components/reviewForm/ReviewFormContainer";
import ReviewsContainer from "../../components/reviews/ReviewsContainer";
import { useThemeColorContext } from "../../components/themeColorContextProvider/ThemeColorContextProvider";
import type { Headphone } from "../../redux/slices/headphones/slice";
import styles from "./ReviewsPage.module.css";
import classNames from "classnames";

export default function ReviewsPage({
  headphoneName,
}: {
  headphoneName?: Headphone["name"];
}) {
  const { themeColor } = useThemeColorContext();

  return (
    <div
      className={classNames(
        styles.container,
        styles[`container--${themeColor}`],
      )}
    >
      <h4 className={classNames(styles.title, styles[`title--${themeColor}`])}>
        {headphoneName ? `${headphoneName} reviews` : "Reviews"}
      </h4>
      <ReviewsContainer />
      <ReviewFormContainer />
    </div>
  );
}
