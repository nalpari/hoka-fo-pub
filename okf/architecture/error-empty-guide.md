---
type: Reference
title: '에러와 빈 상태 디자인 가이드'
description: '에러·페이지 전체 빈 상태·콘텐츠 내부 빈 상태의 표시 범위와 적용값을 기록한다.'
tags: [components, figma, empty-state, responsive]
status: draft
updated: '2026-11-04T02:27:53Z'
generated:
  by: codex/gpt-6
  at: '2026-11-04T02:27:53Z'
source_revision: 4ed6220b093ea650acdcdd23b230739a17ede977
working_tree_sources:
  - src/components/common/atoms/EmptyState.tsx
  - src/components/common/organisms/SystemStatusPage.tsx
  - src/components/mypage/MyPageProductHistory.tsx
  - src/app/mypage/_components/MyPageContent.tsx
sources:
  - id: error-empty-design
    resource: https://www.figma.com/design/qyXJp4bnoeYSQxQULV8Wql/-HOKA-Design?node-id=2520-98509
    title: '에러/상품없음 가이드'
---

# 에러와 빈 상태 가이드

2026-11-04 확인한 가이드는 에러, 최근 본 상품의 전체 빈 화면, 마이페이지 주문 배송 내역의 영역 내부 빈 상태를 예시로 구분한다. 문서용 색상·글꼴은 제품 UI에 적용하지 않는다.[^error-empty-design]

| 구분         | 디자인 근거                                                                                 | 현재 적용                                                                                                                                   |
| ------------ | ------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| 에러         | 본문 중앙, PC 문구 최대 520px, 모바일 좌우 최소 12px                                        | `SystemStatusPage` 본문 최소 412px, 문구 최대 520px·좌우 12px. 모바일은 현재 50px 홍보 배너와 헤더를 제외한 뷰포트 영역 중앙                |
| 전체 빈 화면 | 최근 본 상품 PC 제목 영역 아래 여백 160px·문구 최대 520px, MO breadcrumb를 제외한 영역 중앙 | `EmptyState variant="page"`, 최근 본 상품 빈 상태만 사용. PC 기존 상위 gap을 제거해 제목 경계 아래 160px 확보. MO 높이는 화면 소유자가 지정 |
| 내부 빈 영역 | PC 높이 267px·문구 최대 320px, MO 높이 154px                                                | `EmptyState variant="content"`, 마이페이지 요약의 주문 배송 빈 영역에 적용. 문구를 수평·수직 중앙 배치                                      |

사용자는 모바일 버튼의 최대 너비를 PC 크기로 지정했다. 이에 에러 화면의 홈 버튼은 `width: 100%; max-width: 180px`로 PC와 동일한 최대 너비를 유지한다. 공통 `Button`의 다른 소비자는 변경하지 않는다.

`EmptyState`의 기존 standard/minimal/plain 기본값과 compound API는 유지한다. 페이지용 문구·높이·표시 여부는 기존 화면 소유자가 결정한다. 최근 본 상품 빈 화면은 기존 안내문을 제목 아래 설명으로 한 번만 표시하고 목록 화면의 하단 안내는 유지한다. 최근 본 상품 제목은 기존 Typography heading7/heading6, 내부 주문 빈 안내는 heading9/heading7·semibold를 사용한다. 이미지 예시에서 제품 글꼴의 원본 스타일 ID는 제공되지 않아 이 타이포그래피 매핑은 기존 토큰을 이용한 구현값이다. 에러 화면의 기존 글꼴·아이콘·문구·링크와 점검 정보는 유지한다.

MO 최근 본 상품의 높이 계산은 현재 홍보 배너 50px과 breadcrumb 80px에서 기존 겹침 24px을 뺀 합계 106px, 사이트 헤더 변수를 제외한다. 이 계산은 공통 EmptyState에 넣지 않고 `MyPageProductHistory`에 둔다. 중첩 `layoutProps`의 반응형 값은 `css.raw`로 추출하며 기본 모바일 padding과 병합한다. 320px은 좁은 화면에 가로 넘침을 강제하는 min-width로 지정하지 않는다.

## 표시 경계와 검증

서비스 요청·응답·인증·상태 판정·콜백과 고정 preview URL은 변경하지 않았다. 대상은 `/preview-not-found`, `/service-unavailable`, `/maintenance`, `/mypage/recent/preview-empty`, `/mypage/preview-no-orders`이며 새 상태 URL이나 IA 행은 만들지 않았다. 다른 화면의 빈 상태를 일괄 변경한 작업이 아니다.

2026-11-04 Codex가 1440×812·375×812 브라우저에서 대상 화면을 직접 열고 계산 스타일과 스크린샷을 확인했다. PC 에러 문구 520px, 버튼 180px, 내부 빈 영역 267px·문구 320px을 확인했다. MO 에러 문구 336px(375px viewport, scrollbar 제외 clientWidth 360px, 좌우 12px), 버튼 180px, 내부 빈 영역 154px·문구 320px을 확인했다. MO 최근 본 상품은 y=158px에서 높이 654px으로 남은 viewport를 채운다. 768px 모바일에서도 에러 버튼 180px을 유지한다. 대상 화면에 가로 넘침이 없고 에러 홈 링크가 포커스를 받을 수 있음을 확인했다. 에러 제목의 실제 글리프 폰트는 로드된 `Pretendard-SemiBold`였다.

최근 본 상품 기본 목록, 관심상품 빈 화면, 장바구니 빈 화면과 점검·서비스 오류 화면도 PC/MO에서 확인했다. 최종 PC 최근 본 상품 제목 경계 아래 간격은 160px, 문구 폭은 520px으로 측정했다. 전체 ESLint, 변경 TSX Prettier, TypeScript, Panda 생성과 최종 Next.js production build(145개 정적 페이지)가 통과했다. `hoka-markup-handoff` 기준으로 기존 소유권·Panda 추출·모바일 override 병합·콘텐츠 간격·서비스 경계 보존을 점검했다. 새 import의 `sourceGraph.generated.json` 의존성은 정식 생성 명령으로 갱신했다. 이 확인은 전체 소비자 시각 회귀나 서비스 바인딩 검증을 의미하지 않는다. Storybook 검증은 수행하지 않았다.

[^error-empty-design]: [에러/상품없음 가이드](https://www.figma.com/design/qyXJp4bnoeYSQxQULV8Wql/-HOKA-Design?node-id=2520-98509), 하위 섹션 2520:98510. 412px·160px·154px·267px·320px·520px과 12px 주석을 확인했다. 화면 예시는 이미지이므로 제품 UI의 세부 타이포그래피·간격을 구조화된 실측으로 간주하지 않는다.
