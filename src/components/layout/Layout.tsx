import CartContainer from "../cart/CartContainer";
import CartModal from "../cartModal/CartModal";
import Footer from "../footer/Footer";
import Header from "../header/Header";
import Modal from "../modal/Modal";
import Main from "../main/Main";
import ScrollProgressBar from "../scrollProgressBar/ScrollProgressBar";
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
      <Modal style={{ position: "fixed", left: 0, top: 0, zIndex: 2000 }}>
        <ScrollProgressBar />
      </Modal>
      <CartModal>
        <CartContainer />
      </CartModal>
    </>
  );
}
