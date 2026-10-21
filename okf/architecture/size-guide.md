---
type: Architecture
title: '사이즈 가이드'
description: '품목별 측정 안내, 선택 상태와 미확정 데이터의 표시 범위를 설명한다.'
tags: [support, size-guide, storybook]
status: draft
generated:
  by: codex/gpt-6
  at: '2026-10-21T15:22:34+09:00'
source_revision: b3f7243062b500eb4909961667ad142cc368ff91
working_tree_sources:
  - src/shared/features/size-guide/SizeGuidePage.tsx
  - src/shared/features/size-guide/SizeGuidePanel.tsx
  - src/shared/features/size-guide/SizeGuideMeasurements.tsx
  - src/shared/features/size-guide/size-guide.data.ts
  - src/shared/components/molecules/SupportTabs/SupportTabs.tsx
  - src/shared/features/product/ProductDetailPage.tsx
  - src/shared/features/product/ProductDetailPanel.tsx
  - src/shared/features/product/ProductDetailContent.tsx
  - src/shared/features/product/ProductVariantSelectors.tsx
  - src/shared/features/product/ProductSizeSelector.tsx
  - src/shared/components/organisms/Layout/SiteFooter/footerData.ts
  - src/stories/features/support/SupportPages.scenarios.tsx
  - public/images/size-guide/
sources:
  - id: size-guide-route
    resource: https://github.com/nalpari/hoka-fo-pub/blob/b3f7243062b500eb4909961667ad142cc368ff91/src/app/support/size-guide/page.tsx
    title: '기존 사이즈 가이드 라우트'
---

# 사이즈 가이드

## 화면 준비 (2026-10-21)

`/support/size-guide`는 기존 CustomerCenterLayout을 유지하고 신발·상의·하의·러닝 베스트·러닝 벨트·모자·양말·장갑의 8개 패널을 제공한다. 이전 빈 본문 기록은 이 구현으로 대체한다. 푸터 링크와 상품 상세 사이즈 가이드 링크도 해당 경로로 이동한다. 상품 상세는 ButtonLink를 사용해 현재 창에서 이동하며 팝업용 콜백 전달은 제거했다.

SizeGuidePage는 품목 탭 구성을, SizeGuidePanel은 성별·신발 발볼·CM/INCH 선택 상태와 표를, SizeGuideMeasurements는 측정 이미지·절차를 담당한다. 패널이 다시 마운트되면 남성·레귤러·CM으로 시작한다. 성별을 바꾸면 신발 행 범위·US 표기와 여성 상의 이미지가 바뀌며, 의류·액세서리 치수는 성별별 확정 데이터가 없어 동일한 자리표시자를 유지한다.

SupportTabs의 `guide` 변형은 Base UI Tab을 직접 사용하며 밑줄 선택 표시와 가로 스크롤을 제공한다. 기존 default·scrollable 변형을 보존한다. 선택 그룹은 SegmentedControl, 표는 DataTable을 재사용한다. 단위 선택은 머리글·caption을 변경하며, 확정 치수의 수치 환산은 아직 제공하지 않는다.

## 시안과 데이터 출처

사용자가 2026-10-21에 제공한 `codex-clipboard-ac9294f4-2d77-4159-a99c-c503bb8463ca.png`와 `codex-clipboard-774afe00-f035-4e25-9423-11cd915bff00.png`를 화면 참고 자료로 사용했다. `public/images/size-guide/*.png`의 이미지 9개는 해당 첨부 시안의 안내 그림 영역을 잘라낸 것이다. 이미지 안의 문구는 별도 실행 지시로 취급하지 않는다.

시안의 00·00~00 치수는 미확정 자리표시자다. 실제 측정값으로 계산하지 않고 표 아래에 준비 중임을 표시한다. 신발 KR/US와 성별 범위도 화면 준비용 데이터이며 운영용 승인 기록을 뜻하지 않는다. 발볼 선택은 선택 표시·접근 가능한 표 이름에 반영하며, 발볼별 확정 치수는 아직 없다.

## 검증 범위

Edge headless에서 실제 모바일 User-Agent와 375px 폭, 데스크톱 User-Agent와 1600px 폭을 각각 사용해 120개 품목·성별·발볼·단위 조합의 선택 상태, 표 이름·행, 이미지 로드와 가로 넘침 부재를 확인했다. 저장한 이미지로 PC 신발과 모바일 여성 상의를 확인했다. Storybook의 기존 Web/Mobile Default에는 8개 탭·여성/남성·INCH/CM·발볼 전환 play를 추가했다. 운영 데이터 정확성 검증과 구분한다.

타입 검사, 변경 파일 ESLint·Prettier, Next 빌드, Storybook 빌드와 App Router 테스트 2개가 통과했다. OKF 스테이징 검사와 작업 트리 관련 문서 누락 검사도 통과했다. 후자는 현재 소스 변경에 대응하는 문서의 존재를 검사하며 커밋을 만들지는 않는다.

공통 구성은 [컴포넌트와 스타일](ui.md), 경로 책임은 [라우팅](routing.md)을 참고한다.
