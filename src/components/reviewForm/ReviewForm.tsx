import {
  useCallback,
  type ChangeEvent,
  type FormEventHandler,
  type MouseEventHandler,
} from "react";
import styles from "./ReviewForm.module.css";
import classNames from "classnames";
import { useThemeColorContext } from "../themeColorContextProvider/ThemeColorContextProvider";
import TextareaField from "../textareaField/TextareaField";
import RatingCounter from "../ratingCounter/RatingCounter";
import FormControls from "../formControls/FormControls";
import type { FormState } from "../../hooks/useReviewForm";

export interface ReviewFormProps {
  formState: FormState;
  setText: (text: string) => void;
  incrementRating: MouseEventHandler<HTMLButtonElement> | undefined;
  decrementRating: MouseEventHandler<HTMLButtonElement> | undefined;
  onSubmit: FormEventHandler<HTMLFormElement> | undefined;
  onClear: MouseEventHandler<HTMLButtonElement> | undefined;
  disabled: boolean | undefined;
}

export default function ReviewForm({
  formState,
  setText,
  incrementRating,
  decrementRating,
  onSubmit,
  onClear,
  disabled,
}: ReviewFormProps) {
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
