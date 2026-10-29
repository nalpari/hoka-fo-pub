---
type: Architecture
title: '페이지 전용 컴포넌트의 라우트 내부 배치'
description: 'app 페이지의 보조 UI를 _components로 모으는 기준과 2026-10-29 적용 범위 및 검증을 기록한다.'
tags: [nextjs, components, ownership]
status: draft
generated:
  by: codex/gpt-6
  at: '2026-10-29T09:26:34Z'
source_revision: 0ab36b5dffd976d37bc2e5f2407e3045c9898748
working_tree_sources:
  - AGENTS.md
  - .codex/skills/component-reusability/SKILL.md
  - .codex/skills/component-reusability/references/page-ownership.md
  - .codex/skills/component-reusability/references/single-parent-consolidation.md
  - src/app/locales/page.tsx
  - src/app/locales/_components/LocalesContent.tsx
  - src/app/login/account-locked/page.tsx
  - src/app/login/account-locked/_components/AccountLockedContent.tsx
  - src/app/login/find-account/page.tsx
  - src/app/login/find-account/_components/FindAccountContent.tsx
  - src/app/login/find-account/password-reset/page.tsx
  - src/app/login/find-account/password-reset/_components/PasswordResetContent.tsx
  - src/app/login/page.tsx
  - src/app/login/_components/LoginContent.tsx
  - src/app/mypage/addresses/page.tsx
  - src/app/mypage/addresses/_components/AddressManagement.tsx
  - src/app/mypage/coupons/page.tsx
  - src/app/mypage/coupons/_components/CouponManagement.tsx
  - src/app/mypage/page.tsx
  - src/app/mypage/_components/MyPageContent.tsx
  - src/app/mypage/profile/page.tsx
  - src/app/mypage/profile/_components/ProfileContent.tsx
  - src/app/mypage/referral/page.tsx
  - src/app/mypage/referral/_components/ReferralContent.tsx
  - src/app/mypage/reviews/page.tsx
  - src/app/mypage/reviews/_components/MyPageReviewsContent.tsx
  - src/app/mypage/rewards/page.tsx
  - src/app/mypage/rewards/_components/RewardsContent.tsx
  - src/app/page.tsx
  - src/app/_components/HomeContent.tsx
  - src/app/products/[id]/page.tsx
  - src/app/products/[id]/_components/ProductDetailContent.tsx
  - src/app/running/run-club/[sessionId]/page.tsx
  - src/app/running/run-club/[sessionId]/_components/RunClubSessionContent.tsx
  - src/app/signup/information/page.tsx
  - src/app/signup/information/_components/RegistrationContent.tsx
  - src/app/signup/page.tsx
  - src/app/signup/_components/SignupContent.tsx
  - src/app/signup/terms/page.tsx
  - src/app/signup/terms/_components/SignupTermsContent.tsx
  - src/app/signup/verify/page.tsx
  - src/app/signup/verify/_components/IdentityVerificationContent.tsx
  - src/app/signup/verify/phone/page.tsx
  - src/app/signup/verify/phone/_components/PhoneVerificationContent.tsx
  - src/app/support/after-sales/page.tsx
  - src/app/support/after-sales/_components/AfterSalesContent.tsx
  - src/app/support/faq/page.tsx
  - src/app/support/faq/_components/FaqContent.tsx
  - src/app/support/inquiries/new/page.tsx
  - src/app/support/inquiries/new/_components/InquiryFormContent.tsx
  - src/app/support/inquiries/page.tsx
  - src/app/support/inquiries/_components/InquiryListContent.tsx
  - src/app/support/notices/page.tsx
  - src/app/support/notices/_components/NoticesList.tsx
  - src/app/support/page.tsx
  - src/app/support/_components/SupportContacts.tsx
  - src/app/support/store/page.tsx
  - src/app/support/store/_components/StoreContent.tsx
  - src/app/support/terms/page.tsx
  - src/app/support/terms/_components/TermsDocument.tsx
  - src/app/cart/_components/CartDialogs.tsx
  - src/app/cart/_components/CartEmptyState.tsx
  - src/app/cart/_components/CartOrderActions.tsx
  - src/app/cart/_components/CartProductSection.tsx
  - src/app/cart/_components/CartSupportInfo.tsx
  - src/app/checkout/_components/CheckoutAgreement.tsx
  - src/app/checkout/_components/CheckoutComplete.tsx
  - src/app/checkout/_components/CheckoutDiscountSummary.tsx
  - src/app/checkout/_components/CheckoutForm.tsx
  - src/app/checkout/_components/CheckoutLayout.tsx
  - src/app/checkout/_components/CheckoutPayment.tsx
  - src/app/checkout/_components/CheckoutShipping.tsx
  - src/app/checkout/_components/CheckoutSummary.tsx
  - src/app/cart/page.tsx
  - src/app/checkout/page.tsx
  - src/app/screen-index/sourceGraph.generated.json
---

# 페이지 전용 컴포넌트의 라우트 내부 배치

`src/app/{route}/page.tsx`는 라우트 컴포넌트와 Next.js가 요구하는 export를 소유하고, 페이지 전용 보조 UI는 같은 라우트의 `_components/`에 둔다. 보조 UI가 없거나 이미 적절히 나뉜 경로는 유지한다. 기존 순수 데이터·정책 모듈과 실제 공용 컴포넌트는 이동하지 않는다. AGENTS.md 및 component-reusability의 페이지 소유권·단일 부모 통합 지침을 이 기준에 맞췄다.

기존 책임 경계와 상태 수명을 유지한다. 관련된 작은 내부 컴포넌트는 한 모듈에 함께 두며, 파일을 줄이거나 페이지를 짧게 만들기 위한 새 화면 전달 래퍼를 추가하지 않는다. 기존 `RoutePreview` 등록표와 `RouteContent`는 같은 보조 모듈에 두고 페이지가 `useRoutePreview`를 호출하는 기존 계약을 유지한다. Storybook은 기존 페이지·preview adapter를 계속 사용한다.

## 적용 범위

57개 page.tsx 중 보조 함수가 함께 있던 28개에서 해당 선언을 옮겼다. cart와 checkout의 기존 형제 컴포넌트 13개도 각 `_components/`로 이동했다. 최종적으로 30개 라우트가 변경되며 41개의 보조 TSX 모듈을 소유한다. 공용 화면을 가져오는 products·run-club 목록, 기존 publishing-guide·screen-index·size-guide의 `_components`, 페이지 컴포넌트만 있는 단순 라우트는 유지한다. metadata, URL, 쿼리 상태, 폼·요청·선택 상태와 명시적 PC/MO preview는 바꾸지 않았다.

| 라우트 폴더                         | _components의 소유 모듈                                                                                                                      |
| ----------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| `locales`                           | `LocalesContent.tsx`                                                                                                                         |
| `login/account-locked`              | `AccountLockedContent.tsx`                                                                                                                   |
| `login/find-account`                | `FindAccountContent.tsx`                                                                                                                     |
| `login/find-account/password-reset` | `PasswordResetContent.tsx`                                                                                                                   |
| `login`                             | `LoginContent.tsx`                                                                                                                           |
| `mypage/addresses`                  | `AddressManagement.tsx`                                                                                                                      |
| `mypage/coupons`                    | `CouponManagement.tsx`                                                                                                                       |
| `mypage`                            | `MyPageContent.tsx`                                                                                                                          |
| `mypage/profile`                    | `ProfileContent.tsx`                                                                                                                         |
| `mypage/referral`                   | `ReferralContent.tsx`                                                                                                                        |
| `mypage/reviews`                    | `MyPageReviewsContent.tsx`                                                                                                                   |
| `mypage/rewards`                    | `RewardsContent.tsx`                                                                                                                         |
| `/`                                 | `HomeContent.tsx`                                                                                                                            |
| `products/[id]`                     | `ProductDetailContent.tsx`                                                                                                                   |
| `running/run-club/[sessionId]`      | `RunClubSessionContent.tsx`                                                                                                                  |
| `signup/information`                | `RegistrationContent.tsx`                                                                                                                    |
| `signup`                            | `SignupContent.tsx`                                                                                                                          |
| `signup/terms`                      | `SignupTermsContent.tsx`                                                                                                                     |
| `signup/verify`                     | `IdentityVerificationContent.tsx`                                                                                                            |
| `signup/verify/phone`               | `PhoneVerificationContent.tsx`                                                                                                               |
| `support/after-sales`               | `AfterSalesContent.tsx`                                                                                                                      |
| `support/faq`                       | `FaqContent.tsx`                                                                                                                             |
| `support/inquiries/new`             | `InquiryFormContent.tsx`                                                                                                                     |
| `support/inquiries`                 | `InquiryListContent.tsx`                                                                                                                     |
| `support/notices`                   | `NoticesList.tsx`                                                                                                                            |
| `support`                           | `SupportContacts.tsx`                                                                                                                        |
| `support/store`                     | `StoreContent.tsx`                                                                                                                           |
| `support/terms`                     | `TermsDocument.tsx`                                                                                                                          |
| `cart`                              | 기존 CartDialogs·CartEmptyState·CartOrderActions·CartProductSection·CartSupportInfo                                                          |
| `checkout`                          | 기존 CheckoutAgreement·CheckoutComplete·CheckoutDiscountSummary·CheckoutForm·CheckoutLayout·CheckoutPayment·CheckoutShipping·CheckoutSummary |

상품 상세의 `next/dynamic`은 옮긴 모듈에서 같은 `ProductDetailViewerContent`를 가리키도록 상대 경로만 수정했다. 해당 지연 로딩 경계를 합치거나 새로 만들지 않았다. IA 생성 그래프는 새 페이지 import와 모듈 경로를 추적한다.

## 검증

- 이동 전후 278개 함수 본문과 506개 보조 선언의 AST가 같고 28개 진입점에 기본 페이지 함수만 남는 것을 확인했다. export 추가, 포맷의 쉼표와 상품 상세 지연 import의 상대 경로만 비교에서 정규화했다. 전체 57개 page.tsx에도 추가 함수 선언이 없다.
- 변경한 src/app 파일의 ESLint와 포맷 검사, Panda 생성, 전체 TypeScript 검사, Next.js 및 Storybook 프로덕션 빌드를 통과했다. 오래된 Next dev 타입은 개발 서버를 실행해 재생성했으며 ESLint의 선언된 누락 의존성을 복구했다. package.json과 package-lock.json은 변경하지 않았다.
- 전체 테스트는 101개 중 99개 통과, 1개 실패, PowerShell 테스트 1개 건너뜀이다. 기존 tests/app-router.test.mjs의 expectedRoutes에 /publishing-guide가 없지만 해당 페이지는 이번 변경 전 HEAD에도 존재한다. 이 별도 라우트 목록 문제는 수정하지 않았다.
- PC/MO 기본 화면과 RoutePreview 사례 72개가 렌더를 완료했다. 이 중 수정하지 않은 사이즈 가이드 MO의 기존 play에서 여러 tabpanel을 하나로 찾는 assertion이 실패했으며, 나머지 71개는 예외 없이 완료했다. 리뷰·상품 색상 선택의 초기 로딩 시간 초과는 다시 열어 정상 완료와 색상 선택 play를 확인했다. 전체 픽셀 비교나 실제 서비스 연결을 검증했다는 뜻은 아니다.
- 연결된 결제 실패·재시도는 PC/MO 두 스토리에서 승인 후 완료 화면까지 확인했다. 정적 Storybook의 해당 통합 번들 로딩이 실패해 개발 Storybook에서 확인했으며 일반 화면 72개 점검과 구분한다.
- src/app 전체 린트에는 수정하지 않은 publishing-guide의 기존 import 정렬 오류 5개가 있다. 변경 파일의 범위 린트는 통과했으며 해당 별도 오류는 수정하지 않았다.
- 저장소 밖 검증 자료는 `/tmp/hoka-page-components-20261029/baseline.json`과 `verify.mjs`다. 예약 커밋은 같은 위치의 확정 manifest와 인계 기록으로 변경 범위를 다시 확인한다.
