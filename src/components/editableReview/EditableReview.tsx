import { withEditableReview } from "../../hocs/withEditableReview";
import ReviewListItemContent from "../reviewListItemContent/ReviewListItemContent";
import ReviewForm from "../reviewForm/ReviewForm";

const EditableReview = withEditableReview({
  ReviewListItemContent,
  ReviewForm,
});

export default EditableReview;
