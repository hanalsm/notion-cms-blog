// Notion API 연결 테스트 스크립트
// 사용법: npm run test-notion

import { readFileSync } from "fs";
import { resolve } from "path";

// .env.local 직접 파싱
function loadEnv() {
  try {
    const envFile = readFileSync(resolve(process.cwd(), ".env.local"), "utf-8");
    for (const line of envFile.split("\n")) {
      const [key, ...vals] = line.split("=");
      if (key && vals.length) process.env[key.trim()] = vals.join("=").trim();
    }
  } catch {
    console.error("❌ .env.local 파일이 없습니다.");
    console.log("   .env.local.example 파일을 참고해서 .env.local 을 만들어주세요.");
    process.exit(1);
  }
}

async function main() {
  loadEnv();

  const token = process.env.NOTION_API_KEY;
  const dbId  = process.env.NOTION_DATABASE_ID;

  console.log("\n🔍 Notion 연결 테스트 시작...\n");

  // 1. 토큰 형식 확인
  if (!token) {
    console.error("❌ NOTION_API_KEY 가 없습니다.");
    process.exit(1);
  }
  if (!token.startsWith("ntn_") && !token.startsWith("secret_")) {
    console.error("❌ 토큰 형식이 이상합니다:", token.slice(0, 10) + "...");
    process.exit(1);
  }
  console.log("✅ 토큰 형식 OK:", token.slice(0, 10) + "...");

  // 2. DB ID 형식 확인
  if (!dbId || dbId.replace(/-/g, "").length !== 32) {
    console.error("❌ NOTION_DATABASE_ID 가 없거나 형식이 잘못됐습니다:", dbId);
    process.exit(1);
  }
  console.log("✅ DB ID 형식 OK:", dbId);

  // 3. API 호출 테스트
  console.log("\n📡 Notion API 호출 중...");
  try {
    const res = await fetch(
      `https://api.notion.com/v1/databases/${dbId}/query`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Notion-Version": "2022-06-28",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({}),
      }
    );

    const text = await res.text();

    // HTML이 돌아오면 네트워크/방화벽 문제
    if (text.trim().startsWith("<")) {
      console.error("❌ Notion API가 HTML을 반환했습니다 — 네트워크/방화벽 차단 가능성");
      console.log("   첫 100자:", text.slice(0, 100));
      process.exit(1);
    }

    const data = JSON.parse(text);

    if (data.status === 401) {
      console.error("❌ 인증 실패 (401) — 토큰이 잘못됐습니다.");
      console.log("   메시지:", data.message);
      process.exit(1);
    }

    if (data.status === 404) {
      console.error("❌ DB를 찾을 수 없음 (404) — DB ID가 틀렸거나 통합이 연결 안 됐습니다.");
      console.log("   Notion DB 페이지 → ... → 연결 → 통합 추가 했는지 확인하세요.");
      process.exit(1);
    }

    if (data.status === 403) {
      console.error("❌ 권한 없음 (403) — Notion DB에 통합을 연결해주세요.");
      console.log("   Notion DB 페이지 → 우측 상단 ... → 연결 → 통합 추가");
      process.exit(1);
    }

    if (data.object === "list") {
      console.log("✅ API 연결 성공!");
      console.log(`   DB 안의 페이지 수: ${data.results.length}개`);
      if (data.results.length === 0) {
        console.log("   (아직 글이 없습니다. Notion에서 글을 추가해보세요.)");
      }
    } else {
      console.log("⚠️  예상치 못한 응답:", JSON.stringify(data).slice(0, 200));
    }

  } catch (err) {
    console.error("❌ 네트워크 오류:", err.message);
    process.exit(1);
  }

  console.log("\n🎉 모든 테스트 통과! npm run dev 로 실행하세요.\n");
}

main();
