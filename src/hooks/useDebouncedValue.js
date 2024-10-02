import { useEffect, useState } from "react";

const useDebouncedValue = (value, timeout) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const debounceTimeout = setTimeout(() => {
      setDebouncedValue(value);
    }, timeout);

    return () => clearTimeout(debounceTimeout);
  }, [value, timeout]);

  return debouncedValue
};

export default useDebouncedValue;
