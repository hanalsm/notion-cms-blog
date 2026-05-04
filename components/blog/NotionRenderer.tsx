import type { Block } from "@/lib/notion";

export function NotionRenderer({ blocks }: { blocks: Block[] }) {
  return (
    <div className="prose prose-neutral dark:prose-invert max-w-none">
      {blocks.map((block) => (
        <NotionBlock key={block.id} block={block} />
      ))}
    </div>
  );
}

function NotionBlock({ block }: { block: Block }) {
  switch (block.type) {
    case "heading_1":
      return <h1 className="text-3xl font-bold mt-10 mb-4">{block.content}</h1>;
    case "heading_2":
      return <h2 className="text-2xl font-bold mt-8 mb-3">{block.content}</h2>;
    case "heading_3":
      return <h3 className="text-xl font-semibold mt-6 mb-2">{block.content}</h3>;
    case "paragraph":
      if (!block.content) return <br />;
      return <p className="leading-relaxed mb-4">{block.content}</p>;
    case "bulleted_list_item":
      return (
        <ul className="list-disc list-inside mb-2">
          <li>{block.content}</li>
        </ul>
      );
    case "numbered_list_item":
      return (
        <ol className="list-decimal list-inside mb-2">
          <li>{block.content}</li>
        </ol>
      );
    case "quote":
      return (
        <blockquote className="border-l-4 border-primary pl-4 italic text-muted-foreground my-4">
          {block.content}
        </blockquote>
      );
    case "divider":
      return <hr className="my-8 border-border" />;
    case "image":
      if (!block.url) return null;
      return (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={block.url}
          alt=""
          className="rounded-lg my-6 w-full object-cover"
        />
      );
    default:
      return null;
  }
}
