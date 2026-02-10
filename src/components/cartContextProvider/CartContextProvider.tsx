import { createContext, useCallback, useContext, useState } from "react";

interface CartContextValue {
  isCartVisible: boolean;
  openCart: () => void;
  closeCart: () => void;
}

const CartContext = createContext<CartContextValue>({
  isCartVisible: false,
  openCart: (): void => {},
  closeCart: (): void => {},
});

export const useCartContext = (): CartContextValue => useContext(CartContext);

export default function CartContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isCartVisible, setIsCartVisible] = useState<boolean>(false);

  const openCart = useCallback((): void => {
    setIsCartVisible(true);
  }, []);

  const closeCart = useCallback((): void => {
    setIsCartVisible(false);
  }, []);

  return (
    <CartContext.Provider value={{ isCartVisible, openCart, closeCart }}>
      {children}
    </CartContext.Provider>
  );
}
