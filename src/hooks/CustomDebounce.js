import { useEffect, useRef, useState } from "react";

const useDebounce = (callback, delay, dependencyList) => {
  const [debouncedCallback, setDebouncedCallback] = useState("");
  const timerRef = useRef();

  useEffect(() => {
    timerRef.current = setTimeout(() => setDebouncedCallback(callback), delay);

    return () => clearTimeout(timerRef.current);
  }, [callback, delay, ...dependencyList]);

  return debouncedCallback;
};

export default useDebounce;
