---
type: Architecture
title: '스타일 작성 방식 비교 예시'
description: '기존 Panda JSX props 방식 유지 결정과 비교 예시 삭제 이력을 기록한다.'
tags: [styles, examples, panda-css, scss]
status: draft
generated:
  by: codex/gpt-6
  at: '2026-10-29T08:02:20Z'
source_revision: 9ec24dcd1f07f5bd9541b89e6333caa18f5c5947
working_tree_sources:
  - src/app/examples/styles/jsx-props/page.tsx
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

## 최종 결정: 기존 방식 유지 및 샘플 삭제 (2026-10-29)

사용자가 ③ 기존 Panda JSX props 방식을 선택했다. 기존 운영 화면의 Flex·Grid와 JSX 스타일 props를 유지하고, 필요에 따라 기존 css·cva·sva를 사용하는 작성 기준을 따른다. 비교 전용 classnames·scss-module·jsx-props 페이지와 page.module.scss는 삭제했다. 퍼블리싱 가이드는 유지한다. 아래 경로·구현·검증 내용은 삭제 전 비교 과정의 역사 기록이며 현재 접근 가능한 페이지 안내가 아니다. SCSS Module 비교 예외도 종료했다.

삭제한 세 경로의 로컬 HTTP 응답이 모두 404임을 확인했다. src 내 예시 경로 참조 제거, IA 생성 그래프 재생성, Panda 생성과 Next 라우트 타입 생성을 확인했으며 생성기 테스트 1개와 git diff --check를 통과했다. 전체 타입 검사는 샘플 외 파일 src/components/screen-index/DesignGuideTypography.tsx:62의 TS2367(hoka/mono 비교)로 실패했다.

사용자의 명시적 요청으로 같은 정적 러닝 가이드 UI를 세 스타일 방식으로 작성했다. 세 경로는 기존 쇼핑 셸 안에서 페이지 자체가 본문을 소유하며 실제 서비스·상품 API에 연결하지 않는다. Flex·Grid를 유지하고 display는 각 Panda JSX 컴포넌트에 맡긴다. Grid의 기본 gap 충돌을 피하도록 세 화면의 목록 간격은 JSX gap="5"로 명시한다.

- `/examples/styles/classnames`: `page.tsx` 상단의 `styles` 객체에 Panda `css()` 호출을 모으고 JSX에서는 `className={styles.card}`처럼 참조한다. 스타일 객체를 별도 `styles.ts`로 추출하지 않는다.
- `/examples/styles/scss-module`: `page.module.scss`를 `styles`로 import하여 같은 className 형태를 사용한다. `.module.scss` 확장자가 Next.js의 로컬 클래스 범위를 만든다. 이 파일만 사용자 요청에 따른 비교용 예외이며 운영 소스의 Panda 사용·CSS Modules 금지 정책은 유지한다.[^installed-css-guide][^installed-sass-guide]

두 페이지는 같은 카드·페이지 여백·펼침 영역을 사용하며 상호 이동 링크와 작성 코드 예시를 제공한다. 공통 Typography를 사용하므로 텍스트 규격은 기존 소유자가 관리한다. 모바일 스타일은 Panda `_mobile`과 SCSS `:global(.platform-mobile) &`로 대응시켜 기존 플랫폼 컨텍스트와 명시적 프리뷰 선택을 따른다. 별도 뷰포트 훅이나 분기 트리는 추가하지 않는다.

## Panda JSX 유지와 기존 방식 예시 추가 (2026-10-29)

두 className 예시의 main·header·nav·article은 Flex로, 목록은 Grid로 변경했다. 카드와 코드 예시는 `<Flex as="article" className={styles.card}>`를 사용하며 중복 display 선언을 제거했다. `/examples/styles/jsx-props`는 기존 방식의 `<Flex as="article" gap="5">`와 JSX 스타일 props를 보여준다. 이 카드 내부 간격은 요청한 20px이며 앞선 두 예시의 12px과 구별된다. 세 페이지에서 상호 이동할 수 있고 작성 코드는 details open으로 기본 노출한다. 기존 운영 화면을 다른 스타일 방식으로 일괄 전환하지 않는다. 새 경로의 작업 트리 출처는 src/app/examples/styles/jsx-props/page.tsx다.

세 페이지 모두 브라우저에서 1440px 3열·375px 1열, 카드 display flex, 세 이동 링크와 작성 코드 기본 노출을 확인했다. Panda 생성, TypeScript, 변경 파일 ESLint·Prettier와 Next.js 프로덕션 빌드를 통과했다. Box의 타입이 details의 open 속성을 제공하지 않아 코드 펼침 영역은 네이티브 details와 Panda css를 사용한다.

## 최초 예시 검증

아래 검증 기록은 최초 두 예시 작성 당시 결과다. 이번 변경 검증과 구분한다.

Panda 생성, TypeScript, 변경 파일 ESLint·Prettier 및 Next.js 프로덕션 빌드를 통과했다. 두 예시는 빌드에서 정적 경로로 생성됐다. 브라우저에서 두 페이지의 375/1024/1025/1199/1200/1440px 전환을 확인했다. 1024px까지 1열, 1025px부터 3열이며 두 방식의 카드 패딩 24px·간격 12px·테두리 1px과 본문 여백이 일치한다. 1025~1199px는 기존 정책의 1200px PC 캔버스, 1200px 이상은 수평 오버플로 없음도 확인했다. 두 페이지에서 코드 펼침을 확인하고 PC·모바일 스크린샷을 검토했다. 명시적 Storybook 플랫폼과 오버레이 전환은 이번 예시에서 별도로 검사하지 않았다.

[^installed-css-guide]: 설치된 Next.js 16.3.5 CSS 문서.

[^installed-sass-guide]: 설치된 Next.js 16.3.5 Sass 문서.
