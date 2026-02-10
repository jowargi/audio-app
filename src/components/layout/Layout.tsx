import CartContainer from "../cart/CartContainer";
import CartModal from "../cartModal/CartModal";
import Footer from "../footer/Footer";
import Header from "../header/Header";
import Main from "../main/Main";
import { useThemeColorContext } from "../themeColorContextProvider/ThemeColorContextProvider";
import styles from "./Layout.module.css";
import classNames from "classnames";

export default function Layout() {
  const { themeColor } = useThemeColorContext();

  return (
    <>
      <div
        className={classNames(styles.layout, styles[`layout--${themeColor}`])}
      >
        <Header />
        <Main />
        <Footer />
      </div>
      <CartModal>
        <CartContainer />
      </CartModal>
    </>
  );
}
