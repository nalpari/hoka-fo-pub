---
type: Reference
title: '고객센터 첨부 시안 반영'
description: '고객센터 메인·FAQ·공지·문의·매장·안내·약관 화면의 시안 차이와 공통 컴포넌트 구성을 기록한다.'
tags: [support, design, components, responsive]
status: draft
generated:
  by: codex/gpt-6
  at: "2026-11-02T00:43:51.022Z"
source_revision: 23690be7426ae1a229ef9e6883bdc45053102a7e
working_tree_sources:
  - src/app/support/terms/_components/TermsDocument.tsx
  - src/components/care-guide/care.data.ts
  - src/app/support/care/_components/CareContent.tsx
  - src/app/support/care/page.tsx
  - src/app/support/after-sales/_components/AfterSalesContent.tsx
  - src/app/support/after-sales/page.tsx
  - src/components/common/molecules/SupportTabs.tsx
  - src/app/support/inquiries/_components/InquiryListContent.tsx
  - src/app/support/inquiries/_components/InquiryListLayout.tsx
  - src/app/support/inquiries/_components/InquiryListPreview.tsx
  - src/app/support/inquiries/new/_components/InquiryFormContent.tsx
  - src/components/support/InquiryCautions.tsx
  - src/app/support/notices/_components/NoticesContent.tsx
  - src/app/support/notices/_components/NoticesList.tsx
  - src/app/support/notices/[id]/page.tsx
  - src/app/support/faq/_components/FaqContent.tsx
  - src/app/support/faq/faq.data.ts
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
  - id: terms-figma-20261102
    resource: 'https://www.figma.com/design/qyXJp4bnoeYSQxQULV8Wql/-HOKA-Design?node-id=1973-15873'
    title: '약관 PC 개인정보 및 모바일 이용약관·개인정보 시안'
  - id: care-section-figma
    resource: 'https://www.figma.com/design/qyXJp4bnoeYSQxQULV8Wql/-HOKA-Design?node-id=1973-15638'
    title: '세탁 및 손질 방법 PC·모바일 신발·의류용품 4개 프레임'
  - id: inquiries-section-figma
    resource: https://www.figma.com/design/qyXJp4bnoeYSQxQULV8Wql/-HOKA-Design?node-id=1973-16422
    title: 1:1 문의 PC·모바일 목록과 등록 시안
  - id: notices-figma
    resource: 'https://www.figma.com/design/qyXJp4bnoeYSQxQULV8Wql/-HOKA-Design?node-id=1973-16234'
    title: '공지사항 PC·모바일 목록·상세 시안'
  - id: faq-section-figma
    resource: 'https://www.figma.com/design/qyXJp4bnoeYSQxQULV8Wql/-HOKA-Design?node-id=1973-15997'
    title: 'FAQ PC·모바일 기본·답변 펼침 시안'
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

## 공지사항 Figma 재적용 (2026-11-02)

지정 섹션 `1973:16234`의 PC 목록 `1973:16235`·상세 `1973:16285`, 모바일 목록 `1973:16309`·상세 `1973:16384`를 확인했다. PC 목록에 2px 상단선과 1px 하단선을 가진 제목/등록일 헤더(상하 16px)와 목록 앞 8px 간격을 추가했다. 본문 844px과 기존 행의 PC 최소 74px·모바일 최소 58px 구조를 유지하며, 긴 제목은 잘라내지 않고 행이 늘어난다. 목록 제목은 기존 heading10으로 16px/600/1.2를 사용한다. 더보기는 테두리 없는 버튼과 20px 영역 안의 기존 13px chevron SVG, 현재 목록에서 남은 건수로 표시하고 기존 추가 조회·실패 표시를 유지한다. 고정 예시의 문구·날짜·건수와 운영 연결 context는 바꾸지 않는다.[^notices-figma]

상세 제목은 heading9으로 PC 20px·모바일 16px/600, 날짜는 영문 body4(14px/400), 본문은 기존 14px·문단 간격 16px·상하 24px/좌우 8px을 사용한다. 모바일 상세 제목 앞 간격은 32px, 본문 최소 높이는 354px, 두 화면의 하단 여백은 72px이다. 기존 목록보기 버튼은 PC 180px·모바일 전체 폭/높이 48px을 유지한다. 시안의 회원가입 설명은 예시 제목과 내용이 일치하지 않아 기존 프로모션 본문 fixture를 유지하며, 외부 사이트의 가입 URL을 서비스 동작으로 이식하지 않았다.

검증: Panda 생성·공지 경로 ESLint·변경 TSX Prettier·최종 전체 타입 검사 통과. 1920px PC의 본문 844px/행 74px/상세 제목 20px·600/목록보기 180×48px, 375px 모바일의 제목 22px·900/목록 제목 16px·600/행 58px/상세 본문 354px/목록보기 328×48px를 DOM으로 확인했다. 두 플랫폼의 목록→상세 링크와 가로 넘침 없음을 확인했다. 모바일은 hydration 후 platform-mobile을 기다려 측정했으며 Windows 스크롤바로 clientWidth가 360px여서 본문 328px이다(시안은 343px). 실제 제목 글리프는 Pretendard Black/SemiBold이며, 날짜 글리프의 내부 이름 `.`은 로드된 hoka 400 face와 TheFutureHOKA-Regular.woff2의 생성 자산 해시 일치로 연결했다. 캡처 시간 초과로 최종 스크린샷 시각 대조는 완료하지 못했다. 전체 lint:fix는 범위 밖 FindAccountContent의 css·가입 완료 Stack 미사용 import 2건으로 실패했다. 첫 타입 검사의 동시 작업 중 TermsDocument weight 오류는 최종 재검사에서 사라졌다. Next production build는 다른 빌드가 실행 중이라는 잠금으로 완료하지 못했고 Storybook 빌드는 실행하지 않았다.

모바일 목록보기 복귀 뒤 더보기로 10건→11건이 표시되고 더보기 버튼이 사라지며 가로 넘침이 없음을 추가 확인했다. 기존 외부 서비스 데이터·실패/재시도 계약은 변경하지 않았고 이번에는 실제 서버 요청으로 검증하지 않았다. `git diff --check`와 OKF 작업 트리 매핑 검사 `pendingDocs(false)`도 통과했다.

최종 재검증(2026-11-02): 두 URL을 1920px PC·375px 모바일로 전체 페이지 캡처해 지정 네 프레임과 시각 비교했다. 이 과정에서 기존 `pb: '18!'`가 18px로 출력되는 문제를 발견해 `72px!`로 수정하고 실제 72px을 확인했다. 굵은 FontAwesome 화살표는 기존 얇은 chevron SVG로 교체했다. 보정 후 네 화면의 캡처를 확인했으며, 목록/상세 제목·선·간격과 48px 버튼을 대조했다. 시안의 모바일 상태바 유무, 공통 홍보 배너 50px, Windows 스크롤바, 서로 다른 제목/본문 fixture 및 목록 건수 때문에 절대 좌표·페이지 높이는 다르다. 이 차이를 없애기 위한 운영 데이터나 공통 헤더/푸터 변경은 하지 않았다. 최종 작업 트리 Next production build(타입 검사·119개 정적 페이지 생성 포함), Panda 생성과 공지 파일 ESLint·Prettier를 통과했다. 앞 문단의 캡처·빌드 미완료는 초기 검사 이력이며 이 재검증으로 해소했다. Storybook build와 실제 서버 요청 검증은 이번 재검증에서도 수행하지 않았다.

[^notices-figma]: 2026-11-02 확인한 [공지사항 섹션](https://www.figma.com/design/qyXJp4bnoeYSQxQULV8Wql/-HOKA-Design?node-id=1973-16234)의 구조·스타일·PNG. 모바일 상세는 제목 간격/영문 날짜/354px 본문을 가진 `1973:16384`를 기준으로 삼았으며, 24px 제목 간격을 가진 이전 상세 `1973:16362`와 구분한다.

커밋 선별 범위: 사용자가 작업 전부터 있던 선행 변경을 제외하도록 지정했다. 따라서 공지 목록 헤더·제목 variant·더보기와 상세 제목 variant·영문 날짜·모바일 제목 앞 32px 및 본문 최소 354px, 직접 관련 문서만 선별한다. 선행 공지 모바일 제목 22px·목록 가로 배치·회색 선/날짜·breadcrumb 정리와 공통 className 전달은 포함하지 않는다. 해당 className에 의존하는 하단 72px 지정 두 줄도 미스테이징 상태로 보존한다. 위 스크린샷과 Next build는 선행 변경을 포함한 완성 작업 트리의 검증이며 선별 커밋만의 화면과 구분한다.

## FAQ Figma 적용 (2026-11-02)

지정 섹션 `1973:15997` 안의 PC `1973:16150`, 모바일 기본 `1973:15998`와 답변 펼침 `1973:16070`을 구조·수치로 확인했다.[^faq-section-figma] 변경 소유자는 `src/app/support/faq/_components/FaqContent.tsx`이며 기존 동시 작업의 답변 문단·초기 펼침·카테고리 간격 변경을 보존했다.

PC 제목 아래 간격 32px와 검색 영역 상단 24px, 검색창 590×56px, 카테고리 아래 32px, 질문 20px/600/24px를 적용한다. 모바일 제목은 HOKA 22px/900, 검색 앞 32px, 질문은 Pretendard 16px/600/19.2px이며 Q는 17px 고정 폭의 HOKA 20px이다. 답변은 기존 #F7F7F9·24px 16px 패딩·14px 본문을 유지한다. 검색 아이콘은 기존 SearchField 기본 모드로 PC 오른쪽·모바일 왼쪽에 배치하고 모바일 placeholder는 #777777이다. 질문 화살표는 24px 영역 안의 16px 아이콘으로 보정했다. 하단은 로컬 footer의 plain Button으로 `더 보기 (전체 건수)`와 chevron을 표시하고 PC 40px·모바일 24px 앞 간격을 둔다. 공통 컴포넌트 기본값은 변경하지 않는다.

시안의 반복 질문·건수 16을 운영 데이터로 복사하지 않고 기존 FAQ fixture와 실제 totalCount를 표시한다. SupportContentContext.faq의 검색 결과·추가 조회 책임을 보존하며 추가 조회 중 버튼은 중복 실행을 막는다. 서버 검색·실패·재시도·응답 교체 자체는 이번 디자인 변경의 검증 대상이 아니다.

2026-11-02 Codex 실행 확인: PC 1920px/clientWidth 1905px의 본문 844px·질문 20px/600/24px, 모바일 375px/clientWidth 360px의 제목 22px·검색 높이 56px·질문 16px/600·답변 14px 및 양쪽 가로 넘침 없음을 DOM으로 확인했다. 실제 질문 글리프는 Pretendard SemiBold였다. 영문 제목의 실제 글리프 내부 이름은 `.`이지만 --font-hoka의 hoka 900 normal face가 참조한 TheFutureHOKA_Black.2cswp60rr-lan.woff2와 public/fonts/TheFutureHOKA-Black.woff2의 SHA256이 같아 제공 파일과 연결했다. 모바일 답변 펼침·검색 결과 없음·상품정보 탭, 더 보기로 10→12건 표시와 버튼 제거를 확인했다.

[^faq-section-figma]: [사용자가 지정한 FAQ 섹션](https://www.figma.com/design/qyXJp4bnoeYSQxQULV8Wql/-HOKA-Design?node-id=1973-15997), 2026-11-02 확인. 별도 디자인 시스템 파일의 지정 노드는 존재하지 않아 그 라이브러리를 이번 수치의 근거로 사용하지 않았다.

답변 문단 서식의 출처는 `src/app/support/faq/faq.data.ts`다. 최종 Storybook production build도 통과했으며 의존 패키지의 모듈 지시문·청크 크기 관련 경고는 남아 있다. PC/MO의 `/support/faq/preview-no-results` 직접 진입에서 검색 결과 없음 표시를 확인했다. 사용자가 FAQ 두 파일의 기존 관련 변경을 함께 커밋하도록 승인했으며 다른 고객지원 화면과 공통 컴포넌트 변경은 커밋 대상에서 제외한다.

최종 확인(2026-11-02): 앞선 타입 오류·빌드 잠금은 재검사에서 해소됐다. 전체 타입 검사, 최종 화살표/placeholder 수정 이후의 Next production build(119개 정적 경로), 변경 파일 ESLint·Prettier 및 Panda 생성을 통과했다. PC 1920px와 모바일 375px의 기본·답변 펼침 실행 이미지를 로컬에 저장하고 해당 Figma PNG와 시각 대조를 완료했다. 캡처에서 발견한 화살표 크기를 16px로 보정했으며 모바일 placeholder도 원본의 #777777에 맞췄다. 공통 홍보 배너와 시안의 iPhone status bar, Windows scrollbar 15px, 기존 fixture의 서로 다른 질문·12건과 시안의 반복 문구·16건 때문에 절대 y좌표·줄바꿈·전체 화면 높이는 다르다. 이 차이를 픽셀 일치로 주장하지 않으며 공통 헤더/푸터·사이드 메뉴·데이터 내용 변경으로 확대하지 않았다. 검증은 공유 작업 트리에서 실행했으며 다른 화면의 미커밋 변경도 함께 존재했다.

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

## 문의 목록·등록 Figma 적용 (2026-11-02)

지정 섹션 1973:16422의 PC 빈 목록 1973:16485·접수 1973:16510·답변 1973:16544와 모바일 빈 목록 1973:16691·답변 1973:16753, PC/MO 등록 1973:16898·1973:16849를 확인했다. 본문 844px, 제목 PC 36px·MO 22px은 기존 소유자를 유지한다. 모바일 빈 목록 설명은 14px, 문의 있는 목록·등록 설명은 16px로 프레임별 차이를 유지한다.[^inquiries-section-figma]

목록 제목/설명부터 구분선까지 PC 32px·MO 16px, 빈 영역 높이는 PC 약 427px(203px 상하 패딩과 20.8px 텍스트)·MO 190px로 맞췄다. 203px 패딩은 구현에서 427px 최소 높이로 표현한다. 목록 항목마다 article을 두고 16px 상하 여백과 #E9EAEB 구분선을 적용하며 첫/마지막 여백은 목록 소유자가 맡는다. PC 상태 배지와 제목은 가로, MO는 세로이며 간격은 8px이다. 질문/답변 본문은 14px, Q/A는 기존 HOKA 영문 폰트 20px 일반 굵기를 사용한다. 답변 패널은 #F7F7F9, PC 24px 30px·MO 16px 패딩이다. 목록 fixture는 기존 대기 1건과 완료 1건을 유지하므로 시안의 행 개수·문장 길이와 구분한다.

등록자 정보는 PC 16px·MO 값 14px의 일반 굵기를 사용한다. 내용 입력은 100px textarea와 내부 글자 수 표시를 유지하고, 필드 패딩 12px·내부 간격 8px로 조정했다. 파일 첨부 제목은 PC 20px·MO 16px이며, 취소/등록 버튼은 PC 각 180×48px·MO 가변 2열 48px이다. 유의사항은 위쪽 20px 패딩·제목 14px 일반·본문 12px 및 시안의 네 번째 환불계좌 안내를 추가한다. 목록 하단 버튼 앞 간격은 PC 48px·MO 24px이다. 공통 고객센터 레이아웃·폰트 등록·전역 플랫폼은 이번 변경의 대상이 아니다.

기존 InquiryDataContext와 입력/파일 선택/검증/주문 조회/답변 펼침/첨부 미리보기 계약은 변경하지 않았다. 실제 API 연결은 기존 통합 소유자의 책임이며 시안 문구가 서비스 구현을 의미하지 않는다. 등록/오류 상태가 동일 표현 부품을 사용하므로 기존 오류 URL도 시각 변경을 공유한다.

Codex 검증(2026-11-02): Panda 생성·최종 타입 검사·문의 소스 ESLint/Prettier·Storybook production build·diff 공백 검사 통과. PC 1920px의 본문 844px·180×48px 버튼, MO 375px의 빈 영역 190px·설명 Empty 14px/List 16px·100px textarea·48px 버튼과 가로 넘침 없음을 실행 DOM으로 확인했다. Windows 세로 스크롤바 때문에 clientWidth는 각각 1905px·360px, MO 본문은 328px이다. 앱 공통 홍보 배너·Figma status bar·fixture 문장 길이 차이는 화면 절대 위치와 구분한다. 모바일 목록 답변 접기/펼치기를 확인했고 제목의 실제 글리프는 Pretendard Black으로 확인했다. 공유 개발 서버에서 범위 밖 size-guide의 shoeSizes export 빌드 오류가 나타나 후반 PC/MO 확인은 빌드한 Storybook의 명시 플랫폼을 사용했다. 스크린샷은 capture 시간 초과로 실패하여 최종 렌더 이미지와 Figma의 시각 대조는 완료하지 못했다. 전체 lint 및 lint:fix는 기존 find-account의 css·signup/complete의 Stack 미사용 import 2건으로 실패했다. Next production build와 실제 API 요청 검증은 수행하지 않았다. OKF staged check는 통과했으며 index는 비어 있고 pendingDocs(false)는 누락이 없다.

[^inquiries-section-figma]: 사용자 지정 Figma 문의 섹션과 위의 PC/MO 자식 프레임. 2026-11-02 구조·레이아웃·텍스트 스타일과 PC 답변/MO 등록 PNG를 확인했다.

## 배송 및 반품안내 Figma 적용 (2026-11-02)

디자인 출처는 [지정 배송 및 반품안내 섹션](https://www.figma.com/design/qyXJp4bnoeYSQxQULV8Wql/-HOKA-Design?node-id=1973-15355)이며, PC 1973:15618·1973:15433·1973:15513과 MO 1973:15356·1973:15598·1973:15391을 읽었다. PC 본문 844px, 제목 36px/900·MO 22px/900, 탭 PC 42px·MO 32px, 소제목 16px/600, 본문 14px/18.2px, 반품처 배경 #F7F7F9와 PC 36px·MO 24px 16px 32px 패딩을 적용했다. 본문과 카드는 기존 route-private AfterSalesContent가 소유하고 SupportTabs의 shipping-returns 옵션으로 기존 탭 사용처를 보존한다. 제목→탭 간격은 PC 40px·MO 24px, 탭→배송 안내는 PC 12px·MO 24px다.

세 패널은 배송 안내 → 반품 안내(절차) → 상품 반품안내(반품처·유의 사항·바로가기)로 연결한다. 원본 프레임마다 두 번째/세 번째 탭 문구가 반품 주의사항·상품 반품안내 등으로 달라, 화면 이동 중 명칭이 바뀌지 않도록 본문에 맞춰 통일했다. 반품 절차의 PC 4~6번은 환불→요청 확인→물류센터 도착, MO는 물류센터 도착→요청 확인→환불로 서로 다르며 각 시안 순서를 유지했다. 이 차이는 실제 업무 정책 확정이나 서비스 상태를 의미하지 않는다.

반품처 전화 080-6666-7777, 운영시간과 주소는 시안 고정 표시다. 기존 1:1 문의·FAQ·주문조회 경로를 ButtonLink로 연결한다. 서버 조회·반품 신청·배송비 계산은 구현하지 않았고, 운영정보 연결 소유자와 요청 경계는 page의 [ 개발팀 바인딩 ] 주석에 기록했다.

검증: 브라우저 PC 1600px에서 본문 844px, 제목 36px/900, 소제목 16px/600, 본문 14px/18.2px와 탭 42px를 실측했다. MO viewport 375px(스크롤바 제외 clientWidth 360px)에서 제목 22px·탭 32px와 모바일 절차 순서를 확인했다. PNG 캡처는 브라우저 Page.captureScreenshot 시간 초과로 완료하지 못했으므로 이미지 대조 완료로 간주하지 않는다. Panda 생성은 통과했다.

작업 트리 출처: src/app/support/after-sales/page.tsx, src/app/support/after-sales/_components/AfterSalesContent.tsx, src/components/common/molecules/SupportTabs.tsx.

추가 검사: 변경한 세 TSX의 ESLint와 git diff --check를 통과했다. 공유 SupportTabs의 동시 변경은 보존했다.

## 세탁 및 손질 안내 Figma 적용 (2026-11-02)

사용자 지정 섹션 1973:15638의 PC 신발 1973:15639·의류용품 1973:15740, 모바일 신발 1973:15817·의류용품 2089:59120을 기준으로 반영했다.[^care-section-figma] 화면 파일과 별도 디자인 시스템 파일의 읽기 접근을 각각 확인했으며 이 화면의 관측값을 전역 토큰으로 승격하지 않았다.

- PC 본문 844px, 제목 36px/모바일 22px, 제목→탭 40px/24px, 탭 높이 42px/32px, 탭→패널 40px/24px를 적용한다. 본문 좌우 패딩은 8px이며 신발 소개 위 패딩은 16px이다.
- 신발 요약은 PC 3열·열 간격 40px, 모바일 3묶음 세로·묶음 간격 10px이다. 요약 항목 간격은 4px, 신발 소개/상세 영역 간격은 PC 32px·모바일 40px이다. 소재 요약은 시안의 문구이며 대응하는 상세 설명이 없는 항목을 임의로 작성하거나 클릭 링크로 만들지 않았다.
- 소제목은 16px·600·19.2px 행간, 본문은 14px·400·18.2px·#4D4D4D이다. 의류 소개는 PC 12px·모바일 14px이다. 기존 Pretendard face와 Typography를 재사용한다. 기본 제목색은 기존 공통 text-primary(#111)를 유지한다.
- 의류 소개·가죽이 젖었을 때 안내·공통 주의사항 3개를 고정 표시 데이터에 추가했다. 신발 상세 10개 섹션과 순차 번호를 유지한다. 시안 데이터의 반복 1. 표기와 명백한 오타를 그대로 복제하지 않는다.
- CareContent는 라우트 전용 소개/본문 조합을 소유한다. CareInstructions의 care 옵션은 항목 간격 10px·패딩 0·하이픈을 사용하며 상품 상세의 default 옵션(16px 간격·기존 패딩·가운뎃점)을 보존한다. SupportTabs의 care 옵션만 해당 높이·밑줄·패널 여백을 사용한다. 기존 tabs의 값과 Base UI 키보드 계약을 유지한다.

Codex 브라우저 검증(2026-11-02): 1920px 및 375px에서 두 탭의 선택·10개/3개 섹션·공통 주의사항 표시, 방향키 후 Enter 선택, 42px/32px 탭 높이, 14px/18.2px/#4D4D4D 계산 스타일을 확인했다. 제목의 실제 글리프 폰트는 Pretendard Black이었다. Windows 스크롤바 15px로 clientWidth는 1905px·360px이며 가로 넘침은 없었다. 시안에는 없는 공통 홍보 배너와 모바일 status bar 유무 때문에 절대 y좌표를 동일하다고 보지 않는다. 브라우저 캡처는 Page.captureScreenshot 시간 초과로 실패하여 최종 이미지 대조는 미완료다. 원격 요청이나 BO 연동은 구현·검증하지 않았다.

[^care-section-figma]: 사용자 제공 Figma 세탁 및 손질 안내 섹션 https://www.figma.com/design/qyXJp4bnoeYSQxQULV8Wql/-HOKA-Design?node-id=1973-15638 (2026-11-02 확인).

검사 기록: 변경 파일 ESLint, Panda 생성, Storybook production build, git diff --check 및 OKF pendingDocs(false)의 누락 없음 확인을 수행했다. 기존 WEB/Mobile Storybook에서 탭 높이 42px/32px과 의류 공통 주의사항 표시를 확인했다. 전체 lint:fix는 범위 밖 FindAccountContent의 css, signup/complete의 Stack, AfterSalesContent의 ButtonLink 미사용 import로 실패했다. 전체 타입 검사는 범위 밖 TermsDocument.tsx:51의 weight="normal" 타입 오류 1건으로 실패했다. Next production build는 다른 next build 프로세스가 실행 중이라는 잠금 오류로 완료하지 못했다. 다른 채팅의 변경과 index는 보존했으며 이 기록은 전체 저장소의 검증 통과를 의미하지 않는다.

## 약관 Figma 재적용 (2026-11-02)

사용자 지정 [약관 섹션 1973:15873](https://www.figma.com/design/qyXJp4bnoeYSQxQULV8Wql/-HOKA-Design?node-id=1973-15873)의 PC 개인정보 `1973:15874`, 모바일 이용약관 `1973:15956`·개인정보 `1973:15976`을 기준으로 `/support/terms`와 `?tab=privacy`의 표시를 보정했다. 이 섹션에는 별도 PC 이용약관 프레임이 없어 PC 개인정보의 공통 구조를 재사용한다.

제목과 탭 사이 PC 40px·MO 24px, 탭 높이 PC 40px·MO 32px, 탭과 시행일 사이 PC 40px·MO 24px, 시행일과 본문 사이 16px을 적용한다. PC 탭 인스턴스 외곽 40px·내부 그룹 42px의 차이는 외곽 크기를 기준으로 구현한다. 탭·날짜는 Pretendard 16px/400, 제목은 기존 PC 36px·MO 22px/900을 유지한다. PC 본문 좌우 16px 들여쓰기를 제거해 탭과 같은 844px 폭으로 표시하고, 회색 본문 높이 PC 407px·MO 404px은 유지한다. 개인정보 하단 안내는 12px/#777777, 본문과의 간격은 PC 16px·MO 12px이다. 모바일 하단 여백은 이 라우트에서만 64px로 적용한다.

`SupportTabs`의 명시적인 `terms` variant로 높이·글자 굵기를 지정한다. 기본/guide/scrollable 및 다른 고객지원 variant의 계약은 유지한다. `TermsDocument`의 기존 버전 선택과 `SupportContentContext.terms` 연결, URL tab 전환·뒤로/앞으로 탐색은 변경하지 않는다. 본문의 회색 약관내용은 시안과 기존 미연결 표시 자료이며 실제 법률 문서나 API 구현을 뜻하지 않는다.

작업 트리 출처: `src/app/support/terms/page.tsx`, `src/app/support/terms/_components/TermsDocument.tsx`, `src/components/common/molecules/SupportTabs.tsx`.

2026-11-02 Codex 검증: 변경 파일 ESLint·Prettier, Panda 생성, 타입 검사, Next production build(119개 정적 경로), `git diff --check`를 통과했다. 작업 트리 전체의 `pendingDocs(false)`는 누락 없음이었다. 전체 `lint:fix`는 기존 로그인 FindAccountContent의 css·가입 완료의 Stack 미사용 import 2건으로 중단되었으며 이 소스는 수정하지 않았다.

브라우저에서 두 URL의 탭 전환·뒤로/앞으로 탐색, 시행일 변경, Escape 닫기와 트리거 포커스 복원을 확인했다. 1920px PC 본문 844×407px·탭 40px, 375px MO 제목 22px·탭 32px·본문 높이 404px과 하단 안내 12px/#777777·12px 간격, 하단 여백 64px을 DOM 계산값으로 확인했다. 양쪽 가로 넘침은 없다. Windows 세로 스크롤바 15px 때문에 PC clientWidth는 1905px, MO는 360px이며, 공통 홍보 배너와 모바일 status bar 차이를 시안 절대 좌표와 구분한다. 실제 글리프는 제목 Pretendard Black·탭 Pretendard Regular였고, 시행일에 `language="ko"`를 지정한 뒤 숫자도 Pretendard Regular임을 확인했다. Storybook의 명시적 WEB/Mobile 기본 약관에서 각각 탭 40/32px·본문 높이 407/404px을 확인했다. 기존 회색 표시 자료와 BO 본문 연결은 유지하며 새 서비스 계약 검증 대상은 없다.

Figma 모바일 프레임 PNG는 확인했으나 실행 화면의 스크린샷 캡처는 시간 초과로 실패했다. 따라서 DOM·실제 폰트 검증과 별개로 최종 스크린샷 시각 대조는 완료하지 못했다. 별도 PC 이용약관 시안, 실제 운영 약관 본문과 서버 조회는 이번 작업에서 제공·검증되지 않았다.
