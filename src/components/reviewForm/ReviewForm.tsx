import { useCallback, type ChangeEvent } from "react";
import styles from "./ReviewForm.module.css";
import classNames from "classnames";
import { useThemeColorContext } from "../themeColorContextProvider/ThemeColorContextProvider";
import TextareaField from "../textareaField/TextareaField";
import RatingCounter from "../ratingCounter/RatingCounter";
import { useReviewFormContext } from "./ReviewFormContainer";
import FormControls from "../formControls/FormControls";

export default function ReviewForm() {
  const {
    formState,
    setText,
    incrementRating,
    decrementRating,
    onSubmit,
    onClear,
    disabled,
  } = useReviewFormContext();

  const onChange = useCallback(
    (event: ChangeEvent): void => {
      setText((event.target as HTMLTextAreaElement).value);
    },
    [setText],
  );

  const { themeColor } = useThemeColorContext();

  return (
    <form
      onSubmit={onSubmit}
      className={classNames(styles.form, styles[`form--${themeColor}`])}
    >
      <TextareaField
        id="review-text"
        name="review"
        value={formState.text}
        onChange={onChange}
        labelText="Review"
      />
      <RatingCounter
        count={formState.rating}
        increment={incrementRating}
        decrement={decrementRating}
      />
      <FormControls onClear={onClear} disabled={disabled} />
    </form>
  );
}
