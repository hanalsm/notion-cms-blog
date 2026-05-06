import { Suspense } from "react";
import { TrendingUp } from "lucide-react";
import { getPosts } from "@/lib/notion";
import { PostCard } from "@/components/blog/PostCard";
import { TagFilter } from "@/components/blog/TagFilter";

export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<{ tag?: string }>;
}) {
  const { tag } = await searchParams;
  const posts = await getPosts(tag);

  return (
    <div className="container mx-auto max-w-screen-xl px-4 py-12">
      {/* 헤더 섹션 */}
      <section className="mb-10 rounded-2xl bg-gradient-to-br from-primary/[0.07] to-transparent px-6 py-8">
        <div className="flex items-center gap-2 mb-2">
          <TrendingUp className="size-6 text-primary" />
          <h1 className="text-3xl font-bold tracking-tight">매크로 인사이트</h1>
        </div>
        <p className="text-muted-foreground">
          금리·환율·유가 — 시장을 움직이는 변수를 날카롭게 읽습니다.
        </p>
        <div className="mt-4 h-0.5 w-10 rounded-full bg-primary/40" />
      </section>

      {/* 태그 필터 */}
      <section className="mb-8">
        <Suspense fallback={null}>
          <TagFilter />
        </Suspense>
      </section>

      {/* 글 목록 */}
      {posts.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <p className="text-muted-foreground text-lg">
            {tag ? `'${tag}' 태그의 발행된 글이 없습니다.` : "발행된 글이 없습니다."}
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            Notion에서 글 상태를 <strong>발행</strong>으로 변경해 주세요.
          </p>
        </div>
      ) : (
        <section>
          <p className="text-sm text-muted-foreground mb-4">
            {tag ? `'${tag}' · ` : "전체 · "}
            {posts.length}개의 글
          </p>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
