import { useParams } from "react-router-dom";
import {
  withAuthorized,
  type AuthorizedComponentProps,
} from "../../hocs/withAuthorized";
import { useCartActions } from "../../hooks/useCartActions";
import type { User } from "../../redux/slices/authorizedUsers/slice";
import type { Headphone } from "../../redux/slices/headphones/slice";
import Counter from "../counter/Counter";

const HeadphoneCounterAuthorized = ({
  authorizedUser,
}: AuthorizedComponentProps) => {
  const { id: userId } = authorizedUser;

  const { headphoneId } = useParams();

  const { count, increment, decrement } = useCartActions({
    userId,
    headphoneId,
  } as {
    userId: User["id"];
    headphoneId: Headphone["id"];
  });

  return <Counter count={count} increment={increment} decrement={decrement} />;
};

const HeadphoneCounter = withAuthorized({
  AuthorizedComponent: HeadphoneCounterAuthorized,
});

export default HeadphoneCounter;
