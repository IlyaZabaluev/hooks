import { useToggle } from "./useToggle";

export function App() {
  const [value, toggle] = useToggle(["blue", "orange", "cyan", "teal"]);

  return <button onClick={() => toggle()}>{value}</button>;
}
