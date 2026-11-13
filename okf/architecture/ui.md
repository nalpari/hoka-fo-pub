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

## 배송지 목록과 입력 팝업의 국소 디자인 옵션 (2026-11-13)

공통 ModalDialog에 `address` 변형을 두어 주문서 배송지 팝업의 폭·패딩·footer 버튼 수치를 한 곳에서 관리한다. CheckoutShipping은 제목과 내용만 소유하고, 기존 popupClassName/headerProps/contentClassName/footerProps 중복 스타일은 전달하지 않는다. 목록은 기존 AddressList의 embedded 옵션만 변경하며 기본 마이페이지 목록의 2개 예시·간격·동작을 보존한다. 별도 단일 부모 wrapper를 추가하지 않는다.

embedded 목록은 검은 2px 상단 선·상단 24px·행 간격 24px·하단 24px과 22px/900 제목을 표시한다. 연락처·주소는 16px/24px, 기본배송지 배지는 14px/21px이다. 추가는 팝업 footer가 소유하며 더보기는 고정 카운터를 표시한다. 준비된 목록은 주문서 전용 checkout-address-preview.ts이며 실데이터의 개수·ID로 예시 여부를 추론하지 않는다.

검증: 세 URL의 PC 이미지·위치/크기, 375px 모바일 이미지·본문 스크롤, 추가·수정의 배송지명 입력과 63px 필드, 취소→목록→추가와 Escape 후 배송지변경 포커스 복귀를 확인했다. 실제 제목 글리프의 로드된 폰트는 Pretendard Black이었다. PC 입력 팝업은 640×836px, 액션 180×48px이다. 안정화된 자동 플랫폼에서 1024px은 fullscreen, 1025·1199px은 640px 팝업과 1200px PC canvas, 1200px은 문서 가로 넘침 없음, 375px은 375px 팝업을 확인했다. 명시적 preview 플랫폼·전체 공용 모달 회귀는 이번 범위에서 검증하지 않았다.

변경 소스 lint/Prettier, Panda와 소스 그래프 생성 및 Next route type 생성으로 확인한다. 전체 타입 검사는 기존 LaunchCalendarDetail.tsx의 Button.icon 오류로 실패했다. 초기 타입 검사에 남아 있던 삭제 route 캐시는 typegen 후 사라졌다. 전체 Next 빌드는 이번 국소 스타일 변경에서 재실행하지 않았다. 출처: [HOKA 화면 디자인](https://www.figma.com/design/qyXJp4bnoeYSQxQULV8Wql/-HOKA-Design), 관련 작업 트리와 localhost 브라우저, Codex, 2026-11-13.
