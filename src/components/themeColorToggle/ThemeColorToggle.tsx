import Button from "../button/Button";
import { useThemeColorContext } from "../themeColorContextProvider/ThemeColorContextProvider";
import { useThrottleFn } from "ahooks";

export default function ThemeColorToggle() {
  const { themeColor, setLightTheme, setDarkTheme } = useThemeColorContext();

  let toggleThemeColor = (): void =>
    themeColor === "light" ? setDarkTheme() : setLightTheme();

  ({ run: toggleThemeColor } = useThrottleFn(toggleThemeColor, { wait: 300 }));

  return (
    <Button onClick={toggleThemeColor}>
      {themeColor === "light" ? "☾" : themeColor === "dark" ? "☀" : "◑"}
    </Button>
  );
}
