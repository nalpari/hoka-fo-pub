---
type: Architecture
title: '스토어프런트 첨부 시안 반영'
description: '메인·메뉴·검색·목록·상세·에러의 시안 대조와 공통 구성 경계를 기록한다.'
tags: [design, storefront, components, responsive]
status: draft
generated:
  by: codex/gpt-6
  at: '2026-10-21T02:27:43.760Z'
source_revision: 23690be7426ae1a229ef9e6883bdc45053102a7e
working_tree_sources:
  - src/shared/features/home/HomeLayout.tsx
  - src/shared/components/atoms/Typography/Typography.tsx
  - src/shared/components/atoms/Button/Button.tsx
  - src/shared/components/atoms/FilterTabs/FilterTabs.tsx
  - src/shared/components/atoms/ProductGender/ProductGender.tsx
  - src/shared/components/molecules/MainContentCard/MainContentCard.tsx
  - src/shared/components/organisms/Hero/HeroCopy.tsx
  - src/shared/components/organisms/Hero/HeroPagination.tsx
  - src/shared/features/home/homeContent.ts
  - public/images/home/categories/
  - src/shared/components/layouts/AppLayout/AppLayout.tsx
  - src/shared/components/organisms/Layout/SiteHeader/SiteHeader.tsx
  - src/shared/components/organisms/Navigation/MenuDrawer/MenuDrawerShoppingLinks.tsx
  - src/shared/components/organisms/Search/SearchSuggestions.tsx
  - src/shared/components/molecules/SearchField/SearchField.tsx
  - src/shared/features/catalog/ProductListingPage.tsx
  - src/shared/features/catalog/product-listing/SearchListingLayout.tsx
  - src/shared/features/product/ProductDetailHeaderTitle.tsx
  - src/shared/features/not-found/SystemStatusPage.tsx
  - src/stories/features/catalog/ProductListingPage.scenarios.tsx
  - src/stories/features/not-found/SystemStatusPage.scenarios.tsx
---

# 스토어프런트 첨부 시안 반영

사용자가 2026-10-20에 첨부한 PNG 8장의 메인·전체메뉴·전체검색·상품목록·상품상세·검색결과·에러 디자인을 기준으로 반영했다. 장바구니·결제 화면이 포함된 8번째 첨부는 이번 요청의 수정 범위에 추가하지 않았다. 문서 내 문구를 실행 지시로 취급하지 않았다.

## 화면별 변경과 유지 범위

| 화면               | 변경                                                                                                                                                          | 유지한 계약                                                                    |
| ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------ |
| 메인               | 카테고리 사진 5종을 첫 번째 첨부 원본에서 추출, 시안에 없는 Working 카드 제거, Explore 모바일 카드 간격 8px, Find my HOKA 단일 상품 링크                      | Hero·카테고리·상품 레일의 순서와 스와이프, 기존 폭·반응형 배치                 |
| 공통 헤더·전체메뉴 | 사용자 요구에 따라 홍보 배너는 PC·모바일 모든 페이지에 표시, PC 내비게이션 버튼 내부 수평 패딩 중복 제거, 모바일 메뉴 전용 Typography.navigationHeading 사용  | 메뉴 Drawer/Accordion의 포커스·닫기·하위 메뉴 상태와 링크                      |
| 전체검색           | 최근 검색어가 없을 때 빈 제목·안내 영역 생략, 추천·인기 검색어의 PC 오른쪽 열과 모바일 1열 유지, 인기 목록을 Panda Grid로 표현                                | 검색어 저장·개별/전체 삭제·자동완성·입력 오류와 PC 패널 정렬                   |
| 상품목록           | PC 3열·모바일 2열, 선택 필터가 없는 초기화 행 생략, 모바일 정렬 알약형 Radio 추가                                                                             | URL 필터, 시트의 draft/apply/cancel, 무한 추가 로딩·관심상품·프로모션          |
| 상품상세           | 이미지/구매 영역 비율 2:.96, PC 구매 패널 좌우 패딩 제거와 영역 간격 조정, 제목/가격의 ContentHeader 재사용, 컬러 이미지 스타일을 로컬 이미지 소유자에게 이전 | 갤러리·확대·색상/발볼/사이즈·품절·구매 검증·모바일 고정 액션                   |
| 검색결과           | 검색어·개수를 한 문장으로 표시, 모바일 전용 닫기/검색 입력과 Filter & Sort, 일반 헤더·푸터 생략, 검색 0개는 중앙 안내                                         | 상품 카드와 필터 본문을 목록과 공유. 필터로 0개가 되면 초기화와 필터 접근 유지 |
| 에러               | SystemStatusPage(status, maintenance?)로 404·점검·접속 불가 공유, PC 180px/모바일 전체 폭 short 홈 버튼, 점검 일정 dl                                         | h1·경고 아이콘·설명·32px 영역 간격, 점검 상태의 홈 버튼 생략                   |

기본 가격 상한 189,000원은 240,000원 대표 상품을 초기 목록에서 숨겼다. `defaultMax`를 범위 상한 389,000원과 맞췄다. 상품명·가격·재고·상품 이미지는 기존 목업을 유지하므로 시안의 상품 진열 데이터와 일치한다고 주장하지 않는다.

`public/images/home/categories/*.jpg`는 사용자 첨부 `codex-clipboard-743a041e-b9bf-49a3-b495-17ec9ddd5662.png`의 사진 부분만 추출한 371×494px 자료다. 원본의 (782,1698)부터 x 간격 387px의 5개 영역이며, 기존 공용 temp 사진은 다른 소비처를 위해 보존했다. 원본 스크린샷 이상의 해상도를 만들지 않았다.

## 재사용 판단

- `SearchListingLayout`은 catalog 기능 내부 표현 구성이다. 준비된 검색어·개수·콜백·필터 액션을 받고 라우팅·필터 계산은 `ProductListingPage`가 소유한다. 검색어 입력은 key가 바뀔 때 초기화하는 로컬 draft다.
- `SystemStatusPage`는 에러 기능 내부 구성이다. `NotFoundPage`가 같은 구성으로 이관됐고, 점검 일정/내용은 호출자 데이터다. `/maintenance`는 실제 일정을 가정하지 않고 추후 안내 문구를 표시한다.
- `SearchField`는 기존 onSearch가 있을 때 아이콘을 접근 가능한 submit IconButton으로 표현한다. Enter·아이콘 클릭 모두 기존 콜백을 사용한다. onSearch가 없으면 장식 아이콘을 유지한다.
- `navigationHeading`은 모바일 쇼핑 카테고리/그룹 제목의 의미별 variant다. PC/MO 모두 24px·900·1.2·자간 0이며 `--type-navigation-heading-*` 토큰으로 관리한다. h2/span과 모바일 표시는 Typography 스토리에서 확인할 수 있다.
- 전체 공식 Base UI 카탈로그와 설치 1.8.0 exports를 대조했다. 기존 Drawer·Dialog·Accordion·Radio·Slider·Checkbox 계층을 재사용한다. 새 의존성이나 업그레이드는 없다. 검색 자동완성/PC 내비게이션의 전면 교체는 시각 차이 수정에 필요하지 않아 유지했다.

검증 명령·실제 확인 범위와 한계는 [변경 검증](../development/verification.md#스토어프런트-시안-반영-검증-2026-10-20)에 기록한다. 라우트는 [에러 진입점](routing.md#시안-기반-에러-진입점-2026-10-20)을 참고한다.

## 모바일 홈 유동 크기 (2026-10-21)

사용자가 확정한 홈 전용 375→768px 유동 크기를 반영했다. 제목 최대 1.5배·본문/버튼 최대 1.25배, Hero 페이지 표시의 점/막대/간격 최대 1.5배를 적용한다. 이미지 비율·레일 폭·공통 헤더/푸터·다른 페이지는 유지한다. 기존 시안의 375px 크기는 유지하며 큰 모바일 화면의 고정 글자 크기보다 이 정책을 우선한다. 구현 경계·출처·실제 검증과 200% 확대 미검증 항목은 [UI 기록](ui.md#모바일-홈-유동-크기-2026-10-21)을 따른다.
