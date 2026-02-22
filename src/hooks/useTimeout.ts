import { useCallback, useEffect, useRef } from "react";

interface UseTimeoutReturn {
  setTimer: (func: TimerHandler, ms: number) => void;
  clearTimer: () => void;
}

export const useTimeout = (): UseTimeoutReturn => {
  const timeoutRef = useRef<number | undefined>(undefined);

  const clearTimer = useCallback((): void => {
    clearTimeout(timeoutRef.current);

    timeoutRef.current = undefined;
  }, []);

  const setTimer = useCallback(
    (func: TimerHandler, ms: number): void => {
      clearTimer();

      timeoutRef.current = setTimeout(func, ms);
    },
    [clearTimer],
  );

  useEffect(
    (): (() => void) => (): void => {
      clearTimer();
    },
    [clearTimer],
  );

  return { setTimer, clearTimer };
};
