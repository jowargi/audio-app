import type React from "react";
import {
  withAuthorized,
  type AuthorizedComponentProps,
} from "../../hocs/withAuthorized";
import { useCartContext } from "../cartContextProvider/CartContextProvider";
import { createPortal } from "react-dom";
import styles from "./CartModal.module.css";
import { useEffect } from "react";

interface CartModalProps {
  children: React.ReactNode;
}

const CartModalAuthorized = ({
  children,
}: CartModalProps & AuthorizedComponentProps) => {
  const { isCartVisible } = useCartContext();

  useEffect((): (() => void) => {
    if (isCartVisible) document.documentElement.style.overflow = "hidden";

    return (): void => {
      document.documentElement.style.overflow = "";
    };
  }, [isCartVisible]);

  return (
    isCartVisible &&
    createPortal(
      <div className={styles.overlay}>
        <div className={styles.content}>{children}</div>
      </div>,
      document.getElementById("modal") as HTMLElement,
    )
  );
};

const CartModal = withAuthorized<CartModalProps>({
  AuthorizedComponent: CartModalAuthorized,
});

export default CartModal;
