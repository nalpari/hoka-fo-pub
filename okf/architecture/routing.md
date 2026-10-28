---
type: Architecture
title: '라우팅과 플랫폼'
description: 'App Router 경로, 페이지 경계와 PC·모바일 선택을 설명한다.'
tags: [nextjs, routing, platform]
status: draft
generated:
  by: codex/gpt-6
  at: '2026-10-26T02:45:47Z'
source_revision: b3f7243062b500eb4909961667ad142cc368ff91
working_tree_sources:
  - okf/architecture/storefront-design.md
  - tests/app-router.test.mjs
  - src/shared/features/mypage/stories/MyPageRouteStory.tsx
  - src/shared/features/find-account/IdConfirmationModal.tsx
  - src/shared/features/find-account/FindAccountPage.tsx
  - src/app/cart/page.tsx
  - src/app/checkout/page.tsx
  - src/app/explore/[...slug]/page.tsx
  - src/shared/Mockup/explore/ExploreDetailPage.tsx
  - src/app/launch-calendar/page.tsx
  - src/shared/Mockup/launch-calendar/LaunchCalendarPage.tsx
  - src/app/support/store/page.tsx
  - src/shared/features/store-finder/StoreFinderPage.tsx
  - src/app/running/reviews/page.tsx
  - src/app/running/rewards/page.tsx
  - src/app/running/rotation/page.tsx
  - src/app/running/alerts/page.tsx
  - src/app/running/plans/page.tsx
  - src/app/running/shoe-finder/page.tsx
  - src/app/store/experience/page.tsx
  - src/shared/Mockup/running-hub/RunningExperiencePage.tsx
  - src/app/explore/page.tsx
  - src/shared/Mockup/explore/ExploreHubPage.tsx
  - src/app/explore/shoe-finder/page.tsx
  - src/shared/Mockup/shoe-finder/ShoeFinderPage.tsx
  - src/app/mypage/running-profile/page.tsx
  - src/shared/Mockup/running-profile/RunningProfilePage.tsx
  - src/shared/features/mypage/stories/MyPageRouteStory.tsx
  - src/app/mypage/event-entries/page.tsx
  - src/app/support/after-sales/page.tsx
  - src/app/support/care/page.tsx
  - src/app/support/size-guide/page.tsx
  - src/app/support/inquiries/new/order-products/page.tsx
  - src/shared/features/support/InquiryOrderLookupPage.tsx
  - src/shared/features/support/InquiryNewPage.tsx
  - src/shared/features/support/inquiryOrderSelection.storage.ts
  - tests/app-router.test.mjs
  - src/shared/features/size-guide/SizeGuidePage.tsx
  - src/shared/features/support/support.navigation.ts
  - src/data/screenRegistry.ts
  - src/shared/features/screen-index/IaStructurePage.tsx
  - src/shared/Mockup/teamwear/TeamwearPage.tsx
  - src/app/signup/page.tsx
  - src/shared/features/signup/SignupPage.tsx
  - src/shared/Mockup/signup/SignupTermsStep.tsx
  - src/shared/Mockup/signup/SignupDetailsStep.tsx
  - src/shared/Mockup/signup/SignupCompleteStep.tsx
  - src/stories/features/Mockup/signup/SignupSteps.stories.tsx
sources:
  - id: src-app-layout-tsx
    resource: https://github.com/nalpari/hoka-fo-pub/blob/b3f7243062b500eb4909961667ad142cc368ff91/src/app/layout.tsx
    title: 'src/app/layout.tsx'
  - id: src-shared-lib-device-ts
    resource: https://github.com/nalpari/hoka-fo-pub/blob/b3f7243062b500eb4909961667ad142cc368ff91/src/shared/lib/device.ts
    title: 'src/shared/lib/device.ts'
  - id: src-app-products-id-page-tsx
    resource: https://github.com/nalpari/hoka-fo-pub/blob/b3f7243062b500eb4909961667ad142cc368ff91/src/app/products/[id]/page.tsx
    title: 'src/app/products/[id]/page.tsx'
  - id: src-shared-features-catalog-productlistingpage-tsx
    resource: https://github.com/nalpari/hoka-fo-pub/blob/b3f7243062b500eb4909961667ad142cc368ff91/src/shared/features/catalog/ProductListingPage.tsx
    title: 'src/shared/features/catalog/ProductListingPage.tsx'
  - id: tests-app-router-test-mjs
    resource: https://github.com/nalpari/hoka-fo-pub/blob/b3f7243062b500eb4909961667ad142cc368ff91/tests/app-router.test.mjs
    title: 'tests/app-router.test.mjs'
---

# 라우팅과 플랫폼

## 1:1 문의 주문상품 조회 경로 (2026-10-26)

`/support/inquiries/new/order-products`는 문의 작성 중 별도 페이지로 이동해 주문 기간을 조회하고 주문 및 상품을 선택하는 경로다. 페이지 진입점은 `src/app/support/inquiries/new/order-products/page.tsx`이며 `InquiryOrderLookupPage`가 `CustomerCenterLayout`과 반응형 본문을 구성한다. 선택 중인 주문은 같은 탭의 `sessionStorage` 초안으로 전달하고, 취소 또는 선택 완료 후 문의 작성 경로로 돌아간다. App Router 경로 목록 테스트에 신규 URL을 포함한다. 주문 조회는 현재 화면 확인용 fixture다.

출처는 작업 트리의 `src/app/support/inquiries/new/order-products/page.tsx`, `src/shared/features/support/InquiryOrderLookupPage.tsx`, `InquiryNewPage.tsx`, `inquiryOrderSelection.storage.ts`, `tests/app-router.test.mjs`와 Figma `1241:93422`, `1241:93577`이다.

## 팀/단체복 제외와 사이즈 가이드 준비 (2026-10-20)

/support/teamwear의 page.tsx를 제거해 운영 URL과 고객센터 메뉴에서 제외했다. 원본 화면은 src/shared/Mockup/teamwear/TeamwearPage.tsx에 보존하며 운영 경로를 추가하지 않았다. /support/size-guide는 SizeGuidePage를 내보내는 새 App Router 페이지다. 고객센터 공통 레이아웃·메뉴·breadcrumb·제목만 구성하고 본문은 null로 둔다. IA 215는 제거하고 신규 IA 260을 디자인 대기로 추가했으며 PC/MO Storybook 링크를 연결했다.

## 계정 찾기 결과의 기존 경로 연결 (2026-10-19)

첨부 로그인·계정 찾기 시안 반영 시 기존 `/login` → `/login/find-account` → `/login/find-account/password-reset` 경로를 검토했다. FindAccountPage의 예시 인증 결과 팝업에서 확인은 `/login`, 비밀번호 재설정은 `/login/find-account/password-reset`으로 이동한다. 새 App Router 파일이나 실제 인증 경계를 추가하지 않았다. PC 결과는 중앙 팝업, 모바일 결과는 기존 IdConfirmationModal의 fullscreen 표현을 사용한다. 작업 트리 출처: `src/shared/features/find-account/FindAccountPage.tsx`, `src/shared/features/find-account/IdConfirmationModal.tsx`.

## EXPLORE 상세 목업 진입점 (2026-10-19)

src/app/explore/[...slug]/page.tsx는 src/shared/Mockup/explore/ExploreDetailPage를 기본 export로 연결한다. 기존 /explore/[...slug] URL·use client 경계·slug별 화면 및 미등록 slug의 준비 중 화면을 유지한다.

## 런칭 캘린더 목업 진입점 (2026-10-19)

src/app/launch-calendar/page.tsx는 src/shared/Mockup/launch-calendar/LaunchCalendarPage.tsx를 기본 export로 연결한다. /launch-calendar URL과 use client 경계, 메뉴의 런칭 캘린더 링크, 페이지의 상품 상세 이동을 유지한다. 이전 features/launch-calendar 경로의 중간 재수출 파일은 두지 않는다. 작업 트리 출처는 frontmatter에 기록한다.

검증: Prettier 포맷을 정규화해 이동 전후 페이지 내용 보존과 이전 경로 참조 제거를 확인했다. 변경 파일 ESLint/Prettier·전체 타입 검사·Panda 생성·Next production build와 앱 라우트 검사 2개를 통과했다. 브라우저 화면 비교는 재실행하지 않았다.

## 매장 찾기 정식 화면 진입점 (2026-10-19)

src/app/support/store/page.tsx와 고객센터 Storybook은 src/shared/features/store-finder/StoreFinderPage를 연결한다. /support/store URL과 use client 경계는 유지하며 페이지·데이터는 정식 organisms/StoreFinder/StoreResults를 참조한다.

디자인이 반영된 매장 찾기는 Mockup 분류에서 제외하고 정식 feature와 organism 위치로 복귀시켰다.

## running-hub 목업 라우트 연결 (2026-10-19)

/running/shoe-finder·rewards·reviews·alerts·rotation·plans 및 /store/experience의 페이지는 src/shared/Mockup/running-hub/RunningExperiencePage를 import한다. 기존 URL과 kind 값, use client 경계는 유지한다. 라우트별 내용은 바꾸지 않았다.

## EXPLORE 허브 목업 진입점 (2026-10-19)

src/app/explore/page.tsx는 src/shared/Mockup/explore/ExploreHubPage.tsx를 기본 export로 연결한다. /explore 주소와 use client 경계, 헤더·홈 등 진입 링크, 페이지 내부 SHOE FINDER·가이드·스토리·모델 링크를 유지한다. 이전 features/explore 경로의 중간 재수출 파일은 남기지 않는다. 작업 트리 출처는 frontmatter에 기록한다.

검증: 이동 전후 페이지 내용이 줄바꿈을 제외하고 일치하며 이전 경로 import가 남지 않았음을 확인했다. 변경 파일 ESLint/Prettier·전체 타입 검사·Panda 생성·Next production build와 앱 라우트 검사 2개를 통과했다. 브라우저 화면 비교는 재실행하지 않았다.

## SHOE FINDER 목업 진입점 (2026-10-19)

src/app/explore/shoe-finder/page.tsx는 src/shared/Mockup/shoe-finder/ShoeFinderPage.tsx를 기본 export로 연결한다. /explore/shoe-finder URL과 헤더·홈·EXPLORE 링크는 유지하며 추천 상품 링크의 activity·cushioning 쿼리 구성도 변경하지 않는다. 이전 features/explore 경로의 중간 재수출 파일은 남기지 않는다. 작업 트리 출처는 frontmatter에 기록한다.

검증: 변경 파일 ESLint/Prettier·전체 타입 검사·Panda 생성·Next production build와 기존 URL 목록의 앱 라우트 검사 2개를 통과했다. 이전 ShoeFinderPage import가 소스에 남지 않았음을 확인했다. 브라우저 화면 비교는 재실행하지 않았다.

## 러닝 프로필 목업 진입점 (2026-10-19)

`src/app/mypage/running-profile/page.tsx`는 `src/shared/Mockup/running-profile/RunningProfilePage.tsx`를 기본 export로 연결한다. 디자인 미확정 목업 구현을 공용 feature/component 영역에서 분리한 것이며 `/mypage/running-profile` URL, dynamic 설정, 마이페이지 메뉴 링크와 클라이언트 상태 경계는 유지한다. MyPageRouteStory도 같은 목업 구현을 직접 import한다. 작업 트리 출처는 frontmatter에 기록한다.

## 진입점과 책임

`/signup`은 가입 방법만 표시한다. 이메일 가입은 `/signup/verify`로 이동하고, 카카오·네이버 가입은 연결되지 않았다는 안내를 표시한다. 이전 카카오 약관 동의·정보 입력·가입 완료 화면은 운영 가입 흐름에서 분리해 `src/shared/Mockup/signup` 및 `Mockup/Signup` Storybook에 보존한다. 별도 앱 URL은 추가하지 않았다.

`src/app/layout.tsx`는 서버에서 `await headers()`로 User-Agent를 읽고 `detectPlatform`으로 플랫폼을 선택한다. 휴대폰과 태블릿은 `mobile`, 그 외는 `web`이다. 이 선택은 화면 너비만으로 결정되지 않는다. 선택한 플랫폼은 `<body>`의 `platform-*` 클래스로도 전달된다.

루트 레이아웃은 공통 `ShopShell`에 페이지를 전달한다. `Suspense`는 화면 로딩 대체 콘텐츠를 제공하고, PC 루트에는 `--layout-web-min-width`가 적용된다.

## 파일 기반 경로

| 파일 또는 경로군                                | URL                   |
| ----------------------------------------------- | --------------------- |
| `src/app/page.tsx`                              | `/`                   |
| `src/app/products/page.tsx`                     | `/products`           |
| `src/app/products/[id]/page.tsx`                | `/products/:id`       |
| `src/app/cart/page.tsx`, `checkout/page.tsx`    | `/cart`, `/checkout`  |
| `src/app/collection/[id]/page.tsx`              | `/collection/:id`     |
| `src/app/explore/[...slug]/page.tsx`            | EXPLORE 하위 경로     |
| `src/app/running/run-club/[sessionId]/page.tsx` | 런클럽 상세           |
| `src/app/login/**`, `signup/**`                 | 회원 관련 화면        |
| `src/app/mypage/**`                             | 마이페이지            |
| `src/app/support/**`                            | 고객지원              |
| `src/app/not-found.tsx`                         | 미등록 URL의 404 화면 |

현재 회귀 테스트는 기존 62개 URL과 `/checkout`을 검증한다. 경로를 의도적으로 추가·변경할 때는 실제 페이지와 테스트의 기대 경로를 함께 갱신한다.

## 탐색과 쿼리

내부 링크는 `next/link`의 `href`, 이벤트 탐색은 `next/navigation`의 `useRouter`를 사용한다. 동적 파라미터는 `useParams`, 쿼리는 읽기 전용 `useSearchParams`로 읽는다.

상품 필터는 현재 쿼리를 복사한 `URLSearchParams`를 수정한 뒤 `router.push(..., { scroll: false })`로 반영한다. 모바일 필터는 임시 선택 상태를 보관하고 적용 버튼을 눌렀을 때 URL에 반영한다. React Router나 전체 앱을 분기하는 라우트 테이블을 다시 도입하지 않는다.

`/login/account-locked`와 `/login/find-account/id-confirmation-modal` 같은 모달 화면은 닫기·확인 때 `router.push`로 로그인 흐름의 다음 화면으로 이동한다.

새 페이지에서 서버·클라이언트 경계를 판단하고, 설치된 `node_modules/next/dist/docs/`의 해당 API 문서를 먼저 읽는다. 새 서버 페이지에 클라이언트 콜백을 직접 넘기지 않는다.

[공통 상태](state.md), [UI 구성](ui.md), [변경 검증](../development/verification.md)을 참고한다.

## 러닝세션 신청내역 연결

마이페이지 MY HOKA의 러닝세션 신청내역은 `/mypage/event-entries`에서 `RunClubPage.tsx`를 직접 표시한다. 기존 `/running/run-club`도 같은 컴포넌트를 표시하며 세션 상세 주소는 `/running/run-club/:sessionId`를 유지한다. 기존 이벤트·대회 신청 임시 화면은 이 경로에서 사용하지 않는다.

## 배송 및 반품안내

`/support/after-sales` URL은 유지하면서 `ShippingReturnsPage`로 연결한다. 이전 A/S 처리현황 화면 대신 고객센터 배송 및 반품안내를 표시한다. 출처는 작업 트리의 `src/app/support/after-sales/page.tsx`와 `src/shared/features/support/ShippingReturnsPage.tsx`다.

## 세탁 및 손질 방법 안내

`/support/care`는 `CareGuidePage`를 표시한다. 고객센터 정보 메뉴에서 접근하며, 안내 탭을 페이지 내부 상태로 전환한다. 출처는 작업 트리의 `src/app/support/care/page.tsx`와 `src/shared/features/care-guide/CareGuidePage.tsx`다.

## 장바구니 옵션·선택 주문 연결 보완 (2026-10-19)

/cart는 ShopShell.updateOptions를 CartPage에 전달한다. 기존 /checkout?selected 옵션 키 전달을 유지하며, 결제 완료 콜백으로 전달된 항목만 제거하도록 /checkout 라우트를 연결했다. 결제 완료의 주문 내용 확인 링크는 기존 /mypage/orders로 이동한다. 새 URL은 추가하지 않았다. 출처는 작업 트리의 src/app/cart/page.tsx, src/app/checkout/page.tsx와 CheckoutPage.tsx다. Next production build와 브라우저의 선택 상품 주문 이동을 확인했다.

## Mockup 전용 라우트 제거 (2026-10-20)

미확정 Mockup 화면 제거에 따라 다음 앱 라우트 진입점을 삭제했다: `/explore`, `/explore/shoe-finder`, `/explore/[...slug]`, `/launch-calendar`, `/mypage/running-profile`, `/running/alerts`, `/running/plans`, `/running/reviews`, `/running/rewards`, `/running/rotation`, `/running/shoe-finder`, `/store/experience`. 해당 주소는 더 이상 이 화면을 제공하지 않는다. 정식 run-club·상품·고객센터·계정 페이지는 유지한다. MyPageRouteStory의 running-profile 구현 연결도 제거했다. 위쪽의 과거 라우트 목록·Mockup 이동 기록보다 이 변경 기록이 우선한다. Next production build 및 갱신된 앱 라우트 manifest 테스트 2개를 통과했다.

## 시안 기반 에러 진입점 (2026-10-20)

`/maintenance`는 점검 안내, `/service-unavailable`는 일시적인 접속 불가 안내를 표시한다. `src/app/error.tsx`도 동일한 SystemStatusPage의 unavailable 구성을 사용해 App Router 하위 경로의 예외를 안내한다. 루트 layout 자체의 예외를 잡는 global-error까지 추가하지 않았다. 기존 not-found와 상품 상세의 미등록 ID는 NotFoundPage를 통해 같은 에러 표현을 공유한다. 실제 유지보수 모드를 활성화하거나 점검 시간을 가정하지 않는다. 점검 일정은 호출자 데이터이며 현재 라우트는 추후 안내 문구다.

모바일 `/search`는 일반 헤더/푸터 없이 검색 전용 닫기/입력 프레임을 표시한다. 닫기는 `/products`로 이동하고 새 검색은 `/search?q=...`로 연결한다. PC 검색결과는 일반 헤더/푸터를 유지한다. [시안 반영 기록](storefront-design.md)을 참고한다.

## 모바일 공지 상세 연결 (2026-10-20)

모바일 `/support/notices`는 목록 항목에서 기존 `/support/notices/[id]` 경로로 이동한다. PC는 단일 펼침 목록을 유지한다. 목록/상세는 notices.data.ts를 공유하고 NoticeDetailPage가 useParams로 읽은 1부터 시작하는 id에 해당하는 제목·날짜·시연 본문을 표시한다. 기본 스토리와 유효하지 않은 id의 기존 시연 동작은 첫 공지로 대체한다. 새로운 앱 경로·백엔드 조회는 추가하지 않았다. [고객센터 시안 기록](support-design.md)을 참고한다.


## IA 구조도 독립 페이지 (2026-10-28)

`/screen-index`는 `src/app/screen-index/page.tsx`에서 IaStructurePage를 렌더링한다. 검색엔진 색인을 제외하며 AppLayout은 이 경로에서 쇼핑몰 헤더·푸터를 생략한다. 나머지 경로는 유지한다. 작업 트리 출처: `src/app/screen-index/page.tsx`, `src/shared/components/layouts/AppLayout/AppLayout.tsx`.
