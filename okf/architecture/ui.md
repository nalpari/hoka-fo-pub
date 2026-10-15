---
type: Architecture
title: '컴포넌트와 스타일'
description: '공통 UI 계층, Panda CSS와 Storybook 작성 규칙을 설명한다.'
tags: [components, panda-css, storybook]
status: draft
generated:
  by: codex/gpt-6
  at: '2026-10-14T09:13:28Z'
source_revision: b3f7243062b500eb4909961667ad142cc368ff91
working_tree_sources:
  - src/shared/features/run-club/RunClubBadge.tsx
  - src/shared/features/locales/LocalesPage.tsx
  - src/shared/features/locales/LocalesLayout.tsx
  - src/shared/features/locales/LocaleRegionSection.tsx
  - src/shared/features/locales/locales.data.ts
  - src/shared/features/find-account/FindAccountPage.tsx
  - src/shared/features/find-account/PasswordResetPage.tsx
  - src/shared/features/find-account/PasswordResetContent.tsx
  - src/shared/features/find-account/PasswordResetField.tsx
  - src/shared/features/find-account/passwordValidation.ts
  - src/shared/features/find-account/phoneNumber.ts
  - src/shared/features/account-locked/AccountLockedPage.tsx
  - src/shared/features/account-locked/AccountLockedContent.tsx
  - src/stories/features/locales/LocalesPage.stories.tsx
  - src/stories/features/find-account/PasswordResetPage.stories.tsx
  - src/stories/features/account-locked/AccountLockedPage.stories.tsx
  - src/shared/components/atoms/RatingInput/RatingInput.tsx
  - src/shared/components/atoms/DescriptionList/DescriptionList.tsx
  - src/shared/components/molecules/ModalDialog/ModalDialog.tsx
  - src/shared/components/molecules/ModalDialog/ModalDialogHeader.tsx
  - src/shared/components/molecules/ModalDialog/ModalDialogFooter.tsx
  - src/shared/components/organisms/MyPage/ReviewManager.tsx
  - src/stories/components/atoms/RatingInput/RatingInput.stories.tsx
  - src/stories/components/organisms/MyPage/ReviewManager.stories.tsx
  - src/stories/components/molecules/ModalDialog/ModalDialog.stories.tsx
  - src/shared/features/home/HomeLayout.tsx
  - src/shared/features/home/HomePage.tsx
  - src/shared/features/signup/SignupLayout.tsx
  - src/shared/features/signup/SignupPage.tsx
  - src/shared/features/product/ProductDetailLayout.tsx
  - src/shared/features/product/ProductDetailPage.tsx
  - src/shared/features/product/ProductWidthSelector.tsx
  - src/shared/features/product/ProductDetailHeaderMeta.tsx
  - src/shared/features/signup-terms/SignupTermsDetail.tsx
  - src/shared/features/signup-terms/SignupTermsContent.tsx
  - src/shared/features/mypage/RunningProfilePage.tsx
  - src/shared/features/run-club/RunClubSessionHero.tsx
  - src/stories/features/signup/SignupPage.stories.tsx
  - src/stories/features/signup-terms/SignupTermsPage.stories.tsx
  - AGENTS.md
  - src/stories/features/mypage/MyPage.stories.tsx
  - src/shared/features/login/LoginContent.tsx
  - src/shared/features/login/LoginLayout.tsx
  - src/shared/features/login/LoginForm.tsx
  - src/shared/features/login/LoginActions.tsx
  - src/shared/features/login/LoginMembership.tsx
  - src/stories/features/login/LoginPage.stories.tsx
  - src/shared/components/organisms/Layout/SiteHeader/SiteHeader.tsx
  - src/shared/components/organisms/Layout/SiteHeader/SiteHeaderContainer.tsx
  - src/shared/components/organisms/Layout/SiteHeader/SiteHeaderFrame.tsx
  - src/shared/components/organisms/Layout/SiteHeader/SiteHeaderContent.tsx
  - src/shared/features/checkout/CheckoutPage.tsx
  - src/shared/features/checkout/CheckoutLayout.tsx
  - src/shared/features/checkout/CheckoutContent.tsx
  - src/shared/features/checkout/CheckoutFields.tsx
  - src/shared/features/checkout/CheckoutSummary.tsx
  - src/shared/features/checkout/checkout-summary.ts
  - src/shared/components/atoms/Typography/Typography.tsx
  - src/shared/styles/global.scss
  - src/stories/features/checkout/CheckoutPage.stories.tsx
  - src/stories/components/organisms/Layout/SiteHeader/SiteHeader.stories.tsx
  - src/stories/components/atoms/Typography/Typography.stories.tsx
  - src/shared/components/atoms/SegmentedControl/SegmentedControl.tsx
  - src/shared/components/organisms/MyPage/CouponManager.tsx
  - src/shared/components/organisms/MyPage/EmployeeCoupons.tsx
  - src/shared/components/organisms/Product/ProductDetailSections/ProductReviews.tsx
  - src/shared/components/organisms/Product/ProductDetailSections/ProductDetailSections.tsx
  - src/shared/components/layouts/AppLayout/AppLayout.tsx
  - src/stories/components/atoms/SegmentedControl/SegmentedControl.stories.tsx
  - src/stories/components/layouts/AppLayout/AppLayout.stories.tsx
  - src/stories/components/organisms/Product/ProductDetailSections/ProductDetailSections.stories.tsx
  - src/shared/features/mypage/MyPage.tsx
sources:
  - id: agents-md
    resource: https://github.com/nalpari/hoka-fo-pub/blob/b3f7243062b500eb4909961667ad142cc368ff91/AGENTS.md
    title: 'AGENTS.md'
  - id: panda-config-ts
    resource: https://github.com/nalpari/hoka-fo-pub/blob/b3f7243062b500eb4909961667ad142cc368ff91/panda.config.ts
    title: 'panda.config.ts'
  - id: src-shared-styles-global-scss
    resource: https://github.com/nalpari/hoka-fo-pub/blob/b3f7243062b500eb4909961667ad142cc368ff91/src/shared/styles/global.scss
    title: 'src/shared/styles/global.scss'
  - id: -storybook-main-ts
    resource: https://github.com/nalpari/hoka-fo-pub/blob/b3f7243062b500eb4909961667ad142cc368ff91/.storybook/main.ts
    title: '.storybook/main.ts'
  - id: -storybook-preview-ts
    resource: https://github.com/nalpari/hoka-fo-pub/blob/b3f7243062b500eb4909961667ad142cc368ff91/.storybook/preview.ts
    title: '.storybook/preview.ts'
  - id: -codex-skills-component-reusability-skill-md
    resource: https://github.com/nalpari/hoka-fo-pub/blob/b3f7243062b500eb4909961667ad142cc368ff91/.codex/skills/component-reusability/SKILL.md
    title: '.codex/skills/component-reusability/SKILL.md'
---

# 컴포넌트와 스타일

## 코드 배치

| 위치                               | 책임                                           |
| ---------------------------------- | ---------------------------------------------- |
| `src/app/`                         | URL별 페이지와 루트 레이아웃                   |
| `src/shared/lib/`                  | 기기 판별, 이름 검증, 인증 타이머 등 공용 로직 |
| `src/shared/features/`             | 기능별 화면, UI 조합과 정책·정적 콘텐츠        |
| `src/shared/components/atoms/`     | 기본 UI 요소                                   |
| `src/shared/components/molecules/` | 기본 요소를 조합한 UI                          |
| `src/shared/components/organisms/` | 화면 영역 단위 UI                              |
| `src/shared/components/layouts/`   | 공통 페이지 구조                               |
| `src/stories/`                     | Storybook이 탐색하는 스토리                    |

주문/결제 화면(`src/shared/features/checkout/`)은 `FormField`·`TextInput`·`Radio`·`StepIndicator` 등 기존 요소를 조합한 목 화면이며 실제 결제와 연동하지 않는다.

`CarouselViewport`는 `Children.toArray`로 정규화한 슬라이드 목록을 기준으로 첫·마지막 슬라이드 여백을 정하므로 `null` 자식은 슬라이드로 세지 않는다.

공통 UI로 올리기 전에 기존 컴포넌트를 검색한다. 여러 기능에 공통으로 적용되는 의미·인터랙션 계약이 있을 때 재사용 컴포넌트로 추출한다. 자세한 검토 절차는 `.codex/skills/component-reusability/SKILL.md`에 있다.

## 재사용 점검 (2026-10-14)

점검 범위는 `src/shared/features/`와 `src/shared/components/`다. 관련 스토리와 프레임워크·패키지 안내는 검증 근거로 확인했다. 아래는 패턴 검색과 대표 구현 검토 결과이며 모든 화면의 수동 검증 완료를 의미하지 않는다.

### 반영한 개선

- `SegmentedControl`에 읽기 전용 옵션 배열, `unstyled`, `itemClassName(option, selected)`를 추가했다. 기본 버튼 모양은 유지하고, `unstyled`에서는 호출자가 컨테이너·버튼 모양을 모두 소유한다(`fullWidth` 기본 스타일도 적용하지 않는다). `CouponManager`, `ReviewManager`, `ProductReviews`의 단일 선택 처리와 Base UI `Toggle Group` 조합을 이 컴포넌트로 통합했다. 쿠폰 필터의 가로 스크롤, 리뷰 상태 변경 시 페이지 초기화, 상품 리뷰 필터의 둥근 모양과 기존 Typography를 보존한다.
- 공개 선택값을 JSON 문자열로 인코딩해 Base UI 1.8.0이 빈 문자열을 자동 ID로 취급하는 동작과 충돌하지 않도록 했다. 콜백은 원래 타입의 값을 반환하고 비활성 옵션·빈 선택 배열을 무시한다. 옵션 값은 그룹 안에서 고유해야 한다.
- `ProductDetailSections`는 모든 본문이 보이는 스크롤 이동 메뉴다. `Tabs`의 패널 전환 계약과 달라 `Grid as="nav"`, `aria-current="location"`, 이름이 있는 `article`을 사용한다. 기존 스크롤 감지, 부드러운 이동, sticky 위치, PC 58px·모바일 48px 버튼 높이와 모바일 제목을 보존한다.
- `AppLayout`의 전역 Escape 리스너를 제거했다. 닫기 처리는 기존 Base UI `Drawer`의 `onOpenChange`가 소유한다. Escape 동작은 `MenuDismissal` 스토리로 검증한다.

### 후속 후보와 유지 판단

| 분류      | 관찰한 패턴 → 권장 API                                                                                                                    | 보존할 계약                                                                                                                                                              |
| --------- | ----------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 추출 후보 | `DesktopNavigation`·`SiteHeader`의 hover/focus/Tab/Escape 수동 제어 → Base UI `Navigation Menu`를 감싼 기존 헤더 내부 조합                | hover 진입, Shift+Tab 이동, 메뉴별 링크 순서, 포커스 복귀, PC 전용 58px 헤더. 설치 버전 지원, 의존성 업그레이드 불필요. 상호작용 회귀 검증 후 전환                       |
| 추출 후보 | `Carousel`의 SimpleBar 기반 스크롤바와 Swiper 위치 동기화 → Base UI `Scroll Area`를 이용한 캐러셀 내부 스크롤 영역                        | 슬라이드와 스크롤바 양방향 동기화, 드래그, 리사이즈, 모바일 스와이프. 설치 버전 지원, 업그레이드 불필요. 단순 태그 교체로 처리하지 않음                                  |
| 추출 후보 | `CheckoutPage`가 상태·목 상품 조회·합계·배송 폼·요약을 모두 소유 → 기능 내부 `CheckoutContent`, `CheckoutSummary`, 순수 주문 행 계산 모듈 | 장바구니의 색상·너비·사이즈·수량 키, 누락 상품 제외, 완료 콜백, required 입력 검증, PC `1fr 360px`/모바일 `1fr`, 간격 60px/40px. 다른 소비자가 없으므로 shared 승격 보류 |
| 유지      | `Select`의 네이티브 select, `TextInput`의 input/textarea, `Fieldset`의 fieldset/legend                                                    | 네이티브 입력·레이블·폼 제출 의미를 유지. Base UI `Select`, `Input`, `Fieldset`, `Form`은 설치 버전에서 지원하지만 현재 동작만으로 교체할 근거 부족                      |
| 유지      | `ModalDialog`·`BottomSheet`·`Accordion`·`Radio`·`Checkbox`·`NumberStepper`·`RangeInput`·`ProgressBar`                                     | 이미 각각 `Dialog`, `Drawer`, `Accordion`, `Radio Group`, `Checkbox`, `Number Field`, `Slider`, `Progress`를 사용. 기능별로 같은 primitive를 직접 재구현하지 않음        |
| 유지      | 실제 값·색상·크기에 따라 바뀌는 CSS 변수와 캐러셀 측정값                                                                                  | 동적 inline style은 정적 Panda 클래스로 일괄 치환하지 않음. 표·목록·폼 의미를 단순 Box로 바꾸지 않음                                                                     |

설치된 `@base-ui/react` 1.8.0의 전체 package exports를 [공식 카탈로그](https://base-ui.com/react/overview/quick-start)와 대조했다. 위 후보 외에 Alert Dialog, Autocomplete, Combobox, Context Menu, Menu, Menubar, Meter, OTP Field, Popover, Preview Card, Separator, Switch, Tabs, Toast, Toolbar, Tooltip, Toggle과 폼 primitives도 가용성을 확인했다. 이번 개선에 필요한 의존성 업그레이드는 없다. 브라우저 `confirm`을 쓰는 문의·리뷰 취소는 Alert Dialog 후보지만 기존 네이티브 확인 동작만으로 신규 공용 모달을 추가하지 않았다.

Typography 검색에서는 페이지·카드·필터 내부에 직접 타입 선언이 남아 있음을 확인했다. 이번 필터 통합은 기존 `body4`·`body5`와 호출자 스타일을 그대로 유지하며 신규 타입 스케일을 추가하지 않는다. 후속 페이지 분해 시에는 크기뿐 아니라 굵기·행간·자간·PC/모바일 값 전체를 비교해야 한다. 기존 `heading7`이나 `sectionHeading`은 모바일 크기·행간이 다르므로 32px 페이지 제목을 무조건 대체하는 용도로 사용하지 않는다.

### 이번 변경 검증

2026-10-14에 `npm run panda`, `npm run typecheck`, `npm run build`, `npm run build-storybook`, `git diff --check`를 통과했다. 브라우저에서 `CustomPresentation`, `EmptyStringValue`, `MenuDismissal`의 Storybook play 테스트 PASS를 확인했다. 상품 상세는 PC·375px 모바일 화면을 확인하고 PC 리뷰 버튼의 스크롤 이동 후 `aria-current="location"` 표시를 확인했다.

최초 타입 검사는 오래된 `.next/types/validator.ts`가 삭제된 catch-all 페이지를 참조해 실패했으며 Next 빌드로 생성 파일을 갱신한 뒤 재검사는 통과했다. `npm run lint`는 기존 `.tmp*` Storybook 산출물 때문에 실패했고 `npm run lint -- --ignore-pattern '.tmp*/**'`는 통과했다. 임시 산출물 삭제나 ESLint 설정 변경은 하지 않았다. 스테이징하지 않은 작업 트리 기준 OKF 매핑의 누락 문서가 없음을 확인했으며 스테이징 기준 검사를 대신한 것으로 기록하지 않는다.

## 구조 조합 후속 점검 (2026-10-14)

스킬에 추가된 low-level composition 기준으로 같은 두 폴더의 대표 구조를 다시 검토했다. 작은 구조 컴포넌트는 의미·너비·sticky·배치 계약을 소유할 때 추출하며, 공용 Atomic Design 계층을 추가하거나 context를 만드는 근거로 삼지 않는다.

| 책임과 기존 소유자                      | 반영한 컴포넌트·소유 폴더                        | props/slots와 보존한 계약                                                                                                                                                                              |
| --------------------------------------- | ------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `SiteHeader`의 sticky 바깥 영역         | `SiteHeaderFrame`, 기존 SiteHeader organism 폴더 | `children`, `onLeave`. 같은 div 안에 헤더와 메가 메뉴를 유지하며 sticky top 0·z-index 20·영역 이탈 이벤트를 함께 소유                                                                                  |
| `SiteHeaderContainer`의 랜드마크와 배치 | `SiteHeaderContent`, 같은 organism 폴더          | `primary`, `actions` 슬롯. header → Flex → 두 HStack의 DOM 순서, 높이 변수, PC 좌우 72px, 모바일 좌측 gutter·우측 9px, 간격 24px/6px 유지. 플랫폼에 따른 실제 콘텐츠 선택과 콜백 연결은 Container 소유 |
| `CheckoutPage`의 프레임·완료 단계       | `CheckoutLayout`, checkout 기능 폴더             | `completed`, `children`. main/header, 최대 너비 1100px, PC/모바일 상하 여백, 진행 단계 유지                                                                                                            |
| `CheckoutPage`의 상태별 표시·폼 배치    | `CheckoutContent`, 같은 기능 폴더                | 준비된 `rows`, `total`, `payment`, `completed`, `onPaymentChange`, `onSubmit`. 완료를 빈 장바구니보다 먼저 표시. PC `1fr 360px`·간격 60px, 모바일 `1fr`·간격 40px 유지                                 |
| 배송 필드와 결제 선택                   | `CheckoutFields`, 같은 기능 폴더                 | controlled `payment`와 `onPaymentChange`. 기존 FormField·TextInput·Radio, id/name/autocomplete, required 브라우저 검증, section 순서 유지                                                              |
| 주문 행·금액 표시                       | `CheckoutSummary`, 같은 기능 폴더                | `rows`, `total`. aside와 옵션별 key, 수량·금액 표시, 무료 배송·제출 버튼 유지. 상품 조회·총액 계산은 수행하지 않음                                                                                     |

헤더의 상태·포커스 정책은 `SiteHeader`에, 주문의 상태·목 데이터 조회·제출 콜백은 `CheckoutPage`에 남겼다. `checkout-summary.ts`는 옵션별 주문 행과 합계를 계산하는 순수 모듈이며 누락 상품을 제외한다. Windows 대소문자 해석과 `CheckoutSummary.tsx`의 모듈 해석이 충돌하지 않도록 파일명을 구분했다. 새 구조 컴포넌트는 각각 기존 organism/feature 내부 구현이며 별도의 공용 atom/molecule로 승격하지 않는다.

`Typography`에 `pageTitle`을 추가해 주문 제목의 직접 선언을 옮겼다. 역할은 간결한 페이지 제목(`as="h1"`)이며 PC·모바일 모두 32px, 굵기 700, 행간·자간 normal, 기존 기본 글꼴을 유지한다. `--type-page-title-{font-size,mobile-font-size,font-weight,line-height,letter-spacing}`가 토큰 계약이다. `heading7`의 모바일 16px나 `sectionHeading`의 40px/30px와 달라 기존 variant를 대신 적용하지 않았다. 공용 variant의 PC·모바일 스토리를 추가했다.

유지 판단: `HeaderLogo`는 링크 의미·로고 크기·모바일 크기를, `HeaderTools`는 액션 간격과 Shift+Tab 경계를, `DesktopNavigation`은 nav와 메뉴 진입을 이미 소유하므로 그대로 사용한다. 기존 `Grid as="nav"`와 목록·표·네이티브 폼 의미도 유지한다. Base UI 전체 exports는 계속 1.8.0이며 기존 점검의 가용성·업그레이드 판단은 변하지 않는다. 이번 구조 분리에 새로운 primitive나 의존성은 필요하지 않다.

초기 점검 후보였던 주문/결제 기능 내부 분리는 이 후속 작업에서 반영했다. 메가 메뉴의 Navigation Menu 전환과 캐러셀의 Scroll Area 통합은 별도의 상호작용 이전 후보로 남는다.

후속 검증에서 `npm run panda`, `npm run typecheck`, `npm run build`, `npm run build-storybook`, `npm run lint -- --ignore-pattern '.tmp*/**'`, `node --test tests/checkout-summary.test.mjs`(3개), `git diff --check`를 통과했다. 브라우저에서 `CompleteOrder`, `MobileCompleteOrder`, `MenuComposition` play 테스트 PASS를 확인했다. 주문은 required 제출 차단, 결제 수단 변경, 장바구니 비움 이후 완료 화면과 완료 콜백 1회 호출을 확인했고, 헤더는 hover 열기·영역 이탈 닫기·Tab 진입·Shift+Tab 복귀를 확인했다. PC 주문·375px 주문과 모바일 헤더 화면을 확인했으며 주문 제목은 두 플랫폼에서 32px/700, 모바일 행간·자간 normal이었다. 전체 lint의 기존 임시 산출물 제외 범위는 앞선 검증의 제한과 같다.

## 로그인 기능 점검 (2026-10-14)

대상은 `src/shared/features/login/`이다. `LoginPage`는 상태·검증·라우팅을 이미 소유하므로 유지하고, `LoginContent`의 표시 책임을 같은 기능 폴더에서 분리했다. 공용 atom/molecule 승격이나 추가 context 없이 기존 DOM 순서와 중첩을 유지한다.

| 책임                  | 컴포넌트·API                              | 보존 계약                                                                                                                                                 |
| --------------------- | ----------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| main·콘텐츠 너비·제목 | `LoginLayout({ children })`               | `Box as="main"`, 최대 너비 500px, PC 상단 96px·좌우 20px·하단 124px, 모바일 40px·16px·32px, h1 `login-title`와 줄바꿈                                     |
| 입력·옵션·안내        | `LoginForm`의 controlled 값과 명시적 콜백 | 같은 form/레이블/id/autocomplete, 아이디 저장·계정 찾기 순서, required 처리와 StatusMessage. `LoginContent`의 외부 props와 `LoginNotice` 타입 재수출 유지 |
| 제출·소셜 액션        | `LoginActions({ onUnavailable })`         | Stack 간격 8px·상단 8px, 버튼 높이·색상·아이콘·type, 데모 미연결 안내 콜백                                                                                |
| 가입 안내와 링크      | `LoginMembership()`                       | section의 `membership-title`, PC 여백 24px·모바일 32px, 본문 스케일, `/signup` 링크                                                                       |

`Typography loginTitle`은 로그인 환영 제목의 의미를 표현한다. 기존 `headingKr6`의 PC 36px와 로컬 모바일 강제 22px를 합친 토큰이며 두 플랫폼에서 Pretendard, 굵기 900, 행간 1.2, 자간 -0.02em을 유지한다. `--type-login-title-{font-size,mobile-font-size,font-weight,line-height,letter-spacing}`를 사용한다. 호출자는 `as="h1"`을 유지하고 로컬에서는 여백만 지정한다. 가입 안내 h2의 로컬 `fontWeight: medium`도 기존 `body3`에 `weight="medium"`을 전달하도록 옮겼다.

Base UI 1.8.0 전체 exports를 기준으로 대응을 검토했다. FormField의 Field, Checkbox, Button은 기존 공용 래퍼를 유지한다. Form·Input·Separator·Toast는 설치 버전에서 지원하지만 네이티브 form/input, 장식용 구분선, 인라인 상태 안내의 기존 계약만으로 교체할 근거가 없어 유지한다. Dialog·OTP Field·Combobox 등 별도 상호작용을 추가할 관찰 근거는 없으며 의존성 업그레이드는 필요하지 않다.

## 추가 기능 폴더 점검 (2026-10-14)

사용자가 지정한 catalog, find-account, home, identity-verification, mypage, product, run-club, signup-terms, signup을 점검했다. 기존 staged 변경을 보존하고 아래 책임 경계와 타입 스케일을 개선했다. 모든 폴더에 새 추상화를 강제로 추가하지 않는다.

| 폴더                  | 판단·반영      | API와 보존할 계약                                                                                                                                                                                                                                                                                   |
| --------------------- | -------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| catalog               | 유지           | ProductListingPage의 URL·필터·결과 계산, 기존 Layout/Content와 desktop/mobile leaf, 순수 filter/policy/metadata가 이미 분리됨. 필터 적용·초기화·정렬·뒤로가기 정책을 레이아웃으로 옮기지 않음                                                                                                       |
| find-account          | 유지           | FindAccountPage/Content의 상태·표시 분리, 공용 이름 검증·인증 타이머, FormField/TextInput/StatusMessage와 ModalDialog 재사용. 인증번호 6자리·재요청·오류 표시 계약 유지                                                                                                                             |
| identity-verification | 유지           | Page가 인증 방식 이동을, Content가 두 버튼과 안내 배치를 담당. Grid·Center·Stack과 Typography, 명시적 onSelect 계약이 충분해 1개 버튼을 새 공용 카드로 승격하지 않음                                                                                                                                |
| home                  | 반영           | 기능 내부 `HomeLayout({ platform, children })`가 main의 overflow·배경·PC 하단 96px/모바일 72px와 섹션 간격 112px/72px를 소유. Page의 플랫폼 선택과 Hero→Category→BestSeller→Explore→ShoeFinder 순서 유지                                                                                            |
| signup                | 반영           | 기능 내부 `SignupLayout({ step, method, children })`가 main/section·너비 500px·반응형 여백·제목·진행 표시를 소유. 단계 상태와 약관/입력 검증, 방법 선택·라우팅은 기존 Page 유지. step 0은 기존 방법 선택 화면, 나머지는 기존 h1/진행 표시를 유지                                                    |
| product               | 반영           | 기능 내부 `ProductDetailLayout({ viewer, isViewing, children, footer })`가 ContentLayout·1532px 너비·PC 2fr/.85fr 그리드·모바일 block·hidden 영역을 소유. viewer는 hidden 영역 바깥, 추천과 모바일 구매 액션은 그리드 뒤. 색상별 갤러리 key·크기 초기화·초점/스크롤 복원 콜백은 Page 유지           |
| signup-terms          | 반영           | 기능 내부 `SignupTermsDetail({ selected, previous, onClose, onPrevious })`가 기존 ModalDialog와 약관 본문·이전 약관 전환을 소유. Content는 약관 선택값과 목록·모달 조합, Page는 체크·이동 상태를 유지. 포털·모바일 fullscreen·스크롤 fade·닫기 계약 유지                                            |
| mypage                | 반영·후속 후보 | RunningProfilePage h1을 `Typography profileTitle`로 이전. 답변 상태·진행률과 추천 버튼의 완료 조건 유지. MyPage 회원 요약/메뉴와 MyPageStatusPage의 상태별 본문은 기능 내부 `MemberSummary`, `StatusContent` 추출 후보이며 준비된 데이터·액션 props와 기존 링크·모달 상태·모바일 배치를 보존해야 함 |
| run-club              | 반영·유지      | SessionHero h1을 `Typography sessionTitle`로 이전. 기존 목록의 Page→Layout→Header/Results 및 상세의 Hero/Guide/Recommendations/Notice 책임은 명확해 유지. Guide의 포스터·안내 본문 스케일은 후속 Typography 정리 후보이며 PC 96px/모바일 42px 포스터와 행간 1.05·자간 -0.04em을 보존해야 함         |

`profileTitle`은 기본 글꼴·PC 32px/모바일 28px·굵기 700·행간/자간 normal, `sessionTitle`은 기본 글꼴·36px/28px·900·1.2·-0.04em이다. 각각 `--type-profile-title-*`, `--type-session-title-*`의 PC/모바일 크기·굵기·행간·자간 토큰과 public variant 타입을 추가했다. 기존 heading variants와 전체 스케일이 달라 무조건 치환하지 않았다. 기존 h1 의미와 여백을 유지하며 PC·모바일 스토리를 추가했다. 상품 너비·메타 Typography의 정적인 `style={{ color: 'inherit' }}`는 같은 의미의 `tone="inherit"`로 옮겼다.

Base UI 전체 카탈로그에 대한 기존 가용성 판단(1.8.0)을 재사용했다. 관찰된 선택 입력·약관 모달·바텀시트는 공용 Radio/Checkbox/ModalDialog/BottomSheet를 유지하며 필요한 업그레이드는 없다. 상품 이미지 뷰어는 다른 본문을 숨기는 페이지 내 section이며 Carousel 선택·Escape·초점 복귀를 이미 소유한다. 이를 Dialog로 바꾸면 body 스크롤·포털·초점 트랩 계약이 달라지므로 구조 분리에서 자동 전환하지 않았다. OTP Field는 설치 버전 지원, 업그레이드 불필요이나 단일 TextInput의 현재 입력·자동완성 계약만으로 교체 근거가 부족하다. 정적인 프레임이나 장식 구분선에 Menu/Separator/Toast 등을 추가하지 않았다.

로그인과 추가 9개 폴더 변경 후 `npm run panda`, `npm run typecheck`, `npm run build`, `npm run build-storybook`, `npm run lint -- --ignore-pattern '.tmp*/**'`가 통과했다. Windows CRLF를 허용하는 `core.whitespace=blank-at-eol,blank-at-eof,space-before-tab,cr-at-eol`로 이번 변경 범위의 `git diff --check HEAD`를 확인했다. 작업 트리 기준 OKF 매핑의 누락 문서가 없음을 확인했다.

브라우저에서 LoginFlow·MobileLoginFlow·UnavailableActions·DetailInteraction·MobileDetailInteraction의 5개 play 테스트 PASS를 확인했다. 로그인은 필수 입력 차단, 비밀번호 보기/숨기기, 체크박스, 데모 콜백 1회, 이동과 안내를 확인했다. 약관은 열기·이전 약관 전환·닫기를 확인했다. 홈·가입 details·상품 상세는 PC/375px 모바일 화면, 상품 이미지 뷰어는 열기→Escape→기존 버튼으로 초점 복원을 확인했다. computed style은 loginTitle 36px/22px·900, profileTitle 32px/28px·700, sessionTitle 36px/28px·900으로 확인했다. 스토리 검증은 실제 인증·소셜 연동 검증을 의미하지 않는다.

## 공통 컴포넌트 네 계층 점검 (2026-10-14)

대상은 atoms, layouts, molecules, organisms 전체 폴더의 패턴 검색과 대표 구현이다. 앞선 staged 변경을 보존하며, 줄 수가 아니라 독립적인 인터랙션·구조 책임을 기준으로 개선했다.

| 계층      | 반영 또는 유지             | 계약                                                                                                                                                                                                                                                                                              |
| --------- | -------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| atoms     | `RatingInput` 추가         | controlled `value: 0..5`, 숫자 `onValueChange`, 필수 `ariaLabel`, 선택적 `disabled`/`name`/`className`. 0은 미선택. 기존 Button을 Base UI Radio/Radio Group으로 조합해 점수별 접근 가능한 이름·선택 상태·키보드 이동을 제공. 별 glyph의 기존 24px 루트 스타일과 34px 최소 너비·Button 표현을 유지 |
| atoms     | `DescriptionList` 개선     | readonly items와 선택적 id 키를 지원. dl/dt/dd·두 열 그리드·가변 labelWidth CSS 변수는 유지하고 정적인 display:contents만 Panda css로 이전                                                                                                                                                        |
| layouts   | 유지                       | ContentLayout/ContentHeader의 페이지 프레임·헤더, BottomSheet의 Drawer·Header/Content/Footer가 이미 계약을 소유. 동적 CSS 변수·포털·스크롤·닫기 처리를 임의의 공용 Box로 바꾸지 않음                                                                                                              |
| molecules | ModalDialog 내부 조합 개선 | 같은 폴더의 `ModalDialogHeader({ title, closeLabel })`는 기존 header·Dialog.Title·Close를, `ModalDialogFooter({ children, scrollFade })`는 고정 footer·fade를 소유. 새 DOM 래퍼·context·공용 API 없이 기존 외부 props·Dialog context·포커스 처리를 유지                                           |
| organisms | ReviewManager 소비자 이전  | 별점 버튼 반복을 RatingInput으로 교체. 기존 rating 상태·미선택 검증·본문 입력·확인/취소·페이지 초기화는 유지하고 textarea·파일 입력의 접근 가능한 이름을 추가. 새 별점 atom이 구매 데이터나 라우트에 의존하지 않도록 분리                                                                         |
| organisms | 유지·후속 후보             | SearchDialog는 전체 검색용 크기·스크롤 계약이 ModalDialog와 달라 강제 통합하지 않음. 헤더의 Navigation Menu와 Carousel의 Scroll Area 전환은 기존 포커스/측정/Swiper 동기화 검증이 필요한 별도 후보                                                                                                |

ModalDialogHeader는 제목 높이 32px·header 최소 높이 56px·좌우 16px를, Footer는 좌우 16px·하단 24px·PC 버튼 너비 160px/모바일 100%·80px fade와 pointer-events:none을 보존한다. 이 부품은 molecule 내부 구현이므로 각각 공용 atom으로 승격하거나 별도 공용 스토리를 만들지 않고 ModalDialog의 기존/추가 시나리오로 검증한다.

설치된 Base UI 1.8.0 전체 exports를 다시 확인했다. Radio/Radio Group은 지원되며 업그레이드 없이 새 atom에 사용한다. 기존 Radio 래퍼에는 Button render/점수별 접근 이름 계약이 없어 RatingInput 내부에서 primitive를 조합하며 기능·organism에 직접 primitive를 흩어 놓지 않는다. Dialog·Drawer·Accordion·Collapsible·Checkbox·Select·Number Field·Slider·Progress·Toggle Group 래퍼는 유지한다. Alert Dialog는 리뷰의 네이티브 confirm 대체 후보이나 현재 취소 동작 자체를 교체할 근거가 부족해 유지했다. Navigation Menu·Scroll Area·Alert Dialog 모두 설치 버전 지원, 업그레이드 불필요다. 다른 카탈로그 항목도 설치 가용성과 관찰된 동작을 대조하되 정적 정보·네이티브 입력을 무조건 교체하지 않았다.

Typography는 기존 공통 variant와 호환되는 호출을 유지했다. 이번 추출의 별은 텍스트 스케일이 아닌 아이콘 glyph이므로 기존 Button과 glyph 스타일을 재사용하며 신규 Typography variant를 만들지 않는다. MemberHero의 이름/통계와 StoreResults의 헤더 등 직접 타입 선언은 후속 정리 후보이며 크기만 맞춰 기존 heading variant로 바꾸면 PC/모바일 굵기·행간·자간이 달라질 수 있다. Fieldset의 legend, DataRows의 label/value/meta, 표·설명 목록의 의미도 유지한다.

이번 변경은 `npm run panda`, `npm run typecheck`, `npm run build`, `npm run build-storybook`, `npm run lint -- --ignore-pattern '.tmp*/**'`를 통과했다. 브라우저에서 RatingInput의 KeyboardSelection/Disabled/Mobile, ReviewManager의 WriteReview/MobileWriteReview, ModalDialog의 HeaderDismissal/ScrollFooter/MobileScrollFooter 등 8개 play 테스트 PASS를 확인했다. 미선택→클릭→화살표 이동, 비활성 콜백 차단, 리뷰 미입력 검증과 확인 닫기, 모달 제목 닫기/Escape/푸터 닫기를 확인했다. 모바일 모달은 실제 platform-mobile, 팝업 343px·푸터 버튼 바깥 너비 311px와 본문 overflow 스크롤을 확인했으며 별점과 모바일 모달 화면도 확인했다. 기존 임시 산출물을 제외한 lint 제한을 유지한다.

## 국가 선택·계정 복구 후속 재사용 점검

지정 범위는 locales, identity-verification, find-account, catalog, account-locked다. 아래 구현은 기능 내부에 두며 공용 atom으로 승격하지 않는다.

| 관찰한 책임                                         | 반영한 소유자·API                                                                                                                                                           | 유지한 의미·반응형·상태 계약                                                                                                                                                   |
| --------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| LocalesPage의 데이터·프레임·지역 목록 혼합          | `locales.data.ts`의 readonly `LocaleRegion`/`LocaleCountry`, `LocalesLayout({ children })`, `LocaleRegionSection({ region })`                                               | main → 제목 영역 → 콘텐츠 → section 순서, 링크·언어별 항목·국기·목록 순서 유지. PC 4단/모바일 2단 CSS columns, 간격 48px/24px 유지. Grid로 바꾸면 순서가 달라져 채택하지 않음  |
| PasswordResetPage의 중첩 필드 렌더 함수·페이지 표현 | `PasswordResetContent({ password, confirmation, errors, onFieldChange, onSubmit, completion })`, `PasswordResetField({ name, label, placeholder, value, error, onChange })` | main/section/form, 최대 500px, PC 상단 96px/모바일 40px, required·autocomplete·label·오류 설명 연결·alert 유지. 상태, touched 이후 확인 검증, 제출, 완료 모달/이동은 Page 소유 |
| 계정 복구의 비렌더링 규칙                           | `passwordValidation.ts`의 `validatePasswordReset`, `phoneNumber.ts`의 형식·유효성 함수                                                                                      | 영문/숫자/특수문자 포함 12자 이상·공백 금지, required sentinel, 비밀번호 일치, 전화번호 11자리 절단과 기존 하이픈 형식·허용 접두어 유지                                        |
| AccountLockedPage의 라우팅과 모달 표현 혼합         | `AccountLockedContent({ onClose, onConfirm })`                                                                                                                              | fixed 배경·blur·z-index 90·ModalDialog·버튼 너비 160px·모바일 설명 줄바꿈 유지. Page가 닫기 `/login`, 확인 `/login/account-locked/verification` 이동 소유                      |

지역 제목의 `region-Asia Pacific`처럼 공백이 있던 id/aria-labelledby는 `region-asia-pacific` 등 명시적 고유 ID로 수정했다. aria-labelledby의 공백 토큰 분리로 지역 이름을 잃는 문제를 해소한다. 국가 링크 URL 자체는 변경하지 않았다.

`localeHeading`은 배송 국가 선택 제목의 공통 Typography variant다. `as="h1"`, 기본 글꼴, PC 20px/모바일 16px, 700, 행간·자간 normal을 유지한다. `--type-locale-heading-{font-size,mobile-font-size,font-weight,line-height,letter-spacing}` 토큰·공개 타입과 PC/모바일 스토리를 함께 추가했다. feature-local 스타일은 여백·배치만 소유한다.

유지 판단: catalog의 ProductListingPage는 URL/필터/정렬/비교 상태를, Layout/Content 및 기존 작은 부품은 프레임·결과·PC sticky 필터/모바일 bottom sheet를, 순수 모듈은 정책·메타데이터를 이미 소유한다. identity-verification은 Page가 휴대폰 인증 이동을, Content가 선택 UI와 레이아웃을 소유한다. FindAccountContent와 AccountUnlockCompletePage의 의미 있는 구조도 유지한다. 아이핀 선택의 기존 미구현 동작은 이번 구조 점검에서 바꾸지 않는다.

Base UI 1.8.0 전체 package exports를 재확인했다. Dialog는 account-locked/완료 모달의 포털·Escape·포커스 동작에 해당하며 기존 ModalDialog 래퍼로 충족한다. Drawer·Accordion·Checkbox·Select·Slider·Number Field는 catalog의 필터 상호작용에 해당하며 기존 공통 래퍼를 유지한다. Field/Form/Input은 설치 버전 지원이나 기존 FormField/TextInput 및 네이티브 required/label 계약을 대체할 새 근거가 없어 유지한다. OTP Field도 지원되지만 계정 찾기의 인증번호는 복합 칸/화살표 탐색 요구 없이 단일 TextInput이므로 유지한다. 모두 업그레이드 불필요이며 새 primitive를 도입하지 않았다. 정적 국가 링크에는 Navigation Menu를 적용하지 않는다.

이번 후속 작업에서 `npm run panda`, `npm run typecheck`, `npm run build`, `npm run build-storybook`, `npm run lint -- --ignore-pattern '.tmp*/**'`, `node --test tests/account-recovery.test.mjs`(3개)를 통과했다. 브라우저에서 PasswordResetPage의 RequiredFieldsError/ConfirmationMismatch/Complete/MobileError, AccountLockedModal의 ConfirmNavigation/CloseNavigation/EscapeNavigation, Locales의 Default/Mobile 등 9개 play 테스트 PASS를 확인했다. PC 비밀번호 폼·국가 목록, 375px 오류 표시·계정 잠금 모달·국가 목록을 확인했고 localeHeading은 H1, PC 20px/모바일 16px·700·normal을 확인했다. lint는 기존 `.tmp*` 산출물을 제외한 결과다.

런클럽 `RunClubBadge`의 공통 높이를 52px에서 28px로 조정했다. Road/Trail 색상과 기존 Typography·여백 계약은 유지한다. 이는 구조 추출과 분리된 시각적 수정이며 근거는 해당 TSX의 작업 트리다.

## 스타일 기준

`AGENTS.md`가 스타일 규칙의 기준이다.

- 컴포넌트 스타일은 해당 TSX 파일에서 Panda `css`·`cva`로 작성한다.
- `*.module.scss`를 만들거나 유지하지 않는다.
- 반응형 스타일은 기존 값과 동작을 유지한다.
- 최상위 선언과 `export` 사이에는 빈 줄을 둔다(`AGENTS.md`의 코드 포맷 규칙).
- `panda.config.ts`에 토큰과 `.platform-mobile &` 조건이 있다. 포털로 `<body>`에 렌더되는 요소도 이 조건을 받도록 `platform-*` 클래스는 `src/app/layout.tsx`의 `<body>`에 붙는다.
- `styled-system/jsx`의 레이아웃 도구와 공통 `Typography`를 재사용한다.
- 전역 SCSS는 폰트·전역 레이아웃 등의 기반 스타일을 담당한다.
- 마이페이지 주문 카드 상품 사진은 공용 `ProductThumbnail`로 렌더하고 96px 정사각형 슬롯은 페이지 레이아웃에서 지정한다. Typography는 기본 `language="auto"`가 한글을 감지해 한국어 토큰을 선택하므로 호출부에서 `Kr` 접미사를 반복하지 않는다. 프로필 이동은 공용 `ButtonLink`, 구분선은 Panda `Divider`를 사용한다.
- 마이페이지의 리뷰·등급·쿠폰·회원정보·배송지·관심상품·최근 본 상품·재입고 알림 화면은 `MyPageStatusPage`에서 기능별 화면으로 분기한다. 공통 `MyPageFrame`이 탐색 메뉴와 Breadcrumb을 소유하고 각 화면은 기존 Button, FormField, TextInput, SegmentedControl, ModalDialog, ProductCard, ProductThumbnail을 재사용한다. 현재 목록과 입력 결과는 화면 내부의 데모 상태이며 서버 저장소와 연결하지 않는다. 대응 모바일 시나리오는 `src/stories/features/mypage/MyPageDesign.stories.tsx`에 둔다.
- 회원정보의 마케팅 정보 수신 동의 요약은 모바일 `heading7` 제목과 `body4` 세 행으로 구성한다. 제목·행 목록은 24px, 행끼리는 16px을 띄우고 각 행의 상태를 오른쪽 정렬한다. 이메일·모바일 쿠폰북·문자/카카오톡 전송매체를 각각 표시한다. 편집 폼에도 모바일 쿠폰북 선택값을 둬 요약 상태와 일치시킨다. 근거: [Figma 수신 동의 노드](https://www.figma.com/design/qyXJp4bnoeYSQxQULV8Wql/-HOKA-Design?node-id=789-24649&m=dev) 및 `src/shared/features/mypage/MyPageProfile.tsx` 작업 트리 확인(2026-10-15).
- 회원정보의 섹션 사이 1px 경계선은 `borderTop` 대신 Panda `Divider`(`orientation="horizontal"`, `bg="black.20"`)로 표시한다. 선 뒤 16·24·20px 간격은 각각 바깥 `Stack`의 `gap`으로 유지한다. 근거: `src/shared/features/mypage/MyPageProfile.tsx` 작업 트리 확인(2026-10-15).
- `MyPageReviews`의 작성 완료 목록은 읽기 전용 `RatingStars`를 본문 위에 표시한다. 초기 데모 리뷰는 4.5점으로 보여주고, 작성·수정 후에는 화면 내부 상태에 저장한 별점과 본문을 표시한다. 입력용 `RatingInput`은 모달에서 그대로 사용한다. 근거: `src/shared/features/mypage/MyPageReviews.tsx`와 `src/shared/components/atoms/RatingStars/RatingStars.tsx` 작업 트리 확인(2026-10-15).
- 이 여덟 화면의 타이포는 Figma의 12·14·16·20·22px 역할을 기존 Typography variant로 표현한다. 날짜·숫자는 영문 서체, 뒤따르는 한국어 단위·라벨은 한국어 서체를 각 Typography에 명시해 한 줄에서도 언어별 굵기와 자간을 유지한다. 여백과 정렬은 Box·Stack·HStack이 담당한다.
- `MyPageRewards`는 모바일 Figma 화면에서 결정한 Typography 값을 `mo`에 지정한다. `variant`로 두 플랫폼에 동일한 값을 적용하지 않는다. 영문·숫자만 있는 콘텐츠는 기본 `language="auto"`가 영문 변형을 고르므로 `language="en"`을 반복하지 않는다. 근거: `src/shared/features/mypage/MyPageRewards.tsx`와 Typography의 언어 변형 결정 로직 작업 트리 확인(2026-10-15).
- `MyPageRewards`의 등급 카드에서 `--tier-color`는 카드 배경과 검은 원 안 이니셜 글자색에 함께 적용한다. ELITE·ADVANCED·RUNNER는 각각 Figma color foundation의 `blue.100`·`citrus.100`·`offWhite.100` 토큰을 변수에 연결한다. 근거: `src/shared/features/mypage/MyPageRewards.tsx`, `panda.config.ts` 및 생성 CSS 확인(2026-10-15).
- 등급 혜택과 회원 공통 혜택의 순번은 `ol`의 CSS 마커 대신 `map`의 인덱스를 `Typography`로 출력한다. 주항목과 순번은 모바일 `body4`(14px), 보조 설명은 `body5`(12px)를 쓰며 설명 불릿도 텍스트로 표시한다. 목록의 의미 구조는 `ol`·`li`로 유지한다. 근거: `src/shared/features/mypage/MyPageRewards.tsx` 작업 트리 확인(2026-10-15).
- 회원 공통 혜택은 Figma 노드 `714:22146`의 343px 폭·1px 외곽선·가로 16px/세로 24px 안쪽 여백을 따른다. 제목은 모바일 `heading6`(20px), 네 묶음 제목은 `heading7`(16px), 번호 문장은 `body4`(14px), 쿠폰 조건은 `body5`(12px)와 원형 불릿으로 구분한다. 제목과 목록·묶음 간격은 20px, 묶음 제목과 항목 간격은 12px, 번호 항목 간격은 8px다. 근거: [Figma 공통 혜택 노드](https://www.figma.com/design/qyXJp4bnoeYSQxQULV8Wql/-HOKA-Design?node-id=714-22146&m=dev) 화면·세부 속성 및 `src/shared/features/mypage/MyPageRewards.tsx` 작업 트리 확인(2026-10-15).
- 쿠폰 목록의 탭과 결과 목록·결과 목록과 더보기 버튼은 각각 24px 간격을 둔다. 총 개수와 첫 카드 사이 8px, 카드끼리는 16px이다. 카드 안은 제목과 금액 사이 24px, 금액과 조건 사이 12px, 조건과 사용 기간 사이 4px을 둔다. 근거: [Figma 쿠폰 목록 노드](https://www.figma.com/design/qyXJp4bnoeYSQxQULV8Wql/-HOKA-Design?node-id=753-18722&m=dev) 및 `src/shared/components/organisms/MyPage/CouponManager.tsx` 작업 트리 확인(2026-10-15).
- `EmployeeCoupons`는 쿠폰 등록과 쿠폰 내역 사이의 독립 섹션이다. 접힌 상태는 칩을 줄바꿈 없이 가로 한 줄(`nowrap`)로 이어서 보여주고, 52px 높이에서 오른쪽으로 넘친 부분만 잘린다. 펼치면 줄바꿈(`wrap`)해 가로 4px·세로 8px 간격으로 세 줄에 걸쳐 5개 칩을 모두 보여주며 아래 쿠폰 내역을 밀어낸다. 우측 원형 버튼은 `aria-expanded`와 목록 연결을 제공한다. 근거: [Figma 임직원 쿠폰 노드](https://www.figma.com/design/qyXJp4bnoeYSQxQULV8Wql/-HOKA-Design?node-id=764-19372&m=dev), 제공된 두 상태 이미지 및 `src/shared/components/organisms/MyPage/EmployeeCoupons.tsx` 작업 트리 확인(2026-10-15).
- 임직원 쿠폰의 펼침은 실제 칩 목록 높이를 측정해 52px에서 확장 높이까지 애니메이션한다. 접을 때는 280ms 높이 전환 후 `nowrap`으로 확실히 복원하고, 빠르게 다시 펼치면 대기 중인 접힘 타이머를 취소한다. 화살표와 가장자리 페이드도 함께 전환하며, 움직임 감소 환경에서는 즉시 접는다. 근거: `src/shared/components/organisms/MyPage/EmployeeCoupons.tsx` 작업 트리 확인(2026-10-15).
- `SegmentedControl variant="underline"`는 리뷰·쿠폰의 동일한 전체 폭 밑줄 탭 표현을 소유한다. 옵션 수에 관계없이 버튼을 균등하게 배치하고 선택 항목에 검은 하단선을 표시한다. 기존 기본 버튼형과 `unstyled` 확장 API는 유지한다.

`styled-system/`과 `src/shared/styles/panda.css`는 생성 결과이며 Git에서 제외한다. 생성 CSS를 직접 수정하지 않고 TSX나 Panda 설정을 바꾼 뒤 `npm run panda`를 실행한다.

## Storybook

`.storybook/main.ts`는 `src/stories/**/*.stories.@(ts|tsx)`만 탐색한다. 다른 폴더의 스토리는 이 패턴에 포함되지 않는다. `public/`을 정적 자산으로 제공하고 접근성·문서 애드온을 사용한다.

모든 `*.stories.ts`·`*.stories.tsx`는 `src/stories/` 아래에 작성한다. 컴포넌트는 `components/`, 기능 화면은 `features/`에서 원본 계층을 따르고 기존 별칭으로 구현을 가져온다. `src/shared/`·`src/app/`에는 스토리를 함께 두지 않는다. 이 기본 규칙은 `AGENTS.md`에 명시하며 마이페이지 스토리도 `src/stories/features/mypage/MyPage.stories.tsx`로 옮겼다.

전역 `nextjs.appDirectory: true`가 App Router 탐색 컨텍스트를 제공한다. 경로·파라미터가 필요한 스토리는 Next.js navigation 설정이나 제공되는 모킹을 사용한다. React Router 래퍼를 추가하지 않는다.

뷰포트 프리셋은 1920, 1600, 1200, 768, 375px이다. 접근성 검사 설정 `a11y.test: todo`는 검증 통과를 의미하지 않는다.

[로컬 실행](../development/setup.md), [변경 검증](../development/verification.md)을 참고한다.
