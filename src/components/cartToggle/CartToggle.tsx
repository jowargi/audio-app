import {
  withAuthorized,
  type AuthorizedComponentProps,
} from "../../hocs/withAuthorized";
import Button from "../button/Button";
import { useCartContext } from "../cartContextProvider/CartContextProvider";

interface CartToggleProps {
  text?: string;
}

const CartToggleAuthorized = ({
  text = "Cart",
}: CartToggleProps & AuthorizedComponentProps) => {
  const { isCartVisible, openCart } = useCartContext();

  return (
    <Button onClick={openCart} disabled={isCartVisible}>
      {text}
    </Button>
  );
};

const CartToggle = withAuthorized<CartToggleProps>({
  AuthorizedComponent: CartToggleAuthorized,
});

export default CartToggle;
