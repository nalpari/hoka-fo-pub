---
type: Architecture
title: '공통 상태와 데모 데이터'
description: '로그인, 장바구니와 목 데이터의 수명 및 제약을 설명한다.'
tags: [react, state, mock-data]
status: draft
generated:
  by: codex/gpt-6
  at: '2026-10-23T06:41:41Z'
source_revision: c9e8b1a75bdd4a2d52308410b8ce77773464a9e6
working_tree_sources:
  - src/shared/features/cart/CartOrderActions.tsx
  - src/stories/features/cart/CartPage.mobile.stories.tsx
  - src/stories/features/cart/CartPage.scenarios.tsx
  - src/shared/components/molecules/FormActionGroup/FormActionGroup.tsx
  - src/shared/features/mypage/AddressEditor.tsx
  - src/shared/features/mypage/AddressList.tsx
  - src/shared/features/mypage/ProfileEditForm.tsx
  - src/shared/features/mypage/ProfileField.tsx
  - src/shared/features/mypage/ProfileReadView.tsx
  - src/shared/features/mypage/mypage-address.types.ts
  - src/shared/features/mypage/mypage-profile.types.ts
  - src/stories/components/molecules/FormActionGroup/FormActionGroup.stories.tsx
  - src/stories/components/organisms/OrderRecommendations/OrderRecommendations.stories.tsx
  - src/shared/components/atoms/TextInput/TextInput.tsx
  - src/shared/components/organisms/OrderRecommendations/OrderRecommendationItem.tsx
  - src/shared/components/organisms/OrderRecommendations/OrderRecommendations.tsx
  - src/shared/features/cart/CartContent.tsx
  - src/shared/features/login/LoginActions.tsx
  - src/shared/features/mypage/MyPageAddresses.tsx
  - src/shared/features/mypage/MyPageProfile.tsx
  - src/shared/features/mypage/MyPageRewards.tsx
  - src/stories/components/atoms/TextInput/TextInput.stories.tsx
  - src/shared/features/cart/CartSelectionBar.tsx
  - src/shared/features/cart/CartProductList.tsx
  - src/shared/features/cart/CartOptionsContent.tsx
  - src/shared/features/checkout/CheckoutForm.tsx
  - src/shared/features/checkout/CheckoutContent.tsx
  - src/shared/features/checkout/CheckoutPage.tsx
  - src/shared/features/checkout/CheckoutPayment.tsx
  - src/shared/components/atoms/Wishlist/Wishlist.tsx
  - src/shared/features/cart/CartItemRow.tsx
  - src/shared/features/cart/CartOptionsDialog.tsx
  - src/stories/features/forms/form-state-audit/account.scenarios.tsx
  - src/stories/features/find-account/FindAccountPage.scenarios.tsx
  - src/stories/features/login/LoginPage.scenarios.tsx
  - src/shared/features/find-account/IdConfirmationModal.tsx
  - src/shared/components/molecules/ConfirmDialog/ConfirmDialog.tsx
  - src/shared/components/atoms/LoadMoreButton/LoadMoreButton.tsx
  - src/shared/components/molecules/PageActionButton/PageActionButton.tsx
  - src/shared/features/mypage/reviews/MyPageReviewLoadMore.tsx
  - src/stories/components/atoms/LoadMoreButton/LoadMoreButton.stories.tsx
  - src/shared/components/layouts/ContentSection/ContentSection.tsx
  - src/shared/components/layouts/CustomerCenterLayout/CustomerCenterLayout.tsx
  - src/shared/components/organisms/StoreFinder/StoreResults.tsx
  - src/shared/features/notices/NoticesPage.tsx
  - src/shared/features/faq/FaqPage.tsx
  - src/shared/features/support/InquiryPage.tsx
  - src/shared/features/notices/NoticeDetailPage.tsx
  - src/shared/features/checkout/CheckoutComplete.tsx
  - src/stories/components/layouts/ContentSection/ContentSection.stories.tsx
  - .codex/skills/component-reusability/SKILL.md
  - .codex/skills/component-reusability/references/content-sections.md
  - src/shared/features/support/SupportPage.tsx
  - src/shared/features/signup/SignupLayout.tsx
  - src/shared/features/support/SupportNotices.tsx
  - src/shared/features/support/SupportFaq.tsx
  - src/shared/features/support/SupportMileageContent.tsx
  - src/shared/features/support/ShippingReturnsPage.tsx
  - src/shared/features/run-club/RunClubSessionHero.tsx
  - src/shared/features/run-club/RunClubSessionGuideContent.tsx
  - src/shared/features/run-club/RunClubSessionPoster.tsx
  - src/shared/features/account-locked/AccountUnlockCompletePage.tsx
  - src/shared/features/phone-verification/PhoneVerificationAgreements.tsx
  - src/shared/features/care-guide/CareGuidePage.tsx
  - src/shared/features/signup-registration/RegistrationCompleteContent.tsx
  - src/shared/features/mypage/MyPageProductHistory.tsx
  - src/shared/features/not-found/NotFoundPage.tsx
  - src/shared/features/identity-verification/IdentityVerificationContent.tsx
  - src/shared/features/find-account/PasswordResetContent.tsx
  - src/shared/features/find-account/FindAccountContent.tsx
  - src/shared/components/layouts/AccountFormLayout/AccountFormLayout.tsx
  - src/shared/features/mypage/MyPage.tsx
  - src/shared/features/support/SupportContactCard.tsx
  - src/shared/features/support/SupportHours.tsx
  - src/shared/features/signup-registration/RegistrationAdditionalFields.tsx
  - src/shared/features/product/ProductDetailDeliverySection.tsx
  - src/shared/features/mypage/MyPageRewards.tsx
  - src/shared/features/mypage/MyPageStatusPage.tsx
  - src/shared/features/checkout/CheckoutSummary.tsx
  - src/shared/features/checkout/CheckoutPayment.tsx
  - src/shared/components/organisms/MyPage/EmployeeCoupons.tsx
  - src/shared/features/product/ProductSupportLink.tsx
  - src/shared/features/product/ProductDetailAfterSalesContent.tsx
  - src/shared/components/organisms/MyPage/CouponManager.tsx
  - src/shared/features/product/ProductInformation.tsx
  - src/shared/features/signup-terms/SignupTermsDetail.tsx
  - src/shared/features/run-club/RunClubHeader.tsx
  - src/shared/features/run-club/RunClubSessionCard.tsx
  - src/shared/features/phone-verification/PhoneVerificationDetailDialog.tsx
  - src/shared/features/mypage/MyPageWithdrawalDialog.tsx
  - src/shared/features/find-account/PasswordResetCompleteModal.tsx
  - src/shared/features/account-locked/AccountLockedContent.tsx
  - src/shared/features/find-account/PasswordResetField.tsx
  - src/shared/features/find-account/FindAccountIdentityFields.tsx
  - src/shared/features/find-account/FindAccountCodeFields.tsx
  - src/shared/features/mypage/MyPageAddresses.tsx
  - src/shared/features/mypage/MyPageProfile.tsx
  - src/shared/features/phone-verification/VerificationCodeFields.tsx
  - src/shared/features/phone-verification/PhoneInformationFields.tsx
  - src/shared/features/signup-registration/RegistrationEmailFields.tsx
  - src/shared/features/signup-registration/RegistrationPreferenceRow.tsx
  - src/shared/features/cart/CartPage.tsx
  - src/shared/features/cart/CartDialogs.tsx
  - src/shared/features/cart/CartLimitDialog.tsx
  - src/shared/features/checkout/CheckoutShipping.tsx
  - src/shared/features/checkout/CheckoutDeliveryRequest.tsx
  - src/stories/features/cart/CartPage.stories.tsx
  - src/shared/features/cart/CartContent.tsx
  - src/shared/features/cart/CartItemRow.tsx
  - src/shared/features/cart/cart-item.ts
  - src/shared/features/find-account/FindAccountPage.tsx
  - src/shared/features/login/LoginForm.tsx
  - src/shared/features/login/RememberIdHelp.tsx
  - src/shared/features/cart/CartOptionsDialog.tsx
  - src/shared/features/checkout/CouponDialog.tsx
  - src/shared/features/checkout/CheckoutContent.tsx
  - src/shared/ShopShell.tsx
  - src/mocks/cartDisplay.ts
  - src/shared/features/checkout/CheckoutPage.tsx
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

## 재사용 적용 후 상태 소유권 (2026-10-21)

CartContent의 금액 표시와 LoginActions의 소셜 버튼만 공용 UI로 대체했다. 합계·선택·로그인·미연결 안내 처리 및 ShopShell/Context의 수명은 변경하지 않았다. OrderRecommendations의 준비된 데이터는 mock fixture가 공급하며 공용 UI는 선택/계산/라우팅 정책을 소유하지 않는다.

마이페이지 배송지의 draft·validation·기본 배송지 지정·삭제와 회원정보의 필드 오류·저장·취소·탈퇴 상태는 기존 페이지에 유지했다. feature 내부 view/editor는 준비된 값과 콜백을 받는다. FormActionGroup은 취소를 제출하지 않으며 실제 제출은 기존 form에 위임한다. compact TextInput의 native name/defaultValue/controlled value/readOnly/disabled 계약을 보존한다.

## 더보기 버튼의 상태 소유권 검토 (2026-10-20)

CouponManager·MyPageReviewLoadMore·FAQ·공지와 PageActionButton/LoadMoreButton을 검토했다. 공통 버튼은 표시와 클릭 전달만 담당한다. 쿠폰의 5개 증가·분류 변경 시 초기화, 리뷰·FAQ·공지의 10개 단위 계산과 기존 노출 조건은 각 화면에 유지하며 상태 모델 변경은 없다. 출처: working_tree_sources의 CouponManager·MyPageReviewLoadMore·LoadMoreButton·PageActionButton과 src/shared/features/faq/FaqPage.tsx, src/shared/features/notices/NoticesPage.tsx.

## ContentSection footer 이관의 상태 경계 (2026-10-20)

쿠폰 내역 더보기, 프로필 조회/편집, 매장 지도 토글과 고객센터 목록 더보기의 상태·콜백·표시 조건을 유지하고 마무리 액션 노드의 배치 API만 footer로 이전했다. 폼 내부의 인증/저장·회원탈퇴·취소/확인 및 주문/구매 고정 바는 기존 소유권을 유지한다. 업무 상태·Context·타이머·검증 정책은 추가하지 않았다. 공용 스토리의 form id 연결·필수 검증·Enter 제출은 footer 소비 방법을 확인하는 예시이며 실제 폼을 모두 이동했다는 뜻이 아니다. 적용/유지 범위와 실제 검증은 [footer 기록](footer-actions.md)을 참고한다.

## 제목·본문 공통화의 상태 유지 (2026-10-20)

AccountFormLayout·로그인/계정 찾기·가입·회원정보/배송지·쿠폰·주문·런클럽·검색·고객센터의 제목과 후속 그룹을 검토했다. ContentHeader와 ContentSection은 props를 표시하는 조합이며 새 상태·context·정규화·검증을 소유하지 않는다. 기존 form/onSubmit, 쿠폰 필터/등록/선택, 임직원 쿠폰의 ref와 높이 측정, 배송지 draft, 주문의 FormData/요청값 수명, 인증 타이머/약관, 런클럽 필터와 신청 콜백은 기존 소유자에 유지한다.

기존 기능 어댑터와 단일 child/Fragment 본문의 경계를 보존해 새 부모 gap이 폼 내부 간격이나 조건부 값 초기화를 바꾸지 않도록 했다. 포털과 모달은 현재 프레임/부모의 outsideContent 또는 dialogs 슬롯에 유지한다. title/headerProps와 custom header의 구분은 렌더링 API이며 상태 모델 변경은 없다. 검증 결과는 [이관 기록](content-sections.md)을 참고한다.

## 공통 폼 필드의 상태 소유권 (2026-10-20)

LoginForm과 가입·계정 찾기·휴대폰 인증·회원정보·문의·쿠폰·마이페이지의 필드 조합을 검토했다. TextFormField/의미별 필드는 기존 값·onChange·error를 받아 표시하며 검증·정규화·오류 초기화·로그인 저장·제출·라우팅의 소유권을 바꾸지 않는다. VerificationCountdown은 남은 초의 표시만 맡고 기존 카운트다운 생성·만료·재요청·인증 무효화는 부모와 기존 훅에 남긴다. split 이메일은 표시와 도메인 선택 콜백을 공유하고 중복확인 결과/정책은 RegistrationPage에 남긴다.

MyPageAddresses는 AddressFields에 draft 값·오류·모달 열림 상태를 전달한다. 입력/주소 반영 콜백을 통해 기존 draft를 갱신하며 기본배송지·추가·저장·삭제 로직은 그대로 유지한다. 결제는 기존 name/FormData·비제어 상세주소를 유지한다. disabled와 readOnly, 수동 필수 표시와 native required의 차이를 공통 필드에서 통일하지 않았다.

기존 폼·계정·주문 테스트 40개와 로그인·가입·계정 찾기·휴대폰 인증·재설정·결제의 Storybook 흐름, 마이페이지 배송지 저장·프로필 저장·문의 취소 값 유지 등을 확인했다. 검증 범위와 실제 API는 [이관 기록](form-fields.md#공통-필드-이관-결과-2026-10-20)을 참고한다. 세션·장바구니 공통 상태의 계약 변경은 없다.

## 장바구니 팝업과 배송지 구성의 상태 유지 (2026-10-20)

팝업 표시를 CartDialogs·CartLimitDialog로 분리했지만 CartPage가 편집 키·수량 제한·선택 상태를 소유한다. 저장 콜백은 기존 onOptionsChange/수량 변경 분기와 선택 키 치환 후 닫기를 유지한다. CheckoutShipping은 배송지 전환·주소 모달·우편번호·주소 상태를 소유하고, CheckoutDeliveryRequest가 배송 요청과 직접 입력 문구를 소유한다. 배송지 편집 모드 전환으로 이 요청 컴포넌트가 언마운트되지 않아 기존 요청값이 유지된다. CheckoutPage의 결제 수단·완료 상태와 CheckoutContent의 폼 검증·쿠폰·동의 상태는 변경하지 않았다.

출처는 위 cart/checkout 작업 트리 파일이다. 타입 검사·주문 합계 3개·Next/Storybook 빌드와 1600px/375px 브라우저의 옵션 저장/선택 유지/취소, 주소 모달 적용/배송지 전환 후 값 유지, 직접 요청사항·결제 수단·주문 완료를 확인했다. 실제 주소·결제 API 검증은 아니다. 구성과 재사용 판단은 [UI 기록](ui.md#장바구니-팝업과-결제-구성-분리-2026-10-20)을 참고한다.

## 장바구니 표현 분리와 상태 유지 (2026-10-20)

CartPage는 기존 선택·관심상품·옵션 편집 상태, 상품 조회와 합계 계산, 삭제·수량·옵션 저장 콜백을 계속 소유한다. CartContent와 CartItemRow에는 준비된 값과 명시적 콜백만 전달한다. 기존 4개 시안 상품의 초기 2개 선택, 품절 옵션 제한과 선택 상품 주문 URL은 유지한다. itemKey를 feature의 cart-item.ts로 이동했으며 상품 ID·색상·너비·사이즈 계약과 수량 변경 시 선택 유지 동작은 바뀌지 않는다.

쿠폰 선택/적용/취소, 로그인 상태와 저장소, ShopShell의 장바구니 수명은 변경하지 않았다. 로그인에 필요한 API 또는 라우트 변경도 없다.

## 계정 찾기 디자인과 데모 결과 연결 (2026-10-19)

`FindAccountPage`는 이름·휴대폰·인증번호와 3분 카운트다운을 소유한다. 휴대폰은 시안처럼 숫자로 표시하며 정보 변경 시 요청과 코드 오류를 초기화한다. 요청 안내에 예시 인증번호 `900668`과 실제 문자 미발송·예시 아이디 표시를 명시한다. 만료·자리수 오류·예시 코드 불일치를 구분하고, 일치하면 입력한 이름과 `honggildong`을 보여주는 기존 IdConfirmationModal을 연다. 실제 인증이나 계정 조회는 수행하지 않는다. 확인은 로그인, 비밀번호 재설정은 기존 `/login/find-account/password-reset`으로 이동한다.

`RememberIdHelp`는 로그인 내부의 Base UI Popover로 공용 장소에서 아이디 저장 시 주의사항을 보여준다. 로그인 상태·비밀번호 정책·아이디 저장 체크 처리·소셜 로그인 데모 계약은 유지한다. 작업 트리 출처는 `src/shared/features/login/LoginForm.tsx`, `src/shared/features/login/RememberIdHelp.tsx`, `src/shared/features/find-account/FindAccountPage.tsx`다.

## 장바구니 버튼 크기 명시 검토 (2026-10-19)

작업 트리 출처 `src/shared/features/cart/CartPage.tsx`의 삭제·주문하기 버튼에 short 크기를 명시했다. 삭제 콜백과 주문 이동 경로, 상품 선택·수량·금액 계산 및 장바구니 Context 상태 처리는 변경하지 않았다. 이번 검토는 버튼 크기 지정 범위이며 결제 서버 연동 검증을 의미하지 않는다.

## ShopShell

`src/shared/ShopShell.tsx`는 공통 레이아웃과 `ShopContext`를 제공한다. 상품 상세·장바구니·로그인·마이페이지의 App Router 페이지는 `useShop()`으로 상태와 콜백을 가져온다. `useShop()`은 `ShopShell` 아래에서 사용한다. `/checkout` 페이지도 같은 방식으로 장바구니를 읽고, 주문을 완료하면 `remove`로 항목을 비운다.

| 상태           | 보관 위치                                            | 수명                                                       |
| -------------- | ---------------------------------------------------- | ---------------------------------------------------------- |
| 장바구니       | `ShopShell`의 React 상태                             | 클라이언트 페이지 이동 중 유지, 새로고침 시 초기화         |
| 로그인         | React 상태와 `hoka-is-logged-in` localStorage 플래그 | 로그인·로그아웃 이벤트로 갱신, 새로고침 시 저장소에서 복원 |
| 플랫폼         | 서버가 선택한 값을 `PlatformProvider`에 전달         | 공통 레이아웃의 플랫폼 선택을 공유                         |
| 관심·최근 개수 | `ShopShell`의 상수                                   | 현재 데모 값은 각각 3, 7                                   |

로그인 플래그는 인증 토큰이 아니다. 로그인 화면은 영문·숫자 4자 이상 아이디와 영문·숫자·특수문자를 모두 포함한 공백 없는 10~12자 비밀번호를 검사하며 실제 자격 증명을 검증하지 않는다. 서버 렌더링과 첫 클라이언트 렌더의 로그인 표시는 hydration 상태로 맞춘다.

로그인 UI의 구조를 분리해도 `LoginPage`가 아이디·비밀번호·아이디 저장 체크·안내 상태, 데모 검증, `onLogin` 호출과 홈 이동을 계속 소유한다. `LoginContent`는 기능 내부 `LoginLayout`·`LoginForm`·`LoginMembership`를 조합하며, 폼의 `LoginActions`는 제출 버튼과 소셜 로그인 안내 콜백을 표시한다. 신규 상태 저장이나 실제 인증 연동은 추가하지 않았다. 제목 `login-title`, 입력 id/name/autocomplete, 필수 입력 검증, 안내 live region과 가입·계정 찾기 이동 계약을 보존한다.

로그인 액션과 회원가입 이동 버튼은 공통 `Button`·`ButtonLink`의 기본 `tall` 크기를 사용한다. 명시적 크기 속성만 정리했으며 `LoginPage`의 상태, 제출 및 이동 콜백은 변경하지 않았다. 출처는 작업 트리의 `src/shared/components/atoms/Button/Button.tsx`, `src/shared/features/login/LoginActions.tsx`, `src/shared/features/login/LoginMembership.tsx`다.

## 로그인 필드 오류

2026-10-19 전수 점검에서 로그인 오류 안내에 id를 주고 실제 오류 필드의 aria-describedby로 연결했다. 다른 페이지의 필드 상태는 각 부모가 소유하며 공통 컨트롤은 검증 규칙을 새로 만들지 않고 invalid/error를 표현한다. 휴대폰 인증은 noticeTone과 codeError를 분리하고 코드 입력·재요청·인증 정보 변경 시 코드 오류를 초기화한다. 전체 범위와 검증은 [전수 점검 보고서](../development/form-state-audit.md)에 기록한다.

첨부 디자인의 필드별 형식 안내가 빠져 있어 2026-10-19 후속 수정으로 `LoginNotice.invalidFields`를 `LoginForm.errors`로 대체했다. LoginPage는 최초 제출 후 현재 입력값에서 오류를 계산한다. 2026-10-20 일반 아이디 전환 이후 빈 아이디에는 “아이디를 입력해 주세요”, 형식 오류에는 “영문, 숫자 조합으로 4자 이상 입력해 주세요.”, 비밀번호 규칙 위반에는 “영문, 숫자, 특수문자를 모두 포함하여 10~12자로 입력해 주세요”를 전달한다. 값이 규칙에 맞아야 해당 오류가 해제되고 다시 잘못된 값으로 수정하면 재표시된다.

LoginForm은 `FormField.error`로 문구를 표시하고 TextInput은 Context를 통해 invalid와 해당 오류의 aria-describedby를 상속한다. `LoginNotice`는 성공·기능 미연결 안내만 담당한다. 폼의 noValidate와 required는 유지하고 형식 오류가 있으면 onLogin·홈 이동을 차단한다. Error·MobileError는 두 문구의 정적 예시이고, LoginFlow와 InvalidFormats는 실제 제출·수정 흐름을 검사한다. 후속 검증 결과와 작업 트리의 다른 화면 문법 오류로 인한 전체 검사 제한은 [UI 문서](ui.md#로그인-형식-오류-안내-보완-2026-10-19)에 기록한다.

## 회원가입·휴대폰 인증 오류 상태 보완 (2026-10-19)

일반 가입은 아이디 placeholder의 영문·숫자 4자 이상 조건을 실제 제출 검사에 연결한다. 빈 아이디에는 기존 필수 입력 문구를 유지하고 4자 미만·공백·특수문자가 포함된 아이디에는 “영문, 숫자 조합으로 4자 이상 입력해 주세요.”를 필드 오류로 표시한다. 소셜 가입에는 이 로컬 계정 조건을 적용하지 않는다.

이메일은 src/shared/lib/emailValidation.ts를 통해 일반 가입·회원정보 가입이 같은 형식과 오류 문구를 사용한다. 로그인은 2026-10-20부터 이메일 검사를 제거하고 일반 아이디를 검사한다. 회원정보의 분리된 이메일/도메인 입력도 동일한 부분 검사를 사용한다. 이메일 앞뒤 공백은 기존대로 제거하며 로컬 부분의 선행·후행·연속 점, 64자 초과 및 잘못된 도메인은 거부한다. 기존 일반 가입에서 통과하고 로그인에서 거부되던 점 없는 도메인 차이도 제거했다.

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

LoginLayout의 main·500px 중앙 폭 제한은 AccountPageLayout에 위임한다. LoginLayout은 기존 login-title 제목과 children 조합을 유지하며 새 Context·hook·client 경계를 추가하지 않는다. LoginPage의 아이디/비밀번호·아이디 저장·제출 여부·오류/성공 안내 상태, 입력 시 안내 초기화, 검증 성공 후 onLogin 호출과 홈 이동은 기존 책임을 유지한다. LoginForm·LoginContent·LoginPage의 상태 코드는 수정하지 않았다.

검증은 실제 LoginPage 코드와 기존 상태 설명을 대조했고, 웹/모바일 login-flow·invalid-formats Storybook play 4개와 default/mobile DOM·좌표 비교를 통과했다. 전체 타입 검사와 Next/Storybook 빌드도 통과했다. 이번 변경으로 데모 로그인 저장 방식이나 실제 인증 연동 범위는 달라지지 않는다. 출처는 frontmatter의 LoginPage·LoginContent·LoginLayout·AccountPageLayout과 기존 로그인 스토리다.

## 주문 프레임 공통화와 상태 유지 (2026-10-19)

주문 프레임 공통화에서는 CartPage의 main/header/StepIndicator를 OrderPageLayout에 위임했다. 수량·삭제 콜백·행 구성·총액 계산은 수정하지 않았다. CheckoutLayout은 completed에 따라 단계 2/3과 기존 제목을 전달하고 CheckoutPage의 입력·검증·완료·onComplete 상태 코드는 수정하지 않았다. 주문 합계 테스트 3개, 결제 완료 웹/모바일 play 2개, 장바구니 실제 경로와 주문 상태의 DOM·좌표 비교 6건으로 기존 계약을 확인했다.

## 장바구니·결제 모바일 시안 (2026-10-19)

`ShopShell`은 퍼블리싱 미리보기에 4개 장바구니 목 항목을 초기화한다. 장바구니의 선택 상태는 `CartPage`가 소유하며 선택 키를 `/checkout?selected=...`에 전달한다. `CheckoutPage`는 URL 키에 맞는 항목만 합산하고 완료 시 기존 `onComplete`로 장바구니를 비운다. 화면의 결제 수단과 완료 상태는 데모이며 실제 결제 승인·주소 변경·쿠폰 조회와 연동하지 않는다. 출처는 작업 트리의 `src/shared/ShopShell.tsx`, `src/shared/features/cart/CartPage.tsx`, `src/shared/features/checkout/CheckoutPage.tsx`다.

## 장바구니 옵션과 결제 쿠폰 미리보기 (2026-10-19)

CartOptionsDialog는 발볼·컬러·사이즈·수량 초안을 관리한다. 저장 시 ShopShell.updateOptions가 동일 옵션을 합치며 선택 키도 새 옵션으로 교체한다. 기존 수량 변경 콜백은 유지한다. 관심상품 버튼은 화면 내부 토글 상태다. 품절 옵션 변경 시 단일 확인 안내를 표시한다.

CheckoutContent의 쿠폰 할인액은 요약과 결제 버튼에 함께 반영한다. CouponDialog는 상품별 10%/7%와 장바구니 정액 쿠폰을 선택하는 퍼블리싱 데모이며 닫기는 미적용 변경을 되돌린다. 배송지는 기존 정보/직접 입력으로 전환하며 주소 찾기는 기존 AddressSearchModal의 수동 미리보기를 사용한다. 배송 요청 직접 입력은 250자로 제한한다. CheckoutPage.onComplete는 실제 선택한 CartItem 목록을 전달하고 라우트가 해당 상품만 제거한다. 쿠폰 발급·저장 배송지·관심상품·결제 승인 서버 연동은 포함하지 않는다.

출처는 작업 트리의 ShopShell.tsx, CartPage.tsx, CartOptionsDialog.tsx, CheckoutPage.tsx, CheckoutContent.tsx, CouponDialog.tsx 및 src/app/checkout/page.tsx다. 타입 검사·주문 합계 테스트 3개·Next production build를 확인했고 브라우저에서 사이즈 저장과 선택 상품 주문 이동, 528,000원에서 상품 28,800원+장바구니 5,000원 할인 후 494,200원 표시를 확인했다.

## 장바구니 옵션 확인 상태 유지 (2026-10-20)

CartOptionsDialog가 기존 draft와 발볼/색상별 사이즈·품절 상태에서 valid를 계산한다. ConfirmDialog는 confirmDisabled=!valid를 받아 확인 버튼만 비활성화하며 검증·옵션 변경·저장은 상위 기능에 남는다. 확인은 onSave(draft), 취소/닫기는 onClose를 호출한다. 공용 다이얼로그는 임의로 저장하거나 확인 후 닫지 않는다. 출처는 frontmatter의 CartOptionsDialog/ConfirmDialog 작업 트리 파일이다. 타입 검사·변경 ESLint를 확인했으며 브라우저 동작은 재검증하지 않았다.

## 일반 아이디 로그인 전환 (2026-10-20)

LoginPage가 `^[a-zA-Z0-9]{4,}$`로 아이디를 검사한다. 영문만·숫자만·혼합을 허용하고 4자 미만·공백·한글·특수문자·이메일 주소를 거부한다. 공백을 자동 제거하지 않으며 비밀번호 정책은 유지한다. 빈 값과 형식 오류를 구분하고 최초 제출 이후 수정 시 오류를 갱신한다. 기존 onLogin·홈 이동·데모 안내와 아이디 저장 체크 상태는 유지한다. IdConfirmationModal은 첨부 설계서의 예시 `honggildong`을 표시하며 실제 인증·계정 조회를 추가하지 않는다.

## 주문 화면 시각 보정의 상태 보존 (2026-10-21)

CartItemRow·CartOptionsDialog의 변경은 모바일 배치·이미지 크기·본문 패딩 보정과 표시 줄바꿈에 한정한다. 선택·수량·옵션 draft·valid·onSave·onClose와 상위 CartPage/ShopShell 상태 코드는 변경하지 않았다. 금액과 선택 수, 품절 상품 주문 제외, 수량 제한, 주문 상태별 행동과 조회 기간의 설계 변경은 사용자 요청에 따라 적용하지 않는다. CouponProductItem도 Collapsible 기본 버튼을 사용하지만 기존 open/onOpenChange와 쿠폰 선택 상태를 유지한다. 관련 UI 기록은 [시각 오차 보정](ui.md#주문-화면-시각-오차-보정-2026-10-21)을 참고한다.

작업 트리 출처는 CartItemRow.tsx·CartOptionsDialog.tsx와 ui.md의 결제 표시 컴포넌트다. 타입 검사·변경 TSX ESLint를 통과했고 모바일 기존 쿠폰 선택의 적용 금액을 브라우저에서 확인했다. 실제 주문·결제 서버 연결을 추가하거나 검증하지 않았다.

## 주문 화면 공통 프리미티브 보완의 상태 유지 (2026-10-21)

CartItemRow 삭제 버튼을 IconButton·Icon으로 바꿨으며 기존 aria-label·onRemove를 전달한다. 이미지 square 패턴·Circle·Stack 간격 이전은 표시 책임만 바꾸고 상품 선택·옵션 draft·수량·쿠폰 계산·완료 상태 소유권을 유지한다. 모바일 Storybook에서 삭제 클릭 후 해당 행 제거, 선택상품 2→1개, 합계 528,000→288,000원 갱신을 확인했다. 신규 상태나 실제 주문/결제 연동은 추가하지 않았다. 관련 출처와 DOM 유지 근거는 [UI 기록](ui.md#주문-화면-공통-프리미티브-보완-2026-10-21)을 참고한다.

## 주문 화면 구성 분리 후 상태 소유권 (2026-10-21)

CartPage의 selected/favorites/editingKey/limited와 ShopShell 콜백은 유지한다. CartSelectionBar·CartProductList·CartSupportInfo·OrderProductSummary는 준비된 값과 기존 콜백만 받는다. CartOptionsDialog가 기존 draft·valid와 저장/취소를 소유하고 CartOptionsContent는 값·옵션·변경 콜백만 받는다. Wishlist는 기존 favorites를 BaseToggle의 controlled pressed에 연결한다. ProductOptionList도 기존 색상값과 onSelect를 받아 옵션 정책을 계산하지 않는다.

CheckoutPage는 URL selected·payment/completed·onComplete 책임을 유지하고, 이전 CheckoutContent의 errors/couponOpen/discount/agreed/agreementError와 FormData 검증은 동일 수명 위치의 CheckoutForm으로 옮겼다. CheckoutContent는 상태 없는 구성 컴포넌트다. form noValidate·onInput 오류 해제·onSubmit의 빈 값/동의 확인·실제 onSubmit 호출 조건과 완료/빈 상품의 form 외부 분기를 보존한다. CouponDialog의 초안/적용/닫기 복원은 바꾸지 않았고 AmountRow/OrderProductSummary는 계산값을 표시한다. CheckoutPayment는 공통 Radio를 사용하되 기존 paymentMethod 이름·값과 상위 payment setter를 보존한다. 정책·가격·조회 기간·품절 처리를 변경하지 않았다.

검증과 관련 출처는 [구성 분리 UI 기록](ui.md#주문-화면-구성-분리와-재사용-2026-10-21)을 참고한다. 모바일 기존 Selection과 옵션 저장의 목록 반영을 브라우저에서 확인했다.

후속 검증: 모바일/PC 기존 CompleteOrder와 CouponSelection 결과, ProductOptionList Cart·Wishlist Labelled play의 최종 선택 상태를 확인했다. CheckoutForm의 완료/쿠폰 흐름과 공통 Radio의 결제수단 선택 상태를 유지한다. 주문 합계 테스트 3개를 통과했다.

## 모바일 장바구니 품절 선택과 옵션 상태 (2026-10-23)

CartPage는 기존 선택·관심상품·옵션 편집 상태와 저장 콜백을 계속 소유한다. `isCartItemSoldOut`은 일치하는 색상·발볼의 soldOut을 우선하고 해당 옵션이 없으면 상품 soldOut으로 판정한다. 동일 판정을 카드의 비활성 체크박스·전체 선택 대상·품절 삭제·기존 변경 제한 안내에 적용한다. 품절 행은 전체 행 수에 포함하지만 선택 키와 합계 및 주문 링크에는 포함하지 않는다. 모든 행이 품절이면 전체 선택 체크박스는 체크되지 않는다.

금액은 실제 카탈로그 가격×수량 계산을 유지하며 첨부의 예시 가격을 데이터에 덮어쓰지 않는다. 옵션 draft·valid·확인 저장·취소 복원·선택 키 교체와 ShopShell의 병합 콜백도 유지한다. 수량 선택기의 boxed 타입은 표시만 바꾸며 새 구매 수량 제한이나 서버 검증을 도입하지 않는다. 기존 품절 옵션의 안내 팝업을 디자인에 맞춰 표시한다.

작업 트리 출처는 CartPage.tsx, cart-item.ts, CartItemRow.tsx, CartOptionsDialog.tsx와 CartPage.scenarios.tsx다. 모바일 SoldOut 시나리오에서 품절 체크박스의 aria-disabled와 전체 선택 후 3/4 표시를 확인했고, OptionSave 시나리오에서 사이즈 저장 후 2/4 선택 유지와 재편집 취소를 확인했다. 수량 1→2→1과 최솟값에서 감소 비활성도 브라우저로 확인했다. [UI 기록](ui.md#모바일-장바구니-시안-적용-2026-10-23)은 표시와 공통 컴포넌트의 변경을 설명한다.

## 장바구니 표시 데이터 준비 경계 보완 (2026-10-23)

CartPage가 선택 가능한 키로 allSelected와 선택 상품 주문 checkoutHref를 계산한다. CartContent에는 allKeys 대신 준비된 boolean·URL을 전달하며, 기능 내부 CartOrderActions는 total과 checkoutHref의 존재에 따라 금액 및 링크/비활성 버튼만 표시한다. 선택·합계·품절 판정·옵션 draft·저장/취소의 수명이나 계산 방식은 바꾸지 않는다. 브라우저의 기존 MobileSelection·MobileOptionSave에서 선택 해제 시 주문 비활성과 옵션 저장/취소 후 2/4 선택 및 사이즈 유지가 확인됐다. 출처는 CartPage.tsx, CartContent.tsx와 CartOrderActions.tsx의 작업 트리다. UI 경계는 [재사용 적용](ui.md#장바구니-재사용-점검-후-적용-2026-10-23)을 참고한다.
