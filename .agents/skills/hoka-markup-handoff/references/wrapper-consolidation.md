# 래퍼 제거와 기존 소유자 옵션 통합

[적용 원칙](../SKILL.md#적용-원칙)을 따른다. 서비스·시연 흐름은 제거하고, 기본 표시·최소 UI 조작·비대상 호출부만 보존한다. 조사/스킬 수정은 소스 이관·미사용 삭제 권한이 아니다.

## 책임과 실제 소비자 판단

TypeScript 심볼을 기준으로 alias·barrel/re-export·namespace·dynamic import를 따라 실제 production 부모 모듈을 센다. stories·테스트·type-only는 수에서 제외하되 삭제 전 참조 조사는 별도로 한다. JSX 개수나 동일 모듈의 여러 렌더는 부모 수가 아니다.

| 관찰한 역할 | 선택 |
| --- | --- |
| props 이름 변경·label/placeholder/간격/타이포 기본값 전달뿐 | base를 직접 사용하고 기본값과 override 순서를 소비자에 옮긴다. 여러 소비자만으로 래퍼가 정당화되지 않는다. |
| 기존 소유자가 맡을 공통 optional 표현·로컬 조작 | 기존 컴포넌트의 작은 typed 옵션/variant로 수용한다. |
| production 부모가 하나 | [단일 부모 통합](single-parent-consolidation.md)을 적용한다. |
| production 미사용·story 전용 | 별도 보고하고 승인된 삭제 범위에서만 제거한다. |
| 실제 공용 동작·다른 도메인 책임·필수 runtime 경계 | 구체적 이유와 함께 유지한다. 파일 길이는 이유가 아니다. |

공용 구현을 소비자마다 복사하거나 compatibility forwarding/preset 파일로 우회를 재생성하지 않는다. 관찰 패턴·실제 소비자·제안 owner/API·실제 삭제 파일 수·유지할 계약을 기록한다. 살아 있는 파일에서 함수 하나를 지운 것을 파일 감소로 세지 않는다.

## 호환되는 작은 API

- 가장 가까운 책임 소유자를 사용한다. 도메인 frame은 공통 breadcrumb/gutter/지원 layout, 기존 control은 label/error/동의 표현을 맡는다. 인계 대상의 검증·인증·요청·저장·계산을 부모에 옮겨 보존하지 않는다.
- optional 모드는 기존 비대상 기본 호출부를 유지한다. 공유 breadcrumb base는 frame에서 한 번 만들고 남은 trail만 받는다. main landmark·너비·간격·일반 탐색은 보존한다.
- generated 설정과 custom slot은 discriminated union 등으로 상호 배타적으로 만든다. arbitrary object shape 감지, loose boolean 조합, 미사용 variant를 만들지 않는다. 없는 title/action/error가 새 DOM이나 여백을 만들지 않게 한다.
- props spread와 inputProps/titleProps/style 내부 기본값의 override 순서를 확인한다. 기존 native 속성·ref·generic value·checked/disabled/invalid·label/description·form 연결은 남기는 UI 범위에서 유지한다. 동의문 안의 링크/상세 버튼이 체크를 토글하지 않게 한다.
- named status/promotion 래퍼보다 label owner의 typed 옵션을 우선한다. 예: Badge.status/Badge.promotion. generated label과 children을 배타적으로 모델링하고 label 순서·중복·separator·empty·typography·className 위치를 보존한다. 상품/업무 데이터는 generic atom에 넣지 않는다.
- module-level 컴포넌트 identity와 로컬 UI 상태 수명, server/client·Metadata·유효한 lazy 경계는 유지한다. 이름 변경만을 위한 래퍼를 새로 만들지 않는다.

## 함께 이관·검증할 것

- parent gap과 footer 간격, conditional/hidden content, fixed bar·safe-area의 책임을 구분한다. 스타일 객체는 [Panda 병합 규칙](component-quality.md#panda-style-composition)대로 클래스 생성 전에 합친다.
- runtime/type import·re-export·dynamic fixture 경로·stories·IA 링크를 함께 갱신한다. 순수 이동은 기존 story ID/title을 유지하고 의도된 분류 변경은 관련 링크까지 갱신한다.
- 새 옵션·옵션 생략·비대상 기본 호출부, 불가능한 타입 조합, PC/MO geometry와 키보드/포커스를 확인한다. 제거된 서비스 플로우를 통과시키려고 mock/provider를 복구하지 않는다.
- 실행 서버가 현재 소스를 반영하는지 확인한다. 다른 채팅 서버를 임의로 종료하지 않는다. 자동 입력 실패는 실제 document focus·이벤트·상태부터 조사하고 컴포넌트 결함으로 단정하지 않는다.
- 혼합 변경은 현재 index 기준으로 선별한다. 다른 작업을 reset/overwrite/전체 재스테이징하지 않는다. 관련 OKF·index·log를 갱신하고 요청된 스테이징 시 okf:check를 수행한다. 정책 수정만이면 문서/스킬 검사만 수행한다.
