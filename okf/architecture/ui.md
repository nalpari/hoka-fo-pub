---
type: Architecture
title: '컴포넌트와 스타일'
description: '공통 UI 계층, Panda CSS와 Storybook 작성 규칙을 설명한다.'
tags: [components, panda-css, storybook]
status: draft
generated:
  by: codex/gpt-6
  at: '2026-10-14T06:02:14Z'
source_revision: b3f7243062b500eb4909961667ad142cc368ff91
sources:
  - id: agents-md
    resource: https://github.com/nalpari/hoka-fo-pub/blob/b3f7243062b500eb4909961667ad142cc368ff91/AGENTS.md
    title: 'AGENTS.md'
  - id: panda-config-ts
    resource: https://github.com/nalpari/hoka-fo-pub/blob/b3f7243062b500eb4909961667ad142cc368ff91/panda.config.ts
    title: 'panda.config.ts'
  - id: src-shared-styles-global-scss
    resource: https://github.com/nalpari/hoka-fo-pub/blob/b3f7243062b500eb4909961667ad142cc368ff91/src/shared/styles/global.scss
    title: 'src/shared/styles/global.scss'
  - id: -storybook-main-ts
    resource: https://github.com/nalpari/hoka-fo-pub/blob/b3f7243062b500eb4909961667ad142cc368ff91/.storybook/main.ts
    title: '.storybook/main.ts'
  - id: -storybook-preview-ts
    resource: https://github.com/nalpari/hoka-fo-pub/blob/b3f7243062b500eb4909961667ad142cc368ff91/.storybook/preview.ts
    title: '.storybook/preview.ts'
  - id: -codex-skills-component-reusability-skill-md
    resource: https://github.com/nalpari/hoka-fo-pub/blob/b3f7243062b500eb4909961667ad142cc368ff91/.codex/skills/component-reusability/SKILL.md
    title: '.codex/skills/component-reusability/SKILL.md'
---

# 컴포넌트와 스타일

## 코드 배치

| 위치                               | 책임                                    |
| ---------------------------------- | --------------------------------------- |
| `src/app/`                         | URL별 페이지와 루트 레이아웃            |
| `src/shared/features/`             | 기능별 화면, UI 조합과 정책·정적 콘텐츠 |
| `src/shared/components/atoms/`     | 기본 UI 요소                            |
| `src/shared/components/molecules/` | 기본 요소를 조합한 UI                   |
| `src/shared/components/organisms/` | 화면 영역 단위 UI                       |
| `src/shared/components/layouts/`   | 공통 페이지 구조                        |
| `src/stories/`                     | Storybook이 탐색하는 스토리             |

주문/결제 화면(`src/shared/features/checkout/`)은 `FormField`·`TextInput`·`Radio`·`StepIndicator` 등 기존 요소를 조합한 목 화면이며 실제 결제와 연동하지 않는다.

공통 UI로 올리기 전에 기존 컴포넌트를 검색한다. 여러 기능에 공통으로 적용되는 의미·인터랙션 계약이 있을 때 재사용 컴포넌트로 추출한다. 자세한 검토 절차는 `.codex/skills/component-reusability/SKILL.md`에 있다.

## 스타일 기준

`AGENTS.md`가 스타일 규칙의 기준이다.

- 컴포넌트 스타일은 해당 TSX 파일에서 Panda `css`·`cva`로 작성한다.
- `*.module.scss`를 만들거나 유지하지 않는다.
- 반응형 스타일은 기존 값과 동작을 유지한다.
- `panda.config.ts`에 토큰과 `.platform-mobile &` 조건이 있다. 포털로 `<body>`에 렌더되는 요소도 이 조건을 받도록 `platform-*` 클래스는 `src/app/layout.tsx`의 `<body>`에 붙는다.
- `styled-system/jsx`의 레이아웃 도구와 공통 `Typography`를 재사용한다.
- 전역 SCSS는 폰트·전역 레이아웃 등의 기반 스타일을 담당한다.

`styled-system/`과 `src/shared/styles/panda.css`는 생성 결과이며 Git에서 제외한다. 생성 CSS를 직접 수정하지 않고 TSX나 Panda 설정을 바꾼 뒤 `npm run panda`를 실행한다.

## Storybook

`.storybook/main.ts`는 `src/stories/**/*.stories.@(ts|tsx)`만 탐색한다. 다른 폴더의 스토리는 이 패턴에 포함되지 않는다. `public/`을 정적 자산으로 제공하고 접근성·문서 애드온을 사용한다.

전역 `nextjs.appDirectory: true`가 App Router 탐색 컨텍스트를 제공한다. 경로·파라미터가 필요한 스토리는 Next.js navigation 설정이나 제공되는 모킹을 사용한다. React Router 래퍼를 추가하지 않는다.

뷰포트 프리셋은 1920, 1600, 1200, 768, 375px이다. 접근성 검사 설정 `a11y.test: todo`는 검증 통과를 의미하지 않는다.

[로컬 실행](../development/setup.md), [변경 검증](../development/verification.md)을 참고한다.
