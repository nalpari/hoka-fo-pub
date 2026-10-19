---
type: Architecture
title: '라우팅과 플랫폼'
description: 'App Router 경로, 페이지 경계와 PC·모바일 선택을 설명한다.'
tags: [nextjs, routing, platform]
status: draft
generated:
  by: codex/gpt-6
  at: '2026-10-15T16:38:00+09:00'
source_revision: b3f7243062b500eb4909961667ad142cc368ff91
working_tree_sources:
  - src/app/mypage/event-entries/page.tsx
  - src/app/support/after-sales/page.tsx
  - src/app/support/care/page.tsx
sources:
  - id: src-app-layout-tsx
    resource: https://github.com/nalpari/hoka-fo-pub/blob/b3f7243062b500eb4909961667ad142cc368ff91/src/app/layout.tsx
    title: 'src/app/layout.tsx'
  - id: src-shared-lib-device-ts
    resource: https://github.com/nalpari/hoka-fo-pub/blob/b3f7243062b500eb4909961667ad142cc368ff91/src/shared/lib/device.ts
    title: 'src/shared/lib/device.ts'
  - id: src-app-products-id-page-tsx
    resource: https://github.com/nalpari/hoka-fo-pub/blob/b3f7243062b500eb4909961667ad142cc368ff91/src/app/products/[id]/page.tsx
    title: 'src/app/products/[id]/page.tsx'
  - id: src-shared-features-catalog-productlistingpage-tsx
    resource: https://github.com/nalpari/hoka-fo-pub/blob/b3f7243062b500eb4909961667ad142cc368ff91/src/shared/features/catalog/ProductListingPage.tsx
    title: 'src/shared/features/catalog/ProductListingPage.tsx'
  - id: tests-app-router-test-mjs
    resource: https://github.com/nalpari/hoka-fo-pub/blob/b3f7243062b500eb4909961667ad142cc368ff91/tests/app-router.test.mjs
    title: 'tests/app-router.test.mjs'
---

# 라우팅과 플랫폼

## 진입점과 책임

`src/app/layout.tsx`는 서버에서 `await headers()`로 User-Agent를 읽고 `detectPlatform`으로 플랫폼을 선택한다. 휴대폰과 태블릿은 `mobile`, 그 외는 `web`이다. 이 선택은 화면 너비만으로 결정되지 않는다. 선택한 플랫폼은 `<body>`의 `platform-*` 클래스로도 전달된다.

루트 레이아웃은 공통 `ShopShell`에 페이지를 전달한다. `Suspense`는 화면 로딩 대체 콘텐츠를 제공하고, PC 루트에는 `--layout-web-min-width`가 적용된다.

## 파일 기반 경로

| 파일 또는 경로군                                | URL                   |
| ----------------------------------------------- | --------------------- |
| `src/app/page.tsx`                              | `/`                   |
| `src/app/products/page.tsx`                     | `/products`           |
| `src/app/products/[id]/page.tsx`                | `/products/:id`       |
| `src/app/cart/page.tsx`, `checkout/page.tsx`    | `/cart`, `/checkout`  |
| `src/app/collection/[id]/page.tsx`              | `/collection/:id`     |
| `src/app/explore/[...slug]/page.tsx`            | EXPLORE 하위 경로     |
| `src/app/running/run-club/[sessionId]/page.tsx` | 런클럽 상세           |
| `src/app/login/**`, `signup/**`                 | 회원 관련 화면        |
| `src/app/mypage/**`                             | 마이페이지            |
| `src/app/support/**`                            | 고객지원              |
| `src/app/not-found.tsx`                         | 미등록 URL의 404 화면 |

현재 회귀 테스트는 기존 62개 URL과 `/checkout`을 검증한다. 경로를 의도적으로 추가·변경할 때는 실제 페이지와 테스트의 기대 경로를 함께 갱신한다.

## 탐색과 쿼리

내부 링크는 `next/link`의 `href`, 이벤트 탐색은 `next/navigation`의 `useRouter`를 사용한다. 동적 파라미터는 `useParams`, 쿼리는 읽기 전용 `useSearchParams`로 읽는다.

상품 필터는 현재 쿼리를 복사한 `URLSearchParams`를 수정한 뒤 `router.push(..., { scroll: false })`로 반영한다. 모바일 필터는 임시 선택 상태를 보관하고 적용 버튼을 눌렀을 때 URL에 반영한다. React Router나 전체 앱을 분기하는 라우트 테이블을 다시 도입하지 않는다.

`/login/account-locked`와 `/login/find-account/id-confirmation-modal` 같은 모달 화면은 닫기·확인 때 `router.push`로 로그인 흐름의 다음 화면으로 이동한다.

새 페이지에서 서버·클라이언트 경계를 판단하고, 설치된 `node_modules/next/dist/docs/`의 해당 API 문서를 먼저 읽는다. 새 서버 페이지에 클라이언트 콜백을 직접 넘기지 않는다.

[공통 상태](state.md), [UI 구성](ui.md), [변경 검증](../development/verification.md)을 참고한다.

## 러닝세션 신청내역 연결

마이페이지 MY HOKA의 러닝세션 신청내역은 `/mypage/event-entries`에서 `RunClubPage.tsx`를 직접 표시한다. 기존 `/running/run-club`도 같은 컴포넌트를 표시하며 세션 상세 주소는 `/running/run-club/:sessionId`를 유지한다. 기존 이벤트·대회 신청 임시 화면은 이 경로에서 사용하지 않는다.

## 배송 및 반품안내

`/support/after-sales` URL은 유지하면서 `ShippingReturnsPage`로 연결한다. 이전 A/S 처리현황 화면 대신 고객센터 배송 및 반품안내를 표시한다. 출처는 작업 트리의 `src/app/support/after-sales/page.tsx`와 `src/shared/features/support/ShippingReturnsPage.tsx`다.

## 세탁 및 손질 방법 안내

`/support/care`는 `CareGuidePage`를 표시한다. 고객센터 정보 메뉴에서 접근하며, 안내 탭을 페이지 내부 상태로 전환한다. 출처는 작업 트리의 `src/app/support/care/page.tsx`와 `src/shared/features/care-guide/CareGuidePage.tsx`다.
