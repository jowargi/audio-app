import type { Codec } from "../../redux/slices/codecs/slice";
import { useThemeColorContext } from "../themeColorContextProvider/ThemeColorContextProvider";
import styles from "./CodecType.module.css";
import classNames from "classnames";

export default function CodecType({ codecType }: { codecType: Codec["type"] }) {
  const { themeColor } = useThemeColorContext();

  return (
    <p className={classNames(styles.text, styles[`text--${themeColor}`])}>
      {codecType}
    </p>
  );
}
