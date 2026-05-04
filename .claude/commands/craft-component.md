# /craft-component

재사용 가능한 React 컴포넌트를 생성합니다.

## 사용법
/craft-component [컴포넌트명] [variant1] [variant2] ...

## 동작
1. `components/[컴포넌트명]/[컴포넌트명].tsx` 생성 — 컴포넌트 본체
2. `components/[컴포넌트명]/[컴포넌트명].types.ts` 생성 — Props 인터페이스
3. `components/[컴포넌트명]/index.ts` 생성 — re-export

## 규칙
- TypeScript Props 인터페이스 필수 정의
- variant가 있으면 Tailwind `cva` 또는 조건부 클래스로 처리
- `use client` 는 이벤트 핸들러가 있을 때만 추가
- 주석은 한국어로 작성
