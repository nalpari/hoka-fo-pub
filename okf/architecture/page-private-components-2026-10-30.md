---
type: Architecture
title: '페이지 전용 컴포넌트 분리 재적용'
description: '30개 라우트의 페이지 전용 UI 배치와 재적용 검증을 기록한다.'
tags: [nextjs, routing, components]
status: draft
generated:
  by: codex/gpt-6
  at: '2026-10-30T00:19:33Z'
source_revision: f8d58446b83646127d5e440bb6cec2e6186248ea
working_tree_sources:
  - src/app/**/page.tsx
  - src/app/**/_components/*.tsx
  - src/app/screen-index/sourceGraph.generated.json
  - AGENTS.md
  - .codex/skills/component-reusability/SKILL.md
  - .codex/skills/component-reusability/references/page-ownership.md
  - .codex/skills/component-reusability/references/single-parent-consolidation.md
---

# 페이지 전용 컴포넌트 분리 재적용

사용자 요청으로 2026-10-29의 패턴을 현재 작업 트리에 재적용했다. `page.tsx`는 페이지 컴포넌트를 유지하고 보조 UI·관련 내부 타입·Panda 스타일은 라우트의 `_components/`에 둔다. 기존 순수 계산·데이터 모듈은 유지하며 페이지 전체를 전달하는 새 래퍼는 추가하지 않는다.

대상은 홈·국가 선택·로그인/계정 찾기·마이페이지·상품 상세·런클럽 세션·회원가입·고객센터의 28개 페이지와 장바구니·주문서다. 앞의 28개는 각 1개 모듈로 관련 보조 선언을 모았고, 장바구니 5개·주문서 8개를 포함해 총 41개 전용 TSX 모듈을 둔다. 이미 단순하거나 적합한 구조인 페이지는 유지한다.

URL·Next export·클라이언트 지시문·훅과 상태 수명·콜백·RoutePreview·개발팀 바인딩 주석을 유지한다. 상품 상세의 기존 동적 로딩 경계는 전용 모듈 안에서 상대 경로만 조정했다. 새 `FormGuide.tsx`와 퍼블리싱 가이드 페이지는 보존했다. IA 작업 파일 그래프는 현재 import 관계로 재생성했다.

## 이번 검증

2026-10-30 Codex가 현재 작업 트리에서 다음을 실행했다.

- 변경 TSX ESLint와 변경 소스·규칙 Prettier 검사를 통과했다.
- AST 비교에서 기존 함수 278개와 보조 선언 506개의 내용 보존을 확인했다. 28개 페이지의 보조 선언 분리와 장바구니·주문서 13개 모듈 배치 검사를 통과했다.
- Next.js 프로덕션 빌드와 포함된 TypeScript 검사, 정적 페이지 55개 생성을 통과했다.
- Storybook 프로덕션 빌드를 통과했다.
- 브라우저에서 홈·장바구니·주문완료·상품 상세·런클럽 세션의 PC 1600px·모바일 375px 스토리 10개가 렌더 완료됨을 확인했다. 상품 상세 PC의 최초 정적 모듈 로딩 실패는 캐시를 끈 재시도에서 해소됐고 표시 중인 오류가 없었다.
- 실제 프로덕션 장바구니에서 옵션 변경 모달 열기·닫기를 확인했다. 장바구니 PC 모달과 주문완료 모바일 캡처를 확인했다. 전체 라우트의 모든 상호작용과 외부 이미지 수급은 전수 검증하지 않았다.
- Node 테스트는 기존 `/publishing-guide` 경로가 기대 목록에 없는 `tests/app-router.test.mjs` 1건이 실패했다. 이 작업에서 경로나 해당 테스트는 변경하지 않았다.

구현 단계에서는 로컬 작업만 수행했고 완료 후 사용자가 별도로 커밋·푸시를 요청했다. 예약은 생성하지 않았다. 관련 정책은 [라우팅](routing.md#페이지-전용-컴포넌트-분리-재적용-2026-10-30), [UI](ui.md#페이지-전용-ui-배치-2026-10-30)를 따른다.
