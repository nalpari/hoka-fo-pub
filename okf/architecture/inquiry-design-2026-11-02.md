---
type: Reference
title: '1:1 문의 시안과 반응형 상태 연결'
description: '문의 목록·등록·팝업·주문 조회의 변경 수치와 상태별 직접 URL을 설명한다.'
tags: [support, inquiry, figma, responsive, preview]
status: draft
generated:
  by: codex/gpt-6
  at: '2026-11-02T08:15:31Z'
source_revision: 506365ca81d802d077674897101c0f7974d8fed2
working_tree_sources:
  - src/app/support/inquiries/inquiryPreviews.ts
  - src/app/support/inquiries/[preview]/page.tsx
  - src/app/support/inquiries/new/[preview]/page.tsx
  - src/app/support/inquiries/new/order-products/preview-custom/page.tsx
  - src/app/support/inquiries/_components/InquiryListLayout.tsx
  - src/app/support/inquiries/_components/InquiryListContent.tsx
  - src/app/support/inquiries/_components/InquiryListPreview.tsx
  - src/app/support/inquiries/page.tsx
  - src/app/support/inquiries/new/_components/InquiryFormLayout.tsx
  - src/app/support/inquiries/new/_components/InquiryFormContent.tsx
  - src/app/support/inquiries/new/_components/InquiryFormStatePreview.tsx
  - src/app/support/inquiries/new/order-products/_components/InquiryOrderLookup.tsx
  - src/app/support/inquiries/new/page.tsx
  - src/app/screen-index/screenConnections.ts
  - src/app/screen-index/sourceGraph.generated.json
sources:
  - id: inquiry-design
    resource: https://www.figma.com/design/qyXJp4bnoeYSQxQULV8Wql/-HOKA-Design?node-id=1973-16422
    title: '1:1 문의 섹션 1973:16422'
---

# 1:1 문의 시안과 반응형 상태 연결

사용자가 지정한 섹션 전체의 구조·텍스트·폰트·버튼 수치를 읽었다. PC/MO 제품 화면·팝업 24개와 OS 파일선택 참고 프레임 1개를 구분한다. 타이포 변경 안내 2207:58017과 표시용 도형 2273:33586은 제품 화면이 아니다. PC/MO가 같은 상태이면 하나의 반응형 URL을 사용한다. 시안 프레임 수를 맞추려고 플랫폼별 URL이나 고정 viewport iframe을 만들지 않는다. 초기의 플랫폼별 링크·iframe은 사용자 정정에 따라 제거했다.[^inquiry-design]

## 반영한 표현

| 책임 | 시안 → 구현 |
| --- | --- |
| PC 목록 문의하기 | 제목/설명 오른쪽, 검정 채움 36px·12px semibold. 하단 중복 버튼은 PC에서 숨긴다. |
| 모바일 목록 문의하기 | 유의사항 아래 전체 폭·48px·16px semibold를 유지한다. |
| 페이지 제목 | PC 36px. MO 목록 24px, 첨부 답변·문의 등록은 22px을 각각 기존 제목 owner의 표시 옵션으로 적용한다. |
| 등록자 정보 | PC 16px, MO 라벨·값 14px. 실제 customer prop/context 값을 읽는 소유권은 유지한다. |
| 취소·주문 미선택 안내 | PC 568px·모바일 가용 폭 popup, 제목 16px·본문 20px, 흰 제목 영역·#E9EAEB 경계. 확인/취소는 PC 160×40px. |
| 주문 조회 전 버튼 | 검정 채움에서 테두리형으로 변경. PC 160×48px, MO 내용 너비·36px·14px. |
| 선택한 주문 정보 | 상품 정보 제목, 날짜 16px bold, 주문번호·코드 14px, 삭제 액션. 상품변경은 카드 아래 왼쪽 36px·12px. |
| 모바일 주문 조회 | 공통 ModalDialog fullscreen을 사용해 닫기·focus·Escape를 유지한다. 안내 14/12px, 기간 탭 14px·4px 간격, 날짜/주문번호 세로 배치, 40px 테두리 더보기를 적용한다. |
| 첨부 표시 | 기존 첨부 모달·캐러셀 owner에 초기 index만 전달한다. 폼 첨부 이름은 12px·40px 자리 표시 thumbnail이며 실제 파일 미리보기 URL을 만들지 않는다. |

문의/답변 본문 14px, Q/A HOKA 영문 20px, 배지 12px, 문의 제목 16px semibold, 유의사항 14/12px은 기존 표현을 유지한다. 기본 데모의 상품·날짜·운영 정보는 덮어쓰지 않으며 시안의 예시 이름·이미지·사업자 값과 구분한다. 시안 상태의 빈 File 객체는 파일명 확인용이며 업로드 자료가 아니다.

## 상태·직접 URL·IA 연결

목록은 IA 210, 등록은 IA 211의 기존 route·Storybook 연결을 유지하고 `previewRoutes`에 상태만 추가했다. 기존 187/189 연결에도 같은 상태 데이터가 적용된다. 기본·오류·빈 조회·첨부 오류 URL은 재사용했다. 시안 24개는 아래 14개 반응형 상태로 대응하며, 기존 누적 문의 목록과 추가 첨부 오류 예시는 별도로 유지한다.

| 상태 | 시안 노드 (PC / MO) | URL |
| --- | --- | --- |
| 문의 없음 | 1973:16485 / 1973:16691 | `/support/inquiries` |
| 접수완료 | 1973:16510 / 1973:16713 | `/support/inquiries/preview-pending` |
| 답변완료 | 1973:16544 / 1973:16753 | `/support/inquiries/preview-answered` |
| 접수완료·첨부 | 1973:16583 | `/support/inquiries/preview-pending-attachments` |
| 답변완료·첨부 | 1973:16789 | `/support/inquiries/preview-attachments` |
| 첨부 미리보기 | 1973:16636 / 1973:16423 | `/support/inquiries/preview-attachment` |
| 문의등록 | 1973:16898 / 1973:16849 | `/support/inquiries/new` |
| 입력 오류 | 1973:16944 / 1973:16994 | `/support/inquiries/new/preview-error` |
| 작성 취소 | 1973:16663 / 1973:16455 | `/support/inquiries/new/preview-cancel` |
| 주문 미선택 안내 | 1973:16677 / 1973:16470 | `/support/inquiries/new/preview-order-required` |
| 주문 조회 전 | 1973:17121 / 1973:17047 | `/support/inquiries/new/preview-order-lookup` |
| 주문 선택 후 | 1973:17270 / 1973:17185 | `/support/inquiries/new/preview-order-selected` |
| 주문 조회 | 1973:17354 | `/support/inquiries/new/order-products` |
| 조회 기간 직접설정 | 1973:17613 | `/support/inquiries/new/order-products/preview-custom` |

1973:17114는 모바일 OS의 사진/파일 선택 메뉴 참고다. 앱에서 OS 메뉴 모양을 복제하거나 자동으로 띄우는 별도 화면을 만들지 않는다. 문의 등록 화면의 파일찾기 클릭이 실제 기기의 선택기를 연다. Windows 브라우저로 iOS 메뉴 자체를 검증했다고 기록하지 않는다.

## 상태와 데이터 소유권

InquiryListPreview와 InquiryFormStatePreview는 준비 fixture와 초기 popup/선택 상태를 공유한다. 기본 InquiryDataContext의 조회·late data·pending/error/retry·제출 payload·성공 대기·실패 시 입력 보존은 유지한다. InquiryOrderLookup의 preview.period만 고정 자료를 사용해 조회·선택 복원·저장을 건너뛴다. 기본 경로의 주문 조회/선택 복원과 반환 계약은 변경하지 않았다. 실제 재고·가격·업로드 API를 추가하지 않았다.

> 2026-11-05 현행화: `InquiryDataContext`은(는) 2026-11-02 [전체 화면 퍼블리싱 인계](state.md#전체-화면-퍼블리싱-인계-2026-11-02)에서 제거됐다. 현재는 준비된 표시 데이터와 로컬 UI 조작만 있으며 연결 경계는 [데이터 바인딩](data-binding.md#현재-연결-경계-2026-11-05)을 따른다. 미리보기 시나리오는 `InquiryPreviewContext`가 선택한다.

## 검증

- 최종 반응형 URL 14개를 1920px·375px에서 각각 직접 열어 28개 확인이 통과했다. runtime error·iframe·가로 overflow는 모두 없었다. IA SUPPORT 영역의 실제 링크에서 PC/MO 접두사와 이전 디자인별 URL이 남지 않았음을 확인했다.
- `/support/inquiries/preview-attachment`의 같은 URL에서 popup을 연 채 1920→375px로 전환해 열린 상태와 568px→가용 모바일 폭을 확인했다. `/support/inquiries/new/preview-order-selected`는 입력한 제목을 유지하며 375→1920px로 전환됐고 iframe은 없었다.
- 1920px·375px에서 PC 제목 36px, MO 목록 24px/등록 22px, MO 등록자 라벨 14px, PC popup 568px·본문 20px을 실측하고 주요 목록·등록·선택·popup·조회 캡처를 검토했다.
- 주문 첫 항목 선택 후 4개 상품 선택, 하나 해제 후 3개 유지, 직접설정 전환·date input 2개, Escape 닫기와 5개 문의 목록의 답변 접기를 확인했다.
- 실제 제목 글리프는 CSS font 검사에서 `Pretendard-Black` webfont로 확인했다. 대상 ESLint/Prettier·Panda·타입 검사와 경로 통합 후 Next production build가 통과했다. Storybook production build도 통과했으며 의존성 use-client directive 경고가 있었다. 전체 Storybook play 실행을 의미하지 않는다.
- 실서비스 API·업로드·실기기 OS 파일 메뉴는 검증하지 않았다. 마크업 인계의 기존 owner·wrapper·Panda·페이지 진입점과 반응형 지침을 검토했으며, 별도 서비스 경량화나 인증/저장 삭제로 범위를 확대하지 않았다.

[^inquiry-design]: 사용자 제공 Figma 섹션과 그 하위 제품 화면·팝업. 시안 가이드와 OS 참고 UI는 제품 화면 수와 구분한다.
