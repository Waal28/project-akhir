import { useState } from "react";

export const useLocalStorage = (key, initialValue) => {
  const value = JSON.parse(
    localStorage.getItem(key) || JSON.stringify(initialValue || null)
  );
  const [state, setState] = useState(value);
  return [
    state,
    (value) => {
      localStorage.setItem(key, JSON.stringify(value));
      setState(value);
    },
  ];
};
