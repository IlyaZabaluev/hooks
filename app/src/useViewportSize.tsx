import { useEffect, useState } from "react";

type UseWindowEventOptions = AddEventListenerOptions | boolean | undefined;
type ViewportSize = {
  width: number;
  height: number;
};

function useWindowEvent<K extends keyof WindowEventMap>(
  type: K,
  listener: (this: Window, ev: WindowEventMap[K]) => void,
  options?: UseWindowEventOptions
) {
  useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener(type, listener, options);
      return () => window.removeEventListener(type, listener, options);
    }
  }, [type, listener, options]);
}

export function useViewportSize(): ViewportSize {
  const [dimensions, setDimensions] = useState<ViewportSize>(() => ({
    width: typeof window !== "undefined" ? window.innerWidth : 0,
    height: typeof window !== "undefined" ? window.innerHeight : 0,
  }));

  const handleResize = () => {
    setDimensions({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  };

  useWindowEvent("resize", handleResize);
  useWindowEvent("orientationchange", handleResize);

  return {
    height: dimensions.height,
    width: dimensions.width,
  };
}
