"use client";

import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { Moon, Sun, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/", label: "글" },
  { href: "/headlines", label: "헤드라인" },
];

export function Header() {
  const { theme, setTheme } = useTheme();
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/" || pathname.startsWith("/posts");
    return pathname.startsWith(href);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-14 max-w-screen-xl items-center gap-6 px-4">
        <a href="/" className="flex items-center gap-2 font-semibold shrink-0">
          <TrendingUp className="size-5 text-primary" />
          <span>매크로 인사이트</span>
        </a>

        <nav className="flex items-center gap-1">
          {navLinks.map(({ href, label }) => (
            <a
              key={href}
              href={href}
              className={cn(
                "px-3 py-1.5 rounded-md text-sm font-medium transition-colors",
                isActive(href)
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:text-foreground hover:bg-accent"
              )}
            >
              {label}
            </a>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            aria-label="테마 전환"
          >
            <Sun className="size-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute size-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          </Button>
        </div>
      </div>
    </header>
  );
}
