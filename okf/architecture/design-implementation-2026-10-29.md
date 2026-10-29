---
type: Reference
title: 첨부 디자인 소스 반영
description: 여섯 영역의 미적용 UI를 현재 시안에 맞춰 반영한 범위와 남은 서비스 연결을 기록한다.
tags: [design, publishing, responsive, binding]
status: draft
generated:
  by: codex/gpt-6
  at: '2026-10-29T06:16:26Z'
source_revision: ad537fd85387389e2dbf4922237d58e873373eea
working_tree_sources:
  - src/app/cart/page.tsx
  - src/app/checkout/page.tsx
  - src/app/login/page.tsx
  - src/app/login/find-account/page.tsx
  - src/app/login/account-locked/complete/page.tsx
  - src/app/signup/terms/page.tsx
  - src/components/phone-verification/PhoneVerificationContent.tsx
  - src/hooks/usePhoneVerification.ts
  - src/app/mypage/event-entries/page.tsx
  - src/components/mypage/MyPageFrame.tsx
  - src/components/mypage/MyPageProductHistory.tsx
  - src/components/orders/OrdersRoute.tsx
  - src/components/common/organisms/OrderRecommendations.tsx
  - src/context/CheckoutContext.ts
  - src/context/RunClubDataContext.ts
  - src/context/PhoneVerificationContext.ts
  - src/context/MyPageDataContext.ts
  - src/stories/features/binding/DesignBinding.stories.tsx
---

# 첨부 디자인 소스 반영

사용자가 지금까지 첨부한 회원가입·로그인·고객센터·마이페이지·장바구니·주문 시안을 실제 소스에 반영했다. [대조 보고서](design-source-comparison-2026-10-29.md)의 미적용 UI가 이번 구현 기준이다. 주문 PC는 최종 확정 전임을 알고 현시안으로 적용하라는 사용자 요청을 따랐다. 해당 PC 디자인의 IA `수정예정`은 유지한다.

## 브랜치와 보존

`pub-jme`(upstream `origin/pub-jme`)에는 당시 `origin/main`에 없는 커밋이 없었다. 작업 중이던 두 파일만 임시 보관하고 fetch → switch → rebase origin/main을 실행했다. 기준은 ad537fd8이며 main보다 21개 커밋 뒤였으므로 충돌 없이 이동했다. 두 파일은 다시 적용한 뒤 보관 항목을 제거했다. 이번 구현은 커밋·푸시하지 않았다.

## 반영한 UI

| 영역 | 구현 |
| --- | --- |
| 장바구니 | PC 상품정보·수량·가격·액션 열, 행별 수량과 주문/삭제, 선택/전체 주문, 금액 요약, 옵션 모달 이미지/선택 좌우 배치, 고객센터 2열. MO 카드와 고정 액션 유지 |
| 주문 | PC 주문상품 표와 우측 sticky 결제 요약/동의/결제. MO 상품 뒤 할인 요약과 결제수단 순서 유지. 상품별 쿠폰 펼침·라디오·사용불가·장바구니 쿠폰·적용 모달 추가 |
| 주문 내역 | PC 상품정보·수량·가격·상태 열. 기존 MO 내역/신청/추적 UI 유지 |
| 마이페이지 | 홈 PC 주문 표·빈 상태, 관심/최근 PC 3열, 재입고 날짜/상태 열, 상품평 PC 평가/본문 분리, 쿠폰 PC 2열 티켓, 등급 진행률/가로 혜택/육각형, 회원정보 수정 PC 좌우 배치 |
| 신청내역 | 일반 런클럽 그리드 대신 전용 제목·전체/신청완료/취소 탭·건수·최근순 표시·이미지 행·취소 확인 모달 |
| 고객센터 | 메인 문의/FAQ 바로가기 카드, MO 공지 날짜 아래 배치, 반품 주의사항 연락처와 바로가기 |
| 가입·로그인 | 인증 약관 본문/확인/이전 버전, MO 이전 약관의 모든 날짜 선택과 스크롤, 만료 모달, 로그인 밑줄 ID, 계정 잠금 분기, 홈으로 목적지 수정 |
| 공통 | portrait 추천상품 PC 4열 폭과 가로 탐색 버튼, 마이페이지 기본 프레임 1200px 중앙 정렬 |

## 데이터·서비스 계약

- 쿠폰: `CheckoutContext.couponGroups/cartCoupons/couponSelection/applyCoupons`를 추가했다. 상품 행 ID와 상품 쿠폰 ID, 장바구니 쿠폰 ID를 한 payload로 전달한다. 서버 견적과 선택 상태 갱신 후 resolve하며 reject하면 모달·초안·오류를 유지한다. pending 중 중복 적용/닫기를 막는다. 기존 단일 쿠폰 Provider는 호환한다. 실제 서버 금액을 클라이언트에서 다시 계산하지 않는다. 미연동 데모만 기존 할인 예시 함수를 사용한다.
- 주문: `CheckoutSubmission.couponSelection/saveAsDefaultAddress`에 전체 쿠폰 선택과 기본배송지 저장 의도를 포함한다. 주문 저장·PG 승인·재고·금액 확정은 기존 `submit` 소유자가 담당한다.
- 신청 취소: `RunClubDataContext.cancelEntry(entryId)`가 취소와 목록/건수 갱신 후 resolve한다. 실패하면 확인창을 유지한다. 연결 목록은 서버 필터 결과를 재필터하지 않는다. 취소 서비스가 없으면 실제 목록에서 취소 버튼을 비활성화한다. 미연동 예시만 로컬 상태를 바꾼다.
- 인증 약관: 인증 제공자의 안전한 ReactNode 본문과 이전 버전을 `PhoneVerificationService.terms`로 받는다. 미공급 상태는 미리보기 안내이며 실제 법적 약관을 생성하거나 서비스 연결로 간주하지 않는다.
- 계정 잠금: 로그인 어댑터는 `code: ACCOUNT_LOCKED` 오류, 복구 어댑터는 `accountLocked: true` 결과로 전달한다. 실제 잠금 판정을 화면에서 추정하지 않는다.
- 등급 진행률은 `OverviewView.tierProgress`의 서버 준비 값이다. 원본 금액만으로 등급 정책을 새로 만들지 않으며 미공급 시 진행률은 숨긴다. 주문 요약 수량도 optional 표시 데이터로 받아 미공급 시 `-`다.

실제 PG/OAuth/주소 검색/지도·배송 추적 연동, 아이핀 내부 화면, 확정되지 않은 사이즈표·이미지, 첨부에 없는 신규 화면은 구현된 서비스로 표시하지 않는다. 기존 SMS/주소/PG 호출 소유권을 유지한다.

## 검증

최종 `npm run build`는 컴파일·TypeScript·58개 정적 페이지 생성을 통과했다. Panda 생성, 변경 소스 ESLint/Prettier, diff 공백 검사와 작업 트리 기준 OKF 매핑 검사도 통과했다.

기본배송지 등록 체크 후 실제 DOM FormData의 `saveAsDefaultAddress`가 `on`임을 확인했다. 주문 제출에서 이를 boolean으로 변환한다. 기존 마이페이지 Storybook 분기도 새 신청내역 라우트 구현을 사용하도록 갱신했다.

19개 기존 계정 검증·장바구니 표시·주문 요약·IA 모델 테스트, 변경 소스 ESLint/Prettier와 타입 검사를 통과했다. 앱에서 1440px PC와 390px MO의 주문·고객센터·신청내역·쿠폰·등급·회원정보 6개 경로를 렌더하고 DOM 알럿과 문서 가로 넘침이 없음을 확인했다. 실제 스크린샷을 읽어 주문의 우측 요약과 표, 등급·쿠폰·신청내역 배치 및 MO 보존을 점검했다. 장바구니 PC/MO와 쿠폰 모달도 렌더했다.

새 `DesignBinding`의 PC/MO 쿠폰 적용·신청 취소 4개 play를 실제 브라우저에서 실행해 통과했다. 모든 assertion 뒤에 찍는 DOM 완료 표식을 확인했다. 외부 상품/행/쿠폰 ID, 늦게 도착한 응답, 사용불가, pending, 실패 후 선택 유지·재시도 및 전체 쿠폰 선택의 주문 제출을 검증했다. 전체 Figma 픽셀 일치나 실제 서비스 연결 검증을 의미하지 않는다.


추가로 장바구니·주문내역·관심/최근/재입고·상품평·공지·반품안내·인증·약관·로그인을 포함한 총 17개 경로를 PC/MO로 렌더했다. 장바구니와 열린 쿠폰 모달에서 1024px 모바일, 1025/1199px의 1200px PC 캔버스, 1200px 이상에서 가로 넘침 없음과 왕복 크기 전환 중 모달 1개·선택 항목 15개 유지를 확인했다. 인증 약관 상세의 본문·이전 약관·확인 액션도 DOM에서 확인했다.

IA의 실제 반영 항목은 퍼블리싱 완료와 시안 반영 비고로 갱신했다. 장바구니/주문 PC 디자인 수정예정·미수급 팝업·사용자 확인 아이핀 대기는 유지한다. 완료는 현재 첨부 시안의 UI 범위이며 PG·OAuth·주소·지도·배송 추적·인증 제공자의 실제 연결 완료를 뜻하지 않는다.


후속 사용자 요청으로 IA의 시안 반영·현시안 반영·연동 대기 설명은 화면과 검색에서 제거했다. 위 구현 기록과 실제 퍼블리싱 상태는 유지한다.
