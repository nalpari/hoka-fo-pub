---
type: Reference
title: 첨부 디자인과 퍼블리싱 소스 대조
description: 회원가입·로그인·고객센터·마이페이지·장바구니·주문의 디자인 수급과 미적용 UI를 기록한다.
tags: [ia, design, publishing, audit]
status: draft
generated:
  by: codex/gpt-6
  at: '2026-10-29T05:37:21Z'
source_revision: 0a464eea1af3b186e16eb37cd2d0773af75501bb
working_tree_sources:
  - src/app/screen-index/storybookLinks.ts
  - src/app/screen-index/_components/IaStructurePage.tsx
  - tests/screen-progress.test.mjs
sources:
  - id: publishing-source
    resource: https://github.com/nalpari/hoka-fo-pub/tree/0a464eea1af3b186e16eb37cd2d0773af75501bb/src
    title: 비교 기준 퍼블리싱 소스
---

# 첨부 디자인과 퍼블리싱 소스 대조

사용자가 제공한 원본 PNG를 영역별로 확대해 소스와 대조했다. 아래 번호는 화면 코드와 별개인 내부 IA 번호다. 확인된 프레임은 디자인 수급으로 갱신하고, 차이가 구체적으로 확인된 플랫폼만 퍼블리싱 `수정`으로 갱신했다. 나머지 기존 상태의 유지는 이번에 새로 완료 검수했다는 뜻이 아니다. 누락된 퍼블리싱을 직접 수정한 작업은 아니며, 결과를 IA 비고와 검색에 연결했다.

## 근거와 판정 범위

원본 위치는 사용자 첨부 임시 폴더 `C:/Users/stead/AppData/Local/Temp/`다. 파일의 이름과 해시로 이번 비교 기준을 식별한다. 임시 파일의 장기 보존을 보장하지 않는다.

| 영역 | 파일명 | 원본 크기 | SHA256 |
| --- | --- | --- | --- |
| 회원가입 | codex-clipboard-3f952a9f-096f-49d5-8a4c-9e75f926edc7.png | 32768×2356 | 7C6C76F22A5B743565FDE880D30E0618EB609AC8C3D237EEA1B5FD240811A992 |
| 로그인 | codex-clipboard-564fa272-0e62-4e68-bad8-69817368eb5d.png | 32768×1716 | 5EF86E5AB86F0AC4A312410EF4415CA75DDF48A084532E8C42FD7D8D31F31FD6 |
| 고객센터 | codex-clipboard-82ad6392-4e3a-4aae-b6bd-fdfe348a07ff.png | 32768×5756 | 8C44358BED1FC3A15295A2A3F65937F0B50D861211595D71EFC601EFA2C55D65 |
| 마이페이지 | codex-clipboard-eb463322-eaa0-4ab6-a71b-57a68a88e946.png | 32768×1675 | AC2A9CBC51D0EB0FE24AF23BCCE669B128D994FCF505AE49EDB6FCA95FA10A36 |
| 장바구니 | codex-clipboard-14c544c1-083f-4afe-b2b5-a021131a4da0.png | 16460×15286 | 68D8D4546F72E38FAC098D094ABC5C5F11BBA46404FD71515630239FC4D57742 |
| 주문 | codex-clipboard-2afe205a-d0d5-4d9a-afff-86394a7fb3d2.png | 32768×10150 | 원본 파일명으로 식별 |

PC/MO 최종 화면이 보이면 수급, 확인 범위에서 못 찾으면 미수급이다. 주문 PC 171–176은 사용자의 영역 단위 지시에 따라 `수정예정`으로 기록했다. PC 주문 시안과의 차이는 현시안 기준이며 최종 확정 후 재검토해야 한다. 장바구니 PC 디자인 수정예정과 사용자 확인 MO 퍼블리싱 완료는 유지했다.

이번 결과는 디자인 이미지와 실제 렌더링 소스의 구조·조건·콜백 대조다. 브라우저에서 일부 모달과 IA 표시를 DOM으로 확인했지만 창 최소화로 스크린샷을 확보하지 못했다. 폰트·픽셀 간격·모든 해상도의 시각 검수 완료를 의미하지 않는다. 서비스용 계약이 있는 경우 UI 미구현과 실제 API 미연동을 구분한다.

## 회원가입

| IA / 플랫폼 | 확인한 미적용 내용 | 소스 근거 |
| --- | --- | --- |
| 234 PC/MO · 수정 | 휴대폰 인증 약관 상세는 제목과 닫기만 있고 본문·확인 액션이 없음 | `src/components/phone-verification/PhoneVerificationContent.tsx`의 `PhoneVerificationDialogs` 일반 상세 분기 `{null}` |
| 235 PC/MO · 대기 | 아이핀 선택 버튼 이후 인증 화면·동작 없음. 첨부에는 아이핀 내부 시안도 없음 | `src/app/signup/verify/page.tsx`의 `selectMethod`에서 phone만 이동 |
| 236 MO · 수정 | 이전 약관 선택의 데모는 가운데 날짜만 누를 수 있고 휠 선택 없음. 실제 versions 전달 시에는 날짜 버튼들이 있으므로 전체 날짜 선택 불가로 일반화하지 않음 | `src/app/signup/terms/page.tsx`의 `PreviousTermsPicker`, `versions || index === 3` |
| 233 / 연동 대기 | 카카오·네이버 가입 버튼은 있으나 미연동 안내를 표시 | `src/app/signup/page.tsx` |
| 237 / 연동 대기 | 주소 찾기는 우편번호·주소 직접 입력 모달이며 실제 검색 미연동 | `src/components/common/organisms/Address/AddressFields.tsx` |

가입 혜택·인증 입력·재전송·타이머·유효성 오류·이미 가입된 회원 모달·필수/선택 약관·정보 입력·마케팅 동의·요약 모달·가입 완료 UI는 존재한다. 실제 SMS, 중복 확인, 주소 검색, OAuth 연결 완료로 간주하지 않는다. 사용자 확인 238 MO 수급, 235 양쪽 퍼블리싱 대기는 보존한다.

## 로그인

| IA / 플랫폼 | 확인한 미적용 내용 | 소스 근거 |
| --- | --- | --- |
| 223 PC/MO · 수정 | 가입에서 허용한 밑줄 아이디를 로그인 검증이 거절 | `src/app/login/page.tsx`의 영숫자 정규식과 가입 검증 비교 |
| 224·227·251 PC/MO · 수정 | 잠금 모달 자체는 있으나 로그인/계정 찾기 결과에서 계정 잠금으로 연결하는 분기 없음 | `src/app/login/find-account/page.tsx`, `src/context/AccountFlowContext.tsx`의 `RecoveryResult`, `src/app/login/account-locked/page.tsx` |
| 253 PC/MO · 수정 | 인증 약관 상세 본문·이전 약관 UI, 시간 만료 안내 모달 없음. 시간 초과는 인라인 오류로만 노출 | 공통 `PhoneVerificationContent.tsx`, `src/hooks/usePhoneVerification.ts` |
| 254 PC/MO · 수정 | ‘홈으로’가 `/`가 아닌 `/login`으로 이동 | `src/app/login/account-locked/complete/page.tsx` |
| 230·231 / 연동 대기 | 소셜 버튼은 있지만 OAuth 미연동 안내 | `src/app/login/page.tsx` |

아이디 기억·계정 찾기·인증 입력/타이머·아이디 결과·비밀번호 검증/재설정·변경완료 모달·잠금 해제 완료 본문은 존재한다. 첨부에서 251 잠금 안내와 252 비밀번호 변경완료의 MO 디자인도 확인해 수급으로 정정했다. 252의 기존 완료 상태는 유지하며 새 픽셀 검수 완료로 기록하지 않는다.

## 고객센터

| IA / 플랫폼 | 확인한 미적용 내용 | 소스 근거 |
| --- | --- | --- |
| 206 PC/MO · 수정 | 메인 본문의 1:1문의·FAQs 바로가기 카드 없음. 사이드바 링크는 별도로 존재 | `src/app/support/page.tsx`는 `SupportContacts`만 렌더 |
| 208 MO · 수정 | 공지 날짜가 제목 아래가 아닌 같은 가로 행 | `src/app/support/notices/page.tsx`의 `NoticeHeading` |
| 216 PC/MO · 수정 | 반품 유의사항 탭 하단 연락처와 문의·FAQ·주문배송조회 바로가기 3개 없음 | `src/app/support/after-sales/page.tsx`의 `ReturnCautionsPanel` |
| 212 / 연동 대기 | 지도는 샘플 이미지와 안내 오버레이, 길찾기는 지도 표시 전환 | `src/app/support/store/page.tsx` |
| 213 / 대기 유지 | 회원등급 본문은 디자인 작업 중 안내. 첨부에도 별도 본문 시안 없음 | `src/app/support/member-benefits/page.tsx` |
| 260 / 추가 확인 | 첨부에 진행중·이미지 추후 적용 표시. 확정 사이즈표와 자산 확인 필요 | 첨부 고객센터 사이즈 가이드 |

FAQ 검색·분류·펼침·더보기, 공지 상세, 문의 목록/빈 상태/답변/첨부 미리보기, 문의 작성·오류·취소·주문상품 조회 UI는 존재한다. 약관 시안의 회색 본문 자체가 placeholder이므로 회색이라는 이유만으로 미구현 판정하지 않았다. 209 PC 공지 상세, 210/187 MO 문의 목록, 219 PC 약관 탭을 추가 수급으로 확인했다.

## 마이페이지

| IA / 플랫폼 | 확인한 미적용 내용 | 소스 근거 |
| --- | --- | --- |
| 177 PC · 수정 | 홈 주문내역 표 대신 캐러셀. 빈 주문 전용 안내도 없음 | `src/app/mypage/page.tsx`의 `MyPageRecentOrders` |
| 182·183 PC · 수정 | 관심/최근 상품은 시안 3열, 구현은 PC/MO 공통 2열 | `src/components/mypage/MyPageProductHistory.tsx` |
| 184 PC · 수정 | 재입고 상품 열 헤더·신청일·상태 열 정렬 없음 | 같은 파일의 재입고 목록 |
| 191 PC · 수정 | 상품평 표 헤더와 상품정보·평가·리뷰·수정의 열 분리 없음 | `src/app/mypage/reviews/page.tsx`의 `MyPageReviewItem` |
| 195 PC · 수정 | 등급/누적금액 진행바와 가로 등급 안내 대신 세로 컬러 카드 | `src/app/mypage/rewards/page.tsx` |
| 196 PC · 수정 | 쿠폰 티켓형 2열 배치 대신 세로 목록 | `src/app/mypage/coupons/page.tsx`의 `CouponHistorySection` |
| 200 PC/MO · 수정 | 신청내역 전용 제목·상태 탭·최근순·행 목록·신청취소 모달 없음 | `src/app/mypage/event-entries/page.tsx`가 공용 `RunClubPage` 재사용 |
| 202 PC · 수정 | 회원정보 조회 좌측/수정 폼 우측 2열 없음 | `src/app/mypage/profile/page.tsx`의 `ProfileContent` |

첨부에서 관심/최근/재입고·쿠폰·러닝세션 신청내역·회원정보·배송지의 PC 시안도 확인했다. 182/183/184/196/200/201/202/203/204/205 PC 수급으로 정정했다. 리뷰 작성/수정 모달, 배송지 추가/수정/삭제 등 구현의 존재는 확인했지만 첨부에 없는 내부 모달 프레임의 수급을 부모 화면에서 추정하지 않았다.

## 장바구니

IA 170 PC 퍼블리싱은 `수정`, PC 디자인은 사용자 확인 `수정예정`, MO는 수급/완료를 유지한다.

| 현시안과 소스 차이 | 소스 근거 |
| --- | --- |
| PC 상품정보·수량·가격·액션 표 대신 모바일 카드가 동일하게 표시됨 | `src/app/cart/page.tsx:367`의 `CartItemRow` |
| PC 행별 수량 선택기와 주문 버튼 없음. 수량 변경은 옵션 모달 안에만 있음 | `CartItemRow`, `CartOptionQuantity` |
| 상품금액/배송비/총액의 테두리 요약 및 선택/전체 주문 버튼 없음 | 같은 파일 `CartProductSection`, `CartOrderActions` |
| PC 옵션 모달 이미지 좌측/선택 우측 배치 대신 세로 Stack | `CartOptionsContent`, `CartOptionsDialog`의 `size="sm"` |
| PC 고객센터 연락처·운영시간 2열 대신 세로 Stack | `CartSupportInfo` |

MO 카드·선택/품절 처리·고정 주문 액션·전체 화면 옵션·발볼/색상/사이즈/수량·수량 제한 안내는 구현돼 있다. 추천 상품 PC 카드 크기·탐색 화살표도 시안과 후속 시각 대조가 필요하지만 이번 IA 수정의 주된 근거는 위 명확한 구조 차이다.

## 주문

| IA / 플랫폼 | 확인한 미적용 내용 | 소스 근거 |
| --- | --- | --- |
| 171 PC · 수정 | 현시안의 주문상품 표·우측 결제 요약 대신 단일 세로 Stack. 디자인 자체는 수정예정 | `src/app/checkout/page.tsx`의 `CheckoutContent`, `CheckoutProductList` |
| 171·174 MO · 수정 | 보유쿠폰 모달의 상품별 펼침/라디오/사용불가 표시·장바구니 쿠폰·합계·적용 버튼 없음. 단일 쿠폰 드롭다운만 제공 | 같은 파일 `CheckoutDiscountSummary`, `checkout-coupons.ts`, `src/context/CheckoutContext.ts`의 단일 `coupon` 값 |
| 172 / 제출 연결 누락 | 기본배송지로 등록 체크박스는 있지만 이름/상태가 없고 제출 payload에도 값 없음 | `CheckoutShippingForm`, `CheckoutForm`의 submit |
| 173 / 연동 대기 | 공통 주소 직접 입력 모달, 실제 주소 검색 미연동 | 공통 `AddressFields` |
| 175 / 연동 대기 | 결제수단 선택·submit 계약은 있지만 실제 PG 창/승인 연결은 외부 소유 | `CheckoutContext`, `Page`의 미연동 데모 분기 |
| 178 PC · 수정 | 주문배송조회 표의 상품정보·수량·가격·상태 열 대신 MO형 행과 전체 폭 액션 사용 | `src/components/orders/OrdersRoute.tsx`의 `OrderCard`, `OrderHistoryProduct`, `OrderItemActions` |
| 178 / 연동 대기 | 배송조회 표·단계 UI는 있지만 운송장/기사/추적 이력은 고정 샘플 | 같은 파일 `OrderTrackingDialog`, `OrderTrackingHistory` |

배송지 저장/직접입력 표시, 배송 요청 직접입력과 250자 카운트, 결제수단 6종, 두 필수 동의, 주문완료 본문·주문내역 링크, MO 주문조회/빈 상태/상세/취소·반품 상세/신청 바텀시트/수량/사유/견적 UI는 존재한다. 취소·반품 견적과 요청은 `OrdersContext` 계약을 사용하며 실제 서버 연결 완료를 의미하지 않는다.

첨부에서 MO 배송지 직접입력(172)을 수급으로 추가했다. 주소 검색(173), PG(175), 주문 전용 약관 내부(176)는 별도 프레임을 못 찾아 MO 미수급이다. 약관 전문보기 링크는 공통 약관 페이지로 연결돼 있으므로 링크 자체를 누락으로 기록하지 않았다. 주문완료는 별도 IA를 임의 추가하지 않고 주문 171 검토 범위에 포함했다.

## 검증 기록

상태 모델 테스트 10개, 변경 TS/TSX·테스트 ESLint와 Prettier, 타입 검사, Panda 생성, `git diff --check`를 통과했다. 작업 트리 기준 OKF 매핑 누락은 없다. 플랫폼별 수정값, 사용자 확인 장바구니 MO 완료, 주문 PC 디자인 수정예정, MO 미수급 팝업, 기존 상태와 외부 override 우선순위를 확인했다. 브라우저 DOM에서 약관 상세의 빈 본문·홈으로 링크 목적지·이전 약관 데모 선택 제한·고객센터 본문·IA 비고 노출을 확인했다. 최종 검색/필터 재검사 시 localhost:3000 연결이 거절되어 후속 검사를 완료하지 못했다. 전체 영역의 완료 판정이나 픽셀/반응형 시각 검수는 수행하지 않았다.

관련: [최초 Figma 수급 조사](ia-design-audit.md), [IA 라우팅](routing.md), [IA UI](ui.md).
