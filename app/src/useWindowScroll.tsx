import { useCallback, useState } from "react";
import { useWindowEvent } from "./useWindowEvent";

type ScrollPosition = {
  x: number;
  y: number;
};

type ScrollToOptions = {
  x?: number;
  y?: number;
};

export function useWindowScroll(): [
  ScrollPosition,
  (options: ScrollToOptions) => void
] {
  const [scroll, setScroll] = useState<ScrollPosition>({
    x: typeof window !== "undefined" ? window.scrollX : 0,
    y: typeof window !== "undefined" ? window.scrollY : 0,
  });

  const scrollTo = useCallback(({ x, y }: ScrollToOptions = {}) => {
    if (typeof window !== "undefined") {
      window.scrollTo({
        top: y ?? window.scrollY,
        left: x ?? window.scrollX,
      });
    }
  }, []);

  const updateScrollPosition = useCallback(() => {
    setScroll({
      x: window.scrollX,
      y: window.scrollY,
    });
  }, []);

  useWindowEvent("scroll", updateScrollPosition, { passive: true });
  useWindowEvent("resize", updateScrollPosition, { passive: true });

  return [scroll, scrollTo];
}
