---
type: Reference
title: 화면 폭 기반 플랫폼과 공통 컴포넌트 폴더 평탄화
description: 1024px 모바일 경계, 1200px PC 캔버스, 명시적 미리보기와 배지 통합 계약을 기록한다.
tags: [responsive, components, platform, badge]
status: draft
generated:
  by: codex/gpt-6
  at: '2026-10-28T09:32:41.994Z'
source_revision: 74f5072acffcdd61df53bb52bd61b7fe3bbdd050
working_tree_sources:
  - src/context/platform.tsx
  - src/context/ShopShell.tsx
  - src/app/layout.tsx
  - src/styles/global.scss
  - src/components/common/
  - src/stories/
  - src/mocks/products.ts
  - src/types/component-contracts/
  - tests/form-controls.test.mjs
  - tests/import-order.test.mjs
  - AGENTS.md
  - README.md
  - panda.config.ts
  - .codex/skills/component-reusability/
---

# 화면 폭 기반 플랫폼과 폴더 평탄화

## 현재 플랫폼 계약

2026-10-28 사용자 요청으로 UA 판별을 화면 폭 판별로 교체했다. 이 문서는 기존 문서의 UA 기반 플랫폼 설명을 대체하며 과거 검증 기록은 당시 동작의 출처로 남긴다.

- Platform 타입과 usePlatform은 src/context/platform.tsx에서 제공한다. 반환값은 기존 web/mobile이다. src/lib/device.ts와 루트의 headers·detectPlatform을 제거했다.
- PlatformProvider의 platform 생략 시 matchMedia('(max-width: 1024px)')를 useSyncExternalStore로 구독한다. 서버와 최초 hydration은 web이고, 클라이언트에서 보정되므로 모바일 첫 표시 전환을 허용한다.
- 명시한 platform은 화면 폭보다 우선하며 media listener와 body 클래스 변경을 하지 않는다. 기존 Storybook의 PC/MO 미리보기를 유지한다.
- 자동 Provider는 body의 플랫폼 클래스를 동기화하고 해제 시 이전 클래스를 복원한다. ShopShell의 로컬 ShopFrame은 같은 컨텍스트로 app 클래스를 결정한다. 기존 모달·시트 포털의 플랫폼 클래스도 유지한다.
- 1024px 이하는 모바일이다. 1024px 초과부터 1200px 미만은 PC 1200px 캔버스와 문서 가로 스크롤을 사용한다. 1200px 이상은 최소 폭 제약을 해제해 세로 스크롤바가 있는 환경에서도 추가 가로 넘침이 생기지 않도록 한다.
- 기존 Panda _mobile의 클래스 조건과 usePlatform 소비자는 유지한다. 루트의 서버 판별용 div를 제거하고 .app.platform-web이 최소 폭을 소유한다. 헤더도 동일한 최소 폭 토큰을 사용한다.
- ShopShell의 장바구니·로그인 상태는 Provider 바깥의 기존 소유자에 남긴다. 화면 폭 변경을 key로 사용하거나 하위 트리를 통째로 다시 마운트하지 않는다.

## 폴더 평탄화

공통 컴포넌트에서 같은 이름의 TSX 한 개만 가진 폴더 59개를 한 단계 올렸다. 후속 배지 통합으로 Badge도 같은 조건이 되어 총 60개를 평탄화했다. atoms/molecules/organisms/layouts 계층은 유지한다. 문서·타입·데이터·자산·다른 구현을 함께 가진 Button, Carousel, ProductCard 등은 그대로 둔다. 스토리는 기존 src/stories 위치와 제목을 유지한다. 호환 중계 파일은 만들지 않았다.

초기 59개 이동은 import를 제외한 TypeScript AST 출력 비교에서 구현 차이가 없었다. 상대 import, 정적 경로와 동적 테스트 fixture 경로를 새 위치에 맞췄다. 타입과 Storybook 빌드로 참조를 검증했다. 이동 목록의 예전 경로는 삭제 전 출처이며 현재 import 경로가 아니다.

| 이동 전                                                                             | 이동 후                                                         |
| ----------------------------------------------------------------------------------- | --------------------------------------------------------------- |
| `src/components/common/atoms/Accordion/Accordion.tsx`                               | `src/components/common/atoms/Accordion.tsx`                     |
| `src/components/common/atoms/ActionButton/ActionButton.tsx`                         | `src/components/common/atoms/ActionButton.tsx`                  |
| `src/components/common/atoms/Card/Card.tsx`                                         | `src/components/common/atoms/Card.tsx`                          |
| `src/components/common/atoms/Checkbox/Checkbox.tsx`                                 | `src/components/common/atoms/Checkbox.tsx`                      |
| `src/components/common/atoms/DataTable/DataTable.tsx`                               | `src/components/common/atoms/DataTable.tsx`                     |
| `src/components/common/atoms/DescriptionList/DescriptionList.tsx`                   | `src/components/common/atoms/DescriptionList.tsx`               |
| `src/components/common/atoms/Divider/Divider.tsx`                                   | `src/components/common/atoms/Divider.tsx`                       |
| `src/components/common/atoms/Dropdown/Dropdown.tsx`                                 | `src/components/common/atoms/Dropdown.tsx`                      |
| `src/components/common/atoms/EmailSignupField/EmailSignupField.tsx`                 | `src/components/common/atoms/EmailSignupField.tsx`              |
| `src/components/common/atoms/EmptyState/EmptyState.tsx`                             | `src/components/common/atoms/EmptyState.tsx`                    |
| `src/components/common/atoms/FilterTabs/FilterTabs.tsx`                             | `src/components/common/atoms/FilterTabs.tsx`                    |
| `src/components/common/atoms/FormField/FormField.tsx`                               | `src/components/common/atoms/FormField.tsx`                     |
| `src/components/common/atoms/Icon/Icon.tsx`                                         | `src/components/common/atoms/Icon.tsx`                          |
| `src/components/common/atoms/IconBrand/IconBrand.tsx`                               | `src/components/common/atoms/IconBrand.tsx`                     |
| `src/components/common/atoms/Link/Link.tsx`                                         | `src/components/common/atoms/Link.tsx`                          |
| `src/components/common/atoms/LoadMoreButton/LoadMoreButton.tsx`                     | `src/components/common/atoms/LoadMoreButton.tsx`                |
| `src/components/common/atoms/Navigation/Navigation.tsx`                             | `src/components/common/atoms/Navigation.tsx`                    |
| `src/components/common/atoms/NumberStepper/NumberStepper.tsx`                       | `src/components/common/atoms/NumberStepper.tsx`                 |
| `src/components/common/atoms/Pagination/Pagination.tsx`                             | `src/components/common/atoms/Pagination.tsx`                    |
| `src/components/common/atoms/PaymentLogo/PaymentLogo.tsx`                           | `src/components/common/atoms/PaymentLogo.tsx`                   |
| `src/components/common/atoms/ProgressBar/ProgressBar.tsx`                           | `src/components/common/atoms/ProgressBar.tsx`                   |
| `src/components/common/atoms/Radio/Radio.tsx`                                       | `src/components/common/atoms/Radio.tsx`                         |
| `src/components/common/atoms/RatingStars/RatingStars.tsx`                           | `src/components/common/atoms/RatingStars.tsx`                   |
| `src/components/common/atoms/SegmentedControl/SegmentedControl.tsx`                 | `src/components/common/atoms/SegmentedControl.tsx`              |
| `src/components/common/atoms/Select/Select.tsx`                                     | `src/components/common/atoms/Select.tsx`                        |
| `src/components/common/atoms/SortIcon/SortIcon.tsx`                                 | `src/components/common/atoms/SortIcon.tsx`                      |
| `src/components/common/atoms/StatusMessage/StatusMessage.tsx`                       | `src/components/common/atoms/StatusMessage.tsx`                 |
| `src/components/common/atoms/TextInput/TextInput.tsx`                               | `src/components/common/atoms/TextInput.tsx`                     |
| `src/components/common/atoms/ToggleButton/ToggleButton.tsx`                         | `src/components/common/atoms/ToggleButton.tsx`                  |
| `src/components/common/atoms/Typography/Typography.tsx`                             | `src/components/common/atoms/Typography.tsx`                    |
| `src/components/common/atoms/Wishlist/Wishlist.tsx`                                 | `src/components/common/atoms/Wishlist.tsx`                      |
| `src/components/common/layouts/AccountPageLayout/AccountPageLayout.tsx`             | `src/components/common/layouts/AccountPageLayout.tsx`           |
| `src/components/common/layouts/BottomSheet/BottomSheet.tsx`                         | `src/components/common/layouts/BottomSheet.tsx`                 |
| `src/components/common/layouts/ContentLayout/ContentLayout.tsx`                     | `src/components/common/layouts/ContentLayout.tsx`               |
| `src/components/common/layouts/ContentSection/ContentSection.tsx`                   | `src/components/common/layouts/ContentSection.tsx`              |
| `src/components/common/layouts/CustomerCenterLayout/CustomerCenterLayout.tsx`       | `src/components/common/layouts/CustomerCenterLayout.tsx`        |
| `src/components/common/layouts/OrderPageLayout/OrderPageLayout.tsx`                 | `src/components/common/layouts/OrderPageLayout.tsx`             |
| `src/components/common/layouts/SidebarNavigationLayout/SidebarNavigationLayout.tsx` | `src/components/common/layouts/SidebarNavigationLayout.tsx`     |
| `src/components/common/molecules/AmountRow/AmountRow.tsx`                           | `src/components/common/molecules/AmountRow.tsx`                 |
| `src/components/common/molecules/Breadcrumb/Breadcrumb.tsx`                         | `src/components/common/molecules/Breadcrumb.tsx`                |
| `src/components/common/molecules/CompareBar/CompareBar.tsx`                         | `src/components/common/molecules/CompareBar.tsx`                |
| `src/components/common/molecules/ContentHeader/ContentHeader.tsx`                   | `src/components/common/molecules/ContentHeader.tsx`             |
| `src/components/common/molecules/FormActionGroup/FormActionGroup.tsx`               | `src/components/common/molecules/FormActionGroup.tsx`           |
| `src/components/common/molecules/HomeCarouselSection/HomeCarouselSection.tsx`       | `src/components/common/molecules/HomeCarouselSection.tsx`       |
| `src/components/common/molecules/MainContentCard/MainContentCard.tsx`               | `src/components/common/molecules/MainContentCard.tsx`           |
| `src/components/common/molecules/MainSection/MainSection.tsx`                       | `src/components/common/molecules/MainSection.tsx`               |
| `src/components/common/molecules/ModalDialog/ModalDialog.tsx`                       | `src/components/common/molecules/ModalDialog.tsx`               |
| `src/components/common/molecules/OrderActionBar/OrderActionBar.tsx`                 | `src/components/common/molecules/OrderActionBar.tsx`            |
| `src/components/common/molecules/OrderProductSummary/OrderProductSummary.tsx`       | `src/components/common/molecules/OrderProductSummary.tsx`       |
| `src/components/common/molecules/ProductOptionList/ProductOptionList.tsx`           | `src/components/common/molecules/ProductOptionList.tsx`         |
| `src/components/common/molecules/ProductThumbnail/ProductThumbnail.tsx`             | `src/components/common/molecules/ProductThumbnail.tsx`          |
| `src/components/common/molecules/SearchField/SearchField.tsx`                       | `src/components/common/molecules/SearchField.tsx`               |
| `src/components/common/molecules/SocialAuthButton/SocialAuthButton.tsx`             | `src/components/common/molecules/SocialAuthButton.tsx`          |
| `src/components/common/molecules/StepIndicator/StepIndicator.tsx`                   | `src/components/common/molecules/StepIndicator.tsx`             |
| `src/components/common/molecules/SupportTabs/SupportTabs.tsx`                       | `src/components/common/molecules/SupportTabs.tsx`               |
| `src/components/common/organisms/EmailAddressFields/EmailAddressFields.tsx`         | `src/components/common/organisms/EmailAddressFields.tsx`        |
| `src/components/common/organisms/Navigation/SideNavigation/SideNavigation.tsx`      | `src/components/common/organisms/Navigation/SideNavigation.tsx` |
| `src/components/common/organisms/OrderRecommendations/OrderRecommendations.tsx`     | `src/components/common/organisms/OrderRecommendations.tsx`      |
| `src/components/common/organisms/Product/ProductGallery/ProductGallery.tsx`         | `src/components/common/organisms/Product/ProductGallery.tsx`    |
| `src/components/common/atoms/Badge/Badge.tsx`                                       | `src/components/common/atoms/Badge.tsx`                         |

## Badge 옵션 통합

BadgeLaunchStatus와 PromotionBadge를 Badge의 옵션으로 흡수하고 두 파일을 삭제했다. 출시 상태는 운영 참조가 없었으며 이번 명시적 통합 범위에 포함된다. 프로모션은 ProductCard의 두 구성과 상품 상세가 사용하고, Promotions 타입은 목 상품과 선언 계약도 공유한다.

- 기본 Badge의 children, filled/line, primary/tertiary, round 표현은 유지한다.
- status=COMING은 line·COMING SOON, IN_STOCK은 filled·IN STOCK을 표시한다.
- promotion은 Best/New/Exclusive 한 개 또는 readonly 배열이며 빈 배열은 null이다. 기존 순서·중복·브랜드색·body4·줄바꿈·세로 구분선·weight를 유지한다. 프로모션 className은 이전처럼 각 텍스트에 적용한다.
- children/일반 variant, status, promotion은 타입에서 배타적이다. promotion의 weight는 Typography 계약을 그대로 사용한다.
- 기존 일반 배지 스토리 3개와 제목을 유지하고 출시 상태 2개, 단일/복수/빈 프로모션 스토리를 추가했다.

## 검증 (Codex, 2026-10-28)

- 타입 검사, lint, import 정렬·Prettier, Panda 생성, Next production build, Storybook build와 기존 테스트 및 추가 회귀 테스트 총 77개를 통과했다. 자동 서버 플랫폼·명시 플랫폼, 배지 출시 문구·프로모션 순서/구분선/두께/빈 배열을 포함한다.
- 현재 production 서버에서 홈·상품 목록·상세·로그인을 375/1024/1025/1199/1200/1920px로 검사했다. 24개 조합에서 body/app 플랫폼이 일치했고, 1025/1199px은 1200px 캔버스, 나머지는 의도한 가로 넘침 없음이었다. 장바구니도 같은 여섯 폭에서 확인했다. classic scrollbar가 있는 환경의 1200px에서는 clientWidth=scrollWidth=1185px이었다.
- 리사이즈 중 로그인 ID/비밀번호, 장바구니 선택, 열린 옵션 모달과 포털 클래스, 검색어 Clifton과 PC 패널→모바일 전체 화면을 확인했다. 모바일 필터 선택 중 URL 유지 및 적용 후 gender=men 반영, PC 필터의 즉시 URL 반영을 확인했다.
- Storybook 명시 web을 375px에서 PC 1200px 캔버스로, 명시 mobile을 1920px에서 mobile 클래스로 유지함을 확인했다. 복수 프로모션 스토리의 Best/New/Exclusive 순서, 구분선 2개와 글자 두께 500을 확인했다. 모바일 갤러리의 2번 이미지 선택과 PC 이미지 뷰어 진입·Escape 닫기를 확인했다.
- 전체 라우트·스토리의 전수 시각 비교와 모든 play 함수 실행을 의미하지 않는다. UA 제거로 최초 모바일 SSR이 web인 것은 승인된 동작이다.

## 정책·스킬 반영

사용자 후속 요청으로 AGENTS.md에 중복 폴더 제거·기존 배지 소유자의 타입 옵션·플랫폼/상태 보존 기준을 추가했다. component-reusability의 설명과 라우팅에 해당 모드를 반영하고 references/folder-and-responsive.md와 wrapper-consolidation.md에서 구체적인 판단·보존·검증 기준을 제공한다. 소스 구현 범위를 자동으로 확장하는 지침은 추가하지 않았다.

스킬 검증기 quick_validate.py가 통과했다. YAML 의존성은 저장소 밖 임시 경로에 설치하고 Python UTF-8 모드로 실행했다. AGENTS·스킬·참조 문서의 형식 검사도 통과했다.
