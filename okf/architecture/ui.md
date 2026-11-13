---
type: Architecture
title: '컴포넌트와 스타일'
description: '공통 UI 계층, Panda CSS와 앱 화면 검증을 설명한다.'
tags: [components, panda-css]
status: draft

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
