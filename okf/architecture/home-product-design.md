---
type: Reference
title: '메인과 상품 상세 Figma 적용'
description: '메인과 상품 상세의 PC·모바일 디자인 수치, 기존 데이터 경계와 실제 검증을 기록한다.'
tags: [figma, home, product, responsive, panda-css]
status: draft
generated:
  by: codex/gpt-6
  at: '2026-11-02T05:18:16Z'
source_revision: cc691836be2cb041fd7a20787336c765463ba97e
working_tree_sources:
  - src/app/_components/HomeContent.tsx
  - src/app/homeContent.ts
  - src/app/products/[id]/_components/ProductDetailContent.tsx
  - src/components/common/layouts/MainSection.tsx
  - src/components/common/molecules/HomeCarouselSection.tsx
  - src/components/common/molecules/ProductOptionSelectors/ProductColorSelector.tsx
  - src/types/component-contracts/components-common-layouts-MainSection.d.ts
  - src/types/component-contracts/components-common-molecules-HomeCarouselSection-HomeCarouselSection.d.ts
sources:
  - id: main-design
    resource: https://www.figma.com/design/qyXJp4bnoeYSQxQULV8Wql/-HOKA-Design?node-id=1181-41552
    title: 'Main 1181:41552'
  - id: product-design
    resource: https://www.figma.com/design/qyXJp4bnoeYSQxQULV8Wql/-HOKA-Design?node-id=1294-32410
    title: 'PDP 1294:32410'
---

# 메인과 상품 상세 Figma 적용

## 메인

대상은 `/`이다. Main 섹션의 PC 1181:39776과 Mobile 1181:40175, 필요한 배너·카테고리·Explore·Find my HOKA 하위 노드를 읽고 내보낸 화면과 대조했다. 화면 파일과 별도 디자인 시스템 파일의 읽기 접근을 각각 확인했다. 큰 노드 일부는 응답 시간 초과 후 필요한 하위 구조를 읽었으며, 스크린샷만으로 구조를 확인했다고 기록하지 않는다.[^main-design]

| 디자인                                             | 구현                                                                                                                                                               |
| -------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| PC 배너 1920×720                                   | Hero 높이를 `min(37.5vw, 720px)`로 변경하고 기존 PC 최소 높이를 유지한다. MO는 기존 375:500 비율을 유지한다.                                                       |
| 배너 제목 Pretendard 84px/900/1.2, MO 42px/900/1.2 | 기존 Typography와 layout 폰트를 재사용한다. 설명은 PC 24px·MO 16px, 문구 사이 24px, 버튼 48px를 적용한다. MO 문구 하단은 50px다.                                   |
| 섹션 제목 PC 50px·MO 28px                          | 각 메인 MainSection/HomeCarouselSection의 `titleVariant="heading4"`로 지정한다. 기존 공통 기본 제목은 변경하지 않는다.                                             |
| 섹션 사이 PC 96px·MO 72px, 마지막 PC 112px         | 기존 HomeLayout의 부모 gap과 하단 padding을 조정한다.                                                                                                              |
| 카테고리 카드 PC 371:494·MO 312:416, 간격 16px     | PC 카드 간격 16px와 제목 28px·MO 22px, 이미지와 제목 사이 PC 20px·MO 16px를 적용한다. MO에서 카드 312px와 시작점 16px를 측정했다.                                  |
| 베스트셀러 제목→탭 24px, PC 탭→목록 40px·MO 16px   | MainSection에 선택적 `spacing="tight"` 24px를 추가한다. 기존 default 40px/24px와 compact 32px/24px는 유지한다. MO 상품 카드의 375px 기준 너비는 150px·간격 10px다. |
| Explore 이미지 PC 500:667·MO 375:500               | 기존 표시 데이터의 비율과 메인 전용 className을 사용한다. 카드 제목 28px·내부 간격 및 MO overlay 하단 50px를 적용한다.                                             |
| Find my HOKA 제목 28px·상단 간격 8px               | 기존 imagePill 변형에 메인 전용 className을 전달하고 음수 제목 겹침을 해제한다. PC 본문 간격 24px·MO 20px, 하단 40px/32px를 적용한다.                              |

HomeContentContext의 현재 상품·탭 조회·콘텐츠 슬롯, 기존 캐러셀 이동·배너 자동 재생/감소된 모션·키보드/포커스 소유권은 유지한다. 운영 결과에 시안용 반복을 추가하지 않았다. 기본 목 상품·순서·활성 탭은 기존 값이므로 원본 상품 조합과 다르다. 배너 사진과 카테고리/에디토리얼 자산을 임의 교체하지 않았다.

## 상품 상세

대상은 `/products/shoe-1`이다. PDP 섹션의 PC 1294:31466, MO 1325:33038, 할인 1444:35530, 고정 CTA 1365:51728과 후속 PC 1687:10261·펼침/접힘 프레임의 필요한 구조를 확인했다. 1750:25031에는 이미지·Tab & Spec·Why you’ll love it·Review·상품문의·Info Accordion이 있어 기존 상세 기술/리뷰/문의 영역을 유지했다.[^product-design]

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

[^main-design]: Main 섹션 1181:41552 및 PC/MO 하위 프레임.

[^product-design]: PDP 섹션 1294:32410 및 기본/할인/고정 CTA/후속 PC 프레임.
