/* eslint-disable @typescript-eslint/no-explicit-any */

export type ThrottledFunc<F extends (...args: any[]) => any> = {
  (this: any, ...args: Parameters<F>): void;
  timeout?: ReturnType<typeof setTimeout>;
};

export const throttle = <F extends (...args: any[]) => any>(
  func: F,
  ms: number,
): ThrottledFunc<F> => {
  let isThrottled = false;
  let savedThis: any;
  let savedArgs: Parameters<F> | undefined;

  return function throttledFunc(this: any, ...args: Parameters<F>): void {
    if (isThrottled) {
      // eslint-disable-next-line @typescript-eslint/no-this-alias
      savedThis = this;
      savedArgs = args;

      return;
    }

    func.call(this, ...args);

    isThrottled = true;

    (throttledFunc as ThrottledFunc<F>).timeout = setTimeout((): void => {
      isThrottled = false;

      if (savedArgs) throttledFunc.call(savedThis, ...savedArgs);

      savedThis = savedArgs = undefined;
    }, ms);
  };
};
