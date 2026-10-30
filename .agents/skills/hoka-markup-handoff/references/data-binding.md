# 서비스 의존성 제거와 표시 데이터 인계

이 문서는 기존 바인딩을 더 작동하게 만드는 지침이 아니다. [적용 원칙](../SKILL.md#적용-원칙)에 따라 **인계 대상 서비스·시연 흐름을 제거**하고 무엇이 고정 표시이며 개발팀이 어디에 연결해야 하는지 구분한다. 현재 계약은 저장소 `okf/architecture/data-binding.md`와 실제 소비자를 조사한다.

## 제거할 경로 추적

props 이름만 보지 말고 props/context → DTO/fixture lookup → 필터/정렬/금액/재고 판정 → 선택/입력 → 제출/저장 → pending/실패/성공 → 닫기/이동/refresh를 추적한다. 실제 API뿐 아니라 mock Promise·demo 인증·localStorage·시뮬레이션 타이머도 구별한다.

- prepared display data와 API DTO, 고정 fixture와 외부 소유 live collection, UI draft와 영속 상태, 로컬 조작과 업무 검증을 구별한다.
- 범위 안의 API·auth·persistence·업무 계산·상태 전이와 전용 adapter/helper/type 소비자를 제거한다. 공용 서비스 모듈은 다른 route의 사용처를 확인하고 비대상 계약을 끊지 않는다.
- provider per component·universal registry·서비스 mock engine·주입만을 위한 single-parent screen을 만들지 않는다. 의미 없는 onSubmit/onConfirm/no-op을 실제 바인딩 계약처럼 남기지 않는다. 필요 없는 page용 RoutePreview/선언 계약은 확인 후 제거한다.
- 표시 데이터에는 상품명·이미지·날짜·옵션·표시 금액·상태·선택 예시를 명시한다. 실제 색상/ID/개수로 fixture 여부를 추측하지 않는다. 고정 UI label/copy는 JSX에 둘 수 있다.
- 서버 목록의 total/next-page/loading/error는 서로 다른 표시 상태다. 부분 응답을 전체 catalogue처럼 재필터링하거나 pending/실패를 Empty로 표시하지 않는다. 인계용 상태는 fixture로 고정하고 실제 조회/재시도를 실행하지 않는다.

## 남기는 로컬 UI와 비대상 계약

입력 draft·체크·선택 스타일·비밀번호 보기·수량 UI·modal open/close만 필요한 기존 owner에서 유지한다. 합계·재고·성공/완료 결과와 연동하지 않는다. 표시 옵션이 임시 seed인지 외부 current props인지 명시하고, 고정 예시를 live 서비스 모델이라고 설명하지 않는다.

공용 비대상 live 소비자는 현재 props/context 변경을 계속 읽어야 한다. late response/refetch를 one-time initial state로 고정하거나 incoming 값으로 편집 draft를 effect에서 덮어쓰지 않는다. 이 보존 규칙을 인계 화면의 서비스 흐름 복구 근거로 사용하지 않는다.

## 개발팀 바인딩 주석

변경한 실제 표시 owner/type 근처에 정확히 `[ 개발팀 바인딩 ]`를 쓴다. exported React 컴포넌트 바로 위의 한국어 설명(English description)을 밀어내지 말고 같은 JSDoc의 별도 문단이나 해당 type/owner에 둔다. JSX 노드마다 반복하지 않는다.

- 현재 고정 fixture/표시 옵션과 미연결 기능을 사실대로 적는다. 실제 API가 있다는 식의 설명을 만들지 않는다.
- 개발팀 연결 소유자와 준비할 표시 모델·record/product/option ID·input/선택/동의 payload를 필요한 만큼 설명한다. 동작하지 않는 service callback/type을 설명만을 위해 새로 추가하지 않는다.
- 향후 요청 시점·pending/실패/성공/재시도·목록/count 갱신·stale response 처리 책임이 필요한 경계라면 미구현 책임으로 명시한다. 재시도 UI가 fixture면 실제 요청하지 않는다고 쓴다.
- 실제 서비스 연결이 별도로 이루어질 때 필요한 완료 전 성공 확인·실패 시 입력 유지·중복 방지·stale response 배제는 인계 요구로 설명할 수 있지만, 이번 퍼블리싱 코드에 Promise/검증/redirect를 재도입하지 않는다.
- read-only 표시에 불필요한 체크리스트를 붙이지 않는다. 주석 정책 수정만으로 전체 앱 주석을 정규화하거나 API 구현을 시작하지 않는다.

기존 주석 검색은 `rg -n '\[\s*개발팀 바인딩\s*\]' src`를 사용한다. 대상 경계 변경 시 unspaced marker를 spaced marker로 고치되 범위 밖은 그대로 둔다.

## 확인

기본/오류/Empty/Loading/Pending을 직접 진입하고 입력/선택 후 고정 상태 유지와 실제 요청·저장·인증·결제 이동이 없음을 확인한다. 비대상 공용 계약을 건드렸다면 해당 현재 값/late data·실패/재시도 계약이 손상되지 않았는지만 검증한다. 서비스 플로우 테스트를 고정 표시/로컬 조작 검사로 바꾸는 범위와 남은 미연결 책임을 OKF에 적는다.
