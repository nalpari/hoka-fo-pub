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

## Figma 타이포그래피 토큰 동기화 (2026-11-13)

공통 `Typography`는 Figma 디자인 시스템의 Pretendard·The Future HOKA 쌍을 `korean`·`hoka` font family로 표현한다. 새 Wide/Compact Heading 6B(30px/20px), Body 보조 단계(18px·15px·13px)와 Body 6(10px), CTA 보조 단계(15px·12px), Caption 1·2(14px/170%, 13px/165%)를 영문·한글 variant로 제공한다. 새 10·15·30px Panda font-size 토큰을 추가했으며, Figma의 잘못된 영문 CTA 1-1 Pretendard 지정은 HOKA family로 유지한다.

Heading Compact H6·영문 H7과 Wide H9·H10의 weight를 최신 Figma 규격으로 맞췄다. Figma에 Compact 정의가 없는 기존 H8~H10 모바일 fallback과 Text Link 의미 variant는 기존 화면 호환성을 위해 보존한다. `/publishing-guide`는 실제 variant와 PC·모바일 계산 값을 표시하고 복사 코드를 제공한다. 경로, 서비스 요청과 데이터 계약은 변경하지 않는다.

Primary·Secondary의 framed Button 라벨은 CTA 크기 체계를 유지하되 고객사 요청에 따라 언어와 크기에 관계없이 Bold(700)로 override한다. CTA 자체와 Link·Plain·Chip·Filter Trigger의 기존 weight 계약은 변경하지 않는다.

검증: 로컬 `/publishing-guide?tab=button`에서 Primary·Secondary Tall/Short의 Black·White 기본 예시 라벨 계산 `font-weight`가 모두 700임을 확인했다.

검증: Panda 생성, 대상 ESLint와 OKF 검사는 통과했다. 로컬 `/publishing-guide`의 PC 렌더링에서 Heading 6B, Body 2-2, CTA 1-1 및 Caption과 각 표시 수치를 확인했다. 전체 ESLint는 기존 `tests/wh-file-summary.test.mjs`의 URL·Request·Response 전역 설정 오류로 실패했고, 전체 타입 검사는 기존 `LaunchCalendarDetail.tsx`의 `Button.icon` 타입 오류만 남았다.

출처: [HOKA 디자인 시스템](https://www.figma.com/design/0dCBZJvU7aacxImQTV843M/HOKA-design-system-v1.0), `panda.config.ts`, `src/components/common/atoms/Typography.tsx`, `src/components/screen-index/DesignGuideTypography.tsx`, `src/app/publishing-guide/_components/TypographyGuide.tsx` 작업 트리, Codex, 2026-11-13.

## 배송지 목록과 입력 팝업의 국소 디자인 옵션 (2026-11-13)

공통 ModalDialog에 `address` 변형을 두어 주문서 배송지 팝업의 폭·패딩·footer 버튼 수치를 한 곳에서 관리한다. CheckoutShipping은 제목과 내용만 소유하고, 기존 popupClassName/headerProps/contentClassName/footerProps 중복 스타일은 전달하지 않는다. 목록은 기존 AddressList의 embedded 옵션만 변경하며 기본 마이페이지 목록의 2개 예시·간격·동작을 보존한다. 별도 단일 부모 wrapper를 추가하지 않는다.

embedded 목록은 검은 2px 상단 선·상단 24px·행 간격 24px·하단 24px과 22px/900 제목을 표시한다. 연락처·주소는 16px/24px, 기본배송지 배지는 14px/21px이다. 추가는 팝업 footer가 소유하며 더보기는 고정 카운터를 표시한다. 준비된 목록은 주문서 전용 checkout-address-preview.ts이며 실데이터의 개수·ID로 예시 여부를 추론하지 않는다.

검증: 세 URL의 PC 이미지·위치/크기, 375px 모바일 이미지·본문 스크롤, 추가·수정의 배송지명 입력과 63px 필드, 취소→목록→추가와 Escape 후 배송지변경 포커스 복귀를 확인했다. 실제 제목 글리프의 로드된 폰트는 Pretendard Black이었다. PC 입력 팝업은 640×836px, 액션 180×48px이다. 안정화된 자동 플랫폼에서 1024px은 fullscreen, 1025·1199px은 640px 팝업과 1200px PC canvas, 1200px은 문서 가로 넘침 없음, 375px은 375px 팝업을 확인했다. 명시적 preview 플랫폼·전체 공용 모달 회귀는 이번 범위에서 검증하지 않았다.

변경 소스 lint/Prettier, Panda와 소스 그래프 생성 및 Next route type 생성으로 확인한다. 전체 타입 검사는 기존 LaunchCalendarDetail.tsx의 Button.icon 오류로 실패했다. 초기 타입 검사에 남아 있던 삭제 route 캐시는 typegen 후 사라졌다. 전체 Next 빌드는 이번 국소 스타일 변경에서 재실행하지 않았다. 출처: [HOKA 화면 디자인](https://www.figma.com/design/qyXJp4bnoeYSQxQULV8Wql/-HOKA-Design), 관련 작업 트리와 localhost 브라우저, Codex, 2026-11-13.
