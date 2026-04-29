import { useEffect, useState } from "react";
import { throttle } from "../decorators/throttle";

const getScrollProgress = (): number => {
  const totalHeight =
    document.documentElement.scrollHeight -
    document.documentElement.clientHeight;

  const scrollProgress =
    totalHeight > 0 ? (window.pageYOffset / totalHeight) * 100 : 0;

  return scrollProgress;
};

export const useScrollProgress = (): number => {
  const [scrollProgress, setScrollProgress] = useState<number>(0);

  useEffect((): (() => void) => {
    setScrollProgress(getScrollProgress());

    const onProgress = throttle(
      (): void => setScrollProgress(getScrollProgress()),
      50,
    );

    window.addEventListener("scroll", onProgress);
    window.addEventListener("resize", onProgress);

    return (): void => {
      clearTimeout(onProgress.timeout);

      window.removeEventListener("scroll", onProgress);
      window.removeEventListener("resize", onProgress);
    };
  }, []);

  return scrollProgress;
};
