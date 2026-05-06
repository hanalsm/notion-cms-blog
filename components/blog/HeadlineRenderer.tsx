import type { Block, RichTextSegment } from "@/lib/notion";

function RichContent({ richText, fallback }: { richText?: RichTextSegment[]; fallback: string }) {
  if (!richText?.length) return <>{fallback}</>;
  return (
    <>
      {richText.map((seg, i) =>
        seg.href ? (
          <a key={i} href={seg.href} target="_blank" rel="noopener noreferrer"
            className="hover:text-primary transition-colors">
            {seg.bold ? <strong>{seg.text}</strong> : seg.text}
          </a>
        ) : (
          <span key={i}>{seg.bold ? <strong>{seg.text}</strong> : seg.text}</span>
        )
      )}
    </>
  );
}

// Parses "[번역제목](url) // 영문원문 // 출처 // HH:MM:SS" format
function HeadlineBullet({ block }: { block: Block }) {
  const linkSeg = block.richText?.find((s) => s.href);
  const plainSeg = block.richText?.find((s) => !s.href && s.text.includes(" // "));

  if (!linkSeg || !plainSeg) {
    return (
      <li className="list-disc list-inside py-1">
        <RichContent richText={block.richText} fallback={block.content} />
      </li>
    );
  }

  const parts = plainSeg.text.split(" // ");
  const englishTitle = parts[1]?.trim() ?? "";
  const source = parts[2]?.trim() ?? "";
  const time = parts[3]?.trim() ?? "00:00:00";

  return (
    <li className="list-none border-b border-border/30 py-3 last:border-0">
      <div className="flex items-baseline gap-2 flex-wrap">
        <a href={linkSeg.href} target="_blank" rel="noopener noreferrer"
          className="font-medium leading-snug hover:text-primary transition-colors">
          {linkSeg.text}
        </a>
        {source && (
          <span className="text-sm text-muted-foreground shrink-0">— {source}</span>
        )}
      </div>
      {englishTitle && (
        <p className="text-sm text-muted-foreground/50 mt-0.5 leading-snug">
          {englishTitle}{time !== "00:00:00" ? ` — ${time}` : ""}
        </p>
      )}
    </li>
  );
}

function HeadlineBlock({ block }: { block: Block }) {
  switch (block.type) {
    case "heading_2":
      return (
        <h2 className="text-lg font-bold mt-10 mb-1 pb-2 border-b-2 border-primary/30 text-primary">
          <RichContent richText={block.richText} fallback={block.content} />
        </h2>
      );
    case "heading_3":
      return (
        <h3 className="text-base font-semibold mt-6 mb-1 text-muted-foreground">
          <RichContent richText={block.richText} fallback={block.content} />
        </h3>
      );
    case "bulleted_list_item":
      return <HeadlineBullet block={block} />;
    case "divider":
      return null;
    case "paragraph":
      if (!block.content) return null;
      return (
        <p className="text-sm text-muted-foreground leading-relaxed mb-2">
          <RichContent richText={block.richText} fallback={block.content} />
        </p>
      );
    default:
      return null;
  }
}

export function HeadlineRenderer({ blocks }: { blocks: Block[] }) {
  return (
    <div className="space-y-0">
      {blocks.map((block) => (
        <HeadlineBlock key={block.id} block={block} />
      ))}
    </div>
  );
}
