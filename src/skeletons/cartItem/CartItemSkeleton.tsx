import CartItemCounter from "../../components/cartItemCounter/CartItemCounter";
import { useThemeColorContext } from "../../components/themeColorContextProvider/ThemeColorContextProvider";
import type { Headphone } from "../../redux/slices/headphones/slice";
import styles from "./CartItemSkeleton.module.css";
import classNames from "classnames";

export default function CartItemSkeleton({
  cartItemId,
}: {
  cartItemId: Headphone["id"];
}) {
  const { themeColor } = useThemeColorContext();

  return (
    <>
      <h3
        className={classNames(styles.title, styles[`title--${themeColor}`])}
      />
      <p className={classNames(styles.text, styles[`text--${themeColor}`])} />
      <CartItemCounter cartItemId={cartItemId} />
    </>
  );
}
