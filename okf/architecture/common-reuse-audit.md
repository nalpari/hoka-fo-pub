---
type: Report
title: '기준 커밋 이후 공통 UI 전수 대조'
description: '공통 67개 모듈과 기준 커밋 이후 변경된 소스의 재사용 판단·수정·디자인 검증을 기록한다.'
tags: [components, reuse, audit, responsive]
status: draft
generated:
  by: codex/gpt-6
  at: '2026-11-02T05:50:51Z'
source_revision: f47017b6a28b360f4a688bb7f85e39ab01dbef79
audit_base_revision: 72098f5991d18f316a26d808e047691ff4a356db
working_tree_sources:
  - src/components/common/atoms/Badge.tsx
  - src/components/common/atoms/Button.tsx
  - src/components/common/atoms/DescriptionList.tsx
  - src/components/common/atoms/Divider.tsx
  - src/components/common/atoms/EmptyState.tsx
  - src/components/common/atoms/StatusMessage.tsx
  - src/components/common/molecules/BindingFeedback.tsx
  - src/components/common/molecules/ContentHeader.tsx
  - src/components/common/molecules/ProductThumbnail.tsx
  - src/components/common/molecules/SearchField.tsx
  - src/app/mypage/addresses/_components/AddressManagement.tsx
  - src/app/mypage/coupons/_components/CouponManagement.tsx
  - src/app/mypage/event-entries/_components/RunningSessionEntriesContent.tsx
  - src/app/mypage/profile/_components/ProfileContent.tsx
  - src/app/mypage/reviews/_components/MyPageReviewsContent.tsx
  - src/app/mypage/rewards/_components/RewardsContent.tsx
  - src/app/mypage/rewards/page.tsx
  - src/app/support/_components/SupportContacts.tsx
  - src/app/support/_components/SupportQuickLinks.tsx
  - src/app/support/after-sales/_components/AfterSalesContent.tsx
  - src/app/support/faq/_components/FaqContent.tsx
  - src/app/support/inquiries/_components/InquiryListContent.tsx
  - src/app/support/inquiries/new/_components/InquiryFormContent.tsx
  - src/app/support/inquiries/page.tsx
  - src/app/support/notices/[id]/page.tsx
  - src/app/support/size-guide/_components/SizeGuidePanel.tsx
  - src/context/ShopShell.tsx
  - src/components/mypage/MyPageProductHistory.tsx
  - src/components/running-session/RunningSessionPage.tsx
  - src/components/catalog/ProductListingPage.tsx
  - src/app/signup/terms/_components/SignupTermsContent.tsx
  - src/components/common/layouts/OrderActionBar.tsx
  - src/app/_components/HomeContent.tsx
  - src/app/products/[id]/_components/ProductDetailContent.tsx
  - src/stories/components/common/molecules/BindingFeedback/BindingFeedback.stories.tsx
  - src/stories/components/common/molecules/ContentHeader/ContentHeader.stories.tsx
  - src/stories/components/common/molecules/ProductThumbnail/ProductThumbnail.stories.tsx
  - src/stories/components/common/molecules/SearchField/SearchField.stories.tsx
  - src/stories/components/common/atoms/Badge/Badge.stories.tsx
  - src/stories/components/common/atoms/Button/Button.stories.tsx
  - src/stories/components/common/atoms/DescriptionList/DescriptionList.stories.tsx
  - src/stories/components/common/atoms/Divider/Divider.stories.tsx
  - src/stories/components/common/atoms/EmptyState/EmptyState.stories.tsx
  - src/stories/components/common/atoms/StatusMessage/StatusMessage.stories.tsx
  - src/stories/components/common/layouts/OrderActionBar/OrderActionBar.stories.tsx
  - src/app/screen-index/sourceGraph.generated.json
---

# 기준 커밋 이후 공통 UI 전수 대조

## 조사 범위와 방법

기준은 `72098f5991d18f316a26d808e047691ff4a356db`를 제외한 이후 변경이다. 시작 HEAD `cc691836`의 소스 59개를 조사했고, 진행 중 커밋된 메인·상품 상세 두 작업도 포함해 최종 `f47017b6`까지 소스 65개(TSX 53개)를 대조했다. `src/components/common`은 67개 모듈(TSX 64개·보조 TS 3개) 전체를 목록화했다. 내부 함수·compound export·타입·기본 variant·제어 상태를 함께 살폈으며 파일 개수를 React 함수 개수로 표시하지 않는다.

공통 import가 제거된 diff만 찾지 않았다. TypeScript AST로 공통의 공개 API/JSX와 변경 파일의 import·JSX·소유자를 추출한 뒤 처음부터 작성된 제목·폼·상태·목록·이미지·버튼 조합도 비교했다. 스토리·생성 그래프·타입 선언은 실행 화면 수에 넣지 않되 호출 계약과 직접 참조를 확인했다. 준비된 데이터·쿼리·submit payload·ID·draft·성공/실패 처리와 요청은 기존 소유자에 남긴다. 새 서비스·provider·상태 엔진·전체 화면 forwarding 파일을 만들지 않았다.

이전 작업의 EmptyState/더보기/DataTable 복원은 현재 작업 트리의 출발 상태로 보존했다. 다른 채팅의 메인·상품 상세·검색·공통 스타일 변경을 reset하거나 전체 파일로 되돌리지 않았다. 문서의 검증은 완성 작업 트리를 대상으로 하며 개별 선별 커밋만의 결과가 아니다.

## 적용한 재사용

| 소유자                          | 추가·사용 옵션                                               | 주요 소비자와 보존한 경계                                                                                                  |
| ------------------------------- | ------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------- |
| ContentHeader / ContentSection  | time/dateTime·div 설명, 기존 title/headerProps/action/footer | 마이페이지·혜택·지원 연락처·바로가기·측정 안내·공지·홈 Hero·상품 안내. heading level·줄바꿈·그룹 간격·기존 부모를 유지     |
| DescriptionList                 | 행 className·개별 설명 타이포와 기존 slotStyles              | 프로필 조회/편집의 읽기 정보·수신 동의·문의 등록자·세션 hero/guide·상품 사양. mixed ReactNode·도움말·모바일 전용 행을 유지 |
| Button                          | unstyled, loadMore.text/inline                               | 메뉴·필터·이전 약관·재입고 취소·히어로 선택과 각 더보기. 기존 자식 DOM·aria·form·ref·disabled/loading·콜백을 유지          |
| Card                            | 기존 root 직접 사용                                          | 쿠폰·세션 article의 flex column·배경·간격과 의미를 유지                                                                    |
| Badge                           | 일반 라벨 textProps                                          | 신청 상태의 본문 스케일·상태 색을 유지. 옵션 미지정의 기본 14px 행간과 status/promotion/category 모드는 보존               |
| EmptyState                      | plain·의미 태그·레이아웃·title/description 타이포            | 기존 네 목록 외 리뷰 두 빈 목록·FAQ·문의·검색·상품 문의. 조회 중/실패 조건과 문구·role을 보존                              |
| ProductThumbnail                | summary·실제 sizes·width/height/loading                      | 재입고의 96px/64px·cover·배경·대체 텍스트 상속을 유지                                                                      |
| SearchField                     | as=div·icon·inputProps·root/input style slots                | 전체 검색이 기존 외부 form과 PC 헤더 input 연결을 유지. 기본 FAQ/검색 결과 폼은 그대로                                     |
| BindingFeedback / StatusMessage | pending 문구/오류 순서, 텍스트 스케일/색                     | 리뷰 pending·오류, 비밀번호 완료, 첨부/검색 오류. 서비스 동작·오류 보존·재시도 소유권은 그대로                             |
| Divider                         | vertical·length·color                                        | 인증 링크·세션 메타·상품 메타/사양의 장식 구분선. 기본 가로 variant는 그대로                                               |
| OrderActionBar                  | mobileOnly·section/ariaLabel                                 | 세션의 PC 숨김, 모바일 20 z-index와 safe area. 기본 주문/결제 모드와 native form 연결은 그대로                             |
| DataTable                       | 이전 striped·regular/compact 유지                            | 5품목 사이즈 표. caption·scope·스크롤·기존 default/spaced 보존                                                             |

`MyPageProductHistoryHeading`, `ProfileField`, `FaqEmptyState`, `InquiryEmptyState`의 표현만 전달하던 중복 함수를 제거했다. 책임이 있는 데이터 매핑/혼합 값·툴팁 구성 함수는 기존 모듈에 유지한다. 삭제한 소스 파일은 0개이며 공용 구현을 화면별로 복제하지 않았다.

## 공통 67개 모듈의 판단

`확장·적용`은 현재 소유자의 작은 typed 옵션, `적용`은 기존 API 직접 사용, `유지`는 이미 재사용하거나 책임·상태·의미가 다른 구성을 보존한 판단이다.

| 공통 모듈                                                                                                                                          | 판단과 근거                                                                                                                                                            |
| -------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [atoms/Accordion.tsx](../../src/components/common/atoms/Accordion.tsx)                                                                             | 유지: FAQ·문의·GNB에서 사용 중. 필터 Collapsible의 애니메이션·상태 수명을 아코디언으로 바꾸지 않는다.                                                                  |
| [atoms/Badge.tsx](../../src/components/common/atoms/Badge.tsx)                                                                                     | 확장·적용: textProps로 신청 상태 라벨을 통합. 등급의 도형 이니셜은 업무 그래픽으로 유지한다.                                                                           |
| [atoms/Button.tsx](../../src/components/common/atoms/Button.tsx)                                                                                   | 확장·적용: unstyled로 네이티브 버튼의 자식·스타일을 보존하고, loadMore.text/inline으로 더보기 내용을 통합한다.                                                         |
| [atoms/Card.tsx](../../src/components/common/atoms/Card.tsx)                                                                                       | 적용: 쿠폰·러닝세션 article에 직접 사용. section·form·정적 안내 Box를 의미 없이 article로 바꾸지 않는다.                                                               |
| [atoms/Checkbox.tsx](../../src/components/common/atoms/Checkbox.tsx)                                                                               | 유지: 동의·문의 비밀글·카탈로그 필터가 사용 중. 다중 색상 선택을 단일 Radio/상품 옵션으로 바꾸지 않는다.                                                               |
| [atoms/DataTable.tsx](../../src/components/common/atoms/DataTable.tsx)                                                                             | 이전 수정 유지: 사이즈 표 striped/밀도 옵션을 사용. 모바일 반응형 카드 행은 table로 강제하지 않는다.                                                                   |
| [atoms/DescriptionList.tsx](../../src/components/common/atoms/DescriptionList.tsx)                                                                 | 확장·적용: 회원정보·수신 동의·문의 등록자·세션 정보·상품 사양을 통합. 행 표시와 셀 타이포 옵션을 보존한다.                                                             |
| [atoms/Divider.tsx](../../src/components/common/atoms/Divider.tsx)                                                                                 | 확장·적용: 세로 길이/색 옵션으로 인증 링크·신청내역·상품 메타와 사양의 장식 구분선을 통합한다.                                                                         |
| [atoms/Dropdown.tsx](../../src/components/common/atoms/Dropdown.tsx)                                                                               | 유지: 정렬·문의 유형에서 사용 중. 시행일 Radio+Popover는 클릭/키보드 선택과 팝업 정렬이 다른 기존 소유권을 유지한다.                                                   |
| [atoms/EmptyState.tsx](../../src/components/common/atoms/EmptyState.tsx)                                                                           | 확장·적용: 기존 네 목록 외 리뷰·FAQ·문의·검색·상품 문의의 개별 구현도 통합한다.                                                                                        |
| [atoms/FilterTabs.tsx](../../src/components/common/atoms/FilterTabs.tsx)                                                                           | 유지: FAQ·상품 카테고리·홈 베스트셀러가 사용 중. 패널을 여는 SupportTabs와 구별한다.                                                                                   |
| [atoms/FormField.tsx](../../src/components/common/atoms/FormField.tsx)                                                                             | 유지: 평점과 TextFormField 등의 필수·오류·접근성 연결을 재사용한다. 읽기 정보는 FormField가 아니다.                                                                    |
| [atoms/Icon.tsx](../../src/components/common/atoms/Icon.tsx)                                                                                       | 적용: 필터 펼침 아이콘에 사용. 제품 사진·캐릭터 그래픽·의도된 SVG 경로는 아이콘 등록으로 강제하지 않는다.                                                              |
| [atoms/NumberStepper.tsx](../../src/components/common/atoms/NumberStepper.tsx)                                                                     | 유지: 상품 수량은 사용 중. 읽기 전용 기술 척도와 가격 범위 Slider는 수량 입력과 다르다.                                                                                |
| [atoms/Radio.tsx](../../src/components/common/atoms/Radio.tsx)                                                                                     | 유지: 수신 동의·약관 시행일·상품 옵션에 사용 중. 다중 선택 필터를 단일 라디오로 바꾸지 않는다.                                                                         |
| [atoms/RatingStars.tsx](../../src/components/common/atoms/RatingStars.tsx)                                                                         | 유지: 리뷰 입력·표시와 상품 평점이 사용 중. 별점 표시를 일반 배지로 대체하지 않는다.                                                                                   |
| [atoms/SegmentedControl.tsx](../../src/components/common/atoms/SegmentedControl.tsx)                                                               | 유지: 리뷰·쿠폰·신청내역·세션·사이즈 분류가 사용 중. 이전 약관의 스크롤 목록은 Button으로 제어 구조를 보존한다.                                                        |
| [atoms/Select.tsx](../../src/components/common/atoms/Select.tsx)                                                                                   | 유지: 리뷰 네이티브 정렬에 사용 중. 목록 상자와 Radio 팝업의 키보드 의미를 혼동하지 않는다.                                                                            |
| [atoms/StatusMessage.tsx](../../src/components/common/atoms/StatusMessage.tsx)                                                                     | 확장·적용: textProps로 비밀번호 완료·첨부 오류·검색 오류의 기존 색/스케일을 보존한다.                                                                                  |
| [atoms/TextInput.tsx](../../src/components/common/atoms/TextInput.tsx)                                                                             | 유지: 폼과 헤더 입력에 사용 중. 검색 중복 조합은 상위 SearchField에 통합한다. 파일 업로드는 네이티브 input을 유지한다.                                                 |
| [atoms/Typography.tsx](../../src/components/common/atoms/Typography.tsx)                                                                           | 유지: 한글/영문·플랫폼 타이포를 재사용. 일반 제목은 ContentHeader 소유로 통합하고 필드·메뉴·장식 라벨은 구별한다.                                                      |
| [atoms/Wishlist.tsx](../../src/components/common/atoms/Wishlist.tsx)                                                                               | 유지: ProductCard·상품 상세가 사용 중. 찜 상태·콜백은 기존 소유자에 남긴다.                                                                                            |
| [layouts/AccountPageLayout.tsx](../../src/components/common/layouts/AccountPageLayout.tsx)                                                         | 유지: 회원가입·약관의 공통 계정 프레임이 사용 중. 일반 상품/고객센터 프레임으로 확장하지 않는다.                                                                       |
| [layouts/BottomSheet.tsx](../../src/components/common/layouts/BottomSheet.tsx)                                                                     | 유지: 카탈로그 필터에서 catalog 모드를 사용. 메뉴 Drawer와 이미지 뷰어는 다른 포커스·배치 계약을 유지한다.                                                             |
| [layouts/ContentLayout.tsx](../../src/components/common/layouts/ContentLayout.tsx)                                                                 | 유지: 상품 목록의 폭·breadcrumb·제목 조합이 사용 중. 마이페이지 사이드바와 중복 중첩하지 않는다.                                                                       |
| [layouts/ContentSection.tsx](../../src/components/common/layouts/ContentSection.tsx)                                                               | 적용: 혜택·연락처·바로가기·측정 안내의 기존 부모를 재사용하고 header/footer 책임을 통합한다.                                                                           |
| [layouts/MainSection.tsx](../../src/components/common/layouts/MainSection.tsx)                                                                     | 유지: 홈·추천 영역이 사용 중. 새 커밋의 tight 간격과 기본/compact를 보존한다.                                                                                          |
| [layouts/ModalDialog.tsx](../../src/components/common/layouts/ModalDialog.tsx)                                                                     | 유지: 리뷰·쿠폰·프로필·취소 확인에 사용 중. 검색의 헤더 외부 form/anchor·비모달 portal, 전체 화면 이미지 뷰어는 별도 경계다.                                           |
| [layouts/OrderActionBar.tsx](../../src/components/common/layouts/OrderActionBar.tsx)                                                               | 확장·적용: mobileOnly로 세션 신청 바의 section 의미·z-index·safe area와 PC 숨김을 통합하고 기본 주문 모드는 보존한다.                                                  |
| [layouts/SidebarNavigationLayout.tsx](../../src/components/common/layouts/SidebarNavigationLayout.tsx)                                             | 유지: MyPageFrame·CustomerCenterLayout이 사용 중. 라우트 프레임을 새로 복제하지 않는다.                                                                                |
| [molecules/AmountRow.tsx](../../src/components/common/molecules/AmountRow.tsx)                                                                     | 유지: 상품 선택 금액은 사용 중. 회원등급의 준비된 금액 문자열/쿠폰 할인 문구를 숫자로 재해석하지 않는다.                                                               |
| [molecules/BindingFeedback.tsx](../../src/components/common/molecules/BindingFeedback.tsx)                                                         | 확장·적용: 리뷰 저장의 pending 문구와 오류 우선 순서를 통합하고 기본 조회/재시도를 보존한다.                                                                           |
| [molecules/Breadcrumb.tsx](../../src/components/common/molecules/Breadcrumb.tsx)                                                                   | 유지: 각 기존 프레임이 사용 중. 메뉴 링크·프로모션 링크를 breadcrumb로 바꾸지 않는다.                                                                                  |
| [molecules/Carousel/Carousel.tsx](../../src/components/common/molecules/Carousel/Carousel.tsx)                                                     | 유지: 홈 상품·추천·프로모션·첨부 뷰어의 공통 캐러셀을 사용한다.                                                                                                        |
| [molecules/Carousel/CarouselContext.ts](../../src/components/common/molecules/Carousel/CarouselContext.ts)                                         | 보조 TS 유지: Swiper 상태 계약이다. 히어로의 별도 시간 진행률에 새 provider를 넣지 않는다.                                                                             |
| [molecules/Carousel/CarouselControls.tsx](../../src/components/common/molecules/Carousel/CarouselControls.tsx)                                     | 유지: 공통 상품 캐러셀 조작이 사용 중. 실제 이전/다음 동작 없는 안내에 넣지 않는다.                                                                                    |
| [molecules/Carousel/CarouselPagination.tsx](../../src/components/common/molecules/Carousel/CarouselPagination.tsx)                                 | 유지: 첨부 이미지 등 Swiper 지표가 사용 중. 히어로는 외부 진행률/포인터 상태가 있어 Button만 재사용한다.                                                               |
| [molecules/Carousel/CarouselViewport.tsx](../../src/components/common/molecules/Carousel/CarouselViewport.tsx)                                     | 유지: 기존 스크롤·fade·item gutter·명시적 플랫폼 계약을 보존한다.                                                                                                      |
| [molecules/ContentHeader.tsx](../../src/components/common/molecules/ContentHeader.tsx)                                                             | 확장·적용: 일반 제목·설명·액션을 통합하고 공지 time/dateTime 및 홈 div 설명을 유지한다.                                                                                |
| [molecules/FormActionGroup.tsx](../../src/components/common/molecules/FormActionGroup.tsx)                                                         | 유지: 프로필·배송지·문의 제출에 사용 중. 모달 confirm 액션과 고정 구매 바는 각 기존 소유자를 따른다.                                                                   |
| [molecules/FormFields/CharacterCount.tsx](../../src/components/common/molecules/FormFields/CharacterCount.tsx)                                     | 유지: 문의의 길이 표시가 이미 사용한다. 서버 목록의 전체 건수와 혼동하지 않는다.                                                                                       |
| [molecules/FormFields/TextFormField.tsx](../../src/components/common/molecules/FormFields/TextFormField.tsx)                                       | 유지: 리뷰·프로필·문의·쿠폰·배송지 입력에서 사용 중. inputProps·ref·name·form·오류 연결을 보존한다.                                                                    |
| [molecules/FormFields/VerificationCountdown.tsx](../../src/components/common/molecules/FormFields/VerificationCountdown.tsx)                       | 유지: 프로필 휴대폰 인증이 사용 중. 실제 시간/요청 상태를 표시 컴포넌트로 옮기지 않는다.                                                                               |
| [molecules/HelpTips.tsx](../../src/components/common/molecules/HelpTips.tsx)                                                                       | 유지: 퍼블리싱 가이드가 사용 중. 사양 도움말은 즉시 hover·비토글 클릭·시작점 정렬·플랫폼 portal과 별도 SVG/화살표를 유지한다. 정적 안내의 ⓘ에 새 팝업을 만들지 않는다. |
| [molecules/HomeCarouselSection.tsx](../../src/components/common/molecules/HomeCarouselSection.tsx)                                                 | 유지: 홈·러닝 추천·상품 추천이 사용 중. 새 커밋의 className/spacing 계약도 재검토했다.                                                                                 |
| [molecules/MainContentCard.tsx](../../src/components/common/molecules/MainContentCard.tsx)                                                         | 유지: 홈·상품 프로모션에서 사용 중. 메가 메뉴의 단일 외부 Link 전체 클릭과 여러 action 링크 카드의 구조를 혼합하지 않는다.                                             |
| [molecules/OrderProductSummary.tsx](../../src/components/common/molecules/OrderProductSummary.tsx)                                                 | 유지: 주문 상품의 금액·옵션 모델이다. 상품 없는 세션·리뷰의 다른 정보 순서를 억지로 매핑하지 않는다.                                                                   |
| [molecules/ProductCard/ProductCard.tsx](../../src/components/common/molecules/ProductCard/ProductCard.tsx)                                         | 유지: 관심/최근 상품·카탈로그·추천·홈이 사용 중이며 ProductPrice 재사용도 확인했다.                                                                                    |
| [molecules/ProductCard/productCardTypography.ts](../../src/components/common/molecules/ProductCard/productCardTypography.ts)                       | 보조 TS 유지: 공통 카드 스케일 소유자이며 화면별 타이포 복제 대상으로 보지 않는다.                                                                                     |
| [molecules/ProductDetailImage.tsx](../../src/components/common/molecules/ProductDetailImage.tsx)                                                   | 유지: 상세 이미지 확대가 사용 중. 세션 현장 사진은 확대 상품 이미지의 버튼 의미를 갖지 않는다.                                                                         |
| [molecules/ProductOptionList.tsx](../../src/components/common/molecules/ProductOptionList.tsx)                                                     | 유지: 상품 카드 옵션·컬러 미리보기가 사용 중. 다중 필터의 체크 상태와 구별한다.                                                                                        |
| [molecules/ProductOptionSelectors/ProductColorSelector.tsx](../../src/components/common/molecules/ProductOptionSelectors/ProductColorSelector.tsx) | 유지: 상세의 기존 Radio/이미지 옵션·선택 상태와 새 커밋의 74/76px 수치를 보존한다.                                                                                     |
| [molecules/ProductOptionSelectors/ProductOptionSection.tsx](../../src/components/common/molecules/ProductOptionSelectors/ProductOptionSection.tsx) | 유지: 실제 상품 옵션 제목/카트 배치 소유자다. 일반 분류 필터로 전용하지 않는다.                                                                                        |
| [molecules/ProductOptionSelectors/ProductSizeSelector.tsx](../../src/components/common/molecules/ProductOptionSelectors/ProductSizeSelector.tsx)   | 유지: 상세·카트에서 SizeSelector/FormField 계약을 재사용한다.                                                                                                          |
| [molecules/ProductOptionSelectors/ProductWidthSelector.tsx](../../src/components/common/molecules/ProductOptionSelectors/ProductWidthSelector.tsx) | 유지: 단일 발볼 옵션을 사용 중. 카탈로그 다중 Checkbox 필터를 대체하지 않는다.                                                                                         |
| [molecules/ProductThumbnail.tsx](../../src/components/common/molecules/ProductThumbnail.tsx)                                                       | 확장·적용: summary와 실제 sizes/이미지 크기로 재입고 목록의 직접 Image 구현을 통합한다.                                                                                |
| [molecules/SearchField.tsx](../../src/components/common/molecules/SearchField.tsx)                                                                 | 확장·적용: 포함된 단일 form의 div 모드·아이콘·입력 속성·스타일 슬롯으로 전체 검색 입력을 통합한다.                                                                     |
| [molecules/SizeSelector/koreanSizes.ts](../../src/components/common/molecules/SizeSelector/koreanSizes.ts)                                         | 보조 TS 유지: 옵션 데이터다. 실제 상품 응답이나 재고를 새로 만들지 않는다.                                                                                             |
| [molecules/SizeSelector/SizeSelector.tsx](../../src/components/common/molecules/SizeSelector/SizeSelector.tsx)                                     | 유지: 상품 단일 사이즈와 카탈로그 다중 사이즈가 사용 중. cm/inch 측정 단위와 다른 책임이다.                                                                            |
| [molecules/StepIndicator.tsx](../../src/components/common/molecules/StepIndicator.tsx)                                                             | 유지: 진행 단계 소유자다. 반품/세탁의 고정 설명 목록에 현재 완료 단계를 임의로 만들지 않는다.                                                                          |
| [molecules/SupportTabs.tsx](../../src/components/common/molecules/SupportTabs.tsx)                                                                 | 유지: 고객센터의 약관·배송·관리·사이즈 패널이 사용 중. URL/로컬 선택 수명과 guide 기본값을 보존한다.                                                                   |
| [organisms/Account/AccountDataList.tsx](../../src/components/common/organisms/Account/AccountDataList.tsx)                                         | 유지: meta/강조가 있는 계정 내역 모델이다. 프로필은 DescriptionList로 통합해 거래 행 계약을 넓히지 않는다.                                                             |
| [organisms/Address/AddressFields.tsx](../../src/components/common/organisms/Address/AddressFields.tsx)                                             | 유지: 프로필·배송지 편집이 사용 중. 우편번호·주소검색·상세주소·columns 계약을 보존한다.                                                                                |
| [organisms/EmailAddressFields.tsx](../../src/components/common/organisms/EmailAddressFields.tsx)                                                   | 유지: 프로필의 이메일 로컬/도메인/직접입력 선택이 사용 중이다.                                                                                                         |
| [organisms/OrderRecommendations.tsx](../../src/components/common/organisms/OrderRecommendations.tsx)                                               | 유지: 간단한 주문 추천 모델이다. 상품 옵션·배지가 필요한 캐러셀은 HomeCarouselSection+ProductCard를 사용한다.                                                          |
| [organisms/Search/SearchHeader.tsx](../../src/components/common/organisms/Search/SearchHeader.tsx)                                                 | 유지: 검색 패널·검색 결과의 헤더가 사용 중이며 닫기/외부 form 연결을 보존한다.                                                                                         |
| [organisms/SystemStatusPage.tsx](../../src/components/common/organisms/SystemStatusPage.tsx)                                                       | 유지: 없는 상품·세션·공지에서 사용 중. 완료된 빈 목록과 로딩/실패를 404로 바꾸지 않는다.                                                                               |

## 변경 소스 65개 확인 목록

순수 데이터·타입 파일에는 새 UI 대체를 만들지 않는다. 공통 구현 자체는 위 모듈 표와 함께 확인한다.

| 소스                                                                                                                                                                                       | 확인 결과                                                               |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------- |
| [src/app/_components/HomeContent.tsx](../../src/app/_components/HomeContent.tsx)                                                                                                           | 공통 소유자로 통합; 표시/상태 계약 유지                                 |
| [src/app/homeContent.ts](../../src/app/homeContent.ts)                                                                                                                                     | 표시 데이터/타입 소유권 유지; 새 UI 구현 없음                           |
| [src/app/mypage/addresses/_components/AddressManagement.tsx](../../src/app/mypage/addresses/_components/AddressManagement.tsx)                                                             | 공통 소유자로 통합; 표시/상태 계약 유지                                 |
| [src/app/mypage/addresses/_components/AddressStatePreview.tsx](../../src/app/mypage/addresses/_components/AddressStatePreview.tsx)                                                         | 고정 표시/연결 상태 fixture와 공개 호출 계약 유지                       |
| [src/app/mypage/coupons/_components/CouponManagement.tsx](../../src/app/mypage/coupons/_components/CouponManagement.tsx)                                                                   | 공통 소유자로 통합; 표시/상태 계약 유지                                 |
| [src/app/mypage/event-entries/_components/RunningSessionEntriesContent.tsx](../../src/app/mypage/event-entries/_components/RunningSessionEntriesContent.tsx)                               | 공통 소유자로 통합; 표시/상태 계약 유지                                 |
| [src/app/mypage/event-entries/eventEntries.data.ts](../../src/app/mypage/event-entries/eventEntries.data.ts)                                                                               | 표시 데이터/타입 소유권 유지; 새 UI 구현 없음                           |
| [src/app/mypage/profile/_components/ProfileContent.tsx](../../src/app/mypage/profile/_components/ProfileContent.tsx)                                                                       | 공통 소유자로 통합; 표시/상태 계약 유지                                 |
| [src/app/mypage/profile/_components/ProfileStatePreview.tsx](../../src/app/mypage/profile/_components/ProfileStatePreview.tsx)                                                             | 고정 표시/연결 상태 fixture와 공개 호출 계약 유지                       |
| [src/app/mypage/profile/mypage-profile.types.ts](../../src/app/mypage/profile/mypage-profile.types.ts)                                                                                     | 표시 데이터/타입 소유권 유지; 새 UI 구현 없음                           |
| [src/app/mypage/reviews/_components/MyPageReviewsContent.tsx](../../src/app/mypage/reviews/_components/MyPageReviewsContent.tsx)                                                           | 공통 소유자로 통합; 표시/상태 계약 유지                                 |
| [src/app/mypage/reviews/_components/ReviewStatePreview.tsx](../../src/app/mypage/reviews/_components/ReviewStatePreview.tsx)                                                               | 고정 표시/연결 상태 fixture와 공개 호출 계약 유지                       |
| [src/app/mypage/reviews/reviewFixtures.ts](../../src/app/mypage/reviews/reviewFixtures.ts)                                                                                                 | 표시 데이터/타입 소유권 유지; 새 UI 구현 없음                           |
| [src/app/mypage/rewards/_components/RewardsContent.tsx](../../src/app/mypage/rewards/_components/RewardsContent.tsx)                                                                       | 공통 소유자로 통합; 표시/상태 계약 유지                                 |
| [src/app/mypage/rewards/page.tsx](../../src/app/mypage/rewards/page.tsx)                                                                                                                   | 공통 소유자로 통합; 표시/상태 계약 유지                                 |
| [src/app/mypage/rewards/rewards-data.ts](../../src/app/mypage/rewards/rewards-data.ts)                                                                                                     | 표시 데이터/타입 소유권 유지; 새 UI 구현 없음                           |
| [src/app/products/[id]/_components/ProductDetailContent.tsx](../../src/app/products/[id]/_components/ProductDetailContent.tsx)                                                             | 공통 소유자로 통합; 표시/상태 계약 유지                                 |
| [src/app/publishing-guide/_components/HelpTipsGuide.tsx](../../src/app/publishing-guide/_components/HelpTipsGuide.tsx)                                                                     | 기존 공통 조합·라우트/로컬 상태 소유권 유지; 대체가 필요한 새 중복 없음 |
| [src/app/running/running-session/[sessionId]/_components/RunningSessionSessionContent.tsx](../../src/app/running/running-session/[sessionId]/_components/RunningSessionSessionContent.tsx) | 기존 공통 조합·라우트/로컬 상태 소유권 유지; 대체가 필요한 새 중복 없음 |
| [src/app/running/running-session/[sessionId]/page.tsx](../../src/app/running/running-session/[sessionId]/page.tsx)                                                                         | 기존 공통 조합·라우트/로컬 상태 소유권 유지; 대체가 필요한 새 중복 없음 |
| [src/app/signup/terms/_components/SignupTermsContent.tsx](../../src/app/signup/terms/_components/SignupTermsContent.tsx)                                                                   | 공통 소유자로 통합; 표시/상태 계약 유지                                 |
| [src/app/support/_components/SupportContacts.tsx](../../src/app/support/_components/SupportContacts.tsx)                                                                                   | 공통 소유자로 통합; 표시/상태 계약 유지                                 |
| [src/app/support/_components/SupportQuickLinks.tsx](../../src/app/support/_components/SupportQuickLinks.tsx)                                                                               | 공통 소유자로 통합; 표시/상태 계약 유지                                 |
| [src/app/support/after-sales/_components/AfterSalesContent.tsx](../../src/app/support/after-sales/_components/AfterSalesContent.tsx)                                                       | 공통 소유자로 통합; 표시/상태 계약 유지                                 |
| [src/app/support/after-sales/page.tsx](../../src/app/support/after-sales/page.tsx)                                                                                                         | 기존 공통 조합·라우트/로컬 상태 소유권 유지; 대체가 필요한 새 중복 없음 |
| [src/app/support/care/_components/CareContent.tsx](../../src/app/support/care/_components/CareContent.tsx)                                                                                 | 기존 공통 조합·라우트/로컬 상태 소유권 유지; 대체가 필요한 새 중복 없음 |
| [src/app/support/care/page.tsx](../../src/app/support/care/page.tsx)                                                                                                                       | 기존 공통 조합·라우트/로컬 상태 소유권 유지; 대체가 필요한 새 중복 없음 |
| [src/app/support/faq/_components/FaqContent.tsx](../../src/app/support/faq/_components/FaqContent.tsx)                                                                                     | 공통 소유자로 통합; 표시/상태 계약 유지                                 |
| [src/app/support/faq/faq.data.ts](../../src/app/support/faq/faq.data.ts)                                                                                                                   | 표시 데이터/타입 소유권 유지; 새 UI 구현 없음                           |
| [src/app/support/inquiries/_components/InquiryListContent.tsx](../../src/app/support/inquiries/_components/InquiryListContent.tsx)                                                         | 공통 소유자로 통합; 표시/상태 계약 유지                                 |
| [src/app/support/inquiries/_components/InquiryListLayout.tsx](../../src/app/support/inquiries/_components/InquiryListLayout.tsx)                                                           | 기존 공통 조합·라우트/로컬 상태 소유권 유지; 대체가 필요한 새 중복 없음 |
| [src/app/support/inquiries/_components/InquiryListPreview.tsx](../../src/app/support/inquiries/_components/InquiryListPreview.tsx)                                                         | 고정 표시/연결 상태 fixture와 공개 호출 계약 유지                       |
| [src/app/support/inquiries/new/_components/InquiryFormContent.tsx](../../src/app/support/inquiries/new/_components/InquiryFormContent.tsx)                                                 | 공통 소유자로 통합; 표시/상태 계약 유지                                 |
| [src/app/support/inquiries/page.tsx](../../src/app/support/inquiries/page.tsx)                                                                                                             | 공통 소유자로 통합; 표시/상태 계약 유지                                 |
| [src/app/support/notices/[id]/page.tsx](../../src/app/support/notices/[id]/page.tsx)                                                                                                       | 공통 소유자로 통합; 표시/상태 계약 유지                                 |
| [src/app/support/notices/_components/NoticesContent.tsx](../../src/app/support/notices/_components/NoticesContent.tsx)                                                                     | 기존 공통 조합·라우트/로컬 상태 소유권 유지; 대체가 필요한 새 중복 없음 |
| [src/app/support/notices/_components/NoticesList.tsx](../../src/app/support/notices/_components/NoticesList.tsx)                                                                           | 기존 공통 조합·라우트/로컬 상태 소유권 유지; 대체가 필요한 새 중복 없음 |
| [src/app/support/page.tsx](../../src/app/support/page.tsx)                                                                                                                                 | 기존 공통 조합·라우트/로컬 상태 소유권 유지; 대체가 필요한 새 중복 없음 |
| [src/app/support/size-guide/_components/SizeGuidePanel.tsx](../../src/app/support/size-guide/_components/SizeGuidePanel.tsx)                                                               | 공통 소유자로 통합; 표시/상태 계약 유지                                 |
| [src/app/support/size-guide/page.tsx](../../src/app/support/size-guide/page.tsx)                                                                                                           | 기존 공통 조합·라우트/로컬 상태 소유권 유지; 대체가 필요한 새 중복 없음 |
| [src/app/support/size-guide/size-guide.data.ts](../../src/app/support/size-guide/size-guide.data.ts)                                                                                       | 표시 데이터/타입 소유권 유지; 새 UI 구현 없음                           |
| [src/app/support/terms/_components/TermsDocument.tsx](../../src/app/support/terms/_components/TermsDocument.tsx)                                                                           | 기존 공통 조합·라우트/로컬 상태 소유권 유지; 대체가 필요한 새 중복 없음 |
| [src/app/support/terms/page.tsx](../../src/app/support/terms/page.tsx)                                                                                                                     | 기존 공통 조합·라우트/로컬 상태 소유권 유지; 대체가 필요한 새 중복 없음 |
| [src/components/care-guide/CareInstructions.tsx](../../src/components/care-guide/CareInstructions.tsx)                                                                                     | 기존 공통 조합·라우트/로컬 상태 소유권 유지; 대체가 필요한 새 중복 없음 |
| [src/components/care-guide/care.data.ts](../../src/components/care-guide/care.data.ts)                                                                                                     | 표시 데이터/타입 소유권 유지; 새 UI 구현 없음                           |
| [src/components/catalog/ProductListingPage.tsx](../../src/components/catalog/ProductListingPage.tsx)                                                                                       | 공통 소유자로 통합; 표시/상태 계약 유지                                 |
| [src/components/common/atoms/Badge.tsx](../../src/components/common/atoms/Badge.tsx)                                                                                                       | 공통 소유자로 통합; 표시/상태 계약 유지                                 |
| [src/components/common/atoms/EmptyState.tsx](../../src/components/common/atoms/EmptyState.tsx)                                                                                             | 공통 소유자로 통합; 표시/상태 계약 유지                                 |
| [src/components/common/layouts/BottomSheet.tsx](../../src/components/common/layouts/BottomSheet.tsx)                                                                                       | 공통 기본값·기존 소비자와 새 커밋의 옵션 확인                           |
| [src/components/common/layouts/MainSection.tsx](../../src/components/common/layouts/MainSection.tsx)                                                                                       | 공통 기본값·기존 소비자와 새 커밋의 옵션 확인                           |
| [src/components/common/molecules/HomeCarouselSection.tsx](../../src/components/common/molecules/HomeCarouselSection.tsx)                                                                   | 공통 기본값·기존 소비자와 새 커밋의 옵션 확인                           |
| [src/components/common/molecules/ProductCard/ProductCard.tsx](../../src/components/common/molecules/ProductCard/ProductCard.tsx)                                                           | 공통 기본값·기존 소비자와 새 커밋의 옵션 확인                           |
| [src/components/common/molecules/ProductCard/productCardTypography.ts](../../src/components/common/molecules/ProductCard/productCardTypography.ts)                                         | 공통 기본값·기존 소비자와 새 커밋의 옵션 확인                           |
| [src/components/common/molecules/ProductOptionList.tsx](../../src/components/common/molecules/ProductOptionList.tsx)                                                                       | 공통 기본값·기존 소비자와 새 커밋의 옵션 확인                           |
| [src/components/common/molecules/ProductOptionSelectors/ProductColorSelector.tsx](../../src/components/common/molecules/ProductOptionSelectors/ProductColorSelector.tsx)                   | 공통 기본값·기존 소비자와 새 커밋의 옵션 확인                           |
| [src/components/common/molecules/SupportTabs.tsx](../../src/components/common/molecules/SupportTabs.tsx)                                                                                   | 공통 기본값·기존 소비자와 새 커밋의 옵션 확인                           |
| [src/components/common/organisms/Address/AddressFields.tsx](../../src/components/common/organisms/Address/AddressFields.tsx)                                                               | 공통 기본값·기존 소비자와 새 커밋의 옵션 확인                           |
| [src/components/common/organisms/Search/SearchHeader.tsx](../../src/components/common/organisms/Search/SearchHeader.tsx)                                                                   | 공통 기본값·기존 소비자와 새 커밋의 옵션 확인                           |
| [src/components/mypage/MyPageProductHistory.tsx](../../src/components/mypage/MyPageProductHistory.tsx)                                                                                     | 공통 소유자로 통합; 표시/상태 계약 유지                                 |
| [src/components/running-session/RunningSessionPage.tsx](../../src/components/running-session/RunningSessionPage.tsx)                                                                       | 공통 소유자로 통합; 표시/상태 계약 유지                                 |
| [src/components/running-session/runningSession.data.ts](../../src/components/running-session/runningSession.data.ts)                                                                       | 표시 데이터/타입 소유권 유지; 새 UI 구현 없음                           |
| [src/components/support/InquiryCautions.tsx](../../src/components/support/InquiryCautions.tsx)                                                                                             | 기존 공통 조합·라우트/로컬 상태 소유권 유지; 대체가 필요한 새 중복 없음 |
| [src/context/MyPageDataContext.ts](../../src/context/MyPageDataContext.ts)                                                                                                                 | 표시 데이터/타입 소유권 유지; 새 UI 구현 없음                           |
| [src/context/ShopShell.tsx](../../src/context/ShopShell.tsx)                                                                                                                               | 공통 소유자로 통합; 표시/상태 계약 유지                                 |
| [src/data/megaMenu.ts](../../src/data/megaMenu.ts)                                                                                                                                         | 표시 데이터/타입 소유권 유지; 새 UI 구현 없음                           |

## 의도적으로 유지한 구성

- 전체 화면 이미지 뷰어, 비모달 헤더 검색, 메뉴 Drawer는 popup 크기·portal·focus·외부 form·runtime 경계가 일반 ModalDialog/BottomSheet와 다르다. 내부에서는 Button·SearchHeader·SearchField 등을 재사용한다.
- 시행일 Radio 팝업, 상품 사양의 즉시 hover/비토글 툴팁, 히어로의 외부 진행률/포인터 타이머는 현재 동작을 유지한다. Dropdown·HelpTooltip·CarouselPagination을 넣으려고 다른 키보드 동작이나 새 context를 만들지 않는다.
- 티어 도형·정적 기술 척도·반품/세탁 절차는 Badge/NumberStepper/StepIndicator의 의미와 다르다. 준비된 금액 문자열을 AmountRow에 넣으려고 파싱하거나 계산하지 않는다.
- 파일 input, 네이티브 표 내부의 thead/tr/th/td, 제공 SVG 경로, 날짜 time 의미는 유지한다. 구조 Box 전체를 Card로 바꾸는 것은 재사용 성과로 세지 않는다.

## 검증

- PC 1440px·MO 375px에서 27개 URL/상태, 합계 54개 변경 전후 기록을 대조했다. 표시 문구에 대응하는 위치·크기(0.12px 이내 반올림 허용), font family/size/weight/line-height·색·배경·패딩·경계·정렬·이미지 fit 측정 차이가 없었다. 홈 히어로는 같은 슬라이드에 포커스를 두어 자동 회전을 고정했다. 이미지 자체의 픽셀 차이 전수 분석 결과로 표현하지 않는다.
- 검색 입력의 PC/MO 기본·빈 제출 오류 4상태 측정은 변경 전후 정확히 같았다. 양쪽 검색 Enter 제출이 기존 `/search?q=...&scope=...`로 이동하고 중첩 form이 없음을 확인했다.
- PC 필터 click/Enter, MO 메뉴 진입/복귀/Escape, PC/MO 재입고 취소·쿠폰 상세 팝업의 열기/Escape, MO 이전 약관의 시행일 선택을 실제로 실행했다. 실제 재입고 취소 요청을 성공 처리한 결과로 기록하지 않는다.
- 세션 상세는 375/1024px에서 고정 신청 바, 1025/1199/1200/1440px에서 숨김을 확인했다. 1025/1199px의 1200px PC 캔버스와 1200px 이상 추가 가로 넘침 없음, 검색을 연 채 768/1024/1025/1199/1200px 리사이즈 후 검색 유지·중첩 form 0건을 확인했다. Storybook 명시적 mobile은 1440px에서도 fixed, web은 375px에서도 static이다.
- 추가 옵션/기존 기본 모드·disabled/loading을 포함한 정적 Storybook 33개가 오류 없이 렌더됐다. Button, Badge, DescriptionList, Divider, EmptyState, StatusMessage, OrderActionBar, BindingFeedback, ContentHeader, ProductThumbnail, SearchField를 포함한다. 전체 Storybook play/접근성 자동 검사의 통과를 주장하지 않는다.
- 수정한 생산 TSX 34개·스토리 11개 대상 ESLint/Prettier, 전체 TypeScript 검사, Panda 생성, 최종 Next.js 프로덕션 빌드와 Storybook 빌드, diff 공백 검사와 OKF 매핑 검사를 통과했다. Storybook 번들 크기 경고는 남아 있다. 인덱스는 다른 채팅의 동시 스테이징 상태를 보존했으며 새 조사표/추가 문서 갱신은 따로 스테이징하지 않았다.
- 최초 전체 `npm run lint`에서 발견한 기존 미사용 import 2건(FindAccountContent의 css, signup/complete의 Stack)은 후속 요청으로 제거했다. 후속 전체 lint는 통과했다. [수정 출처와 검토](routing.md#계정-화면-미사용-import-정리-2026-11-02)를 참고한다.
- 서비스 요청·인증·결제·재고 판단·전체 실기기는 검증 범위가 아니다. 이번 변경은 기존 표시/상태 계약의 재사용이며 새 API를 구현하지 않았다.

비교한 URL/상태: `/mypage/wishlist`, `/mypage/recent`, `/mypage/restock-alerts`, `/mypage/addresses`, `/mypage/coupons`, `/mypage/event-entries`, `/mypage/profile`, `/mypage/profile/preview-edit`, `/mypage/rewards`, `/mypage/reviews/preview-empty`, `/mypage/reviews/preview-written-empty`, `/support`, `/support/after-sales`, `/support/after-sales#cautions`, `/support/size-guide`, `/support/notices/1`, `/support/inquiries`, `/support/inquiries/new`, `/support/faq/preview-no-results`, `/running/running-session`, `/running/running-session/yeouido-night`, `/products`, `/search/preview-no-results`, `/signup/terms`, `/`, `/products/shoe-1`, `/products/preview-empty-inquiries`.

검토: codex/gpt-6, 2026-11-02T06:00:49Z. 브라우저 측정·로그는 이번 실행의 외부 작업 디렉터리 `C:/Users/stead/ego/hoka-full-common-audit-20261102`에 보관했다.
