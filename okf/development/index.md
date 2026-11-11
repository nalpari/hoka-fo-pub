# 개발

[main 변경 보고 스킬](../../.agents/skills/hoka-main-change-report/SKILL.md)은 수동 호출 시 지정 커밋을 포함하거나 마지막 성공 SHA 이후부터 최신 origin/main까지 최종 유효 변경을 분석해 IA 구조도의 날짜·담당자별 모달과 개발자 공유 보고서를 만든다. 담당자는 기존 IA 매핑을 사용한다. 현재 WBS 문서(1JyQvEhb53OgXnSBcxypHGI8nxsclZDi059r1SCdFHos)의 Schedule FO 개발 실적과 IA 저장값을 WBS 번호로 비교해 공유 보고서에 별도로 기록한다.

[파일 diff 요약 로딩](verification.md#파일-diff-요약-로딩-표시-2026-11-04)은 `/wh` 콜아웃의 로딩 상태와 검증 범위를 기록한다.

[고정 상태 preview 검증](verification.md#퍼블리싱-고정-상태-preview-검증-2026-10-30)은 직접 URL·IA 링크와 PC/MO 122건의 확인 범위 및 남은 전체 린트 오류를 기록한다.

[저장소 인계 스킬](../maintenance.md#문서-정리와-저장소-스킬-2026-11-04)은 팀 공유 경로와 이전 스킬 전환 이력을 설명한다.

[IA 디자인 수급 조사 검증](../architecture/ia-design-audit.md#검증)은 상태 모델·필터 확인과 Figma 캡처 실패로 수행하지 못한 시각 비교를 구분한다.

[컴포넌트·모듈 소유권](../architecture/component-ownership.md)은 페이지 전용 UI·일반 TS 모듈의 배치와 재사용·반응형 기준을 설명한다.

RatingStars 표시·선택 모드의 회귀 검사 범위는 [별점 통합 검사](verification.md#ratingstars-선택-모드-통합-검사-2026-10-19)를 참고한다.

- [Form 전수 점검](form-state-audit.md) - 63개 페이지의 오류·성공 색상·필드 검증 조사, 수정과 PC/MO·상태별 Storybook 분류·검증 결과를 기록한다.

- [로컬 실행](setup.md) - 설치, Panda 생성과 앱 실행 명령을 안내한다.
- [변경 검증](verification.md) - 변경 범위에 맞는 정적 검사, 빌드와 수동 검증을 안내한다.
- [워크트리와 Git 작업](worktrees.md) - 작업 분리, 브랜치 이름과 커밋·푸시 절차 및 hoka-chat-cnp의 현재 채팅 변경 선별을 안내한다.

2026-10-28: shared를 src로 승격한 구조와 별칭·생성 경로는 [프로젝트 개요](../project.md) 및 관련 개념 문서에 반영했다.

[Import 자동 정렬](verification.md#import-자동-정렬-2026-10-28)에서 그룹 순서와 부수 효과 경계 검증을, [로컬 실행](setup.md#import-자동-정렬-2026-10-28)에서 CLI·저장 자동 수정을 안내한다.

[공용 훅·컨텍스트 우선순위](verification.md#공용-훅컨텍스트-import-우선순위-2026-10-28)는 확장된 2번 그룹과 데이터·타입의 기존 내부 그룹 유지 기준을 설명한다.

[남은 화면 바인딩과 전체 소스 주석 검증](verification.md#남은-화면-바인딩환불-논리전체-소스-주석-검증-2026-10-29)은 가입/문의 payload, 서버 견적, 실패·재시도와 PC/모바일 회귀 확인 범위를 기록한다.

[IA 연결 파일 생성과 감시](setup.md#ia-연결-파일-생성과-감시-2026-10-29)는 개발 중 자동 갱신과 빌드 전 생성 명령을 안내한다.

[IA 플랫폼별 상태 검증](verification.md#ia-플랫폼별-상태-검증-2026-10-29)은 상태 이관과 디자인 미추정·PC/MO 차이 및 10열 두 행 표의 검증 범위를 기록한다.

[장바구니·로그인 마크업 단순화 검증](verification.md#장바구니로그인-마크업-단순화-검증-2026-10-30)은 정적 검사·59개 테스트·PC/MO Storybook과 브라우저 확인 및 남은 린트 오류를 기록한다.

[전체 화면 퍼블리싱 인계](markup-handoff.md)는 서비스 흐름 제거 범위, 직접 상태 URL/IA 대응과 검증 결과를 기록한다.

[Storybook 제거](setup.md#storybook-제거-2026-11-03) 이후 앱 실행과 고정 상태 URL로 검증한다. 이전 기록은 이력으로 보존한다.

아이콘 의존성은 [로컬 실행](setup.md)의 SVG 레지스트리 안내를 따른다.
