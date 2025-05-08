import { useEffect, useState } from "react";

type LocalStorageSetValue = string;
type LocalStorageReturnValue = LocalStorageSetValue | null;

type UseLocalStorage = (key: string) => [
  value: LocalStorageReturnValue,
  {
    setItem: (value: LocalStorageSetValue) => void;
    removeItem: () => void;
  }
];

export const useLocalStorage: UseLocalStorage = (key) => {
  const [value, setValue] = useState<LocalStorageReturnValue>(null);

  useEffect(() => {
    try {
      const item = localStorage.getItem(key);
      setValue(item);
    } catch (error) {
      console.error("Error parsing localStorage value:", error);
      setValue(null);
    }
  }, [key]);

  const setItem = (newValue: LocalStorageSetValue) => {
    try {
      localStorage.setItem(key, newValue);
      setValue(newValue);
    } catch (error) {
      console.error("Error writing to localStorage:", error);
    }
  };

  const removeItem = () => {
    try {
      localStorage.removeItem(key);
      setValue(null);
    } catch (error) {
      console.error("Error removing from localStorage:", error);
    }
  };

  return [value, { setItem, removeItem }];
};
