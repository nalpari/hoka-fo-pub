---
type: Reference
title: '에러와 빈 상태 디자인 가이드'
description: '에러·페이지 전체 빈 상태·콘텐츠 내부 빈 상태의 표시 범위와 적용값을 기록한다.'
tags: [components, figma, empty-state, responsive]
status: draft
updated: '2026-11-26T06:52:35Z'
generated:
  by: codex/gpt-6
  at: '2026-11-04T02:27:53Z'
source_revision: 4ed6220b093ea650acdcdd23b230739a17ede977
working_tree_sources:
  - AGENTS.md
  - src/components/catalog/ProductListingPage.tsx
  - src/app/checkout/_components/CheckoutStatePreview.tsx
  - src/app/mypage/orders/_components/OrdersList.tsx
  - src/app/checkout/_components/CheckoutForm.tsx
  - src/app/cart/_components/CartEmptyState.tsx
  - src/components/common/atoms/EmptyState.recipe.tsx
  - src/components/common/atoms/EmptyState.tsx
  - src/components/common/organisms/SystemStatusPage.tsx
  - src/app/mypage/_components/MyPageProductHistory.tsx
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

## 타이포 props 제거와 독립 빈 안내 통합 (2026-11-18)

현재 계약은 이 절을 기준으로 하며2026-11-17의 Typography props를 호출자에 남긴다는 설명은 당시 상태의 기록이다. 지금은18개 파일·20개 EmptyState 호출에서 스타일 props를 제거했고 의미 태그용 as만 남겼다. 기본/화면별 타이포는 recipe className이 소유한다. 외부 titleProps/descriptionProps API와 compound 부품은 호환용으로 유지한다.

| 별도 Typography가 있었던 이유                          | 현재 관리                                           |
| ------------------------------------------------------ | --------------------------------------------------- |
| 기본 제목 PC28/MO16과 리뷰·상품내역·배송지의 MO22 차이 | title 슬롯의 layout 스케일                          |
| 문의·FAQ·검색·상품문의의 작은 body 글꼴과 색           | body title 및 primary/subtle/tertiary 슬롯 스타일   |
| 설명 기본16px와 MO14px 차이                            | description 슬롯의 layout 스케일                    |
| 한글 자동 글꼴 선택·자간·줄높이와1px 이동              | 내용의 한글 여부와 recipe의 언어 기본값             |
| 외부에서 전달하는 기존 스타일 props                    | 종전 Typography 경로로 호환 유지                    |
| 장바구니/주문서/취소 내역의 별도 JSX                   | 공통 EmptyState의 cart/checkout/claimHistory layout |

장바구니 아이콘은 새 icon 슬롯, 두 링크는 기존 action 슬롯을 사용한다. 기존 HStack의 가로/세로 배치와 PC180px/MO전체 버튼 너비, cart root520/343px·48/32px 간격, checkout 상하80px·16px 간격, claimHistory 상하120/96px를 recipe가 소유한다. 링크/문구/부모 상태와 의미 태그는 유지한다. 배송지 action 영역180/322px도 recipe로 이동했다. 정상 목록·카드·헤더·폼의 Typography까지 일괄 바꾸지는 않았다.

추가 검증 URL은 /cart/preview-empty, /checkout/preview-empty, /mypage/returns/preview-empty다. 앞선19개와 함께 PC1440/MO375 총44개 비교에서 측정 위치·크기·타이포와 가로 넘침 없음이 일치했다. 영문/한글 Fragment/legacy override 등의 별도14개 타입 스타일/태그 비교도 통과했다. 전체 빌드164개·관련 검사3개가 통과했고 전체 lint의 기존 미정의 전역8건은 남아 있다. 세부 계약·검증은 [UI 문서](ui.md#emptystate-타이포-클래스와-빈-안내-통합-2026-11-18)를 따른다. 출처: 사용자 요청·주석 질문과 해당 작업 트리, Codex 실제 확인.

## 안내문 태그 p와 actionContent의 역할 (2026-11-18)

모든 현재 EmptyState 호출은 titleProps.as 없이 기본 p로 안내문을 출력한다. EmptyState.Title도 기본 p이고 외부 명시 as는 호환용으로 허용한다. 이전 태그 보존 설명은 이번 사용자 지시로 대체되며 시각 스타일은 그대로다. 중복 titleProps={{ as: 'p' }}11곳을 제거했고 대표 PC/MO12개 비교에서 태그 외 측정값이 같았다.

actionContent는 새 외부 prop이 아니라 action ReactNode를 배치하는 내부 recipe 슬롯이다. 배송지180/322px 너비와 장바구니 HStack·버튼 너비를 소유한다. 기존 action 슬롯은 독립 EmptyState.Action의 mt8px 계약을 유지하기 위해 분리되어 있다. slot을 무조건 합치면 일반 action 영역에도 독립 compound의8px 여백을 적용하게 된다. 기존 영역을 새 스타일 소유자에 연결한 것이며 슬롯 추가만을 위한 DOM wrapper를 만들지는 않았다.

## 장바구니 제목 확대와 추천 영역 간격 (2026-11-18)

현재 cart layout 제목은 사용자 검수 지시에 따라 Pretendard900·PC28px/MO22px·120%·-0.02em·검정·가운데 정렬이다. 이전 body16px 유지 설명은 당시 작업 기록이며 이 기준으로 대체된다. 빈 안내와 추천 상품 사이의 Stack gap은 PC96px/MO72px로 CartEmptyContent가 소유한다. 실제 PC/MO 계산 스타일·Pretendard-Black glyph·영역 간격96/72px 및 가로 넘침 없음을 확인했다. [검증 상세](ui.md#빈-장바구니-제목과-추천-영역-간격-검수-2026-11-18).

## 장바구니 세로 간격 최종 검수 (2026-11-18)

빈 장바구니의 현재 PC/MO 간격은 헤더→안내 영역72/40px, 안내 그룹→버튼40/32px, 버튼 영역→추천 상품96/72px이다. 첫 값은 빈 상태 route의 기존 OrderPageLayout paddingTop 옵션, 둘째는 EmptyState cart recipe root gap, 마지막은 CartEmptyContent 부모 Stack gap이 소유한다. PC1538/MO375에서 해당 rect 간격과 가로 넘침 없음을 확인했다. 제목28/22px·900·p 태그는 유지한다.

## 기획에 없는 주문서 빈 화면 제거 (2026-11-18)

사용자 기획 범위 확인에 따라 주문서 상품 없음 전용 경로와 CheckoutEmptyState, preview 상태 분기 및 공통 EmptyState의 checkout 전용 스타일을 제거했다. IA 171의 해당 보조 링크·소스 등록도 제거하고 정식 명령으로 의존 그래프를 갱신했다. 기본 주문서와 다른 주문서 상태 경로는 유지한다. 위의 빈 주문서 통합·검증 기록은 삭제 전 이력이다. 출처: 사용자 검토와 현재 작업 트리.

## 검색 결과 없음 제목·설명 분리 (2026-11-18)

검색 빈 결과의 Fragment와 br을 title·description으로 분리했다. EmptyState의 search layout recipe가 제목 PC28px/MO22px·900·행간120%·검정, 설명 PC16px/MO14px·400·행간150%·#4D4D4D, 자간-0.02em과 문장 간격16px을 소유한다. PC 상단160px, 모바일 상하96px 최소 여백과 남은 콘텐츠 높이를 이용한 중앙 배치를 적용한다. 공통 기본 variant와 다른 layout, 데이터·상태 소유자는 유지했다. 기준은 [검색 결과 없음 PC·모바일 시안](https://www.figma.com/design/qyXJp4bnoeYSQxQULV8Wql/-HOKA-Design)과 사용자 제목·설명 분리 요청이다.

PC1920×1080/MO375×812에서 별도 p 두 개, 계산 타이포·간격16px과 실제 Pretendard Black 제목 글리프·가로 넘침 없음을 확인하고 스크린샷을 검수했다. 공통 홍보 배너·헤더·스크롤바 차이는 유지한다. 전체 화면의 픽셀 일치를 의미하지 않는다. 타입 검사·관련 테스트2개·수정 파일 lint 통과. 기존 스테이지는 유지하고 이번 변경은 작업 트리에만 반영했다.

## EmptyState 제목 한 단계 축소 (2026-11-18)

사용자 공통 결정에 따라 heading형 제목의 PC28px→22px·900, 모바일22px→20px·700을 적용했다. 공통 기본 제목·큰 모바일 제목과 cart/search override를 같은 recipe에서 갱신하고, 본문형 안내 및 설명 타이포는 유지한다. 앞선 시안 수치보다 이번 사용자 결정이 우선한다. 기본 variant와 명시적 standard는 유지했다. 장바구니 PC1440/MO375에서 계산 글자 크기22/20px·굵기900/700·행간26.4/24px과 가로 넘침 없음을 확인했다. 수정 recipe lint·관련 타입 테스트2개가 통과했다. 기존 스테이지는 유지하고 이번 변경은 작업 트리에 둔다. 출처: 사용자 브라우저 검토와 현재 recipe·타입 테스트.

## EmptyState 고정 디자인 규칙 (2026-11-18)

2026-11-27 사용자 브라우저 주석에 따라 heading형 제목은 PC 20px·모바일 18px, 양쪽 모두 Regular(400)·행간 120%를 사용한다. 본문형 안내와 설명은 기존 개별 계약을 유지한다. 작업 지침은 [AGENTS.md](../../AGENTS.md#emptystate-fixed-design-rule), 적용 범위와 검증은 [EmptyState 공통 규칙](ui.md#emptystate-고정-디자인-규칙-2026-11-18)에 기록한다.

## 주문 조회 없음 PC 시안 반영 (2026-11-18)

현재 [HOKA 화면 시안](https://www.figma.com/design/qyXJp4bnoeYSQxQULV8Wql/-HOKA-Design)의 주문 상품 없음 화면과 사용자 브라우저 주석을 기준으로 OrdersList.tsx의 빈 목록에서도 PC 표 헤더를 표시한다. 빈 화면의 필터/표 간격32px, 표 헤더 높이67px·컬럼536/108/200px·상단2px/하단1px 검정선, 제목 Pretendard20px·700·행간24px·자간-0.02em·검정색을 적용했다. 상품이 있는 목록의 기존 표 스타일은 유지한다.

EmptyState.recipe.tsx의 orders layout만 PC 높이267px·가로/세로 중앙 정렬·하단 #E9EAEB 1px, 본문16px·400·행간24px·자간-0.02em·#4D4D4D로 변경한다. 모바일은 기존 padding96/160px·헤더 숨김·필터 배치를 유지하되 후속 사용자 지정에 따라 안내문14px·400의 행간만 기존18.2px에서21px로 수정한다. 본문형 안내이므로 heading 고정 디자인 규칙은 적용하지 않는다. OrdersStatus.tsx의 PC 조회 버튼은 날짜 입력과 수직 중앙 정렬하고 모바일 start 정렬은 유지한다. 공유 필터를 사용하는 기본 주문/취소 내역에도 PC 정렬이 적용된다.

실제 검증: PC1920/1440과 MO375에서 계산 스타일·위치·스크린샷, PC 컬럼536/108/200px·빈 영역267px·버튼/날짜 중심차0px, 안내문 PC16/24px·MO14/21px와 Pretendard-Regular 실제 글리프 사용을 확인했다. 기본 주문 목록과 취소/반품 빈 화면도 PC1440/MO375에서 확인했으며 가로 넘침은 없었다. 대상 ESLint·Prettier·TypeScript·Panda와 기존 EmptyState 계약 검사2개가 통과했다. 전체 lint/프로덕션 빌드는 실행하지 않았다. 초기 모바일 전후 자동 비교는 탐색 timeout으로 완료되지 않았으므로 픽셀 보존 검증으로 기록하지 않는다. 최종 모바일 화면과 원래 소스의 배치 계약을 확인했다.

출처: 사용자 요청/브라우저 주석, 위 세 소스의 현재 작업 트리 및 현재 시안 읽기 결과. 기존 route·fixture·표시 데이터/콜백 계약은 유지하며 서비스 연결 경계는 바꾸지 않았다. hoka-markup-handoff 최종 검수에서 기존 소유자·Panda 배치·명시 standard와 로컬 조작/PC·MO 경계를 확인했다. 기록: Codex, 2026-11-18.

## 취소/반품 빈 목록 PC 표 헤더 (2026-11-18)

현재 [HOKA 화면 시안](https://www.figma.com/design/qyXJp4bnoeYSQxQULV8Wql/-HOKA-Design)의 취소/반품 상품 없음 화면에 따라 ClaimHistoryList는 PC 빈 목록에서도 상품정보·주문일자·수량·금액·처리상태 헤더를 표시한다. 844px 영역의 컬럼은344/120/120/140/120px이며 헤더 높이67px·상단2px/하단1px 검정선과 Pretendard20px·700·행간24px·자간-0.02em·#000을 사용한다. 상품이 있는 PC 목록도 같은5개 컬럼을 사용하고 수량은 전달받은 line.quantity를 그대로 표시한다. 모바일 목록과 빈 안내에는 PC 헤더를 추가하지 않는다.

EmptyState의 claimHistory layout은 PC 높이267px·중앙 배치·하단 #E9EAEB 1px, 안내16px·400·행간24px·#4D4D4D로 맞췄다. 모바일은 기존 padding96px·본문14px·행간18.2px와 무테두리를 유지한다. 주문 없음의 별도 모바일21px 지정과 혼동하지 않는다. heading형 제목 규칙은 본문형 안내에 적용하지 않았다.

실제 검증: PC1920/1440의 빈/유상품 취소 목록에서5개 헤더,344/120/120/140/120px 컬럼·높이67px·20/700/24px·검정색·빈 영역267px·16/24px·하단선을 실측하고 캡처했다. MO375의 빈/유상품 목록은 헤더 없이 기존 표현을 유지하며 날짜/조회는 상시 보이고 수직 중심차0px와 가로 넘침 없음이다. 문의 모달 기본 화면도 PC1920/1440·MO375에서 입력 상시 표시와 버튼 중심차0px를 확인했다. 출처: 사용자 요청·현재 시안의 구조/수치, OrdersList.tsx와 EmptyState.recipe.tsx 작업 트리. 마지막 hoka-markup-handoff 검수에서 기존 컴포넌트/상태 소유자·Panda·PC/MO·바인딩 경계를 확인했다. 기록: Codex, 2026-11-18.

## 빈 화면 사용자 검토 현황과 최근 본 상품 줄바꿈 (2026-11-18)

사용자 완료 표시: 장바구니, 검색, 런칭캘린더 Feed/Upcoming, 주문/배송조회, 취소/반품내역, 작성 가능/작성한 상품리뷰, 관심상품. 주문서 상품 없음은 삭제했다. 상품 목록 필터 결과 없음·상품 상세 상품문의 없음·러닝세션 없음은 재디자인 대상으로 남긴다. 완료 표시가 없는 다른 EmptyState 화면은 미확인으로 구분한다. 이는 사용자 검토 상태이며 추가 구현·검증 완료를 의미하지 않는다.

최근 본 상품 빈 안내는 PC에서 14일간 유지됩니다. 앞에 br을 넣고 모바일의 기존 문구·자동 줄바꿈은 유지했다. MyPageProductHistory의 기존 플랫폼 소유자를 사용하고 스타일은 변경하지 않았다. 해당 파일 lint·TypeScript 검사가 통과했으며 이번 줄바꿈의 브라우저 검증은 수행하지 않았다. 출처: 사용자 화면별 검토와 PC 줄바꿈 요청, 현재 작업 트리.

## 공지사항 빈 안내 plain 전환 (2026-11-18)

사용자 검토에 따라 공지사항 빈 안내를 minimal에서 plain·notices layout으로 전환했다. recipe의 notices가 본문 PC16px/MO14px·normal·subtle 색상과 기존 최소높이180px·상단42px을 소유한다. 공통 heading형 제목22/20px 규칙과 구분되는 본문형 안내다. 목록·pending/error 조건과 기본 EmptyState variant는 유지한다. 출처: 사용자 브라우저 검토, NoticesList.tsx와 EmptyState.recipe.tsx.

## 테이블형 plain 빈 안내 공통 크기 (2026-11-18)

사용자 확정 규칙: PC 영역 min-height220px, 모바일 height/min-height120px, 문구 max-width320px과 가로·세로 중앙 정렬. 모바일 좌우12px을 유지하고 좁은 영역에서 텍스트 너비는 축소한다. 공통 recipe의 plain + table/notices/claimHistory/orderSummary 조합에 적용하며 generic table layout을 본문형으로 제공한다. 기존 테두리는 유지하고 과거 고정 높이·padding보다 이번 규칙을 우선한다. heading형 페이지·검색 plain 및 명시적 standard는 변경하지 않는다. AGENTS.md에 고정 규칙을 기록했다. 출처: 사용자 PC/MO 이미지와 요청·현재 EmptyState.recipe.tsx.

검증: 공지사항 PC1440에서 영역220px·문구320px, 모바일375에서 영역120px·문구304px/최대320px, 양쪽 center 정렬을 실측했다. lint·TypeScript·관련 테스트2개 통과. 최초 탐색은 load timeout이었으나 같은 페이지에서 로드 완료 후 확인했다. 기존 스테이지는 유지했다.

## 공지사항 모바일 빈 안내 상하선 (2026-11-18)

사용자 최신 검토에 따라 notices layout의 빈 안내 영역 자체에 모바일 border-top/bottom 각각1px solid #E9EAEB를 적용한다. 앞선 목록 루트 모바일 상단선 제거는 유지하고 중복선을 만들지 않는다. PC와 공통 빈 영역 높이220/120px·문구 최대320px은 유지한다. 출처: 사용자 모바일 주석과 EmptyState.recipe.tsx.

## 공지사항 모바일 빈 안내 높이200px 예외 (2026-11-18)

최신 사용자 결정으로 plain·notices의 모바일 height/min-height를200px로 변경했다. 공통 테이블형 모바일120px의 화면별 예외이며 과거 공지사항120px 기록보다 우선한다. PC최소220px·문구최대320px·모바일 상하 #E9EAEB 1px 선은 유지한다. 공통 table compound 뒤의 notices compound에서 관리하며 AGENTS에도 예외를 기록했다. 출처: 사용자 모바일 주석·현재 recipe.
