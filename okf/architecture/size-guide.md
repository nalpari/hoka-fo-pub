---
type: Architecture
title: '사이즈 가이드'
description: '품목별 측정 안내, 선택 상태와 미확정 데이터의 표시 범위를 설명한다.'
tags: [support, size-guide, storybook]
status: draft
generated:
  by: codex/gpt-6
  at: '2026-10-21T15:55:08+09:00'
source_revision: b3f7243062b500eb4909961667ad142cc368ff91
working_tree_sources:
  - src/components/features/size-guide/SizeGuideMeasurementMethod.tsx
  - src/components/features/size-guide/SizeGuideMeasurementImage.tsx
  - src/components/features/size-guide/SizeGuideMeasurementInstructions.tsx
  - src/components/features/size-guide/SizeGuideChart.tsx
  - src/components/features/size-guide/SizeGuideChoiceGroup.tsx
  - src/components/common/atoms/DataTable/DataTable.tsx
  - src/components/common/atoms/SegmentedControl/SegmentedControl.tsx
  - src/components/common/atoms/Typography/Typography.tsx
  - src/styles/global.scss
  - src/components/features/support/support.navigation.ts
  - src/stories/components/common/atoms/DataTable/DataTable.stories.tsx
  - src/stories/components/common/atoms/SegmentedControl/SegmentedControl.stories.tsx
  - src/stories/components/common/atoms/Typography/Typography.ChoiceLabels.stories.tsx
  - src/components/features/size-guide/SizeGuidePage.tsx
  - src/components/features/size-guide/SizeGuidePanel.tsx
  - src/components/features/size-guide/SizeGuideMeasurements.tsx
  - src/components/features/size-guide/size-guide.data.ts
  - src/components/common/molecules/SupportTabs/SupportTabs.tsx
  - src/components/features/product/ProductDetailPage.tsx
  - src/components/features/product/ProductDetailPanel.tsx
  - src/components/features/product/ProductDetailContent.tsx
  - src/components/features/product/ProductVariantSelectors.tsx
  - src/components/features/product/ProductSizeSelector.tsx
  - src/components/common/organisms/Layout/SiteFooter/footerData.ts
  - src/stories/features/support/SupportPages.scenarios.tsx
  - public/images/size-guide/
sources:
  - id: size-guide-route
    resource: https://github.com/nalpari/hoka-fo-pub/blob/b3f7243062b500eb4909961667ad142cc368ff91/src/app/support/size-guide/page.tsx
    title: '기존 사이즈 가이드 라우트'
---

# 사이즈 가이드

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
