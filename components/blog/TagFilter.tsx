"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";

const ALL_TAGS = [
  "금리",
  "중앙은행",
  "Fed",
  "ECB",
  "BOK",
  "환율",
  "채권",
  "유가",
  "인플레이션",
  "미중무역",
  "거시경제",
  "시장분석",
];

export function TagFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const activeTag = searchParams.get("tag");

  function handleTag(tag: string | null) {
    const params = new URLSearchParams(searchParams.toString());
    if (!tag || activeTag === tag) {
      params.delete("tag");
    } else {
      params.set("tag", tag);
    }
    router.push(`/?${params.toString()}`);
  }

  return (
    <div className="flex flex-wrap gap-2">
      <button
        onClick={() => handleTag(null)}
        className={cn(
          "rounded-full px-3 py-1 text-sm font-medium transition-colors",
          !activeTag
            ? "bg-primary text-primary-foreground"
            : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
        )}
      >
        전체
      </button>
      {ALL_TAGS.map((tag) => (
        <button
          key={tag}
          onClick={() => handleTag(tag)}
          className={cn(
            "rounded-full px-3 py-1 text-sm font-medium transition-colors",
            activeTag === tag
              ? "bg-primary text-primary-foreground"
              : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
          )}
        >
          {tag}
        </button>
      ))}
    </div>
  );
}
