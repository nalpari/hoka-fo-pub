---
type: Architecture
title: '스타일 작성 방식 비교 예시'
description: 'TSX 상단 Panda 클래스 선언과 페이지 전용 SCSS Module의 비교 경로 및 예외 범위를 설명한다.'
tags: [styles, examples, panda-css, scss]
status: draft
generated:
  by: codex/gpt-6
  at: '2026-10-29T03:02:00Z'
source_revision: 91021a0f1d060181fc55a958a7f8b3b6e447f463
working_tree_sources:
  - src/app/examples/styles/classnames/page.tsx
  - src/app/examples/styles/scss-module/page.tsx
  - src/app/examples/styles/scss-module/page.module.scss
sources:
  - id: installed-css-guide
    resource: ../../node_modules/next/dist/docs/01-app/01-getting-started/11-css.md
    title: '설치된 Next.js CSS 가이드'
  - id: installed-sass-guide
    resource: ../../node_modules/next/dist/docs/01-app/02-guides/sass.md
    title: '설치된 Next.js Sass 가이드'
---

# 스타일 작성 방식 비교 예시

사용자의 명시적 요청으로 같은 정적 러닝 가이드 UI를 두 스타일 방식으로 작성했다. 두 경로는 기존 쇼핑 셸 안에서 페이지 자체가 본문을 소유하는 Server Component이며 실제 서비스·상품 API에 연결하지 않는다.

- `/examples/styles/classnames`: `page.tsx` 상단의 `styles` 객체에 Panda `css()` 호출을 모으고 JSX에서는 `className={styles.card}`처럼 참조한다. 스타일 객체를 별도 `styles.ts`로 추출하지 않는다.
- `/examples/styles/scss-module`: `page.module.scss`를 `styles`로 import하여 같은 className 형태를 사용한다. `.module.scss` 확장자가 Next.js의 로컬 클래스 범위를 만든다. 이 파일만 사용자 요청에 따른 비교용 예외이며 운영 소스의 Panda 사용·CSS Modules 금지 정책은 유지한다.[^installed-css-guide][^installed-sass-guide]

두 페이지는 같은 카드·페이지 여백·펼침 영역을 사용하며 상호 이동 링크와 작성 코드 예시를 제공한다. 공통 Typography를 사용하므로 텍스트 규격은 기존 소유자가 관리한다. 모바일 스타일은 Panda `_mobile`과 SCSS `:global(.platform-mobile) &`로 대응시켜 기존 플랫폼 컨텍스트와 명시적 프리뷰 선택을 따른다. 별도 뷰포트 훅이나 분기 트리는 추가하지 않는다.

## 검증

Panda 생성, TypeScript, 변경 파일 ESLint·Prettier 및 Next.js 프로덕션 빌드를 통과했다. 두 예시는 빌드에서 정적 경로로 생성됐다. 브라우저에서 두 페이지의 375/1024/1025/1199/1200/1440px 전환을 확인했다. 1024px까지 1열, 1025px부터 3열이며 두 방식의 카드 패딩 24px·간격 12px·테두리 1px과 본문 여백이 일치한다. 1025~1199px는 기존 정책의 1200px PC 캔버스, 1200px 이상은 수평 오버플로 없음도 확인했다. 두 페이지에서 코드 펼침을 확인하고 PC·모바일 스크린샷을 검토했다. 명시적 Storybook 플랫폼과 오버레이 전환은 이번 예시에서 별도로 검사하지 않았다.

[^installed-css-guide]: 설치된 Next.js 16.3.5 CSS 문서.

[^installed-sass-guide]: 설치된 Next.js 16.3.5 Sass 문서.
