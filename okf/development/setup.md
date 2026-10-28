---
type: Playbook
title: '로컬 실행'
description: '설치, Panda 생성과 앱·Storybook 실행 명령을 안내한다.'
tags: [development, npm, storybook]
status: draft
generated:
  by: codex/gpt-6
  at: '2026-10-28T06:08:02+00:00'
source_revision: b3f7243062b500eb4909961667ad142cc368ff91
working_tree_sources:
  - eslint.config.js
  - package-lock.json
  - .vscode/settings.json
  - .vscode/extensions.json
  - package.json
  - scripts/install-okf-hooks.mjs
sources:
  - id: package-json
    resource: https://github.com/nalpari/hoka-fo-pub/blob/b3f7243062b500eb4909961667ad142cc368ff91/package.json
    title: 'package.json'
  - id: package-lock-json
    resource: https://github.com/nalpari/hoka-fo-pub/blob/b3f7243062b500eb4909961667ad142cc368ff91/package-lock.json
    title: 'package-lock.json'
  - id: readme-md
    resource: https://github.com/nalpari/hoka-fo-pub/blob/b3f7243062b500eb4909961667ad142cc368ff91/README.md
    title: 'README.md'
  - id: -gitignore
    resource: https://github.com/nalpari/hoka-fo-pub/blob/b3f7243062b500eb4909961667ad142cc368ff91/.gitignore
    title: '.gitignore'
---

# 로컬 실행

저장소 루트에서 실행한다. README의 개발 기준은 Node.js 24.21.0, npm 11.19.0이다. 런타임 강제 설정 파일에 의존한다고 가정하지 말고 실행 중인 버전을 확인한다.

## 설치와 앱 실행

```sh
node --version
npm --version
npm ci
npm run dev
```

`npm run dev`는 먼저 Panda 코드를 생성한 뒤 Next 개발 서버와 Panda CSS 감시 작업을 함께 실행한다. Next.js와 React·React DOM의 고정 버전은 임의로 최신화하지 않는다.

`npm ci`의 prepare는 Panda 생성 뒤 `npm run hooks:install`을 실행한다. Git pre-commit은 소스 변경과 관련 OKF 문서의 동시 스테이징을 검사한다. 기존 Git 훅이 있으면 자동 교체하지 않고 연결 방법을 안내한다. `npm ci --ignore-scripts`를 사용한 경우에는 `npm run panda`와 `npm run hooks:install`을 직접 실행한다. package.json의 prepare·검사 명령 변경은 작성 당시 작업 트리에서 확인했으며 위 커밋 출처에 포함되지 않았다.

## Storybook

```sh
npm run storybook
```

Storybook은 6006 포트에서 실행한다. 앱과 Storybook을 함께 실행하려면 `npm run dev:all`을 사용한다. Storybook만 실행하기 전에 생성 스타일이 없다면 `npm run panda`를 먼저 실행한다.

## 운영 빌드 확인

```sh
npm run build
npm run start
```

`prebuild`가 Panda 생성 명령을 실행하고 이어서 Next.js를 빌드한다. 정적 Storybook은 `npm run build-storybook`으로 생성하며 결과는 `storybook-static/`에 있다.

## 생성 파일과 로컬 설정

`node_modules/`, `.next/`, `styled-system/`, 생성 `panda.css`, `storybook-static/`은 로컬 생성 결과다. 저장소의 `.gitignore`를 따라 관리한다. 비밀 값과 `.env` 파일 내용을 OKF 문서에 복사하지 않는다.

[UI 구성](../architecture/ui.md), [변경 검증](verification.md)을 참고한다.

## src 폴더 구조 승격 (2026-10-28)

shared 내부를 src로 승격했다. 공통 UI는 src/components/common, 기능별 UI는 src/components/features, ShopShell과 플랫폼 상태는 src/context에 둔다. icons·lib·styles·types는 src 바로 아래에서 관리한다. app·data·mocks·stories의 역할과 라우트는 유지한다. 별칭과 Storybook 스타일 참조, Panda 생성 경로, OKF 동기화 규칙을 새 경로에 맞췄다. 작업 트리 출처: tsconfig.json, package.json, scripts/okf-sync.mjs, src/context/ShopShell.tsx, src/components/, .storybook/preview.ts.

## 단일 부모 통합과 도메인 폴더 승격 (2026-10-28)

도메인 폴더를 src/components/{도메인}으로 승격했다. @features/* 별칭은 ./src/components/*로 변경하고 @components/*의 common 별칭은 유지한다. Storybook의 기존 src/stories/features 검색과 제목은 유지하며 import 대상만 새 경로로 갱신한다.

## Import 자동 정렬 (2026-10-28)

ESLint에 eslint-plugin-perfectionist 5.13.0을 고정 개발 의존성으로 추가했다. 기존 lint 명령은 순서 위반을 오류로 검사하고 `npm run lint:fix`는 authored src TS/TSX를 ESLint로 수정한 뒤 Prettier로 포맷한다. 생성 코드와 의존성은 제외한다. VS Code에서는 dbaeumer.vscode-eslint 확장을 추천하고 명시적 저장의 source.fixAll.eslint를 활성화했다. 기존 Prettier 저장 포맷은 유지하며 source.organizeImports는 never로 설정해 경쟁 정렬을 방지한다. 로컬 확장 설치 여부에 관계없이 CLI 검사가 동일 규칙을 적용한다.

전체 lint는 이전 검증 작업 사본의 중복 검사를 피하도록 Git에서도 제외하는 `.tmp`와 `.tmp-*` 작업 폴더를 생성물 제외 목록에 포함한다. 실제 authored src의 검사 범위는 유지한다.
