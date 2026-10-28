---
type: Architecture
title: '보조 TS 모듈의 사용처별 배치'
description: '컴포넌트 통합 후 남은 TS 파일을 실제 라우트와 공용 책임에 맞춰 배치한 기록이다.'
tags: [ownership, modules, routing]
status: draft
generated:
  by: codex/gpt-6
  at: '2026-10-28T10:52:23.370Z'
working_tree_sources:
  - src/app/cart/cart-item.ts
  - src/app/checkout/checkout-coupons.ts
  - src/app/checkout/checkout-summary.ts
  - src/app/homeContent.ts
  - src/app/homeCarouselPreview.ts
  - src/app/support/faq/faq.data.ts
  - src/app/locales/locales.data.ts
  - src/app/support/notices/notices.data.ts
  - src/app/support/size-guide/size-guide.data.ts
  - src/app/support/store/store.data.ts
  - src/app/signup/information/registration.types.ts
  - src/app/mypage/reviews/reviews.types.ts
  - src/app/mypage/profile/mypage-profile.types.ts
  - src/types/mypage-address.types.ts
  - src/app/mypage/mypage-home-data.ts
  - src/app/products/[id]/productDetailPresentation.ts
  - src/app/products/[id]/productInquiries.ts
  - src/app/products/[id]/productSizeOptions.ts
  - src/app/support/support.navigation.ts
  - src/app/support/inquiries/new/inquiryOrders.data.ts
  - src/app/support/inquiries/new/inquiryOrderSelection.storage.ts
  - src/context/InquiryPreviewContext.ts
  - src/context/RunClubSessionContext.ts
  - src/app/screen-index/screenConnections.ts
  - src/app/screen-index/storybookLinks.ts
  - src/app/screen-index/productListingIaRoute.ts
  - src/data/megaMenu.ts
  - src/data/headerPromotionData.ts
  - src/data/footerData.ts
  - src/data/searchOverlayData.ts
  - src/hooks/useRecentSearches.ts
  - src/hooks/usePhoneVerification.ts
  - src/lib/phoneNumber.ts
  - src/lib/passwordValidation.ts
---

# 보조 TS 모듈의 사용처별 배치

운영 소비자와 Storybook·타입 선언·테스트 참조를 구분하여 소유권을 확인했다. 단일 라우트에 속한 파일은 그 라우트에 두고 여러 하위 라우트가 함께 쓰면 공통 상위 라우트가 소유한다. 셸 데이터·공용 훅·컨텍스트·주소 타입·전화번호 유틸은 각각 data·hooks·context·types·lib로 옮겼다. Storybook 참조만으로 재사용 컴포넌트로 분류하지 않는다.

## 이동 목록

모든 경로는 저장소 루트 기준이다.

| 이전 경로                                                                  | 현재 경로                                                        |
| -------------------------------------------------------------------------- | ---------------------------------------------------------------- |
| `src/components/cart/cart-item.ts`                                         | `src/app/cart/cart-item.ts`                                      |
| `src/components/checkout/checkout-coupons.ts`                              | `src/app/checkout/checkout-coupons.ts`                           |
| `src/components/checkout/checkout-summary.ts`                              | `src/app/checkout/checkout-summary.ts`                           |
| `src/components/home/homeContent.ts`                                       | `src/app/homeContent.ts`                                         |
| `src/components/home/homeCarouselPreview.ts`                               | `src/app/homeCarouselPreview.ts`                                 |
| `src/components/faq/faq.data.ts`                                           | `src/app/support/faq/faq.data.ts`                                |
| `src/components/locales/locales.data.ts`                                   | `src/app/locales/locales.data.ts`                                |
| `src/components/notices/notices.data.ts`                                   | `src/app/support/notices/notices.data.ts`                        |
| `src/components/size-guide/size-guide.data.ts`                             | `src/app/support/size-guide/size-guide.data.ts`                  |
| `src/components/store-finder/store.data.ts`                                | `src/app/support/store/store.data.ts`                            |
| `src/components/signup-registration/registration.types.ts`                 | `src/app/signup/information/registration.types.ts`               |
| `src/components/mypage/reviews/reviews.types.ts`                           | `src/app/mypage/reviews/reviews.types.ts`                        |
| `src/components/mypage/mypage-profile.types.ts`                            | `src/app/mypage/profile/mypage-profile.types.ts`                 |
| `src/components/mypage/mypage-address.types.ts`                            | `src/types/mypage-address.types.ts`                              |
| `src/components/mypage/mypage-home-data.ts`                                | `src/app/mypage/mypage-home-data.ts`                             |
| `src/components/product/productDetailPresentation.ts`                      | `src/app/products/[id]/productDetailPresentation.ts`             |
| `src/components/product/productInquiries.ts`                               | `src/app/products/[id]/productInquiries.ts`                      |
| `src/components/product/productSizeOptions.ts`                             | `src/app/products/[id]/productSizeOptions.ts`                    |
| `src/components/support/support.navigation.ts`                             | `src/app/support/support.navigation.ts`                          |
| `src/components/support/inquiryOrders.data.ts`                             | `src/app/support/inquiries/new/inquiryOrders.data.ts`            |
| `src/components/support/inquiryOrderSelection.storage.ts`                  | `src/app/support/inquiries/new/inquiryOrderSelection.storage.ts` |
| `src/components/support/InquiryPreviewContext.ts`                          | `src/context/InquiryPreviewContext.ts`                           |
| `src/components/run-club/RunClubSessionContext.ts`                         | `src/context/RunClubSessionContext.ts`                           |
| `src/components/screen-index/screenConnections.ts`                         | `src/app/screen-index/screenConnections.ts`                      |
| `src/components/screen-index/storybookLinks.ts`                            | `src/app/screen-index/storybookLinks.ts`                         |
| `src/components/catalog/productListingIaRoute.ts`                          | `src/app/screen-index/productListingIaRoute.ts`                  |
| `src/components/common/organisms/Layout/SiteHeader/megaMenu.ts`            | `src/data/megaMenu.ts`                                           |
| `src/components/common/organisms/Layout/SiteHeader/headerPromotionData.ts` | `src/data/headerPromotionData.ts`                                |
| `src/components/common/organisms/Layout/SiteFooter/footerData.ts`          | `src/data/footerData.ts`                                         |
| `src/components/common/organisms/Search/searchOverlayData.ts`              | `src/data/searchOverlayData.ts`                                  |
| `src/components/common/organisms/Search/useRecentSearches.ts`              | `src/hooks/useRecentSearches.ts`                                 |
| `src/components/phone-verification/usePhoneVerification.ts`                | `src/hooks/usePhoneVerification.ts`                              |
| `src/components/find-account/phoneNumber.ts`                               | `src/lib/phoneNumber.ts`                                         |

비밀번호 검증 중계 파일 `src/components/find-account/passwordValidation.ts`는 제거하고 기존 `src/lib/passwordValidation.ts`를 직접 참조한다. 기존 내보내기 계약을 유지하며 중복 구현이나 호환용 파일을 추가하지 않는다.

## 유지한 모듈

재사용 컴포넌트와 계약을 공유하는 catalog 필터·정렬·메타데이터, orders 데이터·타입·정책, mypage 공통 탐색 데이터, care-guide 데이터, run-club 세션 데이터, phone-verification 본문 타입, Carousel 컨텍스트, ProductCard 타이포그래피와 SizeSelector 사이즈 목록은 기존 소유자 옆에 유지했다. TS 파일만 있는 하위 폴더라도 실제 재사용 UI를 지원하는 도메인 정책이면 이동 사유가 되지 않는다.

IA 전용 productListingIaRoute는 운영 IA 화면과 카탈로그 시나리오에서 사용하므로 app/screen-index로 옮겼다. screen-index의 재사용 디자인 가이드 TSX는 이번 이동 대상이 아니다.

## 보존 범위

파일 이동과 import·파일 참조 경로 및 정렬만 변경했다. UI·계산·검증·저장 키·상태 수명은 유지한다. Storybook과 타입 선언, 기존 테스트 import도 함께 갱신했다. 기존 작업 트리와 인덱스를 작업 전 별도로 기록했으며 스테이징·커밋·푸시는 수행하지 않는다. 과거 OKF 본문과 커밋 고정 출처는 당시 이력으로 보존하고 현재 working_tree_sources 및 이 기록으로 최신 위치를 안내한다.

## 검증

Codex 검증 (2026-10-28):

- npm run lint:fix·npm run lint·npm run typecheck 통과. 전역 포맷 실행 후 이번 이동 대상 외 src 파일이 바뀌지 않았음을 작업 전 스냅샷과 비교했다.
- Panda 생성·Next production build·Storybook production build 통과. Storybook의 모듈 지시문 및 빌드 성능 경고는 남아 있지만 빌드는 성공했다.
- 빌드 후 기존 Node 테스트 전체 85개 통과. App Router 경로 검사도 포함한다.
- 33개 이동 대상의 코드와 변경된 TSX를 작업 전 스냅샷과 TypeScript 토큰으로 비교하여 import·re-export 경로와 정렬 외 코드가 동일함을 확인했다.
- 과거 OKF 이력 외 소스·스토리·타입·테스트에서 삭제된 모듈 경로가 남지 않았음을 확인했다. 비어 있는 이전 디렉터리 13개를 제거했다.
- 이 작업에서 인덱스를 수정하거나 스테이징하지 않았다. 작업 도중 다른 작업의 인덱스 변경을 확인해 그대로 보존했다. OKF 작업 트리 매핑 검사에서 관련 문서 누락이 없음을 확인했다.

이번 변경은 모듈 소유권과 참조 경로 정리이며 브라우저에서 화면·상호작용 회귀를 추가 실행하지 않았다.
