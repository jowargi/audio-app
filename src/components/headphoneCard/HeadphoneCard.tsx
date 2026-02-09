import { Outlet } from "react-router-dom";
import type { Headphone } from "../../redux/slices/headphones/slice";
import HeadphoneNavigation from "../headphoneNavigation/HeadphoneNavigation";
import { useThemeColorContext } from "../themeColorContextProvider/ThemeColorContextProvider";
import styles from "./HeadphoneCard.module.css";
import classNames from "classnames";
import AddToCartButton from "../addToCartButton/AddToCartButton";

export default function HeadphoneCard({
  headphoneName,
}: {
  headphoneName: Headphone["name"];
}) {
  const { themeColor } = useThemeColorContext();

  return (
    <div
      className={classNames(
        styles.container,
        styles[`container--${themeColor}`],
      )}
    >
      <h3 className={classNames(styles.title, styles[`title--${themeColor}`])}>
        {headphoneName}
      </h3>
      <HeadphoneNavigation />
      <Outlet />
      <AddToCartButton />
    </div>
  );
}
