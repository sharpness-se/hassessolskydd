import { useState, useEffect } from "react";

export default function useDebounceHook(value, timeout, callback) {
  const [timer, setTimer] = useState(null);
  const clearTimer = () => {
    if (timer) clearTimeout(timer);
  };
  useEffect(() => {
    clearTimer();
    if (value && callback) {
      const newTimer = setTimeout(callback, timeout);
      setTimer(newTimer);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);
}