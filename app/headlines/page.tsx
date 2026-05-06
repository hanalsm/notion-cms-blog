import Link from "next/link";
import { getHeadlines } from "@/lib/notion";
import { CalendarDays, Newspaper } from "lucide-react";

export const revalidate = 60;

function formatDate(dateStr: string) {
  if (!dateStr) return "";
  const [year, month, day] = dateStr.split("-");
  return `${year.slice(2)}/${month}/${day}`;
}

export default async function HeadlinesPage() {
  const headlines = await getHeadlines();

  return (
    <main className="container mx-auto max-w-screen-xl px-4 py-12">
      <div className="mb-10 space-y-2">
        <div className="flex items-center gap-2 text-primary">
          <Newspaper className="size-5" />
          <span className="text-sm font-semibold uppercase tracking-wider">Daily Headlines</span>
        </div>
        <h1 className="text-3xl font-bold">데일리 헤드라인</h1>
        <p className="text-muted-foreground">
          매크로 관련 주요 뉴스를 주제별로 매일 정리합니다.
        </p>
      </div>

      {headlines.length === 0 ? (
        <p className="text-muted-foreground">발행된 헤드라인이 없습니다.</p>
      ) : (
        <ul className="divide-y divide-border">
          {headlines.map((item) => (
            <li key={item.id}>
              <Link
                href={`/headlines/${item.id}`}
                className="group flex items-center justify-between gap-4 py-4 hover:text-primary transition-colors"
              >
                <div className="flex items-center gap-3">
                  <CalendarDays className="size-4 text-muted-foreground shrink-0" />
                  <span className="font-medium group-hover:text-primary transition-colors">
                    {item.title}
                  </span>
                </div>
                <span className="text-sm text-muted-foreground shrink-0">
                  {formatDate(item.publishedAt)}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
