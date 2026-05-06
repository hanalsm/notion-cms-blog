import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getHeadlineById, getPageBlocks } from "@/lib/notion";
import { HeadlineRenderer } from "@/components/blog/HeadlineRenderer";

export const revalidate = 300;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const headline = await getHeadlineById(id);
  if (!headline) return {};
  return { title: `${headline.title} | 매크로 인사이트` };
}

export default async function HeadlineDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const [headline, blocks] = await Promise.all([
    getHeadlineById(id),
    getPageBlocks(id),
  ]);

  if (!headline || !blocks.length) notFound();

  return (
    <main className="container mx-auto max-w-screen-md px-4 py-12">
      <Link
        href="/headlines"
        className="mb-8 inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft className="size-4" />
        헤드라인 목록으로
      </Link>

      <header className="mb-6">
        <h1 className="text-2xl font-bold">{headline.title}</h1>
      </header>

      <article>
        <HeadlineRenderer blocks={blocks} />
      </article>
    </main>
  );
}
