---
type: Architecture
title: '컴포넌트·모듈 소유권과 플랫폼 기준'
description: '완료된 구조 정리 보고서에서 현재 사용하는 배치·재사용·반응형 기준을 모아 안내한다.'
tags: [components, ownership, responsive, platform]
status: draft
generated:
  by: codex/gpt-6
  at: '2026-11-04T01:19:32.500Z'
source_revision: 5db7492d7013d077712245026ece97b1f39a130d
sources:
  - id: project-rules
    resource: https://github.com/nalpari/hoka-fo-pub/blob/5db7492d7013d077712245026ece97b1f39a130d/AGENTS.md
    title: '현재 프로젝트 배치·재사용·반응형 규칙'
  - id: consolidation
    resource: https://github.com/nalpari/hoka-fo-pub/blob/5db7492d7013d077712245026ece97b1f39a130d/okf/architecture/single-parent-consolidation-2026-10-28.md
    title: '단일 부모 통합 원문과 이동·검증 목록'
  - id: modules
    resource: https://github.com/nalpari/hoka-fo-pub/blob/5db7492d7013d077712245026ece97b1f39a130d/okf/architecture/ts-module-ownership-2026-10-28.md
    title: '보조 TS 모듈 이동 원문'
  - id: pages
    resource: https://github.com/nalpari/hoka-fo-pub/blob/5db7492d7013d077712245026ece97b1f39a130d/okf/architecture/page-private-components-2026-10-30.md
    title: '페이지 전용 UI 분리 원문'
  - id: platform-audit
    resource: https://github.com/nalpari/hoka-fo-pub/blob/5db7492d7013d077712245026ece97b1f39a130d/okf/architecture/platform-component-audit-2026-10-28.md
    title: 'Desktop·Mobile 파일 조사 원문'
  - id: responsive
    resource: https://github.com/nalpari/hoka-fo-pub/blob/5db7492d7013d077712245026ece97b1f39a130d/okf/architecture/responsive-platform-2026-10-28.md
    title: '플랫폼·폴더 평탄화·Badge 통합 원문'
---

# 컴포넌트·모듈 소유권과 플랫폼 기준

2026-11-04 문서 정리로 완료된 구조 변경 보고서 다섯 개를 이 문서로 통합했다. 현재 판단 기준은 [AGENTS.md](../../AGENTS.md)와 [저장소 인계 스킬](../../.agents/skills/hoka-markup-handoff/SKILL.md)을 따른다. 과거의 전체 이동표·조사 수치·검증 결과와 원래 출처 메타데이터는 위 커밋 고정 원문에 보존한다. 과거 검증은 이번 문서 정리에서 재실행한 결과가 아니다.

## 페이지와 보조 모듈

- `src/app/**/page.tsx`는 라우트 컴포넌트와 Next.js가 허용하는 export를 소유한다. 페이지 전용 보조 UI·그 내부 타입·Panda 스타일은 같은 라우트의 `_components/`에 책임 단위로 모은다. 페이지 전체를 전달하는 래퍼는 만들지 않는다.
- 순수 데이터·계산·일반 TS 모듈은 사용 라우트 옆에 두고, 여러 하위 라우트가 공유하면 공통 상위 라우트에 둔다. 셸 데이터·공용 훅·컨텍스트·공유 타입·유틸은 각각 `src/data`·`src/hooks`·`src/context`·`src/types`·`src/lib`가 소유한다.
- 기존 서버/클라이언트 경계, metadata·route props, 동적 로딩과 상태 수명을 유지한다. 페이지 진입점 배치 규칙이 단일 부모 통합보다 우선한다.
- `src/components/common`의 공통 계층과 기능별 도메인 소유권을 유지한다. 파일 이동 시 별칭·상대 import·타입 선언·동적 fixture·활성 문서 링크를 함께 바꾸며 호환 중계 파일은 추가하지 않는다.

## 재사용과 파일 경계

- 운영 부모는 실제 구현을 소비하는 부모로 센다. 재수출은 소비 심벌까지 추적하며 타입 전용·테스트·미리보기 소비만으로 운영 재사용이라고 판단하지 않는다.
- 운영 부모가 하나인 컴포넌트는 기존 부모 모듈에 모으되 페이지 전용 UI와 필요한 런타임 경계는 유지한다. 실제 공유 구현을 복제해서 파일을 줄이지 않는다.
- props 이름이나 라벨·간격 기본값만 전달하는 래퍼는 기본 컴포넌트를 직접 사용하도록 정리한다. 기존 소유자의 작은 typed option으로 표현할 수 있으면 별도 상태·프로모션 래퍼를 만들지 않는다.
- `Name/Name.tsx` 하나뿐인 중복 폴더는 평탄화할 수 있다. 데이터·타입·자산·문서·다른 구현을 가진 도메인 폴더는 유지한다. 폴더 이동과 미사용 컴포넌트 삭제는 별도 판단이다.
- Desktop/Mobile 이름이나 사용처 수만으로 삭제·통합하지 않는다. HTML 의미·표현 차이·접근성·폼 소유권과 플랫폼 전환 중 상태를 보존해야 한다.

2026-10-28의 단일 부모 389개 통합·도메인 55개 승격, 보조 TS 모듈 33개 이동, Desktop/Mobile 파일 조사와 폴더 평탄화는 완료 이력이다. 이후 2026-10-30에 페이지 전용 UI를 `_components/`로 분리했으므로 이전 이동표를 현재 경로 목록으로 사용하지 않는다. Storybook은 2026-11-03 제거됐으며 과거 보고서의 스토리 보존 설명은 당시 검증 범위다. 현재 화면 확인은 [고정 상태 URL](publishing-state-previews-2026-10-30.md)과 [검증 절차](../development/verification.md)를 따른다.

## 플랫폼과 반응형

`src/context/platform.tsx`가 `PlatformProvider`와 `usePlatform()`을 제공한다. 자동 모드는 `matchMedia('(max-width: 1024px)')`를 구독해 1024px 이하를 `mobile`, 초과를 `web`으로 선택한다. 서버와 최초 hydration은 `web`이고 클라이언트에서 화면 폭에 맞춘다. 명시한 preview `platform`은 화면 폭보다 우선한다.

자동 모드의 body·app 클래스와 모달·시트 포털은 같은 플랫폼을 사용한다. 명시 플랫폼은 body 자동 동기화를 하지 않는다. 화면 크기 변경을 key로 사용하거나 상호작용 트리를 복제하지 않으며 입력·선택·열린 overlay 상태는 기존 소유자에서 유지한다.

자동 PC 모드의 1024px 초과~1200px 미만은 1200px 캔버스와 가로 스크롤을 사용한다. 1200px 이상에서는 세로 스크롤바 때문에 추가 가로 넘침이 생기지 않아야 한다. 관련 변경은 1024/1025px, 1199/1200px, 열린 overlay의 왕복 리사이즈와 명시 PC/MO preview를 각각 확인한다.

## Badge의 표시 옵션

`Badge`는 기본 라벨, `status`, `promotion`, `runningSessionCategory`를 배타적인 타입으로 제공한다. 기본 호출의 표현·className 위치와 순서·구분선·빈 렌더링을 유지한다. 프로모션의 현재 색상 옵션 등 상세 API는 `src/components/common/atoms/Badge.tsx`와 [공통 UI 재사용 조사](common-reuse-audit.md)를 확인한다. 과거 BadgeLaunchStatus·PromotionBadge 래퍼를 다시 만들지 않는다.

## 정리 시 확인 범위

이번 정리는 기존 보고서와 AGENTS, 현재 `platform.tsx`·`Badge.tsx`를 읽어 기준을 통합한 문서 변경이다. 애플리케이션 소스와 실행 동작은 변경하지 않았다. 원문별 검증 주체·시점·실패와 한계는 각 `sources`의 고정 원문에서 확인한다.
