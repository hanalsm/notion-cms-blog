"use client";

import { useState, useEffect, useCallback } from "react";

/**
 * SSR hydration 불일치를 방지하며 로컬스토리지를 useState처럼 사용
 */
export function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, (value: T | ((prev: T) => T)) => void, () => void] {
  const [storedValue, setStoredValue] = useState<T>(initialValue);

  // 클라이언트 마운트 후 로컬스토리지에서 읽기 (SSR 불일치 방지)
  useEffect(() => {
    try {
      const item = window.localStorage.getItem(key);
      if (item !== null) {
        setStoredValue(JSON.parse(item));
      }
    } catch {
      // 파싱 실패 시 initialValue 유지
    }
  }, [key]);

  const setValue = useCallback(
    (value: T | ((prev: T) => T)) => {
      try {
        setStoredValue((prev) => {
          const next = value instanceof Function ? value(prev) : value;
          window.localStorage.setItem(key, JSON.stringify(next));
          return next;
        });
      } catch {
        // 스토리지 용량 초과 등 무시
      }
    },
    [key]
  );

  const removeValue = useCallback(() => {
    try {
      window.localStorage.removeItem(key);
      setStoredValue(initialValue);
    } catch {
      // 무시
    }
  }, [key, initialValue]);

  return [storedValue, setValue, removeValue];
}
