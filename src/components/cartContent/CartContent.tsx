import type { JSX } from "react";
import {
  withCartItemsCheck,
  type WithCartItemsCheckProps,
} from "../../hocs/withCartItemsCheck";
import type { Headphone } from "../../redux/slices/headphones/slice";
import { useThemeColorContext } from "../themeColorContextProvider/ThemeColorContextProvider";
import styles from "./CartContent.module.css";
import classNames from "classnames";
import CartItemContainer from "../cartItem/CartItemContainer";

const CartItemsList = ({ cartItemsIds }: WithCartItemsCheckProps) => {
  const { themeColor } = useThemeColorContext();

  return (
    <ul className={classNames(styles.list, styles[`list--${themeColor}`])}>
      {cartItemsIds.map(
        (cartItemId: Headphone["id"]): JSX.Element => (
          <li
            key={cartItemId}
            className={classNames(styles.item, styles[`item--${themeColor}`])}
          >
            <CartItemContainer cartItemId={cartItemId} />
          </li>
        ),
      )}
    </ul>
  );
};

const EmptyCartMessage = () => {
  const { themeColor } = useThemeColorContext();

  return (
    <p className={classNames(styles.text, styles[`text--${themeColor}`])}>
      Your shopping cart is empty!
    </p>
  );
};

const CartContent = withCartItemsCheck({ CartItemsList, EmptyCartMessage });

export default CartContent;
