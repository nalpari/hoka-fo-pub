---
type: Architecture
title: '공통 상태와 데모 데이터'
description: '로그인, 장바구니와 목 데이터의 수명 및 제약을 설명한다.'
tags: [react, state, mock-data]
status: draft
generated:
  by: codex/gpt-6
  at: '2026-10-19T05:07:21Z'
source_revision: b3f7243062b500eb4909961667ad142cc368ff91
working_tree_sources:
  - src/shared/components/layouts/OrderPageLayout/OrderPageLayout.tsx
  - src/shared/features/checkout/CheckoutLayout.tsx
  - src/shared/components/layouts/AccountPageLayout/AccountPageLayout.tsx
  - src/shared/lib/emailValidation.ts
  - src/shared/features/phone-verification/PhoneVerificationContent.tsx
  - src/shared/lib/passwordValidation.ts
  - src/shared/features/signup/SignupPage.tsx
  - src/shared/features/signup-registration/RegistrationPage.tsx
  - src/shared/features/find-account/passwordValidation.ts
  - src/shared/features/phone-verification/PhoneVerificationPage.tsx
  - src/shared/features/login/LoginPage.tsx
  - src/stories/features/login/LoginPage.stories.tsx
  - src/shared/features/cart/CartPage.tsx
  - src/shared/features/login/LoginContent.tsx
  - src/shared/features/login/LoginLayout.tsx
  - src/shared/features/login/LoginForm.tsx
  - src/shared/features/login/LoginActions.tsx
  - src/shared/features/login/LoginMembership.tsx
sources:
  - id: src-shared-shopshell-tsx
    resource: https://github.com/nalpari/hoka-fo-pub/blob/b3f7243062b500eb4909961667ad142cc368ff91/src/shared/ShopShell.tsx
    title: 'src/shared/ShopShell.tsx'
  - id: src-shared-context-platform-tsx
    resource: https://github.com/nalpari/hoka-fo-pub/blob/b3f7243062b500eb4909961667ad142cc368ff91/src/shared/context/platform.tsx
    title: 'src/shared/context/platform.tsx'
  - id: src-shared-features-login-loginpage-tsx
    resource: https://github.com/nalpari/hoka-fo-pub/blob/b3f7243062b500eb4909961667ad142cc368ff91/src/shared/features/login/LoginPage.tsx
    title: 'src/shared/features/login/LoginPage.tsx'
  - id: src-mocks-products-ts
    resource: https://github.com/nalpari/hoka-fo-pub/blob/b3f7243062b500eb4909961667ad142cc368ff91/src/mocks/products.ts
    title: 'src/mocks/products.ts'
  - id: src-app-cart-page-tsx
    resource: https://github.com/nalpari/hoka-fo-pub/blob/b3f7243062b500eb4909961667ad142cc368ff91/src/app/cart/page.tsx
    title: 'src/app/cart/page.tsx'
---

# 공통 상태와 데모 데이터

## ShopShell

`src/shared/ShopShell.tsx`는 공통 레이아웃과 `ShopContext`를 제공한다. 상품 상세·장바구니·로그인·마이페이지의 App Router 페이지는 `useShop()`으로 상태와 콜백을 가져온다. `useShop()`은 `ShopShell` 아래에서 사용한다. `/checkout` 페이지도 같은 방식으로 장바구니를 읽고, 주문을 완료하면 `remove`로 항목을 비운다.

| 상태           | 보관 위치                                            | 수명                                                       |
| -------------- | ---------------------------------------------------- | ---------------------------------------------------------- |
| 장바구니       | `ShopShell`의 React 상태                             | 클라이언트 페이지 이동 중 유지, 새로고침 시 초기화         |
| 로그인         | React 상태와 `hoka-is-logged-in` localStorage 플래그 | 로그인·로그아웃 이벤트로 갱신, 새로고침 시 저장소에서 복원 |
| 플랫폼         | 서버가 선택한 값을 `PlatformProvider`에 전달         | 공통 레이아웃의 플랫폼 선택을 공유                         |
| 관심·최근 개수 | `ShopShell`의 상수                                   | 현재 데모 값은 각각 3, 7                                   |

로그인 플래그는 인증 토큰이 아니다. 로그인 화면은 이메일 형식과 영문·숫자·특수문자를 모두 포함한 공백 없는 10~12자 비밀번호를 검사하며 실제 자격 증명을 검증하지 않는다. 서버 렌더링과 첫 클라이언트 렌더의 로그인 표시는 hydration 상태로 맞춘다.

로그인 UI의 구조를 분리해도 `LoginPage`가 아이디·비밀번호·아이디 저장 체크·안내 상태, 데모 검증, `onLogin` 호출과 홈 이동을 계속 소유한다. `LoginContent`는 기능 내부 `LoginLayout`·`LoginForm`·`LoginMembership`를 조합하며, 폼의 `LoginActions`는 제출 버튼과 소셜 로그인 안내 콜백을 표시한다. 신규 상태 저장이나 실제 인증 연동은 추가하지 않았다. 제목 `login-title`, 입력 id/name/autocomplete, 필수 입력 검증, 안내 live region과 가입·계정 찾기 이동 계약을 보존한다.

로그인 액션과 회원가입 이동 버튼은 공통 `Button`·`ButtonLink`의 기본 `tall` 크기를 사용한다. 명시적 크기 속성만 정리했으며 `LoginPage`의 상태, 제출 및 이동 콜백은 변경하지 않았다. 출처는 작업 트리의 `src/shared/components/atoms/Button/Button.tsx`, `src/shared/features/login/LoginActions.tsx`, `src/shared/features/login/LoginMembership.tsx`다.

## 로그인 필드 오류

2026-10-19 전수 점검에서 로그인 오류 안내에 id를 주고 실제 오류 필드의 aria-describedby로 연결했다. 다른 페이지의 필드 상태는 각 부모가 소유하며 공통 컨트롤은 검증 규칙을 새로 만들지 않고 invalid/error를 표현한다. 휴대폰 인증은 noticeTone과 codeError를 분리하고 코드 입력·재요청·인증 정보 변경 시 코드 오류를 초기화한다. 전체 범위와 검증은 [전수 점검 보고서](../development/form-state-audit.md)에 기록한다.

첨부 디자인의 필드별 형식 안내가 빠져 있어 2026-10-19 후속 수정으로 `LoginNotice.invalidFields`를 `LoginForm.errors`로 대체했다. LoginPage는 최초 제출 후 현재 입력값에서 오류를 계산한다. 빈 값과 잘못된 이메일에는 “올바른 이메일 형식으로 입력해 주세요”, 비밀번호 규칙 위반에는 “영문, 숫자, 특수문자를 모두 포함하여 10~12자로 입력해 주세요”를 전달한다. 값이 규칙에 맞아야 해당 오류가 해제되고 다시 잘못된 값으로 수정하면 재표시된다.

LoginForm은 `FormField.error`로 문구를 표시하고 TextInput은 Context를 통해 invalid와 해당 오류의 aria-describedby를 상속한다. `LoginNotice`는 성공·기능 미연결 안내만 담당한다. 폼의 noValidate와 required는 유지하고 형식 오류가 있으면 onLogin·홈 이동을 차단한다. Error·MobileError는 두 문구의 정적 예시이고, LoginFlow와 InvalidFormats는 실제 제출·수정 흐름을 검사한다. 후속 검증 결과와 작업 트리의 다른 화면 문법 오류로 인한 전체 검사 제한은 [UI 문서](ui.md#로그인-형식-오류-안내-보완-2026-10-19)에 기록한다.

## 회원가입·휴대폰 인증 오류 상태 보완 (2026-10-19)

일반 가입은 아이디 placeholder의 영문·숫자 4자 이상 조건을 실제 제출 검사에 연결한다. 빈 아이디에는 기존 필수 입력 문구를 유지하고 4자 미만·공백·특수문자가 포함된 아이디에는 “영문, 숫자 조합으로 4자 이상 입력해 주세요.”를 필드 오류로 표시한다. 소셜 가입에는 이 로컬 계정 조건을 적용하지 않는다.

이메일은 src/shared/lib/emailValidation.ts를 통해 일반 가입·회원정보 가입·로그인이 같은 형식과 오류 문구를 사용한다. 회원정보의 분리된 이메일/도메인 입력도 동일한 부분 검사를 사용한다. 이메일 앞뒤 공백은 기존대로 제거하며 로컬 부분의 선행·후행·연속 점, 64자 초과 및 잘못된 도메인은 거부한다. 기존 일반 가입에서 통과하고 로그인에서 거부되던 점 없는 도메인 차이도 제거했다.

RegistrationPage의 checkedEmail은 이메일·도메인 변경이나 실패한 이메일 확인에서만 초기화한다. 다른 필드의 오류로 이를 취소하면서 기존 형식 확인 안내는 남아 있던 상태 불일치를 수정했다. 이메일을 바꾸면 안내와 확인 상태가 함께 해제된다. 중복확인은 여전히 형식 확인 데모이며 실제 사용 가능 판정을 추가하지 않는다.

휴대폰 인증의 필수 약관 누락은 개별 invalid 외에 “필수 약관에 모두 동의해 주세요.”를 표시한다. 모두 동의하면 해제되고, 인증번호 요청 후 동의를 취소해 확인을 누르면 다시 표시된다. 실제 문자 발송·인증 성공/실패·가입 여부 확인은 외부 서비스 미연결 범위로 남긴다.

## 가입·로그인·재설정 비밀번호 정책 (2026-10-19)

사용자가 제공한 로그인 오류 화면의 “영문, 숫자, 특수문자를 모두 포함하여 10~12자로 입력해 주세요”와 기존 회원정보 가입 규칙을 기준으로, 일반 가입·회원정보 가입·로그인·비밀번호 재설정이 `src/shared/lib/passwordValidation.ts`의 isValidPassword와 passwordRequirementsMessage를 공유한다. 공백 없는 10~12자에 영문·숫자·특수문자가 모두 있어야 한다. 기존 일반 가입의 8자 이상, 재설정의 12자 이상, 회원정보 가입의 공백 허용 차이를 제거해 생성·변경 가능한 비밀번호가 로그인에서 거부되는 충돌을 해소했다. 실제 인증이나 저장을 추가하지 않는다.

재설정의 validatePasswordReset도 공통 모듈에서 제공하며 기존 기능 경로는 재수출로 호환한다. 빈 비밀번호는 공통 규칙 문구, 빈 확인란은 “비밀번호를 다시 입력해 주세요.”, 불일치는 기존 “동일한 비밀번호가 입력되었는지 확인해주세요.”를 반환한다. required라는 내부 표식을 반환해 화면에서 설명을 숨기던 경로는 제거했다.

Figma 제공 링크의 291:53311·291:60808은 재인증 오류로 원문을 읽지 못했다. 이 정책 통일은 사용자가 확인한 로그인 스크린샷과 코드의 충돌을 보완한 것이며 두 Figma 영역 전체와 일치한다는 판정은 아니다. 이메일 중복·인증번호의 실제 서버 검증은 계속 데모 안내로 표시한다.

## 장바구니 항목

`id`, `color`, `width`, `size`가 모두 같은 항목을 다시 담으면 수량을 합산한다. 수량을 1 미만으로 바꾸거나 삭제 콜백을 호출하면 해당 항목을 제거한다. 금액과 상품 표시는 목 상품 목록을 조회해 계산한다.

## 데이터 변경

상품 필터와 카드·상세·장바구니는 `src/mocks/products.ts`의 상품 타입과 데이터에 의존한다. 데이터를 바꿀 때 관련 화면, 옵션·품절 상태와 Storybook 예제를 함께 확인한다. 실제 API를 연결할 경우 인증과 영속 상태의 계약을 먼저 정하고 이 문서의 데모 설명을 갱신한다.

## JSX 스타일 이전 검토 (2026-10-15)

LoginLayout·LoginForm·LoginActions·LoginMembership와 CartPage의 단일 사용 배치 스타일을 Panda JSX props로 이전했다. 검토 범위는 로그인 화면의 페이지/콘텐츠 여백·옵션/링크/구분선·액션/혜택 배치와 장바구니의 상품 정보·빈 상태·추천 그리드다. LoginPage의 입력/체크/안내 상태·데모 검증·onLogin·라우팅, CartPage의 행 조회·합계·수량 변경/삭제 콜백과 ShopShell 상태 수명은 변경하지 않았다. 구조 이전 결과와 검증 범위는 [UI 아키텍처](ui.md#componentsfeatures-jsx-스타일-점검-2026-10-15)에 기록한다.

## 로그인 화면 완료 기록 (2026-10-19)

PC·모바일 로그인 폼의 아이디/비밀번호 찾기 진입 링크를 하나의 버튼으로 합쳤다. 목적지는 기존 `/login/find-account`를 유지하며 로그인 상태와 데모 인증 동작은 변경하지 않았다. 관련 화면 구성은 [UI 아키텍처](ui.md)에 기록한다.

소셜 로그인 버튼은 카카오·네이버 표시를 공통 `Icon` 자산으로 전환했다. 클릭 시 기존 미제공 안내 콜백을 호출하는 데모 상태는 그대로 유지한다.

[프로젝트 범위](../project.md), [라우팅](routing.md), [변경 검증](../development/verification.md)을 참고한다.

## Features 표현 정리 후 상태 계약 검토 (2026-10-19)

작업 트리 `src/shared/features/cart/CartPage.tsx`의 텍스트·단일 사용 스타일을 Typography와 Panda JSX로 옮겼다. cart props, 수량 변경/제거 콜백, 상품 조회, rows와 total 계산은 유지했다. 체크박스·수량 입력·결제 경로와 상태 소유자도 변경하지 않았다. 전체 Features의 적용 범위와 검사 한계는 [UI 기록](ui.md#features-재사용성과-jsx-표현-점검-2026-10-19)을 참고한다. 이번 검토는 실제 주문·결제나 장바구니 전체 브라우저 회귀를 검증한 기록이 아니다.

## 공통 계정 프레임 적용 이후 로그인 상태 계약 (2026-10-19)

LoginLayout의 main·500px 중앙 폭 제한은 AccountPageLayout에 위임한다. LoginLayout은 기존 login-title 제목과 children 조합을 유지하며 새 Context·hook·client 경계를 추가하지 않는다. LoginPage의 이메일/비밀번호·아이디 저장·제출 여부·오류/성공 안내 상태, 입력 시 안내 초기화, 검증 성공 후 onLogin 호출과 홈 이동은 기존 책임을 유지한다. LoginForm·LoginContent·LoginPage의 상태 코드는 수정하지 않았다.

검증은 실제 LoginPage 코드와 기존 상태 설명을 대조했고, 웹/모바일 login-flow·invalid-formats Storybook play 4개와 default/mobile DOM·좌표 비교를 통과했다. 전체 타입 검사와 Next/Storybook 빌드도 통과했다. 이번 변경으로 데모 로그인 저장 방식이나 실제 인증 연동 범위는 달라지지 않는다. 출처는 frontmatter의 LoginPage·LoginContent·LoginLayout·AccountPageLayout과 기존 로그인 스토리다.

## 주문 프레임 공통화와 상태 유지 (2026-10-19)

주문 프레임 공통화에서는 CartPage의 main/header/StepIndicator를 OrderPageLayout에 위임했다. 수량·삭제 콜백·행 구성·총액 계산은 수정하지 않았다. CheckoutLayout은 completed에 따라 단계 2/3과 기존 제목을 전달하고 CheckoutPage의 입력·검증·완료·onComplete 상태 코드는 수정하지 않았다. 주문 합계 테스트 3개, 결제 완료 웹/모바일 play 2개, 장바구니 실제 경로와 주문 상태의 DOM·좌표 비교 6건으로 기존 계약을 확인했다.
