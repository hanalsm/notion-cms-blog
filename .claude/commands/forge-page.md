# /forge-page

새 Next.js 페이지를 스캐폴딩합니다.

## 사용법
/forge-page [페이지명]

## 동작
1. `app/[페이지명]/page.tsx` 생성 — 기본 Server Component
2. `app/[페이지명]/layout.tsx` 생성 — 메타데이터 포함
3. `components/[페이지명]/` 디렉토리 생성

## 규칙
- TypeScript + Tailwind CSS 기본 구조 사용
- 페이지명은 kebab-case로 변환
- metadata export 반드시 포함
- 주석은 한국어로 작성
