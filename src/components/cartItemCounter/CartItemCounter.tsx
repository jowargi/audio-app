import {
  withAuthorized,
  type AuthorizedComponentProps,
} from "../../hocs/withAuthorized";
import { useCartActions } from "../../hooks/useCartActions";
import type { Headphone } from "../../redux/slices/headphones/slice";
import Counter from "../counter/Counter";

interface CartItemCounterProps {
  cartItemId: Headphone["id"];
}

const CartItemCounterAuthorized = ({
  cartItemId,
  authorizedUser,
}: CartItemCounterProps & AuthorizedComponentProps) => {
  const { id: userId } = authorizedUser;

  const { count, increment, decrement } = useCartActions({
    userId,
    headphoneId: cartItemId,
  });

  return <Counter count={count} increment={increment} decrement={decrement} />;
};

const CartItemCounter = withAuthorized<CartItemCounterProps>({
  AuthorizedComponent: CartItemCounterAuthorized,
});

export default CartItemCounter;
