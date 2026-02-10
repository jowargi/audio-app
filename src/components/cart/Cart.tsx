import type { Headphone } from "../../redux/slices/headphones/slice";
import Button from "../button/Button";
import CartContent from "../cartContent/CartContent";
import { useCartContext } from "../cartContextProvider/CartContextProvider";
import { useThemeColorContext } from "../themeColorContextProvider/ThemeColorContextProvider";
import styles from "./Cart.module.css";
import classNames from "classnames";

export default function Cart({
  cartItemsIds,
}: {
  cartItemsIds: Headphone["id"][];
}) {
  const { closeCart } = useCartContext();

  const { themeColor } = useThemeColorContext();

  return (
    <section
      className={classNames(
        styles.container,
        styles[`container--${themeColor}`],
      )}
      style={{ position: "relative" }}
    >
      <Button
        onClick={closeCart}
        style={{ position: "absolute", right: "1rem", top: "1rem" }}
      >
        <span>&#10006;</span>
      </Button>
      <h2 className={classNames(styles.title, styles[`title--${themeColor}`])}>
        Shopping cart
      </h2>
      <CartContent cartItemsIds={cartItemsIds} />
    </section>
  );
}
