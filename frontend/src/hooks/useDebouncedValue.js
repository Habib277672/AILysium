import { useEffect, useState } from "react";

// Returns `value` only after it has stayed unchanged for `delay` ms — keeps
// search inputs from firing a network request on every keystroke.
export const useDebouncedValue = (value, delay = 300) => {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debounced;
};
