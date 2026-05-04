import Link from "next/link";
import { Layers } from "lucide-react";
import { Separator } from "@/components/ui/separator";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-border bg-background">
      <div className="container mx-auto max-w-screen-xl px-4 py-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div className="flex flex-col gap-2">
            <Link href="/" className="flex items-center gap-2 font-semibold">
              <Layers className="size-4 text-primary" />
              <span>Next Starter</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Next.js 16 + TypeScript + Tailwind CSS + shadcn/ui 기반 스타터 킷
            </p>
          </div>

          <div className="flex flex-col gap-2">
            <h4 className="text-sm font-semibold">링크</h4>
            <nav className="flex flex-col gap-1">
              <Link
                href="/"
                className="text-sm text-muted-foreground hover:text-foreground"
              >
                홈
              </Link>
              <Link
                href="/components"
                className="text-sm text-muted-foreground hover:text-foreground"
              >
                컴포넌트
              </Link>
              <Link
                href="/about"
                className="text-sm text-muted-foreground hover:text-foreground"
              >
                소개
              </Link>
            </nav>
          </div>

          <div className="flex flex-col gap-2">
            <h4 className="text-sm font-semibold">기술 스택</h4>
            <nav className="flex flex-col gap-1">
              {["Next.js 16", "TypeScript", "Tailwind CSS v4", "shadcn/ui"].map(
                (tech) => (
                  <span key={tech} className="text-sm text-muted-foreground">
                    {tech}
                  </span>
                )
              )}
            </nav>
          </div>
        </div>

        <Separator className="my-6" />

        <p className="text-center text-sm text-muted-foreground">
          © {currentYear} Next Starter. MIT 라이선스.
        </p>
      </div>
    </footer>
  );
}
