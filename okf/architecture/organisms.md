---
type: Architecture
title: 'Organisms 재사용 점검'
description: 'Organisms의 책임 분리, 공통 컴포넌트 조합과 상호작용 재사용을 설명한다.'
tags: [components, organisms, base-ui, panda-css, typography]
status: draft
generated:
  by: codex/gpt-6
  at: '2026-10-20T02:15:05Z'
source_revision: e5e803ccd1ba98ac96c941fef33db5cfaa280ade
working_tree_sources:
  - src/components/common/organisms/Account/LogoutDialog.tsx
  - src/components/common/organisms/Catalog/CatalogFilterPanel/CatalogFilterPanelBody.tsx
  - src/components/common/organisms/Hero/Hero.tsx
  - src/components/common/organisms/Hero/HeroPagination.tsx
  - src/components/common/organisms/Hero/HeroSlide.tsx
  - src/components/common/organisms/InquiryBoard/InquiryBoard.tsx
  - src/components/common/organisms/Layout/SiteFooter/FooterLegalLinks.tsx
  - src/components/common/organisms/Layout/SiteFooter/FooterNavigation.tsx
  - src/components/common/organisms/Layout/SiteFooter/FooterNavigationWeb.tsx
  - src/components/common/organisms/Layout/SiteHeader/DesktopNavigation.tsx
  - src/components/common/organisms/Layout/SiteHeader/HeaderPromotionCarousel.tsx
  - src/components/common/organisms/Layout/SiteHeader/HeaderPromotionContent.tsx
  - src/components/common/organisms/Layout/SiteHeader/MegaMenuList.tsx
  - src/components/common/organisms/Layout/SiteHeader/MegaMenuPanel.tsx
  - src/components/common/organisms/Layout/SiteHeader/SiteHeaderFrame.tsx
  - src/components/common/organisms/Member/MemberHero.tsx
  - src/components/common/organisms/MyPage/CouponCard.tsx
  - src/components/common/organisms/MyPage/EmployeeCoupons.tsx
  - src/components/common/organisms/MyPage/QuickLinkGrid.tsx
  - src/components/common/organisms/MyPage/ReviewManager.tsx
  - src/components/common/organisms/Product/ProductDetailSections/ProductDetailSections.tsx
  - src/components/common/organisms/Product/ProductDetailSections/ProductInformation.tsx
  - src/components/common/organisms/Product/ProductDetailSections/ProductInquiryNoticeSection.tsx
  - src/components/common/organisms/Product/ProductDetailSections/ProductReviews.tsx
  - src/components/common/organisms/Product/ProductDetailSections/ReviewGalleryModal.tsx
  - src/components/common/organisms/Product/ProductGallery/ProductGallery.tsx
  - src/components/common/organisms/Search/RecommendedSearches.tsx
  - src/components/common/organisms/Search/SearchCollectionLinks.tsx
  - src/components/common/organisms/Search/SearchHeader.tsx
  - src/components/common/organisms/Search/SearchSuggestions.tsx
  - src/shared/Mockup/signup/SignupCompleteStep.tsx
  - src/shared/Mockup/signup/SignupTermsStep.tsx
  - src/components/common/organisms/Navigation/MenuDrawer/MenuDrawerGroups.tsx
  - src/components/common/organisms/Layout/SiteHeader/HeaderAuthLink.tsx
  - src/components/common/organisms/Navigation/MenuDrawer/MenuDrawer.tsx
  - src/components/common/organisms/Navigation/MenuDrawer/MenuDrawerFrame.tsx
  - src/components/common/organisms/Navigation/MenuDrawer/MenuDrawerHeader.tsx
  - src/components/common/organisms/Navigation/MenuDrawer/MenuDrawerNavigation.tsx
  - src/components/common/organisms/Navigation/MenuDrawer/MenuDrawerUtilityLinks.tsx
  - src/components/common/organisms/Layout/SiteHeader/MegaMenuAD.tsx
  - src/components/common/organisms/Faq/FaqList.tsx
  - src/components/common/organisms/StoreFinder/StoreResults.tsx
  - src/components/common/atoms/Accordion/Accordion.tsx
  - src/components/common/atoms/Typography/Typography.tsx
  - src/styles/global.scss
  - src/stories/components/common/organisms/Faq/FaqList.stories.tsx
  - src/stories/components/common/organisms/Layout/SiteHeader/MegaMenuAD.stories.tsx
  - src/stories/components/common/atoms/Accordion/Accordion.stories.tsx
  - src/stories/components/common/atoms/Typography/Typography.stories.tsx
sources:
  - id: skill
    resource: https://github.com/nalpari/hoka-fo-pub/blob/e5e803ccd1ba98ac96c941fef33db5cfaa280ade/.codex/skills/component-reusability/SKILL.md
    title: 'Component Reusability'
  - id: base-ui-catalogue
    resource: https://base-ui.com/react/overview/quick-start
    title: 'Base UI 공식 카탈로그'
---

# Organisms 재사용 점검

사용자가 지정한 `src/components/common/organisms/`만 점검 대상으로 삼았다. 관련 공통 컴포넌트와 스토리·타입·스타일 토큰은 재사용 계약과 검증을 위해 확인·변경했다. 기존 미커밋 모바일 메뉴 작업과 제공된 멤버십 SVG는 보존했다. 전체 파일의 구조·타입·상호작용 패턴 검색과 영역별 구현 검토 결과이며 모든 페이지의 수동 검증 완료를 뜻하지 않는다.[^skill]

## 반영한 구조와 API

| 관찰한 책임                                             | 구현과 계약                                                                                                                                                                                                                                                             | 보존한 동작                                                                                                                                                 |
| ------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `MenuDrawer`의 상태·포커스 정책과 표시 영역 혼재        | 같은 폴더에 `MenuDrawerFrame(children, close, popupRef, initialFocusRef)`, `MenuDrawerHeader(close, isLoggedIn, closeButtonRef)`, `MenuDrawerNavigation(activeMenu, menus, onSelectMenu, onBack, onNavigate, backButtonRef)`, `MenuDrawerUtilityLinks(onNavigate)` 분리 | Drawer 포털·내부 스크롤, 헤더→본문→지원 영역의 DOM 순서, 높이·여백·색상·아이콘, 초기 포커스·뒤로가기·Escape·닫기·재진입 초기화                              |
| 웹 `MegaMenuAD`와 모바일 메뉴의 동일한 광고 카드        | 기존 공개 컴포넌트에 `presentation?: 'desktop' \| 'mobile'`, `className?: string` 추가. 기본값 desktop. `sva`로 link/card/image/gradient/title/action 슬롯 관리                                                                                                         | PC 358px 정사각형과 기존 h3·16px 제목, 모바일 가변 정사각형·h2·28px 제목, 각 padding·gradient·밑줄·링크 목적지                                              |
| FAQ의 조건부 답변 표시와 외부 제어 상태                 | 공통 `Accordion`에 `value?: string[]`, `onValueChange?: (value: string[]) => void` 추가. `FaqList`가 단일 선택으로 사용                                                                                                                                                 | 기존 `openQuestion`·`onToggle(question)` 계약, 같은 질문 재선택 시 닫기, 질문별 key, PC/모바일 답변 padding·빈 결과. 버튼과 패널은 Base UI가 ARIA ID로 연결 |
| Drawer 등 열린 조상 아래 Accordion 화살표의 잘못된 회전 | 공통 indicator의 선택자를 현재 `button[aria-expanded="true"]`로 제한                                                                                                                                                                                                    | 현재 항목이 열린 경우만 회전. 바깥 Dialog/Drawer의 `data-open`에 영향받지 않음                                                                              |
| FAQ·매장 목록의 feature 데이터 타입 역방향 import       | `FaqListEntry { question, answer: ReactNode }`·`FaqListProps`, `StoreResult { name, address, type, phone }`·`StoreResultsProps`를 organism에서 선언. 입력 목록은 readonly 허용                                                                                          | 기존 feature 데이터의 구조적 호환성, 표시·링크·빈 결과. FAQ category와 StoreType 필터 정책은 feature 소유로 유지                                            |

새 메뉴 부분은 organism 내부 구현이며 공용 atom/molecule로 승격하지 않았다. 상태·라우팅 정책을 표시 컴포넌트에 옮기거나 context를 추가하지 않았다. Header의 정렬은 `HStack`, Next Link의 정렬은 Panda `hstack` 패턴을 사용해 추가 DOM wrapper 없이 의미를 보존한다. 설치된 Panda JSX에는 `asChild`가 없어 사용하지 않는다.

### Typography

기존 `heading5`는 모바일 22px, `heading4`는 line-height 1이므로 메뉴의 24px/20px·line-height 1.2와 광고 제목의 28px·1.2를 그대로 표현할 수 없다. 호출자 `fontSize`·`fontWeight`·`lineHeight` 덮어쓰기를 다음 공개 variant와 `--type-navigation-*` 토큰으로 옮겼다. 크기는 desktop/mobile에서 동일하며 모바일 전용 메뉴를 다른 플랫폼 Storybook에서 검사할 때도 유지된다.

| Variant                | 용도와 의미                                        | 크기·굵기·행간·자간                                                                             |
| ---------------------- | -------------------------------------------------- | ----------------------------------------------------------------------------------------------- |
| `navigationHeading`    | 영문 카테고리와 그룹 제목, 버튼 안 span 또는 h2/h3 | 24px·900·1.2·0, HOKA 폰트                                                                       |
| `navigationHeadingKr`  | 한글 카테고리와 그룹 제목                          | 20px·900·1.2·korean 자간, Pretendard. `navigationHeading`의 기본 auto 언어 선택으로 한글을 처리 |
| `navigationPromoTitle` | 모바일 탐색 광고 제목 h2                           | 28px·900·1.2·0, HOKA 폰트                                                                       |

`NavigationTypeScale` 스토리에 web/mobile과 한글/영문, semantic as 사용을 함께 배치했다. 다른 기존 Typography variant의 언어·크기 계약은 변경하지 않았다.

## Base UI 전체 카탈로그 대조

설치된 `@base-ui/react` **1.8.0**의 전체 package exports와 공식 카탈로그를 대조했다. 아래 primitive는 모두 설치 버전에서 지원하며 이번 개선과 후보에 **dependency upgrade required 항목은 없다**. 최신 문서가 표시하는 패키지 버전을 설치 버전으로 오인하지 않았다.[^base-ui-catalogue]

| Primitive                                                                                                      | 관찰한 근거와 판단                                                                                                                                                                                                                                                                     |
| -------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Accordion, Collapsible                                                                                         | FAQ는 공통 Accordion으로 반영. 모바일 메뉴·푸터·InquiryBoard는 기존 Accordion 조합 유지. 상품 문의 안내는 공통 Disclosure의 제어형 접기 계약 유지                                                                                                                                      |
| Dialog, Drawer                                                                                                 | 메뉴의 Drawer는 private Frame으로 분리. 검색·리뷰 갤러리 Dialog는 전용 헤더·분할 패널·전체폭·스크롤 계약이 공통 ModalDialog의 기본 헤더/블러/크기와 달라 유지. 단순 wrapper 교체로 시각 계약을 바꾸지 않음                                                                             |
| Navigation Menu                                                                                                | SiteHeader/DesktopNavigation의 hover/focus/Tab/Shift+Tab/Escape 수동 조작은 추출 후보. 같은 헤더 폴더에서 `DesktopMegaNavigation({ menus, tools })` 조합으로 통합할 수 있으나 hover 진입, 메뉴 간 포커스·닫기·링크 순서·sticky 영역 이탈 계약을 별도 회귀 검증해야 함                  |
| Toggle, Toggle Group, Tabs                                                                                     | CouponManager·ReviewManager·ProductReviews의 단일 선택은 공통 SegmentedControl 유지. HeroPagination의 독립적인 슬라이드 선택 버튼은 native aria-pressed 유지. 상품 상세는 모든 본문이 표시되는 스크롤 내비게이션이므로 Tabs 패널 숨김으로 교체하지 않음                                |
| Field, Fieldset, Form, Input, Checkbox, Checkbox Group, Radio Group, Select, Number Field, Slider, OTP Field   | Signup의 FormField·TextInput·Terms, InquiryBoard의 Checkbox, Catalog의 children 조합 유지. 네이티브 category select와 search form을 커스텀 입력으로 바꿀 근거 없음. OTP 및 숫자/범위 입력을 직접 구현하는 organism 없음                                                                |
| Autocomplete, Combobox                                                                                         | 검색의 최근 기록 삭제·전체 삭제·추천어 실행은 검색 행동 목록이며 현재 단일 선택형 입력 계약이 아님. SearchForm/RecentSearches/RecommendedSearches의 분리 유지. 키보드 자동완성 요구가 생기면 query/onQueryChange/onSearch/선택 상태를 묶고 삭제 버튼·포커스 이동·scope URL을 함께 설계 |
| Scroll Area, Progress, Meter                                                                                   | ProductGallery는 native 가로 스크롤과 공통 Carousel 소비자로 유지. HeroPagination 진행은 autoplay의 동적 시각 표시라 시간을 나타내는 inline width/duration 보존. 독립적인 수치 meter나 organism 내부 커스텀 스크롤바 재구현 없음                                                       |
| Alert Dialog                                                                                                   | ReviewManager의 native confirm은 공용 취소 확인 UI 후보. 작성 상태 보존·취소 후 초기화·포커스 복귀가 필요한 `ConfirmReviewDiscard({ open, onConfirm, onCancel })` 계약으로 같은 폴더에서 먼저 검증하고, 두 번째 소비자 확인 전 공용 승격하지 않음                                      |
| Avatar, Button, Context Menu, Menu, Menubar, Popover, Preview Card, Separator, Switch, Toast, Toolbar, Tooltip | 기존 Button/IconButton과 정적 링크·구분선은 유지. 관찰한 영역에 메뉴 명령·우클릭·툴팁·토스트 큐·토글 스위치 등 새 primitive가 필요한 상호작용 근거 없음. static markup을 바꾸기 위해 도입하지 않음                                                                                     |

## 유지와 후속 추출 후보

| 대상·분류                                                                                                       | 근거 → 제안 API·primitive                                                                                                                                                                                                       | 보존할 제약                                                                                                                                                                             |
| --------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Account, Catalog, SiteHeader/Content, SiteFooter/Content, Search, HeroCopy/Slide/Pagination, Signup 단계 — 유지 | DataRows·MetricGrid와 기존 지역별 구조 조합, named callbacks·children·준비된 데이터 계약이 이미 분리됨. 작은 파일이라는 이유로 합치거나 공용 추상화를 추가하지 않음                                                             | 현재 landmark·순서·sticky·기기별 Grid/Stack·상태 수명·URL 처리                                                                                                                          |
| ReviewManager — 추출 후보                                                                                       | 구매 목록과 편집 폼이 상태·첨부 규칙과 혼재 → 같은 MyPage 폴더 `ReviewPurchaseList({ purchases, onEdit })`, `ReviewEditor({ rating, body, files, submitted, onRatingChange, onBodyChange, onFilesChange, onCancel, onSubmit })` | 탭 전환 페이지 초기화, 10개 단위 페이지, 필수 별점/내용, 1,000자·파일당 10MB·최대 5개, 취소 확인과 초기화. 목 구매 데이터의 실제 소비자 계약 확인 후 props로 이동                       |
| ProductReviews/ReviewGalleryModal — 추출 후보                                                                   | 고정 리뷰 fixture와 요약·본문·이미지 선택 조합 → 같은 Product 폴더 `ProductReviewSummary`, `ProductReviewList({ reviews, expandedAuthor, onExpand, onOpenGallery })`와 readonly review 계약                                     | 760px 본문, PC 두 열/모바일 한 열, 정렬 버튼 현재 동작, 이미지·리뷰 전환 시 index 초기화, 700px 갤러리 breakpoint와 Dialog 포커스. 정렬 기능이나 데이터 연동을 리팩터링에 추가하지 않음 |
| FooterLegalLinks — Typography 후보                                                                              | 부모의 14px/모바일12px·1.5·korean 자간과 자손 font-size 상속 → `footerLegal` semantic variant를 `Typography as={Stack}`로 적용하는 후속 이관                                                                                    | section/법적 링크와 메일 의미, 숫자·중첩 Typography 폰트, trim-both, desktop22px/mobile20px 그룹 간격을 실제 스타일에서 함께 측정해 보존                                                |
| MemberHero, SideNavigation — Typography 후보                                                                    | 지역별 이름·수치·사이드 제목의 직접 타입 선언 → memberTitle/memberMetric/sideNavigationTitle variant와 기존 body4/body5 조합                                                                                                    | 이름/수치28px, 사이드 제목28px→16px와 링크14px→12px, active 굵기, 현재 inherited line-height/font-family를 먼저 측정. 회원 상태·경로를 atom에 옮기지 않음                               |
| Search, ProductDetailSections/ProductGallery — Typography 후보                                                  | list item·section h2·placeholder·아이콘 문자에 직접 타입 선언 잔존 → 본문은 body4/body5, 부재한 섹션 제목·placeholder 스케일은 별도 semantic variant                                                                            | section h2 28px→24px, gallery560px→정사각형, placeholder14px/0.08em, search 항목14px. 이미지·아이콘의 치수를 텍스트 variant로 일괄 변환하지 않음                                        |
| Hero와 SignupMethodStep inline styles — 유지                                                                    | Hero의 transform/progress는 런타임 값. Signup의 색상 변수는 공통 Button이 inline 기본 변수를 합성하는 명시적 override API여서 단순 css 클래스로 옮기면 우선순위가 달라짐                                                        | autoplay·pause·스와이프·reduced motion과 브랜드 버튼 색상·hover/focus/disabled 계약. 정적 혜택 카드는 typed 데이터 map 후보이며 새 공용 컴포넌트의 근거는 없음                          |

`organisms`에 CSS Module 파일은 없다. 기존 native 목록·표·폼·ref 측정 영역을 단순 Box로 치환하지 않았다. 추가 추출의 기준은 책임과 상호작용의 독립성이고 파일 길이가 아니다.

## 검증

2026-10-15 `npm run panda`, `npm run typecheck`, `npm run build`, `npm run build-storybook`를 통과했다. 전체 `npm run lint`는 기존 `.tmp*` Storybook 산출물에서 실패했고 `npm run lint -- --ignore-pattern '.tmp*/**'`는 통과했다. 기존 산출물을 삭제하거나 ESLint 설정을 변경하지 않았다.

브라우저에서 375px 메뉴의 배너343×343·top424px와 멤버십16×16 SVG 로딩을 확인했다. MenuDrawer Navigation 스토리의 뒤로가기 포커스·Escape·닫기·재진입 초기화와 FAQ ControlledDisclosure의 Enter/Space·단일 열기·ARIA 패널 연결을 확인했다. 모든 organism 화면의 시각 검증을 수행한 것으로 확대 해석하지 않는다.

[^skill]: Component Reusability, 책임 경계·저수준 조합·Base UI·Panda·Typography 점검 기준.

[^base-ui-catalogue]: Base UI 공식 Quick start의 전체 Components 목록. 가용성은 로컬 package exports와 별도로 대조했다.

추가 브라우저 검증: Accordion Controlled 스토리에서 열린 조상 아래 닫힌 항목의 화살표가 회전하지 않고 외부 모두 접기 버튼이 상태를 제어함을 확인했다. NavigationTypeScale은 두 플랫폼에서 영문24px/900/28.8px, 한글20px/900/24px, 광고28px/900/33.6px로 계산되었다. PC 광고는358×358과 h3 16px/500을 유지했다. 320×568 모바일 메뉴는 clientWidth와 scrollWidth가305px로 같고 배너273×273, 세로 scrollHeight1009px로 내부 스크롤을 확인했다. `npm run okf:check`, 전체 작업 트리 OKF 매핑 검사와 `git diff --check`도 통과했다.
`MenuDrawerNavigation`은 후속 요청에 따라 Accordion에 `multiple={false}`를 전달한다. 첫 그룹의 기본 열림은 유지하고 다른 그룹을 열면 이전 그룹을 닫는다. 현재 그룹을 다시 선택하면 모든 그룹을 닫을 수 있으며 Navigation 스토리가 전환과 재선택을 검증한다.
`MenuDrawerHeader`의 비로그인 영역은 기존 `HeaderAuthLink`를 사용한다. `HeaderAuthLinkProps.onNavigate?: () => void`를 추가해 두 개의 독립적인 로그인·회원가입 링크와 Divider를 유지하면서 메뉴 닫기 콜백을 연결한다. 기존 웹 소비자는 콜백 없이 같은 API로 사용할 수 있다.

## MenuDrawer 재점검 (2026-10-15)

범위는 `Navigation/MenuDrawer/`와 직접 사용하는 공통 API 및 기존 스토리다. 설치된 Base UI 1.8.0 exports와 공식 전체 카탈로그를 대조했다. Drawer·Dialog(모달 포커스/닫기), Accordion·Collapsible(그룹 펼침), Button, Navigation Menu·Menu·Menubar(복합 탐색), Scroll Area, Separator를 검토했다. 나머지 폼·선택·입력·상태 표시·툴팁·팝오버·토스트 계열은 해당 동작이 없다. 필요한 Drawer와 Accordion은 설치 버전에 있으며 의존성 업그레이드는 필요 없다. 현재 Drawer와 공통 Accordion을 유지하고 native 링크·버튼을 명령 메뉴나 탭으로 바꾸지 않는다. 스크롤은 native overflow로 충분하다. 공식 카탈로그 출처: https://base-ui.com/react/overview/quick-start.

| 분류 | 책임과 API                                                                                                                | 보존 계약                                                                                                         |
| ---- | ------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| 개선 | `MenuDrawerGroups({ columns, onNavigate })`를 같은 폴더 내부에 분리. Accordion 그룹·하위 링크·indicator Panda 스타일 소유 | 첫 그룹 기본 열림, 단일 열기/재선택 접기, 메뉴 ID key 초기화, Sale 색상, 50px 그룹·40px 하위 링크와 16px 들여쓰기 |
| 유지 | `MenuDrawer`의 선택 상태·스크롤/포커스 전환, `MenuDrawerFrame`의 Base UI Drawer                                           | Portal·Escape·닫기·초기 포커스와 메뉴 재진입 초기화                                                               |
| 유지 | Header의 IconButton·HeaderAuthLink, UtilityLinks의 native nav/ul/li와 hstack                                              | 현재 사용자 변경인 18px 닫기 버튼, PC 1.5/모바일 2px 인증 간격, 고객 지원 링크 순서·safe area                     |
| 유지 | `navigationHeading`·`body3`·`body4` Typography와 local css/cva                                                            | 기존 타입 스케일과 플랫폼별 값. 중복 타입 선언과 CSS Module 없음                                                  |

Navigation의 외곽 div는 상세/기본 상태별 패딩과 광고를 함께 소유하므로 단순 Box 치환의 이득이 없다. 링크용 hstack과 Drawer의 외부 DOM/ref 계약을 유지한다. 새 공용 atom/molecule/organism과 확장 API는 추가하지 않았으며 추가 추출 후보는 없다. 기존 스토리에 닫기 버튼 최초 포커스와 상세 진입 후 뒤로가기 포커스 assertion을 추가했다. 이 assertion 추가 자체를 브라우저 실행 완료로 기록하지 않는다.

이번 재점검 검증: `npm run panda`, `npm run typecheck`, `npm run lint -- --ignore-pattern ".tmp*/**"`, `npm run build`, `npm run build-storybook`, `npm run okf:check`와 전체 작업 트리 OKF 매핑 검사를 통과했다. 기존 임시 산출물은 lint에서 제외했다. Storybook 빌드에는 의존 패키지의 module directive 경고가 있었다. 브라우저 자동화 도구를 사용할 수 없어 이번에 추가한 play assertion의 실제 실행과 시각 검증은 수행하지 못했다.

## Components 점검 후 재사용 판단 (2026-10-19)

213개 Components TSX의 공개 props·상태·refs를 점검하고 표현 변경만 적용했다. 적용 수치와 정적/SSR·빌드 검증 한계는 [UI 기록](ui.md#components-재사용성과-jsx-표현-점검-2026-10-19)을 참고한다. 설치된 Base UI 1.8.0의 전체 package exports를 공식 컴포넌트 카탈로그와 비교했으며, 미사용 primitive라는 이유만으로 새 의존성이나 UI를 추가하지 않았다.

- **후속 후보 — 헤더 탐색:** DesktopNavigation/SiteHeader/MegaMenuPanel의 hover·activeMenu·Escape/포커스 동작은 [Navigation Menu](https://base-ui.com/react/components/navigation-menu) 재사용 후보다. 설치 버전에서 지원하므로 업그레이드는 필요하지 않다. 제안할 소유자는 SiteHeader 내부 NavigationRegion이며 menus·activeMenu·onMenuChange·onNavigate를 받아 데스크톱 trigger/panel을 조합한다. hover 지연·클릭 이동·키보드 포커스·58px 높이·메가 메뉴 영역을 함께 검증해야 하므로 이번 표현 정리에서는 교체하지 않았다.
- **유지 — 임직원 쿠폰:** 최신 Figma의 50%·30% 고정 안내 카드 두 건으로 갱신했다. 동적 펼침 상태가 없어 Collapsible 적용 대상이 아니다.
- **유지 — 공통 상호작용:** Accordion/Collapsible·Dialog/Drawer·Dropdown/Field·Radio/Checkbox·RatingInput·RangeInput·NumberStepper 등 기존 Base UI 기반 래퍼의 상태와 키보드 계약은 유지했다. 정적인 fieldset/table/label이나 status 안내에 새 primitive를 추가하지 않는다.
- **유지 — 상품 옵션:** ProductOptionList는 scroll/grid/preview 세 배치와 선택 상태, 수동 가로 이동·ResizeObserver를 함께 제공한다. 단순히 스크롤 로직이 있다는 이유로 별도 Carousel API에 강제로 맞추지 않는다. 현재 layout·options·selectedId·onSelect와 ref/event cleanup을 유지했다.
- **유지 — 작은 구성 요소:** FooterLegalLinks/Navigation, HeaderPromotionContent, CatalogFilterPanelBody, SearchHeader/Suggestions 등 이미 책임이 명확한 내부 구성은 그대로 두고 스타일 표현만 정리했다. 태그를 이름만 바꾸는 새 컴포넌트나 범용 래퍼는 만들지 않았다.
