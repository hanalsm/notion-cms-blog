# Next Starter Kit

Next.js 16 + TypeScript + Tailwind CSS v4 + shadcn/ui 기반의 프로덕션 레디 스타터 킷입니다.

## 기술 스택

| 기술 | 버전 | 설명 |
|------|------|------|
| [Next.js](https://nextjs.org) | 16.x | React 풀스택 프레임워크 (App Router) |
| [TypeScript](https://typescriptlang.org) | 5.x | 정적 타입 지원 |
| [Tailwind CSS](https://tailwindcss.com) | v4 | 유틸리티 퍼스트 CSS |
| [shadcn/ui](https://ui.shadcn.com) | latest | 접근성 기반 UI 컴포넌트 |
| [next-themes](https://github.com/pacocoursey/next-themes) | latest | 다크모드 지원 |
| [lucide-react](https://lucide.dev) | latest | 아이콘 라이브러리 |

## 포함된 기능

- **App Router** — Next.js 16 파일 시스템 기반 라우팅
- **다크모드** — `next-themes` 기반 시스템/라이트/다크 전환
- **기본 레이아웃** — 스티키 Header + Footer 포함
- **shadcn/ui 컴포넌트** — Button, Card, Badge, Input, Label, Separator, Avatar, DropdownMenu
- **반응형 디자인** — 모바일 우선 레이아웃
- **TypeScript** — 완전한 타입 안전성

## 프로젝트 구조

```
misson10-starter/
├── app/
│   ├── about/
│   │   └── page.tsx          # 소개 페이지
│   ├── components/
│   │   └── page.tsx          # 컴포넌트 쇼케이스 페이지
│   ├── globals.css           # 전역 스타일 (Tailwind v4 + shadcn 변수)
│   ├── layout.tsx            # 루트 레이아웃
│   ├── page.tsx              # 홈 페이지
│   └── providers.tsx         # 클라이언트 Provider (ThemeProvider)
├── components/
│   ├── layout/
│   │   ├── header.tsx        # 헤더 (네비게이션 + 다크모드 토글)
│   │   └── footer.tsx        # 푸터
│   └── ui/                   # shadcn/ui 컴포넌트
│       ├── avatar.tsx
│       ├── badge.tsx
│       ├── button.tsx
│       ├── card.tsx
│       ├── dropdown-menu.tsx
│       ├── input.tsx
│       ├── label.tsx
│       └── separator.tsx
├── lib/
│   └── utils.ts              # cn 유틸리티
└── components.json           # shadcn 설정
```

## 설치 방법

### 1. 의존성 설치

```bash
npm install
```

### 2. 개발 서버 실행

```bash
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)을 열면 됩니다.

## 사용법

### 새 shadcn/ui 컴포넌트 추가

```bash
npx shadcn@latest add [컴포넌트명]
```

예시:
```bash
npx shadcn@latest add dialog
npx shadcn@latest add table
npx shadcn@latest add toast
```

### 다크모드 토글

헤더 우측 상단의 달/해 아이콘 버튼을 클릭하면 라이트/다크 모드가 전환됩니다.  
`next-themes`를 통해 시스템 설정에도 자동으로 따라갑니다.

### 새 페이지 추가

`app/` 하위에 폴더와 `page.tsx`를 생성하면 자동으로 라우팅됩니다.

```
app/
└── new-page/
    └── page.tsx   →   /new-page
```

### 커스텀 컴포넌트 추가

`components/` 하위에 파일을 생성하고 `@/components/...`로 임포트합니다.

## 빌드 및 배포

```bash
# 프로덕션 빌드
npm run build

# 프로덕션 서버 실행
npm run start

# 린트 검사
npm run lint
```

## 라이선스

MIT
