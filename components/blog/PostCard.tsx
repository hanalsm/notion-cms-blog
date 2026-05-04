import Link from "next/link";
import { Calendar } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Post } from "@/lib/notion";

const TAG_COLORS: Record<string, string> = {
  Fed: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300",
  ECB: "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300",
  BOK: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300",
  채권: "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300",
  환율: "bg-rose-100 text-rose-800 dark:bg-rose-900/30 dark:text-rose-300",
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
  return (
    <Link href={`/posts/${post.slug}`} className="group block h-full">
      <Card className="h-full transition-shadow group-hover:shadow-md">
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
