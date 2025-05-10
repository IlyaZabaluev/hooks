import { useRef, useState, useEffect } from "react";
import type { Ref } from "react";

type UseHoverReturn<T extends HTMLElement> = {
  hovered: boolean;
  ref: Ref<T>;
};

export const useHover = <T extends HTMLElement>(): UseHoverReturn<T> => {
  const [hovered, setHovered] = useState(false);
  const ref = useRef<T>(null);

  console.log(hovered);

  const handleMouseEnter = () => setHovered(true);
  const handleMouseLeave = () => setHovered(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    element.addEventListener("mouseenter", handleMouseEnter);
    element.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      element.removeEventListener("mouseenter", handleMouseEnter);
      element.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return { hovered, ref };
};
