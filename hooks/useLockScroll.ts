import { useCallback, useLayoutEffect, useState } from "react";

const useLockScroll = () => {
  const [isLocked, setIsLocked] = useState(false);

  useLayoutEffect(() => {
    const originalStyle = window.getComputedStyle(document.body);
    const originalOverflow = originalStyle.overflow;
    const originalPaddingRight = originalStyle.paddingRight;

    const lockScroll = () => {
      const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;
      document.body.style.overflow = "hidden";
      document.body.style.paddingRight = `${scrollBarWidth}px`;
    };

    const unlockScroll = () => {
      document.body.style.overflow = originalOverflow;
      document.body.style.paddingRight = originalPaddingRight;
    };

    if (isLocked) {
      lockScroll();
    } else {
      unlockScroll();
    }

    return () => {
      unlockScroll();
    };
  }, [isLocked]);

  const setLock = useCallback((value: boolean) => {
    setIsLocked(value);
  }, []);

  return setLock;
};

export default useLockScroll;
