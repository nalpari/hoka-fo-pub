---
type: Report
title: '전체 페이지 오류·성공 색상과 필드 검증 점검'
description: '63개 라우트의 검사 범위, 수정 사항과 실제 검증 한계를 기록한다.'
tags: [audit, forms, validation, storybook]
status: draft
generated:
  by: codex/gpt-6
  at: '2026-10-20T00:41:19Z'
source_revision: 91725786fd78138c44e6e5c099261ae84c7a613e
working_tree_sources:
  - src/stories/features/forms/form-state-audit/account.scenarios.tsx
  - src/stories/features/forms/form-state-audit/controls.scenarios.tsx
  - src/stories/features/forms/form-state-audit/enterAddress.ts
  - src/stories/features/forms/form-state-audit/MO.Expired.stories.tsx
  - src/stories/features/forms/form-state-audit/MO.Inheritance.stories.tsx
  - src/stories/features/forms/form-state-audit/MO.Validation.stories.tsx
  - src/stories/features/forms/form-state-audit/mypage.scenarios.tsx
  - src/stories/features/forms/form-state-audit/PC.Expired.stories.tsx
  - src/stories/features/forms/form-state-audit/PC.Inheritance.stories.tsx
  - src/stories/features/forms/form-state-audit/PC.Validation.stories.tsx
  - src/stories/features/forms/form-state-audit/product.scenarios.tsx
  - src/stories/features/forms/form-state-audit/shared.tsx
  - src/stories/features/forms/form-state-audit/support.scenarios.tsx
  - .storybook/preview.ts
  - src/components/login/LoginPage.tsx
  - src/app/login/page.tsx
  - src/stories/features/login/LoginPage.stories.tsx
  - tests/form-controls.test.mjs
  - src/components/common/atoms/Select/Select.tsx
  - src/components/common/atoms/Dropdown/Dropdown.tsx
  - src/components/phone-verification/PhoneVerificationPage.tsx
  - src/components/signup-registration/RegistrationPage.tsx
  - src/app/checkout/page.tsx
  - src/app/support/size-guide/page.tsx
  - src/components/size-guide/SizeGuidePage.tsx
sources:
  - id: route-tree
    resource: https://github.com/nalpari/hoka-fo-pub/tree/91725786fd78138c44e6e5c099261ae84c7a613e/src/app
    title: '검사 시작 시점 App Router 라우트'
---

# 전체 페이지 오류·성공 색상과 필드 검증 점검

## 고객센터 화면 범위 보정 (2026-10-20)

팀/단체복 운영 경로를 제거하고 화면은 Mockup으로 옮겼다. 신규 /support/size-guide는 고객센터 공통 제목·탐색만 준비하며 본문에 입력·폼·완료 안내를 추가하지 않았다. 아래 표는 이 화면 교체를 반영하며, 과거 전체 점검 결과는 당시 범위의 기록이다.

## 범위와 판정 방식

### 로그인 디자인 후속 확인 (2026-10-19)

아래 전수 점검은 기존 필수값 검증과 오류 전달을 확인한 기록이며, 첨부 디자인의 이메일·비밀번호 형식 안내 문구 누락까지 확인한 것은 아니었다. 후속 수정에서 두 필드에 형식 검증과 FormField.error를 연결하고 Error·MobileError 예시를 교체했다. 로그인만 포함한 별도 production Storybook 빌드와 범위 타입 검사·ESLint가 통과했다. 전체 작업 트리 검사는 다른 화면의 JSX 문법 오류로 제한되며 세부 사항은 [UI 문서](../architecture/ui.md#로그인-형식-오류-안내-보완-2026-10-19)를 참고한다. 아래 49개 성공 기록은 이전 점검 시점의 결과다.

2026-10-19 Codex가 63개 page.tsx의 로컬 import·re-export 경로를 TypeScript AST로 추적했다. 공통 ShopShell은 페이지별 기능에서 제외하고 헤더 검색·푸터 이메일 입력을 별도 공통 범위로 검사했다. MyPageStatusPage와 RunningExperiencePage처럼 kind로 분기하는 컴포넌트는 실제 라우트 인자를 읽어 분류했다. 모든 본문에 폼이 있는 것은 아니므로 ‘해당 없음’은 미검사가 아니라 소스 조사 결과다.

모든 라우트에 production 서버 HTTP 요청을 PC·모바일 User-Agent로 각각 실행해 **126/126 정상 응답 및 플랫폼 클래스**를 확인했다. 동적 경로는 shoe-1, 컬렉션 8386, guides/road-running, yeouido-night, 공지 1을 대표 값으로 사용했다. 이 결과는 브라우저 hydration·모든 동적 ID·모든 페이지 상호작용 검증을 뜻하지 않는다.

## 발견 및 수정

| 문제                                                               | 수정                                                                              |
| ------------------------------------------------------------------ | --------------------------------------------------------------------------------- |
| 네이티브 Select가 FormField 상태·설명을 읽지 않음                  | TextInput과 같은 부모 오류·필수·비활성·설명 계약 연결                             |
| Dropdown은 자체 error만 시각화                                     | 선택적 invalid 추가 및 부모 오류 시 빨간 테두리, 포커스·팝업 상태에서도 오류 유지 |
| Checkbox·Radio·별점·범위·수량·사이즈는 상태만 상속                 | 오류 컨트롤의 빨간 표시 및 오류 설명 연결                                         |
| 휴대폰 인증 만료가 info 색상이고 인증번호 필드와 오류가 분리됨     | 만료는 error, 코드 길이 오류는 해당 FormField.error, 입력·재요청 시 오류 초기화   |
| 계정 찾기 인증번호 길이 오류의 필드 상태 누락                      | 인증번호 필드 오류·설명 연결                                                      |
| 회원가입 주소·기본 정보 일부 검증이 문구에만 존재                  | 기존 필수값·형식 규칙을 각 필드와 연결; 주소 입력 모달의 빈 값 확인 차단          |
| 회원가입 약관 안내 미표시 및 일부 동의 시 모든 오류가 해제됨       | 오류 안내 출력, 미동의 필수 항목의 오류 유지                                      |
| 배송지·프로필·주문에서 native validation 또는 조용한 return만 사용 | 기존 required·email 규칙을 커스텀 안내·필드 상태와 연결                           |
| 리뷰 별점·본문, 상품 사이즈의 오류 상태 누락                       | FormField 및 aria-describedby와 연결                                              |
| 쿠폰 오류 설명 연결·푸터 이메일 오류 표시 누락                     | 쿠폰 FormField.error 및 이메일 입력의 오류 안내·테두리 적용                       |

error는 기존 #A60000, 일반 success는 기존 #16794b를 유지한다. 인증·이메일 중복확인의 데모 안내는 실제 성공으로 바꾸지 않고 info로 유지한다. 전용 가입·주문·쿠폰 완료 화면의 디자인은 유지한다. 정상 입력을 녹색 성공으로 간주하거나 새 서버 검증 규칙을 만들지 않는다.

## 페이지별 검사 목록

마지막 열의 이름은 Development/FormStateAudit의 PC/MO → Validation/Expired/Inheritance 그룹 또는 기존 스토리의 재현 시나리오다. 브라우저 실행 결과는 아래 검증 기록과 함께 해석한다.

| 라우트                                      | 본문 분류                         | 서버 응답          | 재현 시나리오 / 소스 판정        |
| ------------------------------------------- | --------------------------------- | ------------------ | -------------------------------- |
| `/cart`                                     | 본문에 필수값 검증·상태 안내 없음 | PC·모바일 200      | 소스 점검; 공통 FooterEmail 별도 |
| `/checkout`                                 | 배송 필수값·주문완료              | PC·모바일 200      | 기존 CompleteOrder               |
| `/collection/[id]`                          | 본문에 필수값 검증·상태 안내 없음 | PC·모바일 200      | 소스 점검; 공통 FooterEmail 별도 |
| `/explore/[...slug]`                        | 본문에 필수값 검증·상태 안내 없음 | PC·모바일 200      | 소스 점검; 공통 FooterEmail 별도 |
| `/explore`                                  | 본문에 필수값 검증·상태 안내 없음 | PC·모바일 200      | 소스 점검; 공통 FooterEmail 별도 |
| `/explore/shoe-finder`                      | 본문에 필수값 검증·상태 안내 없음 | PC·모바일 200      | 소스 점검; 공통 FooterEmail 별도 |
| `/launch-calendar`                          | 본문에 필수값 검증·상태 안내 없음 | PC·모바일 200      | 소스 점검; 공통 FooterEmail 별도 |
| `/locales`                                  | 본문에 필수값 검증·상태 안내 없음 | PC·모바일 200      | 소스 점검; 공통 FooterEmail 별도 |
| `/login/account-locked/complete`            | 전용 완료·회원 안내 / 필드 없음   | PC·모바일 200      | 소스 점검; 공통 FooterEmail 별도 |
| `/login/account-locked`                     | 본문에 필수값 검증·상태 안내 없음 | PC·모바일 200      | 소스 점검; 공통 FooterEmail 별도 |
| `/login/account-locked/verification`        | 본인인증·인증번호                 | PC·모바일 200      | PhoneUnlock                      |
| `/login/find-account/id-confirmation-modal` | 전용 완료·회원 안내 / 필드 없음   | PC·모바일 200      | 소스 점검; 공통 FooterEmail 별도 |
| `/login/find-account`                       | 이름·휴대폰·인증번호              | PC·모바일 200      | FindAccount                      |
| `/login/find-account/password-reset`        | 비밀번호 강도·일치·완료           | PC·모바일 200      | 기존 PasswordReset               |
| `/login`                                    | 로그인 필수값·안내                | PC·모바일 200      | 기존 LoginFlow / Error           |
| `/mypage/addresses`                         | 배송지·주소 입력 모달             | PC·모바일 200      | Addresses                        |
| `/mypage/coupons`                           | 쿠폰 검증·등록 완료 모달          | PC·모바일 200      | Coupon                           |
| `/mypage/event-entries`                     | 본문에 필수값 검증·상태 안내 없음 | PC·모바일 200      | 소스 점검; 공통 FooterEmail 별도 |
| `/mypage/member-activity`                   | 본문에 필수값 검증·상태 안내 없음 | PC·모바일 200      | 소스 점검; 공통 FooterEmail 별도 |
| `/mypage/orders`                            | 본문에 필수값 검증·상태 안내 없음 | PC·모바일 200      | 소스 점검; 공통 FooterEmail 별도 |
| `/mypage`                                   | 본문에 필수값 검증·상태 안내 없음 | PC·모바일 200      | 소스 점검; 공통 FooterEmail 별도 |
| `/mypage/payment-methods`                   | 본문에 필수값 검증·상태 안내 없음 | PC·모바일 200      | 소스 점검; 공통 FooterEmail 별도 |
| `/mypage/profile`                           | 회원정보 수정                     | PC·모바일 200      | Profile                          |
| `/mypage/recent`                            | 본문에 필수값 검증·상태 안내 없음 | PC·모바일 200      | 소스 점검; 공통 FooterEmail 별도 |
| `/mypage/referral`                          | 본문에 필수값 검증·상태 안내 없음 | PC·모바일 200      | 소스 점검; 공통 FooterEmail 별도 |
| `/mypage/refund-account`                    | 본문에 필수값 검증·상태 안내 없음 | PC·모바일 200      | 소스 점검; 공통 FooterEmail 별도 |
| `/mypage/restock-alerts`                    | 본문에 필수값 검증·상태 안내 없음 | PC·모바일 200      | 소스 점검; 공통 FooterEmail 별도 |
| `/mypage/returns`                           | 본문에 필수값 검증·상태 안내 없음 | PC·모바일 200      | 소스 점검; 공통 FooterEmail 별도 |
| `/mypage/reviews`                           | 별점·본문·리뷰 저장               | PC·모바일 200      | Reviews                          |
| `/mypage/rewards`                           | 본문에 필수값 검증·상태 안내 없음 | PC·모바일 200      | 소스 점검; 공통 FooterEmail 별도 |
| `/mypage/running-profile`                   | 본문에 필수값 검증·상태 안내 없음 | PC·모바일 200      | 소스 점검; 공통 FooterEmail 별도 |
| `/mypage/wishlist`                          | 본문에 필수값 검증·상태 안내 없음 | PC·모바일 200      | 소스 점검; 공통 FooterEmail 별도 |
| `/`                                         | 본문에 필수값 검증·상태 안내 없음 | PC·모바일 200      | 소스 점검; 공통 FooterEmail 별도 |
| `/products/[id]`                            | 사이즈 선택·담기                  | PC·모바일 200      | Product                          |
| `/products`                                 | 검색·필터 / 필수값 검증 없음      | PC·모바일 200      | 소스 점검; 공통 FooterEmail 별도 |
| `/running/alerts`                           | 본문에 필수값 검증·상태 안내 없음 | PC·모바일 200      | 소스 점검; 공통 FooterEmail 별도 |
| `/running/plans`                            | 본문에 필수값 검증·상태 안내 없음 | PC·모바일 200      | 소스 점검; 공통 FooterEmail 별도 |
| `/running/reviews`                          | 본문에 필수값 검증·상태 안내 없음 | PC·모바일 200      | 소스 점검; 공통 FooterEmail 별도 |
| `/running/rewards`                          | 본문에 필수값 검증·상태 안내 없음 | PC·모바일 200      | 소스 점검; 공통 FooterEmail 별도 |
| `/running/rotation`                         | 본문에 필수값 검증·상태 안내 없음 | PC·모바일 200      | 소스 점검; 공통 FooterEmail 별도 |
| `/running/run-club/[sessionId]`             | 본문에 필수값 검증·상태 안내 없음 | PC·모바일 200      | 소스 점검; 공통 FooterEmail 별도 |
| `/running/run-club`                         | 본문에 필수값 검증·상태 안내 없음 | PC·모바일 200      | 소스 점검; 공통 FooterEmail 별도 |
| `/running/shoe-finder`                      | 본문에 필수값 검증·상태 안내 없음 | PC·모바일 200      | 소스 점검; 공통 FooterEmail 별도 |
| `/search`                                   | 검색·필터 / 필수값 검증 없음      | PC·모바일 200      | 소스 점검; 공통 FooterEmail 별도 |
| `/signup/complete`                          | 전용 완료·회원 안내 / 필드 없음   | PC·모바일 200      | 소스 점검; 공통 FooterEmail 별도 |
| `/signup/information`                       | 회원 정보·주소·부가정보           | PC·모바일 200      | Registration                     |
| `/signup`                                   | 가입 방식·기본 정보               | PC·모바일 200      | SignupDetails                    |
| `/signup/terms`                             | 필수 약관                         | PC·모바일 200      | SignupTerms                      |
| `/signup/verify`                            | 본문에 필수값 검증·상태 안내 없음 | PC·모바일 200      | 소스 점검; 공통 FooterEmail 별도 |
| `/signup/verify/phone`                      | 본인인증·인증번호                 | PC·모바일 200      | Phone                            |
| `/store/experience`                         | 본문에 필수값 검증·상태 안내 없음 | PC·모바일 200      | 소스 점검; 공통 FooterEmail 별도 |
| `/support/after-sales`                      | 본문에 필수값 검증·상태 안내 없음 | PC·모바일 200      | 소스 점검; 공통 FooterEmail 별도 |
| `/support/faq`                              | 본문에 필수값 검증·상태 안내 없음 | PC·모바일 200      | 소스 점검; 공통 FooterEmail 별도 |
| `/support/inquiries/new`                    | 제목·본문 필수값                  | PC·모바일 200      | Inquiry                          |
| `/support/inquiries`                        | 검색·필터 / 필수값 검증 없음      | PC·모바일 200      | 소스 점검; 공통 FooterEmail 별도 |
| `/support/member-benefits`                  | 본문에 필수값 검증·상태 안내 없음 | PC·모바일 200      | 소스 점검; 공통 FooterEmail 별도 |
| `/support/mileage`                          | 본문에 필수값 검증·상태 안내 없음 | PC·모바일 200      | 소스 점검; 공통 FooterEmail 별도 |
| `/support/notices/[id]`                     | 본문에 필수값 검증·상태 안내 없음 | PC·모바일 200      | 소스 점검; 공통 FooterEmail 별도 |
| `/support/notices`                          | 본문에 필수값 검증·상태 안내 없음 | PC·모바일 200      | 소스 점검; 공통 FooterEmail 별도 |
| `/support`                                  | 본문에 필수값 검증·상태 안내 없음 | PC·모바일 200      | 소스 점검; 공통 FooterEmail 별도 |
| `/support/store`                            | 검색·필터 / 필수값 검증 없음      | PC·모바일 200      | 소스 점검; 공통 FooterEmail 별도 |
| `/support/size-guide`                       | 디자인 대기, 본문·입력 없음       | 공통 프레임만 준비 | 실제 서비스 연동 없음            |
| `/support/terms`                            | 검색·필터 / 필수값 검증 없음      | PC·모바일 200      | 소스 점검; 공통 FooterEmail 별도 |

## 검증 기록과 한계

- 실컴포넌트를 서버 렌더링하는 form-controls 검사 31개: 부모 오류·설명 상속, 정상 상태, error/success/info 접근성 계약 확인. CSS 파일은 서버 검사에서 제외하며 계산된 색상은 스토리로 검증한다.
- 전체 Node 테스트 **47개 통과**(위 서버 렌더링 31개 포함). 최종 Next.js production build·Storybook production build·타입 검사 통과.
- 정적 Storybook을 Chromium으로 실행해 **49개 통과, 실패 0개**: 신규 전수 점검 PC·모바일 30개, 기존 로그인 7개·비밀번호 재설정 6개·주문/결제 6개. form-audit 태그 외 기존 스토리 115개는 의도적으로 제외했다. 전체 Storybook의 모든 스토리가 통과했다는 의미는 아니다.
- PC·모바일 시나리오는 필수값 오류→수정→성공/완료, 오류 유지·해제, 포털 모달 닫힘을 검사한다. 완료 모달은 애니메이션 종료를 기다린다.
- 변경 소스·테스트 ESLint 통과. 기본 ESLint 실행은 저장소의 기존 .tmp-storybook-ia-routes 등 임시 빌드 산출물을 검사해 대량 실패한다. 산출물을 지우거나 설정을 바꾸지 않았으며, `npm run lint -- --ignore-pattern '.tmp-*/**'`로 기존 임시 산출물만 제외한 전체 검사는 통과했다.
- Storybook의 기존 a11y todo 경고는 별도 기록하며, 이번 검증이 전체 접근성 인증을 의미하지 않는다. 실제 인증·외부 발송·결제는 데모 범위이므로 검증하지 않는다.

[컴포넌트 계약](../architecture/ui.md), [로그인 상태](../architecture/state.md), [검증 절차](verification.md)를 참고한다.

후속 로그인 브라우저 검사 9개가 모두 통과했다. PC·모바일의 필드별 오류 문구·계산 색상·설명 연결·입력 수정과 데모 성공 흐름을 확인하고, 375×812 캡처에서 두 빨간 문구와 테두리를 확인했다.

## Storybook 분류 정리 (2026-10-19)

단일 감사 스토리를 PC/MO → Validation(오류·복구)·Expired(인증 만료)·Inheritance(오류 상속)로 분리했다. 기존 표의 시나리오 이름은 유지하며 모바일은 Mobile 접두사 대신 MO 경로에서 찾는다. 플랫폼별 15개, 총 30개로 검사 범위는 유지한다. 원본 render/play 15개 선언은 변경 없이 계정·마이페이지·상품·고객문의·컨트롤 모듈로 이동했다. 기존 태그는 유지하고 플랫폼·상태 선택 태그를 추가했다.

분리 이후 타입·변경 파일 ESLint/Prettier·정적 Storybook 빌드와 정적 서버(127.0.0.1:6007)의 Edge headless play 30개가 통과했다. 이 기록은 이번 FormStateAudit 30개의 재검증이며 앞선 49개 전체 조합을 다시 실행했다는 뜻은 아니다. 자세한 분류와 태그는 [변경 검증](verification.md#formstateaudit-분류별-선택-2026-10-19)을 참고한다.
