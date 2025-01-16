import { useState, useEffect, RefObject } from "react";

function useInViewport<T extends HTMLElement>(ref: RefObject<T>) {
  const [isInViewport, setIsInViewport] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]: IntersectionObserverEntry[]): void => {
        setIsInViewport(entry.isIntersecting);
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: 0,
      }
    );

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, [ref]);

  return isInViewport;
}

export default useInViewport;
