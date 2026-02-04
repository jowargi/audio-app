import type { JSX } from "react";
import type { Headphone } from "../../redux/slices/headphones/slice";
import HeadphoneLinkContainer from "../headphoneLink/HeadphoneLinkContainer";
import { useThemeColorContext } from "../themeColorContextProvider/ThemeColorContextProvider";
import styles from "./HeadphonesNavigation.module.css";
import classNames from "classnames";

export default function HeadphonesNavigation({
  headphonesIds,
}: {
  headphonesIds: Headphone["id"][];
}) {
  const { themeColor } = useThemeColorContext();

  return (
    <nav>
      <ul className={classNames(styles.list, styles[`list--${themeColor}`])}>
        {headphonesIds.map(
          (headphoneId: Headphone["id"]): JSX.Element => (
            <li key={headphoneId}>
              <HeadphoneLinkContainer headphoneId={headphoneId} />
            </li>
          ),
        )}
      </ul>
    </nav>
  );
}
