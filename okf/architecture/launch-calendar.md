---
type: Architecture
title: 런칭 캘린더
 description: 런칭 캘린더 시안과 직접 URL 및 표시 전용 인계 경계를 설명한다.
tags: [launch-calendar, figma, publishing, ia]
status: draft
source_revision: c69358e5221beb6df59a17886835b44505b7a4dc
working_tree_sources:
  - src/app/launch-calendar/page.tsx
  - src/app/launch-calendar/in-stock/page.tsx
  - src/app/launch-calendar/upcoming/page.tsx
  - src/app/launch-calendar/clifton-11-gtx/page.tsx
  - src/app/launch-calendar/_components/LaunchCalendarContent.tsx
  - src/app/launch-calendar/_components/LaunchCalendarDetail.tsx
  - src/app/launch-calendar/launchCalendar.data.ts
  - src/app/screen-index/screenConnections.ts
  - src/app/screen-index/storybookLinks.ts
  - src/stories/features/launch-calendar/LaunchCalendar.Web.stories.tsx
  - src/stories/features/launch-calendar/LaunchCalendar.Mobile.stories.tsx
sources:
  - id: launch-calendar-design
    resource: https://www.figma.com/design/soQFEF6eeDjnQP7wY9Q96M/Main---PLP---PDP?node-id=3696-9496
    title: Launch Calendar
---

# 런칭 캘린더

2026-11-03 사용자 수급 안내에 따라 삭제된 목업을 복구하지 않고, 현재 공통 ContentLayout·ContentHeader·ContentSection·Button·DescriptionList·SizeSelector·Carousel를 조합해 실제 화면을 추가했다. 상품 상세의 기존 구매 흐름이나 새 API·인증·저장을 만들지 않는다.

| IA  | 디자인 노드          | 화면                         | 확인 URL                                              |
| --- | -------------------- | ---------------------------- | ----------------------------------------------------- |
| 159 | 3696:9496, 3696:9503 | 캘린더 진입 / 발매 예정 상세 | `/launch-calendar`, `/launch-calendar/clifton-11-gtx` |
| 160 | 3696:9681            | Feed                         | `/launch-calendar`                                    |
| 161 | 3696:10052           | Upcoming                     | `/launch-calendar/upcoming`                           |
| 162 | 3696:9892            | In Stock                     | `/launch-calendar/in-stock`                           |

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

사용자가 지목한 [RUN Club 모바일 2921:5026](https://www.figma.com/design/soQFEF6eeDjnQP7wY9Q96M/Main---PLP---PDP?node-id=2921-5026)의 Category Button Group `2921:5050`·버튼 `2921:5052/5056/5060`을 기준으로 수정했다. 기존 서비스의 사각 분할 탭을 참조했던 최초 구현 대신 높이32px, radius52px, 가로padding16px, 간격6px, 글자14px/500의 내용 너비 pill을 사용한다. 선택은 검정/흰 글자, 미선택은 흰 배경/검정 1px 테두리다. 탭 행은 상하16px이며 제목은28px/30.72px이다. PC 120×40px 탭과44px 제목, 세 상태 URL·탐색·1열 카드/상세는 유지한다.

정정 검증: MO375px의 세 목록에서 높이32px·반경52px·간격6px·선택 색상과 넘침 없음을 측정했다. PC1920px에서는44px 제목과120×40px 탭을 유지한다. TypeScript·변경 ESLint/Prettier·Panda·링크/진행 상태16개 검사를 통과했다.
