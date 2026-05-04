"use client";

import { useState, useEffect } from "react";

// Tailwind v4 기본 브레이크포인트
const BREAKPOINTS = {
  sm: "(min-width: 640px)",
  md: "(min-width: 768px)",
  lg: "(min-width: 1024px)",
  xl: "(min-width: 1280px)",
  "2xl": "(min-width: 1536px)",
} as const;

type Breakpoint = keyof typeof BREAKPOINTS;

/**
 * 미디어 쿼리 문자열 또는 Tailwind 브레이크포인트 키를 받아 매칭 여부 반환
 * @example
 * useMediaQuery("md")          // Tailwind 브레이크포인트
 * useMediaQuery("(max-width: 500px)")  // 커스텀 쿼리
 */
export function useMediaQuery(query: Breakpoint | (string & {})): boolean {
  const resolvedQuery =
    query in BREAKPOINTS
      ? BREAKPOINTS[query as Breakpoint]
      : query;

  const [matches, setMatches] = useState<boolean>(false);

  useEffect(() => {
    const mediaQueryList = window.matchMedia(resolvedQuery);
    setMatches(mediaQueryList.matches);

    const handler = (e: MediaQueryListEvent) => setMatches(e.matches);
    mediaQueryList.addEventListener("change", handler);

    return () => mediaQueryList.removeEventListener("change", handler);
  }, [resolvedQuery]);

  return matches;
}
