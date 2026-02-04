import HeadphonesNavigationContainer from "../headphonesNavigation/HeadphonesNavigationContainer";
import HeadphonesViewContainer from "../headphonesView/HeadphonesViewContainer";
import { useThemeColorContext } from "../themeColorContextProvider/ThemeColorContextProvider";
import styles from "./Headphones.module.css";
import classNames from "classnames";

export default function Headphones({
  title = "Headphones",
}: {
  title?: string;
}) {
  const { themeColor } = useThemeColorContext();

  return (
    <section
      className={classNames(
        styles.container,
        styles[`container--${themeColor}`],
      )}
    >
      <h2 className={classNames(styles.title, styles[`title--${themeColor}`])}>
        {title}
      </h2>
      <HeadphonesNavigationContainer />
      <HeadphonesViewContainer />
    </section>
  );
}
