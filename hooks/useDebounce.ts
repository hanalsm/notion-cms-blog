"use client";

import { useState, useEffect } from "react";

/**
 * 빠른 연속 변경을 delay ms 후 한 번만 반영 (검색 입력, API 호출 등에 사용)
 */
export function useDebounce<T>(value: T, delay: number = 300): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
}
