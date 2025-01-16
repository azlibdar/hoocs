import { useCallback, useState } from "react";

interface UseCounterOptions {
  step?: number;
  min?: number;
  max?: number;
}

const useCounter = (initialValue = 0, { step = 1, min = Number.MIN_SAFE_INTEGER, max = Number.MAX_SAFE_INTEGER }: UseCounterOptions) => {
  if (initialValue < min) initialValue = min;
  if (initialValue > max) initialValue = max;

  const [count, setCount] = useState(initialValue);

  const increment = useCallback(() => {
    setCount((prevCount) => {
      const nextCount = prevCount + step;
      return nextCount > max ? max : nextCount;
    });
  }, [max, step]);

  const decrement = useCallback(() => {
    setCount((prevCount) => {
      const nextCount = prevCount - step;
      return nextCount < min ? min : nextCount;
    });
  }, [min, step]);

  const reset = useCallback(() => {
    setCount(initialValue);
  }, [initialValue]);

  return { count, increment, decrement, reset };
};

export default useCounter;
