import { useEffect, useMemo } from "react";

export const useImageURL = (blob: Blob): string => {
  const imageURL = useMemo((): string => URL.createObjectURL(blob), [blob]);

  useEffect(
    (): (() => void) => (): void => {
      URL.revokeObjectURL(imageURL);
    },
    [imageURL],
  );

  return imageURL;
};
