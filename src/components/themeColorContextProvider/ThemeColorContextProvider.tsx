import { createContext, useCallback, useContext, useState } from "react";

type ThemeColor = "light" | "dark";

interface ThemeColorContextValue {
  themeColor: ThemeColor;
  setLightTheme: () => void;
  setDarkTheme: () => void;
}

const ThemeColorContext = createContext<ThemeColorContextValue>({
  themeColor: "light",
  setLightTheme: (): void => undefined,
  setDarkTheme: (): void => undefined,
});

export const useThemeColorContext = (): ThemeColorContextValue =>
  useContext(ThemeColorContext);

export default function ThemeColorContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [themeColor, setThemeColor] = useState<ThemeColor>("light");

  const setLightTheme = useCallback((): void => setThemeColor("light"), []);
  const setDarkTheme = useCallback((): void => setThemeColor("dark"), []);

  return (
    <ThemeColorContext.Provider
      value={{ themeColor, setLightTheme, setDarkTheme }}
    >
      {children}
    </ThemeColorContext.Provider>
  );
}
