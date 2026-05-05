import Link from "next/link";
import { Separator } from "@/components/ui/separator";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-border bg-background">
      <div className="container mx-auto max-w-screen-xl px-4 py-8">
        <div className="flex justify-center">
          <div className="flex flex-col gap-2 items-center">
            <h4 className="text-sm font-semibold">링크</h4>
            <nav className="flex flex-row gap-6">
              <Link href="/" className="text-sm text-muted-foreground hover:text-foreground">
                홈
              </Link>
              <Link href="/about" className="text-sm text-muted-foreground hover:text-foreground">
                소개
              </Link>
              <Link href="/about#stack" className="text-sm text-muted-foreground hover:text-foreground">
                기술 스택
              </Link>
            </nav>
          </div>
        </div>

        <Separator className="my-6" />

        <p className="text-center text-sm text-muted-foreground">
          © {currentYear} lsm All rights reserved.
        </p>
      </div>
    </footer>
  );
}
