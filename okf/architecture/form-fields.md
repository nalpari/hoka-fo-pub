---
type: Report
title: '폼 필드 공통화 전수 조사'
description: '전체 소스에서 반복되는 필드 조합과 공통 API, 유지해야 할 상태·검증 차이를 정리한다.'
tags: [forms, components, reuse, audit]
status: draft
generated:
  by: codex/gpt-6
  at: '2026-10-20T08:08:13.395691Z'
source_revision: 5d31d307e61f87d5b09773bcd0250e4c2784679d
working_tree_sources:
  - src/stories/features/forms/form-state-audit/account.scenarios.tsx
  - src/stories/features/find-account/FindAccountPage.scenarios.tsx
  - src/stories/features/login/LoginPage.scenarios.tsx
  - src/shared/features/find-account/IdConfirmationModal.tsx
  - src/shared/features/login/LoginPage.tsx
  - src/shared/Mockup/signup/SignupDetailsStep.tsx
  - src/shared/features/find-account/PasswordResetField.tsx
  - src/shared/features/find-account/FindAccountIdentityFields.tsx
  - src/shared/features/find-account/FindAccountCodeFields.tsx
  - src/shared/components/organisms/MyPage/CouponManager.tsx
  - src/shared/features/login/LoginForm.tsx
  - src/shared/features/support/InquiryMessageFields.tsx
  - src/shared/features/mypage/MyPageAddresses.tsx
  - src/shared/features/mypage/MyPageProfile.tsx
  - src/shared/features/signup-registration/RegistrationField.tsx
  - src/shared/features/mypage/MyPageReviewDialog.tsx
  - src/shared/components/organisms/Address/AddressSearchModal.tsx
  - src/shared/features/phone-verification/VerificationCodeFields.tsx
  - src/shared/features/phone-verification/PhoneInformationFields.tsx
  - src/shared/components/molecules/FormFields/BirthDateField.tsx
  - src/shared/components/molecules/FormFields/CharacterCount.tsx
  - src/shared/components/molecules/FormFields/EmailField.tsx
  - src/shared/components/molecules/FormFields/NameField.tsx
  - src/shared/components/molecules/FormFields/PasswordField.tsx
  - src/shared/components/molecules/FormFields/PhoneNumberField.tsx
  - src/shared/components/molecules/FormFields/PreferenceField.tsx
  - src/shared/components/molecules/FormFields/TextareaField.tsx
  - src/shared/components/molecules/FormFields/TextFormField.tsx
  - src/shared/components/molecules/FormFields/VerificationCodeField.tsx
  - src/shared/components/molecules/FormFields/VerificationCountdown.tsx
  - src/shared/features/signup-registration/RegistrationEmailFields.tsx
  - src/shared/features/signup-registration/RegistrationPreferenceRow.tsx
  - src/shared/features/checkout/CheckoutDeliveryRequest.tsx
  - src/shared/components/organisms/EmailAddressFields/EmailAddressFields.tsx
  - src/stories/components/molecules/FormFields/FormFields.stories.tsx
  - src/shared/components/organisms/Address/AddressFields.tsx
  - src/shared/components/organisms/Address/AddressField.tsx
  - src/shared/features/checkout/CheckoutAddressFields.tsx
  - src/shared/features/checkout/CheckoutShipping.tsx
  - src/shared/features/checkout/CheckoutShippingForm.tsx
  - src/shared/features/signup-registration/RegistrationAddressFields.tsx
  - src/shared/features/signup-registration/RegistrationContent.tsx
---

# 폼 필드 공통화 전수 조사

이름·연락처·비밀번호·인증번호는 필드 UI의 공통화 효과가 크다. 이미 공유하는 FormField/TextInput 위에 작은 조합 컴포넌트를 두고, 화면별 검증·값 정리·타이머·제출·라우팅은 현재 부모에 남기는 방식이 적합하다. 같은 placeholder가 같은 검증 정책을 뜻하지는 않는다.

## 범위와 방법

2026-10-20 작업 트리의 `src/**/*.tsx` 666개를 TypeScript AST로 검색했다. `src/**/*.ts` 47개에서도 필드 관련 선언과 검증·카운트다운 참조를 검색했다. 프로덕션, Mockup, Storybook, atom 내부 구현을 구분하고 FormField/TextInput, native input/textarea/select, Dropdown/Select, Radio/Checkbox와 기존 필드 래퍼를 확인했다. `as="input/textarea/select"` 우회 패턴과 import alias도 검색했다.

프로덕션의 직접 작성 위치는 FormField 32곳(16파일), TextInput 34곳(19파일), 두 종류의 합집합은 20파일이다. 나머지 공용 컨트롤과 native 필드까지 포함한 기본 조사 목록은 프로덕션 48파일, Mockup 1파일, Storybook 9파일, native 요소를 직접 만드는 atom 3파일이다. 이는 지정한 태그의 **소스 작성 위치**이며 화면에서 실제 렌더링되는 입력 수나 전체 폼 컴포넌트 수가 아니다. PhoneInformationFields의 textField/selectField 호출, RegistrationField 7개 호출, PasswordResetField 2개 호출, CheckoutShippingInput과 조건부 렌더링은 추가로 추적했다. RangeInput·SizeSelector·RatingStars·ToggleButton 등의 별도 상호작용은 기존 공용화 유지 대상으로 검토했다.

위 개수는 이관 전 조사 시점의 기록이다. 이후 요청에 따라 아래의 공통 필드를 구현하고 소비처를 이관했다. 표의 제안 API는 조사 당시의 설계 방향이며, 실제 적용 API와 검증은 다음 절에 기록한다.

## 공통 필드 이관 결과 (2026-10-20)

`components/molecules/FormFields`에 TextFormField, NameField, PhoneNumberField, PasswordField, EmailField, BirthDateField, VerificationCodeField, TextareaField, VerificationCountdown, CharacterCount, PreferenceField를 추가했다. split 이메일과 도메인 선택·중복확인 표시는 `organisms/EmailAddressFields`로 분리했다. 기존 소스 19파일의 공통 조합을 이관하고 공용 12파일과 통합 API Storybook 1파일을 추가했다.

TextFormField의 실제 API는 필드의 `id`·label/error/hint/required 등과 제어 요소의 `inputProps`를 분리한다. 기존 onChange/ref/native 속성을 전달하며 새로운 값 변경 이벤트나 검증 정책을 만들지 않는다. single-line/multiline 판별 타입을 보존하고, 문의처럼 입력과 카운터의 기존 그룹이 필요한 곳은 `renderControl`로 동일 DOM을 유지한다. 의미별 필드는 label/placeholder 등 기본값만 제공하고 화면별 속성으로 재정의한다.

SignupDetailsStep·계정 찾기·휴대폰 인증·로그인·마이페이지·문의·쿠폰·회원정보 등록·주소 모달의 반복 조합을 이관했다. RegistrationField와 PasswordResetField는 기능 어댑터로 유지한다. 로그인 username/current-password, 신규 비밀번호 new-password, 회원정보의 수동 필수 별표와 native required 차이, 화면별 값 정규화와 오류 초기화를 그대로 유지한다. 타이머 상태는 부모에 남기며 VerificationCountdown은 시간 표시만 담당한다. PreferenceField는 yes/no와 한국어 동의 값을 각각 보존한다. CharacterCount는 문의의 `n / 1,000`과 배송 요청의 `n/250` 표기를 구분한다.

MyPageAddresses도 AddressFields에 연결했다. `separated` variant와 `fieldOptions`로 기존 ID, required, 우편번호 readOnly, 주소 readOnly/우편번호 전 disabled, 버튼 크기·문구·정렬을 보존한다. 결제 compact와 가입 boxed를 유지하며 목록·기본배송지·추가/저장/삭제 상태는 마이페이지가 소유한다.

검색 전용 입력, 상품 크기·리뷰 별점 등의 선택 컨트롤, 파일 첨부, 결제 수령인·저장 배송지의 compact native 입력은 기존 구성을 유지한다. 배송 요청의 native textarea/select는 유지하고 카운터만 공유한다. 같은 문구만을 이유로 서로 다른 FormData·비제어·스타일 계약을 바꾸지 않았다.

이 이관에서 변경 파일 ESLint/Prettier, 타입 검사, Next 및 Storybook 빌드와 기존 폼·계정·주문 테스트 40개를 통과했다. 변경 전후 9개 영역의 1600px/375px 입력·라벨 좌표와 native 속성을 18쌍 비교했으며 좌표는 0.1px 단위로 비교했다. 공용 API와 기존 흐름의 Storybook play 22개, 주소 저장·문의 카운터/취소·결제 주소/FormData/완료·프로필·수신 동의·리뷰 오류의 별도 동작 9개를 확인했다. 이는 외부 주소 검색·메일·인증·결제 API 검증을 의미하지 않는다.

## 즉시 개선할 조합

| 우선순위  | 관찰한 반복                                                                                                                              | 제안 API·소유 위치                                                                                                                        | 보존해야 할 계약                                                                                                                                                 |
| --------- | ---------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1         | FormField + TextInput + event.target.value 전달이 여러 기능에서 반복됨                                                                   | molecules/TextFormField: id, label, value, onValueChange, error, hint와 기존 input 속성                                                   | label↔id, name/FormData, required/disabled/readOnly, ref, native 속성, 기존 FormField context의 오류·설명 연결. 컴포넌트에서 검증 정책을 새로 만들지 않음        |
| 2         | 가입 기본 정보·계정 찾기·배송지 수령인·휴대폰 본인인증 4곳이 같은 이름 placeholder와 boxed 구조를 사용. 회원정보 입력도 이름 필드가 있음 | molecules/NameField: TextFormField 위에 이름 label/placeholder 기본값, id/value/onValueChange/error와 명시적 required/native 속성         | 각 화면의 name·autocomplete 유무, required와 오류 노출 시점. 이름 검증과 인증 상태 초기화는 부모 소유                                                            |
| 3         | 휴대폰·연락처·다른 전화번호의 label/control 구성이 반복됨                                                                                | molecules/PhoneNumberField: id/value/onValueChange/error, label/placeholder, required/disabled/readOnly, inputMode/autoComplete/maxLength | 하이픈·숫자 정규화·최대 길이를 자동으로 통일하지 않음. 선택 연락처를 필수로 바꾸지 않음. 인증 완료된 회원정보의 disabled 유지                                    |
| 4         | 가입·로그인·회원정보 변경·비밀번호 재설정에서 password 조합 반복. 래퍼 호출을 펼치면 7개 입력                                            | molecules/PasswordField: id/value/onValueChange/error, label/placeholder, autoComplete                                                    | 로그인 current-password와 신규/변경 new-password 구분. 재확인 비교·강도 정책·안내문은 부모 유지. TextInput의 보기/숨기기 동작 재사용                             |
| 5         | 계정 찾기와 휴대폰 인증의 6자리 인증번호·시간 포맷이 동일함                                                                              | molecules/VerificationCodeField와 VerificationCountdown(secondsLeft)                                                                      | one-time-code/numeric/maxLength=6, 기존 name 유무와 id. 타이머 생성·만료·재요청·확인 버튼 type 및 서로 다른 안내문·간격은 각 화면 유지                           |
| 적용 완료 | 결제와 회원가입의 우편번호/주소/상세주소·찾기 모달 연결이 같은 프로세스                                                                  | organisms/Address/AddressFields: variant, idPrefix, value, errors, onValueChange, searchOpen/onSearchOpenChange                           | compact/boxed의 기존 DOM·간격·글꼴, 결제 readOnly 우편번호/수정 가능 주소/비제어 상세주소, 회원가입 disabled 우편번호·주소/제어 상세주소, 부모 값·오류 상태 유지 |

TextFormField는 기존 atom을 대체하는 또 하나의 스타일 시스템이 아니라 조합을 줄이는 molecule이다. `children`을 무제한 받는 전역 FormBuilder나 모든 폼의 상태를 소유하는 context를 추가할 근거는 발견하지 않았다. NameField 등의 작은 의미 단위는 여러 기능의 실제 사용처가 확인된 것부터 도입한다.

## 이름 입력의 실제 사용처와 차이

| 사용처                                                                                                     | 현재 표시/속성                                                                     | 검증·상태 소유자                                                                                                                          |
| ---------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| [SignupDetailsStep](../../src/shared/Mockup/signup/SignupDetailsStep.tsx)                                  | 이전 가입 화면 목업의 이름·이메일 입력 구성, boxed·required                        | Mockup 전용이며 운영 `/signup` 흐름에서 사용하지 않음                                                                                     |
| [FindAccountIdentityFields](../../src/shared/features/find-account/FindAccountIdentityFields.tsx)          | 같은 문구, name=name, autocomplete=name, boxed·required                            | [FindAccountPage](../../src/shared/features/find-account/FindAccountPage.tsx)는 isValidName과 입력 시 오류 갱신, 이름 변경 시 인증 초기화 |
| [MyPageAddresses](../../src/shared/features/mypage/MyPageAddresses.tsx)                                    | 수령인 recipient를 이름으로 표시, 같은 문구, boxed·required                        | 배송지 저장 시 recipient.trim() 존재 여부 확인                                                                                            |
| [PhoneInformationFields](../../src/shared/features/phone-verification/PhoneInformationFields.tsx)          | textField('name', ...) 호출, 같은 문구, type=text/inputMode=text/autocomplete=name | [PhoneVerificationPage](../../src/shared/features/phone-verification/PhoneVerificationPage.tsx)는 isValidName, 값 변경 시 인증 초기화     |
| [RegistrationPersonalFields](../../src/shared/features/signup-registration/RegistrationPersonalFields.tsx) | 이름을 입력해주세요. 문구, RegistrationField 경유                                  | [RegistrationPage](../../src/shared/features/signup-registration/RegistrationPage.tsx)의 isValidName과 필드 오류 초기화                   |
| [CheckoutRecipientFields](../../src/shared/features/checkout/CheckoutRecipientFields.tsx)                  | 받는 분/받으실 분의 이름을 입력해주세요, compact native 입력                       | CheckoutContent의 FormData 빈 값 검사, uncontrolled                                                                                       |
| [CheckoutSavedAddress](../../src/shared/features/checkout/CheckoutSavedAddress.tsx)                        | 저장된 이름을 native input defaultValue로 표시                                     | 기존 배송지 모드의 FormData 입력, 요약 행 모양 유지                                                                                       |

처음 4곳은 NameField로 이관했다. RegistrationPersonalFields도 RegistrationField의 정보 객체 의존을 얇은 어댑터로 남기고 같은 NameField에 위임한다. 결제 두 곳은 compact/요약 표현과 native FormData 계약을 유지한다.

## 검증과 필수 표시에서 발견한 차이

- `isValidName`은 한글/영문 이름과 단어 사이 공백을 허용한다. 가입 기본 단계·마이페이지 수령인의 현재 빈 값 검사와 결과가 다르므로 NameField 안에서 자동 적용하면 동작 변경이다.
- 계정 찾기는 getPhoneDigits로 숫자만 남기고 11자리로 제한한다. 휴대폰 인증은 maxLength=13과 하이픈/공백을 제거한 번호의 정규식을 사용한다. 마이페이지 배송지는 현재 전화번호의 빈 값만 검사한다. 같은 PhoneNumberField를 써도 이 정책은 별도로 유지해야 한다.
- RegistrationField는 label 안에 `*`를 직접 그리며 FormField.required를 전달하지 않는다. 일반 boxed 필드는 FormField.required를 통해 native TextInput.required도 상속한다. 시각적으로 같은 별표를 이유로 native required까지 같다고 가정하면 안 된다. 공통화 시 현재 속성을 명시하고, 필수 정책 정리는 별도 변경으로 다룬다.
- 인증번호 필드의 시각 구성은 동일하지 않다. 휴대폰 인증의 mt=2/mt=-2/mb=2와 제출 버튼, 계정 찾기의 Stack gap=2와 확인 버튼을 그대로 유지하며 입력과 시간 표시만 공유하는 편이 안전하다.

## 추가 추출 후보와 적용 경계

아래 후보는 위 이관에서 구현했다. 마이페이지 주소도 separated/fieldOptions 계약을 지원한 뒤 연결했다. 표는 조사 당시 확인한 차이와 보존 기준을 기록한다.

| 후보                            | 관련 사용처                                                       | 권장 경계와 유지 사항                                                                                                                                                                                                                    |
| ------------------------------- | ----------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| EmailField / EmailAddressFields | SignupDetailsStep, MyPageProfile, RegistrationEmailFields         | 전체 이메일 1칸과 local/domain 2칸+도메인 Dropdown+중복확인을 구분. 신규 이메일 autocomplete, disabled 도메인·중복확인 상태 보존                                                                                                         |
| BirthDateField                  | PhoneInformationFields, RegistrationPersonalFields                | 생년월일 문자열 입력 UI만 공유 가능. editable 8자리 입력과 본인인증 완료 후 disabled 값을 구분하며 native date 입력으로 변환하지 않음                                                                                                    |
| TextareaField / CharacterCount  | InquiryMessageFields, MyPageReviewDialog, CheckoutDeliveryRequest | 문의 1000자·배송 요청 250자·리뷰의 현재 제한 없음 유지. 기본 입력 조합은 TextFormField의 multiline 계약으로도 처리 가능. 카운터는 제한이 있는 두 곳만 후보                                                                               |
| PreferenceField                 | RegistrationPreferenceRow, MyPageProfile                          | 라벨+Radio 구성이 반복됨. yes/no 값과 동의/수신안함 값을 변환하지 않고 options를 받는 표현 API 검토. SMS 줄바꿈·좌우/세로 배치 보존                                                                                                      |
| AddressFields의 마이페이지 적용 | MyPageAddresses                                                   | 같은 주소 찾기 프로세스지만 우편번호 readOnly·주소 readOnly/우편번호 전 disabled·다른 ID·required·버튼 문구/정렬을 사용함. 단순히 boxed로 교체하지 말고 해당 계약을 먼저 지원해야 함. 기본배송지 체크와 목록 저장/삭제는 마이페이지 소유 |

## 유지할 구성

| 대상                                                                                                 | 판단 근거                                                                                                                                                |
| ---------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| FormField/TextInput 및 Dropdown/Select/Radio/Checkbox                                                | 이미 공용 atom이며 label/context·오류·disabled·native 속성을 제공. 새 폼 라이브러리나 Base UI 추가 도입 불필요                                           |
| SearchField, SearchForm, HeaderSearch, IA 검색·필터                                                  | 검색 전용 동작·아이콘·자동완성·라우팅·플랫폼 배치가 다름. 이름 필드로 묶지 않고 기존 TextInput/SearchField 재사용 유지                                   |
| RegistrationField, PasswordResetField                                                                | 현재 기능 어댑터로서 의미가 있음. 공용 TextFormField/PasswordField 도입 후 내부 조합만 위임하고 정보 객체·FieldName 정책은 feature에 유지                |
| InquiryCategoryFields, PhoneInformationFields의 선택 필드                                            | Dropdown을 이미 재사용함. 값 목록과 통신사 안내는 기능 정책이므로 추가 범용 래퍼 우선순위 낮음                                                           |
| CouponManager의 일련번호                                                                             | 인증번호와 문구가 비슷하지만 쿠폰 등록·오류·완료 상태가 다름. generic TextFormField 사용 후보일 뿐 VerificationCodeField로 통합하지 않음                 |
| 상품 SizeSelector/Radio·RatingStars·RangeInput·NumberStepper·ToggleButton, 장바구니 선택, 약관 Terms | 선택·별점·범위·수량·토글·동의 컨트롤의 공용화가 이미 존재함. 텍스트 필드와 다른 상호작용을 유지                                                          |
| InquiryAttachments                                                                                   | file input의 multiple/accept·ref·파일 삭제/오류 계약을 보존. 텍스트 필드 조합 범위에서 제외                                                              |
| EmailSignupField                                                                                     | 조사 시 프로덕션 호출 없이 Storybook에서 사용하는 독립 뉴스레터 form. 자체 submit/native validity·dark 스타일이 있어 회원가입 EmailField로 사용하지 않음 |
| MyPageProfile의 ProfileField                                                                         | 이름과 달리 수정 전 정보를 보여주는 표시 구성이다. 입력 컴포넌트가 아님                                                                                  |
| Storybook·Mockup·atom 내부 native 요소                                                               | 제품 UI의 중복 개수와 분리해 집계. fixture와 atom 구현의 native input을 또 FormField로 감싸지 않음                                                       |

## 조사한 핵심 조합 파일

FormField/TextInput 직접 사용 20파일과 별도 래퍼·native 입력 경계를 아래에 기록한다. 각 파일을 추적했으며 동적 호출을 개별 JSX 개수로 부풀리지 않았다.

| 영역               | 확인 파일                                                                                     | 판정                                                                                  |
| ------------------ | --------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------- |
| 가입 목업          | SignupDetailsStep                                                                             | 캡처 화면 보존용 Name/Email 필드 구성. 운영 가입 경로에서는 사용하지 않음             |
| 회원정보 등록      | RegistrationField, RegistrationPersonalFields, RegistrationEmailFields                        | 어댑터 유지 + semantic 필드 후보, required 차이 확인                                  |
| 주소               | AddressField, AddressSearchModal, CheckoutAddressFields, RegistrationAddressFields            | 주소 공통화 적용, 모달 필수값 안내 유지                                               |
| 계정 찾기          | FindAccountIdentityFields, FindAccountCodeFields, PasswordResetField/Content                  | Name/Phone/OTP/Countdown/Password 후보                                                |
| 휴대폰 인증        | PhoneInformationFields, VerificationCodeFields                                                | Name/Phone/BirthDate/OTP/Countdown 후보, Dropdown 유지                                |
| 마이페이지         | MyPageAddresses, MyPageProfile, MyPageReviewDialog                                            | Name/Phone/Password/Email/textarea 후보, 주소 mode 확장 후보                          |
| 로그인             | LoginForm                                                                                     | TextFormField/PasswordField, 기억하기·제출·인증 정책 유지                             |
| 문의               | InquiryMessageFields                                                                          | generic TextFormField + multiline/카운터 후보                                         |
| 쿠폰               | components/organisms/MyPage/CouponManager                                                     | generic TextFormField 후보, 쿠폰 로직 유지                                            |
| 검색               | SearchField, SearchForm, HeaderSearch, IaStructurePage                                        | 기존 검색 전용 구성 유지                                                              |
| 상품               | ProductSizeSelector                                                                           | FormField가 감싸는 것이 SizeSelector임을 확인, 텍스트 필드 공통화 제외                |
| 결제의 native 필드 | CheckoutRecipientFields, CheckoutSavedAddress, CheckoutShippingInput, CheckoutDeliveryRequest | compact/name/FormData·uncontrolled·textarea/select 유지, 표시 방식 공통화는 별도 후보 |

## 조사 당시 권장 순서와 주소 선행 검증

1. TextFormField와 NameField를 도입하고 이름 boxed 4곳부터 이관한다. value/error/onValueChange 외에 기존 id/name/autocomplete/required를 비교한다.
2. PhoneNumberField·PasswordField·VerificationCodeField/Countdown으로 확대한다. 현재 검증 함수와 useVerificationCountdown은 새로 복제하지 않는다.
3. split 이메일·생년월일·textarea/카운터·preference는 각 화면의 차이와 사용처 수를 기준으로 적용한다. 마이페이지 주소는 기존 required/readOnly/disabled 계약을 보존한 뒤 AddressFields에 연결한다.

주소 변경은 타입·ESLint·Prettier·Panda·Next/Storybook 빌드와 기존 폼/계정/주문 테스트 40개를 확인했다. 변경 전/후 정적 Storybook에서 결제·회원가입을 각각 1600px/375px로 실행해 모달 필수값 오류·주소 반영·상세주소 입력과 필드 위치/크기/font/padding/name/disabled/readOnly가 일치함을 확인했다. 결제 FormData 및 배송지 전환 후 주소 유지도 확인했다. 기존 회원가입 이메일 확인 후 부가정보 이동·비밀번호 오류/해제의 PC/MO 4개 사례도 통과했다.

위 문단은 주소 선행 작업의 검증 기록이다. 후속 공통 필드 이관의 실제 API와 추가 검증은 위의 이관 결과 절에 기록했다. 실제 주소 검색은 기존 미연결 안내와 직접 입력 미리보기 상태를 유지한다.

검증 로직 출처: [이름 검사](../../src/shared/lib/validation.ts), [번호 처리](../../src/shared/features/find-account/phoneNumber.ts), [이메일](../../src/shared/lib/emailValidation.ts), [비밀번호](../../src/shared/lib/passwordValidation.ts), [카운트다운](../../src/shared/lib/useVerificationCountdown.ts). 공용 기반은 [FormField](../../src/shared/components/atoms/FormField/FormField.tsx)와 [TextInput](../../src/shared/components/atoms/TextInput/TextInput.tsx)이다.

## 로그인 아이디 필드 전환 (2026-10-20)

LoginForm의 아이디는 EmailField에서 TextFormField로 전환했다. label “아이디”, placeholder “아이디를 입력해 주세요”, type text를 쓰고 name/autocomplete username·boxed·required·error 전달을 유지한다. 아이디 검증은 공통 필드가 아닌 LoginPage에서 수행한다. 새 공용 컴포넌트·API는 추가하지 않는다. [전환 기록](ui.md#일반-아이디-로그인-전환-2026-10-20)을 참고한다.
