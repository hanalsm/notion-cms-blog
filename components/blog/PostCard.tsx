import Link from "next/link";
import { Calendar } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import type { Post } from "@/lib/notion";

const TAG_COLORS: Record<string, string> = {
  Fed: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300",
  ECB: "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300",
  BOK: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300",
  채권: "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300",
  환율: "bg-rose-100 text-rose-800 dark:bg-rose-900/30 dark:text-rose-300",
  금리: "bg-sky-100 text-sky-800 dark:bg-sky-900/30 dark:text-sky-300",
  중앙은행: "bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-300",
  유가: "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300",
  인플레이션: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300",
  미중무역: "bg-teal-100 text-teal-800 dark:bg-teal-900/30 dark:text-teal-300",
  거시경제: "bg-slate-100 text-slate-700 dark:bg-slate-800/50 dark:text-slate-300",
  시장분석: "bg-violet-100 text-violet-800 dark:bg-violet-900/30 dark:text-violet-300",
};

const TAG_BORDER: Record<string, string> = {
  Fed: "border-l-blue-400",
  ECB: "border-l-purple-400",
  BOK: "border-l-green-400",
  채권: "border-l-amber-400",
  환율: "border-l-rose-400",
  금리: "border-l-sky-400",
  중앙은행: "border-l-indigo-400",
  유가: "border-l-orange-400",
  인플레이션: "border-l-red-400",
  미중무역: "border-l-teal-400",
  거시경제: "border-l-slate-400",
  시장분석: "border-l-violet-400",
};

function formatDate(dateStr: string) {
  if (!dateStr) return "";
  return new Date(dateStr).toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function PostCard({ post }: { post: Post }) {
  const primaryTag = post.tags[0];
  const borderColor = TAG_BORDER[primaryTag] ?? "border-l-border";

  return (
    <Link href={`/posts/${post.slug}`} className="group block h-full">
      <Card
        className={`h-full border-l-4 ${borderColor} transition-all duration-200 group-hover:shadow-md group-hover:-translate-y-0.5`}
      >
        <CardHeader>
          <CardTitle className="text-base leading-snug group-hover:text-primary transition-colors">
            {post.title}
          </CardTitle>
          {post.summary && (
            <CardDescription className="line-clamp-2 text-sm">
              {post.summary}
            </CardDescription>
          )}
        </CardHeader>
        <CardContent className="mt-auto flex flex-col gap-3">
          {post.tags.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${TAG_COLORS[tag] ?? "bg-secondary text-secondary-foreground"}`}
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
          {post.publishedAt && (
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Calendar className="size-3" />
              <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
            </div>
          )}
        </CardContent>
      </Card>
    </Link>
  );
}
