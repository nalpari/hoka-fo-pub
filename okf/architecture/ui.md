---

type: Architecture
title: '컴포넌트와 스타일'
description: '공통 UI 계층, Panda CSS와 앱 화면 검증을 설명한다.'
tags: [components, panda-css]
status: draft

## 매장 찾기 모바일 전화 링크 (2026-11-13)

매장 목록의 번호는 모바일에서만 밑줄로 전화 연결 가능함을 표시하며, native `tel:` 링크로 기기의 전화 앱을 요청한다. `StoreResult.phoneHref`는 표시용 `phone`과 별도로 고정 fixture에 명시해 향후 매장 데이터 연결 시 두 값을 함께 제공해야 한다. PC는 기존 비링크 텍스트와 레이아웃을 유지했다. 출처: `src/app/support/store/_components/StoreContent.tsx`, `src/app/support/store/store.data.ts`, `src/types/component-contracts/app-support-store-page.d.ts` 작업 트리, Codex, 2026-11-13.

- src/components/common/organisms/Address/AddressList.tsx
- src/app/support/_components/SupportContacts.tsx
- src/app/support/notices/_components/NoticesList.tsx
- src/app/support/after-sales/page.tsx
- src/app/mypage/coupons/_components/CouponManagement.tsx
- src/app/mypage/reviews/_components/MyPageReviewsContent.tsx
- src/components/common/organisms/SystemStatusPage.tsx
- src/app/login/account-locked/_components/AccountLockedContent.tsx
- src/components/phone-verification/PhoneVerificationContent.tsx
- src/app/support/page.tsx
- src/app/support/_components/SupportQuickLinks.tsx
- src/app/support/notices/_components/NoticesContent.tsx
- src/app/support/after-sales/_components/AfterSalesContent.tsx
- src/app/mypage/addresses/_components/AddressManagement.tsx
- src/components/common/molecules/SupportTabs.tsx

## Figma 타이포그래피 토큰 동기화 (2026-11-13)

공통 `Typography`는 Figma 디자인 시스템의 Pretendard·The Future HOKA 쌍을 `korean`·`hoka` font family로 표현한다. 새 Wide/Compact Heading 6B(30px/20px), Body 보조 단계(18px·15px·13px)와 Body 6(10px), CTA 보조 단계(15px·12px), Caption 1·2(14px/170%, 13px/165%)를 영문·한글 variant로 제공한다. 새 10·15·30px Panda font-size 토큰을 추가했으며, Figma의 잘못된 영문 CTA 1-1 Pretendard 지정은 HOKA family로 유지한다.

Heading Compact H6·영문 H7과 Wide H9·H10의 weight를 최신 Figma 규격으로 맞췄다. Figma에 Compact 정의가 없는 기존 H8~H10 모바일 fallback과 Text Link 의미 variant는 기존 화면 호환성을 위해 보존한다. `/publishing-guide`는 실제 variant와 PC·모바일 계산 값을 표시하고 복사 코드를 제공한다. 경로, 서비스 요청과 데이터 계약은 변경하지 않는다.

Wide H10은 영문 Bold(700), 한글 Semibold(600)로 구분한다.

Primary·Secondary의 framed Button 라벨은 CTA 크기 체계를 유지하되 고객사 요청에 따라 언어와 크기에 관계없이 Bold(700)로 override한다. CTA 자체와 Link·Plain·Chip·Filter Trigger의 기존 weight 계약은 변경하지 않는다.

Body 직접 호출을 조사해 10회 이상 반복된 조합만 고정 weight variant로 승격했다. `body3Medium`(29회), `body3Semibold`(11회), `body4Medium`(30회), `body4Semibold`(11회)는 각각 한글 대응 variant도 제공하며, 기존 `web`·`mo` prop으로 PC/MO 조합을 명시할 수 있다. 그 외 조합은 기존 `weight` prop으로 유지해 variant 수를 불필요하게 늘리지 않는다.

검증: 로컬 `/publishing-guide?tab=button`에서 Primary·Secondary Tall/Short의 Black·White 기본 예시 라벨 계산 `font-weight`가 모두 700임을 확인했다.

검증: Panda 생성, 대상 ESLint와 OKF 검사는 통과했다. 로컬 `/publishing-guide`의 PC 렌더링에서 Heading 6B, Body 2-2, CTA 1-1 및 Caption과 각 표시 수치를 확인했다. 전체 ESLint는 기존 `tests/wh-file-summary.test.mjs`의 URL·Request·Response 전역 설정 오류로 실패했고, 전체 타입 검사는 기존 `LaunchCalendarDetail.tsx`의 `Button.icon` 타입 오류만 남았다.

출처: [HOKA 디자인 시스템](https://www.figma.com/design/0dCBZJvU7aacxImQTV843M/HOKA-design-system-v1.0), `panda.config.ts`, `src/components/common/atoms/Typography.tsx`, `src/components/screen-index/DesignGuideTypography.tsx`, `src/app/publishing-guide/_components/TypographyGuide.tsx` 작업 트리, Codex, 2026-11-13.

## 배송지 목록과 입력 팝업의 국소 디자인 옵션 (2026-11-13)

공통 ModalDialog에 `address` 변형을 두어 주문서 배송지 팝업의 폭·패딩·footer 버튼 수치를 한 곳에서 관리한다. CheckoutShipping은 제목과 내용만 소유하고, 기존 popupClassName/headerProps/contentClassName/footerProps 중복 스타일은 전달하지 않는다. 목록은 기존 AddressList의 embedded 옵션만 변경하며 기본 마이페이지 목록의 2개 예시·간격·동작을 보존한다. 별도 단일 부모 wrapper를 추가하지 않는다.

embedded 목록은 검은 2px 상단 선·상단 24px·행 간격 24px·하단 24px과 22px/900 제목을 표시한다. 연락처·주소는 16px/24px, 기본배송지 배지는 14px/21px이다. 추가는 팝업 footer가 소유하며 더보기는 고정 카운터를 표시한다. 준비된 목록은 주문서 전용 checkout-address-preview.ts이며 실데이터의 개수·ID로 예시 여부를 추론하지 않는다.

검증: 세 URL의 PC 이미지·위치/크기, 375px 모바일 이미지·본문 스크롤, 추가·수정의 배송지명 입력과 63px 필드, 취소→목록→추가와 Escape 후 배송지변경 포커스 복귀를 확인했다. 실제 제목 글리프의 로드된 폰트는 Pretendard Black이었다. PC 입력 팝업은 640×836px, 액션 180×48px이다. 안정화된 자동 플랫폼에서 1024px은 fullscreen, 1025·1199px은 640px 팝업과 1200px PC canvas, 1200px은 문서 가로 넘침 없음, 375px은 375px 팝업을 확인했다. 명시적 preview 플랫폼·전체 공용 모달 회귀는 이번 범위에서 검증하지 않았다.

변경 소스 lint/Prettier, Panda와 소스 그래프 생성 및 Next route type 생성으로 확인한다. 전체 타입 검사는 기존 LaunchCalendarDetail.tsx의 Button.icon 오류로 실패했다. 초기 타입 검사에 남아 있던 삭제 route 캐시는 typegen 후 사라졌다. 전체 Next 빌드는 이번 국소 스타일 변경에서 재실행하지 않았다. 출처: [HOKA 화면 디자인](https://www.figma.com/design/qyXJp4bnoeYSQxQULV8Wql/-HOKA-Design), 관련 작업 트리와 localhost 브라우저, Codex, 2026-11-13.

- src/components/common/organisms/Address/AddressList.tsx
- src/app/support/_components/SupportContacts.tsx
- src/app/support/notices/_components/NoticesList.tsx
- src/app/support/after-sales/page.tsx
- src/app/mypage/coupons/_components/CouponManagement.tsx
- src/app/mypage/reviews/_components/MyPageReviewsContent.tsx
- src/components/common/organisms/SystemStatusPage.tsx
- src/app/login/account-locked/_components/AccountLockedContent.tsx
- src/components/phone-verification/PhoneVerificationContent.tsx
- src/app/support/page.tsx
- src/app/support/_components/SupportQuickLinks.tsx
- src/app/support/notices/_components/NoticesContent.tsx
- src/app/support/after-sales/_components/AfterSalesContent.tsx
- src/app/mypage/addresses/_components/AddressManagement.tsx
- src/components/common/molecules/SupportTabs.tsx

## 마이페이지 간격 표기 (2026-11-13)

마이페이지 전용 공통 컴포넌트의 간격은 기본 글자 크기 16px 기준으로 환산한 픽셀값으로 표기한다.

마이페이지 주문 상품은 OrderProductSummary의 alignStart 옵션으로 이미지와 내용을 상단 정렬한다. 출처: 작업 트리, Codex, 2026-11-13.

공통 모달 헤더는 데스크탑 상단 40px·좌우 32px, 모바일 상단 24px·좌우 16px과 18px 닫기 아이콘을 사용한다. 팝업과 바텀시트는 각각 둥근 상단 모서리를 사용하고 모바일 전체 화면은 각진 형태다. 출처: ModalDialog.tsx 작업 트리와 디자인 시스템 시안, Codex, 2026-11-13.

모달 제목은 body 크기에 bold 굵기를 적용한다. 출처: ModalDialog.tsx 작업 트리, Codex, 2026-11-13.

모바일 중앙 팝업은 데스크탑과 동일하게 10px 모서리를 사용하며 전체 화면과 바텀시트는 기존 표현을 따른다. 출처: ModalDialog.tsx 작업 트리, Codex, 2026-11-13.

공통 모달 크기는 sm과 lg로 구성되며 기본값은 sm이다. 출처: ModalDialog.tsx 및 가이드 작업 트리, Codex, 2026-11-13.

마이페이지 모바일 브레드크럼의 아래 간격은 레이아웃 종류와 관계없이 8px이다. 출처: MyPageFrame.tsx 작업 트리, Codex, 2026-11-13.

공통 Breadcrumb은 여백, 모바일 가로 스크롤과 12px 레이블을 기본으로 적용한다.

주문·취소·반품 상세에서도 모바일 브레드크럼을 표시한다. 출처: Breadcrumb.tsx, MyPageFrame.tsx, OrdersContent.tsx 작업 트리.
