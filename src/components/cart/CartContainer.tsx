import { useSelector } from "react-redux";
import {
  withAuthorized,
  type AuthorizedComponentProps,
} from "../../hocs/withAuthorized";
import type { GlobalState } from "../../redux/store";
import { selectUserCartItemsIds } from "../../redux/slices/cart/slice";
import type { Headphone } from "../../redux/slices/headphones/slice";
import Cart from "./Cart";

const CartContainerAuthorized = ({
  authorizedUser,
}: AuthorizedComponentProps) => {
  const { id: userId } = authorizedUser;

  const cartItemsIds = useSelector((state: GlobalState): Headphone["id"][] =>
    selectUserCartItemsIds(state, userId),
  );

  return <Cart cartItemsIds={cartItemsIds} />;
};

const CartContainer = withAuthorized({
  AuthorizedComponent: CartContainerAuthorized,
});

export default CartContainer;
