import { Layers } from "lucide-react";
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
  {
    name: "TypeScript",
    version: "5.x",
    description: "정적 타입 지원 JavaScript",
  },
  {
    name: "Tailwind CSS",
    version: "v4",
    description: "유틸리티 퍼스트 CSS 프레임워크",
  },
  { name: "shadcn/ui", version: "latest", description: "접근성 기반 UI 컴포넌트" },
  { name: "next-themes", version: "latest", description: "다크모드 지원" },
  { name: "lucide-react", version: "latest", description: "아이콘 라이브러리" },
];

export default function AboutPage() {
  return (
    <div className="container mx-auto max-w-screen-xl px-4 py-12">
      <div className="mx-auto max-w-2xl">
        {/* 헤더 */}
        <div className="mb-10 flex flex-col items-center text-center gap-4">
          <div className="flex size-16 items-center justify-center rounded-2xl bg-primary/10">
            <Layers className="size-8 text-primary" />
          </div>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              Next Starter Kit
            </h1>
            <p className="mt-2 text-muted-foreground">
              모던 웹 개발을 위한 최적화된 스타터 킷
            </p>
          </div>
          <Badge>v1.0.0</Badge>
        </div>

        <Separator className="my-8" />

        {/* 소개 */}
        <section className="mb-10">
          <h2 className="mb-4 text-xl font-semibold">프로젝트 소개</h2>
          <div className="space-y-3 text-muted-foreground">
            <p>
              이 스타터 킷은 Next.js 16 App Router를 기반으로 빠르게 프로젝트를
              시작할 수 있도록 구성되었습니다.
            </p>
            <p>
              Tailwind CSS v4의 CSS-first 설정 방식과 shadcn/ui 컴포넌트로 일관된
              디자인 시스템을 제공하며, 다크모드를 기본 지원합니다.
            </p>
            <p>
              TypeScript로 작성되어 타입 안전성을 보장하며, 프로덕션 환경에 바로
              적용 가능한 구조로 설계되었습니다.
            </p>
          </div>
        </section>

        <Separator className="my-8" />

        {/* 기술 스택 */}
        <section>
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
