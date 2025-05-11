import { useEffect } from "react";

type UseWindowEventOptions = AddEventListenerOptions | boolean | undefined;

export function useWindowEvent<K extends keyof WindowEventMap>(
  type: K,
  listener: (this: Window, ev: WindowEventMap[K]) => void,
  options: UseWindowEventOptions
) {
  useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener(type, listener, options);
      return () => window.removeEventListener(type, listener, options);
    }
  }, [type, listener]);
}
