---
type: Reference
title: '승인된 45개 굵기 모드 적용'
description: '여섯 디자인 영역의 승인된 굵기 차이와 보류 항목의 보존 범위를 기록한다.'
tags: [typography, figma, panda-css]
status: draft
updated: '2026-11-19T06:46:43.327Z'
generated:
  by: Codex
  at: '2026-11-19T06:46:43.327Z'
source_revision: 6b89b11477d2183728b3526f5c1bd718e132a3e3
working_tree_sources:
  - src/app/cart/_components/CartContent.tsx
  - src/app/cart/_components/CartDialogs.tsx
  - src/app/cart/_components/CartEmptyContent.tsx
  - src/app/cart/_components/CartProductSection.tsx
  - src/app/checkout/_components/CheckoutAgreement.tsx
  - src/app/checkout/_components/CheckoutDiscountSummary.tsx
  - src/app/checkout/_components/CheckoutPayment.tsx
  - src/app/login/_components/LoginContent.tsx
  - src/app/mypage/_components/MyPageContent.tsx
  - src/app/mypage/_components/MyPageProductHistory.tsx
  - src/app/mypage/coupons/_components/CouponManagement.tsx
  - src/app/mypage/event-entries/_components/RunningSessionEntriesContent.tsx
  - src/app/mypage/orders/_components/OrderDetails.tsx
  - src/app/mypage/profile/_components/ProfileContent.tsx
  - src/app/screen-index/sourceGraph.generated.json
  - src/app/signup/complete/page.tsx
  - src/app/signup/terms/_components/SignupTermsContent.tsx
  - src/app/support/_components/SupportContacts.tsx
  - src/app/support/_components/SupportQuickLinks.tsx
  - src/app/support/care/_components/CareContent.tsx
  - src/app/support/faq/_components/FaqContent.tsx
  - src/app/support/inquiries/_components/InquiryListContent.tsx
  - src/app/support/inquiries/new/_components/InquiryFormContent.tsx
  - src/app/support/inquiries/new/order-products/_components/InquiryOrderLookup.tsx
  - src/app/support/notices/_components/NoticesList.tsx
  - src/app/support/size-guide/_components/SizeGuidePanel.tsx
  - src/app/support/support.navigation.ts
  - src/app/support/terms/page.tsx
  - src/components/common/layouts/SidebarNavigationLayout.tsx
  - src/components/common/molecules/AmountRow.tsx
  - src/components/common/molecules/Breadcrumb.tsx
  - src/components/common/molecules/OrderProductSummary.tsx
  - src/components/common/molecules/ProductCard/ProductCard.tsx
  - src/components/common/molecules/SupportTabs.tsx
  - src/components/common/organisms/OrderRecommendations.tsx
  - src/components/common/organisms/SystemStatusPage.tsx
  - src/components/membership/MembershipRewards.tsx
  - src/context/ShopShell.tsx
sources:
  - id: figma-screens
    resource: https://www.figma.com/design/qyXJp4bnoeYSQxQULV8Wql/-HOKA-Design
    title: '로그인·가입·장바구니·주문·마이페이지·고객센터·에러 시안'
---

# 승인된 굵기 모드 적용

2026-11-19 사용자가 검수표의 수정 필요 45개 묶음만 적용하도록 승인했다. 추가 확인 83개는 수정하지 않으며 EmptyState heading의 PC900/MO700 및 Button.loadMore 문구·숫자400을 유지한다. 디자인 숫자400과 Medium/Bold가 함께 관측된 경우 각각 기존 Typography medium500/bold700을 사용한다. 관련 없는 Body 모드는 Heading의 굵기를 바꾸는 근거로 사용하지 않는다.

전역 Typography·폰트 토큰과 폰트 등록은 유지하고 각 표시 소유자에서 굵기를 선택했다. 같은 문구의 버튼·배지·설명·경로를 별개 표시로 구분한다. 예를 들어 결제수단 이름만 Medium으로 바꾸고 같은 이름을 포함한 안내 본문은 유지하며, 주문 상세의 모바일 상태500과 PC 상태600을 구분한다. 장바구니의 발볼 표시만 모바일500으로 변경하고 이어지는 색상·사이즈는 유지한다.

| 화면 / 부위 | 기존 → 모드 적용 굵기 | 주요 소유자 | 확인가능화면링크 |
| --- | --- | --- | --- |
| 4. 공통 푸터 · 개인정보처리방침 | PC 700→500 | [ShopShell.tsx](../../src/context/ShopShell.tsx) | [푸터](http://localhost:3000/) |
| 26. 주문 상세 · 모바일 상태 문구 | MO 600→500 | [OrderDetails.tsx](../../src/app/mypage/orders/_components/OrderDetails.tsx) | [주문 상세](http://localhost:3000/mypage/orders/preview-detail) · [반품 상세](http://localhost:3000/mypage/orders/preview-return-detail) |
| 27. 주문 상세 · 구매취소 / 반품요청 등 본문 | PC 400→500, MO 400→500 | [OrderDetails.tsx](../../src/app/mypage/orders/_components/OrderDetails.tsx) | [주문 상세](http://localhost:3000/mypage/orders/preview-detail) · [취소 상세](http://localhost:3000/mypage/orders/preview-cancel-detail) · [반품 상세](http://localhost:3000/mypage/orders/preview-return-detail) |
| 43. 세탁 및 손질 · 선택 탭 / 비선택 탭 | 사용자 고정: PC/MO 선택700 · 미선택400 | [SupportTabs.tsx](../../src/components/common/molecules/SupportTabs.tsx) | [세탁 및 손질](http://localhost:3000/support/care) |
| 44. 사이즈 가이드 · 종목 / 성별 / 단위 / 표 라벨 | PC 700→500, PC 400→500, PC 600→500, MO 400→500 | [SizeGuidePanel.tsx](../../src/app/support/size-guide/_components/SizeGuidePanel.tsx) | [사이즈 가이드](http://localhost:3000/support/size-guide) |
| 45. 약관 · 이용 약관 / 개인정보 처리방침 탭 | 사용자 고정: PC/MO 선택700 · 미선택400 | [SupportTabs.tsx](../../src/components/common/molecules/SupportTabs.tsx) | [이용약관](http://localhost:3000/support/terms) · [개인정보 처리방침](http://localhost:3000/support/terms?tab=privacy) |

## 공통 표시 옵션과 기본값

- ProductCard.textWeights는 identity/promotion/cart에 Medium을 선택하는 선택적 표시 옵션이다. 생략·undefined·빈 객체는 기존 표시를 유지한다. 내부 root recipe는 기존 listing 기본값과 identityMedium/promotionMedium/cartMedium=false를 명시한다. 장바구니·주문완료 추천의 identity, 관심상품의 identity/promotion/cart에서만 연결하고 다른 카드 호출부의 기본값은 유지한다.
- AmountRow.labelWeight는 label의 굵기만 바꾼다. 생략·undefined이면 기존 emphasizeLabel의 semibold 또는 일반 본문을 유지한다. 주문 금액 라벨은 PC Bold, 총 결제 금액 라벨은 PC/MO Medium이며 금액 숫자는 이 옵션으로 바꾸지 않는다.
- SupportTabs는 사용자 확정(2026-11-20)에 따라 페이지·PC/MO·variant 무관하게 선택700/미선택400으로 고정한다. labelWeights 예외는 제거했으며 과거 모드 기반 탭 굵기는 더 이상 적용하지 않는다.
- 고객센터 SideNavigation 항목의 labelWeight로 보류한 FAQs·1:1 문의를 Regular로 유지한다. 기본 사이드 메뉴 링크는 기존 Regular이며 PC 그룹 이름만 Medium이다. Home 경로만 Medium으로 지정하고 나머지 경로 텍스트는 유지한다. 마이페이지 홈은 내 쿠폰과 승인된 모바일 메뉴만 Medium이다.

이 옵션은 표시 굵기만 선택한다. 준비된 표시 데이터·식별자·요청·저장·콜백·URL·상태 수명·키보드/포커스 소유권과 기존 개발팀 바인딩 주석은 유지한다.

## 실제 검증

2026-11-19 Codex 검증: PC1440/MO375의 관련 55개 경로를 110회 측정했다. 승인된 45개 묶음의 252개 비교 지점이 목표 굵기와 일치한다. 보류83개 기록의 실제85개 텍스트 지점은 전후 굵기가 같으며 EmptyState·더보기19개 지점도 기존 값을 유지한다. 초기 로딩·폰트 로딩·플랫폼 전환 및 필요한 모달 표시 후 측정했다. FAQ PC/MO 화면 캡처를 확인하고 실제 글리프가 Pretendard Medium500/Bold700을 사용하는 것을 확인했다. 헤더 영문500은 로드된 HOKA Medium face와 CSS의 TheFutureHOKA_Medium 자산 연결을 확인했다(브라우저 내부 이름은 점으로 반환됨). 모든 글리프 face를 전수 확인한 것은 아니다.

Panda 생성, 변경 소스 ESLint/Prettier, 전체 TypeScript, Next production build의164개 정적 페이지 생성을 확인했다. 전체 lint는 변경하지 않은 tests/wh-file-summary.test.mjs의 URL/Request/Response 전역 no-undef8건으로 실패했다. 해당 테스트 파일은 이번 변경에 포함하지 않는다. 공통 인계·React 점검에서 구조·동작 변경 없이 표시 소유자와 기본값을 유지함을 확인했다.

추가 확인83개는 수정값을 확정하지 않았다. EmptyState·Button.loadMore의 확정 규칙, 계정·주문·쿠폰 등 보류한 제목과 날짜, 미확인 모드는 후속 검토 대상으로 유지한다.
