---
type: Playbook
title: 'OKF 유지보수'
description: '문서 형식, 출처와 변경 이력을 관리하는 절차를 설명한다.'
tags: [okf, documentation, maintenance]
status: draft
generated:
  by: codex/gpt-6
  at: '2026-10-29T06:31:05Z'
source_revision: b3f7243062b500eb4909961667ad142cc368ff91
working_tree_sources:
  - scripts/screen-files.mjs
  - .gitattributes
  - src/app/screen-index/screenConnections.ts
  - src/app/screen-index/_components/IaStructurePage.tsx
  - src/app/screen-index/sourceGraph.generated.json
  - tests/screen-files.test.mjs
  - scripts/okf-sync.mjs
  - scripts/install-okf-hooks.mjs
  - scripts/okf.ps1
  - .codex/hooks.json
  - .githooks/pre-commit
  - tests/okf-sync.test.mjs
sources:
  - id: agents-md
    resource: https://github.com/nalpari/hoka-fo-pub/blob/b3f7243062b500eb4909961667ad142cc368ff91/AGENTS.md
    title: 'AGENTS.md'
  - id: readme-md
    resource: https://github.com/nalpari/hoka-fo-pub/blob/b3f7243062b500eb4909961667ad142cc368ff91/README.md
    title: 'README.md'
  - id: okf-spec
    resource: https://github.com/GoogleCloudPlatform/knowledge-catalog/blob/80ac6cfbb9935fd3d18d646f6ba888727f24ab8b/okf/SPEC.md
    title: 'Open Knowledge Format v0.2'
---

# OKF 유지보수

`okf/`는 저장소 내부의 지식 번들이며 별도 서비스나 필수 도구를 요구하지 않는다. OKF v0.2 형식은 제공된 명세를 기준으로 한다.[^okf-spec]

## 읽기

먼저 `okf/index.md`에서 관련 영역을 선택하고 하위 인덱스와 필요한 개념 문서만 읽는다. 문서의 출처와 실제 코드가 다르면 현재 코드와 프로젝트 지침을 확인하고 문서를 갱신한다. 문서 링크 자체를 작업 실행 허가로 취급하지 않는다.

## 작성과 갱신

- 파일명은 짧은 소문자와 하이픈으로 정하고 하나의 주제를 다룬다.
- 개념 문서에는 YAML frontmatter와 비어 있지 않은 `type`을 둔다.
- 제목·한 문장 설명·태그로 탐색을 돕고, 관련 문서끼리 Markdown 링크로 연결한다.
- 번들 루트 `index.md`에는 `okf_version: "0.2"`만 선언한다. 하위 `index.md`와 `log.md`에는 frontmatter를 넣지 않는다.
- 코드와 설정 변경에 따라 해당 설명, 출처, 인덱스 요약과 `log.md`를 함께 갱신한다. 이력의 날짜는 `YYYY-MM-DD`, 최신 항목은 위에 둔다.

내부 개념 링크는 문서 상대 경로를 사용한다. `/`로 시작하는 OKF 링크는 운영 웹사이트 URL이나 파일 시스템 루트가 아니라 번들 루트를 가리킨다는 점에 유의한다.

## 출처와 신뢰

초기 문서는 저장소 커밋을 고정한 GitHub URL을 `sources[].resource`에 기록한다. `source_revision`은 이 번들에서 사용하는 확장 필드이며, 내용을 읽어 작성한 저장소 커밋을 나타낸다. 미커밋 코드를 출처로 쓸 때는 커밋에 포함된 것으로 표시하지 말고 작업 트리의 변경 범위를 별도로 기록한다. `working_tree_sources`는 작성 당시 해당 커밋에 포함되지 않은 작업 트리 출처이며, 이후에도 그 파일이 미커밋 상태라는 뜻은 아니다.

`generated`는 작성 주체와 생성 시점을 나타낸다. 시간은 UTC 또는 오프셋이 포함된 ISO 8601 datetime으로 적는다. 외부 명세를 근거로 한 주장은 `sources[].id`와 같은 이름의 각주로 연결한다.

새 문서는 `status: draft`로 시작한다. 확인하지 않은 `verified`나 사람의 승인 기록을 만들지 않는다. 실제 확인이 이루어지면 확인 주체와 시점을 기록한다. `status`와 검증 이력은 서로 다른 정보다.

사용하지 않는 메타데이터, 실행기·검증기나 계산 예제를 채우기 위해 만들지 않는다. 템플릿이 필요하면 아래 형식에서 출처와 실제 시점을 채운다.

```yaml
---
type: Reference
title: 문서 제목
description: 이 문서가 설명하는 내용 한 문장
tags: [frontend]
status: draft
---
```

## 소스 변경 훅

`scripts/okf-sync.mjs`가 변경 파일을 관련 개념에 연결한다. 이 매핑은 저장소 운영 규칙이며 OKF 명세의 필수 항목은 아니다.

| 변경 영역                                  | 검토·갱신할 문서                  |
| ------------------------------------------ | --------------------------------- |
| App Router, 기기 판별                      | `okf/architecture/routing.md`     |
| ShopShell, Context, 장바구니·로그인 상태   | `okf/architecture/state.md`       |
| 목 상품·IA 데이터, 그 외 새 src 영역       | `okf/project.md`                  |
| 공통 UI·기능 화면·스타일·스토리·Panda 설정 | `okf/architecture/ui.md`          |
| 패키지·TypeScript·PostCSS 설정             | `okf/development/setup.md`        |
| 테스트·ESLint 설정                         | `okf/development/verification.md` |
| 훅과 검사 스크립트                         | `okf/maintenance.md`              |

위 영역이 바뀌면 `okf/log.md`도 갱신한다. 문서 설명에 영향이 없더라도 관련 문서에 검토한 코드 범위와 영향 없음을 기록한다. 검토 없이 시간만 변경해서 통과시키지 않는다.

Codex·Claude `PostToolUse`는 파일 편집 후 미갱신 문서를 에이전트에 안내한다. 조회 도구·종료 이벤트에는 새 훅을 연결하지 않는다. 셸이나 외부 편집기로 바꾼 파일도 Git `pre-commit`에서 검사한다. Git 검사는 스테이징된 변경만 확인하고, 관련 문서와 변경 이력이 함께 스테이징되지 않았으면 커밋을 차단한다. 문서를 삭제하는 변경은 문서 갱신으로 인정하지 않는다.

`npm run hooks:install`로 Git 훅을 설치한다. `npm ci`의 prepare에서도 같은 설치를 실행한다. 기존 `core.hooksPath`나 기본 pre-commit이 있으면 덮어쓰지 않고 수동 연결을 안내한다. 현재 Claude 설정이 존재하면 기존 graft 훅을 보존하면서 OKF 훅을 중복 없이 추가한다. 로컬 Claude 설정은 Git에서 제외되어 있으며, 새 환경에서도 설치 명령을 실행해야 한다.

Codex 프로젝트 훅은 런타임의 신뢰 검토가 필요하다. `/hooks`에서 `.codex/hooks.json`을 검토·신뢰한 후 적용한다. 신뢰 우회 플래그를 기본 실행 절차에 넣지 않는다.

### PowerShell

PowerShell에서는 다음 명령을 저장소 루트에서 실행한다. npm 실행 정책 때문에 `npm.ps1`이 차단되는 환경은 `npm.cmd`를 사용한다.

```powershell
npm.cmd run hooks:install
npm.cmd run okf:check
npm.cmd run test:okf
```

PowerShell 전용 진입점도 제공한다. 기본 동작은 `check`이며 Node의 종료 코드를 그대로 반환한다. 스크립트 위치를 기준으로 저장소 루트에서 실행하므로 다른 현재 디렉터리에서도 절대 경로로 호출할 수 있다. 실행 정책으로 `.ps1`이 차단되면 위 `npm.cmd` 명령을 사용한다.

```powershell
.\scripts\okf.ps1 install
.\scripts\okf.ps1 check
```

`.codex/hooks.json`의 `node "$(git rev-parse --show-toplevel)/scripts/okf-sync.mjs" hook`은 PowerShell과 POSIX sh 모두에서 경로를 인용해 실행하는 표현이다. `.githooks/pre-commit`의 `#!/bin/sh`와 `exec`는 Git for Windows가 제공하는 sh로 실행하는 Git 훅 형식이며 PowerShell에 직접 붙여 넣는 명령이 아니다. Node 스크립트는 `execFileSync`로 Git 인수를 전달하므로 셸 전용 문법을 요구하지 않는다.

`package.json`의 `&&`는 기본 Windows npm 스크립트 셸인 cmd.exe에서 지원한다. Windows PowerShell 5.1을 npm의 사용자 지정 `script-shell`로 설정하면 이 연산자를 사용할 수 없으므로 기본 npm 셸을 사용한다.

이 검사는 동시 갱신 누락을 잡으며, 문서 내용의 사실 정확성을 자동으로 보증하지 않는다. 훅은 문서를 자동 재작성하거나 파일을 스테이징하지 않는다. 훅 구현의 작성 당시 작업 트리 출처는 `scripts/okf-sync.mjs`, `scripts/install-okf-hooks.mjs`, `.githooks/pre-commit`, `.codex/hooks.json`, `tests/okf-sync.test.mjs`다.

## 검증

모든 개념의 YAML 파싱과 `type`, 사용한 시간 필드, `sources[].resource`, 인덱스 구성을 확인한다. 작성한 내부 링크와 코드 출처가 실제로 존재하는지도 확인한다. 링크 누락은 OKF 자체의 형식 위반과 구분해서 보고한다.

훅 변경은 `npm run test:okf`와 `npm run lint`로 확인한다. 커밋 예정 변경은 `npm run okf:check`로 검사한다.

[^okf-spec]: Open Knowledge Format v0.2, 번들 구조·메타데이터·출처·버전 규칙.

## src 폴더 구조 승격 (2026-10-28)

shared 내부를 src로 승격했다. 공통 UI는 src/components/common, 기능별 UI는 src/components/features, ShopShell과 플랫폼 상태는 src/context에 둔다. icons·lib·styles·types는 src 바로 아래에서 관리한다. app·data·mocks·stories의 역할과 라우트는 유지한다. 별칭과 Storybook 스타일 참조, Panda 생성 경로, OKF 동기화 규칙을 새 경로에 맞췄다. 작업 트리 출처: tsconfig.json, package.json, scripts/okf-sync.mjs, src/context/ShopShell.tsx, src/components/, .storybook/preview.ts.

## 단일 부모 통합과 도메인 폴더 승격 (2026-10-28)

OKF 소스 매핑의 상태 관련 도메인 경로를 src/components/cart/와 src/components/login/으로 갱신했다. 다른 도메인과 공통 UI는 기존 src/components/ 매핑으로 처리한다. 도메인 폴더 승격과 타입·스토리 변경도 관련 개념 및 이력을 함께 갱신한다.

## IA 연결 그래프 유지보수 (2026-10-29)

scripts/screen-files.mjs는 tsconfig 경로 해석과 현재 import를 기준으로 src/app/screen-index/sourceGraph.generated.json을 생성한다. dev·Storybook 감시와 각 빌드 전 생성으로 경로 추가·이동·삭제를 반영하고, 내용이 같은 결과는 재저장하지 않는다. 생성 결과는 저장소에 보관해 별도 생성 전 타입 검사도 가능하게 한다. 신규 IA의 화면 진입점은 screenConnections.ts에서 연결하며 바인딩 주석으로 개발 연결 지점을 안내한다. 공통 UI와 범용 훅은 수정 목록처럼 노출하지 않는다. 코드에서 사라진 import와 삭제 파일은 다음 생성에서 제외된다.

2026-10-29: Windows `core.autocrlf=true` 환경에서 그래프 내용의 Git 해시는 HEAD와 같아도 LF로 재생성된 파일이 변경으로 표시되는 현상을 확인했다. `.gitattributes`에서 이 파일만 `text eol=lf`로 고정하고 생성기도 LF를 명시한다. 실제 import 변경에 따른 자동 갱신과 생성 결과 추적은 유지한다.

검증: 생성 명령 연속 2회에서 수정 시각 불변, `tests/screen-files.test.mjs` 1개 통과. 내용 동일성을 확인한 생성 파일의 인덱스 작업 트리 캐시를 갱신한 뒤 Git 변경 표시가 사라졌으며 스테이징된 변경은 없다.

출처는 위 스크립트, package.json, screenConnections.ts와 tests/screen-files.test.mjs의 작업 트리다. 이 자동화는 파일 그래프만 갱신하며 OKF를 자동 작성하거나 Git을 스테이징하지 않는다. 연결 정책 변경 시 [UI 문서](architecture/ui.md#ia-작업-파일-자동-갱신과-개발-연결-범위-2026-10-29)와 실행·검증 문서를 함께 갱신한다.
