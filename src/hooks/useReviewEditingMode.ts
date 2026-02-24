import { useCallback, useState } from "react";

interface UseReviewEditingModeReturn {
  isEditing: boolean;
  startEditing: () => void;
  stopEditing: () => void;
}

export const useReviewEditingMode = (): UseReviewEditingModeReturn => {
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const startEditing = useCallback((): void => {
    setIsEditing(true);
  }, []);

  const stopEditing = useCallback((): void => {
    setIsEditing(false);
  }, []);

  return { isEditing, startEditing, stopEditing };
};
