---
type: Architecture
title: '러닝세션 목록·상세 Figma 적용'
description: '러닝세션 목록과 상세의 PC/MO 규격, 표시 데이터와 신청 상태 검증을 기록한다.'
tags: [running-session, figma, responsive, binding]
status: draft
generated:
  by: codex/gpt-6
  at: '2026-11-02T04:21:59.926Z'
source_revision: 475a695edd648a64f9ab0f26c9f573bb279dba0d
working_tree_sources:
  - src/components/common/atoms/EmptyState.tsx
  - src/components/running-session/RunningSessionPage.tsx
  - src/components/running-session/runningSession.data.ts
  - src/app/running/running-session/[sessionId]/page.tsx
  - src/app/running/running-session/[sessionId]/_components/RunningSessionSessionContent.tsx
  - src/components/common/atoms/Badge.tsx
  - src/stories/features/running-session/RunningSessionPreview.tsx
  - src/stories/features/binding/RemainingBinding.stories.tsx
sources:
  - id: figma-running-session
    resource: https://www.figma.com/design/qyXJp4bnoeYSQxQULV8Wql/-HOKA-Design?node-id=1559-21804
    title: 'HOKA RUN CLUB 1559:21804'
---

# 러닝세션 목록·상세 Figma 적용

2026-11-02 사용자가 지정한 /running/running-session과 /running/running-session/yeouido-night에 적용했다. 원본 섹션에서 PC 목록 1559:21355·빈 목록 1570:22948·상세 1570:23289·신청예정 1570:25306, 모바일 목록 1585:27604·빈 목록 1607:28167·상세 1607:29572와 고정 CTA 1616:9316을 확인했다. 필요한 카드·신청 정보·안내·CTA 자식 노드도 읽었다. 동일 섹션의 모집 마감·모바일 미리보기는 기존 상태 표시와 공유 컴포넌트 경계를 유지했다. 헤더·일반 사이트 푸터의 추가 디자인 변경은 하지 않았다.[^figma-running-session]

## 목록

- PC 본문 최대 1532px·상단/하단 96px, 제목 EN heading4 50px/900·32px 설명 간격·40px 필터 간격이다. 정상 PC 필터는 40px 높이의 기존 Button short이며 8px 간격이다.
- PC 카드 4열·가로 16px·행 96px, 최대 이미지 371×494px(기존 3:4), 사진/배지 간격 20px·배지/제목 14px·제목/일정 16px·본문/자세히 보기 26px이다. 자세히 보기는 140×48px이다.
- 모바일 상단 48px·좌우 16px, 제목은 시안의 한글 font face를 명시한 headingKr3 36px/900, 설명은 body3 16px이다. 텍스트 그룹 최대 316px·제목/설명 24px이며 신청내역 링크를 필터 위 별도 행에 표시한다.
- 모바일 필터는 검정/회색 동일 폭·44px, 카드 사진은 화면 폭 정사각형이다. 카드 텍스트는 16px 패딩·20px 제목·16px 일정이다. 카드 사이 하단 48px+목록 gap 16px을 두며 마지막 카드의 추가 48px은 생략한다. 본문 하단은 72px이다.
- 사진 오버레이 날짜·장소는 36px, 두 줄 사이 8px이다. 기존 PNG 사진·세션 ID·일정·필터 결과 데이터는 유지했다. PC 이미지 sizes는 실제 4열·1200px 최소 캔버스·최대 371px, 명시적 모바일은 100vw에서 계산한다.
- 빈 목록은 기존 /preview-empty URL을 유지한다. PC 484×48px 분할 필터·516px 안내 영역·안내 아래 신청 내역 링크·하단 160px, 모바일 44px 필터·504px 안내 영역과 body4 14px 문구를 적용한다.

## 상세

- PC hero 최대 1340px·640px 정사각 이미지/정보 열·60px 간격·상하 96px이다. 제목 36px/900·일정 20px, 배지/제목 12px·제목/일정 16px, 주요 그룹 32px·안내/버튼 40px이다. 모바일 이미지 전체 폭·제목 28px·일정 16px·좌우 16px·아래 72px이다.
- hero 사실 정보는 dl/dt/dd를 유지한다. 라벨 열 58px·간격 16px, 상하 32px·행 간격 24px이며 모바일도 본문 16px을 사용한다. 보조 설명은 14px·상단 4px이다.
- 안내 배경은 기존 black.10(#F7F7F9), PC 상하 96px·좌측 72px 기준의 최대 1558px 그리드(858/640px·60px 간격)이다. 모바일 위 48px·아래 72px·좌우 16px·포스터/안내 사이 64px이다. 포스터는 기존 세션 카테고리의 내용을 유지하며 PC 제목 84px·모바일 42px, eyebrow PC 42px·모바일 28px이다.
- 안내 표 행은 상하 24px·라벨 60px·간격 16px이다. 안내 본문은 16px, 표 내용 14px, 주의 사항은 PC 14px/모바일 12px이다.
- 고정 신청 바는 모바일 좌우/위 16px·아래 max(32px, safe-area)와 48px 버튼이다. 모집중/모집마감/신청예정의 기존 문구·disabled를 유지한다. footer 뒤 96px+safe-area로 가림을 방지한다.
- PC 보조 이미지 자리 표시는 최대 1776px·2.6667 비율·상하 96px이다. showSupplementalImagePlaceholder를 명시한 여의도/기존 북촌 fixture에서만 표시한다. 실제 운영 사진은 연결되지 않았다. 추천 상품은 기존 products 표시 데이터와 Carousel을 유지하며 섹션 폭 1776px·간격 16px·제목 36px을 scope 안에서 지정했다. 모바일 추천/보조 이미지 숨김은 유지했다.

## 공통 배지와 표시 데이터

Badge.runningSessionCategory의 production 사용처는 목록·상세 두 곳이다. 이 모드만 8px 패딩·EN body4 14px/400·Road #E1FF04·Trail #5E661F로 맞췄다. 일반 배지·status·promotion 모드는 변경하지 않았다. 제목·날짜·사진은 기존 데이터와 외부 Context를 읽으며, 디자인에 등장한 북촌/북악산 내용을 여의도 ID에 덮어쓰지 않았다.

applicationOpeningLabel은 연결 소유자가 전달하는 신청 시작 표시 문구다. 기존 미연결 신청예정 날짜는 fixture와 Storybook에 옮겼고, 운영 데이터에 이 값이 없으면 임의 날짜를 만들어 표시하지 않는다. showSupplementalImagePlaceholder는 시안용 표시 옵션이며 ID로 추정하지 않는다.

## 신청 연결과 검증

기존 RunningSessionDataContext.detail과 useRequestAction을 유지한다. 상세 경로 조회의 session/facts/guide/recommendedProducts는 현재 Context에서 읽는다. apply(session.id) 완료 전 성공 안내를 표시하지 않고, request.pending/binding.pending을 hero/고정 신청 버튼에 전달해 요청 중 비활성화한다. 실패는 기존 alert에 남기고 상세를 유지한다. 성공 후 세션/신청내역 갱신·오래된 응답 폐기는 연결 소유자의 책임이다. 새 API·결제·인증은 구현하지 않았다.

> 2026-11-05 현행화: `RunningSessionDataContext.detail`과 `useRequestAction`은(는) 2026-11-02 [전체 화면 퍼블리싱 인계](state.md#전체-화면-퍼블리싱-인계-2026-11-02)에서 제거됐다. 현재는 준비된 표시 데이터와 로컬 UI 조작만 있으며 연결 경계는 [데이터 바인딩](data-binding.md#현재-연결-경계-2026-11-05)을 따른다.

기존 Integration/RemainingBinding RunningSessionApplication을 수동 완료 Promise로 보강하고 모바일 시나리오를 추가했다. api-session-99의 늦은 응답·제목 교체·정원 45명/예약금 8,000원·pending disabled·실패 유지·재시도·완료 후 성공 안내를 PC/MO에서 실행해 data-running-application-result=passed를 확인했다. Storybook 검증용 응답 버튼은 제품 UI에 포함되지 않는다.

실제 앱에서 PC 1920px(clientWidth 1905px)의 목록 1532px·카드 371px·제목 50px, 상세 이미지 640px·제목 36px·안내 그리드 858/640px을 측정했다. 모바일 375px(clientWidth 360px)의 제목 36px·분할 필터 44px·전체 폭 사진·상세 제목 28px·고정 버튼 48px·가로 넘침 없음, 빈 목록 504px·14px 문구, 모집마감/신청예정 disabled를 확인했다. 목록 필터와 미연결 신청 준비 안내·Escape 닫기도 확인했다. 이미지 8개의 로드와 기존 10개 PNG 경로 검사를 통과했다. 세로 scrollbar 15px·배너 50px 차이는 Figma와 구분한다. 실기기 모바일의 overlay scrollbar와 전수 시각 회귀를 검증한 것은 아니다.

앱의 상세 한글 제목은 Pretendard-Black custom font 사용을 확인했다. 기존 next/font/local과 Storybook 별도 face 등록은 유지한다. 최종 검사 결과와 추가 Storybook 상태 확인은 아래 후속 기록에 추가한다. 검증 주체: codex/gpt-6, 2026-11-02T04:21:59.926Z.

[^figma-running-session]: 사용자가 제공한 Figma 링크의 지정 노드와 필요한 하위 노드를 읽고 화면 export와 대조했다. 원본을 수정하지 않았다.

## 공통 EmptyState 재사용과 최종 검증

사용자가 지적한 러닝세션 빈 안내의 직접 Center/Stack/Typography 구성을 제거하고 기존 EmptyState(title, action)를 재사용했다. 공통 owner에 선택적 className과 typed titleProps(variant/mo/weight/tone/className)를 추가해 영역 높이·본문 타이포를 호출자가 지정한다. 기존 standard/minimal 기본값·제목 heading7·설명/액션·compound API는 유지한다. 러닝세션은 EmptyState 한 개로 PC 516px·body3, MO 504px·body4를 표시하며 신청 내역 action은 PC에서만 전달한다.

지정 두 URL의 PC/MO 실측·이미지·필터·신청 안내를 확인했다. 빌드된 Storybook의 PC/MO 빈 목록과 상세 open/closed/upcoming 8개 상태에서 484×48/44px 필터·516/504px 안내·48px 버튼과 disabled·포스터 84/42px을 확인했다. Badge Filled 기본 스토리는 기존 배송완료 표시를 유지했다. Integration/RemainingBinding의 PC/MO 신청 시나리오에서 비표준 ID·늦은 응답·교체·pending·실패/재시도·성공을 실행했다.

Panda 생성·타입 검사·대상 ESLint/Prettier·Next/Storybook 빌드와 기존 이미지 경로 검사 2건을 통과했다. 전체 lint는 작업 범위 밖 FindAccountContent.tsx의 css와 signup/complete/page.tsx의 Stack 미사용 import 2건으로 실패했다. 실서비스 호출·결제는 검증하지 않았으며 연결 소유자의 작업으로 남는다. 픽셀 일치율은 산출하지 않았다. 최종 문서 갱신: codex/gpt-6, 2026-11-02T04:28:10.019Z.

공통 EmptyState의 기본/Minimal 스토리를 빌드 결과에서 재확인했다. 두 제목은 기존 28px/900을 유지하고 standard 위 96px·아래 160px, minimal 위 42px·최소 높이 180px을 확인했다. 러닝세션 호출의 PC 516px·16px·링크 1개, 모바일 504px·14px·링크 없음도 확인했다.

## 카드·정보·하단 바 공통 재사용 (2026-11-02)

목록 카드는 Card, 상세 세션/코스 정보는 DescriptionList, 모바일 고정 신청 바는 OrderActionBar.mobileOnly를 재사용한다. 카드 article·정보 dt/dd·모바일 전용 행·58/60px 라벨 열·안전 영역·기존 신청 버튼/콜백을 유지한다. 신청 내역은 Badge.textProps와 Divider의 vertical 옵션으로 기존 글꼴과 선을 보존한다. [전체 공통 판단과 실제 비교](common-reuse-audit.md)를 참고한다.

전수 대조 검토: codex/gpt-6, 2026-11-02T05:57:28Z. 미커밋 변경 출처는 [조사표](common-reuse-audit.md)의 working_tree_sources에 기록한다.
