import type { FC } from "react";
import type { Headphone } from "../redux/slices/headphones/slice";

export interface WithCartItemsCheckProps {
  cartItemsIds: Headphone["id"][];
}

export const withCartItemsCheck = <
  P extends WithCartItemsCheckProps = WithCartItemsCheckProps,
>({
  CartItemsList,
  EmptyCartMessage,
}: {
  CartItemsList?: FC<P>;
  EmptyCartMessage?: FC;
}): FC<P> => {
  return function WithCartItemsCheck(props: P) {
    const { cartItemsIds } = props;

    if (!cartItemsIds.length)
      return EmptyCartMessage ? <EmptyCartMessage /> : null;

    return CartItemsList ? <CartItemsList {...props} /> : null;
  };
};
