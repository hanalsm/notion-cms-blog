import { TrendingUp } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

const stack = [
  { name: "Next.js", version: "16.x", description: "React 풀스택 프레임워크" },
  { name: "TypeScript", version: "5.x", description: "정적 타입 지원 JavaScript" },
  { name: "Tailwind CSS", version: "v4", description: "유틸리티 퍼스트 CSS 프레임워크" },
  { name: "shadcn/ui", version: "latest", description: "접근성 기반 UI 컴포넌트" },
  { name: "next-themes", version: "latest", description: "다크모드 지원" },
  { name: "Notion API", version: "2022-06-28", description: "콘텐츠 CMS" },
];

export default function AboutPage() {
  return (
    <div className="container mx-auto max-w-screen-xl px-4 py-12">
      <div className="mx-auto max-w-2xl">
        {/* 헤더 */}
        <div className="mb-10 flex flex-col items-center text-center gap-4">
          <div className="flex size-16 items-center justify-center rounded-2xl bg-primary/10">
            <TrendingUp className="size-8 text-primary" />
          </div>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">매크로 인사이트</h1>
            <p className="mt-2 text-muted-foreground">
              금리·환율·유가·중앙은행, 매일 업데이트되는 매크로 분석 블로그
            </p>
          </div>
        </div>

        <Separator className="my-8" />

        {/* 소개 */}
        <section className="mb-10">
          <h2 className="mb-4 text-xl font-semibold">프로젝트 소개</h2>
          <div className="space-y-3 text-muted-foreground">
            <p>
              매크로 인사이트는 매일 글로벌 금융시장에서 가장 주목할 만한 이슈를 선별해
              분석 글을 업데이트하는 블로그입니다.
            </p>
            <p>
              Fed 금리 결정, 원·달러 환율 흐름, 국제 유가 동향, 미중 무역 갈등 등
              거시경제 전반을 다루며, 단순한 뉴스 요약을 넘어 투자 시사점까지 함께 제공합니다.
            </p>
            <p>
              복잡한 매크로 환경을 빠르고 명확하게 파악할 수 있도록,
              핵심만 담아 매일 한 편씩 발행합니다.
            </p>
          </div>
        </section>

        <Separator className="my-8" />

        {/* 기술 스택 */}
        <section id="stack">
          <h2 className="mb-4 text-xl font-semibold">기술 스택</h2>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {stack.map(({ name, version, description }) => (
              <Card key={name} className="flex flex-col gap-1">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base">{name}</CardTitle>
                    <Badge variant="outline" className="text-xs">
                      {version}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
