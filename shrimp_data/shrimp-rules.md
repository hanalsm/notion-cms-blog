# 매크로 인사이트 블로그 — 개발 가이드라인

이 문서는 AI Agent가 `notion-cms-blog` 프로젝트의 개발 작업을 수행할 때 따라야 하는 전용 사양을 제공합니다.

## 1. 프로젝트 개요

- **프로젝트명**: 매크로 인사이트 블로그
- **목적**: Notion을 CMS로 활용한 금리·매크로 분석 인사이트 발행 블로그
- **기술 스택**:
  - **프레임워크**: Next.js 15 (App Router), TypeScript
  - **CMS**: Notion API (`@notionhq/client`)
  - **스타일링**: Tailwind CSS v4, shadcn/ui
  - **패키지 매니저**: npm

## 2. 프로젝트 아키텍처

- **`app/`**: Next.js App Router 페이지 및 레이아웃
  - `app/page.tsx`: 홈(목록) 페이지 — 수정 시 태그 필터 로직 함께 검토
  - `app/posts/[slug]/page.tsx`: 상세 페이지 — `getPostBySlug` 의존
  - `app/about/page.tsx`: 소개 페이지
- **`components/`**: 재사용 가능한 UI 컴포넌트
  - `components/blog/`: 블로그 전용 컴포넌트 (PostCard, TagFilter, NotionRenderer)
  - `components/layout/`: Header, Footer 등 레이아웃 컴포넌트
- **`lib/notion.ts`**: Notion API 연동 레이어 — `getPosts`, `getPostBySlug`, `getPageBlocks`
- **`hooks/`**: 커스텀 React 훅
- **`docs/PRD.md`**: 제품 요구사항 정의
- **`docs/ROADMAP.md`**: 개발 로드맵 (Phase 진행 상황 추적)

## 3. 코드 규칙

### 3.1. 네이밍 규칙

- **변수·함수**: camelCase (`getPosts`, `postSlug`)
- **컴포넌트·인터페이스**: PascalCase (`PostCard`, `NotionPage`)
- **파일명(컴포넌트)**: PascalCase (`PostCard.tsx`)
- **파일명(유틸·훅)**: camelCase (`notion.ts`, `useDebounce.ts`)
- **URL 슬러그**: 영문 소문자 + 하이픈 (`fed-rate-hold-may-2026`)

### 3.2. Notion API 규칙

- **Database ID**: `3568ccb41fec80d982d9c022fb3635f8`
- 모든 Notion API 호출은 `lib/notion.ts`를 통해서만 수행한다
- 발행 상태 필터: `상태 === "발행"` 인 글만 노출
- 환경 변수: `NOTION_API_KEY`, `NOTION_DATABASE_ID` (`.env.local`)

### 3.3. 포맷팅

- 들여쓰기: 2칸 스페이스
- TypeScript strict 모드 준수 — `any` 사용 금지
- 컴포넌트에 불필요한 주석 작성 금지 (WHY가 명확할 때만 단 한 줄)

## 4. 기능 구현 지침

### 4.1. SEO 관련

- 동적 메타데이터는 `generateMetadata()` 함수로 구현 (Next.js App Router 방식)
- OG 이미지는 `app/opengraph-image.tsx` 또는 Route Handler로 생성
- `sitemap.ts`는 `app/sitemap.ts`에 위치, 발행 글 슬러그 자동 포함

### 4.2. 캐싱 전략

- `lib/notion.ts`의 fetch 함수에 `revalidate` 설정으로 ISR 적용
- 목록 페이지: `revalidate = 3600` (1시간)
- 상세 페이지: `revalidate = 86400` (24시간)

### 4.3. NotionRenderer 확장

- 새 블록 타입 추가 시 기존 블록과 동일한 패턴으로 구현
- 지원 블록 목록을 컴포넌트 상단 주석으로 관리

## 5. 워크플로 지침

### 5.1. ROADMAP.md 업데이트

- 작업 완료 시 `docs/ROADMAP.md`의 해당 항목 상태를 `⬜ 예정` → `✅ 완료`로 변경
- Phase 전체 완료 시 Phase 헤더의 상태도 함께 업데이트

### 5.2. Git 커밋 규칙

- Conventional Commits 형식 준수: `feat:`, `fix:`, `chore:`, `docs:`
- 커밋 전 `npm run build` 통과 확인
- `.env.local`은 절대 커밋 금지

### 5.3. 글 작성 워크플로 (`글 써줘_Notion_Macro` 명령어)

- `CLAUDE.md`의 검색 전략 및 오타 검수 체크리스트를 반드시 준수
- Notion 업로드 후 `notion-fetch`로 한국어 깨짐 검증 필수

## 6. 개발 금지 사항

- **`lib/notion.ts` 외부에서 직접 Notion API 호출 금지**
- **`.env.local` 커밋 금지**
- **`any` 타입 사용 금지** (불가피한 경우 주석으로 이유 명시)
- **MVP 외 기능 무단 추가 금지** — ROADMAP.md 계획 외 작업은 사용자 승인 후 진행
- **`shrimp_data/` 폴더는 `.gitignore`에 추가하지 않음** — 작업 계획 공유를 위해 버전 관리에 포함

## 7. 이 가이드라인 문서 업데이트

- 기술 스택, 핵심 아키텍처, 주요 워크플로가 변경될 때 함께 업데이트
- ROADMAP.md Phase 전환 시 관련 섹션 반영
