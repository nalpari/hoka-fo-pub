---
type: Report
title: '폼 필드 공통화 전수 조사'
description: '전체 소스에서 반복되는 필드 조합과 공통 API, 유지해야 할 상태·검증 차이를 정리한다.'
tags: [forms, components, reuse, audit]
status: draft
generated:
  by: codex/gpt-6
  at: '2026-10-26T00:00:00Z'
source_revision: 5d31d307e61f87d5b09773bcd0250e4c2784679d
working_tree_sources:
  - src/components/common/layouts/AccountFormLayout/AccountFormLayout.tsx
  - src/app/mypage/profile/page.tsx
  - src/components/mypage/mypage-profile.types.ts
  - src/stories/features/mypage/MyPage.Profile.Mobile.stories.tsx
  - src/components/common/atoms/FormField/FormField.tsx
  - src/stories/components/common/atoms/FormField/FormField.stories.tsx
  - src/components/orders/OrdersRoute.tsx
  - src/app/checkout/page.tsx
  - src/components/common/molecules/ProductOptionSelectors/ProductWidthSelector.tsx
  - src/components/common/molecules/ProductOptionSelectors/ProductColorSelector.tsx
  - src/components/common/molecules/ProductOptionSelectors/ProductSizeSelector.tsx
  - src/components/common/molecules/ProductOptionSelectors/ProductOptionSection.tsx
  - src/stories/features/forms/form-state-audit/account.scenarios.tsx
  - src/stories/features/find-account/FindAccountPage.scenarios.tsx
  - src/stories/features/login/LoginPage.scenarios.tsx
  - src/app/login/find-account/page.tsx
  - src/components/login/LoginPage.tsx
  - src/shared/Mockup/signup/SignupDetailsStep.tsx
  - src/app/login/find-account/password-reset/page.tsx
  - src/app/mypage/coupons/page.tsx
  - src/app/login/page.tsx
  - src/app/support/inquiries/new/page.tsx
  - src/components/mypage/MyPageAddresses.tsx
  - src/components/mypage/MyPageProfile.tsx
  - src/app/signup/information/page.tsx
  - src/app/mypage/reviews/page.tsx
  - src/components/common/organisms/Address/AddressFields.tsx
  - src/components/phone-verification/PhoneVerificationContent.tsx
  - src/components/common/molecules/FormFields/BirthDateField.tsx
  - src/components/common/molecules/FormFields/CharacterCount.tsx
  - src/components/common/molecules/FormFields/EmailField.tsx
  - src/components/common/molecules/FormFields/NameField.tsx
  - src/components/common/molecules/FormFields/PasswordField.tsx
  - src/components/common/molecules/FormFields/PhoneNumberField.tsx
  - src/components/common/molecules/FormFields/PreferenceField.tsx
  - src/components/common/molecules/FormFields/TextareaField.tsx
  - src/components/common/molecules/FormFields/TextFormField.tsx
  - src/components/common/molecules/FormFields/VerificationCodeField.tsx
  - src/components/common/molecules/FormFields/VerificationCountdown.tsx
  - src/components/common/organisms/EmailAddressFields/EmailAddressFields.tsx
  - src/stories/components/common/molecules/FormFields/FormFields.stories.tsx
---

# 폼 필드 공통화 전수 조사

## 동의 체크박스·선호 라디오의 기본 옵션 통합 (2026-10-28)

Terms는 Checkbox의 consent variant로, PreferenceField는 Radio의 선택적 label/multilineLabel로 통합하고 두 파일을 삭제했다. Checkbox는 invalid·error·containerClassName을 받아 기존 대화형 레이블·16px 컨트롤·오류 설명과 alert 연결을 보존한다. 외부 className과 label 내부 컨트롤 className의 책임을 구분한다. Radio는 label이 있을 때만 기존 가로 필드 구성을 제공하며 label이 없으면 기존 사용을 유지한다. 값·검증·동의 정책은 부모에 남는다. 기존 필드 컨텍스트와 원래 props의 aria-describedby·aria-invalid를 전달하고 그룹·기존 default/filter 모드는 유지한다. [API와 검증](ui.md#공통-래퍼-4개를-부모-옵션으로-통합-2026-10-28)을 따른다.

## 의미별 기본값 래퍼 제거 (2026-10-28)

현재 이름·휴대폰 번호·비밀번호·생년월일·인증번호·여러 줄 입력은 `TextFormField`를 직접 사용한다. `NameField`, `PhoneNumberField`, `PasswordField`, `BirthDateField`, `VerificationCodeField`, `TextareaField`의 소비처와 통합 스토리를 전환하고 6개 파일을 삭제했다. 사용처가 없는 `EmailField`도 사용자 승인에 따라 삭제했다. 기본 레이블·placeholder·password 타입·numeric/one-time-code/6자리 설정은 각 호출부로 옮기고 호출자가 명시한 값은 그대로 우선한다. RegistrationField와 휴대폰 인증의 동적 Field 선택은 호출부가 이미 모든 값을 지정하므로 제거했다.

공통 계약은 기존 `TextFormField`의 id·FormField props·inputProps·renderControl이며 공개 API를 추가하지 않았다. single-line/multiline 타입은 기존 타입 계약을 유지한다. 오류·hint·required·ref·disabled·폼 제출과 부모의 검증·정규화·타이머는 그대로다. `VerificationCountdown`, `CharacterCount`, `PreferenceField`, 주소·이메일 복합 입력은 실제 표시·상호작용 책임이 있어 유지한다.

아래 의미별 필드 도입·재사용 설명은 당시의 이관 이력이며 현재 정책은 이 절이 우선한다. 삭제 전 소스는 `6f76f7334c7eb4ae0279d4340226998aeb4aebf6`의 `FormFields` 파일이며 기존 메타데이터는 당시 출처로 보존한다. 검증 결과와 기존 자동 play 실패의 재현은 [UI 기록](ui.md#얇은-래퍼-직접-사용-전환-2026-10-28)을 따른다.

## 회원정보 주소·이메일 입력 재사용 (2026-10-26)

회원정보 편집은 회원가입에서 사용 중인 AddressFields(boxed), EmailAddressFields를 그대로 소비한다. 주소의 disabled 우편번호/기본주소·팝업·상세주소 계약과 이메일 아이디/도메인 분리·직접입력/목록 도메인 비활성화를 유지한다. 주소 초안·저장·취소와 이메일 검증·조합은 MyPageProfile에 남기고 공통 입력에 비즈니스 정책을 추가하지 않았다. 새로운 공용 필드 API나 컴포넌트는 없다. [화면 구성과 검증](ui.md#회원정보-주소이메일-편집-재사용-2026-10-26)을 참고한다.

## 회원정보 휴대폰 인증 조합 (2026-10-26)

ProfilePhoneVerification은 기존 PhoneNumberField·VerificationCodeField·VerificationCountdown과 useVerificationCountdown을 재사용하는 기능 내부 조합이다. phone/error/verified와 변경 콜백을 받고 요청·코드 확인·타이머는 내부에 둔다. PhoneNumberField는 tel/numeric/tel-national 속성을, 인증번호는 공통 one-time-code/numeric/6자리 속성을 유지한다. 숫자 정규화·오류·데모 코드 비교 및 저장 전 인증 판정은 공통 필드로 옮기지 않았다. 기존 비밀번호 팝업은 유지한다. 동작 범위와 확인 결과는 [UI 기록](ui.md#회원정보-휴대폰-인증-영역-2026-10-26)을 따른다.

## 회원정보 비밀번호 필드 안내 재사용 (2026-10-26)

ProfilePasswordDialog의 독립 Typography 안내를 PasswordField.hint로 이관했다. 기존 TextFormField를 통해 FormField의 hint/error 접근성 연결을 재사용한다. FormField.hintProps는 variant/className만 노출하고 FormFieldHint의 기본 body5와 0 margin은 유지한다. 팝업은 body4 및 paddingTop 8px을 지정해 기존 글자 크기 14px와 안내 앞뒤의 16px 간격을 보존한다. 값·검증·초기화는 팝업 소유이며 hint에 비밀번호 정책이나 검증 로직을 추가하지 않는다. hint/error 동시 연결과 팝업 Enter 제출·확인·완료를 브라우저에서 확인했다. 관련 공통 모달 API 및 빌드 검증은 [UI 기록](ui.md#비밀번호-팝업-공통-모달필드-안내-재사용-2026-10-26)을 따른다.

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

검색 전용 입력, 상품 크기·리뷰 별점 등의 선택 컨트롤, 파일 첨부, 결제 수령인·저장 배송지의 compact native 입력은 기존 구성을 유지한다. 배송 요청 선택은 공통 Dropdown을 사용하고 직접 입력 textarea와 250자 카운터를 유지한다. 같은 문구만을 이유로 서로 다른 FormData·비제어·스타일 계약을 바꾸지 않았다.

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

| 사용처                                                                                                         | 현재 표시/속성                                                                     | 검증·상태 소유자                                                                                                                              |
| -------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| [SignupDetailsStep](../../src/shared/Mockup/signup/SignupDetailsStep.tsx)                                      | 이전 가입 화면 목업의 이름·이메일 입력 구성, boxed·required                        | Mockup 전용이며 운영 `/signup` 흐름에서 사용하지 않음                                                                                         |
| [FindAccountIdentityFields](../../src/components/features/find-account/FindAccountIdentityFields.tsx)          | 같은 문구, name=name, autocomplete=name, boxed·required                            | [FindAccountPage](../../src/components/features/find-account/FindAccountPage.tsx)는 isValidName과 입력 시 오류 갱신, 이름 변경 시 인증 초기화 |
| [MyPageAddresses](../../src/components/features/mypage/MyPageAddresses.tsx)                                    | 수령인 recipient를 이름으로 표시, 같은 문구, boxed·required                        | 배송지 저장 시 recipient.trim() 존재 여부 확인                                                                                                |
| [PhoneInformationFields](../../src/components/features/phone-verification/PhoneInformationFields.tsx)          | textField('name', ...) 호출, 같은 문구, type=text/inputMode=text/autocomplete=name | [PhoneVerificationPage](../../src/components/features/phone-verification/PhoneVerificationPage.tsx)는 isValidName, 값 변경 시 인증 초기화     |
| [RegistrationPersonalFields](../../src/components/features/signup-registration/RegistrationPersonalFields.tsx) | 이름을 입력해주세요. 문구, RegistrationField 경유                                  | [RegistrationPage](../../src/components/features/signup-registration/RegistrationPage.tsx)의 isValidName과 필드 오류 초기화                   |
| [CheckoutRecipientFields](../../src/components/features/checkout/CheckoutRecipientFields.tsx)                  | 받는 분/받으실 분의 이름을 입력해주세요, compact native 입력                       | CheckoutContent의 FormData 빈 값 검사, uncontrolled                                                                                           |
| [CheckoutSavedAddress](../../src/components/features/checkout/CheckoutSavedAddress.tsx)                        | 저장된 이름을 native input defaultValue로 표시                                     | 기존 배송지 모드의 FormData 입력, 요약 행 모양 유지                                                                                           |

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

검증 로직 출처: [이름 검사](../../src/lib/validation.ts), [번호 처리](../../src/components/features/find-account/phoneNumber.ts), [이메일](../../src/lib/emailValidation.ts), [비밀번호](../../src/lib/passwordValidation.ts), [카운트다운](../../src/lib/useVerificationCountdown.ts). 공용 기반은 [FormField](../../src/components/common/atoms/FormField/FormField.tsx)와 [TextInput](../../src/components/common/atoms/TextInput/TextInput.tsx)이다.

## 로그인 아이디 필드 전환 (2026-10-20)

LoginForm의 아이디는 EmailField에서 TextFormField로 전환했다. label “아이디”, placeholder “아이디를 입력해 주세요”, type text를 쓰고 name/autocomplete username·boxed·required·error 전달을 유지한다. 아이디 검증은 공통 필드가 아닌 LoginPage에서 수행한다. 새 공용 컴포넌트·API는 추가하지 않는다. [전환 기록](ui.md#일반-아이디-로그인-전환-2026-10-20)을 참고한다.

## 상품 옵션 선택 공통화 (2026-10-23)

상품 상세와 장바구니의 발볼·컬러·사이즈를 ProductOptionSelectors의 제어형 공통 UI로 이관했다. 상품 데이터·재고 선택지 계산과 장바구니 초안·저장/취소는 기능에 남는다. 상세 사이즈의 FormField 오류 연결과 htmlFor, 품절/미제공 상태·키보드 동작을 유지하며 화면별 표현은 appearance로 구분한다. [공통화와 검증](ui.md#상품-상세와-장바구니-옵션-선택-공통화-2026-10-23)을 참고한다.

## 주문 조회·배송 요청 표시 분리 (2026-10-23)

OrdersDateRange는 주문 조회의 두 날짜 입력·오류·조회 버튼을 구성하고 날짜 값과 검증·검색은 기존 소유자가 담당한다. CheckoutDeliveryRequestSelect는 기존 FormField/Select를, CheckoutDeliveryMessageField는 TextareaField/CharacterCount와 250자 입력 계약을 사용한다. request/message 상태와 custom 분기 및 입력값 보관은 CheckoutDeliveryRequest에 유지했다. 폼의 id/name/label과 기존 필수 표시 정책을 변경하지 않았다. 브라우저에서 직접설정 입력 표시, 배송 요청 직접입력과 카운터 갱신을 확인했다. 상세 경계와 검증은 [UI 기록](ui.md#주문주문서-표시-영역-분리-2026-10-23)을 따른다.
