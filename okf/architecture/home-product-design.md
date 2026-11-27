---
type: Reference
title: '메인과 상품 상세 Figma 적용'
description: '메인과 상품 상세의 PC·모바일 디자인 수치, 기존 데이터 경계와 실제 검증을 기록한다.'
tags: [figma, home, product, responsive, panda-css]
status: draft
updated: '2026-11-27T17:14:20+09:00'
generated:
  by: codex/gpt-6
  at: '2026-11-02T05:18:16Z'
source_revision: cc691836be2cb041fd7a20787336c765463ba97e
working_tree_sources:
  - src/app/_components/HomeContent.tsx
  - src/app/_components/home.recipe.tsx
  - src/app/_components/HomePromotionDialog.tsx
  - public/images/temp/home-promotion.webp
  - src/app/homeContent.ts
  - src/app/products/[id]/_components/ProductDetailContent.tsx
  - src/components/common/layouts/MainSection.tsx
  - src/components/common/molecules/HomeCarouselSection.tsx
  - src/components/common/molecules/ProductOptionSelectors/ProductColorSelector.tsx
  - src/types/component-contracts/components-common-layouts-MainSection.d.ts
  - src/types/component-contracts/components-common-molecules-HomeCarouselSection-HomeCarouselSection.d.ts
sources:
  - id: main-design
    resource: https://www.figma.com/design/qyXJp4bnoeYSQxQULV8Wql/-HOKA-Design
    title: 'Main 시안'
  - id: product-design
    resource: https://www.figma.com/design/qyXJp4bnoeYSQxQULV8Wql/-HOKA-Design
    title: 'PDP 시안'
---

# 메인과 상품 상세 Figma 적용

## 메인 홍보 팝업 (2026-11-25)

[HOKA 디자인]의 메인팝업 PC·모바일 프레임을 확인했다. PC 배너는 400×534px, 모바일은 375px 화면에서 좌우 여백 16px과 343×457px이다. 팝업 모서리는 10px, 하단 버튼 영역은 PC 53px·모바일 52px이다. 숫자 표시는 Pretendard Regular 15px, 하단 문구는 Medium 15px이다. 내보낸 시안에서 백색 배경이 #999999로 표시되어 검정 40% 오버레이를 적용했다. PC에는 28px 이전·다음 버튼이 있고, 모바일은 스와이프하며 키보드로 탐색할 때 버튼이 표시된다. 좁거나 낮은 화면에서는 배너 비율을 유지하며 팝업이 가용 영역에 맞게 줄어든다.

IA 미리보기의 첫 장은 시안의 이미지 fill이다. 두 장은 전환 확인을 위해 기존 메인 배너를 사용한다. 현재 위치와 총 개수는 시안 예시 숫자 대신 전달된 배너 수를 따른다. 통합 소유자는 `RouteContent`의 `promotion`에 현재 `open`, 배너 `id`·`image`·`alt` 목록 및 닫기 사유 콜백을 연결한다. ‘오늘 하루 보지않기’의 저장과 운영 노출 조건은 통합 소유자가 담당한다. 미리보기에서는 두 버튼 모두 현재 화면에서 팝업을 닫는다.

검증에서 PC 1920×1008과 모바일 375×771의 배너와 하단 영역을 실측했다. PC에서 이전 버튼으로 마지막 장까지 순환, 다음 버튼, 방향키, Escape를 확인했다. 모바일에서는 스와이프와 두 닫기 버튼, 새로고침으로 첫 장 복귀를 확인했다. 닫은 뒤 포커스는 메인 영역으로 돌아간다. 667×375에서도 하단 버튼까지 화면에 들어왔으며, 브라우저에서 한글 하단 문구에 실제 Pretendard Medium이 사용되는 것을 확인했다.

[HOKA 디자인]: https://www.figma.com/design/qyXJp4bnoeYSQxQULV8Wql/-HOKA-Design

## 메인

대상은 `/`이다. Main 섹션의 PC과 Mobile, 필요한 배너·카테고리·Explore·Find my HOKA 하위 노드를 읽고 내보낸 화면과 대조했다. 화면 파일과 별도 디자인 시스템 파일의 읽기 접근을 각각 확인했다. 큰 노드 일부는 응답 시간 초과 후 필요한 하위 구조를 읽었으며, 스크린샷만으로 구조를 확인했다고 기록하지 않는다.[^main-design]

| 디자인                                          | 구현                                                                                                                           |
| ----------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| Hero PC 1920×720·MO 375×500                     | PC·모바일 Figma 이미지 크롭을 별도로 사용한다. 제목은 The Future HOKA Black 80px·40px, 설명은 24px·16px, 버튼은 48px·40px이다. |
| Shop by category·Explore·Best sellers 제목      | The Future HOKA Black PC 44px·MO 30px와 섹션별 행간·세로 보정값을 적용한다.                                                    |
| 섹션 사이와 본문 하단 간격                      | PC 96px·MO 72px이다. 모바일에서 Best sellers와 Explore를 Find my HOKA 앞에 배치한다.                                           |
| 카테고리 카드 PC 371×494·MO 312×415.44          | 사진 5종에 시안 크롭을 적용한다. 카드 간격은 16px, 제목은 PC 28px·MO 24px, 링크는 PC 16px·MO 14px이다.                         |
| 베스트셀러 상품 썸네일 PC 약 294×367·MO 151×189 | 공통 `ProductThumbnail`의 `listing` 비율을 사용한다. 탭 높이는 PC 35px·MO 30px이며, 모바일 카드 간격은 10px이다.               |
| Explore 이미지 PC 500×665.77·MO 375×500         | PC와 모바일별 이미지 크롭을 적용한다. 모바일은 8px 카드 간격, 24px Black 제목, 40px CTA를 사용한다.                            |
| Find my HOKA 카드                               | [Find my HOKA 카드 실측](#find-my-hoka-카드-2026-11-27)을 따른다.                                                              |

### 메인 섹션 실측 (2026-11-27)

홈 전용 Panda 클래스와 반응형 변수는 `src/app/_components/home.recipe.tsx`에 둔다. `HomeContent.tsx`는 플랫폼별 섹션 순서, Hero 진행 상태, 캐러셀과 탭 조작을 소유한다. 트레일 러닝 탭의 고정 상품 순서·가격·이미지와 모바일 Explore 문구는 `homeContent.ts`에 둔다. 상품 상세 ID가 없는 트레일 러닝 시안 카드는 카테고리 상품 목록을 열며, 다른 탭은 기존 상품 데이터를 사용한다. 연결 경계는 [데이터 바인딩](data-binding.md#현재-연결-경계-2026-11-05)을 따른다.

PC 1920px·MO 375px에서 Figma와 브라우저를 2배로 캡처했다. Hero 제목·설명 시작 위치는 시안과 일치했고, 나머지 섹션 제목과 첫 카드의 텍스트 시작점 차이는 최대 1.5 CSS px였다. 모바일에서는 Hero 슬라이드 선택과 카테고리 스와이프를, PC에서는 카테고리 다음 버튼을 확인했다. 1024·1025·1199·1200px에서 플랫폼별 본문 순서, PC 최소 캔버스, 리사이즈 시 Best sellers 탭 선택을 확인했다.

### Find my HOKA 카드 (2026-11-27)

홈의 `imagePill` 카드에 PC 371×494px, 모바일 253×336.88px 시안 비율을 적용했다. 정사각형 이미지 위에 텍스트를 겹치고 제목은 PC The Future HOKA Black 28px, 모바일 Black 24px로 표시한다. 링크 글자는 Pretendard SemiBold 600으로 PC 16px, 모바일 14px를 사용한다. 캐러셀 내부 여백을 제외한 모바일 카드 폭은 375px 뷰포트에서 253px이며 카드 간격은 16px이다. [Main PC·모바일 시안][HOKA 디자인].

Figma 원본과 브라우저를 2배로 캡처해 PC 1920px과 모바일 375px에서 카드 5종의 첫 글자 픽셀을 카드 상단 기준 CSS px로 비교했다. 보정 전 PC는 제목 4.5~5px, 설명 6.5~7px, 링크 8~8.5px 아래에 있었다. 모바일은 제목 2.5~3px, 설명 3.5px, 링크 1.5px 아래였으며, 설명이 두 줄인 Clifton·Bondi·Speedgoat는 링크가 22.5px 아래에 있었다. 세 카드의 표시 문구를 시안에 맞췄으며 Bondi는 PC와 모바일 설명을 각각 제공한다.

보정 후 두 플랫폼의 제목·설명·링크 첫 글자 위치 차이는 5종 모두 0~0.5 CSS px다. 375px에서 설명이 모두 한 줄이고 카드 폭과 높이가 시안과 일치했다. 1200px PC와 320px 모바일에서는 설명 줄바꿈에 따라 카드가 높아지며 하단 링크 전체가 들어오는 것을 확인했다.

## 상품 상세

상품정보의 최신 제목/본문 계약과 MO 타이포·여백, 실제5줄 초과 시에만 노출하는 더보기는 [상품정보 표시와 본문 측정](routing.md#상품정보-표시-데이터와-5줄-더보기-2026-11-20)을 따른다. PC 의류의 최초 펼침 예외와 상품정보 러닝 유형 행은 제거됐다.

현행 특징 영역은 [특징 배치와 상세 탭 변경](routing.md#상품-상세-특징-배치와-상세-탭-2026-11-20)을 따른다. PC는 상품 종류와 무관하게 3개 이하3열·4개 이상3개 크기의 공통 캐러셀, MO는 전체1열이다. 제목→목록 PC32px/MO16px·이미지→설명24px·MO 카드 사이48px이며, 사용자 요청으로 의류4열 시안은 채택하지 않는다. 후속 브라우저 코멘트에 따라 상세 앵커 라벨은 Pretendard·미선택400/선택600·PC16px/18px·MO14px/21px·자간-0.02em, 의류의 미확정 사이즈 탭과 연결 본문은 제거했다. 아래 표는 최초 적용 기록이다.

대상은 `/products/shoe-1`이다. PDP 섹션의 PC, MO, 할인, 고정 CTA와 후속 PC·펼침/접힘 프레임의 필요한 구조를 확인했다. 시안에는 이미지·Tab & Spec·Why you’ll love it·Review·상품문의·Info Accordion이 있어 기존 상세 기술/리뷰/문의 영역을 유지했다.[^product-design]

| 디자인                                                                   | 구현                                                                                                                                                                                                                |
| ------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| PC 본문 1532px = 이미지 1016px + 간격 32px + 패널 484px                  | 기존 ProductDetailGrid의 열 비율을 1016:484로 보정한다. 상단 56px와 이미지의 기존 2열·16px 간격은 유지한다.                                                                                                         |
| PC 상품명 Pretendard 36px·MO HOKA 28px                                   | 기존 Typography에 플랫폼별 variant/언어를 명시한다. PC 실제 글리프는 Pretendard Black으로 확인했다. 가격은 기존 ProductPrice를 직접 재사용해 정상가·할인 표시를 함께 지원한다.                                      |
| 패널 주 영역 간격 40px                                                   | 기존 Stack에서 적용한다. 메타 텍스트를 일반 굵기로, 공유/관심 아이콘 사이를 16px로 맞춘다.                                                                                                                          |
| 컬러 선택 PC 74×74·MO 76×76, 간격 8px                                    | 기존 ProductColorSelector의 detail 표현만 보정한다. cart 표현은 기존 ProductOptionList를 사용한다. 이미지는 contain과 정사각형 intrinsic 비율을 유지한다.                                                           |
| 상품 정보 PC 제목 22px/900·부제 20px/600, MO 제목 20px/600·부제 16px/600 | 기존 ContentSection/ContentHeader/DescriptionList에서 적용한다. 설명 16px/14px, 본문 간격 40px·라벨/값 간격 12px와 행 간격 24px를 사용한다. MO 배경은 화면 좌우 끝까지 이어진다.                                    |
| 상품 정보의 컬러·스타일코드·발볼                                         | ProductDetailContent의 현재 color·product.styleCode·width를 표시한다. 선택 변경을 실제 표시값에서 확인했으며 새 상품 분류/재고 판정을 만들지 않았다. 연결 책임은 해당 소유자의 `[ 개발팀 바인딩 ]` 주석에 기록했다. |
| MO 새로운 특징과 더 보기                                                 | 새로운 특징을 MO에서 표시하고 본문 접기/펼치기와 aria-expanded/controls를 유지한다.                                                                                                                                 |
| 추천 영역 PC 1776px·제목 36px, MO 제목 22px                              | HomeCarouselSection의 선택적 className을 MainSection에 전달해 상세 추천 영역의 폭·타이포만 지정한다. 원본에 없는 두 번째 추천 목록을 제거하고 추천 상품 자체는 현재 props에서 읽는다.                               |
| 고정 CTA 48px 버튼, 여백 16px/16px/32px                                  | 기존 두 버튼을 tall로 지정한다. 콜백·옵션 누적·수량·장바구니·주문 소유권은 변경하지 않았다.                                                                                                                         |

현재 shoe-1의 선택 색상 갤러리 4장과 컬러 선택지 4개는 기존 상품 데이터다. 원본의 8장/10색을 임의 복제하지 않았으며, 운영 데이터와 원본의 차이로 남긴다. 공통 홍보 배너·헤더의 기존 노출도 유지한다. 할인은 상품의 기존 originalPrice/price 표시를 재사용하며 실제 가격 확정·재고·주문 API는 구현하거나 검증하지 않았다. 이미 존재하는 상세 상태 URL과 화면 인덱스 연결은 변경하지 않았다.

## 검증과 마지막 인계 점검

- 두 화면의 PC 1920px·MO 375/768px를 실행해 위치·계산 스타일·이미지를 확인했다. classic scrollbar 15px 때문에 375px viewport의 본문 clientWidth는 360px이며 원본 375px와 구분한다.
- 두 화면의 1024/1025·1199/1200px 경계를 측정했다. 1024px까지 MO이며 1025~1199px는 1200px 캔버스다. 1200px 이상에서 세로 scrollbar로 인한 추가 가로 넘침은 없었다.
- 메인 배너 선택, 베스트셀러 탭 선택, 카테고리 다음 이동을 확인했다. 카테고리 레일의 실제 transform 이동을 측정했다.
- 상세 더 보기/닫기, 컬러 변경 후 현재 표시, Black / Outer Orbit의 Wide 선택, 확대 뷰어 로딩 및 닫기 후 이미지 버튼 포커스 복귀를 확인했다. 고정 CTA 버튼 높이는 48px였다. 다른 할인 목 상품 shoe-3에서 정상가 290,000원·20%·232,000원 표시를 확인했다.
- 새 Storybook 빌드에서 고정 WEB을 768px, 고정 MO를 1920px로 열어 메인/상세의 플랫폼 표현을 확인했다. Cart 컬러 스토리의 White 선택 표시와 기존 MainSection compact의 32px 간격도 확인했다. 모든 play를 실행했다고 기록하지 않는다.
- 배너·PC 상세 상품명의 실제 Pretendard Black 글리프를 확인했다. 메인 섹션 영문 폰트의 내부 이름은 점(.)이었으나 loaded hoka 900 face와 생성된 woff2의 SHA-256을 제공된 TheFutureHOKA-Black.woff2와 대조했다. layout의 next/font/local과 Storybook 별도 등록은 변경하지 않았다.
- 변경 소스의 ESLint/Prettier, 전체 타입 검사, Panda 생성, Next.js 프로덕션 빌드와 Storybook 빌드를 통과했다. 전체 lint는 다른 작업의 FindAccountContent·signup/complete 미사용 import와 MyPageReviewsContent·SupportQuickLinks·RunningSessionPage import 정렬 등 5건으로 실패했다.
- hoka-markup-handoff의 페이지 소유권·제목/본문·래퍼·Panda·반응형·Next.js·데이터 경계를 마지막으로 검토했다. route-private 부품과 기존 공통 소유자, 기본 옵션·선언 타입 계약, 상태 수명·의미 있는 태그·포커스·내부 Link/Image/font를 유지했다. 모듈 SCSS·중계 컴포넌트·새 Provider·서비스 요청·상태 URL을 추가하지 않았다.

전체 카드/후속 상세 프레임의 모든 시각 차이, 실제 API 성공/실패/재시도, 결제와 장바구니 서비스 연동은 검증 범위에 포함하지 않았다. 시안과 픽셀 단위로 완전히 같다고 주장하지 않는다.

[^main-design]: Main 섹션 및 PC/MO 하위 프레임.

[^product-design]: PDP 섹션 및 기본/할인/고정 CTA/후속 PC 프레임.

## 공통 전체 대조 후 조합 (2026-11-02)

HomeContent의 HeroCopy는 ContentHeader(descriptionAs=div), 히어로 이동 버튼은 Button.unstyled를 직접 사용한다. 상품 상세의 지원 제목은 ContentHeader, 상품 정보는 DescriptionList의 항목별 descriptionProps, 구분선은 Divider.vertical, 문의 빈 결과는 EmptyState, 더보기는 Button.loadMore.appearance=inline을 사용한다. 기존 히어로 시간/포인터 상태·상품 선택/툴팁·h1/h4·dd 혼합 타이포·본문/버튼의 inline 흐름을 유지한다. [범위와 실제 화면 대조](common-reuse-audit.md)를 참고한다.

전수 대조 검토: codex/gpt-6, 2026-11-02T05:57:28Z. 미커밋 변경 출처는 [조사표](common-reuse-audit.md)의 working_tree_sources에 기록한다.
