---
type: Report
title: '전체 소스 컴포넌트 재사용 재점검 (2026-10-21)'
description: '최신 공용 API와 소비처를 대조해 기존 컴포넌트 활용, 추출 후보, 유지 근거를 구분한다.'
tags: [components, reuse, audit, base-ui, panda-css, typography]
status: draft
generated:
  by: codex/gpt-6
  at: '2026-10-21T07:50:46Z'
source_revision: c9e8b1a75bdd4a2d52308410b8ce77773464a9e6
sources:
  - id: repository
    resource: https://github.com/nalpari/hoka-fo-pub/tree/c9e8b1a75bdd4a2d52308410b8ce77773464a9e6/src
    title: '조사한 소스 트리'
  - id: package-lock
    resource: https://github.com/nalpari/hoka-fo-pub/blob/c9e8b1a75bdd4a2d52308410b8ce77773464a9e6/package-lock.json
    title: '의존성 잠금 파일; 실제 설치된 Base UI 1.8.0 exports도 확인'
  - id: panda
    resource: https://github.com/nalpari/hoka-fo-pub/blob/c9e8b1a75bdd4a2d52308410b8ce77773464a9e6/panda.config.ts
    title: 'Panda 토큰·반응형 조건'
  - id: skill
    resource: https://github.com/nalpari/hoka-fo-pub/blob/c9e8b1a75bdd4a2d52308410b8ce77773464a9e6/.codex/skills/component-reusability/SKILL.md
    title: '사용자가 지정한 조사 기준'
  - id: base-catalogue
    resource: https://base-ui.com/react/overview/quick-start
    title: '공식 Base UI 전체 카탈로그, 2026-10-21 열람'
  - id: base-autocomplete
    resource: https://base-ui.com/react/components/autocomplete
    title: '공식 Autocomplete'
  - id: base-navigation
    resource: https://base-ui.com/react/components/navigation-menu
    title: '공식 Navigation Menu'
  - id: base-dialog
    resource: https://base-ui.com/react/components/dialog
    title: '공식 Dialog'
---

# 전체 소스 컴포넌트 재사용 재점검

2026-10-21 기준 재조사다. 이전 조사 목록을 그대로 옮기지 않고 현재 소스/공용 API/소비처를 다시 확인했다. 결과는 **기존 컴포넌트 활용·표현 정리 7개, 추출/API 개선 주제 9개, Base UI 구성 후보 3개, 텍스트 스케일 후보 1개**다. 이는 개선 주제 수이며 새로 만들 컴포넌트 수나 버그 수가 아니다. 가벼운 정리와 구조 개선의 우선순위는 다르다.

추천 순서는 **AmountRow 재사용 → 추천 상품 데이터 주입 → 소셜 인증 버튼 → compact 입력 → 홈 모바일 레일 → 마이페이지의 기능 내부 구성**이다. 검색/PC 메뉴의 Base UI 변경은 별도 상호작용 검증 단위로 진행한다. 아래 조사 표는 변경 전 상태를 기록한다. 사용자 후속 요청에 따라 코드에 적용한 결과는 마지막 적용 기록에 구분했으며 의존성 업그레이드는 없다.

## 범위·방법·검증 한계

- src 전체 833파일: TSX 784개, TS 48개, global.scss 1개. 이 중 운영/공용/앱 코드 601개(TSX 556·TS 45), Storybook/시나리오 218개(TSX 216·TS 2), 개발 안내/타입 fixture 9개(TSX 8·TS 1), Mockup 4개를 구분했다. generated styled-system·node_modules·.next·빌드 산출물은 소비 소스 집계에서 제외했다.
- 운영/공용 601개는 app 57개, components 244개, features 287개, 기타 data/mocks/context/lib/types 13개다. components에는 atoms 47·molecules 79·organisms 102·layouts 16개가 포함된다. 파일 수이며 export된 컴포넌트 수가 아니다.
- src 외의 Panda/ESLint/PostCSS/Storybook 설정, scripts와 tests는 보조 검색·구조 검토 대상이다. 자동 생성 next-env.d.ts와 임시 검사 스크립트는 재사용 후보가 아니다.
- TypeScript AST로 전체 TS/TSX의 import·JSX 태그·native 속성·레이아웃/타입 속성·스타일 선언·수동 상호작용 신호를 스캔하고, 중복 후보와 관련 공용 API·호출자를 원문으로 추적했다. 모든 소스 줄의 수동 리뷰나 동작 검증을 완료했다는 뜻은 아니다.
- 검색 신호는 native JSX 작성 위치 263개, 타입 속성 선언 460개/36파일, inline style 41곳/29파일, selector 키 240개였다. 대부분 토큰/아이콘/variant/동적 CSS 변수이며 이 수를 결함이나 이관 대상으로 해석하지 않는다. 동일 web/mo Typography는 2파일 4곳이다.
- css/css.raw의 동일 객체 중 9개 반복 그룹을 확인했다. 태그 모양만 같은 JSX 3그룹도 대조했지만 모두 같은 의미의 재사용 계약은 아니었다. 기능적 의미를 읽은 뒤 아래에 분류했다.
- 설치된 @base-ui/react **1.8.0**의 package exports와 [공식 전체 카탈로그](https://base-ui.com/react/overview/quick-start)를 대조했다. 문서의 최신 API를 설치 버전에 그대로 적용할 수 있다고 가정하지 않았다. 아래 제안 primitive는 모두 설치 버전에 있어 업그레이드가 필요하지 않다.
- 소스 분석·문서 포맷·링크/범위 검사를 수행한다. 타입 검사·Panda 생성·빌드·Storybook play·브라우저 비교는 이번 조사에서 실행하지 않았다. 과거 이관의 검증을 이번 후보 검증으로 재사용하지 않는다.

## 1. immediate improvement — 기존 컴포넌트 활용·작은 표현 정리

| ID / 우선순위 | 관찰한 위치와 패턴                                                                                                                                                                                                                                                                                   | 제안 API·소유자                                                                                                                                                                                                                                                                 | 보존할 계약                                                                                                                                                                                                                     |
| ------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| I1 / 높음     | [CartContent:82](../../src/shared/features/cart/CartContent.tsx)의 결제예정금액 HStack은 [AmountRow:15](../../src/shared/components/molecules/AmountRow/AmountRow.tsx)의 label/body4 + 강조 금액/body3 semibold와 일치한다. AmountRow는 CheckoutDiscountSummary·CouponAmountSummary에서 이미 쓰인다. | AmountRow를 shared/components/molecules/AmountRow로 승격하고 cart·checkout에서 공용 사용. `label`, `amount`, `emphasis`, `emphasizeLabel`, `discount`, `action`, 기존 HStack props 유지. 장바구니는 `label="결제예정금액" amount={total} emphasis px="4" py="5" bg="black.10"`. | 합계 계산은 CartPage/checkout-summary에 유지. 기존 div/HStack·금액 로케일·원 suffix·정렬·배경·PC/MO 값 보존. 새 공용 스토리 및 세 소비처 확인. 기능 간 역방향 import로 cart가 checkout 파일을 직접 사용하게 만들지 않는다.      |
| I2 / 중간     | [RunClubFilters:31](../../src/shared/features/run-club/RunClubFilters.tsx)는 role=group 안의 Button aria-pressed/선택 값을 직접 관리한다. [SizeGuideChoiceGroup](../../src/shared/features/size-guide/SizeGuideChoiceGroup.tsx)은 같은 단일 선택 계약을 SegmentedControl.unstyled로 조합한다.        | 기존 `SegmentedControl unstyled options value onValueChange itemRender itemClassName` 사용. feature의 filters/PC·MO label은 RunClubFilters에 유지.                                                                                                                              | Base UI **Toggle Group/Toggle**, 1.8.0 지원, 업그레이드 불필요. PC gap=4/MO2·120px 최소 폭/MO32px 높이·선택 primary/secondary·항상 한 값 유지. 기본 FilterTabs의 스크롤/타입 스케일을 강제하지 말고 keyboard/재선택을 확인한다. |
| I3 / 낮음     | [Fieldset:7](../../src/shared/components/atoms/Fieldset/Fieldset.tsx), [DataTable:38](../../src/shared/components/atoms/DataTable/DataTable.tsx)에 동일한 visuallyHidden 객체가 있다.                                                                                                                | 숨긴 텍스트에 기존 `Typography as="legend" srOnly` / `as="caption" srOnly` 조합을 검토한다. 별도 숨김 유틸 컴포넌트를 새로 만들 필요는 없다.                                                                                                                                    | fieldset 첫 legend·table caption의 태그/이름 유지. 기본 unstyled와 p=0·기존 bold는 별도 css로 보존해야 한다(unstyled의 weight는 적용되지 않음). 보이는 legend 분기 및 srOnly의 1px/clip·margin 차이를 확인한다.                 |
| I4 / 낮음     | [OrderRecommendationItem:24,27,30](../../src/shared/components/organisms/OrderRecommendations/OrderRecommendationItem.tsx), [FaqQuestion:9](../../src/shared/components/organisms/Faq/FaqQuestion.tsx)의 web/mo 값이 각각 동일하다.                                                                  | 기존 Typography의 `variant="body5"` / `variant="body2"`로 통합.                                                                                                                                                                                                                 | span/p 등의 실제 tag·semibold·lineClamp=2·한글 자동 variant·기본 fallback 보존. 새 스케일을 만들지 않는다.                                                                                                                      |
| I5 / 낮음     | [EmptyStateDescription:95](../../src/shared/components/atoms/EmptyState/EmptyState.tsx), [CardDescription:47](../../src/shared/components/atoms/Card/Card.tsx)은 텍스트 p를 직접 출력한다.                                                                                                           | 기존 `Typography as="p"`의 unstyled 표현 사용 가능. 공용 컴포넌트 공개 API는 유지.                                                                                                                                                                                              | native paragraph attrs/ref 전달과 empty-state__description/card__description class·부모 스타일·기본 margin을 보존한다. CardTitle의 임의 ElementType 및 아이콘 전용 span까지 일괄 변경하지 않는다.                               |
| I6 / 낮음     | [ProductAfterSalesContacts:11,17](../../src/shared/features/product/ProductAfterSalesContacts.tsx)의 contact/action css는 각 private Grid 한 작성 위치에만 연결되는 고정 레이아웃이다.                                                                                                               | 기존 Grid에 columns·alignItems·gap·pb·borderBottom·_mobile을 직접 props로 옮기고 해당 styles 멤버 제거 가능.                                                                                                                                                                    | contact의 minmax(140px,1fr)/2fr·PC pb8/MO6·gap6/MO3, action의 minmax(0,1fr)/auto·MO1열/justifyItems=start 유지. 가로 Grid를 ContentSection 세로 footer로 바꾸지 않는다. link 클래스는 native/Next Link용으로 남길 수 있다.      |
| I7 / 낮음     | [MyPageRewards:131](../../src/shared/features/mypage/MyPageRewards.tsx)의 등급 이니셜 Box는 48×48, full rounding, 가운데 정렬이다.                                                                                                                                                                   | Panda `Circle size="12"` 검토. 별도 TierIcon 공용 컴포넌트까지 만들 근거는 없다.                                                                                                                                                                                                | div 의미·48px·tier 색 변수·글자 스타일 보존. grid→기본 flex의 centering/축소 차이와 기존 display/placeItems 중복을 확인한다.                                                                                                    |

## 2. extraction candidate — 공용 API와 기능 내부 구성

각 항목은 추출하거나 API를 바꿀 근거가 있으나, 새 추상화를 넣기 전에 명시한 차이를 보존해야 한다.

| ID / 우선순위 | 관찰한 패턴과 실제 소비처                                                                                                                                                                                                                                                                                                   | 제안 책임·소유 폴더·API                                                                                                                                                                                                                              | 이유와 보존 조건                                                                                                                                                                                                                                                                                                                                          |
| ------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| E1 / 높음     | [OrderRecommendations:3–9](../../src/shared/components/organisms/OrderRecommendations/OrderRecommendations.tsx)가 products와 recommendationImages를 직접 가져와 첫 4개를 모듈 상수로 선택한다. CartContent와 CheckoutComplete 두 feature에서 사용한다.                                                                      | 기존 organism의 데이터 주입: `OrderRecommendations({ items: readonly OrderRecommendation[], title? })`; 항목은 `id/name/gender/price/imageSrc/href`처럼 준비된 표시 데이터. 기본 mock 공급은 feature/story fixture가 소유.                           | 공용 UI가 특정 mock 배열 순서/이미지 인덱스에 고정되지 않아 실제 추천 데이터에도 재사용 가능. 4개 선택 정책·이미지 fallback·순서·href·140px 카드/정사각 이미지·두 줄 제목을 보존한다. ProductCard/Thumbnail의 3:4 비율·한 줄 이름·listing/showcase 타이포를 강제하지 않는다. type-only Product 참조와 runtime mock import를 구분한다.                     |
| E2 / 높음     | [LoginActions:6,32](../../src/shared/features/login/LoginActions.tsx), [SignupMethodButton:13,54](../../src/shared/components/organisms/Signup/SignupMethodButton.tsx)에 카카오/네이버 색·아이콘·버튼 조합이 반복된다.                                                                                                      | molecule `SocialAuthButton({ provider: 'kakao'                                                                                                                                                                                                       | 'naver', children, onClick, size, appearance: 'login'                                                                                                                                                                                                                                                                                                     | 'signup' })`. 각 기존 feature 어댑터는 문구/업무 콜백을 유지한다. | 두 feature의 브랜드 표현을 모은다. login은 hover 변수가 명시되고 signup은 border/inline 변수가 달라 단일 고정 스타일로 덮지 않는다. cva.raw/css.raw를 먼저 병합하고 기존 tall·18px 아이콘·type=button·서비스 미연결 안내를 보존한다. 일반 아이디 로그인 submit/local 가입 버튼과 Footer SocialIconLink는 별개다. |
| E3 / 높음     | [CheckoutShippingInput:4](../../src/shared/components/atoms/TextInput/TextInput.tsx)와 [AddressField:19](../../src/shared/components/organisms/Address/AddressField.tsx)의 compactInput은 8개 스타일 속성이 같다. 배송 받는 분·전화·기존 주소와 compact 주소 입력에서 반복된다.                                             | 기존 atom `TextInput`에 `appearance="compact"`를 검토한다. compact branch는 native input을 유지하며 기존 TextInput/FormField의 기본 boxed 표현과 분리한다.                                                                                           | width100%·border0·transparent·black100·14px/1.3·1px focus outline 보존. defaultValue/name/FormData·제어/비제어·우편번호 readOnly·aria-invalid와 ref를 유지한다. 기본 TextInput의 minH42/패딩/focus2px·비밀번호/clearable wrapper를 그대로 적용하면 다른 화면이 된다. 입력 글꼴은 control 토큰으로 관리하며 입력을 Typography 텍스트 노드로 감싸지 않는다. |
| E4 / 중간     | [RegistrationField:12](../../src/shared/features/signup-registration/RegistrationField.tsx), [EmailAddressFields:10](../../src/shared/components/organisms/EmailAddressFields/EmailAddressFields.tsx), [AddressField:29](../../src/shared/components/organisms/Address/AddressField.tsx)에 disabledInput css가 반복된다.    | TextInput의 명시적 `disabledAppearance="muted"` 같은 제한된 표현 variant 또는 기존 boxed disabled 스타일 계약 보완. 이를 사용하는 field adapter는 유지한다.                                                                                          | 정적인 회색/opacity/커서를 공통화하되 입력 비활성 정책은 각 feature가 소유. 현재 textInput·boxedControl의 `&&`·caller class가 겹치므로 raw object 병합/조건 우선순위와 계산 색상을 먼저 확인한다. 현재 버그라고 단정하지 않는다. 주소 readOnly를 disabled로 바꾸거나 FormData에서 필드를 빼면 안 된다.                                                    |
| E5 / 중간     | [HomeCategorySection:7](../../src/shared/features/home/HomeCategorySection.tsx), [HomeShoeFinderSection:10](../../src/shared/features/home/HomeShoeFinderSection.tsx)의 mobileRail은 완전히 같고 ProductDetailRecommend의 8px wrapper padding도 같은 값이다. 이미 공용 HomeCarouselSection/Rail을 사용한다.                 | 기존 `HomeCarouselRail`의 `mobileRail="bleed"` 같은 레일 표현 preset으로 이동. typed prop을 HomeCarouselSection에서 전달하고 공통 TSX에 스타일을 둔다.                                                                                               | 새 styles.ts나 복제 캐러셀을 만들지 않는다. 100vw·pr16px!·overflow visible!·swiper-wrapper px8을 보존. **slide 폭은 합치지 않음**: 카테고리 calc(83.2vw+16px), ShoeFinder min(67.466…vw,253px), 상세 추천 160px/gutter와 홈 375→768 유동 스케일은 별도 계약이다.                                                                                          |
| E6 / 중간     | [InquiryFormActions:8](../../src/shared/features/support/InquiryFormActions.tsx), [MyPageAddresses:322](../../src/shared/features/mypage/MyPageAddresses.tsx), [MyPageProfile:202](../../src/shared/features/mypage/MyPageProfile.tsx)의 취소/저장 쌍. ConfirmDialog 내부에도 유사한 행동 그룹이 있으나 모달 간격은 다르다. | molecule `FormActionGroup({ secondary, primary, direction?, ...layoutProps })` 또는 명시적 cancel/submit 구성. 일관된 균등 폭/가로 그룹을 소유하고 라벨·onCancel·submit/form/disabled·버튼 size를 전달한다.                                          | 공통화할 것은 폼 액션 배치와 native 버튼 의미다. Inquiry PC maxW368/pt6·MO pt0, 프로필 pt3/기본 크기, 주소 short/tall 분기를 보존. form 안에 남기거나 form id로 연결하며 Enter/취소 타입/validation을 확인한다. 모달 footer·OrderActionBar·고정 구매 바는 합치지 않는다.                                                                                  |
| E7 / 낮음     | [ProductSupportContact:5](../../src/shared/features/product/ProductSupportContact.tsx)와 [ProductDetailShippingGuide:8](../../src/shared/features/product/ProductDetailShippingGuide.tsx)의 textLink 스타일은 같고 tel/내부 경로에 쓰인다.                                                                                  | product 기능 내부 `ProductSupportTextLink({ href, children, ...anchorProps })` 검토. 밑줄/현재 글자·focus 계약을 소유한다.                                                                                                                           | 기존 공용 atoms/Link는 bold·고정 크기·모바일 offset·hover가 다르므로 바로 치환하지 않는다. tel/내부 Next Link, 3px underline offset/4px focus offset 유지. A/S 링크의 외부 새 창/서로 다른 focus 계약까지 합치지 않는다. 두 줄 css만 공유하는 styles.ts 대신 의미 있는 링크 책임이 있을 때 추출한다.                                                      |
| E8 / 높음     | [MyPageAddresses:68](../../src/shared/features/mypage/MyPageAddresses.tsx)와 [MyPageProfile:44](../../src/shared/features/mypage/MyPageProfile.tsx)가 목록/조회·편집 폼·조건부 액션·모달·업무 상태를 함께 소유한다. 공용 필드/AddressFields는 이미 재사용한다.                                                              | **기능 내부** AddressesContent/AddressList/AddressEditor와 ProfileContent/ProfileReadView/ProfileEditForm 같은 독립 영역. `draft/errors/onFieldChange/onSubmit/onCancel` 등 준비된 값/콜백을 전달. 등록·검증·편집 상태는 현재 page/container에 둔다. | 줄 수가 아니라 조회/편집·주소 목록/폼의 변경 경계가 근거다. default 주소 하나 유지·새 ID 생성·삭제 모달·draft 수명·프로필 FormData/수신동의·취소/탈퇴의 상태를 보존한다. 두 페이지의 상태를 한 범용 useForm이나 공유 폼으로 묶지 않는다. 공용 atom 추가보다 우선할 수 있다.                                                                               |
| E9 / 낮음     | [MyPageRewards:145,184](../../src/shared/features/mypage/MyPageRewards.tsx)의 등급 혜택/공통 혜택은 번호·제목·보조 목록 구성이 반복된다.                                                                                                                                                                                    | mypage 내부 private `RewardBenefitItem({ number, children, details })`와 필요시 TierBenefitCard. 데이터는 typed `{ title, details }` 형태로 정리하되 사업 정책은 분리.                                                                               | 번호/본문의 gap1·내부 gap2·minW0을 소유한다. 기존 p/span 차이, 보조 목록 ・/• 표기·pl2 유무·상세 조건부 노출을 슬롯으로 보존한다. 한 기능의 혜택 UI를 전역 범용 BulletList로 승격하지 않는다.                                                                                                                                                             |

## 3. Base UI — extraction candidate와 전체 카탈로그 유지 판단

[공식 Autocomplete](https://base-ui.com/react/components/autocomplete)는 입력에 따른 제안을, [Navigation Menu](https://base-ui.com/react/components/navigation-menu)는 사이트 링크와 하위 메뉴를 구성한다. 아래는 문서와 실제 수동 이벤트 코드를 대조한 적용 후보이며 접근성 실패를 런타임으로 입증했다는 뜻이 아니다.

| ID  | 현재 증거                                                                                                                                                                                                                                                                                                                                                       | primitive / 설치 지원 / 업그레이드                                                                                        | 제안 소유자·API와 보존 조건                                                                                                                                                                                                                                                                                                                                 |
| --- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| B1  | [SearchDialog:44–91](../../src/shared/components/organisms/Search/SearchDialog.tsx)의 **PC 분기**는 Box role=dialog, document Escape/pointerdown/focusin, 검색 컨트롤 예외와 ResizeObserver 정렬을 직접 관리한다. MO는 이미 Dialog다.                                                                                                                           | **Dialog**; 1.8.0 지원; 업그레이드 불필요. 비모달/외부 trigger 구성은 설치된 Root/Popup API로 확인해야 한다.              | Search 내부 surface/root 조합을 먼저 정리하고 기존 Dialog를 PC에도 사용 검토. [공식 Dialog](https://base-ui.com/react/components/dialog)와 설치 타입 대조. PC 비모달 포커스·outside 예외·카트 기준 right 정렬·compact540/최근1024/기본544px·header 아래 배경·MO fullscreen/returnFocus 유지. ModalDialog를 그대로 넣어 PC 패널을 중앙 모달로 만들지 않는다. |
| B2  | [SearchOverlay:77](../../src/shared/components/organisms/Search/SearchOverlay.tsx)의 입력 matches ul/li/Button과 [HeaderSearch:43–70](../../src/shared/components/organisms/Layout/SiteHeader/HeaderSearch.tsx)의 aria-expanded/controls·ArrowDown 첫 버튼 focus가 따로 구성된다.                                                                               | **Autocomplete**; 1.8.0 지원; 업그레이드 불필요. Combobox도 설치되지만 현재 자유 검색어 입력의 1차 후보는 Autocomplete다. | Search 내부 SearchAutocompleteList/Region, `query/matches/onQueryChange/onSelect`를 통해 입력·활성 항목·목록 키보드 소유권 조합. router/history/추천 데이터는 SearchOverlay 유지. 자유 입력·한글 IME·Enter·최근 검색·PC9/MO3 제한·하이라이트·검색 오류 상태·패널과 외부 header 입력 연결 보존. B1과 동일 변경으로 무작정 합치지 않는다.                     |
| B3  | [SiteHeader:39–107](../../src/shared/components/organisms/Layout/SiteHeader/SiteHeader.tsx), [DesktopNavigation:96](../../src/shared/components/organisms/Layout/SiteHeader/DesktopNavigation.tsx), [MegaMenuPanel:37](../../src/shared/components/organisms/Layout/SiteHeader/MegaMenuPanel.tsx)의 hover/activeMenu/Escape·querySelector 포커스·Tab 경계 이동. | **Navigation Menu**; 1.8.0 지원; 업그레이드 불필요. 일반 Menu/Menubar로 링크 메뉴를 명령 UI로 바꾸지 않는다.              | SiteHeader 내부 DesktopNavigationRegion, `menus/activeMenu/onMenuChange/onNavigate` 조합. 직접 링크/하위 메뉴·header 높이·가로 위치/메가 패널·검색과 상호 배타·pointer hover·Shift+Tab/이전 메뉴/복원 포커스·모바일 Drawer 분리 보존.                                                                                                                       |

### 공식 카탈로그 37종과 설치 exports 대조

모든 이름을 설치 exports에 대조했다. 업그레이드가 필요한 후보는 발견하지 않았다. 이 표는 신규 primitive를 모두 도입하라는 제안이 아니다.

| 전체 카탈로그 범위                                                  | 관찰·판정                                                                                                                                                                                                                                                                                                                                     |
| ------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Accordion, Collapsible                                              | 공용 래퍼와 FAQ/문의/드로어 그룹을 유지. 단순 펼침마다 새 feature wrapper를 만들지 않는다.                                                                                                                                                                                                                                                    |
| Button, Checkbox, Checkbox Group, Radio Group, Toggle, Toggle Group | 기존 Button/Checkbox/Radio/Wishlist/SegmentedControl/FilterTabs·SizeSelector를 유지. I2는 기존 래퍼 재사용 후보다.                                                                                                                                                                                                                            |
| Field, Fieldset, Form, Input                                        | Field 기반 FormField + 공용 FormFields 재사용 유지. native fieldset/form/input이 계약을 충족하면 추가 Base primitive를 강제하지 않는다.                                                                                                                                                                                                       |
| Dialog, Drawer, Alert Dialog, Popover                               | MO Search·ModalDialog·BottomSheet·MenuDrawer·RememberIdHelp·TermsDateSelect를 유지. B1은 PC 예외다. ConfirmDialog의 파괴적 메시지라는 이유만으로 Alert Dialog로 일괄 교체하지 않는다. 외부 클릭 금지 등 의도 변경이 필요한 경우 별도 검토한다. 두 Popover의 hover/선택/arrow/플랫폼·포털 계약은 다르므로 지금 범용 Popup API로 합치지 않는다. |
| Autocomplete, Combobox                                              | B2. 도메인 선택 Dropdown을 자동완성 입력으로 바꾸거나 자유 검색을 고정 선택값으로 제한하지 않는다.                                                                                                                                                                                                                                            |
| Navigation Menu, Menu, Menubar, Context Menu                        | B3. 나머지는 명령 메뉴/우클릭 메뉴라는 증거가 없어 도입하지 않는다. native nav/Link 자체는 유지한다.                                                                                                                                                                                                                                          |
| Tabs, Select                                                        | SupportTabs·Dropdown은 이미 Base UI 기반. Select atom/배송 요청의 native select는 native 플랫폼 UI·키보드/폼 동작이 있어 자동 이관하지 않는다.                                                                                                                                                                                                |
| Number Field, Slider, Progress, Meter                               | NumberStepper·RangeInput·ProgressBar 유지. 수량/범위를 직접 재구현하지 않는다. 진행 상태를 Meter로 바꿀 근거가 없다.                                                                                                                                                                                                                          |
| Scroll Area                                                         | Carousel의 SimpleBar는 Swiper 동기화/드래그 표시 계약이 있다. 일반 overflow는 native로 충분하다. 단순 스크롤의 존재만으로 전면 교체하지 않는다.                                                                                                                                                                                               |
| OTP Field                                                           | 설치 지원됨. VerificationCodeField는 이미 한 input에 numeric/one-time-code/maxLength=6을 제공한다. 분할 입력/칸별 포커스 요구가 없어 새 OTP UI 도입 근거가 없다.                                                                                                                                                                              |
| Toast, Tooltip, Preview Card, Avatar, Switch, Toolbar               | 운영 화면에서 새 큐·전환·도구 모음·프리뷰 상호작용 요구를 확인하지 못했다. inline StatusMessage·도움말 Popover·선택 Radio/Toggle을 임의로 바꾸지 않는다.                                                                                                                                                                                      |

ProductDetailImageViewer는 페이지 본문 대체 section이며 ProductDetailPage가 원래 요소/scrollY를 저장하고 복원한다. Escape·초기 닫기 focus가 있다는 이유만으로 모달 Dialog라고 가정하지 않는다. 이미지 확대를 모달로 바꾸는 제품 요구는 이번 조사 범위가 아니다.

## 4. Panda·Typography 추가 판단

| 항목                                                                                                                    | 판단과 보존 기준                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| ----------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| T1: [ProductListTitle:6,24](../../src/shared/features/catalog/product-listing/ProductListTitle.tsx)의 로컬 모바일 scale | `heading`(headingKr7) + _mobile 24px/black/1.3 조합이다. 해당 조합을 정확히 보존하는 단일 기존 variant를 확인하지 못했다. 구현한다면 **catalogTitle** 같은 의미 variant와 PC/MO backing token을 Typography 공개 타입·recipe·global 토큰·스토리에 추가한다. PC는 기존 headingKr7의 Korean/--font-sizes-28/900/1.2/-0.02em, MO는 24px/900/1.3과 현재 font/spacing을 보존한다. 기존 tag는 span이며 이름 때문에 h1으로 바꾸지 않는다. 검색결과 제목·건수의 baseline/10px·12px gap과 대형 PC 토큰 확대도 유지한다. 조사만으로 새 variant를 추가하지 않았다. |
| control 타입                                                                                                            | compact 14px/1.3은 E3의 입력 계약. MyPageReviewSort의 16px/medium은 native Select의 타입이다. 텍스트용 Typography를 native input/select 대용으로 쓰지 않으며 control 스케일/표현 API로 다룬다.                                                                                                                                                                                                                                                                                                                                                         |
| CSS Modules·styles.ts                                                                                                   | src에서 *.module.scss·styles.ts/tsx를 발견하지 못했다. global.scss는 reset/font/token/반응형 전역 책임이므로 그 존재를 컴포넌트 SCSS 위반으로 집계하지 않는다.                                                                                                                                                                                                                                                                                                                                                                                         |
| inline style 41곳                                                                                                       | 다수는 Icon mask URL·size, Carousel 카드 개수/폭, Hero 진행률·변환, DescriptionList label width, caller style 전달이다. 정적 provider 스타일은 E2처럼 recipe로 옮길 후보지만 동적 CSS 변수와 ref 측정값을 Panda 정적 props로 일괄 치환하지 않는다.                                                                                                                                                                                                                                                                                                     |
| className 병합                                                                                                          | DataTable.spaced·MainContentCard header 등의 raw object 병합은 이미 적용됐다. caller class를 맨 뒤에 붙였다는 이유로 override를 보장하지 않는다. E4 구현 시 boxedControl의 &&와 disabled 색/배경을 실제 계산값으로 확인해야 한다. JSX props와 같은 CSS 속성을 중복으로 남기지 않는다.                                                                                                                                                                                                                                                                  |
| 반복 형제 여백                                                                                                          | AccountFormLayout의 헤더/본문 gap과 actions mt, PasswordReset의 form gap/버튼 mt는 서로 다른 간격이다. 현재 footer 기록의 유지 판단을 뒤집을 새 근거를 찾지 못했다. 음수 마진·sticky offset·조건부 메시지 여백을 일괄 gap으로 바꾸지 않는다.                                                                                                                                                                                                                                                                                                           |
| native 태그                                                                                                             | input/textarea/select/file, ul/li/dl/dt/dd, SVG·mark·장식 span, 측정/ref/외부 children의 무스타일 div는 각 계약을 유지. 발견된 native 태그 263개를 전부 이관 후보로 세지 않는다. 텍스트 p의 명확한 미적용 2곳은 I5로 분리했다.                                                                                                                                                                                                                                                                                                                         |

### 동일 css 객체 9그룹 재분류

| 반복 그룹                                                                                        | 결과                                                                                    |
| ------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------- |
| CheckoutShippingInput / AddressField.compactInput                                                | E3                                                                                      |
| ProductGallery 이미지 / HeaderLogo 이미지                                                        | object-fit contain/100% 크기만 같고 상품/로고/측정 계약이 다름. keep                    |
| ProductSupportContact / ProductDetailShippingGuide.textLink                                      | E7                                                                                      |
| IdentityVerificationContent / PasswordResetContent / FindAccountContent의 contentCss column/gap0 | 이미 AccountPageLayout 구성값이다. 동일 3속성만으로 새 공용 wrapper를 만들지 않음. keep |
| ProductAfterSalesContacts.link / Wishlist.text                                                   | underline/offset만 같고 외부 링크/선택 행동·스타일 범위가 다름. keep                    |
| HomeCategorySection / HomeShoeFinderSection.mobileRail                                           | E5                                                                                      |
| PhoneVerificationDetailDialog / FaqList의 borderBottom                                           | 단일 테두리 반복은 독립적 재사용 계약이 아님. keep                                      |
| RegistrationField / EmailAddressFields / AddressField.disabledInput                              | E4                                                                                      |
| Fieldset / DataTable.visuallyHidden                                                              | I3                                                                                      |

동일 JSX 태그열의 CheckoutDiscountSummary/CouponDetailsDialog/OrderProductSummary, SizeGuideMeasurementMethod/CouponCard, MyPageBenefitItem/MyPageRestockList는 각각 금액/쿠폰/상품 설명, 측정/쿠폰, 혜택/재입고라는 다른 역할이다. 태그 모양만 같다는 이유로 한 범용 목록·카드로 합치지 않았다.

## 5. keep — 기존 공통화와 책임 경계

- TextFormField/Name·Phone·Password·BirthDate·Email·VerificationCode·Textarea·PreferenceField, AddressFields/AddressSearchModal은 이미 공용화됐다. 같은 placeholder를 다시 감싸는 NameInput 같은 래퍼는 만들지 않는다. RegistrationField의 fieldKey/정보 매핑은 feature 어댑터로 유지하고 시각 스타일만 E4로 검토한다.
- ContentHeader(title/description/eyebrow/orientation/action)와 ContentSection(title/headerProps/footer)은 현재 API를 유지한다. SectionHeader의 divider/spacing/작은 eyebrow·PageHeader·AccountFormHeader 등 명시적 어댑터와 ContentLayout의 Breadcrumb/페이지 프레임을 이름만 보고 합치지 않는다.
- LoadMoreButton·PageActionButton은 이미 페이지 카운터/남은 개수와 폭/여백을 나눠 소유한다. SingleActionDialog 15파일·ConfirmDialog 7파일에서 공용 footer를 사용한다. 새로운 단일 확인/취소 팝업을 중복 추출하지 않는다.
- OrderProductSummary는 CartItemRow·CheckoutProductList·CouponProductItem 3파일에서 이미 재사용한다. ProductVariantSummary/ProductOptionList·Wishlist·Radio·NumberStepper도 유지한다. 결제 쿠폰 계산·장바구니 draft·사이즈 재설정은 feature 소유다.
- ContentFrame/PageFrame·SidebarColumns/SidebarNavigationLayout·CustomerCenterLayout/MyPageFrame의 폭/내비게이션/PC·MO 분리와 안전 영역은 의미 있는 작은 구성이다. DOM 하나라는 이유로 제거하거나 서로 다른 폭·메뉴를 하나의 만능 레이아웃으로 합치지 않는다.
- SizeGuideChoiceGroup/MeasurementMethod/Chart는 새로 공용·기능 내부 구성과 DataTable·SegmentedControl을 사용하고 있다. 사이즈표/단위/품목·발볼 정책은 feature에 유지한다. 겉모양이 pill이라는 이유로 FilterPillGroup의 다중 선택으로 바꾸지 않는다.
- useVerificationCountdown는 FindAccountPage·PhoneVerificationPage에 이미 공유된다. 이름·이메일 검증 공용 모듈도 유지한다. find-account.getPhoneDigits는 비숫자 전체 제거/11자리 제한, PhoneVerificationPage는 dash/공백만 제거 후 검사하므로 두 폰 검증을 동일 정책이라고 단정하지 않는다. 이 차이를 없애는 것은 별도 정책 변경이다.
- DescriptionList/ContactCard·DataRows/AccountDataList·StatePanel은 의미가 명확하다. 현재 DescriptionList와 DataRows의 직접 소비자는 각 1파일이며 RunClubFacts/상품 스펙·별도 빈 상태와 열/타입/태그 계약이 달라 즉시 통합 대상으로 올리지 않았다.
- ProductDetailImageViewer의 페이지 대체·원위치 복원, RunClubApplyButton/모바일 fixed bar, OrderActionBar, ProductPurchaseActions·ModalDialog/BottomSheet footer는 독립적인 표시/폼/포커스 계약을 유지한다.

### 기존 공용 컴포넌트의 직접 JSX 소비 파일 수

운영/공용/app 범위에서 `<이름>` JSX를 직접 작성한 파일 수다. 간접 소비자와 스토리는 제외하고 import 문자열의 부분 일치로 집계하지 않았다.

| 공용 API                                | 파일 수 |
| --------------------------------------- | ------: |
| TextFormField                           |      14 |
| ContentHeader                           |      27 |
| ContentSection                          |      60 |
| SingleActionDialog                      |      15 |
| ConfirmDialog                           |       7 |
| OrderProductSummary                     |       3 |
| SegmentedControl                        |       3 |
| HomeCarouselSection                     |       5 |
| SidebarColumns                          |       2 |
| DescriptionList / DataRows / StatePanel |    각 1 |

## 6. 전체 영역별 조사 범위

아래는 AST/import/JSX 전수 스캔의 포함 범위와 수동 후보 검토의 연결이다. 후보가 없는 행은 명확한 중복 계약을 추가로 확인하지 못했다는 뜻이며 제품 완성도·접근성·디자인 검증 완료를 뜻하지 않는다.

| feature               | TS/TSX 파일 | TSX | 검토 결과                                                                      |
| --------------------- | ----------: | --: | ------------------------------------------------------------------------------ |
| account-locked        |           3 |   3 | ContentHeader/SingleActionDialog·완료 footer 유지                              |
| care-guide            |           3 |   2 | 안내 데이터/목록 의미 유지                                                     |
| cart                  |          11 |  10 | I1/E1; CartProductList·OrderProductSummary·ConfirmDialog 유지                  |
| catalog               |          17 |  12 | T1; URL/필터/metadata 순수 모듈과 Layout/Content 분리 유지                     |
| checkout              |          24 |  23 | I1/E1/E3; AmountRow·OrderProductSummary·결제 form/고정 바 유지                 |
| collection            |           1 |   1 | 페이지 프레임/링크 유지                                                        |
| faq                   |           2 |   1 | I4; Accordion/Controls·더보기 유지                                             |
| find-account          |          11 |   9 | 공용 Field·Countdown·계정 모달 유지; 폰 정규화 차이 별도                       |
| home                  |           9 |   7 | E5; Hero/카드/유동 스케일·각 slide 폭 유지                                     |
| identity-verification |           3 |   3 | 기능 선택 카드·필드와 계정 프레임 유지                                         |
| locales               |           7 |   6 | 지역 그룹/국가 링크·flag 표현 유지                                             |
| login                 |           7 |   7 | E2; LoginForm·RememberIdHelp/Popover 유지                                      |
| mypage                |          39 |  36 | I7/E6/E8/E9; 조회·주소·혜택·리뷰 책임 경계 확인                                |
| not-found             |           2 |   2 | 상태별 아이콘/문구·ContentSection footer 유지                                  |
| notices               |           6 |   5 | 공용 NoticeContent/Heading·목록/상세·더보기 유지                               |
| phone-verification    |           9 |   8 | 기존 필드·Countdown 유지; OTP 도입 근거 없음                                   |
| product               |          43 |  41 | I6/E5/E7; 갤러리/페이지 뷰어·옵션/구매바·A/S 분리 유지                         |
| run-club              |          25 |  24 | I2; card/hero/facts/상태·fixed 신청 바 유지                                    |
| search                |           1 |   1 | SearchListingLayout/카탈로그 오케스트레이션 유지; 공용 Search organism은 B1/B2 |
| signup                |           2 |   2 | E2와 E1 비교; 기존 progress/안내 모달 유지                                     |
| signup-registration   |          11 |  10 | E4; fieldKey adapter·주소/이메일 공용화 유지                                   |
| signup-terms          |           5 |   5 | 공용 약관/Checkbox·모달·외부 actions/form 경계 유지                            |
| size-guide            |           9 |   8 | I2의 기존 참조; MeasurementMethod/ChoiceGroup/Chart/DataTable 재사용 유지      |
| state                 |           1 |   1 | StatePanel/EmptyState action 유지                                              |
| store-finder          |           2 |   1 | StoreResults/StoreMapPreview·SupportTabs·footer 유지                           |
| support               |          31 |  30 | E6; 문의 첨부/notice/공용 layout·guide panel 책임 유지                         |
| terms                 |           3 |   3 | Popover/Radio 및 TermsDocument의 의미·모바일 표시 유지                         |

components의 atoms/molecules/organisms/layouts도 동일 범위로 스캔했다. 헤더/검색은 B1–B3, 폼은 I2–I5/E3/E4/E6, 상품/홈은 I1/E1/E5/E7, 마이페이지는 E8/E9, 전역 표현은 I6/I7/T1로 판단했다. 앱 엔트리 57개는 경로/상태/라우트 래퍼로 유지하며 UI를 공유하기 위해 page 파일을 import하는 구성은 제안하지 않는다. Storybook·개발 문서·Mockup은 예시와 fixture를 운영 컴포넌트로 승격시키지 않고 분리해 집계했다.

## 7. 후속 구현 단위와 실제 확인한 것

1. I1 + E1: 장바구니/결제 표시의 재사용 경계 정리. 금액과 추천 데이터 계산은 기존 소유자에 둔다.
2. E2 + E3/E4: 소셜 버튼·입력 표현 공통화. provider hover/disabled·native form·비밀번호/필드 오류를 확인한다.
3. E5 + E8: 홈 레일과 마이페이지 private 구성. 각각 375/768과 PC/2560 조건, 조회/편집/취소/삭제 상태를 확인한다.
4. B1–B3: 기존 검색/메뉴 스토리에 키보드·IME·outside/복원 포커스 검증을 추가한 별도 이관. 설치 exports/type를 기준으로 API를 사용한다.
5. I3–I7/T1: 작은 표현·타입 스케일 정리를 해당 소비처와 공용 스토리에 묶어서 진행한다. 의미 없는 wrapper나 간격/태그 변경을 끼워 넣지 않는다.

실제 확인: 파일 분류/AST 스캔, 동일 스타일·JSX 신호 대조, 기존 API와 후보 호출자 원문, 설치 패키지 전체 exports, 공식 카탈로그/후보 문서, 832개 TS/TSX의 AST 구문 진단 0개와 공식 카탈로그 37종의 설치 exports 존재, Markdown 포맷·로컬 링크 37개·Git diff를 확인했다. 소스 이관·새 컴포넌트·새 스토리·의존성 변경·브라우저/빌드 검증은 수행하지 않았다.

## 8. 코드 적용 (2026-10-21)

사용자의 후속 “코드 적용” 요청으로 I1–I7, E1–E9, B1, T1을 적용했다. [공용 API와 실제 소비처](ui.md#전체-소스-재사용-조사-적용-2026-10-21), [상태 소유권](state.md#재사용-적용-후-상태-소유권-2026-10-21), [추천 fixture](../project.md#추천-상품-목-데이터-경계-2026-10-21)에 반영했다. 총 18개 조사 주제이며 새 컴포넌트 수를 뜻하지 않는다.

| 주제         | 결과                                                                                   |
| ------------ | -------------------------------------------------------------------------------------- |
| I1 / E1      | AmountRow 공용 승격·세 소비처, OrderRecommendations.items/title 주입·목 fixture 분리   |
| E2           | SocialAuthButton provider/appearance·로그인/가입 소비처와 공용 스토리                  |
| E3 / E4      | TextInput compact/muted 표현·주소/배송/가입/이메일 이관·얇은 배송 입력 어댑터 삭제     |
| E5           | HomeCarouselSection/Rail.mobileRail=bleed·세 소비처, 각 슬라이드 크기 유지             |
| E6           | FormActionGroup·문의/배송지 수정/회원정보 수정, 취소/제출 type 유지                    |
| E7 / E8 / E9 | product 지원 링크·마이페이지 목록/편집/조회 파일·혜택 번호행을 기능 내부 구성으로 분리 |
| I2–I7        | SegmentedControl·srOnly·같은 타입 variant·문단 Typography·Grid props·Circle 적용       |
| T1           | catalogTitle variant/PC·MO 토큰·공용 스토리, 기존 글자와 tag 유지                      |
| B1           | 비모달 Dialog, 헤더 내부 Portal host·외부 헤더 입력 예외·기존 정렬/포커스 소유권 유지  |
| B2 / B3      | 이번 표현 재사용 변경에서는 기존 구현 유지. 아래 계약 차이 참조                        |

B2의 Autocomplete.Input은 Root와 같은 문맥에서 하나의 combobox 입력을 등록한다. 현재 PC HeaderSearch 입력은 SearchOverlay 밖에 있고 모바일 form에는 별도 입력이 있으며 PC ArrowDown은 추천 **버튼으로 실제 focus**를 옮긴다. Base UI Autocomplete의 aria-activedescendant/Enter 선택으로 바로 바꾸면 기존 자유 검색 Enter·외부 form·두 입력 계약이 달라진다. B3은 각 메뉴 trigger의 Tab이 첫 링크, Shift+Tab이 이전 메뉴 마지막 링크, 마지막 링크 Tab이 다음 trigger로 이어지는 현재 명시적 계약이다. NavigationMenu의 roving/list-navigation을 덧씌우면 두 포커스 관리자가 충돌하므로 이번에는 유지한다. 두 primitive 모두 설치 1.8.0에서 지원하지만 단순 중복 제거가 아니며, 현재 계약의 변경 결정과 함께 입력/메뉴 root를 재설계할 별도 작업으로 판단했다.

이 적용의 출처는 c9e8b1a75bdd4a2d52308410b8ce77773464a9e6 이후 작업 트리다. 초기 조사 시점의 source_revision/sources는 유지한다. 실제 완료한 검증은 아래에 별도 기록한다.

### 적용 검증

- Panda 생성, `npm run typecheck`, Next 운영 빌드, Storybook 빌드가 통과했다. 생성기를 동시에 실행하지 않은 최종 산출물로 브라우저 검사를 진행했다.
- 관련 form-controls/account-recovery/checkout-summary/email-validation 단위 테스트 43개가 통과했다.
- 전체 소스·Storybook·Panda 설정 lint가 통과했다. 전체 경로 검사는 `eslint . --ignore-pattern '.tmp/**' --ignore-pattern '.tmp-large-desktop-check.cjs'`로도 통과했다. 옵션 없는 `npm run lint`는 Git에서 제외된 임시 빌드와 기존 루트 진단 스크립트까지 검사하므로 실패했으며, 이를 소스 lint 성공으로 대체해 보고하지 않는다.
- 원본 소스를 별도 임시 작업 폴더에 복사해 Panda·Storybook을 새로 생성하고 변경 후 결과와 비교했다. 초기 비교 기준에 빠져 있던 생성 CSS를 그대로 기준으로 삼지 않았다. PC 1200/2560·MO 375/768의 장바구니·결제·로그인·가입·가입정보·문의·FAQ·회원등급·회원정보 조회/편집/오류·배송지 조회/편집/신규 오류·홈·상품목록·상품상세·사이즈가이드·검색·러닝 필터를 포함한 36개 화면/상태, 4,538개 텍스트/컨트롤 노드에서 좌표·계산 글자/색/패딩/테두리·주요 native 속성을 비교했다. 0.3px 허용 범위를 넘는 차이와 속성 차이는 없었다. 전체 페이지 픽셀 일치나 모든 경로의 검증을 의미하지 않는다.
- 새 공용 API·제목·compact 입력·PC 검색 스토리 21개를 렌더링하고 포함된 play assertions와 브라우저 오류를 확인했다. 결제 완료·쿠폰 선택의 기존 PC/MO play 4개도 통과했다.
- 별도 브라우저 흐름으로 헤더 외부 검색 입력 유지·ArrowDown 진입·Escape 복원·outside 닫기, 러닝 필터 PC/MO의 재선택/방향키/Space, 회원정보 검증/저장/취소, 배송지 수정/기본값 유지/삭제 취소·확인을 확인했다.
- Markdown 포맷·로컬 링크, Git diff 공백과 OKF 관련 문서 매핑을 확인했다. 커밋/푸시는 이 적용 요청에서 수행하지 않았다.
