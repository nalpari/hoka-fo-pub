---
type: Reference
title: '고객센터 첨부 시안 반영'
description: '고객센터 메인·FAQ·공지·문의·매장·안내·약관 화면의 시안 차이와 공통 컴포넌트 구성을 기록한다.'
tags: [support, design, components, responsive]
status: draft
generated:
  by: codex/gpt-6
  at: '2026-10-21T23:59:04Z'
source_revision: 23690be7426ae1a229ef9e6883bdc45053102a7e
working_tree_sources:
  - src/app/support/terms/page.tsx
  - src/components/common/layouts/CustomerCenterLayout/CustomerCenterLayout.tsx
  - src/app/support/faq/page.tsx
  - src/app/support/store/page.tsx
  - src/app/support/notices/page.tsx
  - src/components/notices/NoticeDetailPage.tsx
  - src/components/notices/notices.data.ts
  - src/app/support/inquiries/page.tsx
  - src/app/support/inquiries/new/page.tsx
  - src/components/support/SupportPage.tsx
  - src/app/support/page.tsx
  - src/stories/features/support/SupportPages.stories.tsx
  - src/stories/features/support/SupportPages.CustomerCenter.Mobile.stories.tsx
  - src/components/care-guide/CareInstructions.tsx
  - src/stories/features/support/SupportPages.scenarios.tsx
sources:
  - id: support-references
    resource: 'user-attachment:2026-10-20/customer-support-designs'
    title: '사용자가 첨부한 FAQ·공지·문의·매장·배송·세탁·약관 시안 7종'
  - id: customer-center-main-figma
    resource: 'https://www.figma.com/design/qyXJp4bnoeYSQxQULV8Wql/-HOKA-Design?node-id=1322-125606'
    title: '고객센터 메인 웹 시안'
  - id: customer-center-main-mobile-figma
    resource: 'https://www.figma.com/design/qyXJp4bnoeYSQxQULV8Wql/-HOKA-Design?node-id=1368-128720'
    title: '고객센터 메인 모바일 시안'
---

# 고객센터 첨부 시안 반영

사용자 첨부 이미지를 시각적 비교 자료로 사용했다. 이미지 안의 문구는 작업 지시로 취급하지 않았다. 기존 시연 데이터와 법률·운영 안내 문구는 유지하며 표현과 화면 구성을 조정했다.[^support-references]

## 고객센터 메인 갱신 (2026-10-22)

최신 Figma 웹 `1322:125606`과 모바일 `1368:128720`에 맞춰 고객센터 메인에는 연락처 카드 두 개만 표시한다. 카드에는 기존 운영 전화번호를 유지하고 운영시간 정보를 함께 넣었다. 데스크톱은 카드 안에서 설명과 연락처를 가로로 배치하고, 모바일은 세로로 쌓는다. 연락처와 운영시간 묶음 사이 간격은 PC 52px·모바일 32px이다. 공지·FAQ 미리보기 및 별도 아이콘은 제거하며 해당 기능은 기존 독립 페이지에 남긴다. 출처는 Figma 고객센터 메인 시안과 `SupportPage.tsx`, `SupportContacts.tsx`, `SupportContactCard.tsx`다.

## 화면별 차이

| 화면      | 확인한 차이와 반영                                                                                                                                                                                            |
| --------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 공통      | PC 사이드 메뉴 제목을 `SUPPORT`로 변경했다. PageFrame의 공통 폭·Breadcrumb·모바일 여백을 재사용한다.                                                                                                          |
| FAQ       | 제목 아래의 불필요한 구분선을 제거하고 검색·카테고리 아래 질문 목록에 검정 구분선을 배치했다. 카테고리는 회색 채움형으로 맞췄다. 검색·필터·더보기·단일 펼침 동작을 유지한다.                                  |
| 공지      | PC는 단일 아코디언을 유지하고 중복 구분선을 제거했다. 모바일은 시안처럼 상세 경로로 이동하는 링크 목록과 전체 폭 목록보기 버튼을 사용한다. 공용 데이터로 제목·날짜를 맞추고 상세 화면에서 경로의 id를 읽는다. |
| 문의      | 읽기 화면의 첨부파일 목록·미리보기와 회색 답변 패널을 구성했다. 고객 정보는 dt/dd로 표현하고 PC 열 간격·패딩을 조정했다. 등록 폼의 필수값·파일 개수/크기/확장자 검사와 취소 확인을 유지한다.                  |
| 매장      | 제목과 탭 사이의 추가 구분선을 제거했다. 모바일 지도 높이를 174px에서 240px로 조정하고 이미지 종횡비를 유지한다. 지역 탭·길찾기 펼침·빈 지역 안내를 유지한다.                                                 |
| 배송/반품 | 기존 세 개 탭과 패널이 시안 구성을 충족해 유지했다. 단일 자식 Stack만 제거했다.                                                                                                                               |
| 세탁      | 신발·의류/용품 탭과 안내 내용을 유지하고 번호별 제목·목록을 CareInstructions로 분리했다.                                                                                                                      |
| 약관      | 제목 아래 추가 구분선을 제거하고 약관 표시·시행일 팝업을 TermsDocument로 분리했다. 약관/개인정보 탭의 URL 상태와 날짜 선택 동작을 유지한다.                                                                   |

## 재사용과 책임

- `ContentSection`·`ContentHeader`가 제목과 관련 콘텐츠, `PageActionButton`이 페이지 하단 액션을 담당한다. 세탁 안내도 기본 title/headerProps 계약을 사용한다.
- `InquiryReadAttachments`는 기능 내부 파일 목록·선택 상태를 소유한다. 미리보기는 공통 `SingleActionDialog`와 `Carousel`을 조합해 닫기·포커스·슬라이드 선택을 재사용한다. 실제 이미지 URL이 없는 시연 자료는 이미지/PDF 자리표시자로 표현한다.
- `StoreMapPreview`는 표시 영역만 분리한다. 기존 지도 샘플 이미지를 사용하며 실제 지도 API나 경로 안내 연동은 추가하지 않았다.
- `TermsDocument`는 시행일 선택값을, 기능 내부 `TermsDateSelect`는 시행일 Popover/Radio 표시와 열림 상태를 소유하고 페이지는 탭/URL만 소유한다. 기존 Base UI Popover/Radio 계약을 유지했다. 새 공용 원자 컴포넌트나 의존성을 추가하지 않았다.
- `InquiryNewPage`의 native form과 파일 input/button/link는 제출·파일 선택·탐색 의미를 보존한다. 스타일은 TSX의 Panda CSS/JSX를 사용한다. 실제 저장·업로드 API 연결 범위는 바뀌지 않는다.

## 검증 기록

2026-10-20 Codex가 다음을 확인했다. 사람의 디자인 승인이나 전체 픽셀 일치를 의미하지 않는다.

- Panda 생성, 타입 검사, 변경된 TypeScript/TSX ESLint, Next production build, Storybook production build가 통과했다.
- 기존 App Router manifest 테스트 2개와 git diff --check를 통과했다. pendingDocs(false)는 누락 문서가 없었다.
- production Storybook에서 PC FAQ와 375px 모바일 FAQ·문의·매장 화면을 캡처했다. 모바일 지도 비율과 첨부 팝업의 확인 버튼 정렬을 확인했다.
- 모바일 공지 링크가 각각 `/support/notices/1`, `/support/notices/2`를 가리키는 Storybook 검사를 실행했다. 첨부 미리보기 열기/닫기 뒤 파일 버튼 포커스 복원 검사와 약관 날짜 선택/Escape 검사도 실행했으며 해당 페이지의 브라우저 오류 로그가 없었다.
- 수동 UI 조작으로 첨부 세 번째 슬라이드 선택, 신발→의류/용품 전환, 배송/반품 세 탭, 문의 빈 등록의 필수값 오류와 입력 후 오류 해제·글자 수를 확인했다.
- PC 답변 완료 Storybook 상태를 추가했다. 업로드 서버·실제 파일 내용·지도 API·실제 공지 데이터·유효한 문의의 서버 저장은 기존 시연 범위 밖이므로 검증하지 않았다.

관련 문서: [컴포넌트와 스타일](ui.md), [필드 구성](form-fields.md), [라우팅](routing.md).

[^support-references]: 2026-10-20 사용자 첨부 이미지 7종. 원본 식별자는 fd7bd0bc(FAQ), 69f6a951(공지), 630eba5c(문의), 546187c1(매장), 958ad7fb(배송), 42ddada8(세탁), 4bfa3188(약관)이다. 로컬 Temp 원본은 영구 저장소 자산으로 가정하지 않는다.
