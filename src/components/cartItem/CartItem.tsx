import type { Headphone } from "../../redux/slices/headphones/slice";
import CartItemCounter from "../cartItemCounter/CartItemCounter";
import { useThemeColorContext } from "../themeColorContextProvider/ThemeColorContextProvider";
import styles from "./CartItem.module.css";
import classNames from "classnames";

interface CartItemProps {
  cartItemId: Headphone["id"];
  cartItemQuantity: number;
  cartItemName: Headphone["name"];
}

export default function CartItem({
  cartItemId,
  cartItemQuantity,
  cartItemName,
}: CartItemProps) {
  const { themeColor } = useThemeColorContext();

  return (
    <>
      <h3 className={classNames(styles.title, styles[`text--${themeColor}`])}>
        {cartItemName}
      </h3>
      <p className={classNames(styles.text, styles[`text--${themeColor}`])}>
        Quantity: {cartItemQuantity}
      </p>
      <CartItemCounter cartItemId={cartItemId} />
    </>
  );
}
