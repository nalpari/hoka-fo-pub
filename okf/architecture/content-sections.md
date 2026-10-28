---
type: Report
title: 'ContentHeader·ContentSection 적용 후보 전수 조사'
description: '제목 그룹과 본문 간격의 공통화 후보 및 기존 구성 보존 기준을 정리한다.'
tags: [components, reuse, headings, layout, audit]
status: draft
generated:
  by: codex/gpt-6
  at: '2026-10-23T07:10:36Z'
source_revision: 288304522b2bd458c2fa2485ac665a9056525976
working_tree_sources:
  - src/components/common/layouts/AccountFormLayout/AccountFormLayout.tsx
  - src/app/login/find-account/page.tsx
  - src/app/login/find-account/password-reset/page.tsx
  - src/app/signup/page.tsx
  - src/app/signup/verify/page.tsx
  - src/components/common/molecules/ProductOptionSelectors/ProductWidthSelector.tsx
  - src/components/common/molecules/ProductOptionSelectors/ProductColorSelector.tsx
  - src/components/common/molecules/ProductOptionSelectors/ProductSizeSelector.tsx
  - src/components/common/molecules/ProductOptionSelectors/ProductOptionSection.tsx
  - src/components/size-guide/SizeGuidePage.tsx
  - src/components/store-finder/StoreFinderPage.tsx
  - src/components/support/InquiryNewPage.tsx
  - src/components/support/SupportExperiencePage.tsx
  - src/components/terms/TermsPage.tsx
  - src/app/support/size-guide/_components/SizeGuidePanel.tsx
  - src/components/common/molecules/SectionHeading/SectionHeading.tsx
  - src/app/mypage/page.tsx
  - src/components/notices/NoticesPage.tsx
  - src/components/faq/FaqPage.tsx
  - src/components/support/InquiryPage.tsx
  - src/app/checkout/page.tsx
  - .codex/skills/component-reusability/SKILL.md
  - .codex/skills/component-reusability/references/content-sections.md
  - src/components/support/SupportPage.tsx
  - src/stories/components/common/molecules/ContentHeader/ContentHeader.stories.tsx
  - src/stories/components/common/layouts/ContentSection/ContentSection.stories.tsx
  - src/app/support/inquiries/page.tsx
  - src/components/support/InquiryCautions.tsx
  - src/app/products/[id]/page.tsx
  - src/app/support/notices/page.tsx
  - src/components/notices/NoticeDetailPage.tsx
  - src/components/catalog/ProductListingPage.tsx
  - src/context/ShopShell.tsx
  - src/components/common/organisms/Layout/SiteFooter/FooterNavigationMobile.tsx
  - src/components/common/layouts/OrderPageLayout/OrderPageLayout.tsx
  - src/components/common/atoms/SectionHeader/SectionHeader.tsx
  - src/components/common/atoms/EmptyState/EmptyState.tsx
  - src/components/common/layouts/AccountFormLayout/AccountFormLayout.tsx
  - src/components/common/layouts/BottomSheet/BottomSheet.tsx
  - src/components/common/layouts/ContentLayout/ContentLayout.tsx
  - src/components/common/layouts/ContentSection/ContentSection.tsx
  - src/components/common/layouts/CustomerCenterLayout/CustomerCenterLayout.tsx
  - src/components/common/molecules/Account/AccountSectionHeader.tsx
  - src/components/common/molecules/AccountFormHeader/AccountFormHeader.tsx
  - src/components/common/molecules/ContactCard/ContactCard.tsx
  - src/components/common/molecules/ContentHeader/ContentHeader.tsx
  - src/components/common/molecules/MainContentCard/MainContentCard.tsx
  - src/components/common/molecules/MainSection/MainSection.tsx
  - src/components/common/molecules/MyPage/PersonalizationCard.tsx
  - src/components/orders/OrdersRoute.tsx
  - src/components/common/molecules/PageHeader/PageHeader.tsx
  - src/components/common/molecules/PageSection/PageSection.tsx
  - src/app/signup/verify/phone/page.tsx
  - src/app/signup/information/page.tsx
  - src/app/page.tsx
  - src/components/common/organisms/Member/MemberHero.tsx
  - src/app/mypage/coupons/page.tsx
  - src/components/common/organisms/Navigation/SideNavigation/SideNavigation.tsx
  - src/components/common/organisms/OrderRecommendations/OrderRecommendations.tsx
  - src/components/common/organisms/Signup/SignupCompleteStep.tsx
  - src/components/common/organisms/Signup/SignupDetailsStep.tsx
  - src/app/signup/page.tsx
  - src/components/common/organisms/Signup/SignupTermsStep.tsx
  - src/app/support/store/page.tsx
  - src/app/login/account-locked/page.tsx
  - src/components/account-locked/AccountUnlockCompletePage.tsx
  - src/components/care-guide/CareGuidePage.tsx
  - src/app/cart/page.tsx
  - src/components/checkout/CouponDialog.tsx
  - src/app/login/find-account/page.tsx
  - src/app/login/find-account/password-reset/page.tsx
  - src/app/signup/verify/page.tsx
  - src/app/locales/page.tsx
  - src/app/login/page.tsx
  - src/components/mypage/MyPage.tsx
  - src/components/mypage/MyPageAddresses.tsx
  - src/components/mypage/MyPageProductHistory.tsx
  - src/components/mypage/MyPageProfile.tsx
  - src/components/mypage/MyPageRewards.tsx
  - src/components/mypage/MyPageStatusPage.tsx
  - src/app/mypage/profile/page.tsx
  - src/components/not-found/NotFoundPage.tsx
  - src/components/phone-verification/PhoneVerificationContent.tsx
  - src/components/product/ProductVariantSection.tsx
  - src/components/run-club/RunClubPage.tsx
  - src/app/running/run-club/[sessionId]/page.tsx
  - src/components/signup-registration/RegistrationCompleteContent.tsx
  - src/app/signup/terms/page.tsx
  - src/app/support/inquiries/new/page.tsx
  - src/components/support/ShippingReturnsPage.tsx
  - src/app/support/page.tsx
  - src/components/support/SupportFaq.tsx
  - src/components/support/SupportHours.tsx
  - src/components/support/SupportMileageContent.tsx
  - src/components/support/SupportNotices.tsx
---

# ContentHeader·ContentSection 적용 후보 전수 조사

## 계정 기본 헤더의 프레임 통합 (2026-10-28)

AccountFormLayout을 제거하고 AccountPageLayout의 선택적 title·description으로 계정 제목을 구성한다. title이 있으면 ContentSection.title/headerProps 기본 API를 사용하며 h1·기존 PC/MO 크기·설명 색상과 40/32px 본문 간격을 유지한다. title이 없는 기존 호출부에는 제목이나 ContentSection을 추가하지 않는다. dialogs 소비처는 기존 outsideContent로 옮겼고 actions/actionsSpacing은 같은 프레임의 액션 Grid에 반영한다. [부모 옵션 통합](ui.md#공통-래퍼-4개를-부모-옵션으로-통합-2026-10-28)이 현재 계약이며 아래 AccountFormLayout 관련 설명은 당시 이력이다.

## 미사용 제목 조합 제거 (2026-10-28)

사용자 승인으로 공통 ContactCard(전용 스토리만 사용)와 PageSection(전체 사용처 없음)을 삭제했다. 아래 두 컴포넌트의 전환·유지 후보 판단과 working_tree_sources는 최초 조사 당시 이력이며 현재 적용 대상이 아니다. 운영 고객센터의 SupportContactCard와 ContentSection·ContentHeader는 유지한다. StatePanel을 포함한 삭제 범위와 확인 결과는 [공통 컴포넌트 제거](ui.md#스토리-전용미사용-공통-컴포넌트-제거-2026-10-28)를 따른다.

## 얇은 제목 래퍼 제거 (2026-10-28)

현재 계정 제목은 `ContentHeader`를 직접 사용한다. `AccountFormHeader`의 운영 소비처 5개(계정 찾기·비밀번호 재설정·가입 방식·본인인증 페이지, `AccountFormLayout`)에 h1, PC heading7/MO heading5, 제목 ID, body3 설명과 기본 tertiary/본인인증 subtle 색상, 각 호출부의 간격을 옮겼다. `titleId`는 `titleProps.id`, `descriptionTone`은 `descriptionProps.tone`, `spacingCss`는 `css`로 전달한다. 폼의 `aria-labelledby`와 ContentSection의 기존 header 슬롯·본문 gap은 유지한다.

`AccountFormHeader`를 삭제하고, 운영·스토리 사용처가 없는 `SectionHeading`, `PageHeader`, `AccountSectionHeader`도 사용자 승인에 따라 삭제했다. Typography의 동명 `SectionHeading` 스토리는 독립 예시이므로 유지한다. 새 헤더 API·preset·호환 래퍼는 추가하지 않았다.

아래의 AccountFormHeader 유지 권고와 어댑터 표는 최초 조사 당시 기록이며 이번 직접 사용 결정으로 대체된다. 삭제 전 구현의 출처는 `6f76f7334c7eb4ae0279d4340226998aeb4aebf6`의 해당 파일이며, 기존 생성·출처 메타데이터는 당시 기록으로 보존한다. 현재 구현과 검증은 [UI 기록](ui.md#얇은-래퍼-직접-사용-전환-2026-10-28)을 따른다.

## 사이즈 가이드 적용 (2026-10-21)

SizeGuidePanel의 품목 제목은 기본 ContentSection header의 h2/heading7로 옮겼고, 사이즈 차트는 h3/body2/bold와 orientation="horizontal"·action의 단위 선택으로 합성했다. 기본 header API로 표현 가능하므로 별도 header 노드는 사용하지 않는다. 바깥 20px gap, 차트 본문 4px gap과 가로 제목/액션 12px gap을 유지한다. PC·모바일 8개 품목의 제목·이미지·버튼·표 위치/크기를 실제 브라우저에서 적용 전후 비교해 동일함을 확인했다. [전체 재사용 기록](size-guide.md#재사용-개선과-사이드-메뉴-순서-2026-10-21)을 참고한다.

## 가로형 ContentHeader 소비처 확대 (2026-10-20)

고객센터 공지·문의 파일 첨부, 최근 검색어, 쿠폰 카드, 상품 옵션, 휴대폰 인증약관과 MainSectionHeader·SectionHeading·OrderStatusTracker의 9개 구성에 orientation/action을 적용했다. 기존 ContentSection 또는 제목과 본문 간격을 소유하는 구성은 title/headerProps 기본 API를 사용한다. MainSectionHeader는 중앙 contentFrame 너비, SectionHeading은 기존 제목 레벨 API를 전달하는 어댑터를 유지한다.

기존 HStack 기본 gap 8px과 Flex의 normal gap을 구분하고, 최근 검색어의 PC flex-start·모바일 space-between, 쿠폰의 flex-start 정렬, 공지 pb=6·약관 mb=2를 보존한다. 중첩 headerProps 스타일은 css.raw로 추출한다. 주문 현황의 헤더 mb=3은 ContentSection gap=3으로 옮겼다. 제목 레벨·ID·타이포그래피, 조건부 액션, 링크·콜백과 파일 입력 ref를 유지하며 상품 옵션 본문 children도 직접 렌더링한다.

기존 표의 MainSectionHeader·OrderStatusTracker·CouponCard 가로 액션 유지 판정은 이번 적용으로 대체한다. InquiryBoardHeader는 제목/체크박스 그룹과 별도 우측 액션의 2단 구성을 유지한다. 모달·BottomSheet의 전용 헤더, PersonalizationCard의 small eyebrow, 장바구니 제목/건수·진행 단계, 제목이 아닌 가격·필드 라벨·목록 행은 이관하지 않는다.

검증: 타입·변경 파일 ESLint/Prettier·Panda 생성·Next/Storybook production build, 기존 폼/계정 복구/주문 합계 테스트 40개가 통과했다. 실제 컴포넌트 SSR fixture 11개(최근 검색어 빈 상태·상품 옵션 액션 없음 포함)를 Chrome에서 1280px/375px로 비교한 22개 사례에서 제목·액션·목록·본문의 좌표/크기·타이포그래피·색상 차이가 없었다. 정적 Storybook에서 두 화면 폭의 검색어 전체 삭제·쿠폰 상세 열기/닫기·약관 모두동의/상세·파일 첨부/삭제·상품 사이즈 가이드 팝업 등 10개 동작도 확인했다. 사이즈 가이드의 외부 응답은 가로채고 팝업 대상 URL만 검사했다. 임시 fixture 기반 비교이며 실제 API 통합 검증을 의미하지 않는다.

제목 그룹은 ContentHeader(H), 헤더와 후속 그룹의 간격은 ContentSection(S)으로 공통화할 수 있다. **단일 제목도 ContentHeader를 사용하며, 본문과 함께 묶을 때는 ContentSection의 title/headerProps로 기본 헤더를 생성한다.** 모든 제목에 H를 추가하거나 모든 Stack을 S로 바꿀 필요는 없다. 같은 간격의 본문 Stack을 중첩하지 말고 직접 자식으로 둔다.

후속 footer 슬롯·children 선택화와 소비처 이관은 [하단 액션 구현](footer-actions.md#footer-구현과-적용-2026-10-20)을 참고한다.

## 코드 이관과 기본 헤더 API (2026-10-20)

조사 후 요청에 따라 적용했다. UI 영역 65파일(소비처에서 처리한 제목 어댑터 자체는 제외)과 ContentHeader/ContentSection 2파일을 변경하고 공용 API 스토리 2개를 추가했다. 이미 적용된 SignupLayout도 새 기본 헤더 API로 정리했다. 일반 헤더 37곳을 title/headerProps 기본 방식으로 연결했으며 개별 ContentHeader 사용처와 이후 추가한 본문 소제목은 이 수와 별도다.

```tsx
<ContentSection
  as="section"
  gap="4"
  title="함께 구매하면 좋은 상품"
  headerProps={{ titleProps: { web: 'heading8', mo: 'heading7' } }}
>
  <RecommendationList />
</ContentSection>
```

ContentHeader는 설명 없이 제목만 있을 때도 기본 제목 그룹이다. ContentSection의 title은 ReactNode이며 headerProps로 titleAs·titleProps·description·descriptionProps·eyebrow·헤더 내부 gap을 전달한다. section gap은 헤더/본문 및 직접 형제 그룹 간격이다. title/headerProps와 custom header는 동시에 전달할 수 없다. 일반적인 가로 action은 headerProps.orientation="horizontal"과 headerProps.action으로 조합한다. Divider·아이콘/기존 기능 어댑터 등 기본 API로 표현할 수 없는 경우만 별개 header 노드를 쓴다.

h4/h5 제한은 h1~h6 지원으로 해소했다. 2026-10-22 후속 정리에서 CustomerCenterLayout의 `headingProps`와 자동 제목 하단 간격을 제거했다. 페이지별 ContentHeader gap과 본문 첫 간격은 각 기능 페이지가 소유하며, 고객센터 메인의 사용자 정의 header 노드는 `ContentSection.header`로 전달한다. PC 가로 Grid와 별도 간격·padding·form·native 목록 의미는 보존했다. MainContentCard는 기존 header 태그/card__header class와 variant 스타일을 유지한다. 미사용 SupportMileageContent는 제목 조합만 정리했으며 운영 경로를 새로 만들지 않았다.

기존 구성 유지 판정은 그대로다. MyPageProductHistoryHeading은 단일 어댑터를 유지하고 소비처 MyPageProductHistory에서 S를 적용했다. 조사 당시의 ‘단일 제목을 Typography 노드로 직접 전달’ 권장은 사용자 후속 요청에 따라 기본 title API 사용으로 대체했다. 아래 후보 표의 줄 번호와 선행 조건은 이관 전 조사 기준이다.

Codex가 2026-10-20에 타입 검사·변경 TSX ESLint/Prettier·Panda 생성·Next/Storybook 프로덕션 빌드와 기존 테스트 40개를 확인했다. 변경 전후 PC/MO 80개 사례의 제목·본문·컨트롤 좌표/스타일/native 속성 비교와 공용 API·가입·로그인·인증·쿠폰·결제 Storybook 동작 30개가 모두 통과했다. 스킬 검증기도 통과했다. 이 검증은 로컬 fixture와 화면 동작을 대상으로 하며 외부 서비스 연동 검증을 의미하지 않는다.

후속 요청으로 AccountFormLayout·CustomerCenterLayout·OrderPageLayout의 `<div>{children}</div>`를 `{children}`으로 정리했다. Fragment 자체는 DOM을 생성하지 않으므로 최상위 본문 요소에 섹션의 gap이 적용된다. 위 80개 비교는 이 후속 변경 이전의 검증 기록이며, 래퍼 제거 후에는 타입·변경 파일 린트/포맷을 확인했다.

## 범위와 방법

2026-10-20 작업 트리의 `src/**/*.tsx` 718개를 TypeScript AST로 조사했다. native h1~h6, 실제 JSX 속성의 `as="h1"`~`as="h6"`, PageHeader/SectionHeader/AccountFormHeader/ContentHeader 호출과 부모·형제 구성을 추적했다. 추가로 role/aria-level·동적 as·heading/Title Typography variant와 기존 제목 컴포넌트를 쓰는 레이아웃을 검색했다. 중첩 JSX의 as가 상위 컴포넌트 속성 검색에 잘못 잡히지 않도록 실제 속성을 판별했다.

주 조사 목록은 운영 소스의 제목/기존 헤더 작성 위치 115곳·92파일이다. 개발 문서/화면 19곳·6파일, Storybook fixture 9곳·1파일은 따로 분류했다. 최초 조사에는 Mockup 22곳·12파일이 있었으나 조사 중 별도 작업으로 삭제되어 최신 후보에서 제외했다. 최신 작업 트리에는 Mockup 폴더가 없다. 이는 **소스 작성 위치**이며 실제 렌더링 개수나 운영 경로 도달성의 집계가 아니다. 반복 map·조건부·title 슬롯은 소비처를 추가 확인했다. 미사용 소스는 별도로 표시했다.

운영 소스 92파일의 분류: 즉시 적용 후보 36파일, 조건 확인 후 후보 25파일, 이미 적용 2파일, 기존 구성 유지 29파일. 한 파일에 적용 완료와 신규 후보가 함께 있으면 신규 후보에 분류하고 행에서 구분했다. 아래 표는 이관 전 92파일의 조사 판정을 기록한다. 적용 상태와 최신 API는 아래 이관 결과가 우선한다.

## API 적용 기준

- 현재 H는 titleAs가 h1~h6이며 eyebrow와 description을 p로 출력한다. 각 Typography props와 Stack gap/정렬을 전달할 수 있지만 action·Divider·임의 children 슬롯은 없다. h4/h5도 원래 레벨로 지원한다. small eyebrow·div description은 현재 p 고정 계약과 다르다.
- S는 title/headerProps로 기본 H를 만들고 children을 Stack으로 배치한다. action·구분선·기존 어댑터처럼 기본 구조에 맞지 않을 때만 header ReactNode를 사용한다. 기존 action HStack·아이콘 헤더를 그대로 슬롯으로 전달할 수 있다. S의 기본 gap=6과 H의 기본 gap=3을 현재 간격 대신 일괄 적용하지 않는다.
- 서로 다른 간격은 각각의 소그룹이 소유한다. 부모의 공통 gap과 같은 값을 가진 단순 본문 Stack은 제거할 수 있다. Grid·목록 의미·직접 자식 selector·conditional content·form 및 portal 소유권을 먼저 확인한다.
- ‘즉시’는 현재 API로 구현 가능한 소스 근거가 충분하다는 판단이다. 적용/브라우저 검증을 완료했다는 뜻이 아니다. 기존 h1/h2/h3·ID·labelledby·Typography 스케일/색/PC·MO 값·이벤트는 그대로 전달한다.

## 전체 판정

### 즉시 적용 후보

| 파일·기준 줄                                                                                                                                                 | API | 적용 영역                                   | 보존할 계약·판단 근거                                                                         |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------ | --- | ------------------------------------------- | --------------------------------------------------------------------------------------------- |
| [components/layouts/AccountFormLayout/AccountFormLayout.tsx:34](../../src/components/common/layouts/AccountFormLayout/AccountFormLayout.tsx)                 | S   | 계정 헤더 → children                        | 기존 헤더 mb PC40/MO32를 S gap으로 이전. 별도 actions 간격 유지                               |
| [components/organisms/Account/AlreadyRegisteredModal.tsx:28](../../src/components/common/organisms/Account/AlreadyRegisteredModal.tsx)                       | H   | 기존 가입 제목·설명                         | gap=4와 body/heading/description 클래스·별도 footer 유지                                      |
| [components/organisms/Account/MarketingConsentSummaryModal.tsx:33](../../src/components/common/organisms/Account/MarketingConsentSummaryModal.tsx)           | H   | 수신 내역 제목·설명                         | gap=4, h2 body2/p body4·개행 표시 클래스 유지                                                 |
| [components/organisms/MyPage/CouponManager.tsx:48,97](../../src/components/common/organisms/MyPage/CouponManager.tsx)                                        | H+S | 쿠폰 등록 제목·설명 → form                  | H gap=4/S gap=4, h1 heading8/heading5·설명 body3/subtle. 내역 그룹은 이미 적용됨              |
| [components/organisms/MyPage/EmployeeCoupons.tsx:70](../../src/components/common/organisms/MyPage/EmployeeCoupons.tsx)                                       | S   | 제목 → 임직원 쿠폰 목록                     | section·aria-label·gap=4 유지. ref·높이 측정·애니메이션은 목록 소유                           |
| [components/organisms/OrderRecommendations/OrderRecommendations.tsx:12](../../src/components/common/organisms/OrderRecommendations/OrderRecommendations.tsx) | S   | 추천 제목 → 가로 상품 목록                  | section·gap=4·overflow=hidden 유지. 내부 HStack 스크롤 유지                                   |
| [components/organisms/Search/RecentSearches.tsx:22](../../src/components/common/organisms/Search/RecentSearches.tsx)                                         | S   | 제목+전체삭제 → 목록/빈 상태                | 액션 HStack을 header 슬롯에 사용. mb=24px를 gap=6으로 이전. H 직접 적용 불가                  |
| [components/organisms/Search/RecommendedSearches.tsx:10](../../src/components/common/organisms/Search/RecommendedSearches.tsx)                               | S   | 추천 검색어 → ul                            | labelledby와 section 유지. ul mt=24px를 S gap=6으로 이전. Flex ul 유지                        |
| [components/organisms/Search/SearchSuggestions.tsx:40](../../src/components/common/organisms/Search/SearchSuggestions.tsx)                                   | S   | 인기 검색어 → ol                            | 해당 section에만 적용. ol mt=24px를 gap=6으로 이전. 상위 PC 2열 Grid 유지                     |
| [components/organisms/Signup/SignupDetailsStep.tsx:69](../../src/components/common/organisms/Signup/SignupDetailsStep.tsx)                                   | H   | 기본 정보 입력 제목·설명                    | h2 heading7, p body4/tertiary, gap=9px. form/입력 mt=4 유지                                   |
| [components/organisms/Signup/SignupMethodStep.tsx:41](../../src/components/common/organisms/Signup/SignupMethodStep.tsx)                                     | S   | AccountFormHeader → 혜택 Grid·링크          | H 간접 적용. 기존 gap=6만 대체. 가입 버튼 mt=9는 별도 유지                                    |
| [components/organisms/Signup/SignupTermsStep.tsx:65](../../src/components/common/organisms/Signup/SignupTermsStep.tsx)                                       | H   | 약관 동의 제목·설명                         | terms-title·h2, gap=9px. Grid·전체동의·약관·버튼의 다른 간격 유지                             |
| [features/account-locked/AccountLockedContent.tsx:22](../../src/components/features/account-locked/AccountLockedContent.tsx)                                 | H   | 잠금 상태 제목·설명                         | gap=4, h2 body2/p body4와 모바일 span 줄바꿈. 기존 모달 유지                                  |
| [features/checkout/CheckoutPayment.tsx:25](../../src/components/features/checkout/CheckoutPayment.tsx)                                                       | S   | 결제 정보 → 결제 방법·안내                  | section gap=4. radiogroup·label/input·조건별 안내 유지                                        |
| [features/checkout/CheckoutShipping.tsx:17](../../src/components/features/checkout/CheckoutShipping.tsx)                                                     | S   | 배송지 제목 → 편집/저장주소·요청            | section gap=4. 기존 상태·FormData·요청값 수명 유지                                            |
| [features/checkout/CheckoutSummary.tsx:20](../../src/components/features/checkout/CheckoutSummary.tsx)                                                       | S   | 상품 제목 → 상품 목록·안내·할인             | section gap=4. 다른 간격을 가진 하위 그룹은 유지                                              |
| [features/find-account/FindAccountContent.tsx:61](../../src/components/features/find-account/FindAccountContent.tsx)                                         | S   | AccountFormHeader → form                    | H 간접 적용. mb PC40/MO32만 S gap으로 이전. 폼 내부와 outsideContent 결과 유지                |
| [features/find-account/PasswordResetCompleteModal.tsx:24](../../src/components/features/find-account/PasswordResetCompleteModal.tsx)                         | H   | 변경완료 제목·설명                          | gap=4, h2 body2/p body4. 기존 확인 모달 유지                                                  |
| [features/find-account/PasswordResetContent.tsx:46](../../src/components/features/find-account/PasswordResetContent.tsx)                                     | S   | AccountFormHeader → form                    | H 간접 적용. H gap=10px·본문 전 PC40/MO32, form class/onSubmit 유지                           |
| [features/identity-verification/IdentityVerificationContent.tsx:23](../../src/components/features/identity-verification/IdentityVerificationContent.tsx)     | S   | AccountFormHeader → 인증 Grid               | H 간접 적용. 본문 전 32px와 하단 주의사항 16px를 분리 보존                                    |
| [features/login/LoginLayout.tsx:14](../../src/components/features/login/LoginLayout.tsx)                                                                     | S   | 로그인 제목 → 본문                          | h1 loginTitle·login-title을 header 슬롯에 그대로 전달. mb=10을 gap=10으로 이전. H 추가 불필요 |
| [features/login/LoginMembership.tsx:17](../../src/components/features/login/LoginMembership.tsx)                                                             | H+S | 혜택 제목·설명 → 가입 링크                  | H gap=2/S gap=6, membership-title, section·border·PC/MO mt/pt 유지                            |
| [features/mypage/MyPage.tsx:171,206,303](../../src/components/features/mypage/MyPage.tsx)                                                                    | S   | 메뉴 섹션·사용자/등급 그룹·주문 내역        | 메뉴 gap=4·Divider, 사용자 gap=4 유지. 주문 내역은 전체보기 HStack을 header 슬롯에 사용       |
| [features/mypage/MyPageAddresses.tsx:147,183](../../src/components/features/mypage/MyPageAddresses.tsx)                                                      | S   | 추가/수정 제목 → form                       | 편집 분기 gap=5·px/pt/pb 유지. 목록의 제목+badge는 H 대상 아님                                |
| [features/mypage/MyPageProfile.tsx:58,130,209](../../src/components/features/mypage/MyPageProfile.tsx)                                                       | S   | 상위 제목 및 조회/편집 동의 제목 → 본문     | 상위 gap=6, 편집 동의 gap=5·조회 gap=6 구분. 내부 상태/입력 props 유지                        |
| [features/mypage/MyPageRewards.tsx:95,170,176](../../src/components/features/mypage/MyPageRewards.tsx)                                                       | S   | 회원 공통 혜택 → 반복 혜택·ol               | 외부 gap=5·반복 section gap=3 보존. 상단 복합 h1는 유지                                       |
| [features/mypage/MyPageStatusPage.tsx:82](../../src/components/features/mypage/MyPageStatusPage.tsx)                                                         | S   | page.title → 지표/데이터 목록               | gap=6, h1 heading8/heading5. referral 분기와 기존 데이터 컴포넌트 유지                        |
| [features/mypage/MyPageWithdrawalDialog.tsx:23](../../src/components/features/mypage/MyPageWithdrawalDialog.tsx)                                             | H   | 탈퇴 제목·설명                              | gap=4, h2 heading9/p body3. 확인/취소는 기존 footer                                           |
| [features/phone-verification/PhoneVerificationDetailDialog.tsx:47](../../src/components/features/phone-verification/PhoneVerificationDetailDialog.tsx)       | H   | 사업자별 제목·목록 설명                     | 반복 소스 1곳. gap=3, h2 body3/p body4. 마지막 항목 border/pb 분기 유지                       |
| [features/product/ProductDetailDeliverySection.tsx:23](../../src/components/features/product/ProductDetailDeliverySection.tsx)                               | S   | 배송/반품 제목 → children                   | 이미 feature 어댑터. 내부만 S로 위임하며 section·gap=5·aria-label 유지                        |
| [features/product/ProductInformation.tsx:33,38,49](../../src/components/features/product/ProductInformation.tsx)                                             | H+S | 설명/반복 특징 h3+p·최상위 제목/내용        | H gap=6, 상위 section gap=10·h2→설명 gap=6 유지. dl/dt/dd는 그대로                            |
| [features/run-club/RunClubHeader.tsx:15](../../src/components/features/run-club/RunClubHeader.tsx)                                                           | H+S | 런클럽 제목·설명 → 필터                     | H gap PC8/MO4·PC 중앙/MO 좌측 정렬. S gap=10과 header 모바일 px/pb 유지                       |
| [features/run-club/RunClubSessionCard.tsx:58](../../src/components/features/run-club/RunClubSessionCard.tsx)                                                 | H   | 세션 제목·일정 설명                         | H gap PC4/MO2·제목 heading6/body1·설명 body3/body4. badge/overlay/CTA 유지                    |
| [features/signup-registration/RegistrationAdditionalFields.tsx:12,37](../../src/components/features/signup-registration/RegistrationAdditionalFields.tsx)    | S   | 마케팅 동의·부가정보 제목 → preference 목록 | 두 section gap=6, 내부 목록 gap=4·첫 section pb/border 유지                                   |
| [features/signup-terms/SignupTermsDetail.tsx:33](../../src/components/features/signup-terms/SignupTermsDetail.tsx)                                           | H   | 반복 약관 제목·본문                         | h2/p body4·gap=4·mb=4 유지. 반복 제목/본문은 ReactNode로 전달                                 |
| [features/support/SupportHours.tsx:9](../../src/components/features/support/SupportHours.tsx)                                                                | S   | 운영시간 제목 → 시간 Grid·주의문            | 배경/padding·gap=5 유지. 시간 Grid와 아이콘 HStack 유지                                       |

### 조건 확인 후 후보

| 파일·기준 줄                                                                                                                                               | API       | 적용 영역                             | 보존할 계약·판단 근거                                                                                                                                            |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------- | --------- | ------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [components/layouts/CustomerCenterLayout/CustomerCenterLayout.tsx:58](../../src/components/common/layouts/CustomerCenterLayout/CustomerCenterLayout.tsx)   | H+S       | 공통 고객센터 제목·설명 → 본문        | 기본 ContentHeader 또는 페이지가 소유한 header 노드를 지원한다. page-specific headingProps와 자동 본문 여백은 없으며 Divider·간격은 페이지가 소유한다.           |
| [components/molecules/ContactCard/ContactCard.tsx:52](../../src/components/common/molecules/ContactCard/ContactCard.tsx)                                   | H+S       | 연락처 제목·설명 → 상세·주의문        | 현재 article Grid gap=4. 공개 className과 grid-item·설명 생략 계약 확인 후 전환                                                                                  |
| [components/molecules/MainContentCard/MainContentCard.tsx:283](../../src/components/common/molecules/MainContentCard/MainContentCard.tsx)                  | H         | Card.Header의 제목·설명               | H as=header로 태그/기존 card__header class 보존 가능. variant별 gap/padding/음수 mt·runtime foreground·recipe.raw 병합을 먼저 확인. Card.Footer와 overlay는 유지 |
| [components/organisms/Signup/SignupCompleteStep.tsx:46](../../src/components/common/organisms/Signup/SignupCompleteStep.tsx)                               | H+S       | 완료 제목·환영 문구 → 링크            | H gap=3 가능. Grid justifyItems·체크 아이콘·direct-child span selector·링크 mt=7 확인                                                                            |
| [components/organisms/StoreFinder/StoreResults.tsx:54](../../src/components/common/organisms/StoreFinder/StoreResults.tsx)                                 | S         | 매장 제목 → 정보/조건부 지도/버튼     | 기존 Stack as=li·gap=3·padding/border·지도 높이·버튼과 목록 의미 유지. li를 임의의 div로 바꾸지 않음                                                             |
| [features/account-locked/AccountUnlockCompletePage.tsx:20](../../src/components/features/account-locked/AccountUnlockCompletePage.tsx)                     | H         | 완료 제목·설명                        | h1가 아이콘 포함 HStack. H title에 기존 h1를 넣으면 중첩됨. inline 구성 또는 header 슬롯 사용, p 줄바꿈 유지                                                     |
| [features/care-guide/CareGuidePage.tsx:23](../../src/components/features/care-guide/CareGuidePage.tsx)                                                     | S         | 번호+소제목 → 지침 ul                 | HStack을 header 슬롯에 사용. li·번호/본문 시작선·gap=2 유지. 단순 native li 변환으로 확장하지 않음                                                               |
| [features/cart/CartContent.tsx:65,123,134](../../src/components/features/cart/CartContent.tsx)                                                             | S         | 고객센터 안내/운영시간 소그룹         | 한 section gap=2에 여러 제목·전화·링크가 섞임. 소그룹 경계의 기존 8px 유지. 페이지 h1+건수 HStack 유지                                                           |
| [features/cart/CartOptionsDialog.tsx:79](../../src/components/features/cart/CartOptionsDialog.tsx)                                                         | S         | 상품명 → 옵션 그룹                    | 이미지가 먼저인 구조이므로 이미지 뒤 부분만 검토. gap=8·이미지 음수 margin·모달 scroll 유지                                                                      |
| [features/checkout/CouponDialog.tsx:78,95](../../src/components/features/checkout/CouponDialog.tsx)                                                        | S         | 상품 쿠폰·장바구니 쿠폰 소그룹        | 두 h2를 각각 묶되 상품 배열이 비었을 때의 간격/빈 wrapper 확인. 금액 요약은 별도                                                                                 |
| [features/mypage/MyPageProductHistoryHeading.tsx:7](../../src/components/features/mypage/MyPageProductHistoryHeading.tsx)                                  | S(소비처) | 상품내역 제목 → 목록                  | 제목 단일 Box에 H는 불필요. MyPageProductHistory의 조건부 빈 상태·padding·note와 함께 S 검토                                                                     |
| [features/not-found/NotFoundPage.tsx:24](../../src/components/features/not-found/NotFoundPage.tsx)                                                         | H+S       | 오류 제목·설명 → 홈 버튼              | H gap=3 가능. 아이콘 앞 순서·본문/버튼 두 32px 경계·중앙정렬·모바일 폭 확인                                                                                      |
| [features/phone-verification/PhoneVerificationAgreements.tsx:37](../../src/components/features/phone-verification/PhoneVerificationAgreements.tsx)         | S         | 제목+모두동의 → 목록                  | HStack header 슬롯, mb=2만 gap으로 이전. 오류/약관/fieldset 연결 유지                                                                                            |
| [features/phone-verification/PhoneVerificationContent.tsx:29](../../src/components/features/phone-verification/PhoneVerificationContent.tsx)               | S         | 인증 정보 제목 → form                 | Box my=6의 앞/뒤 경계를 각각 보존. 앞 24px는 시작 공간, 뒤 24px만 gap. 문의 mt=4 유지                                                                            |
| [features/product/ProductDetailAfterSalesContent.tsx:93,111,135,148,162,209,216](../../src/components/features/product/ProductDetailAfterSalesContent.tsx) | H(확장)/S | h4/p 링크·절차·h5 Q&A                 | H는 h1~h3만 지원하므로 h4/h5 확장 필요. PC 가로 Grid 문의/연락처는 그대로 유지                                                                                   |
| [features/product/ProductSupportLink.tsx:29](../../src/components/features/product/ProductSupportLink.tsx)                                                 | H(확장)   | h4 제목·설명                          | gap=2·p body5/tertiary 보존 가능. titleAs h4 지원이 선행, 레벨을 바꾸어 우회하지 않음                                                                            |
| [features/run-club/RunClubSessionGuideContent.tsx:13](../../src/components/features/run-club/RunClubSessionGuideContent.tsx)                               | H+S       | 세션 제목·설명 → facts/notes          | 제목 mb=16px, 설명 뒤 PC20px/MO24px 구분. notes의 자체 여백도 확인                                                                                               |
| [features/run-club/RunClubSessionHero.tsx:50](../../src/components/features/run-club/RunClubSessionHero.tsx)                                               | H+S       | 세션 제목·일정 → opening/facts/액션   | badge 뒤12px·제목/일정10px·일정 뒤 PC24/MO40px·opening 조건별 간격. 외부 2열 Grid 유지                                                                           |
| [features/run-club/RunClubSessionPoster.tsx:21](../../src/components/features/run-club/RunClubSessionPoster.tsx)                                           | H         | 보조 문구·제목·날짜                   | 18px/28px로 서로 다른 간격과 마지막 span. 단일 H gap으로 덮지 말고 별도 계약 검토                                                                                |
| [features/signup-registration/RegistrationCompleteContent.tsx:20](../../src/components/features/signup-registration/RegistrationCompleteContent.tsx)       | S         | 가입완료 제목 → 아이콘·완료 문구·버튼 | H에 제목과 설명을 합치면 중간 아이콘 순서 변경. 기존 제목만 header 슬롯에 두고 gap=8·중앙정렬·하위 gap=4 유지                                                    |
| [features/support/ShippingReturnsPage.tsx:118,130,151,160](../../src/components/features/support/ShippingReturnsPage.tsx)                                  | S         | GuidePanel의 배송/반품 소그룹         | 공통 패널 border/padding·여러 h3를 유지. 구역별 적용 시 같은 gap wrapper 중복 금지                                                                               |
| [features/support/SupportContactCard.tsx:25](../../src/components/features/support/SupportContactCard.tsx)                                                 | S         | 연락처 카드 제목 → 설명·전화          | 외부 gap PC6/MO5 보존. 설명/전화 내부 gap PC4/MO3는 그대로. 설명을 H로 올리면 간격 달라짐                                                                        |
| [features/support/SupportFaq.tsx:9](../../src/components/features/support/SupportFaq.tsx)                                                                  | S         | 제목+Divider → 설명/CTA               | Divider는 PC 전용·본문 pt PC64/MO16. gap=6으로 일괄 교체 불가                                                                                                    |
| [features/support/SupportMileageContent.tsx:7](../../src/components/features/support/SupportMileageContent.tsx)                                            | H         | 마일리지 제목·설명                    | 프로덕션 import가 없는 잔여 구성. article 기본 margin 확인 후 필요할 때 적용                                                                                     |
| [features/support/SupportNotices.tsx:29](../../src/components/features/support/SupportNotices.tsx)                                                         | S         | 제목+전체보기·Divider → 목록          | 액션 HStack을 슬롯으로 유지. pb=6과 Divider/목록 경계를 계산 후 이전                                                                                             |

### 이미 적용

| 파일·기준 줄                                                                                                                                     | API | 적용 영역                  | 보존할 계약·판단 근거                                                                 |
| ------------------------------------------------------------------------------------------------------------------------------------------------ | --- | -------------------------- | ------------------------------------------------------------------------------------- |
| [components/molecules/AccountFormHeader/AccountFormHeader.tsx:23](../../src/components/common/molecules/AccountFormHeader/AccountFormHeader.tsx) | H   | 계정 제목 어댑터           | ContentHeader 사용 중. 계정 기본값·titleId·spacingCss를 유지하므로 어댑터 제거 불필요 |
| [features/signup/SignupLayout.tsx:24](../../src/components/features/signup/SignupLayout.tsx)                                                     | H+S | 보조 문구·제목 → 진행 단계 | H gap=2/S gap=7 적용됨. step=0 생략과 진행 단계 하단34px 유지                         |

### 기존 구성 유지

| 파일·기준 줄                                                                                                                                                | API  | 적용 영역 | 보존할 계약·판단 근거                                                                                         |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------- | ---- | --------- | ------------------------------------------------------------------------------------------------------------- |
| [components/atoms/EmptyState/EmptyState.tsx:85](../../src/components/common/atoms/EmptyState/EmptyState.tsx)                                                | keep | 전용 구성 | 상태별 제목/설명/아이콘/액션을 이미 제공                                                                      |
| [components/layouts/BottomSheet/BottomSheetTitle.tsx:10](../../src/components/common/layouts/BottomSheet/BottomSheetTitle.tsx)                              | keep | 전용 구성 | 단일 h2와 BottomSheet 접근성 계약                                                                             |
| [components/layouts/ContentLayout/ContentHeader.tsx:38](../../src/components/common/layouts/ContentLayout/ContentHeader.tsx)                                | keep | 전용 구성 | Breadcrumb·action·SectionHeader·제목 없는 설명 분기를 소유. 새 molecule과 동명이지만 API가 다름               |
| [components/layouts/ContentLayout/ContentLayout.tsx:70](../../src/components/common/layouts/ContentLayout/ContentLayout.tsx)                                | keep | 전용 구성 | sticky 헤더 ref/측정·폭과 본문 배치를 소유                                                                    |
| [components/molecules/Account/AccountSectionHeader.tsx:7](../../src/components/common/molecules/Account/AccountSectionHeader.tsx)                           | keep | 전용 구성 | SectionHeader strong divider/action 어댑터                                                                    |
| [components/molecules/MainSection/MainSectionHeader.tsx:20](../../src/components/common/molecules/MainSection/MainSectionHeader.tsx)                        | keep | 전용 구성 | 가로 action·페이지 최대폭을 소유                                                                              |
| [components/molecules/MyPage/PersonalizationCard.tsx:44](../../src/components/common/molecules/MyPage/PersonalizationCard.tsx)                              | keep | 전용 구성 | eyebrow가 small. H는 p로 출력하므로 현재 API로 의미 보존 불가. title margin·가로 액션 유지                    |
| [components/molecules/OrderStatusTracker/OrderStatusTracker.tsx:32](../../src/components/common/molecules/OrderStatusTracker/OrderStatusTracker.tsx)        | keep | 전용 구성 | 가로 전체보기 헤더와 상태 트래커가 이미 명확                                                                  |
| [components/molecules/PageHeader/PageHeader.tsx:8](../../src/components/common/molecules/PageHeader/PageHeader.tsx)                                         | keep | 전용 구성 | SectionHeader의 action·페이지 여백 어댑터                                                                     |
| [components/molecules/PageSection/PageSection.tsx:20](../../src/components/common/molecules/PageSection/PageSection.tsx)                                    | keep | 전용 구성 | strong divider·독립 시작 여백을 소유. S 기본 간격을 임의 도입하지 않음                                        |
| [components/organisms/Hero/HeroCopy.tsx:49](../../src/components/common/organisms/Hero/HeroCopy.tsx)                                                        | keep | 전용 구성 | 설명이 div이고 hero 전용 구성. H description=p로 바꾸지 않음                                                  |
| [components/organisms/InquiryBoard/InquiryBoard.tsx:152](../../src/components/common/organisms/InquiryBoard/InquiryBoard.tsx)                               | keep | 전용 구성 | 제목/건수·체크박스·컨트롤의 가로 보드 헤더                                                                    |
| [components/organisms/Layout/SiteFooter/FooterLegalLinks.tsx:38](../../src/components/common/organisms/Layout/SiteFooter/FooterLegalLinks.tsx)              | keep | 전용 구성 | 법적 사업자 정보 landmark·gridArea와 정보/링크 구성이 독립적                                                  |
| [components/organisms/Layout/SiteFooter/FooterNavigationWeb.tsx:32](../../src/components/common/organisms/Layout/SiteFooter/FooterNavigationWeb.tsx)        | keep | 전용 구성 | 내비게이션 열 gridColumn·링크 구조 유지                                                                       |
| [components/organisms/Layout/SiteHeader/MegaMenuList.tsx:53](../../src/components/common/organisms/Layout/SiteHeader/MegaMenuList.tsx)                      | keep | 전용 구성 | 메뉴 열과 링크 Grid·hover 관계 유지                                                                           |
| [components/organisms/Member/MemberHero.tsx:57](../../src/components/common/organisms/Member/MemberHero.tsx)                                                | keep | 전용 구성 | small 보조 문구·조건부 진행 설명·각기 다른 margin. H의 p eyebrow/단일 description과 다름                      |
| [components/organisms/MyPage/CouponCard.tsx:23](../../src/components/common/organisms/MyPage/CouponCard.tsx)                                                | keep | 전용 구성 | 제목+상세보기 가로 액션 헤더                                                                                  |
| [components/organisms/Navigation/SideNavigation/SideNavigation.tsx:121](../../src/components/common/organisms/Navigation/SideNavigation/SideNavigation.tsx) | keep | 전용 구성 | 내비게이션 그룹의 단일 제목                                                                                   |
| [features/checkout/CheckoutLayout.tsx:17](../../src/components/features/checkout/CheckoutLayout.tsx)                                                        | keep | 전용 구성 | 주문 단계 전용 OrderPageLayout과 모바일 완료 제목 숨김                                                        |
| [features/locales/LocaleRegionHeading.tsx:13](../../src/components/features/locales/LocaleRegionHeading.tsx)                                                | keep | 전용 구성 | 지역명 단일 heading과 ID/여백 어댑터                                                                          |
| [features/locales/LocalesHeading.tsx:28](../../src/components/features/locales/LocalesHeading.tsx)                                                          | keep | 전용 구성 | globe SVG+제목의 가로 중앙정렬·고유 높이                                                                      |
| [features/login/RememberIdHelp.tsx:46](../../src/components/features/login/RememberIdHelp.tsx)                                                              | keep | 전용 구성 | Popover.Title render props·접근성/트리거 계약                                                                 |
| [features/product/ProductDetailHeaderTitle.tsx:14](../../src/components/features/product/ProductDetailHeaderTitle.tsx)                                      | keep | 전용 구성 | 상품명+가격. 가격을 설명으로 재분류하지 않음                                                                  |
| [features/product/ProductDetailImageViewer.tsx:62](../../src/components/features/product/ProductDetailImageViewer.tsx)                                      | keep | 전용 구성 | srOnly 제목·뷰어 focus/keyboard 계약                                                                          |
| [features/product/ProductDetailReturnGuide.tsx:44](../../src/components/features/product/ProductDetailReturnGuide.tsx)                                      | keep | 전용 구성 | PC 가로 Grid/모바일 세로의 h4/ol 구성                                                                         |
| [features/product/ProductSupportContact.tsx:21](../../src/components/features/product/ProductSupportContact.tsx)                                            | keep | 전용 구성 | PC 가로 Grid의 h4·여러 안내문, 이미 전용 연락처 컴포넌트                                                      |
| [공통 ProductOptionSection](../../src/components/common/molecules/ProductOptionSelectors/ProductOptionSection.tsx)                                          | keep | 전용 구성 | 제목/action HStack와 선택 컨트롤의 전용 구성                                                                  |
| [features/run-club/RunClubEmptyState.tsx:12](../../src/components/features/run-club/RunClubEmptyState.tsx)                                                  | keep | 전용 구성 | 모바일 Center의 단일 상태 문구                                                                                |
| [features/support/InquiryAttachments.tsx:42](../../src/components/features/support/InquiryAttachments.tsx)                                                  | keep | 전용 구성 | 파일 첨부 제목+파일찾기 액션의 HStack. 파일 input/ref·aria-describedby·목록/오류 수명 유지. H는 action 미지원 |

## 제목 컴포넌트를 소비하는 추가 레이아웃

아래 3파일은 위 92파일의 제목 작성 위치 목록과 별도로 확인했다. 신규 후보 파일은 합계 64파일(위 표의 즉시 36 + 조건부 25 + 아래 3)이며, 이미 적용된 2파일은 제외했다. MyPageProductHistoryHeading 행의 실제 S 적용 소유자는 아래의 MyPageProductHistory다.

| 파일                                                                                       | 판정/API      | 보존할 계약                                                                                                                                                                      |
| ------------------------------------------------------------------------------------------ | ------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [MainSection](../../src/components/common/molecules/MainSection/MainSection.tsx)           | 즉시 S 후보   | 내부 VStack을 S로 위임하고 MainSectionHeader를 header 슬롯에 전달. PC gap 40px/compact 32px·MO24px, alignItems=start, fullBleed/extended 폭과 바깥 section/container 계산은 유지 |
| [OrderPageLayout](../../src/components/common/layouts/OrderPageLayout/OrderPageLayout.tsx) | 조건부 S 후보 | 제목+단계의 기존 Flex header를 슬롯에 전달. headerSpacing default PC40/MO24·none PC0/MO24를 gap으로 이전할 수 있으나 children의 flex 참여·margin 계약 확인. 새 H는 불필요        |
| [MyPageProductHistory](../../src/components/features/mypage/MyPageProductHistory.tsx)      | 조건부 S 후보 | 현재 gap=6과 제목→상품/재입고 목록 경계. 빈 상태에서 제목도 생략하는 분기, 제목 padding·하단 안내·취소 모달의 독립성 유지                                                        |

## heading variant와 동적 태그 추가 조사

명시적 heading 태그 외에 heading/Title Typography variant 27곳·17파일을 확인했다. 이 중 5파일은 위 표와 중복이고, 추가 12파일은 아래처럼 현재 구성을 유지하는 편이 적합하다. **글자 크기가 heading인 span을 공통화만을 위해 h1/h2로 바꾸지 않는다.**

| 추가 파일                                                                                                          | 판단                                                                                        |
| ------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------- |
| [FooterNavigationMobile](../../src/components/common/organisms/Layout/SiteFooter/FooterNavigationMobile.tsx)       | 모바일 Collapsible/내비게이션 트리거 안의 제목. Header로 분리하지 않음                      |
| [MenuDrawerBackButton](../../src/components/common/organisms/Navigation/MenuDrawer/MenuDrawerBackButton.tsx)       | 돌아가기 버튼의 텍스트, 콘텐츠 제목 아님                                                    |
| [MenuDrawerGroups](../../src/components/common/organisms/Navigation/MenuDrawer/MenuDrawerGroups.tsx)               | 드로어 메뉴 그룹/선택 동작 유지                                                             |
| [MenuDrawerShoppingLinks](../../src/components/common/organisms/Navigation/MenuDrawer/MenuDrawerShoppingLinks.tsx) | 메뉴 링크 텍스트 유지                                                                       |
| [MenuDrawerUtilityLinks](../../src/components/common/organisms/Navigation/MenuDrawer/MenuDrawerUtilityLinks.tsx)   | 유틸리티 메뉴 링크 텍스트 유지                                                              |
| [ProductListTitle](../../src/components/features/catalog/product-listing/ProductListTitle.tsx)                     | 제목/검색결과와 건수의 가로 baseline 정렬. 순수 제목·설명 세로 패턴 아님                    |
| [NoticeDetailPage](../../src/components/features/notices/NoticeDetailPage.tsx)                                     | 글 제목·time의 가로 헤더와 별도 본문/목록 버튼. 표제/날짜를 description으로 재분류하지 않음 |
| [NoticeHeading](../../src/components/features/notices/NoticeHeading.tsx)                                           | 공지 제목·날짜 HStack, 말줄임과 time 유지                                                   |
| [ProductDetailSupport](../../src/components/features/product/ProductDetailSupport.tsx)                             | Accordion 제목들. 트리거 접근성/펼침 동작 유지                                              |
| [InquiryAnswer](../../src/components/features/support/InquiryAnswer.tsx)                                           | Q/A 장식 문자와 답변 본문. 일반 heading 아님                                                |
| [InquiryCautions](../../src/components/features/support/InquiryCautions.tsx)                                       | Accordion 트리거의 유의사항 제목. 임의 헤더 wrapper를 넣지 않음                             |
| [InquiryQuestion](../../src/components/features/support/InquiryQuestion.tsx)                                       | Accordion 안의 Q·답변 상태 badge·문의명·본문과 span 구조. H의 h/p를 삽입하지 않음           |

SectionHeader 자체는 동적 `as={Heading}`을 사용한다. h2 기본값, action·divider·spacing과 small eyebrow 계약을 확인했으며 기존 atom을 유지한다. 현재 ContentHeader와 이름이 같은 `layouts/ContentLayout/ContentHeader.tsx`는 Breadcrumb/액션/상태 프레임이므로 새 molecule의 직접 적용 완료로 집계하지 않았다.

## 개발 화면·Storybook·삭제된 Mockup

ButtonDocs·IconButtonDocs와 screen-index의 DesignGuideColor/DesignGuidePage/DesignGuideTypography/IaStructurePage는 버튼·색상·타입 예시와 IA 관리 UI다. 본문 섹션 기술적 적용은 가능하나 운영 화면 공통화 후보 수에는 포함하지 않는다. 실제 화면의 적용을 위해 예시용 제목을 제품 공통 컴포넌트로 일괄 교체하지 않는다.

Typography.stories.tsx의 9개 제목 작성 위치는 native/unstyled/scale 예시 fixture이며 그대로 유지한다. 이후 이관 구현에서는 해당 기능의 PC/MO 스토리를 검증 대상으로 사용하되 fixture 자체는 후보로 세지 않는다.

최초 조사 때 존재한 Mockup 12파일(ExploreDetailPage, ExploreHubPage, LaunchCalendarPage, ProductDetailSections, ProductReviews, ReviewGalleryModal, SizeGuideTable, RunningExperiencePage, ProfileQuestionGroup, RunningProfileContent, ShoeFinderPage, TeamwearPage)은 별도 작업의 삭제를 확인한 뒤 목록에서 제외했다. 삭제된 메뉴나 시안을 이 조사 때문에 되살리지 않는다. 최신 전체 TSX 재집계는 718개이며, 운영 제목 115곳·92파일은 최초 조사와 같았다.

## 적용 순서와 검증 범위

1. 쿠폰 등록·로그인 가입 안내·반복 확인 팝업·런클럽 카드처럼 제목/설명 계약이 명확한 H부터 적용한다. 기존 계정 화면은 AccountFormHeader 어댑터를 유지한다.
2. 결제 3영역·회원정보·배송지 편집·추가정보·추천 상품처럼 제목과 본문의 균일 간격이 명확한 S를 적용한다. 단일 제목에는 H를 강제하지 않는다.
3. 공통 CustomerCenterLayout·MainContentCard·런클럽 hero·GuidePanel은 조건부/가로 배치/recipe 영향을 확인한 뒤 처리한다. h4/h5 지원은 실제 소비처를 전제로 별도 API 변경으로 검토한다.

이 문단은 최초 조사 시점의 범위를 설명한다. 당시에는 컴포넌트 이관·API 확장·새 Storybook·브라우저 비교·빌드를 수행하지 않았다. 이후의 실제 변경과 검증은 위 코드 이관 절에 기록한다. 각 후보의 소스 위치, 형제 그룹, 현재 gap/여백·태그·타입 스케일·소비처를 확인했다. 구현 시 DOM/접근성·폼 이벤트·포털·PC/MO 간격과 의미 있는 오류/빈 상태·목록/모달 분기를 검증해야 한다. 과거의 헤더 이관 검증 기록을 이번 후보 전체의 검증으로 해석하지 않는다.

## 가로 헤더 API 확장 (2026-10-20)

제목과 우측 액션 조합을 ContentHeader의 orientation/action으로 지원하고 MyPageRecentOrders에 적용했다. 과거 표의 가로 action 제외 판단은 당시 API 기준이며, 이제 일반적인 제목·버튼 조합에는 기본 title/headerProps API를 우선한다. [현재 구성과 검증](ui.md#contentheader-가로형과-마이페이지-링크-스타일-2026-10-20)을 참고한다.

## 상품 옵션 섹션 공통화 (2026-10-23)

기존 ProductVariantSection/Action은 ProductOptionSection으로 통합했다. 상세의 section·기본 ContentHeader·action Flex·16px 간격과 장바구니 Stack·기존 텍스트 레이블·12px 간격을 유지한다. 위 조사 표의 전용 구성 유지 판정은 조사 당시 결과이며 이 후속 이관이 구현을 대체한다. [공통화와 검증](ui.md#상품-상세와-장바구니-옵션-선택-공통화-2026-10-23)을 참고한다.
