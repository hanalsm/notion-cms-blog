"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";

const ALL_TAGS = ["Fed", "ECB", "BOK", "채권", "환율"];

export function TagFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const activeTag = searchParams.get("tag");

  function handleTag(tag: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (activeTag === tag) {
      params.delete("tag");
    } else {
      params.set("tag", tag);
    }
    router.push(`/?${params.toString()}`);
  }

  return (
    <div className="flex flex-wrap gap-2">
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
