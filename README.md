# 매크로 인사이트 블로그

Notion을 CMS로 사용하는 금리·중앙은행·매크로 분석 인사이트 블로그입니다.  
Next.js 16 App Router + Notion API 기반으로 구축되었습니다.

## 기술 스택

| 기술 | 버전 | 설명 |
|------|------|------|
| [Next.js](https://nextjs.org) | 16.x | React 풀스택 프레임워크 (App Router) |
| [TypeScript](https://typescriptlang.org) | 5.x | 정적 타입 지원 |
| [Tailwind CSS](https://tailwindcss.com) | v4 | 유틸리티 퍼스트 CSS |
| [shadcn/ui](https://ui.shadcn.com) | latest | 접근성 기반 UI 컴포넌트 |
| [next-themes](https://github.com/pacocoursey/next-themes) | latest | 다크모드 지원 |
| [Notion API](https://developers.notion.com) | 2022-06-28 | 콘텐츠 CMS |

## 주요 기능

- **Notion CMS** — Notion 데이터베이스를 블로그 CMS로 활용
- **글 목록/상세** — 발행 상태인 글만 노출, 슬러그 기반 라우팅
- **태그 필터** — 거시경제·금리·중앙은행 등 카테고리별 필터
- **다크모드** — 시스템/라이트/다크 전환
- **반응형 디자인** — 모바일 우선 레이아웃

## Notion 데이터베이스 구조

| 속성 | 타입 | 설명 |
|------|------|------|
| 제목 | Title | 글 제목 |
| 슬러그 | Text | URL 경로 (영문, 하이픈) |
| 요약 | Text | 목록에 표시되는 한줄 요약 |
| 발행일 | Date | 발행 날짜 |
| 태그 | Multi-select | 거시경제·금리·중앙은행·환율·시장분석 |
| 상태 | Select | **발행** / 초안 / 검토중 |

> 상태가 **발행**인 글만 블로그에 표시됩니다.

## 로컬 실행

### 1. 의존성 설치

```bash
npm install
```

### 2. 환경변수 설정

`.env.local` 파일을 생성하고 아래 값을 입력합니다:

```
NOTION_API_KEY=secret_...
NOTION_DATABASE_ID=...
```

- `NOTION_API_KEY`: [Notion Integrations](https://www.notion.so/my-integrations)에서 발급
- `NOTION_DATABASE_ID`: Notion DB URL에서 추출한 32자리 ID

### 3. 개발 서버 실행

```bash
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)을 열면 됩니다.

## 배포 (Vercel)

1. GitHub에 푸시
2. [Vercel](https://vercel.com)에서 저장소 연결
3. Environment Variables에 `NOTION_API_KEY`, `NOTION_DATABASE_ID` 입력
4. 배포 완료 → 공개 URL로 어디서든 접근 가능

## 글 작성 방법

1. Notion 데이터베이스에서 새 행 추가
2. 제목, 슬러그, 요약, 발행일, 태그 입력
3. 상태를 **발행**으로 설정
4. 블로그에서 새로고침하면 즉시 반영

## 라이선스

MIT
