import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Calendar } from "lucide-react";
import { getPostBySlug, getPageBlocks } from "@/lib/notion";
import { NotionRenderer } from "@/components/blog/NotionRenderer";

function formatDate(dateStr: string) {
  if (!dateStr) return "";
  return new Date(dateStr).toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

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

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) notFound();

  const blocks = await getPageBlocks(post.id);

  return (
    <div className="container mx-auto max-w-3xl px-4 py-12">
      {/* 뒤로 가기 */}
      <Link
        href="/"
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
      >
        <ArrowLeft className="size-4" />
        목록으로
      </Link>

      {/* 글 헤더 */}
      <header className="mb-10">
        {post.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-4">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${TAG_COLORS[tag] ?? "bg-secondary text-secondary-foreground"}`}
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        <h1 className="text-3xl font-bold tracking-tight leading-snug mb-4">
          {post.title}
        </h1>

        {post.summary && (
          <p className="text-lg text-muted-foreground mb-4">{post.summary}</p>
        )}

        {post.publishedAt && (
          <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <Calendar className="size-4" />
            <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
          </div>
        )}
      </header>

      <hr className="border-border mb-10" />

      {/* 본문 */}
      <NotionRenderer blocks={blocks} />
    </div>
  );
}
