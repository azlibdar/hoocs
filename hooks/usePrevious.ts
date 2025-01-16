import { useState, useEffect, useRef } from "react";

const usePrevious = <T>(initialValue: T) => {
  const [state, setState] = useState<T>(initialValue);
  const previousRef = useRef<T | undefined>(undefined);

  useEffect(() => {
    previousRef.current = state;
  }, [state]);

  return [previousRef.current, state, setState];
};

export default usePrevious;
