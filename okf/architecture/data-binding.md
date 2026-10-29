---
type: Reference
title: '화면 데이터와 서비스 연결 계약'
description: '퍼블리싱 화면에 실제 조회 결과와 비동기 요청을 연결하는 지점을 설명한다.'
tags: [frontend, binding, state, forms]
status: draft
generated:
  by: codex/gpt-6
  at: '2026-10-29T00:06:17Z'
working_tree_sources:
  - AGENTS.md
  - .codex/skills/component-reusability/SKILL.md
  - .codex/skills/component-reusability/references/data-binding.md
  - src/context/ShopShell.tsx
  - src/context/CheckoutContext.ts
  - src/context/PhoneVerificationContext.ts
  - src/context/ProductListingContext.ts
  - src/context/MyPageDataContext.ts
  - src/context/OrdersContext.ts
  - src/hooks/useRequestAction.ts
  - src/hooks/usePhoneVerification.ts
  - src/components/catalog/ProductListingPage.tsx
  - src/components/orders/OrdersRoute.tsx
  - src/app/cart/page.tsx
  - src/app/checkout/page.tsx
  - src/app/login/page.tsx
  - src/app/mypage/addresses/page.tsx
  - src/app/mypage/reviews/page.tsx
  - src/app/mypage/reviews/reviews.types.ts
  - src/app/mypage/reviews/reviewFixtures.ts
  - src/app/products/[id]/page.tsx
  - src/mocks/cartDisplay.ts
  - src/stories/features/binding/Binding.stories.tsx
  - tests/cart-display.test.mjs
---

# 화면 데이터와 서비스 연결 계약

현재 서비스 API는 연결하지 않는다. 아래 계약은 기존 화면을 유지하며 개발팀이 조회 결과와 요청 함수를 연결할 수 있게 만든 경계다. Provider가 없으면 기존 퍼블리싱 데모가 동작한다. 라우트의 default export에 임의 props를 추가하거나 Storybook 전용 RoutePreview를 운영 데이터 주입에 사용하지 않는다.

## 연결 위치

| 영역 | 연결 지점 | 데이터·이벤트 소유권 |
| --- | --- | --- |
| 공통 셸·상품·장바구니 | `ShopShell.state`, `ShopStateProvider` | 실제 상품 목록, 장바구니, 로그인 상태와 개수, 상품 추가·변경·삭제·로그인 함수 |
| 상품 목록·검색 | `ProductListingPage.data`, `ProductListingContext` | 조회된 상품, 전체 건수, 다음 페이지 여부, 조회 상태, 조건 변경·추가 조회·재시도 |
| 결제 | `CheckoutContext` | 쿠폰과 최대 혜택 선택, 할인·배송비 견적, 저장 배송지, 주문 제출 |
| 휴대폰 인증 | `PhoneVerificationContext` | 인증 발송 결과의 요청 ID·유효시간, 인증번호 검증 |
| 배송지·리뷰 | `MyPageDataContext` | 현재 조회 목록과 저장·삭제 함수 |
| 주문·취소·반품 | `OrdersContext` | 현재 주문 목록, 조회 조건 변경, 신청·구매 확정·내역 삭제 함수 |

이 Provider는 개발팀의 Client Component에서 실제 query 상태와 서비스 함수에 연결한다. Server Component에서 일반 함수를 props로 넘기지 않는다. 서버에서 받은 직렬화 가능한 초기 데이터는 Client Component로 전달하고, 그 컴포넌트가 서비스 함수를 조합한다. Server Action을 사용한다면 해당 framework 계약을 따른다.

## 요청 결과와 오류

비동기 변경 함수는 성공 시 resolve하고 실패 시 `Error`를 throw/reject한다. `{ ok: false }` 같은 서버 응답을 성공으로 resolve하지 않도록 서비스 어댑터에서 변환한다. `useRequestAction`은 같은 화면에서의 중복 제출을 막고 오류를 표시한다. 요청 중에는 관련 입력과 확인 액션을 비활성화한다. 실패 시 편집값과 화면을 유지하고, 성공 이후에만 닫기·이동·완료 처리를 한다.

배송지·주문·리뷰의 서비스 연결 모드는 Provider의 현재 목록을 직접 읽는다. 초기 목록을 페이지 로컬 상태로 복사하지 않으므로 늦게 도착한 응답과 재조회 결과가 반영된다. 입력 중인 draft는 페이지에서 유지한다. 저장·삭제 성공 후 최신 목록 갱신 또는 query invalidation은 연결 함수의 소유자가 담당한다. 목록을 무조건 effect로 로컬 draft에 복사하지 않는다.

## 셸·상품

`ShopShell.state`로 연결할 때 `products`와 `isLoggedIn`을 반드시 제공한다. 장바구니·상품 상세·결제는 이 상품 목록을 사용한다. 실제 API의 ID가 목 상품에 없다는 이유로 행이 누락되지 않도록 주문 가능한 장바구니 상품을 목록에 포함한다. 조회 전 상태와 상품 조회 실패는 연결 소유자가 명시적으로 처리한다. DTO는 화면의 `Product` 모델로 변환한다. 현재 `Product` 타입의 출처는 `src/mocks/products.ts`이며 API 응답 타입을 의미하지 않는다.

`login`은 `{ id, password, rememberId }`를 받는다. 로그인 실패 시 reject하면 홈으로 이동하지 않는다. 실제 세션과 인증 상태 갱신은 개발팀이 담당한다. 데모 로그인 안내는 `authenticationMode: 'demo'`에서만 사용한다. 실제 상태를 연결한 셸에서 관심·최근 개수를 생략하면 0으로 표시한다.

`CartItem.imageSrc`는 명시적인 이미지 override다. 목 장바구니와 해당 스토리는 이 값을 지정해 기존 시안 이미지를 유지한다. 색상명으로 시안 이미지를 추측하지 않으며 override가 없으면 상품의 이미지를 사용한다.

## 상품 목록

서비스 모드의 `items`는 이미 검색·필터·정렬된 결과다. 화면에서 목 상품을 다시 필터링하거나 서버 결과를 36개로 자르지 않는다. `totalCount`와 `hasMore`는 반환된 일부 상품 수와 별도로 전달한다. `pending`·`error`가 있는 빈 응답을 검색 결과 없음으로 표시하지 않는다.

`onQueryChange`는 URL 기반 필터·정렬·검색어와 로컬 가격 조건을 전달한다. `onPreviewQueryChange`는 모바일 시트가 열렸을 때 적용 전 초안 조건을 전달한다. 모바일 초안 건수는 `mobileResultCount`로 별도로 제공할 수 있다. 조회 콜백은 `useCallback` 등으로 참조를 유지하고, 오래된 요청 취소·응답 순서 보장은 실제 조회 소유자가 처리한다. 추가 조회 함수는 Promise를 반환하면 완료까지 중복 호출을 막는다. 조회 오류 재시도는 `onRetry`로 연결한다.

## 주문 제출과 인증

`CheckoutSubmission`은 선택 상품, 결제 수단, 쿠폰, 최대 혜택, 두 동의 여부와 배송 필드 전체를 전달한다. 외부 견적의 할인·배송비를 화면과 결제 버튼에 함께 사용한다. 실제 금액의 검증·확정은 서버 책임이다. `savedAddress: null`이면 직접 입력을 표시한다. 외부 submit 성공 이후 완료 화면으로 이동하며, 실제 장바구니 갱신은 submit 소유자가 처리한다. 데모에서만 기존 장바구니 제거 콜백을 호출한다.

휴대폰 발송 성공 후 타이머를 시작하고 서버의 `requestId`를 보관한다. 인증 확인은 이 ID·코드·입력 정보를 전달하며 서버 검증 성공 이후에만 다음 단계로 진행한다. 정보가 바뀐 뒤 도착한 이전 요청 결과는 다음 단계를 진행시키지 않는다. 기존 프로필 페이지의 별도 인증 데모·회원가입 중복확인 등은 이번 연결 계약의 적용 범위에 포함하지 않는다.

## 리뷰 표시 데이터

리뷰 항목은 문자열 또는 숫자 ID, 구매일, 상품명·이미지·옵션과 리뷰 내용을 받는다. 제목과 목록은 해당 상품 정보를 표시하며 시안용 고정 상품명·구매일을 UI 내부에서 생성하지 않는다. 기존 데모는 `reviewFixtures.ts`에서 생성한다. 리뷰 API가 페이지 단위 데이터를 제공한다면 현재 계약에는 조회한 목록을 누적해 전달해야 한다. 이 화면의 더보기는 전달된 목록의 표시 개수를 늘리는 동작이다.

검증 결과는 [개발 검증 기록](../development/verification.md#화면-바인딩-계약-보완-2026-10-29)에 기록한다.

## 정책과 스킬

[AGENTS.md](../../AGENTS.md#ui-data-and-service-binding-policy)에 화면/서비스 경계와 검증 기준을 명시한다. [component-reusability 스킬](../../.codex/skills/component-reusability/SKILL.md#ui-data-and-service-binding)은 해당 작업을 [참조 워크플로](../../.codex/skills/component-reusability/references/data-binding.md)로 안내한다. 기존 페이지 소유권·폼 가이드에서도 이 계약을 연결하며, 데이터 주입을 이유로 단일 부모 화면을 별도 파일로 분리하지 않는다.
