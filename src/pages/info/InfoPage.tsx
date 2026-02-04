import { useMemo, type JSX } from "react";
import type { Headphone } from "../../redux/slices/headphones/slice";
import { useThemeColorContext } from "../../components/themeColorContextProvider/ThemeColorContextProvider";
import styles from "./InfoPage.module.css";
import classNames from "classnames";

interface InfoPageProps {
  headphoneName?: Headphone["name"];
  headphoneType?: Headphone["type"];
  headphoneMaxVolume?: Headphone["maxVolume"];
  headphoneBrand?: Headphone["brand"];
}

interface HeadphoneInfo {
  Name: string | undefined;
  Type: string | undefined;
  "Max volume": string | undefined;
  Brand: string | undefined;
}

export default function InfoPage({
  headphoneName,
  headphoneType,
  headphoneMaxVolume,
  headphoneBrand,
}: InfoPageProps) {
  const headphoneInfo = useMemo<HeadphoneInfo>(
    (): HeadphoneInfo => ({
      Name: headphoneName,
      Type: headphoneType,
      "Max volume": headphoneMaxVolume,
      Brand: headphoneBrand,
    }),
    [headphoneName, headphoneType, headphoneMaxVolume, headphoneBrand],
  );

  const { themeColor } = useThemeColorContext();

  return (
    <div
      className={classNames(
        styles.container,
        styles[`container--${themeColor}`],
      )}
    >
      <h4 className={classNames(styles.title, styles[`title--${themeColor}`])}>
        {headphoneName || "Headphone"} characteristics
      </h4>
      <ul className={styles.list}>
        {Object.entries(headphoneInfo).map(
          (
            [infoKey, infoValue]: [string, string | undefined],
            index: number,
          ): JSX.Element => (
            <li
              key={index}
              className={classNames(styles.item, styles[`item--${themeColor}`])}
            >
              <p
                className={classNames(
                  styles.text,
                  styles[`text--${themeColor}`],
                )}
              >
                <span className={styles.key}>{infoKey}</span>:{" "}
                <span className={styles.value}>{infoValue || "-"}</span>
              </p>
            </li>
          ),
        )}
      </ul>
    </div>
  );
}
