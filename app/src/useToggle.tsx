import { useReducer } from "react";

type ToggleAction<T> = { type: "TOGGLE" } | { type: "SET"; value: T };

function toggleReducer<T>(state: T, values: T[]): T {
  const currentIndex = values.indexOf(state);
  const nextIndex = (currentIndex + 1) % values.length;
  return values[nextIndex];
}

function valuesReducer<T>(state: T, action: ToggleAction<T>, values: T[]): T {
  switch (action.type) {
    case "TOGGLE":
      return toggleReducer(state, values);
    case "SET":
      return values.includes(action.value) ? action.value : state;
    default:
      return state;
  }
}

export function useToggle<T>(
  values: T[] = [false, true] as T[]
): [T, (value?: T) => void] {
  const [state, dispatch] = useReducer(
    (state: T, action: ToggleAction<T>) => valuesReducer(state, action, values),
    values[0]
  );

  const toggle = (value?: T) => {
    if (value !== undefined) {
      dispatch({ type: "SET", value });
    } else {
      dispatch({ type: "TOGGLE" });
    }
  };

  return [state, toggle];
}
