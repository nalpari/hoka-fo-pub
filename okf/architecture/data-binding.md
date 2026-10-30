---
type: Reference
title: '화면 데이터와 서비스 연결 계약'
description: '퍼블리싱 화면에 실제 조회 결과와 비동기 요청을 연결하는 지점을 설명한다.'
tags: [frontend, binding, state, forms]
status: draft
generated:
  by: codex/gpt-6
  at: '2026-10-30T08:08:16.838Z'
working_tree_sources:
  - src/app/mypage/rewards/page.tsx
  - src/app/mypage/rewards/_components/RewardsContent.tsx
  - src/app/mypage/rewards/rewards-data.ts
  - src/stories/features/mypage/MyPage.Rewards.Web.stories.tsx
  - src/app/screen-index/screenConnections.ts
  - src/data/screenRegistry.ts
  - src/stories/features/login/LoginPage.scenarios.tsx
  - src/stories/features/cart/CartPage.scenarios.tsx
  - src/app/screen-index/_components/IaStructurePage.tsx
  - src/app/screen-index/screenConnections.ts
  - src/app/login/preview-error/page.tsx
  - src/app/login/_components/LoginContent.tsx
  - src/app/cart/preview-empty/page.tsx
  - src/app/cart/_components/CartDialogs.tsx
  - src/app/cart/_components/CartProductSection.tsx
  - src/app/cart/cart-preview.ts
  - tests/order-policy.test.mjs
  - tests/inquiry-binding.test.mjs
  - src/components/orders/order-policy.ts
  - src/stories/features/binding/RemainingBinding.stories.tsx
  - src/components/common/molecules/BindingFeedback.tsx
  - src/hooks/useBindingQuery.ts
  - src/types/binding.ts
  - src/context/HomeContentContext.ts
  - src/context/RunClubDataContext.ts
  - src/context/SupportContentContext.ts
  - src/context/InquiryDataContext.ts
  - src/context/AccountFlowContext.tsx
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

## 장바구니·로그인 퍼블리싱 인계 전환 (2026-10-30)

사용자 승인으로 장바구니와 로그인은 연결 가능한 서비스 흐름 시연 대신 단순한 마크업 확인 화면으로 바뀌었다. 이 절은 아래 과거 기록 중 두 라우트의 연결·계산·인증·저장 동작 설명을 대체한다. 다른 서비스 화면의 계약은 유지한다.

- 장바구니: `cart-preview.ts`의 상품, 표시 금액, 품절 여부와 고정 합계만 사용한다. UI 조작은 로컬 상태이며 요청·삭제·저장·결제 URL 생성이 없다.
- 로그인: `LoginContent.showErrors`가 고정 오류 표시를 선택한다. 인증/형식 검사/아이디 저장/소셜 인증/성공 이동/pending/retry는 미연결이다.
- 개발팀 연결 소유자가 실제 데이터·요청·성공/실패·상태 갱신을 구현해야 한다. 소스의 `[ 개발팀 바인딩 ]` 주석은 이 미연결 경계를 설명하며 API 존재를 뜻하지 않는다.


현재 서비스 API는 연결하지 않는다. 아래 계약은 기존 화면을 유지하며 개발팀이 조회 결과와 요청 함수를 연결할 수 있게 만든 경계다. Provider가 없으면 기존 퍼블리싱 데모가 동작한다. 라우트의 default export에 임의 props를 추가하거나 Storybook 전용 RoutePreview를 운영 데이터 주입에 사용하지 않는다.

## 연결 위치

| 영역 | 연결 지점 | 데이터·이벤트 소유권 |
| --- | --- | --- |
| 공통 셸·상품·장바구니 | `ShopShell.state`, `ShopStateProvider` | 실제 상품 목록, 장바구니, 로그인 상태와 개수, 상품 추가·변경·삭제·로그인 함수 |
| 상품 목록·검색 | `ProductListingPage.data`, `ProductListingContext` | 조회된 상품, 전체 건수, 다음 페이지 여부, 조회 상태, 조건 변경·추가 조회·재시도 |
| 결제 | `CheckoutContext` | 쿠폰과 최대 혜택 선택, 할인·배송비 견적, 저장 배송지, 주문 제출 |
| 휴대폰 인증 | `PhoneVerificationContext` | 인증 발송 결과의 요청 ID·유효시간, 인증번호 검증 |
| 회원·마이페이지 | `MyPageDataContext` | 회원정보, 배송지, 리뷰, 관심/최근/재입고, 쿠폰, 요약/등급/추천/활동, 결제수단 등록 |
| 주문·취소·반품 | `OrdersContext` | 현재 주문 목록, 조회 조건 변경, 서버 반품 견적·신청·구매 확정·내역 삭제 |
| 가입·계정 복구 | `AccountServicesContext`, `AccountFlowProvider` | 인증 참조, 신규/기존 분기, 약관 버전별 동의, 가입/중복 확인, 계정 조회/비밀번호 변경/잠금해제 |
| 고객센터 콘텐츠 | `SupportContentContext` | 서버 FAQ 검색/페이지, 안정적인 공지 ID/본문, BO 약관 버전/본문 |
| 1:1 문의 | `InquiryDataContext` | 문의/주문 목록, 분류/고객 정보, 실제 ID 선택 복원, 파일 포함 등록 |
| 런클럽 | `RunClubDataContext` | 세션/신청내역 목록, 상세 사실 정보/안내, 신청 요청 |
| 홈 | `HomeContentContext` | 탭별 베스트 상품과 기존 콘텐츠 조합 슬롯 |

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

휴대폰 발송 성공 후 타이머를 시작하고 서버의 `requestId`를 보관한다. 인증 확인은 이 ID·코드·입력 정보를 전달하며 서버 검증 성공 이후에만 다음 단계로 진행한다. 정보가 바뀐 뒤 도착한 이전 요청 결과는 다음 단계를 진행시키지 않는다. 회원가입의 신규/기존회원 분기·약관 동의·아이디 중복확인·최종 가입, 계정 찾기·비밀번호 재설정·잠금해제, 프로필의 전화번호 인증·저장·비밀번호 변경·탈퇴에도 같은 성공/실패 계약을 적용한다.

## 리뷰 표시 데이터

리뷰 항목은 문자열 또는 숫자 ID, 구매일, 상품명·이미지·옵션과 리뷰 내용을 받는다. 제목과 목록은 해당 상품 정보를 표시하며 시안용 고정 상품명·구매일을 UI 내부에서 생성하지 않는다. 기존 데모는 `reviewFixtures.ts`에서 생성한다. 리뷰 API가 페이지 단위 데이터를 제공한다면 현재 계약에는 조회한 목록을 누적해 전달해야 한다. 이 화면의 더보기는 전달된 목록의 표시 개수를 늘리는 동작이다.

검증 결과는 [개발 검증 기록](../development/verification.md#화면-바인딩-계약-보완-2026-10-29)에 기록한다.

## 정책과 스킬

[AGENTS.md](../../AGENTS.md#ui-data-and-service-binding-policy)에 화면/서비스 경계와 검증 기준을 명시한다. [component-reusability 스킬](https://github.com/nalpari/hoka-fo-pub/blob/27b7e2f5b2c5e21681af53df27a535f3f13aa170/.codex/skills/component-reusability/SKILL.md#ui-data-and-service-binding)은 해당 작업을 [참조 워크플로](https://github.com/nalpari/hoka-fo-pub/blob/27b7e2f5b2c5e21681af53df27a535f3f13aa170/.codex/skills/component-reusability/references/data-binding.md)로 안내한다. 기존 페이지 소유권·폼 가이드에서도 이 계약을 연결하며, 데이터 주입을 이유로 단일 부모 화면을 별도 파일로 분리하지 않는다.

## 나머지 화면의 연결과 상세 주석 (2026-10-29)

모든 계약은 화면 모델을 받는 경계다. API DTO를 그대로 전역 저장소에 복사하거나 임의 URL을 만드는 구현은 포함하지 않는다. 각 영역의 Client 어댑터가 조회 상태·함수를 Provider에 넣고 성공 후 실제 목록을 갱신한다. Provider 자체를 생략하면 데모이므로 운영에서는 빈 결과라도 `items: []`/`item: null`과 상태를 명시한다.

- 가입: 인증 서비스는 `VerifiedIdentity`의 서버 proof/개인정보/accountStatus를 반환한다. 신규 회원은 약관→입력, 기존 회원은 기존가입 안내로 분기한다. `signupTerms`는 BO id/version/required/label/body/이전 버전을 받는다. 현재 약관 동의와 인증 proof를 가입 입력·마케팅 선택과 함께 register로 전달한다. 약관 ID/버전/순서 변경 시 이전 인덱스 동의를 새 약관에 적용하지 않는다.
- 계정 복구: 발송 응답의 요청 ID·만료시간을 사용하며 verify의 마스킹 ID와 resetProof를 메모리에 보관한다. 재설정은 proof를 제출한 서버 요청 성공 뒤 완료한다. 직접 URL 진입이나 화면 검증 통과는 인증 성공이 아니다.
- 프로필: item의 늦은 응답을 기다려 초안을 구성하고 읽기 화면은 최신 응답을 직접 표시한다. 편집 시작/취소는 최신 원본을 사용하되 활성 초안을 재조회 effect로 덮지 않는다. 전화번호 인증 proof와 변경값을 save에 함께 보낸다. 저장·탈퇴·비밀번호 변경 오류는 열린 모달 안에서도 확인할 수 있다.
- 문의: 목록 본문/답변/첨부는 실제 응답이다. 주문 ID/주문상품 ID를 저장하고 resolveSelection으로 복원한다. 실패/중단/Strict Mode 재실행에 저장 선택을 잃지 않게 성공 적용 후 소비한다. submit은 File[]와 분류·상세분류·제목·내용·선택 ID를 받는다.
- 목록: FAQ·공지·문의·상품내역·쿠폰·런클럽은 실제 결과와 전체 건수/hasMore를 별도로 받는다. 서버 결과를 예시 개수로 다시 자르거나 필터링하지 않는다. 더보기 카운터는 pageInfo가 있으면 실제 페이지 번호를, 없으면 읽은 항목 수/전체 건수를 표시해 페이지 크기를 추정하지 않는다. FAQ 펼침은 제목 대신 실제 ID를 사용한다.
- 런클럽: 운영 세션과 신청내역은 별도 모델이다. 신청내역은 신청 ID/신청 상태를 표시하며 상세 정원/예약금/신청기간은 facts로 받는다. apply는 신청·결제 결과가 확정된 후 resolve한다.
- 결제수단: 등록 버튼/안내 모달에서 외부 결제사 register를 실행한다. 등록 완료와 사용자 취소를 구분하고 마스킹된 결과만 목록에 전달한다. 원문 카드 입력 폼은 추가하지 않는다.

## 반품·환불의 논리 경계

사용자 제공 설계 이미지는 동작만 참고했으며 스타일을 복제하지 않았다. 반품은 상품/수량·사유·선택 상세내용을 제출한다. 신규 선택 사유는 단순변심·상품불량/파손·오배송·구성품 누락·기타이고 기존 size 코드는 과거 내역 표시 호환을 위해 남겼다. 취소는 배송 반품비가 없고, 반품의 고객 귀책 예시 비용은 5,000원, 회사 귀책·무료반품 대상/쿠폰 적용은 0원이다. 기타의 비용을 임의로 확정하지 않는다.

운영 반품은 `OrdersContext.quoteClaim`을 연결해야 제출할 수 있다. 입력은 주문 ID/선택 key별 수량/사유/무료반품 쿠폰 ID이며 응답은 견적 id/상품금액/반품비/환불예정액/무료반품 적용 여부다. 현재 선택에 해당하는 견적만 사용하고 수량/사유 변경 시 이전 견적을 무효화한다. 표시 환불액은 상품금액에서 반품비를 차감하며 숫자 예시의 산술 불일치를 복제하지 않는다. submitClaim은 견적 ID와 같은 선택을 받는다. 견적 금액/가능 수량/적용 정책의 최종 재검증과 회수 뒤 원 결제수단 환불은 서버 책임이다.

환불계좌 UI·타입·등록 동작과 무통장 입금 결제수단은 추가하지 않았다. 기존 refund-account 경로와 매장 지도는 이번 작업에서 수정하지 않았다.

## 전체 소스의 주석 탐색

`rg -n "\[\s*개발팀 바인딩\s*\]" src`로 표준 표기와 기존 공백 없는 표기의 인계 지점을 함께 찾는다. 라우트는 적용할 Context/데이터 소유자를, Context/타입은 입력·출력·성공·실패·재조회 책임을, 공통 필드/카드는 부모 제어값·이벤트·실제 식별자 매핑을 설명한다. 홈/헤더/GNB/푸터/검색 추천/국가/고정 안내/상품 상세/리뷰 예시 등 데이터 소유 파일에도 현재 fixture와 운영 교체 위치를 적었다. Storybook 전용 Provider와 실제 서비스 Provider를 구분했다.

기존 구조에 없는 API를 주석만으로 연결 완료라고 설명하지 않는다. 소셜 가입·아이핀·주소 검색 제공자·상세 찜/문의/리뷰/추천·컬렉션·실시간 검색 추천·미완성 안내 본문 등은 현재 구현 상태와 확장할 소유자를 명시했다. 공통 컨트롤은 데이터 조회를 직접 하지 않으며 부모가 API 어댑터를 붙인다. 이 주석 추가가 미연동 기능의 실제 구현을 뜻하지 않는다. 매장 지도 소스는 주석 추가에서도 제외했다.

실제 테스트 예제는 `src/stories/features/binding/RemainingBinding.stories.tsx`에 있다. 실패를 resolve하지 않고 reject하며, 삭제/등록 등 성공 후 새 목록으로 갱신하는 계약을 참고한다.

작성: codex/gpt-6, 2026-10-29T01:12:53Z. 이번 작업 트리의 출처는 working_tree_sources에 추가했으며 기존 고정 커밋 출처/검증 이력을 보존했다.

## 개발팀 바인딩 주석 정책 (2026-10-29)

신규 작성하거나 변경하는 바인딩 인계 주석의 표준 표기는 대괄호 안쪽 공백을 포함한 `[ 개발팀 바인딩 ]`이다. AGENTS.md의 UI data and service binding policy와 component-reusability의 바인딩 모드에 같은 규칙을 추가했다. [상세 규칙과 예시](https://github.com/nalpari/hoka-fo-pub/blob/27b7e2f5b2c5e21681af53df27a535f3f13aa170/.codex/skills/component-reusability/references/data-binding.md#developer-binding-comments)는 주석 위치, 연결 소유자·데이터/식별자·payload·요청 시점·성공/실패·상태 갱신 책임과 미연동 경계 설명을 정의한다.

실제 계약 소유자 가까이에 필요한 설명을 작성하며 모든 JSX에 같은 주석을 반복하지 않는다. exported React 컴포넌트의 한글/영문 요약 JSDoc은 유지한다. 기존 `[개발팀 바인딩]` 표기는 관련 주석을 수정하는 범위에서 표준화하며, 이번 정책 변경만으로 앱 소스 전체를 다시 쓰거나 제외된 매장 지도 등을 수정하지 않는다. 이번 변경은 정책·스킬·문서만 대상으로 하며 기존 기능 검증 기록과 구분한다.

작성: codex/gpt-6, 2026-10-29. 출처: AGENTS.md, .codex/skills/component-reusability/SKILL.md, .codex/skills/component-reusability/references/data-binding.md의 이번 작업 트리 변경.

이번 정책 검증: 스킬 frontmatter의 기존 name/description 유지·이름/설명 제한·미완성 placeholder 부재·표준 표기 일치·추가 로컬 링크·diff 공백과 index 보존을 확인했고 `npm run okf:check`를 통과했다. 기본 Python에 PyYAML이 없어 quick_validate.py는 실행되지 않았으며 현재 단순 scalar frontmatter에 대한 별도 검사를 사용했다. 애플리케이션 소스는 변경하지 않아 빌드를 반복하지 않았다.


## 쿠폰·신청 취소·인증 본문 연결 (2026-10-29)

CheckoutContext의 상품별 쿠폰 그룹·선택·비동기 적용과 주문 payload, RunClubDataContext.cancelEntry, PhoneVerificationService.terms, OverviewView.tierProgress를 추가했다. 연결 소유자는 서버 처리와 목록/견적 갱신 뒤 resolve하며 reject 시 초안을 유지한다. 소스에 [ 개발팀 바인딩 ] 인계 주석을 기록한다. [구현 범위·출처·검증](design-implementation-2026-10-29.md).

## 고정 상태 preview의 연결 경계 (2026-10-30)

상태 preview는 실제 서비스 요청·인증·시간 경과·저장 결과 없이 표시하며 원본 기본 화면의 기존 domain context 계약과 구분한다. 고정 오류를 정상 입력으로 자동 해제하지 않고 완료 상태로 이동시키지 않는다. 로컬 입력·도움말·모달 닫기를 유지한다. [전체 URL과 상태별 소유자](publishing-state-previews-2026-10-30.md)를 참고한다.

## 회원등급 시안의 진행금액 표시 (2026-10-30)

`/mypage/rewards`는 `MyPageDataContext.overview.item`의 현재 이름·등급·이니셜·구매금액을 사용한다. `tierProgress`의 기존 percent/label에 optional currentAmount/targetAmount 표시 문자열을 추가했고 기존 소비자 호환은 유지한다. 미공급 금액과 진행률을 추정하지 않는다. 어댑터가 준비한 label을 툴팁과 접근성 이름에 사용한다. Provider 없는 PC/MO 값은 별도 fixture이며 실제 조회 구현이 아니다. pending/error/onRetry는 기존 BindingFeedback으로 표시하며 API 연결·응답 취소·갱신은 외부 소유다.
