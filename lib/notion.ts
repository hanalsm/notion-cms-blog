export type Post = {
  id: string;
  slug: string;
  title: string;
  summary: string;
  publishedAt: string;
  tags: string[];
};

export type Block = {
  id: string;
  type: string;
  content: string;
  url?: string;
};

const TOKEN = process.env.NOTION_API_KEY!;
const DB_ID = process.env.NOTION_DATABASE_ID!;
const NOTION_VERSION = "2022-06-28";

async function notionFetch(path: string, body?: object) {
  const res = await fetch(`https://api.notion.com/v1/${path}`, {
    method: body ? "POST" : "GET",
    headers: {
      Authorization: `Bearer ${TOKEN}`,
      "Notion-Version": NOTION_VERSION,
      "Content-Type": "application/json",
    },
    body: body ? JSON.stringify(body) : undefined,
    cache: "no-store",
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Notion API 오류 (${res.status}): ${text.slice(0, 200)}`);
  }

  return res.json();
}

export async function getPosts(tag?: string): Promise<Post[]> {
  const baseFilter = { property: "상태", select: { equals: "발행" } };

  const filter = tag
    ? { and: [baseFilter, { property: "태그", multi_select: { contains: tag } }] }
    : baseFilter;

  const data = await notionFetch(`databases/${DB_ID}/query`, {
    filter,
    sorts: [{ property: "발행일", direction: "descending" }],
  });

  return data.results.map((page: any) => ({
    id: page.id,
    slug: page.properties["슬러그"]?.rich_text?.[0]?.plain_text ?? page.id,
    title: page.properties["제목"]?.title?.[0]?.plain_text ?? "제목 없음",
    summary: page.properties["요약"]?.rich_text?.[0]?.plain_text ?? "",
    publishedAt: page.properties["발행일"]?.date?.start ?? "",
    tags: page.properties["태그"]?.multi_select?.map((t: any) => t.name) ?? [],
  }));
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const data = await notionFetch(`databases/${DB_ID}/query`, {
    filter: {
      and: [
        { property: "상태", select: { equals: "발행" } },
        { property: "슬러그", rich_text: { equals: slug } },
      ],
    },
  });

  if (!data.results.length) return null;

  const page = data.results[0];
  return {
    id: page.id,
    slug: page.properties["슬러그"]?.rich_text?.[0]?.plain_text ?? page.id,
    title: page.properties["제목"]?.title?.[0]?.plain_text ?? "제목 없음",
    summary: page.properties["요약"]?.rich_text?.[0]?.plain_text ?? "",
    publishedAt: page.properties["발행일"]?.date?.start ?? "",
    tags: page.properties["태그"]?.multi_select?.map((t: any) => t.name) ?? [],
  };
}

export async function getPageBlocks(pageId: string): Promise<Block[]> {
  const data = await notionFetch(`blocks/${pageId}/children`);

  return data.results.map((block: any) => {
    const { type } = block;
    const richTextTypes = [
      "paragraph", "heading_1", "heading_2", "heading_3",
      "bulleted_list_item", "numbered_list_item", "quote",
    ];

    const content = richTextTypes.includes(type)
      ? (block[type]?.rich_text?.map((rt: any) => rt.plain_text).join("") ?? "")
      : "";

    const url =
      type === "image"
        ? (block.image?.file?.url ?? block.image?.external?.url)
        : undefined;

    return { id: block.id, type, content, url };
  });
}
