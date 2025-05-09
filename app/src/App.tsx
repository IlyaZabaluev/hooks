import { useViewportSize } from "./useViewportSize";

export function App() {
  const { height, width } = useViewportSize();

  return (
    <>
      Width: {width}, height: {height}
    </>
  );
}
