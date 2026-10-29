# 개발

[보조 TS 모듈의 사용처별 배치](../architecture/ts-module-ownership-2026-10-28.md)는 라우트·데이터·훅·컨텍스트·타입 소유권에 따른 33개 이동과 참조·검증을 설명한다.

[Storybook 브라우저 포커스](verification.md#storybook-자동-입력과-브라우저-포커스-2026-10-28)는 visible·unfocused 문서에서의 자동 입력 실패 원인과 CDP 포커스 에뮬레이션 대조 결과를 설명한다.

RatingStars 표시·선택 모드의 회귀 검사 범위는 [별점 통합 검사](verification.md#ratingstars-선택-모드-통합-검사-2026-10-19)를 참고한다.

- [Form 전수 점검](form-state-audit.md) - 63개 페이지의 오류·성공 색상·필드 검증 조사, 수정과 PC/MO·상태별 Storybook 분류·검증 결과를 기록한다.

- [로컬 실행](setup.md) - 설치, Panda 생성과 앱·Storybook 실행 명령을 안내한다.
- [변경 검증](verification.md) - 변경 범위에 맞는 정적 검사, 빌드와 수동 검증을 안내한다.
- [워크트리와 Git 작업](worktrees.md) - 작업 분리, 브랜치 이름과 커밋·푸시 절차 및 hoka-chat-cnp의 현재 채팅 변경 선별을 안내한다.

2026-10-28: shared를 src로 승격한 구조와 별칭·생성 경로는 [프로젝트 개요](../project.md) 및 관련 개념 문서에 반영했다.

[Import 자동 정렬](verification.md#import-자동-정렬-2026-10-28)에서 그룹 순서와 부수 효과 경계 검증을, [로컬 실행](setup.md#import-자동-정렬-2026-10-28)에서 CLI·저장 자동 수정을 안내한다.

[공용 훅·컨텍스트 우선순위](verification.md#공용-훅컨텍스트-import-우선순위-2026-10-28)는 확장된 2번 그룹과 데이터·타입의 기존 내부 그룹 유지 기준을 설명한다.
