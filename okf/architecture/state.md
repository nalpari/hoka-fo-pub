---
type: Architecture
title: '공통 상태와 데모 데이터'
description: '로그인, 장바구니와 목 데이터의 수명 및 제약을 설명한다.'
tags: [react, state, mock-data]
status: draft
generated:
  by: codex/gpt-6
  at: '2026-10-15T02:04:35Z'
source_revision: b3f7243062b500eb4909961667ad142cc368ff91
working_tree_sources:
  - src/shared/features/cart/CartPage.tsx
  - src/shared/features/login/LoginContent.tsx
  - src/shared/features/login/LoginLayout.tsx
  - src/shared/features/login/LoginForm.tsx
  - src/shared/features/login/LoginActions.tsx
  - src/shared/features/login/LoginMembership.tsx
sources:
  - id: src-shared-shopshell-tsx
    resource: https://github.com/nalpari/hoka-fo-pub/blob/b3f7243062b500eb4909961667ad142cc368ff91/src/shared/ShopShell.tsx
    title: 'src/shared/ShopShell.tsx'
  - id: src-shared-context-platform-tsx
    resource: https://github.com/nalpari/hoka-fo-pub/blob/b3f7243062b500eb4909961667ad142cc368ff91/src/shared/context/platform.tsx
    title: 'src/shared/context/platform.tsx'
  - id: src-shared-features-login-loginpage-tsx
    resource: https://github.com/nalpari/hoka-fo-pub/blob/b3f7243062b500eb4909961667ad142cc368ff91/src/shared/features/login/LoginPage.tsx
    title: 'src/shared/features/login/LoginPage.tsx'
  - id: src-mocks-products-ts
    resource: https://github.com/nalpari/hoka-fo-pub/blob/b3f7243062b500eb4909961667ad142cc368ff91/src/mocks/products.ts
    title: 'src/mocks/products.ts'
  - id: src-app-cart-page-tsx
    resource: https://github.com/nalpari/hoka-fo-pub/blob/b3f7243062b500eb4909961667ad142cc368ff91/src/app/cart/page.tsx
    title: 'src/app/cart/page.tsx'
---

# 공통 상태와 데모 데이터

## ShopShell

`src/shared/ShopShell.tsx`는 공통 레이아웃과 `ShopContext`를 제공한다. 상품 상세·장바구니·로그인·마이페이지의 App Router 페이지는 `useShop()`으로 상태와 콜백을 가져온다. `useShop()`은 `ShopShell` 아래에서 사용한다. `/checkout` 페이지도 같은 방식으로 장바구니를 읽고, 주문을 완료하면 `remove`로 항목을 비운다.

| 상태           | 보관 위치                                            | 수명                                                       |
| -------------- | ---------------------------------------------------- | ---------------------------------------------------------- |
| 장바구니       | `ShopShell`의 React 상태                             | 클라이언트 페이지 이동 중 유지, 새로고침 시 초기화         |
| 로그인         | React 상태와 `hoka-is-logged-in` localStorage 플래그 | 로그인·로그아웃 이벤트로 갱신, 새로고침 시 저장소에서 복원 |
| 플랫폼         | 서버가 선택한 값을 `PlatformProvider`에 전달         | 공통 레이아웃의 플랫폼 선택을 공유                         |
| 관심·최근 개수 | `ShopShell`의 상수                                   | 현재 데모 값은 각각 3, 7                                   |

로그인 플래그는 인증 토큰이 아니다. 로그인 화면은 비어 있지 않은 아이디·비밀번호만 검사하며 실제 자격 증명을 검증하지 않는다. 서버 렌더링과 첫 클라이언트 렌더의 로그인 표시는 hydration 상태로 맞춘다.

로그인 UI의 구조를 분리해도 `LoginPage`가 아이디·비밀번호·아이디 저장 체크·안내 상태, 데모 검증, `onLogin` 호출과 홈 이동을 계속 소유한다. `LoginContent`는 기능 내부 `LoginLayout`·`LoginForm`·`LoginMembership`를 조합하며, 폼의 `LoginActions`는 제출 버튼과 소셜 로그인 안내 콜백을 표시한다. 신규 상태 저장이나 실제 인증 연동은 추가하지 않았다. 제목 `login-title`, 입력 id/name/autocomplete, 필수 입력 검증, 안내 live region과 가입·계정 찾기 이동 계약을 보존한다.

## 장바구니 항목

`id`, `color`, `width`, `size`가 모두 같은 항목을 다시 담으면 수량을 합산한다. 수량을 1 미만으로 바꾸거나 삭제 콜백을 호출하면 해당 항목을 제거한다. 금액과 상품 표시는 목 상품 목록을 조회해 계산한다.

## 데이터 변경

상품 필터와 카드·상세·장바구니는 `src/mocks/products.ts`의 상품 타입과 데이터에 의존한다. 데이터를 바꿀 때 관련 화면, 옵션·품절 상태와 Storybook 예제를 함께 확인한다. 실제 API를 연결할 경우 인증과 영속 상태의 계약을 먼저 정하고 이 문서의 데모 설명을 갱신한다.

## JSX 스타일 이전 검토 (2026-10-15)

LoginLayout·LoginForm·LoginActions·LoginMembership와 CartPage의 단일 사용 배치 스타일을 Panda JSX props로 이전했다. 검토 범위는 로그인 화면의 페이지/콘텐츠 여백·옵션/링크/구분선·액션/혜택 배치와 장바구니의 상품 정보·빈 상태·추천 그리드다. LoginPage의 입력/체크/안내 상태·데모 검증·onLogin·라우팅, CartPage의 행 조회·합계·수량 변경/삭제 콜백과 ShopShell 상태 수명은 변경하지 않았다. 구조 이전 결과와 검증 범위는 [UI 아키텍처](ui.md#componentsfeatures-jsx-스타일-점검-2026-10-15)에 기록한다.

[프로젝트 범위](../project.md), [라우팅](routing.md), [변경 검증](../development/verification.md)을 참고한다.
