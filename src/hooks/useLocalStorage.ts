import { useEffect, useState } from "react";

function getStorageValue(key: string, defaultValue: string) {
  // getting stored value
  const saved = localStorage.getItem(key);
  return !!saved ? JSON.parse(saved) : defaultValue;
}

export const useLocalStorage = (key: string, defaultValue: string) => {
  const [value, setValue] = useState(() => {
    return getStorageValue(key, defaultValue);
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
};
