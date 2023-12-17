import { useEffect, useCallback, useRef } from 'react';

export default function useDebounceHook(value, timeout, callback) {
  const timerRef = useRef(null);
  const callbackRef = useRef(callback);
  const clearTimer = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
  }, []);

  useEffect(() => {
    // Update the callback ref whenever callback changes
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    clearTimer();

    if (value && callbackRef.current) {
      const newTimer = setTimeout(callbackRef.current, timeout);
      timerRef.current = newTimer;
    }

    return () => clearTimer();
  }, [value, timeout, clearTimer]);
}