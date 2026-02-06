import type { JSX } from "react";
import type { Codec } from "../../redux/slices/codecs/slice";
import { useThemeColorContext } from "../themeColorContextProvider/ThemeColorContextProvider";
import CodecTypeContainer from "../codecType/CodecTypeContainer";
import styles from "./Codecs.module.css";
import classNames from "classnames";

export default function Codecs({ codecsIds }: { codecsIds: Codec["id"][] }) {
  const { themeColor } = useThemeColorContext();

  return (
    <div className={styles.container}>
      <h5 className={classNames(styles.title, styles[`title--${themeColor}`])}>
        Codecs
      </h5>
      <ul className={styles.list}>
        {codecsIds.map(
          (codecId: Codec["id"]): JSX.Element => (
            <li
              key={codecId}
              className={classNames(styles.item, styles[`item--${themeColor}`])}
            >
              <CodecTypeContainer codecId={codecId} />
            </li>
          ),
        )}
      </ul>
    </div>
  );
}
