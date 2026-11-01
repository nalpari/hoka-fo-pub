---
name: hoka-markup-handoff
description: HOKA 퍼블리싱 인계를 위해 서비스·시연 흐름을 제거하고 고정 상태 URL과 컴포넌트 구조·스타일을 정리한다. 마크업 경량화, 상태 화면 분리, 래퍼·단일 부모 통합, 폼 재사용, Panda·반응형·Next.js 정리에 사용한다. 실제 서비스 구현이나 단순 번들 최적화에는 사용하지 않는다.
---

# HOKA 마크업 인계와 컴포넌트 정리

개발팀이 기본 화면과 각 상태의 마크업을 직접 열어 확인하도록 만든다. **서비스·시연 흐름 제거가 기본 원칙**이며, 그 결과물을 재사용 가능한 컴포넌트와 일관된 스타일로 정리한다. 이 스킬만으로 인계·재사용·구조·스타일 작업을 수행한다. 별도 component-reusability 스킬을 불러올 필요가 없다. 스킬 작성·수정이나 조사 요청만으로 실제 화면 변경이 허가되지는 않는다.

## 적용 원칙

- 기존 서비스 동작을 보존하는 별도 모드를 두지 않는다. 구조 정리 중에도 인증·요청·저장·삭제·합계 계산·업무 판정·결제 이동·mock 시뮬레이션을 보존하거나 다시 만들지 않는다.
- 보존하는 것은 HTML 의미·표시 스타일·PC/MO 배치·접근성·키보드/포커스와 확인에 필요한 최소 로컬 UI 조작이다. 일반 탐색 링크와 작업 범위 밖 사용처의 계약도 유지한다.
- 요청한 화면·컴포넌트와 명시적 제외 범위를 지킨다. 공용 컴포넌트 수정이 다른 화면의 서비스 계약을 끊지 않게 실제 사용처를 확인한다. 사용자 지시와 적용 가능한 프로젝트 규칙이 우선한다.
- 재사용 정리는 인계 작업의 품질 기준이다. 인계 요청을 이유로 무관한 전체 소스 마이그레이션·의존성 업그레이드·공용 컴포넌트 삭제를 수행하지 않는다. 조사만 요청하면 제안과 근거만 보고한다.
- 구조·스타일 참조 문서의 상태/콜백 보존은 **남겨 두기로 한 로컬 UI와 비대상 사용처**에 한한다. 서비스 계약 문서는 제거할 의존성과 향후 연결 책임을 식별하는 용도이며 실제 서비스 흐름 유지·재구현의 근거가 아니다.

## 필요한 지침 선택

작업하는 책임에 해당하는 문서만 읽는다. 상태 페이지 추가만으로 모든 재사용 감사를 실행하지 않는다.

| 작업 | 읽을 지침 |
| --- | --- |
| 마크업·Panda·Typography·Base UI·간격·구조 품질 | [컴포넌트 품질](references/component-quality.md) |
| 래퍼 제거·기존 부모에 typed 옵션 통합 | [래퍼 판단](references/wrapper-consolidation.md) |
| 단일 production 부모 통합·미사용 구분 | [단일 부모 통합](references/single-parent-consolidation.md) |
| page 진입점·라우트 전용 UI·공유 화면 소유권 | [페이지 소유권](references/page-ownership.md) |
| 폼 필드·라벨·오류·동의·주소/이메일 조합 | [폼 재사용](references/form-fields.md) |
| 제목·설명·본문·footer action 조합 | [콘텐츠 구성](references/content-sections.md) |
| 폴더 깊이·자동/고정 플랫폼·포털·PC 캔버스 | [폴더와 반응형](references/folder-and-responsive.md) |
| Link·Image·Font·URL 상태·Metadata·dynamic 경계 | [Next.js 통합](references/nextjs-integration.md) |
| 서비스 의존성 제거·표시 데이터·바인딩 인계 | [데이터와 인계 경계](references/data-binding.md) |
| 독립 확인이 필요한 상태 선정 | [상태 선정](references/state-matrix.md) |

## 공통 구조 기준

- `src/app`은 라우트, `src/components/common`은 공통 UI, `src/components/{domain}`은 실제 재사용되는 도메인 UI를 맡는다. 공유 UI 상태는 기존 context/hook 소유권을 따르고 `src/shared`나 `features` 중간 계층을 재생성하지 않는다.
- `page.tsx`에는 라우트 컴포넌트와 Next가 지원하는 export만 둔다. 보조 UI와 로컬 타입·스타일은 `_components/`, 기존 순수 helper/fixture는 책임 위치에 둔다. page 규칙은 단일 부모 통합의 예외다.
- 기본값만 전달하는 래퍼는 base 직접 사용을 우선한다. 기존 소유자의 작은 typed 옵션/variant로 공통 표현을 수용하고, generated 옵션과 custom children/slot의 불가능한 조합은 타입으로 막는다.
- production 부모 수는 TypeScript 심볼·alias·re-export·dynamic import까지 추적해 센다. Storybook·테스트·type-only 사용은 별도다. 단일 부모 부품은 부모 모듈에 통합하되 page-private·server/client·Metadata·유효한 지연 로딩 경계는 유지한다. 미사용/스토리 전용 삭제는 별도 범위를 확인한다.
- 스타일은 해당 TSX의 Panda JSX props·css·cva·sva로 작성한다. CSS Modules나 이름만 바꾼 styles.ts를 만들지 않는다. 단순 스타일은 DOM 소유자에 두고, 충돌하는 내부 스타일 객체는 클래스 생성 전에 병합한다.
- 반복 세로 간격은 기존 부모 Stack gap을 우선하며 다른 간격·선행 여백·조건부 표시를 보존한다. Typography·ContentHeader·ContentSection과 기존 폼/모달의 책임을 우선 활용한다.
- exported React 컴포넌트 바로 위에는 한국어 설명과 영어 대응을 담은 JSDoc을 유지한다. top-level 선언은 빈 줄로 구분하고, import는 ESLint의 그룹/정렬과 side-effect 경계를 따른다.

## 범위와 근거

- 사용자가 지정한 화면을 작업한다. 전체 적용 요청이면 라우트·지원 컴포넌트·기존 stories·디자인 상태를 조사한다. 범위가 불명확하면 확인된 화면을 정리하고 적용 범위를 질문한다.
- 먼저 저장소 `AGENTS.md`, `okf/index.md`와 관련 개념을 읽는다. 변경 전 index와 관련 working tree를 기록하고 다른 채팅의 변경을 보존한다.
- 상태 분리 작업은 `화면/IA → 근거 파일·디자인 → 상태 → 기존 URL → 분리 여부 → 이유 → 확인 URL` 표로 정리한다. 이론상 가능한 상태와 실제 구현·디자인이 있는 상태를 구분한다.
- [상태 선정 기준](references/state-matrix.md)을 읽고 누락을 점검한다. 근거 없는 상태·문구·디자인·업무 규칙을 새로 만들지 않는다. 미제공 디자인은 미확정으로 보고한다.
- Next.js 코드를 수정하기 전 설치된 `node_modules/next/dist/docs/`의 관련 가이드를 읽는다. 프로젝트 소유권·Panda·컴포넌트 주석·바인딩 주석·플랫폼 규칙을 따른다.

## 경량화 경계

- 기본 URL에는 정상적인 기본 마크업을 표시한다. 실제 인증·요청·저장·삭제·합계 계산·업무 판정·결제 URL 생성·성공 이동과 이를 흉내 내는 mock 요청·타이머·localStorage는 승인된 범위에서 제거한다.
- 입력·비밀번호 표시·탭·아코디언·체크·수량 UI·모달 열기/닫기처럼 확인에 필요한 로컬 조작은 유지한다. 선택에 따른 표시 스타일 변경과 업무 계산을 구분한다. 조작을 유지해도 금액·재고·성공 상태가 연동된다고 주장하지 않는다.
- 일반 탐색·외부 링크·다운로드·접근성을 일괄 제거하지 않는다. 기능 실행을 제거한 버튼은 우발적인 form submit이나 `href="#"` 이동을 일으키지 않게 한다. 의미 없는 no-op callback을 서비스 계약처럼 남기지 않는다.
- 오류는 제출 실패를 발생시켜 얻지 않고 처음부터 표시한다. 입력하거나 체크해도 해당 고정 상태가 임의로 사라지지 않게 한다. Loading/Pending도 타이머로 성공으로 전환하지 않는다.
- 정상적인 기본 데이터와 고정 상태 데이터는 명시적 fixture/표시 데이터로 구분한다. 상태 판정을 상품명·실제 색상·특정 업무 ID에 숨기지 않는다.
- 기존 서비스 계약은 범위 밖 화면에서 보존한다. 요청 관련 props/context/types/helpers를 제거할 때는 모든 사용처와 stories를 확인한다. 이 작업만을 위해 공용 provider나 범용 상태 엔진을 도입하지 않는다.
- 변경한 연결 경계의 `[ 개발팀 바인딩 ]` 주석에 현재는 고정 확인 화면임을 적는다. 실제 데이터와 요청의 연결 소유자, 이후 연결할 payload/식별자, pending/실패/성공/재시도와 갱신 책임을 필요한 만큼 명시하되 미구현 동작을 구현됐다고 쓰지 않는다.

## 직접 URL과 구현 공유

- 별도 확인이 필요한 상태는 새로고침·주소 직접 입력으로 즉시 같은 상태를 표시하는 URL을 제공한다. 특정 클릭 순서, 로그인 mock, 이전 페이지 방문, 브라우저 저장값에 의존하지 않는다.
- 기존 `preview-error`, `preview-empty` 관례를 우선한다. 의미가 다른 빈 상태는 `preview-no-results`처럼 구분한다. 이름은 기존 프로젝트 관례와 실제 상태에 맞추고 아래 예시를 의무 목록으로 취급하지 않는다.
- 이미 완료·잠김 등 전용 URL이 있으면 직접 접근 가능 여부를 확인해 재사용한다. 동일 화면을 `preview-success`로 중복 생성하지 않는다.
- 기본과 상태 페이지는 기존 표현 컴포넌트와 작은 typed 표시 옵션/데이터를 공유한다. 화면 JSX 전체를 복제하거나 page default export에 임의 props를 추가하지 않는다. route-private UI는 `_components/`, 관련 fixture/helper는 기존 책임 위치를 따른다. 짧은 페이지를 만들기 위한 전체 화면 forwarding wrapper는 만들지 않는다.
- 전체 화면·주요 영역 상태는 직접 URL로 분리한다. 작은 badge/버튼 상태와 일반적인 UI 조작은 보통 기존 기본 화면·story로 확인한다. 특정 모달 상태를 인계해야 하면 실제 overlay/focus/닫기 동작을 유지하는 직접 preview를 제공한다.
- PC/MO는 같은 상태 URL을 기존 플랫폼 체계로 표시한다. 플랫폼별 URL과 모든 상태 조합을 무조건 곱해 만들지 않는다. 의미 있는 복합 사례만 추가한다.
- Next의 `error.tsx`, `loading.tsx`, `not-found.tsx`는 프레임워크 기능이다. preview를 위해 실제 오류·영구 Suspense·실패 요청을 발생시키거나 이 특수 파일을 상태 fixture로 바꾸지 않는다. 필요한 표시 UI를 정상적인 preview route에서 공유한다.

## screen-index 연결은 생성 작업에 포함

preview 파일 생성만으로 작업을 완료하지 않는다. HOKA의 기존 구현을 먼저 읽고 다음을 같은 작업에서 수행한다.

1. `src/app/screen-index/screenConnections.ts`에서 원본 화면의 IA 연결을 찾는다. 기존 `route`, IA 번호·진행 상태·stories를 보존하며 `previewRoutes: { label, href }[]`에 상태별 링크를 추가한다. `label`은 `빈 목록`, `검색 결과 없음`, `입력 오류`, `조회 실패`처럼 구체적으로 적는다.
2. 동일 `href`는 중복 추가하지 않고 기존 항목을 갱신한다. 삭제·이동 시 오래된 링크와 소스 경로도 제거한다. 기본 화면에 속한 preview 때문에 새 IA 번호를 만들지 않는다. 연결 대상이 불명확하면 임의 행에 넣지 않고 매핑 미확정으로 보고한다.
3. 해당 연결의 `sourceFiles`에 preview 진입 파일을 포함한다. 그래프는 `scripts/screen-files.mjs`와 현재 package script를 확인해 정식 명령으로 재생성한다. `sourceGraph.generated.json`은 수작업으로 편집하지 않는다. 그래프 생성만으로 `previewRoutes` 등록이 자동 완료된다고 가정하지 않는다.
4. `src/app/screen-index/_components/IaStructurePage.tsx`에서 기존 실제 페이지 옆의 preview 링크 렌더링과 상태명·URL 검색 포함 여부를 확인한다. 이미 지원하면 UI를 다시 구현하지 않고 데이터만 추가한다. 미지원이면 기존 책임 위치에 최소한의 지원을 추가한다.
5. `/screen-index`의 원본 행에서 상태 링크가 보이고 각 링크가 정확한 직접 URL을 여는지 확인한다. 상태명·URL 검색, PC/MO의 링크 접근성과 기본 링크 유지도 확인한다. Storybook 환경 링크는 기존 계약을 보존한다.

2026-10-30 조사 시 IA 170의 `/cart/preview-empty`, IA 223의 `/login/preview-error`가 이 구조를 사용했다. 이는 탐색 단서이며 적용 시 현재 소스를 재확인한다.

## 검증과 인계

- 기존 Storybook 상태를 가능한 한 동일 fixture/표현에 연결한다. stories는 `src/stories/`에 유지하고 mockup을 새로 노출하지 않는다. 서비스 시뮬레이션 테스트를 고정 표시·직접 접근·유지한 UI 조작 확인으로 전환하는 것은 승인된 경량화 범위에 한한다.
- 각 URL의 직접 진입과 새로고침, 기본/상태별 PC·MO 표시, 고정 오류 유지, Empty와 Loading/실패의 구별, 유지한 조작·키보드·포커스를 확인한다. 저장/전송/인증/결제 이동 등이 남지 않았는지도 확인한다.
- 변경한 범위에 맞게 lint/format·타입·Panda·Next/Storybook 빌드와 관련 테스트를 실행한다. 공유 플랫폼을 건드리면 1024/1025·1199/1200 경계와 명시적 플랫폼도 확인한다. 브라우저 확인을 못 하면 수행했다고 쓰지 않는다.
- 소스를 변경하면 `scripts/okf-sync.mjs` 매핑에 따라 관련 OKF 개념·출처·인덱스·`okf/log.md`를 갱신한다. 기존 서비스 계약을 폐기한 범위를 명확히 적는다. 스테이징·커밋·푸시는 별도 사용자 권한에 따른다.
- 상태 분리 완료 보고는 `기본 URL | 상태명 | preview URL | screen-index IA | 검증 결과`와 남은 미확정 상태를 제공한다. 구조·스타일 정리는 제거/통합한 부품, 실제 호출부와 typed 표시 옵션, 유지한 경계 및 검증을 함께 보고한다. 조사 결과는 즉시 개선·추출 후보·유지로 구분하고 Base UI 후보는 공식 이름·설치 지원·업그레이드 필요 여부를 명시한다. 모든 상태를 다 만들었다고 하기보다 조사 범위와 미구현 서비스 경계를 명시한다.
