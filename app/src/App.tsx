import { useHover } from "./useHover";

export function App() {
  const { hovered, ref } = useHover<HTMLDivElement>();

  return (
    <div ref={ref}>
      {hovered ? "На меня навели мышку" : "Наведи мышкой на меня"}
    </div>
  );
}
