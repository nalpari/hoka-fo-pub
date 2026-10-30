# 폼 필드와 조합 재사용

[적용 원칙](../SKILL.md#적용-원칙)에 따라 검증·인증·요청·타이머·저장은 제거하고 필드 표현과 최소 입력 조작을 재사용한다. 같은 placeholder만으로 같은 계약이라 판단하지 않는다.

## 조사와 경계

- FormField/TextInput 조합·공용 wrapper·native input/textarea/select·selection control을 조사한다. helper·configuration 배열·adapter·alias·as 경로까지 추적하고 production/story/mockup/primitive 내부를 구별한다. source site·file·렌더 instance 수를 혼동하지 않는다.
- 실제 소비자·기존 shared API·반복 책임·제안 API·남길 UI 차이를 기록한다. label/error/hint·native 속성·DOM·레이아웃·로컬 조작을 비교하고 read-only 표시를 입력과 혼동하지 않는다.
- 기존 atom/molecule부터 사용한다. FormField+TextInput은 TextFormField의 기존 접근성/스타일 조합을 우선하며 이름/전화/비밀번호 wrapper가 기본값 전달뿐이면 직접 사용한다. 기본값 override 순서와 선택 값 타입을 보존하고 별도 preset 파일로 래퍼를 재생성하지 않는다.
- feature key/info object/domain option을 실제로 변환하는 adapter는 역할이 있을 때 유지하되 generic 필드에 feature model을 강요하지 않는다. 공통 label/error/consent 표현은 기존 control owner의 typed 옵션으로 수용한다.
- 주소 필드와 모달 조작을 공유할 수 있지만 실제 검색 요청·저장 플로우를 다시 만들지 않는다. local/domain 분리 이메일과 full email input, countdown 표시와 실제 시간 진행은 다른 계약이다. 필요한 countdown은 고정 상태 표시다.
- 전용 search/file/rating/size/quantity control과 compact/native 표현을 기존 책임에 둔다. 비슷한 radio의 yes/no·한국어 값이나 option generic을 재사용 때문에 바꾸지 않는다. global form builder/context/form library를 추가하지 않는다.

## 보존할 마크업·로컬 UI

| 경계 | 확인 |
| --- | --- |
| 접근성 | id-label, hint/error description, invalid, live region, focus |
| native form | name, form id, required/disabled/readOnly 의미, button type |
| 입력 속성 | type, autocomplete, inputMode, maxLength, placeholder, password 보기, ref/event |
| 값 소유권 | controlled/uncontrolled, defaultValue, reset, 남기는 로컬 draft 수명 |
| 표현 | DOM 순서/중첩, PC/MO 간격, conditional 영역, 줄바꿈, counter/disabled 표시 |

`*` 표시는 native required와 같지 않고 disabled는 form 수집에서 제외되며 readOnly와 다르다. 로그인 username/current-password를 가입 email/new-password 기본값으로 바꾸지 않는다. 속성 부재도 의도일 수 있으므로 preset을 강요하지 않는다.

필드 label/error/hint와 native inputProps를 구분하고 single-line/multiline discriminated union을 유지한다. union 속성을 누락하거나 타입 cast로 wrapper를 강제하지 않는다. 기존 input/counter 묶음이 필요하면 작은 composition slot을 사용하며 DOM wrapper를 늘리지 않는다. counter 단위·공백·천 단위 표시와 부모 gap을 보존한다.

## 제거할 흐름과 고정 오류

- 검증·normalization·중복 확인·인증 만료·resend·저장·성공 이동을 필드 컴포넌트로 옮겨 유지하지 않는다. UI 확인용 local value와 backend 제출 모델을 구별한다.
- 오류는 fixture/typed 표시 옵션으로 처음부터 보이고 입력/체크/submit으로 지워지지 않는다. native form 제출·검증 팝업이 의도치 않게 실행되지 않도록 버튼 type과 필요한 기본 submit 차단을 확인한다.
- 실제 [데이터 인계 경계](data-binding.md)는 미래 연결 소유자·필요한 input/선택 ID/동의 항목을 설명한다. 의미 없는 onSubmit/no-op·mock pending·성공 callback을 살아 있는 API 계약처럼 남기지 않는다.
- 비대상 공용 소비자의 form 계약은 유지한다. API 제거 전 모든 사용처를 조사하고, 미연결 인계 화면을 위해 다른 route의 공용 타입을 깨뜨리지 않는다.

기본/고정 오류·hint/label·입력/비밀번호 표시·옵션 조작·모달 닫기·PC/MO와 남기는 form 연결을 확인한다. 스타일·타입·lint·관련 build/story를 검증하고 확인하지 않은 서비스 동작은 미연결로 보고한다. 스킬만 바꾼 경우 앱 빌드는 필요 없다.
