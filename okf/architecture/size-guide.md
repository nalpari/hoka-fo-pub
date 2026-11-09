---
type: Architecture
title: '사이즈 가이드'
description: '품목별 측정 안내, 선택 상태와 미확정 데이터의 표시 범위를 설명한다.'
tags: [support, size-guide, storybook]
status: draft
updated: '2026-11-09T23:50:42Z'
generated:
  by: codex/gpt-6
  at: '2026-11-02T04:46:17Z'
source_revision: b3f7243062b500eb4909961667ad142cc368ff91
working_tree_sources:
  - src/app/products/[id]/_components/ProductDetailContent.tsx
  - src/components/common/atoms/DataTable.tsx
  - src/app/support/size-guide/page.tsx
  - src/app/support/size-guide/size-guide.data.ts
  - src/components/common/molecules/SupportTabs.tsx
  - src/stories/features/support/SupportPages.scenarios.tsx
  - src/app/support/size-guide/_components/SizeGuidePanel.tsx
  - src/components/common/atoms/DataTable/DataTable.tsx
  - src/components/common/atoms/SegmentedControl/SegmentedControl.tsx
  - src/components/common/atoms/Typography/Typography.tsx
  - src/styles/global.scss
  - src/components/support/support.navigation.ts
  - src/stories/components/common/atoms/DataTable/DataTable.stories.tsx
  - src/stories/components/common/atoms/SegmentedControl/SegmentedControl.stories.tsx
  - src/stories/components/common/atoms/Typography/Typography.ChoiceLabels.stories.tsx
  - src/components/size-guide/SizeGuidePage.tsx
  - src/components/size-guide/size-guide.data.ts
  - src/components/common/molecules/SupportTabs/SupportTabs.tsx
  - src/components/product/ProductDetailPage.tsx
  - src/app/products/[id]/page.tsx
  - src/components/common/organisms/Layout/SiteFooter/footerData.ts
  - src/stories/features/support/SupportPages.scenarios.tsx
  - public/images/size-guide/
sources:
  - id: size-guide-desktop-selector
    resource: https://www.figma.com/design/qyXJp4bnoeYSQxQULV8Wql/-HOKA-Design
    title: 'PC 성별 선택·차트·단위 탭'
  - id: size-guide-mobile-selector
    resource: https://www.figma.com/design/qyXJp4bnoeYSQxQULV8Wql/-HOKA-Design
    title: '모바일 성별 선택·차트·단위 탭'
  - id: size-guide-desktop-measurement
    resource: https://www.figma.com/design/qyXJp4bnoeYSQxQULV8Wql/-HOKA-Design
    title: 'PC 측정 안내 카드의 제목·STEP·본문'
  - id: size-guide-design-20261102
    resource: https://www.figma.com/design/qyXJp4bnoeYSQxQULV8Wql/-HOKA-Design
    title: '사이즈 가이드 디자인: 신발과 추가 4개 품목 섹션'
  - id: size-guide-spec-20261102
    resource: https://www.figma.com/design/4cJ1LkWUgme3lklyQ9U8qr/-
    title: '고객센터 PC 화면설계서의 사이즈 가이드 2913 노드'
  - id: size-guide-route
    resource: https://github.com/nalpari/hoka-fo-pub/blob/b3f7243062b500eb4909961667ad142cc368ff91/src/app/support/size-guide/page.tsx
    title: '기존 사이즈 가이드 라우트'
---

# 사이즈 가이드

## 상품 상세 사이즈 가이드 링크 복원 (2026-11-10)

상품 상세의 신발·의류 사이즈 가이드 팝업 구현을 제거하고 `/support/size-guide` 링크로 되돌렸다. 상품 상세의 자 아이콘은 16px이며 화면 연결 그래프에서 공유 치수 데이터와 SegmentedControl 의존성을 제거했다. 아래 2026-11-09 팝업 기록은 당시 구현 이력이며 현재 동작은 이 절이 우선한다. 출처: 작업 트리의 `src/app/products/[id]/_components/ProductDetailContent.tsx`, `src/app/screen-index/sourceGraph.generated.json`.

## 고객센터 품목 통합 (2026-11-09)

`/support/size-guide`는 신발·의류·용품 탭을 제공한다. 의류는 가슴·허리·엉덩이 치수가 포함된 기존 상의 표를 사용하고, 여성 KR 사이즈를 cm와 inch에서 모두 `XS`로 표시한다. 하의와 러닝 베스트의 탭·패널 데이터와 관련 이미지를 제거했다.

용품은 기존 양말의 공용 성별 선택과 S/M/L/XL 차트를 표시하며, 표 바로 위 제목은 ‘양말’이다. `GuideCategory.measurement`가 없는 품목은 측정 이미지와 절차를 렌더링하지 않는다. `chartTitle`은 탭 이름과 다른 품목명을 표 제목에 표시할 때 사용한다. 표는 기존의 정적 표시 데이터이며 운영 승인·갱신은 연동 담당자가 맡는다.

출처는 2026-11-09 사용자 요청과 `src/app/support/size-guide/` 및 `public/images/size-guide/`의 작업 트리 변경이다. 아래의 이전 구현과 검증 기록은 각 작업 시점의 상태를 설명한다.

Codex가 PC 1440px와 모바일 390px에서 탭 전환, 기본 신발 표, 여성 의류 이미지와 cm·inch의 `XS`, 용품의 공용 선택과 양말 제목·표 및 측정 안내 미표시를 확인했다. 기존 커밋과 데이터 대조 결과 신발·양말 표 값은 동일하며 의류 표는 여성 KR 사이즈 문구만 변경됐다. 타입 검사와 수정 경로 ESLint·Prettier 검사를 통과했다.

## 상품 상세 신발 사이즈 가이드 팝업 (2026-11-09)

의류 미리보기 `/products/pdp-preview/apparel`에도 공통 팝업을 연결했다. 상품 성별의 의류 치수표를 고객센터와 공유하고 US·KR 사이즈, 가슴·허리·엉덩이 값을 표시한다. PC 모달과 모바일 바텀시트는 열 때 cm로 시작한다. 출처는 `ProductDetailContent.tsx`의 `ProductSizeGuideChart`와 `size-guide.data.ts`다.

의류 표는 팝업 본문 너비를 채운다. 신발 표는 고정 열 너비와 표 내부 가로 스크롤을 사용한다.

팝업을 여는 버튼 안에서 자 아이콘을 문구 왼쪽에 배치한다.

신발 상품 상세는 `Product.gender`에 해당하는 남성·여성·공용 표를 열고 고객센터와 동일한 `shoeGuide.charts` 표시 데이터를 사용한다. 한국 사이즈·US 사이즈·발길이를 행으로 배치하고, 표가 넓으면 행 제목 열을 고정한 채 표 안에서 가로로 스크롤한다. 열 때마다 cm로 시작하며 inch는 발길이만 바꾼다. 운영 치수표 승인·갱신은 연결 소유자가 맡는다. 기존 상품 상세 링크 설명은 이 절 이전의 동작을 기록한다. [팝업 UI](ui.md#상품-상세-사이즈-가이드-모달-2026-11-09).

출처는 사용자 첨부 PC·모바일 시안과 작업 트리의 `ProductDetailContent.tsx`, `size-guide.data.ts`다. 기준 HEAD는 `781c2adb1fb5bb30c69f78301311728f9a3a8fbc`이며 codex/gpt-6가 2026-11-09에 기록했다.

브라우저에서 자동 PC 1440px와 모바일 390px의 남성·여성·공용 표, 단위 전환, Escape·닫기 버튼, 재열기 초기화, 포커스 복귀, 첫 열 고정과 표 내부 스크롤을 확인했다. 팝업을 연 상태에서 1024/1025px 및 1199/1200px로 전환해 단위가 유지되는 것을 확인했고 모바일 배경 클릭과 고객센터 기본 표도 확인했다. 최종 단위 선택 UI는 PC에서 inch 값, 12px 표 글자, 선택한 색상과 포커스 복귀를 재확인했다. 명시적 플랫폼을 사용하는 상품 상세 미리보기 검증은 수행하지 않았다.

## 재사용 개선과 사이드 메뉴 순서 (2026-10-21)

품목 제목은 ContentSection의 기본 header(h2/heading7), 차트 제목은 가로형 기본 header(h3/body2/bold)를 사용한다. CM/INCH 선택은 headerProps.action으로 전달하며 본문 간격 20px·차트 간격 4px·제목/액션 최소 간격 12px를 보존한다. 측정 안내는 Grid로 옮겨 PC 280px + 가변 열·모바일 1열과 24px gap을 유지한다. 안내의 일반 ol/li와 표의 thead/tr/th/td는 기존 시맨틱 HTML로 유지한다.

SizeGuideChoiceGroup은 성별·발볼의 라벨과 선택 그룹, compact 단위 선택의 표시를 담당하는 기능 내부 구성이다. label/options/value/onValueChange/compact를 받고 상태는 SizeGuidePanel에 남긴다. 새 공용 선택 컴포넌트를 만들지 않고 SegmentedControl.itemRender로 Typography button을 합성한다. Base UI Toggle/Toggle Group이 선택·키보드·disabled 동작을 계속 소유한다.

Typography에 choiceLabel(PC/MO 14px)·unitLabel(PC/MO 12px)을 추가했다. `--type-choice-label-*`·`--type-unit-label-*` 토큰은 각각 데스크톱/모바일 크기, 400 굵기, normal 행간·자간을 소유한다. 글꼴은 기존 --font-family-base를 사용한다. 이 두 변형은 tone을 생략하면 색 선언을 추가하지 않아 같은 button에 합성하는 기능 내부 cva가 선택 색상을 소유한다. 기존 Typography 변형의 기본 inherit 색상은 유지한다. 버튼 크기·테두리·선택 표현도 기능 내부 cva로 유지한다.

DataTable.variant="spaced"는 기본 raw 스타일과 간격형 raw 스타일을 css 호출 한 번으로 병합한다. 기존 className API와 default 변형을 보존한다. 테이블 레이아웃·셀 간격·테두리·헤더/행 색상은 공통 표의 표시 계약으로 유지하며 외부에서 공급되는 셀 구조를 대상으로 하므로 공용 descendant selector를 유지한다. 사이즈 가이드의 별도 chart 클래스는 제거했고, 충돌하던 PC 셀 패딩은 8px에서 의도한 12px로 수정했다. 모바일은 8px, 행 높이는 36px를 유지한다.

고객센터의 공통 supportNavigation에서 사이즈 가이드를 약관 다음인 마지막 항목으로 이동했다. 링크 경로·선택 표시는 유지한다.

적용 전후 8개 품목 × PC 1600px/모바일 User-Agent 375px의 실제 계산값을 비교했다. 제목·이미지·선택 버튼·표의 위치와 크기는 같고 버튼의 글꼴·크기·굵기·행간·자간도 유지됐다. 표 패딩 변경은 PC의 의도한 수정이며 모바일에는 적용하지 않았다. 새 DataTable 변형, SegmentedControl 사용자 정의 렌더링과 Typography PC/MO 스토리를 추가했다.

## 화면 준비 (2026-10-21)

재사용 개선의 최종 검증: Panda 생성, 타입 검사, 변경 파일 ESLint·Prettier, Next/Storybook 빌드와 Node 테스트 53개가 통과했다. PC/MO 사이즈 가이드 120개 선택 조합(선택 글자 색 포함), 공통 표·선택·Typography의 브라우저 스토리 10개와 16개 품목/플랫폼의 적용 전후 위치·크기·타이포그래피 비교도 통과했다. 기본 표의 46px 높이·8px 패딩·중앙 정렬 유지, spaced의 36px 높이·12px PC 패딩과 선택 컨트롤 클릭·키보드·disabled를 확인했다. 메뉴 마지막 두 항목은 약관·사이즈 가이드다.

`/support/size-guide`는 기존 CustomerCenterLayout을 유지하고 신발·상의·하의·러닝 베스트·러닝 벨트·모자·양말·장갑의 8개 패널을 제공한다. 이전 빈 본문 기록은 이 구현으로 대체한다. 푸터 링크와 상품 상세 사이즈 가이드 링크도 해당 경로로 이동한다. 상품 상세는 ButtonLink를 사용해 현재 창에서 이동하며 팝업용 콜백 전달은 제거했다.

SizeGuidePage는 품목 탭 구성을, SizeGuidePanel은 성별·신발 발볼·CM/INCH 선택 상태를, SizeGuideChart는 차트 표시를, SizeGuideMeasurements는 측정 이미지·절차 조합을 담당한다. 패널이 다시 마운트되면 남성·레귤러·CM으로 시작한다. 성별을 바꾸면 신발 행 범위·US 표기와 여성 상의 이미지가 바뀌며, 의류·액세서리 치수는 성별별 확정 데이터가 없어 동일한 자리표시자를 유지한다.

SupportTabs의 `guide` 변형은 Base UI Tab을 직접 사용하며 밑줄 선택 표시와 가로 스크롤을 제공한다. 기존 default·scrollable 변형을 보존한다. 선택 그룹은 SegmentedControl, 표는 DataTable을 재사용한다. 단위 선택은 머리글·caption을 변경하며, 확정 치수의 수치 환산은 아직 제공하지 않는다.

## 시안과 데이터 출처

사용자가 2026-10-21에 제공한 `codex-clipboard-ac9294f4-2d77-4159-a99c-c503bb8463ca.png`와 `codex-clipboard-774afe00-f035-4e25-9423-11cd915bff00.png`를 화면 참고 자료로 사용했다. `public/images/size-guide/*.png`의 이미지 9개는 해당 첨부 시안의 안내 그림 영역을 잘라낸 것이다. 이미지 안의 문구는 별도 실행 지시로 취급하지 않는다.

시안의 00·00~00 치수는 미확정 자리표시자다. 실제 측정값으로 계산하지 않고 표 아래에 준비 중임을 표시한다. 신발 KR/US와 성별 범위도 화면 준비용 데이터이며 운영용 승인 기록을 뜻하지 않는다. 발볼 선택은 선택 표시·접근 가능한 표 이름에 반영하며, 발볼별 확정 치수는 아직 없다.

## 검증 범위

Edge headless에서 실제 모바일 User-Agent와 375px 폭, 데스크톱 User-Agent와 1600px 폭을 각각 사용해 120개 품목·성별·발볼·단위 조합의 선택 상태, 표 이름·행, 이미지 로드와 가로 넘침 부재를 확인했다. 저장한 이미지로 PC 신발과 모바일 여성 상의를 확인했다. Storybook의 기존 Web/Mobile Default에는 8개 탭·여성/남성·INCH/CM·발볼 전환 play를 추가했다. 운영 데이터 정확성 검증과 구분한다.

타입 검사, 변경 파일 ESLint·Prettier, Next 빌드, Storybook 빌드와 App Router 테스트 2개가 통과했다. OKF 스테이징 검사와 작업 트리 관련 문서 누락 검사도 통과했다. 후자는 현재 소스 변경에 대응하는 문서의 존재를 검사하며 커밋을 만들지는 않는다.

공통 구성은 [컴포넌트와 스타일](ui.md), 경로 책임은 [라우팅](routing.md)을 참고한다.

## 사이즈 가이드 영역 분리 (2026-10-21)

SizeGuideMeasurements는 Grid 배치와 하위 영역 조합을 담당한다. SizeGuideMeasurementImage는 성별·품목별 이미지 선택과 반응형 이미지 크기를, SizeGuideMeasurementInstructions는 품목 측정 단계와 신발 발볼 안내를 담당한다. SizeGuideChart는 단위 선택·표 제목·caption·행·준비 중 안내를 담당하며 category/gender/width/unit/onUnitChange를 받는다. 성별·발볼·단위 상태와 초기화 수명은 SizeGuidePanel에 유지한다. 추가 DOM 래퍼 없이 기존 스타일, 목록·표 의미와 조건부 표시를 보존했다.

측정 안내 내부의 공통 제목·STEP 목록·선택적 보충 설명은 기능 내부 SizeGuideMeasurementMethod(title/steps/description)로 분리했다. SizeGuideMeasurementInstructions는 품목별 안내와 신발 전용 발볼 안내를 같은 컴포넌트로 조합한다. 기존 간격·문구·ol/li 구조와 신발 조건부 표시를 유지한다.

## Figma 디자인·설계서 반영 (2026-11-02)

이 절이 위의 8품목·미확정 00·발볼 선택·DataTable.spaced 기록을 대체한다. 화면 디자인의(신발),(상의),(하의),(러닝 베스트),(양말)을 읽었다. 추가 화면설계서의 시안 품목별 프레임으로 복제된 상의 문구·표를 구분했다. 디자인의 하의 안내에 남은 가슴 측정과 베스트·양말의 상의 내용은 설계서의 실제 품목 안내로 보완한다.

탭은 신발·상의·하의·러닝 베스트·양말 5개다. 기존 경로·IA 260·상품 상세·푸터 진입을 유지한다. 베스트와 양말은 공용만 제공하며 양말은 S/M/L/XL에 신발 사이즈 210–230/230–250/250–270/270–290을 표시하고 단위 선택은 제공하지 않는다. 설계서에 없는 발볼 선택은 제거했다. 상의·하의·베스트의 US/KR 및 cm/inch 값은 준비된 표로 제공한다. 신발 여성은 220~260, 공용은 220~300으로 설계서 범위를 반영했다. 신발 inch는 cm/2.54를 소수 두 자리로 미리 준비한 값이며 남성 디자인 표와 대조했다. 여성·공용 inch는 원본 프레임에서 직접 확인한 값과 구분한다.

| 디자인값                                           | 구현                                                 |
| -------------------------------------------------- | ---------------------------------------------------- |
| 품목 탭 40px / 좌우 20px                           | SupportTabs.guide에만 적용, 일반 탭 유지             |
| 모바일 이미지 343×274 / PC 높이 422px              | 375px 화면의 16px 양쪽 여백 / PC 844×422             |
| 안내 카드 #F7F7F9, 모바일 24px 12px / PC 32px 20px | 패널 내부 측정 방법의 배경·패딩                      |
| 단계 간격 12px, 위아래 16px, #E9EAEB 구분선        | ol/li의 STEP 제목·설명과 경계                        |
| 성별 버튼 높이 37px, radius 30px                   | 기존 SegmentedControl에 로컬 표현 적용               |
| 표 높이 48px, #E9EAEB 헤더, #F7F7F9 짝수 행        | 라우트 전용 시맨틱 table, 공통 DataTable 기본값 유지 |

신발 그림은 디자인에서, 상의·하의·베스트·양말 그림은 추가 설계서의 시안에서 가져왔다. 여성 상의는 기존 tops-women 자산을 유지한다. 이미지 원본의 해상도 한계와 디자인의 수급 후 적용 표시는 최종 운영 이미지 확정과 구분한다.

표 모델은 GuideCategory.charts[gender][unit]이며 route가 정적 표시 데이터와 품목 구성을 소유한다. Panel은 성별·단위 로컬 UI만 소유한다. API 요청·저장·재고 판정·가격 계산은 없고, 승인된 운영 데이터 교체와 갱신은 연동 담당 책임이다. 네트워크 pending/오류/재시도 계약을 새로 구현하지 않았다.

검증: 변경 파일 ESLint/Prettier, 타입 검사, Panda 생성, Next build(119개 정적 페이지)와 Storybook build가 통과했다. 실제 브라우저 DOM 이벤트로 375/1920px 각 21개 선택 조합(총 42개)의 caption·선택·첫 행·행 수·48px 셀 높이를 확인했다. 최종 신발 상태의 document clientWidth/scrollWidth는 375/375, 1920/1920, 표 너비는 343/844px였다. 제목/안내 제목의 실제 글리프 폰트는 Pretendard Black/SemiBold였고 숫자는 로드된 hoka 400 face와 연결된다. 이는 포인터·키보드 전체 상호작용 또는 Storybook play 전체 통과 기록이 아니다. 당시 이미지 캡처가 시간 초과/검은 화면을 반환해 스크린샷 비교는 미완료였으며 아래 재검증에서 보완했다. 전체 lint는 범위 밖 FindAccountContent의 css와 signup/complete의 Stack 미사용 import 2개로 실패했다.

## 캡처 재검증과 선택 UI 통일 (2026-11-02)

이 절이 위의 37px 성별 버튼 및 캡처 미완료 기록을 대체한다. 추가로 지정된 PC, 모바일를 읽고 실제 렌더링 화면과 대조했다. 전체 페이지 캡처에서 일부 모바일 화면의 재배치·미도색이 발생해, 최종 증빙은 실제 보이는 영역을 나누어 캡처했다. PC 5품목과 모바일 5품목의 화면을 직접 확인했다. 원본의 이미지 수급 자리표시자와 현재 설계서 자산, 홍보 배너 및 스크롤바 차이는 제품 스타일 차이와 구분한다.

신발만 별도 표현을 쓰던 분기를 제거했다. 사용자의 후속 지시에 따라 모든 품목이 성별 선택 → 차트 제목/오른쪽 단위 탭 → 표의 동일 배치를 사용한다. 성별 선택은 3개 개별 버튼이 아닌 하나의 회색 캡슐이며, 베스트·양말은 기존 공용 1개만 제공한다. 양말은 기존 신발 사이즈 범위 데이터와 단위 탭 미제공을 유지한다. 표 수치·성별별 데이터·서비스 연결 경계는 바꾸지 않았다.

| 항목           | PC                                       | 모바일                                   |
| -------------- | ---------------------------------------- | ---------------------------------------- |
| 성별·차트 제목 | Pretendard 22px/900, 1.2                 | Pretendard 20px/700, 1.2                 |
| 성별 캡슐      | #E9EAEB, radius 52px, padding 4px, gap 0 | 같은 배경/반경, padding 2px, gap 0       |
| 성별 버튼      | 높이 44px, 좌우 40px                     | 높이 40px, 비선택 폭 64px/선택 좌우 20px |
| 선택 글자      | 14px/600, 흰색                           | 동일                                     |
| 단위 탭        | 전체 폭 270px/높이 44px, 두 항목 균등    | 콘텐츠 폭 약 115px/높이 36.8px           |
| 측정 안내      | 제목 22px/900, STEP 20px/700, 본문 16px  | 제목 20px/700, STEP 16px/700, 본문 12px  |
| 본문 간격      | 측정 안내 다음 56px, 성별 다음 24px      | 측정 안내 다음 32px, 성별 다음 24px      |

PC 품목 탭은 본문 폭에 고르게 배분하고 제목 아래 여백을 40px로 맞췄다. 모바일 가로 스크롤 탭은 유지한다. 표는 신발 PC 헤더 14px·본문 14px·좌우 16px, 모바일 헤더 13px·본문 14px·좌우 16px를 반영했고, 다른 품목의 작은 표 본문은 기존 12px 모바일 크기를 유지한다.

검증: 실제 포인터 클릭으로 PC 1920px 21개·모바일 콘텐츠 폭 375px 21개, 총 42개 조합에서 선택·caption·행 수·48px 셀·가로 넘침 부재를 확인했다. 모바일은 데스크톱 브라우저의 15px 스크롤바를 구분해 창 390px/콘텐츠 375px로도 대조했으며, 창 375px에서도 각 품목을 확인했다. PC 캡슐은 4px/버튼 44px, 모바일은 2px/버튼 40px, 단위 탭은 PC 270px로 5품목에 같은 값을 확인했다. ArrowRight로 여성→공용 포커스 이동, Space로 공용 선택, 모바일에서 PC로 리사이즈 후 여성/INCH 상태 유지를 확인했다. 타입·변경 파일 ESLint/Prettier·Panda 생성은 통과했다. Next/Storybook 빌드도 통과했다. Storybook play 전체 실행이나 실제 API 연동 검증을 의미하지 않는다.

## 공통 DataTable 복원 (2026-11-02)

위 기록의 라우트 전용 table을 공통 DataTable의 variant=striped로 교체했다. 신발은 density=regular, 나머지 네 품목은 compact로 지정한다. 스타일은 공통 atom이 소유하며, category.charts[gender][unit]·caption·열/행 scope·선택 UI는 기존 SizeGuideChart/Panel이 소유한다. 기존 PC/MO 셀 높이·테두리·줄무늬·폰트·스크롤 DOM을 유지하며 공통 default/spaced는 변경하지 않는다. [수치와 실제 검증](ui.md#빈-상태더보기표-공통-컴포넌트-복원-2026-11-02)을 참고한다.

작업 트리 출처: `src/components/common/atoms/DataTable.tsx`, `src/app/support/size-guide/_components/SizeGuidePanel.tsx`, `src/stories/components/common/atoms/DataTable/DataTable.stories.tsx`. 검토: codex/gpt-6, 2026-11-02T04:46:17Z.

## 측정 제목 공통 재사용 (2026-11-02)

SizeGuidePanel의 측정 방법 제목은 ContentHeader로 조합하며 기존 DataTable.striped·탭·성별·단위·측정 데이터와 PC/MO 타이포/간격은 유지한다. [전체 대조의 출처·화면 비교](common-reuse-audit.md)를 참고한다.

전수 대조 검토: codex/gpt-6, 2026-11-02T05:57:28Z. 미커밋 변경 출처는 [조사표](common-reuse-audit.md)의 working_tree_sources에 기록한다.
