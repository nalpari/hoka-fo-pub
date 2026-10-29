---
type: Playbook
title: '로컬 실행'
description: '설치, Panda 생성과 앱·Storybook 실행 명령을 안내한다.'
tags: [development, npm, storybook]
status: draft
generated:
  by: codex/gpt-6
  at: '2026-10-29T02:11:18Z'
source_revision: b3f7243062b500eb4909961667ad142cc368ff91
working_tree_sources:
  - scripts/screen-files.mjs
  - src/app/screen-index/screenConnections.ts
  - src/app/screen-index/_components/IaStructurePage.tsx
  - src/app/screen-index/sourceGraph.generated.json
  - tests/screen-files.test.mjs
  - tsconfig.json
  - .storybook/preview.ts
  - .storybook/main.ts
  - src/components/common/molecules/ContentHeader/ContentHeader.tsx
  - src/components/common/layouts/ContentLayout/ContentLayout.tsx
  - src/components/common/molecules/MainSection/MainSection.tsx
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

## 공용 훅·컨텍스트 import 우선순위 (2026-10-28)

2번 그룹을 외부 패키지·공용 훅·컨텍스트로 확장했다. 외부 의존성을 먼저 정렬하고 `@/context/*`, `@/hooks/*`, `@/lib/use[A-Z]*`를 빈 줄 없이 이어 둔 뒤 Panda와 공통 UI를 배치한다. 일반 데이터·타입·유틸리티는 기존 내부 모듈 그룹에 유지한다. 설정은 `eslint.config.js`, 작성 규칙은 `AGENTS.md`와 `component-reusability` 스킬을 따른다. 기존 CLI·저장 자동 수정 방식과 부수 효과 import 경계는 유지한다.

## 공용 헤더 통합의 실행 영향 (2026-10-28)

ContentHeader·ContentLayout·MainSection 변경을 검토했다. 이 통합 작업은 의존성·환경 변수·실행 명령을 변경하지 않으며 기존 Panda 생성, 타입 검사와 앱·Storybook 빌드 명령을 사용한다. 공유 작업 트리의 별도 패키지 변경은 이번 헤더 통합 범위에 포함하지 않는다.

## IA 엑셀 다운로드 의존성 (2026-10-28)

IA 구조도의 실제 .xlsx 다운로드를 위해 ExcelJS 4.4.0을 런타임 의존성으로 추가했다. IaStructurePage의 다운로드 핸들러에서만 동적 import하고 브라우저용 document workbook과 xlsx.writeBuffer를 사용한다. 별도 서버 API·환경 변수는 필요 없다. npm install 시 lockfile을 함께 갱신했으며 작업 트리 출처는 package.json, package-lock.json, src/app/screen-index/_components/IaStructurePage.tsx다.

## IA 엑셀 의존성 제거 (2026-10-28)

사용자 요청으로 IA 엑셀 기능을 제거하고 npm uninstall exceljs --ignore-scripts로 ExcelJS와 전용 전이 의존성을 정리했다. 위 ExcelJS 추가 기록은 이전 구현 이력이며 현재 설치 의존성이 아니다. 별도 다운로드 라이브러리·서버 API를 추가하지 않는다. 작업 트리 출처: package.json, package-lock.json, src/app/screen-index/_components/IaStructurePage.tsx.

## Storybook 설정 타입 검사 (2026-10-28)

루트 tsconfig.json의 include에 .storybook/**/*.ts를 포함하므로 npm run typecheck는 preview.ts와 main.ts를 함께 검사한다. Preview 타입은 @storybook/nextjs-vite에서 가져오며, main.ts의 재귀 readdirSync는 encoding=utf8로 문자열 반환을 명시한다. 설정을 제외한 상태의 타입 검사 통과를 Storybook 설정 검증으로 간주하지 않는다. 작성: codex/gpt-6, 2026-10-28T10:03:47.372Z. 작업 트리 출처: tsconfig.json, .storybook/preview.ts, .storybook/main.ts.

## baseUrl 사용 중단 대응 (2026-10-28)

편집기가 보고한 TypeScript 6의 baseUrl 사용 중단 오류에 따라 불필요한 baseUrl="."을 제거했다. paths 대상이 모두 ./로 시작하므로 tsconfig.json 위치 기준 별칭 해석을 유지한다. ignoreDeprecations로 진단을 숨기지 않는다. 로컬 TypeScript 5.9.3의 npm run typecheck도 통과했다. Next 설치본의 dist/build/load-jsconfig.js에서도 baseUrl이 없는 paths의 기준 경로 처리를 확인했다. 외부 근거는 [TypeScript 6 공식 마이그레이션 안내](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-6-0.html)이며, 편집기의 정확한 실행 파일 버전은 직접 조회하지 않았다. 작업 트리 출처: tsconfig.json.

## IA 연결 파일 생성과 감시 (2026-10-29)

npm run screen-files는 현재 src의 import 그래프와 바인딩 주석 소유자를 생성한다. npm run screen-files:watch는 변경을 감시해 sourceGraph.generated.json이 달라졌을 때만 저장한다. npm run dev와 dev:all, storybook 실행에서 감시하고 Next.js/Storybook 프로덕션 빌드 전에도 생성한다. 기존 실행 중인 서버는 새 npm 스크립트를 적용하려면 재시작하거나 감시 명령을 별도로 실행한다. 생성 결과를 직접 편집하지 않고 화면 진입점·실제 import·바인딩 주석을 수정한다. TypeScript와 Prettier는 기존 개발 의존성을 사용하며 패키지를 추가하지 않았다.

작업 트리 출처: package.json, scripts/screen-files.mjs, src/app/screen-index/sourceGraph.generated.json. 화면별 표시 범위와 제한은 [IA 작업 파일](../architecture/ui.md#ia-작업-파일-자동-갱신과-개발-연결-범위-2026-10-29)을 참고한다.
