# PRD - 매크로 인사이트 블로그

## 프로젝트 개요

- **프로젝트명**: 매크로 인사이트 블로그
- **목적**: Notion을 CMS로 활용한 금리·매크로 분석 인사이트 발행 블로그
- **CMS 선택 이유**: Notion API를 활용하여 비개발자도 콘텐츠 관리 가능

---

## 주요 기능

1. Notion 데이터베이스에서 글 목록 자동 fetch 및 카드 형태로 표시
2. 태그(Fed / ECB / BOK / 채권 / 환율) 기반 필터링
3. 글 상세 페이지 — Notion 블록을 웹 본문으로 렌더링

---

## 기술 스택

- **Frontend**: Next.js 15, TypeScript
- **CMS**: Notion API (`@notionhq/client`)
- **Styling**: Tailwind CSS, shadcn/ui
- **Icons**: Lucide React

---

## Notion 데이터베이스 구조

| 필드 | 타입 | 설명 |
|------|------|------|
| `제목` | Title | 글 제목 |
| `발행일` | Date | 공개 날짜 |
| `태그` | Multi-select | Fed, ECB, BOK, 채권, 환율 등 분류 태그 |
| `요약` | Rich text | 목록 카드에 노출되는 한 줄 요약 |
| `상태` | Select | `초안` / `발행` — 발행 상태만 노출 |
| `슬러그` | Rich text | URL 경로용 고유 식별자 (예: `fed-rate-hold-2025`) |

---

## 화면 구성

- **목록 페이지 (`/`)**: 발행된 글을 카드 그리드로 표시, 태그 클릭 시 필터링, 최신순 정렬
- **상세 페이지 (`/posts/[slug]`)**: 글 본문 렌더링, 태그 뱃지, 발행일 표시, 목록으로 돌아가기 버튼

---

## MVP 범위

- Notion API 연동 및 환경 변수 설정
- 상태가 `발행`인 글만 목록에 노출
- 글 목록 카드 (제목, 요약, 발행일, 태그)
- 태그 단일 필터
- 글 상세 페이지 (Notion 블록 → HTML 렌더링)

> **MVP 제외**: 검색, 페이지네이션, 다크모드, 댓글

---

## 구현 단계

1. **환경 세팅**: Next.js 15 프로젝트 생성, Tailwind CSS + shadcn/ui 초기화, `.env.local`에 `NOTION_API_KEY` / `NOTION_DATABASE_ID` 설정
2. **Notion 연동 레이어**: `lib/notion.ts` 작성 — 글 목록 fetch 함수(`getPosts`) + 슬러그로 단일 글 fetch 함수(`getPostBySlug`) 구현
3. **페이지 구현**: 목록 페이지(`app/page.tsx`) 카드 그리드 → 태그 필터 컴포넌트 → 상세 페이지(`app/posts/[slug]/page.tsx`) Notion 블록 렌더러 연결
