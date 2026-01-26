import { useEffect } from "react";

const getOuterHeight = (element: HTMLElement | null): number => {
  if (!element) return 0;

  const height = element.offsetHeight;
  const marginTop = parseFloat(getComputedStyle(element).marginTop);
  const marginBottom = parseFloat(getComputedStyle(element).marginBottom);

  return height + marginTop + marginBottom;
};

const getVerticalMargins = (element: HTMLElement | null): number => {
  if (!element) return 0;

  const marginTop = parseFloat(getComputedStyle(element).marginTop);
  const marginBottom = parseFloat(getComputedStyle(element).marginBottom);

  return marginTop + marginBottom;
};

export const useMainMinHeight = (
  mainRef: React.RefObject<HTMLElement>,
): void => {
  useEffect((): (() => void) => {
    const main = mainRef.current;

    const updateMainMinHeight = (): void => {
      const header = document.body.querySelector("header");
      const footer = document.body.querySelector("footer");

      const headerOuterHeight = getOuterHeight(header);
      const footerOuterHeight = getOuterHeight(footer);

      const mainVerticalMargins = getVerticalMargins(main);

      const mainMinHeight =
        document.documentElement.clientHeight -
        (headerOuterHeight + footerOuterHeight + mainVerticalMargins);

      main.style.minHeight = `${mainMinHeight}px`;
    };

    updateMainMinHeight();

    window.addEventListener("resize", updateMainMinHeight);

    return (): void => {
      window.removeEventListener("resize", updateMainMinHeight);

      main.style.minHeight = "";
    };
  }, [mainRef]);
};
