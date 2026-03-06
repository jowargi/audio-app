import { useCallback, useEffect, useRef, type RefObject } from "react";
import styles from "./useTooltip.module.css";
import classNames from "classnames";
import { useThemeColorContext } from "../../components/themeColorContextProvider/ThemeColorContextProvider";

interface UseTooltipReturn {
  addTooltip: (tooltipInnerHTML: string) => void;
  removeTooltip: () => void;
  moveTooltip: (left: number, top: number) => void;
}

export const useTooltip = (
  targetRef: RefObject<HTMLElement>,
): UseTooltipReturn => {
  const tooltipRef = useRef<HTMLDivElement | undefined>(undefined);

  const { themeColor } = useThemeColorContext();

  const addTooltip = useCallback(
    (tooltipInnerHTML: string): void => {
      if (tooltipRef.current) return;

      tooltipRef.current = document.createElement("div");

      tooltipRef.current.innerHTML = tooltipInnerHTML;
      tooltipRef.current.className = classNames(
        styles.tooltip,
        styles[`tooltip--${themeColor}`],
      );

      targetRef.current.style.position = "relative";

      targetRef.current.append(tooltipRef.current);
    },
    [targetRef, themeColor],
  );

  const removeTooltip = useCallback((): void => {
    if (!tooltipRef.current) return;

    targetRef.current.style.position = "";

    tooltipRef.current.remove();

    tooltipRef.current = undefined;
  }, [targetRef]);

  const moveTooltip = useCallback((left: number, top: number): void => {
    if (!tooltipRef.current) return;

    tooltipRef.current.style.left = `${left}px`;
    tooltipRef.current.style.top = `${top}px`;
  }, []);

  useEffect(
    (): (() => void) => (): void => {
      removeTooltip();
    },
    [removeTooltip],
  );

  return { addTooltip, removeTooltip, moveTooltip };
};
