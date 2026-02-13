import { useSelector } from "react-redux";
import {
  withAuthorized,
  type AuthorizedComponentProps,
} from "../../hocs/withAuthorized";
import {
  selectFetchByIdError,
  selectHeadphoneById,
  type Headphone,
} from "../../redux/slices/headphones/slice";
import type { GlobalState } from "../../redux/store";
import { selectUserCartItemQuantity } from "../../redux/slices/cart/slice";
import { useRequest } from "../../redux/hooks/useRequest";
import { getHeadphoneById } from "../../redux/slices/headphones/getHeadphoneById";
import {
  REQUEST_STATUS_IDLE,
  REQUEST_STATUS_PENDING,
  REQUEST_STATUS_REJECTED,
} from "../../redux/constants/requestStatuses";
import Spinner from "../spinner/Spinner";
import ErrorFallback from "../errorFallback/ErrorFallback";
import CartItem from "./CartItem";

interface CartItemContainerProps {
  cartItemId: Headphone["id"];
}

const CartItemContainerAuthorized = ({
  cartItemId,
  authorizedUser,
}: CartItemContainerProps & AuthorizedComponentProps) => {
  const { id: userId } = authorizedUser;

  const cartItemQuantity = useSelector((state: GlobalState): number =>
    selectUserCartItemQuantity(state, userId, cartItemId),
  );

  const requestStatus = useRequest<Headphone, Headphone["id"]>({
    thunk: getHeadphoneById,
    thunkArg: cartItemId,
  });

  const headphone = useSelector((state: GlobalState): Headphone | undefined =>
    selectHeadphoneById(state, cartItemId),
  );

  const fetchByIdError = useSelector(selectFetchByIdError);

  if (requestStatus === REQUEST_STATUS_IDLE) return null;

  if (requestStatus === REQUEST_STATUS_PENDING) return <Spinner />;

  if (
    requestStatus === REQUEST_STATUS_REJECTED &&
    fetchByIdError?.name !== "ConditionError"
  )
    return (
      <ErrorFallback
        name={fetchByIdError?.name}
        message={fetchByIdError?.message}
      />
    );

  const { name: cartItemName } = headphone || {};

  return cartItemQuantity && cartItemName ? (
    <CartItem
      cartItemId={cartItemId}
      cartItemQuantity={cartItemQuantity}
      cartItemName={cartItemName}
    />
  ) : null;
};

const CartItemContainer = withAuthorized<CartItemContainerProps>({
  AuthorizedComponent: CartItemContainerAuthorized,
});

export default CartItemContainer;
