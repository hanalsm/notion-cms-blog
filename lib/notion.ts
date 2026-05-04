import { Client } from "@notionhq/client";

const notion = new Client({ auth: process.env.NOTION_API_KEY });
const DATABASE_ID = process.env.NOTION_DATABASE_ID!;

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

type QueryResponse = {
  results: any[];
  next_cursor: string | null;
  has_more: boolean;
};

// SDK v5에서 databases.query가 제거됨 → request()로 직접 호출
async function queryDatabase(filter: any, sorts?: any[]): Promise<any[]> {
  const response = await notion.request<QueryResponse>({
    path: `databases/${DATABASE_ID}/query`,
    method: "post",
    body: { filter, sorts },
  });
  return response.results;
}

export async function getPosts(tag?: string): Promise<Post[]> {
  const baseFilter = {
    property: "상태",
    select: { equals: "발행" },
  };

  const filter = tag
    ? { and: [baseFilter, { property: "태그", multi_select: { contains: tag } }] }
    : baseFilter;

  const results = await queryDatabase(filter, [
    { property: "발행일", direction: "descending" },
  ]);

  return results.map((page: any) => ({
    id: page.id,
    slug: page.properties["슬러그"]?.rich_text?.[0]?.plain_text ?? page.id,
    title: page.properties["제목"]?.title?.[0]?.plain_text ?? "제목 없음",
    summary: page.properties["요약"]?.rich_text?.[0]?.plain_text ?? "",
    publishedAt: page.properties["발행일"]?.date?.start ?? "",
    tags: page.properties["태그"]?.multi_select?.map((t: any) => t.name) ?? [],
  }));
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const results = await queryDatabase({
    and: [
      { property: "상태", select: { equals: "발행" } },
      { property: "슬러그", rich_text: { equals: slug } },
    ],
  });

  if (!results.length) return null;

  const page = results[0];
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
  const response = await notion.blocks.children.list({ block_id: pageId });

  return response.results.map((block: any) => {
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
