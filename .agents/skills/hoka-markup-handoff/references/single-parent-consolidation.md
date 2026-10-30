# 단일 production 부모 통합

[적용 원칙](../SKILL.md#적용-원칙)에 따라 서비스·시연 흐름을 먼저 분류한다. 이 지침은 남기는 표현과 로컬 UI를 정리하며 제거 대상의 서비스 상태를 다른 파일로 옮겨 보존하지 않는다.

## 소유권 확인

- `src/components`와 route-private `_components` TSX를 조사한다. 순수 helper·fixture·정책·hook·context·type 모듈은 컴포넌트 부모 수만으로 합치지 않는다.
- 설치된 TypeScript 설정/checker로 alias·barrel·re-export·namespace access·dynamic import를 실제 심볼까지 추적한다. 서로 다른 production 부모 모듈을 세고 stories·테스트·type-test·type-only는 제외한다.
- production 부모가 하나인 TSX 구현은 common UI를 포함해 부모 모듈에 둔다. 단, page 보조 UI는 `_components/`에 두는 [page 진입점 규칙](page-ownership.md)이 우선이다. 관련 private 부품은 기존 책임 모듈에서 함께 둔다.
- 여러 렌더는 재사용이 아니다. 통합 후 부모 관계를 다시 계산해 이전의 여러 부모가 하나가 된 후보도 점검한다. multi-parent 계약은 유지하되 기본값 전달 래퍼는 [래퍼 기준](wrapper-consolidation.md)으로 따로 판단한다.
- 0-production/story-only는 별도 분류한다. 통합 요청만으로 삭제하지 않는다. 명시적 미사용 정리나 특정 래퍼 제거 요청의 범위 안에서 참조·유용한 전용 story를 확인한다.

## 이동과 필요한 예외

- 구현·Panda 스타일·private 타입을 함께 이동한다. 함수 안에 컴포넌트를 선언하지 않고 module-level identity와 남기는 로컬 UI의 hook/state 수명을 보존한다.
- 심볼 기반으로 이름 충돌을 해결한다. property key·문자열·selector·asset 경로를 무작정 바꾸지 않는다. relative import는 원래 디렉터리 기준으로 해석하고 초기화 순서·native props/ref·DOM·스타일·접근성·반응형을 비교한다.
- 모든 runtime/type 소비자와 re-export를 갱신한 후 옛 파일을 삭제한다. 살아 있는 외부 type 소비자가 route import나 cycle을 만들면 필요한 type-only 계약 모듈만 유지한다. 사라진 서비스 시연을 위해 선언/adapter를 남기지 않는다.
- server/client·server Metadata·실제 deferred chunk 경계는 최소한으로 유지한다. server page를 client로 바꿔 통합하지 않는다. 예외마다 source·parent·구체적 기술 이유를 기록한다. 파일 길이는 예외가 아니다.
- page에는 Next가 지원하는 export/route props만 둔다. arbitrary preview props·named component export를 넣지 않는다.

## Storybook과 확인

stories는 `src/stories`에 두고 실제 page 또는 필요한 private 구현을 사용한다. 기존 typed router/context adapter는 남기는 UI 확인에 필요한 경우만 사용한다. 삭제한 서비스 플로우 때문에 새 provider를 만들거나 중복 화면을 유지하지 않는다. production은 stories에 의존하지 않고 declaration-only 계약은 runtime import하지 않는다.

통합 전후 ownership·실제 삭제 파일·공유 유지·미사용/스토리 전용·기술 예외를 기록한다. 이름/import 외 함수·JSX·style 차이를 검토하고 삭제 경로·cycle·page export를 검사한다. 관련 lint/format·타입·Panda·Next/Storybook·PC/MO 조작을 확인하고 실제 결과만 OKF에 기록한다.
