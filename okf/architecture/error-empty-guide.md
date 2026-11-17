---
type: Reference
title: '에러와 빈 상태 디자인 가이드'
description: '에러·페이지 전체 빈 상태·콘텐츠 내부 빈 상태의 표시 범위와 적용값을 기록한다.'
tags: [components, figma, empty-state, responsive]
status: draft
updated: '2026-11-17T08:30:45.410738+00:00'
generated:
  by: codex/gpt-6
  at: '2026-11-04T02:27:53Z'
source_revision: 4ed6220b093ea650acdcdd23b230739a17ede977
working_tree_sources:
  - src/components/common/atoms/EmptyState.recipe.tsx
  - src/components/common/atoms/EmptyState.tsx
  - src/components/common/organisms/SystemStatusPage.tsx
  - src/components/mypage/MyPageProductHistory.tsx
  - src/app/mypage/_components/MyPageContent.tsx
sources:
  - id: error-empty-design
    resource: https://www.figma.com/design/qyXJp4bnoeYSQxQULV8Wql/-HOKA-Design
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

[^error-empty-design]: [에러/상품없음 가이드](https://www.figma.com/design/qyXJp4bnoeYSQxQULV8Wql/-HOKA-Design), 하위 섹션 기준. 412px·160px·154px·267px·320px·520px과 12px 주석을 확인했다. 화면 예시는 이미지이므로 제품 UI의 세부 타이포그래피·간격을 구조화된 실측으로 간주하지 않는다.

## EmptyState 기본값과 recipe (2026-11-17)

`<EmptyState title="내역이 없습니다." />`는 `variant="standard"`와 같다. `variant={undefined}`도 동일하다. standard는 기존 PC 위96px·아래160px·좌우16px, 모바일 좌우12px과8px 간격을 사용한다. minimal/plain/page/content는 기존 이름과 동작을 유지한다. component의 파라미터와 EmptyState.recipe.tsx의 defaultVariants가 standard를 함께 선언하므로 기존 호출자가 variant를 추가할 필요가 없다.

root/text/icon/action의 표시 스타일은 recipe가 소유하며 제목·설명의 글꼴은 기존 Typography와 titleProps/descriptionProps가 소유한다. 화면별 layoutProps와 _mobile은 recipe 기본값 뒤에 병합한다. page action은32px 간격, action이 없으면16px이며 content는16px이다. EmptyState.Action의 독립8px 상단 margin은 root의 action slot과 구분한다. 데이터·서비스 연결 책임은 화면 소유자에 그대로 있다.

2026-11-17 최근 본 상품·마이페이지 요약·주문·쿠폰·문의의 PC1440×900/MO375×900 총10개 경우를 기존 코드와 비교하여 측정한 위치·치수·스타일 일치를 확인했다. 최근 본 상품 PC/MO 스크린샷과 모바일 가로 넘침 없음도 확인했다. 타입 계약 검사에 생략·undefined·5개 명시 variant·override·compound API와 잘못된 variant 거부를 포함한다. 상세 검증/제한은 [UI 문서](ui.md#emptystate-recipe와-선택적-기본값-2026-11-17)에 기록한다. 출처: 사용자 요청과 두 EmptyState 작업 트리, Codex 검증.

## EmptyState 전체 사용처 스타일 점검 (2026-11-17)

Codex가 src 전체의 import·JSX·compound 및 이름 있는 export·클래스 선택자를 검색하고 TypeScript AST로 직접 호출을 추출했다. 16개 파일에17개 호출이 있으며 standard4개(생략3개 포함), minimal2개, plain5개, page5개, content1개다. compound/named 부품을 외부에서 직접 사용하는 운영 코드는 없었다. 아래19개 기존 URL을1440×900과375×900에서 직접 열어 실제 viewport·플랫폼 class·폰트 준비 후 계산 스타일과 치수를 측정했다. 38개 경우 모두 지정한 viewport와 플랫폼이 일치했고 문서의 가로 넘침은 없었다. 런칭캘린더·러닝세션·상품 목록·리뷰의 PC/MO와 FAQ 모바일 스크린샷도 직접 확인했다. 이번 점검은 시안의 전체 재측정이나 이전 버전과의 전체 비교가 아닌 현재 실행 스타일 감사다. 애플리케이션 소스는 수정하지 않았다.

| 화면과 확인 URL                                         | variant       | PC 문구 px/굵기 | MO 문구 px/굵기 | 확인한 레이아웃                                          |
| ------------------------------------------------------- | ------------- | --------------- | --------------- | -------------------------------------------------------- |
| 런칭 Feed `/launch-calendar/preview-empty`              | page          | 28/900          | 22/600          | PC 상하0px, MO 최소340px, 문구 간격16px                  |
| 런칭 Upcoming `/launch-calendar/upcoming/preview-empty` | page          | 28/900          | 22/600          | Feed와 같은 override                                     |
| 쿠폰 `/mypage/coupons/preview-empty`                    | minimal       | 28/900          | 16/600          | 최소180px, 상단42px                                      |
| 러닝 신청내역 `/mypage/event-entries/preview-empty`     | standard 생략 | 28/900          | 16/600          | 상단96px·하단160px                                       |
| 주문 `/mypage/orders/preview-empty`                     | standard      | 14/400          | 14/400          | 상단96px·하단160px, 부모 선택자가 제목 크기·색상 지정    |
| 작성 가능 리뷰 `/mypage/reviews/preview-empty`          | page          | 28/900          | 22/900          | PC 최소755px·상단160px, MO 상하0px·중앙 정렬             |
| 작성 리뷰 `/mypage/reviews/preview-written-empty`       | page          | 28/900          | 22/900          | 작성 가능 리뷰와 같은 레이아웃                           |
| 주문 요약 `/mypage/preview-no-orders`                   | content       | 16/400          | 14/400          | 제목 없이 설명만 표시, 최소높이267/154px                 |
| 배송지 `/mypage/addresses/preview-empty`                | page          | 28/900          | 22/900          | PC 최소795px·상단160px, MO 남은 영역 중앙, 액션 간격32px |
| 최근 상품 `/mypage/recent/preview-empty`                | page          | 28/900          | 22/900          | PC 최소795px·상단160px, MO 남은 영역 중앙                |
| 관심상품 `/mypage/wishlist/preview-empty`               | page          | 28/900          | 22/900          | PC 상단160px, MO 상단200px의 기존 예외                   |
| 재입고 알림 `/mypage/restock-alerts/preview-empty`      | page          | 28/900          | 22/900          | PC 상단160px, MO 중앙 및 -24px 위치 보정                 |
| 공지 `/support/notices/preview-empty`                   | minimal       | 28/900          | 16/600          | 최소180px·상단42px                                       |
| FAQ `/support/faq/preview-no-results`                   | plain         | 14/400          | 12/400          | root의 실제 상하 여백0px, 아래 즉시 개선 항목 참고       |
| 문의 `/support/inquiries`                               | plain         | 16/400          | 14/400          | 최소427/190px·중앙 정렬                                  |
| 상품 필터 결과 `/products/preview-no-results`           | page          | 28/900          | 16/600          | 상단96px·하단160px, action 간격32px, 필터 초기화 표시    |
| 검색 `/search/preview-no-results`                       | plain         | 16/400          | 14/400          | PC 최소470px·상단158px, MO 상하96px                      |
| 러닝세션 `/running/running-session/preview-empty`       | standard 생략 | 28/900          | 22/900          | 높이516/504px·중앙, PC 액션 간격24px·MO 액션 없음        |
| 상품 문의 `/products/preview-empty-inquiries`           | plain         | 16/400          | 16/400          | 제목 자체가 flex·최소120px·중앙, 상태 role 유지          |

### 즉시 개선할 선언

- FAQ의 FaqContent.tsx는 layoutProps에 py:'15'를 전달하지만 현재 생성 CSS에 .py_15 규칙과 --spacing-15 토큰이 없었다. root 클래스에는 py_15가 있지만 실제 paddingTop/Bottom은 양쪽 모두0px이다. 시안에 맞는 px 또는 유효한 spacing 토큰을 명시하고 css.raw로 정적 추출 가능한 선언을 전달하는 방식으로 보정할 필요가 있다. 15를 임의로60px이라고 확정하지 않는다. 코드 위치: src/app/support/faq/_components/FaqContent.tsx의 EmptyState 호출.
- LaunchCalendarContent.tsx의 emptyTitle에는 굵기900이 있으나 모바일에서는 Typography headingKr7의 모바일600과 충돌하여 실제22px/600으로 계산된다. Feed·Upcoming 양쪽에서 확인했다. Typography의 weight 옵션 또는 같은 모바일 조건에서 명시한 스타일로 우선순위를 확정할 필요가 있다. 이번 점검은 화면 보존 요청을 따라 수정하지 않았으며 현재900 선언이 모바일에 적용된다고 설명하면 안 된다.

### 추출 후보와 유지할 범위

- EmptyState.recipe.tsx가 소유하는 것은 root/text/icon/action의 공통 기본 스타일이다. titleProps·descriptionProps의 Typography, layoutProps와 호출자 className, 주문 목록의 부모 선택자까지 모두 recipe로 옮겨진 것은 아니다. 런칭·러닝세션의 &&, 상품 문의의 제목 className, 주문의 후손 선택자는 개별 표현이 남은 지점이다. 타입 옵션으로 정리한다면 기존 제목 태그와 플랫폼별 수치를 유지하고 같은 의미의 표현인지 먼저 확인한다.
- page의 PC 상단160px은 리뷰·상품내역·배송지에서 겹치지만 최소 높이755/795px, MO 계산식과 관심상품 상단200px 등이 다르므로 전체를 하나의 동일한 화면 규칙으로 바꾸지 않는다. minimal의 쿠폰/공지, 기본 standard의 신청내역, content의 주문 요약과 plain의 작은 본문은 현재 목적이 다르다.
- AccountDataList.tsx의 DataRows에는 standard 생략 호출이 있으나 src에 외부 소비처가 없어 실제 화면 URL 검증 대상에서 제외했다. InquiryListPreview.tsx의 state='empty' 분기는 존재하지만 현재 inquiryPreviews와 preview-list 진입점은 이 상태를 전달하지 않아 소스만 검토했다. 미사용 삭제나 새 URL 추가는 하지 않았다.
- AddressList의 embedded=true+빈 addresses는 체크아웃에서 서비스 데이터에 따라 가능한 분기지만 현재 고정 미리보기는 비어 있지 않아 실행 검증하지 않았다. 상품 InquiryBoard의 default 표현 분기도 현재 production 호출은 product만 전달하므로 실제 화면 검증과 구분한다. 이 두 분기의 스타일 계약은 소스로 확인했다.

출처: 사용자 요청, EmptyState.tsx·EmptyState.recipe.tsx와 위 호출 파일의 현재 작업 트리, Codex의2026-11-17 PC/MO 브라우저 측정. 소스 변경·서비스 동작 수정·새 디자인값 적용 없이 감사 결과만 기록했다.

2026-11-17 후속 정리: 주문 목록의 명시적 standard를 생략해 기본값 사용 방식으로 통일했다. 기존 기본값 생략 호출3개는 유지했고 page/content/minimal/plain과 검증용 명시 variant는 변경하지 않았다.

## 화면별 layout 사용 계약 (2026-11-17)

최신 사용자 지시에 따라 기존 variant="standard" 명시는 유지한다. 위 standard 생략 후속 기록은 취소되었으며 현재 주문은 variant="standard" layout="orders"다. variant 생략 가능 기본값과 명시값 유지 규칙은 함께 적용한다.

| layout                        | 기존 화면/표현                | recipe가 소유하는 차이                                      |
| ----------------------------- | ----------------------------- | ----------------------------------------------------------- |
| default                       | 별도 예외 없음                | variant 기본값                                              |
| history / wishlist / restock  | 최근 상품·관심상품·재입고     | 최소795px, PC위160px, MO 중앙/관심 위200px/재입고 위치 보정 |
| address / embeddedAddress     | 일반/모달 배송지              | 일반 최소795px과 모달 최소0px·위32px                        |
| reviews                       | 작성 가능/작성 리뷰           | PC최소755px·MO 남은 높이 계산                               |
| catalog / search              | 상품 필터/검색 빈 결과        | 상품 위96·아래160px, 검색 PC위158·MO상하96px                |
| inquiries / faq               | 문의/FAQ                      | 문의 최소427/190px, FAQ 실제상하0px 유지                    |
| orderSummary / orders         | 주문 요약/주문 목록           | 요약 하단선, 주문 제목14px·400                              |
| launch / runningSession       | 런칭/러닝                     | 기존 높이·중앙 배치·제목/설명 스타일                        |
| productInquiry / inquiryBoard | 상품 문의/기존 일반 문의 표현 | 제목의 최소120px flex / 상하48px·하단선                     |

운영 EmptyState 호출의 layoutProps와 전용 스타일 className은 위 layout 선택으로 이동했다. titleProps/descriptionProps의 Typography 옵션과 표시 콘텐츠는 호출자에 남는다. 외부 호출 호환을 위한 layoutProps/className API도 유지한다. 새 서비스 연결은 추가하지 않았다. FAQ의 미생성15 토큰과 런칭 모바일900/600 충돌은 이번에 실제 계산값0px/600을 명시해 정리했다. 시안에 따른 다른 값으로의 변경은 별도 확인 대상이다.

직전 코드와 비교한 PC1440/MO375의19개 URL·38개 경우에서 측정 root/title/직접 자식의 위치·크기·스타일이 일치했고 가로 넘침이 없었다. 상세는 [UI 문서](ui.md#emptystate-화면별-layout-통합-2026-11-17)를 따른다. 출처: 사용자 요청, EmptyState/recipe와 호출부 작업 트리, Codex 실제 확인.
