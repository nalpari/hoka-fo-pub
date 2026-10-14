---
type: Playbook
title: '변경 검증'
description: '변경 범위에 맞는 정적 검사, 빌드와 수동 검증을 안내한다.'
tags: [verification, testing, build]
status: draft
generated:
  by: codex/gpt-6
  at: '2026-10-14T06:33:58Z'
source_revision: b3f7243062b500eb4909961667ad142cc368ff91
working_tree_sources:
  - eslint.config.js
  - tests/okf-sync.test.mjs
  - scripts/okf-sync.mjs
sources:
  - id: package-json
    resource: https://github.com/nalpari/hoka-fo-pub/blob/b3f7243062b500eb4909961667ad142cc368ff91/package.json
    title: 'package.json'
  - id: tests-app-router-test-mjs
    resource: https://github.com/nalpari/hoka-fo-pub/blob/b3f7243062b500eb4909961667ad142cc368ff91/tests/app-router.test.mjs
    title: 'tests/app-router.test.mjs'
  - id: -storybook-preview-ts
    resource: https://github.com/nalpari/hoka-fo-pub/blob/b3f7243062b500eb4909961667ad142cc368ff91/.storybook/preview.ts
    title: '.storybook/preview.ts'
---

# 변경 검증

검증 결과는 실행한 명령과 관찰한 동작으로 보고한다. 이 문서는 검증 절차이며, 명령이 최근에 실행되거나 통과했다는 기록은 아니다.

## 코드 변경

```sh
npm run typecheck
npm run lint
npm run build
```

`npm run lint`는 로컬 graft 연동 스크립트인 `.claude/helpers/**`를 검사 대상에서 제외한다. 이 파일들은 Git에서도 제외되며, 앱 소스와 OKF 검사 스크립트는 계속 검사한다. 제외 규칙은 `eslint.config.js`에서 관리한다.

라우팅·의존성 변경은 빌드 후 아래 테스트도 실행한다.

```sh
node --test tests/app-router.test.mjs
```

이 테스트는 `.next/server/app-paths-manifest.json`을 읽으므로 빌드가 먼저 필요하다. 기대하는 62개 경로가 실제 빌드 결과에 있는지, Next.js·React·React DOM 버전이 고정되어 있는지, React Router 의존성이 제거되어 있는지 검사한다. 브라우저 인터랙션을 대신하지 않는다.

스토리를 바꾼 경우 `npm run build-storybook`도 실행한다. 스타일이나 토큰을 바꾼 경우 Panda 생성 결과를 사용해 PC·모바일 화면을 확인한다.

## 수동 확인

- 변경한 URL의 직접 진입과 내부 링크 이동을 확인한다.
- URL 필터·정렬은 새로고침, 뒤로 가기와 모바일 적용 버튼을 확인한다.
- 공통 상태 변경은 상품 담기 후 장바구니 이동, 로그인·로그아웃과 새로고침을 확인한다.
- 플랫폼 분기는 PC와 모바일 User-Agent로 각각 확인한다.
- 미등록 URL의 404와 알려진 미구현 기능을 구분한다.

## OKF 동시 갱신 검사

`npm run okf:check`는 스테이징된 소스·설정 변경에 관련 OKF 개념과 `okf/log.md`가 포함되어 있는지 검사한다. 작업 트리에서 문서를 수정했더라도 스테이징하지 않았다면 통과하지 않는다. 필요한 문서는 [유지보수 매핑](../maintenance.md)에 있다.

`npm run test:okf`는 별도의 임시 Git 저장소에서 코드만 스테이징한 경우의 차단, 관련 문서를 포함한 경우의 통과, 에이전트 안내와 기존 훅 보존을 검증한다. 실제 저장소에 커밋을 만들지 않는다. 작성 당시 작업 트리에서 확인한 테스트 출처는 `tests/okf-sync.test.mjs`다.

## 문서만 변경

YAML 메타데이터, 인덱스 연결, 문서 내부 링크와 코드 출처를 확인하고 `git diff --check`를 실행한다. 앱 코드나 빌드 설정을 바꾸지 않은 문서 작업에는 앱 빌드를 요구하지 않는다.

[OKF 유지보수](../maintenance.md), [워크트리 절차](worktrees.md)를 참고한다.
