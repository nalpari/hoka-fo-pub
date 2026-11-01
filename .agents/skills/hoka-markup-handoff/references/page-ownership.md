# 라우트와 페이지 전용 UI 소유권

먼저 AGENTS.md·OKF·설치된 Next 문서를 확인한다. [적용 원칙](../SKILL.md#적용-원칙)에 따라 인계 대상 서비스 흐름을 제거한다. 스킬 수정/조사만으로 source 이동을 실행하지 않는다.

## 실제 소비자로 구분

- 파일명/Page suffix나 길이 대신 route import·default re-export·production/story/test 소비자를 확인한다.
- `src/app/{route}/page.tsx`는 라우트 컴포넌트와 Next가 허용하는 export/props만 가진다. page-private supporting UI·로컬 type·Panda는 `_components/`, 기존 순수 helper/fixture는 책임 위치에 둔다. 관련 작은 부품을 무조건 파일로 나누거나 전체 화면 forwarding wrapper를 만들지 않는다.
- 이 page 규칙은 [단일 부모 통합](single-parent-consolidation.md)의 예외다. page 보조 UI를 다시 page에 몰아넣지 않는다. 이미 적합하거나 보조 UI가 없는 route는 그대로 둔다.
- 여러 실제 route가 공유하는 화면/모달/도메인 조합은 `src/components`의 기존 책임에 둔다. 공유 화면을 route마다 복사하거나 production UI에서 다른 route의 page를 import하지 않는다.
- domain frame이 반복 breadcrumb·nav·폭·layout을 소유한다. 기존 owner의 typed optional layout을 우선하고 중복 main·whole-page wrapper를 만들지 않는다. body와 마지막 trail은 route가 맡는다.
- server Metadata/server-only 계약이 있는 진입점은 server로 유지하고 필요한 client UI만 `_components`에 둔다. 스타일 통일이나 통합만을 위해 server/client 경계를 바꾸지 않는다.
- 깊은 route에도 같은 원칙을 적용한다. fixed kind switch 자체는 재사용 근거가 아니다. 각 route에 해당 조합을 직접 두되 실제 공통 UI·hook은 공유한다. 제거할 검증/인증 타이머를 공용 hook으로 옮기지 않는다.

## 기본과 고정 상태 페이지

- 서로 다른 기본/preview route가 표현 컴포넌트와 typed 표시 옵션/fixture를 공유하도록 한다. 이는 실제 여러 route 소비자이지 불필요한 forwarding wrapper를 만들 이유가 아니다.
- 남기는 UI의 로컬 draft·open/close·선택 상태와 일반 탐색, route/search parameter의 의미를 유지한다. 서비스 검증/성공 redirect는 인계 기준대로 제거한다.
- Storybook은 실제 page 또는 필요한 private 구현을 참조한다. 유효한 router/context fixture 계약은 유지하되 서비스 시연만을 위한 adapter·type·registry는 사용처 확인 후 제거한다. 새 fake page props나 production→stories 의존성을 만들지 않는다.
- 폴더 이동 시 relative import는 원본 위치에서 해석한다. 기존 URL·일반 link·Suspense·DOM/스타일/반응형·form/접근성 연결을 보존하고 business flow 제거와 구조 이동을 구분해 검증한다.

## 예전 경로의 변경 반영

사용자가 요청한 patch만 현재 `src/components/common`·`src/components`·route 소유권으로 번역한다. base/current/incoming을 비교해 동시 편집을 보존하고 옛 `src/shared`/`features` 트리나 forwarding 파일을 복구하지 않는다. 원격 파일 전체로 덮어쓰지 않는다.

삭제 경로·retired alias·export·cycle·실제 PC/MO route/story를 점검한다. source 이동에 따라 관련 OKF 개념·출처·index·log를 갱신하고 수행하지 않은 검증을 완료로 기록하지 않는다.
