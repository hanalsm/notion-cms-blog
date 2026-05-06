# ROADMAP — 매크로 인사이트 블로그

> **범례**: ✅ 완료 · 🔄 진행 중 · ⬜ 예정

---

## Phase 1 — 프로젝트 초기 설정 (골격 구축) ✅

> **왜 먼저?** 기반이 없으면 이후 모든 작업이 표류한다. 폴더 구조·의존성·환경 변수를 확정해야 팀(혹은 AI)이 일관된 가정 위에서 작업할 수 있다.

| 작업 | 상태 |
|------|------|
| Next.js 16 + TypeScript 프로젝트 생성 | ✅ |
| Tailwind CSS v4 + shadcn/ui 초기화 | ✅ |
| `@notionhq/client` 패키지 설치 | ✅ |
| `.env.local` — `NOTION_API_KEY` / `NOTION_DATABASE_ID` 설정 | ✅ |
| `CLAUDE.md` / `AGENTS.md` — 에이전트 지침 문서 작성 | ✅ |
| `docs/PRD.md` — 제품 요구사항 정의 | ✅ |
| `docs/ROADMAP.md` — 개발 로드맵 작성 (현재 문서) | ✅ |

**예상 소요**: 1일  
**완료 기준**: `npm run dev` 실행 시 기본 페이지가 로컬에서 정상 동작

---

## Phase 2 — 공통 모듈 / 컴포넌트 개발 ✅

> **왜 먼저?** 페이지보다 공통 레이어를 먼저 만들어야 중복 코드가 생기지 않는다. Notion API 레이어가 안정돼야 페이지 개발이 수월하다.

| 작업 | 상태 |
|------|------|
| `lib/notion.ts` — `getPosts`, `getPostBySlug`, `getPageBlocks` 구현 | ✅ |
| `components/layout/Header` — 사이트 헤더 | ✅ |
| `components/layout/Footer` — 사이트 푸터 | ✅ |
| `components/blog/PostCard` — 글 카드 컴포넌트 | ✅ |
| `components/blog/TagFilter` — 태그 필터 컴포넌트 | ✅ |
| `components/blog/NotionRenderer` — Notion 블록 → HTML 렌더러 | ✅ |
| `hooks/useDebounce`, `useLocalStorage`, `useMediaQuery` | ✅ |
| 다크모드 — `next-themes` + `Providers` 설정 | ✅ |
| shadcn/ui 공통 컴포넌트 (Button, Badge, Card 등) | ✅ |

**예상 소요**: 2일  
**완료 기준**: Notion API에서 데이터를 정상적으로 가져오며, 모든 UI 컴포넌트가 Storybook 또는 `/components` 데모 페이지에서 확인 가능

---

## Phase 3 — 핵심 기능 개발 ✅

> **왜 이 순서?** 공통 레이어가 갖춰진 후에 페이지를 조립해야 한다. 핵심 사용자 여정(목록 → 상세)을 먼저 완성해야 MVP 검증이 가능하다.

| 작업 | 상태 |
|------|------|
| 홈 페이지 (`/`) — 발행 글 카드 그리드, 최신순 정렬 | ✅ |
| 태그 단일 필터링 — `?tag=` URL 파라미터 기반 | ✅ |
| 글 상세 페이지 (`/posts/[slug]`) — Notion 블록 렌더링 | ✅ |
| 소개 페이지 (`/about`) — 블로그·필자 소개 | ✅ |
| 404 처리 — 없는 슬러그 접근 시 `notFound()` 반환 | ✅ |
| Notion 데이터베이스 연결 검증 (`scripts/test-notion.mjs`) | ✅ |

**예상 소요**: 3일  
**완료 기준**: 실제 Notion DB의 발행 글이 홈 화면에 표시되고, 카드 클릭 시 상세 페이지에서 본문이 정상 렌더링

---

## Phase 4 — 추가 기능 개발 ⬜

> **왜 이 순서?** MVP가 검증된 뒤 사용성·콘텐츠 발견성을 높이는 기능을 추가한다. 핵심 흐름을 망가뜨리지 않으면서 점진적으로 확장 가능.

| 작업 | 상태 |
|------|------|
| **SEO** — 페이지별 `<title>` / `<meta description>` 동적 생성 | ⬜ |
| **OG 이미지** — `next/og`로 글 제목·태그 기반 자동 생성 | ⬜ |
| **sitemap.xml** — `app/sitemap.ts`로 발행 글 URL 자동 포함 | ⬜ |
| **robots.txt** — 검색 엔진 크롤링 정책 설정 | ⬜ |
| **태그 다중 필터** — 여러 태그 동시 선택 (`?tag=Fed&tag=금리`) | ⬜ |
| **관련 글 섹션** — 같은 태그를 공유하는 글 추천 (상세 페이지 하단) | ⬜ |
| **RSS 피드** — `/rss.xml` 엔드포인트로 구독자 지원 | ⬜ |
| **NotionRenderer 확장** — 표·코드블록·토글·콜아웃 블록 렌더링 추가 | ⬜ |
| **에러 바운더리** — API 오류 시 사용자 친화적 메시지 표시 | ⬜ |

**예상 소요**: 3~4일  
**완료 기준**: Lighthouse SEO 점수 90+, 주요 검색 엔진에 sitemap 제출 완료

---

## Phase 5 — 최적화 및 배포 ⬜

> **왜 마지막?** 기능이 완성된 뒤 성능을 측정하고 병목을 제거해야 한다. 배포 환경이 확정돼야 캐싱·CDN 전략을 올바르게 설정할 수 있다.

| 작업 | 상태 |
|------|------|
| **ISR 캐싱** — `revalidate` 설정으로 Notion API 호출 최소화 | ⬜ |
| **이미지 최적화** — Notion 이미지를 `next/image`로 교체, 만료 URL 대응 | ⬜ |
| **Vercel 배포** — 프로젝트 연결, 환경 변수 등록, 프로덕션 배포 | ⬜ |
| **환경 변수 관리** — `vercel env` CLI로 Preview / Production 분리 | ⬜ |
| **Core Web Vitals** — LCP·CLS·FID 측정 및 개선 | ⬜ |
| **번들 분석** — `@next/bundle-analyzer`로 불필요한 의존성 제거 | ⬜ |
| **모니터링** — Vercel Analytics 또는 외부 도구 연동 | ⬜ |

**예상 소요**: 2일  
**완료 기준**: Vercel 프로덕션 URL에서 정상 동작, Lighthouse 전 항목 80+ 달성

---

## 현재 진행 상황 요약

```
Phase 1  ████████████  100%  ✅ 완료
Phase 2  ████████████  100%  ✅ 완료
Phase 3  ████████████  100%  ✅ 완료
Phase 4  ░░░░░░░░░░░░    0%  ⬜ 예정
Phase 5  ░░░░░░░░░░░░    0%  ⬜ 예정
```

**다음 우선순위**: Phase 4 — SEO 메타태그 및 sitemap.xml 구현
