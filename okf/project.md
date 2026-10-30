---
type: Project
title: '프로젝트 개요'
description: '서비스 목적, 기술 버전과 구현 범위를 설명한다.'
tags: [hoka, frontend, overview]
status: draft
generated:
  by: codex/gpt-6
  at: '2026-10-30T06:37:47+00:00'
source_revision: c9e8b1a75bdd4a2d52308410b8ce77773464a9e6
working_tree_sources:
  - src/hooks/useBindingQuery.ts
  - src/hooks/useRequestAction.ts
  - src/hooks/useRecentSearches.ts
  - src/hooks/usePhoneVerification.ts
  - src/types/cart.ts
  - src/app/mypage/reviews/reviewFixtures.ts
  - src/data/headerPromotionData.ts
  - src/data/footerData.ts
  - src/data/searchOverlayData.ts
  - src/data/screenIaSource.json
  - src/mocks/
  - src/data/
  - eslint.config.js
  - src/mocks/cartDisplay.ts
  - src/app/products/[id]/productInquiries.ts
  - src/app/products/[id]/page.tsx
  - src/mocks/orderRecommendations.ts
  - src/components/common/organisms/OrderRecommendations/OrderRecommendations.tsx
  - src/app/cart/page.tsx
  - src/app/checkout/page.tsx
  - src/data/megaMenu.ts
  - src/mocks/products.ts
  - src/data/screenRegistry.ts
  - README.md
  - src/components/checkout/CheckoutPage.tsx
  - src/components/size-guide/SizeGuidePage.tsx
  - src/shared/Mockup/teamwear/TeamwearPage.tsx
  - src/app/support/support.navigation.ts
sources:
  - id: package-json
    resource: https://github.com/nalpari/hoka-fo-pub/blob/b3f7243062b500eb4909961667ad142cc368ff91/package.json
    title: 'package.json'
  - id: readme-md
    resource: https://github.com/nalpari/hoka-fo-pub/blob/b3f7243062b500eb4909961667ad142cc368ff91/README.md
    title: 'README.md'
  - id: src-mocks-products-ts
    resource: https://github.com/nalpari/hoka-fo-pub/blob/b3f7243062b500eb4909961667ad142cc368ff91/src/mocks/products.ts
    title: 'src/mocks/products.ts'
  - id: src-data-screenregistry-ts
    resource: https://github.com/nalpari/hoka-fo-pub/blob/b3f7243062b500eb4909961667ad142cc368ff91/src/data/screenRegistry.ts
    title: 'src/data/screenRegistry.ts'
---

# 프로젝트 개요

## 상품 리뷰·문의 표현 검토 (2026-10-23)

리뷰 제목의 공통 Typography와 상품 문의 목록·답변·필터·더 보기 조합을 검토했다. productInquiries의 56건은 퍼블리싱 예시이며 실제 서버 연동·문의 등록 기능의 추가를 의미하지 않는다. ProductInquiryLink는 기존 /support/inquiries/new 경로를 사용한다. 프로젝트의 서비스 범위·라우팅·데모 경계에는 영향이 없다. 상세 API와 검증 범위는 [상품 문의 UI 기록](architecture/ui.md#상품-문의-시안과-필터-체크박스-2026-10-23)에 남겼다. 출처는 위 작업 트리의 productInquiries.ts·ProductDetailReviews.tsx·ProductDetailInquiryContent.tsx다.

## 추천 상품 목 데이터 경계 (2026-10-21)

src/mocks/orderRecommendations.ts는 products의 첫 네 항목을 id/name/gender/price/imageSrc/href 표시 데이터로 준비한다. recommendationImages의 인덱스별 이미지와 primaryImage fallback, /products/{id} 링크는 이전과 같다. CartContent와 CheckoutComplete가 이를 OrderRecommendations.items로 전달한다. 공용 organism의 런타임 목 데이터 의존성을 제거했으며 API 연동·상품 수·가격·IA/경로는 변경하지 않았다.

## GNB 최종안과 IA 동기화 (2026-10-20)

사용자 첨부 최종 메뉴 이미지에 따라 screenRegistry의 Men/Women Featured에 Best·New 및 Triple Black·Ready for UTMB를 명시하고, 기존 IMC 이름을 교체했다. 기존 번호는 유지하며 신규 목록은 IA 261~266(남성 Bondi·Sale·용품 라이프스타일, 여성 동일 순서)으로 배정했다. 액티비티 위치와 여성 라이프스타일 순서, 신발·의류·용품 표기도 GNB에 맞췄다.

IA 158 / eland_hex_06은 Partnerships > UTMB에서 Explore > 러닝 세션 신청으로 변경했다. 로그인 필요 값은 기존 true를 유지하고 기존 /running/run-club 목록에 연결한다. Featured의 Running Session / eland_hex_03은 별도 소개 항목으로 유지한다. 다른 기존 IA 번호·화면코드 및 159번 이후 기존 화면 정의는 보존했다. 새 목록의 화면번호는 eland_hca_01이다.

작업 트리 출처는 src/data/screenRegistry.ts와 src/components/common/organisms/Layout/SiteHeader/megaMenu.ts다. Node 대조에서 90개 3Depth 항목의 IA 순서·이름 일치와 기존 번호 보존을 확인했다. [공통 메뉴 렌더링과 미구현 본문 범위](architecture/ui.md#gnb-최종-메뉴-반영-2026-10-20)를 참고한다.

## 고객센터 화면 범위 변경 (2026-10-20)

팀/단체복 주문 안내는 운영 고객센터·IA에서 제외하고 Mockup/teamwear와 Storybook Mockup/Teamwear로 보존했다. screenRegistry의 IA 215/eland_hcu_08을 제거했다. 사이즈 가이드는 신규 IA 260으로 추가했으며 화면 코드가 아직 없으므로 빈 값으로 두고 디자인 대기를 기록했다. /support/size-guide는 공통 탐색·제목만 표시하고 본문은 비워 둔다. 다른 IA 번호는 변경하지 않았다.

HOKA 쇼핑몰의 PC·모바일 화면을 구현하는 퍼블리싱·데모 프로젝트다. 패키지 이름은 `eland-adaptive-wireframe`이다. 실제 상품·회원·주문 서버를 연결한 운영 서비스로 취급하지 않는다.

## 기술 기준

| 영역          | 구성                                   |
| ------------- | -------------------------------------- |
| 라우팅        | Next.js App Router                     |
| 고정 버전     | Next.js 16.3.5, React·React DOM 19.2.8 |
| 언어          | TypeScript, strict 검사                |
| UI            | React, Base UI                         |
| 스타일        | Panda CSS, 전역 SCSS                   |
| 컴포넌트 검수 | Storybook, Next.js Vite 프레임워크     |
| 의존성 설치   | npm, package-lock.json                 |

설치된 실제 버전은 `package-lock.json`과 `npm ls next react react-dom --depth=0`으로 확인한다. Node.js 24.21.0과 npm 11.19.0은 README에 기록된 개발 기준이며, 현재 실행 환경의 버전은 별도로 확인한다.

## 구현 범위

홈, 상품 목록·상세, 검색, 장바구니·주문/결제, 로그인·회원가입, 마이페이지, 고객지원, 런클럽·러닝 콘텐츠 화면을 제공한다. URL 목록은 `src/app/**/page.tsx`가 결정한다. 현재 README는 작업 트리의 주문/결제 화면과 기능별 UI 조합, 실행·검증 절차를 반영한다.

`src/data/screenRegistry.ts`는 IA 화면 메타데이터다. IA에 등록된 화면이 실제 라우트나 완성된 기능이라는 뜻은 아니다. 상품 정보는 `src/mocks/products.ts`, 기능별 정적 콘텐츠는 해당 기능 폴더에서 관리한다. 첫 번째 상품(`shoe-1`, Clifton 11 GTX)은 생성된 기본 상품을 덮어써 자체 색상·폭·갤러리를 가진다.

## 현재 제약

목 상품의 `price`는 판매가, 선택적인 `originalPrice`는 할인 전 정상가다. 상품 목록의 `shoe-3`(Daily Motion 3)에 정상가 290,000원 → 판매가 232,000원(20%)의 퍼블리싱 예시를 제공하며 실제 프로모션 가격을 의미하지 않는다. 상품 카드와 hover 미리보기의 할인 표시 계약은 [컴포넌트와 스타일](architecture/ui.md)의 상품 가격 할인 표시를 참고한다.

- 로그인과 회원 관련 흐름은 데모 구현이다.
- 주문·결제 화면 `/checkout`은 배송지 정보·상품/할인·결제 수단·합계·완료 상태를 표시하는 데모다. 장바구니는 디자인 미리보기를 위해 목 상품 4개로 시작하며 완료 시 장바구니를 비운다. 실제 주문 저장·결제 승인·쿠폰 조회는 연결하지 않았다.
- 목 데이터 기반 화면에 실제 데이터 저장·결제·인증을 기대하지 않는다.
- 화면 존재, 빌드 성공, 실제 서비스 연동 완료를 구분한다.

[라우팅](architecture/routing.md), [공통 상태](architecture/state.md), [로컬 실행](development/setup.md)을 함께 읽는다.

## 러닝세션 신청내역 IA

IA 200(`eland_hmy_31`)의 러닝세션 신청내역은 `/mypage/event-entries`의 `RunClubPage.tsx`다. IA 258의 기존 모집 목록과 동일 화면을 사용하며 메타데이터에 이 관계를 기록한다. Storybook은 `PAGES/MYPAGE/RunClub/List`(목록·빈 상태)와 `PAGES/MYPAGE/RunClub/Detail`(상세 상태·대형 화면)로 분류한다.

## 상품 프로모션 데이터 (2026-10-20)

작업 트리 `src/mocks/products.ts`의 `Product.promotion`은 단일 프로모션 문자열과 readonly 배열을 모두 허용한다. 기존 목 상품 값은 유지하며 복수 값은 Storybook 예시로 제공한다. 상품 목록의 신상품순은 단일 값과 배열 모두에서 `New` 포함 여부를 사용한다. 표시 규칙은 [복수 프로모션 뱃지](architecture/ui.md#상품-복수-프로모션-뱃지-2026-10-20)를 참고한다. 타입 검사와 신상품 정렬 동작을 확인했다.

## Clifton 상품 정보 시안 문구 (2026-10-23)

src/mocks/products.ts의 Clifton 11 GTX detailDescription을 사용자가 첨부한 상품 정보 시안의 핏 멤브레인·밀폐된 메쉬 갑피·발수 코팅·스피드 레이스·접지력 포드·반사 디테일 문구로 갱신했다. 이는 첨부 시안에 따른 퍼블리싱 예시이며 제품 기능 검증을 의미하지 않는다. ProductDetailContent의 새로운 특징과 안정화·로드 러닝/워킹/라이프 스타일 예시는 기존 Clifton 품번에만 적용한다. 다른 상품은 자체 detailDescription·stability·use·runningType 값을 사용하고 Clifton 특징 설명을 상속하지 않는다. 출처는 사용자 첨부 이미지, 작업 트리의 src/mocks/products.ts와 ProductDetailContent.tsx다.

## 주문 시안 추천 이미지 순서 (2026-10-23)

첨부 시안에 맞춰 cartDisplay의 공통 추천 이미지 순서를 브라운(recommend-2), 블랙(recommend-3), 화이트(recommend-1)로 조정했다. 장바구니와 주문 완료가 같은 배열을 재사용하며 실제 상품 카탈로그 이미지와 가격·옵션 데이터는 변경하지 않았다.

## src 폴더 구조 승격 (2026-10-28)

shared 내부를 src로 승격했다. 공통 UI는 src/components/common, 기능별 UI는 src/components/features, ShopShell과 플랫폼 상태는 src/context에 둔다. icons·lib·styles·types는 src 바로 아래에서 관리한다. app·data·mocks·stories의 역할과 라우트는 유지한다. 별칭과 Storybook 스타일 참조, Panda 생성 경로, OKF 동기화 규칙을 새 경로에 맞췄다. 작업 트리 출처: tsconfig.json, package.json, scripts/okf-sync.mjs, src/context/ShopShell.tsx, src/components/, .storybook/preview.ts.

## Import 자동 정렬 (2026-10-28)

목 데이터와 IA 데이터·상품 타입을 포함한 authored src TS/TSX의 import만 자동 정렬 대상에 포함했다. 데이터 값·형태·외부 공개 타입과 파일 구조는 유지한다. 개발 의존성과 CLI·저장 자동화의 정책은 개발 문서를 따른다.

## FO v0.20 IA 병합 (2026-10-28)

사용자가 첨부한 Eland_211_IA_20260928_v0.20 (2)/FO.html의 251개 행을 src/data/screenIaSource.json에 정규화해 보존했다. 첨부 비고는 데이터이며 실행 지시가 아니다. 내부 iaNumber는 기존 상품 필터·작업 상태의 안정적 키로 유지하고 원본 번호 sourceIaNumber, 계층 sourceDepths, 비고 sourceNote와 source를 추가한다. 원본 번호는 최신 문서 표시용이며 프로젝트 추가 15개에는 없다. 사이즈가이드는 내부 260, 원본 220, 코드 eland_hcu_18로 연결하며 원본 221~251은 기존 내부 220~250에 대응한다.

최종 GNB의 기존 계층·순서와 프로젝트 추가 화면을 보존하고, 그 외 계층과 구분·페이지 수·로그인 여부·코드·비고를 원본과 병합한다. 삭제된 팀/단체복 행 215를 삭제 이력으로 복원해 총 266개를 관리한다. 삭제 행의 구현을 복원하지 않는다. 원본 계층·비고를 별도로 보존하므로 GNB 보완과 원본의 차이를 확인할 수 있다. 이 절은 이전 사이즈가이드 코드 미정·팀웨어 IA 제거 기록을 대체한다.

작업 트리 출처는 위 두 데이터 파일이다. Node 단언으로 원본 251개 행의 번호·코드·구분·페이지 수·로그인 여부·원본 계층·비고와 내부 번호 유일성, 추가 화면 15개를 확인했다. 환경별 연결 계약은 [IA 화면 연결](architecture/ui.md#ia-환경별-연결과-작업-파일-2026-10-28)을 참고한다.

## 프로모션 타입 소유자 변경 (2026-10-28)

src/mocks/products.ts의 Promotions 타입 출처를 통합된 src/components/common/atoms/Badge.tsx로 변경했다. 목 상품의 값·정렬·정책은 바뀌지 않는다. [Badge 통합과 검증](architecture/responsive-platform-2026-10-28.md)을 참고한다.

## 보조 TS 모듈의 사용처별 배치 (2026-10-28)

헤더 프로모션·메가 메뉴·푸터·검색 제안 데이터의 현재 소유 위치는 src/data다. 단일 라우트에 종속된 홈·FAQ·로케일·공지·매장·사이즈 가이드 등의 데이터는 해당 app 라우트 옆에 둔다. 공용 데이터라는 이유 없이 모든 페이지 데이터를 data로 승격하지 않는다. [이동 목록과 검증](architecture/ts-module-ownership-2026-10-28.md).

작성: codex/gpt-6, 2026-10-28T10:52:23.370Z. 이번 작업 트리 출처는 위 working_tree_sources이며 고정 source_revision의 과거 이력과 구분한다.

## 퍼블리싱과 서비스 연결 경계 (2026-10-29)

화면 데이터·서비스 함수 연결 계약을 추가했으며 실제 API·인증·결제 서비스를 구현한 것은 아니다. 기존 목 데이터 데모를 유지한다. 장바구니 시안 이미지는 CartItem.imageSrc로 명시하고 실제 색상명에 따른 이미지 교체 규칙을 제거했다. [연결 계약과 적용 범위](architecture/data-binding.md).

작성: codex/gpt-6, 2026-10-29T00:06:17Z. 출처는 위 working_tree_sources의 현재 작업 트리이며 API 연동 완료를 의미하지 않는다.

## 화면 인계 경계 확장과 소스 주석 (2026-10-29)

남은 화면의 실제 데이터/요청 연결 계약을 추가했다. useBindingQuery는 JSON 조건 변경을 안정적인 콜백에 알리고 조회 자체/응답 순서는 서비스 어댑터가 소유한다. 공유 BindingState/ListBinding은 items/전체 건수/추가 조회/상태를 구분한다.

홈/상품/주문/문의/리뷰/검색/국가/가이드 등의 예시는 운영 API가 아니다. 데이터 소유 파일에 [개발팀 바인딩] 주석으로 DTO 변환 지점과 현재 fixture 한계를 설명했다. 미연동 소셜·아이핀·주소검색·컬렉션·상품 상세 보조 콘텐츠 등을 실제 구현으로 오인하지 않도록 남은 경계를 기록했다. 매장 지도와 기존 환불계좌는 제외했다. [전체 계약](architecture/data-binding.md)을 참고한다.

작성: codex/gpt-6, 2026-10-29T01:12:53Z. 이번 작업 트리의 출처는 working_tree_sources에 추가했으며 기존 고정 커밋 출처/검증 이력을 보존했다.


## 첨부 디자인의 표시 모델 확장 (2026-10-29)

주문 쿠폰의 상품 행 식별자·선택 쿠폰과 기본배송지 저장 의도, 마이페이지 주문 수량/등급 진행률을 표시·제출 모델로 연결했다. 실제 결제/회원/취소 서비스가 구현된 것으로 간주하지 않는다. [구현 범위·출처·검증](architecture/design-implementation-2026-10-29.md).

## 상태 preview와 IA 연결 범위 (2026-10-30)

기존 59개 페이지에 고정 확인용 preview 61개를 추가했다. screenRegistry의 IA 번호와 진행 상태는 유지하고 러닝세션 신청내역의 오래된 동일 화면 설명만 실제 소유자로 정정했다. [연결 범위와 미확정 항목](architecture/publishing-state-previews-2026-10-30.md)을 참고한다.

## 화면 목록의 사용자 확정 반영 (2026-10-30)

`src/data/screenRegistry.ts`의 IA 158은 병합 후 표시명을 ‘러닝 세션 신청’으로 유지하며 변경 적용 완료 비고를 표시한다. 원본 `sourceDepths`의 UTMB와 IA 번호는 보존한다. IA 167은 디자인 미수급·목업 판정과 실제 페이지 연결 제외를 비고에 기록하며 화면 자체를 삭제 상태로 처리하지 않는다. 마일리지 안내는 사용자 요청대로 삭제 유지한다. 디자인 수급은 `storybookLinks.ts`에서 사용자 확인 근거로 관리하고, 라우트 존재만으로 수급을 추정하지 않는다. 상세 출처는 [상태 preview 문서](architecture/publishing-state-previews-2026-10-30.md#empty-문구와-ia-연결-정리-2026-10-30)에 기록했다.

런클럽 상세 IA 259의 기본 페이지 링크 `/running/run-club/yeouido-night`를 첫 STATE 신청 가능으로 이동했다. 모집 마감·신청 예정과 함께 세 상태를 하위 행에 표시하며 부모 상세의 상태 나열 비고는 screenRegistry에서 제거했다. 기본 route 없이 상태 링크만 있는 부모는 실제 페이지 셀에 -를 표시하고 독립 경로 없음으로 오해시키지 않는다. 보기 링크·비고 및 상태 셀 rowSpan·접기와 Storybook WEB/Mobile 연결, 실제 런클럽 페이지·데이터는 유지한다. 출처: `src/app/screen-index/screenConnections.ts`, `src/data/screenRegistry.ts`, `src/app/screen-index/_components/IaStructurePage.tsx`. 변경 파일 lint/format과 기존 preview 링크 테스트로 확인하며 브라우저 재검증은 수행하지 않았다.

## 러닝 세션 명칭과 IA 연결 정정 (2026-10-30)

러닝 세션 목록·상세·Empty의 현재 URL은 `/running/running-session` 아래이며 관련 RunClub 심볼·폴더를 RunningSession으로 변경했다. `/mypage/event-entries`는 유지한다. GNB Featured > Running Session과 IA 155가 목록을 연결한다. IA 158은 원본 Partnerships > UTMB의 메뉴만 유지하며 페이지·스토리·파일 연결 없이 디자인 미수급·퍼블리싱 대기다. IA 258·259는 기존 상태 확인 행으로 유지한다. 이전 run-club URL의 redirect는 추가하지 않는다. 앞선 IA 158 러닝 세션 연결 설명은 이 결정으로 대체하며 원본 계보·과거 검증 기록은 보존한다. 현재 출처는 src/data/megaMenu.ts, src/data/screenRegistry.ts, src/app/screen-index/screenConnections.ts 및 running-session 구현·Context다.

출처: 사용자 확정 결정과 현재 작업 트리. 생성 시점은 frontmatter를 따른다.

## Featured 하위 러닝 세션 계층 정정 (2026-10-30)

사용자 후속 확인에 따라 독립 D2 Running Session 묶음을 제거했다. IA 155·258·259는 모두 EXPLORE > Featured > Running Session에 속하며 기존 목록·상세 번호와 상태 링크는 유지한다. 목록·상세 상태 행은 D4에 배치하고 페이지 연결은 D3 Running Session에서 제공한다. tests/preview-links.test.mjs는 세 IA의 D1~D3 일치와 독립 D2 부재를 검사한다. 출처: src/data/screenRegistry.ts, tests/preview-links.test.mjs.

출처: 사용자 확정 결정과 현재 작업 트리. 생성 시점은 frontmatter를 따른다.
