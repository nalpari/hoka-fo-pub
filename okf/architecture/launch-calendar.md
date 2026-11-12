---
type: Architecture
title: 런칭 캘린더
description: 런칭 캘린더 시안과 직접 URL 및 표시 전용 인계 경계를 설명한다.
tags: [launch-calendar, figma, publishing, ia]
status: draft
updated: '2026-11-11T01:09:17Z'
generated:
  by: codex/gpt-6
  at: '2026-11-11T01:09:17Z'
source_revision: b4fac81f1ba16d76585e64264941c0e35fcecb7f
working_tree_sources:
  - src/app/launch-calendar/page.tsx
  - src/app/launch-calendar/in-stock/page.tsx
  - src/app/launch-calendar/upcoming/page.tsx
  - src/app/launch-calendar/clifton-11-gtx/page.tsx
  - src/app/launch-calendar/clifton-11-gtx/preview-notified/page.tsx
  - src/app/launch-calendar/_components/LaunchCalendarContent.tsx
  - src/app/launch-calendar/_components/LaunchCalendarDetail.tsx
  - src/app/launch-calendar/launchCalendar.data.ts
  - src/app/screen-index/screenConnections.ts
  - src/app/screen-index/screenProgress.ts
  - src/app/screen-index/storybookLinks.ts
  - src/stories/features/launch-calendar/LaunchCalendar.Web.stories.tsx
  - src/stories/features/launch-calendar/LaunchCalendar.Mobile.stories.tsx
sources:
  - id: launch-calendar-revised-design
    resource: https://www.figma.com/design/qyXJp4bnoeYSQxQULV8Wql/-HOKA-Design
    title: Launch Calendar PC 수정 및 모바일 Feed·Upcoming·상세
  - id: launch-calendar-design
    resource: https://www.figma.com/design/soQFEF6eeDjnQP7wY9Q96M/Main---PLP---PDP
    title: Launch Calendar
---

# 런칭 캘린더

## PC 수정 및 모바일 시안 반영 (2026-11-11)

새로 수급한 디자인을 기준으로 아래 초기 구현과 RUN Club 대체 규격을 갱신했다. Feed·Upcoming 두 탭은 PC 120×40px·간격16px, 모바일 99×32px·간격8px이며 제목은 중앙 정렬한다. 모바일 제목과 탭 간격은32px, 목록까지32px다. IA159~161 디자인은 PC/MO 수급으로 갱신했고, 새 시안에 없는 In Stock의 디자인 수급 상태는 변경하지 않았다.

- PC Feed는 12개·Upcoming은8개 fixture와 4열을 유지하고 이미지 반경을0으로 변경했다. Feed 판매 상품 가격 대신 시안의 보조 문구를 표시한다. 모바일은 별도의 명시적 fixture로 Feed6개, Upcoming6개를 표시한다. 외부 items prop을 전달하면 플랫폼별 fixture 선별 없이 현재 배열을 그대로 읽는다.
- 모바일 Feed는4:5 이미지, 이미지/정보20px, 정보 좌우16px·상품명20px/26px, 버튼110×44px, 카드 하단54px이다. Upcoming은 날짜별3개 묶음·묶음간40px, 이미지 너비48%·4:5, 텍스트와16px, 버튼96×36px, 행하단8px·구분선1px이다.
- 상세는 성별·사이즈 선택·더보기 대신 전체 상품 설명과 발매 사이즈·매장·쿠폰 DescriptionList를 표시한다. PC 본문1532px·갤러리1016px·패널484px·간격32px, CTA484×48px다. 모바일은 캐러셀과 본문16px 여백·발매일 행24px 패딩, 하단 고정 공유22px 아이콘·알림44px 버튼·하단32px 여백을 사용한다. 푸터 뒤에 CTA 여유 공간을 두어 마지막 안내가 가려지지 않게 한다.
- 시안의 기획전 영역은 PC1920:980·모바일1:1의 준비 슬롯이다. 실제 이미지가 제공되지 않아 시안의 임시 안내를 명시적 fixture로 표시한다. 실제 기획전 콘텐츠와 신청·공유 동작은 미연결이다.

| 기본 URL                          | 상태                | 확인 URL                                           | IA                |
| --------------------------------- | ------------------- | -------------------------------------------------- | ----------------- |
| `/launch-calendar/clifton-11-gtx` | 입고 알림 신청 가능 | 기본 URL                                           | 159               |
| 동일                              | 입고 알림 신청 완료 | `/launch-calendar/clifton-11-gtx/preview-notified` | 159 previewRoutes |

`notificationStatus`는 직접 URL의 표시 옵션이며 클릭·타이머·저장으로 완료를 연출하지 않는다. 공통 Button·Carousel·ContentHeader·ContentSection·DescriptionList를 직접 재사용하고 route-private UI와 표시 데이터 소유권을 유지했다.

### 검증

PC clientWidth1920px(뷰포트1935px·스크롤바15px)에서 Feed12·Upcoming8·4열, 이미지432×540px, 카드CTA120×48px, 상세CTA484×48px·제목32px를 측정했다. 모바일 뷰포트375px(client360px)에서 Feed6·Upcoming6, 버튼110×44px/96×36px와 상세 고정CTA93px·버튼44px·완료 비활성 배경#E9EAEB를 확인했다. client375px에서는 Upcoming 이미지180×225px·제목28px를 확인했다. 뷰포트768px(client753px)에서도 가로 넘침이 없다. 기본·완료 직접 URL과 푸터 마지막 링크 위의 고정CTA 여유 공간을 스크린샷으로 확인했다. 공통 홍보배너50px는 디자인 프레임과 별도이며 변경하지 않았다.

제목의 실제 글리프가 커스텀 웹폰트를 사용하는 것을 확인했다. 파일 내부 이름은 `.`으로 반환되어 내부 이름만으로 서체를 판별하지 않았다. 기존 layout의 TheFutureHOKA Black900 등록과 로드된 face를 사용한다. ESLint·Prettier·전체 TypeScript·Panda·Next.js 빌드, App Router·preview 링크·의존 그래프·진행 상태26개 검사를 통과했다. IA159에 완료 링크가 생성되고 해당 직접 URL이 새 탭으로 열리는 것을 확인했다. 실제 알림/공유 요청·실제 IMC 이미지·In Stock 신규 시안은 미연결/미제공 범위다.

마지막 마크업 인계 검토에서 공통 컴포넌트 직접 사용·현재 props 반영·Panda 소유권·한글/영문 JSDoc·내부 Next Image/Link·고정 상태 책임을 확인했다. 모바일 갤러리 페이지 표시를 이미지 안에 배치하고 실제 두 번째 이미지 선택을 확인했다. 신규 API·인증·저장·시뮬레이션은 추가하지 않았다.

이하 기록은 최초 구현과 수정 이력이다.

2026-11-03 사용자 수급 안내에 따라 삭제된 목업을 복구하지 않고, 현재 공통 ContentLayout·ContentHeader·ContentSection·Button·DescriptionList·SizeSelector·Carousel를 조합해 실제 화면을 추가했다. 상품 상세의 기존 구매 흐름이나 새 API·인증·저장을 만들지 않는다.

| IA  | 화면                         | 확인 URL                                              |
| --- | ---------------------------- | ----------------------------------------------------- |
| 159 | 캘린더 진입 / 발매 예정 상세 | `/launch-calendar`, `/launch-calendar/clifton-11-gtx` |
| 160 | Feed                         | `/launch-calendar`                                    |
| 161 | Upcoming                     | `/launch-calendar/upcoming`                           |
| 162 | In Stock                     | `/launch-calendar/in-stock`                           |

IA 159의 previewRoutes에 발매 예정 상품 상세를 연결한다. 기존 IA 번호·Feed/Coming/In-stock 행과 삭제된 키즈 163~165를 보존한다. PC 디자인은 네 프레임을 수급했고 모바일 프레임은 제공되지 않았다. 사용자 지시로 MO는 HOKA RUN Club의 기존 반응형 패턴을 적용한다. MO 디자인 수급 여부는 missing을 유지한다.

## 레이아웃과 표시 데이터

- PC 목록: 1920px 시안의 본문 1776px, 상하 96px, 제목 44px/900·행간30.72px, 제목과 탭40px·탭높이40px·너비120px·간격16px, 목록까지60px. 4열·열16px·행96px, 이미지432×540px·반경9.315px, 이미지/정보26px, 이름24px/900·가격16px·CTA120×48px다. 실제 브라우저 scrollbar의 clientWidth 차이는 별도로 측정한다.
- Feed는 12개, Upcoming/In Stock은 각각 8개 명시적 fixture다. 시안의 상품명과 사진이 다른 경우에도 임의 수정하지 않는다. 사진 원본의 크롭 위치와 contain/cover를 표시 데이터의 crop/imageFit에 기록했다. 이미지의 원본 픽셀을 유지하는 lossless WebP와 중복 제거를 적용했고 외부 임시 asset URL을 런타임에 남기지 않았다.
- 상세: 최대1532px, 좌우1016/484 비율·gap32px, 2열8개 이미지·gap16px, 상56px·하96px. 상품명32px, 발매일16px 파랑, 전 사이즈 비활성 5열·높이36px, 신청CTA48px, 설명padding32/32/40px와 더보기 로컬 토글을 사용한다. 날짜는 시안 문자열이며 현재 날짜로 계산하지 않는다.
- MO 목록은 RUN Club처럼 상48/하72px, 제목28px 좌측·16px 여백, 높이32px·간격6px의 둥근 탭, 정사각 이미지·반경0, 카드간16px·본문padding16px의 1열이다. 상세는 공통 모바일 캐러셀로 이미지1개씩 표시하고 16px 본문 여백과 세로 배치를 사용한다. PC/MO 모두 동일 URL이다.

## 인계 경계

`LaunchCalendarContent`는 mode와 현재 items prop을 읽고 `LaunchCalendarDetail`은 현재 product prop을 읽는다. fixture는 실제 재고·발매·회원 데이터 계약과 구분한다. 목록의 신청 완료·품절은 처음부터 표시하는 상태이며 알림 버튼을 클릭해 성공을 연출하지 않는다. 실제 목록/상품/발매 ID·신청 payload·pending/실패/재시도·응답 갱신과 오래된 응답 폐기는 통합 소유자가 구현해야 한다. 상품 카드의 상세/구매 링크는 준비된 샘플 상세 주소로 이동하는 일반 탐색이다. 실제 상품별 연결은 href를 공급해야 한다. 루트 page는 진입만, UI는 `_components`, 데이터는 route 옆, stories는 `src/stories/features/launch-calendar`가 소유한다.

공통 Header/Footer·플랫폼·서체 등록·상품상세 계약은 변경하지 않았다. 이 페이지의 선택, 미제공 사이즈, 알림 CTA를 위해 새 provider나 서비스 callback을 추가하지 않았다.

## 검증 (2026-11-03)

PC 1920px에서 Feed12/Upcoming8/In Stock8과 4열, 제목44px·탭120×40px·목록 간격을 측정했다. scrollbar clientWidth1905px에서는 카드428.25×535.31px로 줄며 문서 넘침은 없다. 실제 로드된 사진·아이콘과 크롭을 확인했다. 로컬 에셋25개 이미지·4개SVG는 비어 있지 않으며 상세8개 source는2400×1947px이다. 공통 헤더의 홍보 배너와 로그인 표시는 Figma와 별도다.

최초 MO375px 검증에서 세 목록의 1열·44px분할탭·이미지반경0, 상세 캐러셀과 비활성17개사이즈, 네 URL의 가로 넘침 없음을 확인했다. 상세 더보기 펼침과 알림 클릭 후 URL 유지, IA의 런칭 검색과 기본/상세/Coming/In-stock 링크를 확인했다. 실제 신청·완료·저장은 실행하지 않는다. Next 빌드(타입 포함)·Panda·Storybook 빌드·변경 ESLint/Prettier는 통과했다. 공유 작업 트리의 링크/진행/그래프/라우트19개 중18개 통과, App Router manifest 검사는 동시 추가된 범위 밖 로그인·FAQ 두 URL이 빌드 목록에 없어 실패했다.

선별 커밋 검증: HEAD와 이번 스테이지로만 만든 저장소 밖 사본에서 TypeScript·변경 ESLint·App Router/preview-links/IA graph/screen-progress 검사19개가 모두 통과했다. 공유 작업 트리의 동시 변경 실패와 구분한다. IA의 상세 링크 클릭으로 실제 URL 진입도 확인했다.

## 모바일 탭 시안 정정 (2026-11-03)

사용자가 지목한 [RUN Club 모바일](https://www.figma.com/design/soQFEF6eeDjnQP7wY9Q96M/Main---PLP---PDP)의 Category Button Group과 버튼을 기준으로 수정했다. 기존 서비스의 사각 분할 탭을 참조했던 최초 구현 대신 높이32px, radius52px, 가로padding16px, 간격6px, 글자14px/500의 내용 너비 pill을 사용한다. 선택은 검정/흰 글자, 미선택은 흰 배경/검정 1px 테두리다. 탭 행은 상하16px이며 제목은28px/30.72px이다. PC 120×40px 탭과44px 제목, 세 상태 URL·탐색·1열 카드/상세는 유지한다.

정정 검증: MO375px의 세 목록에서 높이32px·반경52px·간격6px·선택 색상과 넘침 없음을 측정했다. PC1920px에서는44px 제목과120×40px 탭을 유지한다. TypeScript·변경 ESLint/Prettier·Panda·링크/진행 상태16개 검사를 통과했다.
