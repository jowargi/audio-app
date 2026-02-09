import { useParams } from "react-router-dom";
import {
  withAuthorized,
  type AuthorizedComponentProps,
} from "../../hocs/withAuthorized";
import { useCartActions } from "../../hooks/useCartActions";
import type { User } from "../../redux/slices/authorizedUsers/slice";
import type { Headphone } from "../../redux/slices/headphones/slice";
import Button from "../button/Button";
import HeadphoneCounter from "../headphoneCounter/HeadphoneCounter";

const AddToCartButtonAuthorized = ({
  authorizedUser,
}: AuthorizedComponentProps) => {
  const { id: userId } = authorizedUser;

  const { headphoneId } = useParams();

  const { count, increment } = useCartActions({ userId, headphoneId } as {
    userId: User["id"];
    headphoneId: Headphone["id"];
  });

  if (!count) return <Button onClick={increment}>Add to cart</Button>;

  return <HeadphoneCounter />;
};

const AddToCartButton = withAuthorized({
  AuthorizedComponent: AddToCartButtonAuthorized,
});

export default AddToCartButton;
