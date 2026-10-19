---
type: Playbook
title: '변경 검증'
description: '변경 범위에 맞는 정적 검사, 빌드와 수동 검증을 안내한다.'
tags: [verification, testing, build]
status: draft
generated:
  by: codex/gpt-6
  at: '2026-10-19T05:12:44Z'
source_revision: b3f7243062b500eb4909961667ad142cc368ff91
working_tree_sources:
  - src/stories/features/forms/form-state-audit/account.scenarios.tsx
  - src/stories/features/forms/form-state-audit/controls.scenarios.tsx
  - src/stories/features/forms/form-state-audit/enterAddress.ts
  - src/stories/features/forms/form-state-audit/MO.Expired.stories.tsx
  - src/stories/features/forms/form-state-audit/MO.Inheritance.stories.tsx
  - src/stories/features/forms/form-state-audit/MO.Validation.stories.tsx
  - src/stories/features/forms/form-state-audit/mypage.scenarios.tsx
  - src/stories/features/forms/form-state-audit/PC.Expired.stories.tsx
  - src/stories/features/forms/form-state-audit/PC.Inheritance.stories.tsx
  - src/stories/features/forms/form-state-audit/PC.Validation.stories.tsx
  - src/stories/features/forms/form-state-audit/product.scenarios.tsx
  - src/stories/features/forms/form-state-audit/shared.tsx
  - src/stories/features/forms/form-state-audit/support.scenarios.tsx
  - .storybook/preview.ts
  - tests/email-validation.test.mjs
  - src/shared/lib/emailValidation.ts
  - src/stories/features/phone-verification/PhoneVerificationPage.stories.tsx
  - src/shared/lib/passwordValidation.ts
  - src/stories/features/find-account/PasswordResetPage.stories.tsx
  - src/stories/features/signup/SignupPage.stories.tsx
  - src/stories/features/signup-registration/RegistrationPage.stories.tsx
  - tests/form-controls.test.mjs
  - tests/account-recovery.test.mjs
  - tests/checkout-summary.test.mjs
  - eslint.config.js
  - tests/okf-sync.test.mjs
  - scripts/okf-sync.mjs
  - scripts/okf.ps1
sources:
  - id: package-json
    resource: https://github.com/nalpari/hoka-fo-pub/blob/b3f7243062b500eb4909961667ad142cc368ff91/package.json
    title: 'package.json'
  - id: tests-app-router-test-mjs
    resource: https://github.com/nalpari/hoka-fo-pub/blob/b3f7243062b500eb4909961667ad142cc368ff91/tests/app-router.test.mjs
    title: 'tests/app-router.test.mjs'
  - id: -storybook-preview-ts
    resource: https://github.com/nalpari/hoka-fo-pub/blob/b3f7243062b500eb4909961667ad142cc368ff91/.storybook/preview.ts
    title: '.storybook/preview.ts'
---

# 변경 검증

## 회원가입·휴대폰 인증 문구 회귀 검사 (2026-10-19)

email-validation.test.mjs는 분리/통합 이메일 규칙의 일치, 정상 부분 주소, 잘못된 점·도메인·구분자 및 길이 경계를 검사한다. signup-phone-feedback 태그는 일반 가입·회원정보 가입·휴대폰 인증의 PC·모바일 6개 스토리를 선택한다. 로그인 검사도 연속 점이 있는 이메일을 거부하도록 보완했고 기존 비밀번호 회귀와 함께 실행한다. 성공 문구는 실제 가입 완료/다음 단계 표시로 확인하고 외부 중복·인증 결과를 모의 성공으로 판정하지 않는다.

2026-10-19 이번 추가 검사 결과: Node 전체 51개, 정적 Chromium의 login-validation/password-policy/signup-phone-feedback 태그 총 27개가 통과했다. 전체 타입 검사·변경 파일 ESLint·Storybook 빌드도 통과했다. 휴대폰 약관 설명은 region의 접근 가능한 설명과 실제 빨간 색상까지 검사했다.

## 비밀번호 정책 회귀 검사 (2026-10-19)

account-recovery.test.mjs는 공통 passwordValidation 모듈의 10·11·12자 허용, 8·9·13자 및 문자 조합 누락·공백·탭·개행 거부, 빈 값·재입력 불일치 오류를 확인한다. 각 화면이 같은 함수를 사용하는지와 실제 메시지 전달은 로그인·재설정·가입·회원정보 가입 스토리로 함께 확인한다. `password-policy` 태그는 재설정과 신규 가입 정책 스토리, `login-validation`은 기존 로그인 스토리를 선택한다. 정적 Storybook을 대상으로 두 태그를 함께 실행한다. Figma 재인증 오류로 두 원본 영역의 문구 전수 대조는 미실행이다.

2026-10-19 실행 결과: 전체 타입 검사·변경 파일 ESLint·Node 검사 48개·전체 Storybook 빌드와 두 태그의 최종 Chromium 검사 21개가 통과했다. 신규 가입 PC·모바일 스토리에는 태그를 각각 명시해 spread로 태그가 탐지되지 않아 모바일 검사가 빠지는 일을 방지했다.

## Form 전수 점검 회귀 검사

2026-10-19 [전수 점검 보고서](form-state-audit.md)는 63개 라우트의 소스 분류와 PC·모바일 HTTP 응답을 구분해서 기록한다. `node --test tests/form-controls.test.mjs`는 Node 24의 registerHooks와 설치된 TypeScript로 실제 TSX/Panda 런타임을 로드해 14개 입력 조합의 오류·정상 상태 및 3개 안내 tone을 서버 렌더링한다. CSS만 제외하므로 계산된 색상·포커스·브라우저 상호작용 검사를 대신하지 않는다. `node --test tests/*.test.mjs`로 기존 검사와 함께 실행한다.

`Development/FormStateAudit/{PC|MO}/{Validation|Expired|Inheritance}`의 play는 실제 오류 색상, 설명 연결, 필수값 제출·수정 후 오류 해제·완료와 모달 닫힘을 확인한다. 기존 Login/Checkout/PasswordReset과 함께 form-audit 태그로 선택한다. 임시 설치한 Storybook test-runner/Chromium으로 정적 Storybook(127.0.0.1:6007)을 검사했으며 프로젝트 의존성에는 추가하지 않았다. 이 runner는 공식 지원 종료 안내가 있으므로 상시 CI 도입은 별도 결정이 필요하다. 개발 서버 HMR 중 테스트 실패와 모달 종료 애니메이션 대기를 구분하고, 최종 실행은 정적 빌드에서 한다.

검증 결과는 실행한 명령과 관찰한 동작으로 보고한다. 이 문서는 검증 절차이며, 명령이 최근에 실행되거나 통과했다는 기록은 아니다.

## 코드 변경

```sh
npm run typecheck
npm run lint
npm run build
```

`npm run lint`는 로컬 graft 연동 스크립트인 `.claude/helpers/**`를 검사 대상에서 제외한다. 이 파일들은 Git에서도 제외되며, 앱 소스와 OKF 검사 스크립트는 계속 검사한다. 제외 규칙은 `eslint.config.js`에서 관리한다.

라우팅·의존성 변경은 빌드 후 아래 테스트도 실행한다.

```sh
node --test tests/app-router.test.mjs
```

이 테스트는 `.next/server/app-paths-manifest.json`을 읽으므로 빌드가 먼저 필요하다. 기대하는 63개 경로가 실제 빌드 결과에 있는지, Next.js·React·React DOM 버전이 고정되어 있는지, React Router 의존성이 제거되어 있는지 검사한다. 브라우저 인터랙션을 대신하지 않는다.

스토리를 바꾼 경우 `npm run build-storybook`도 실행한다. 스타일이나 토큰을 바꾼 경우 Panda 생성 결과를 사용해 PC·모바일 화면을 확인한다.

## 수동 확인

계정 복구 규칙·국가 선택 메타데이터는 `node --test tests/account-recovery.test.mjs`로 비밀번호 강도/일치/필수 입력, 전화번호 부분 입력/접두어/절단, 지역 ID와 언어별 링크를 확인한다. UI는 PasswordResetPage의 필수·불일치·완료·MobileError, AccountLockedModal의 확인·닫기·Escape 이동과 Locales의 PC/모바일 스토리로 확인한다. 포털 모달은 `findByRole`로 실제 렌더링을 기다린 뒤 상호작용을 검증한다.

주문/결제의 순수 계산 모듈을 바꾼 경우 `node --test tests/checkout-summary.test.mjs`로 옵션별 행·수량 합계, 누락 상품 제외, 빈 장바구니와 입력 불변성을 확인한다. UI 조합은 `PAGES/Checkout`의 PC·모바일·빈 상태·완료 흐름 스토리, 헤더 조합은 `Organisms/Layout/SiteHeader`의 PC·모바일·메뉴 조합 스토리로 확인한다. 스토리 추가만으로 play 테스트 실행 완료를 의미하지 않는다.

- 변경한 URL의 직접 진입과 내부 링크 이동을 확인한다.
- URL 필터·정렬은 새로고침, 뒤로 가기와 모바일 적용 버튼을 확인한다.
- 공통 상태 변경은 상품 담기 후 장바구니 이동, 로그인·로그아웃과 새로고침을 확인한다.
- 플랫폼 분기는 PC와 모바일 User-Agent로 각각 확인한다.
- 미등록 URL의 404와 알려진 미구현 기능을 구분한다.

## OKF 동시 갱신 검사

`npm run okf:check`는 스테이징된 소스·설정 변경에 관련 OKF 개념과 `okf/log.md`가 포함되어 있는지 검사한다. 작업 트리에서 문서를 수정했더라도 스테이징하지 않았다면 통과하지 않는다. 필요한 문서는 [유지보수 매핑](../maintenance.md)에 있다.

`npm run test:okf`는 별도의 임시 Git 저장소에서 코드만 스테이징한 경우의 차단, 관련 문서를 포함한 경우의 통과, 에이전트 안내와 기존 훅 보존을 검증한다. 실제 저장소에 커밋을 만들지 않는다. 작성 당시 작업 트리에서 확인한 테스트 출처는 `tests/okf-sync.test.mjs`다.

Windows에서는 Git 자체의 커밋 실행을 통해 sh pre-commit의 차단을 확인하고, Windows PowerShell 진입점을 임시 저장소 밖에서 호출해 종료 코드와 문서 동시 스테이징을 검증한다. 테스트 프로세스에만 `-ExecutionPolicy Bypass`를 지정하며 시스템 실행 정책은 변경하지 않는다. 테스트의 글로벌 Git 설정은 운영체제 전용 `/dev/null` 대신 빈 임시 파일로 격리한다. PowerShell 실행 예시는 [유지보수](../maintenance.md#powershell)를 참고한다.

## 문서만 변경

YAML 메타데이터, 인덱스 연결, 문서 내부 링크와 코드 출처를 확인하고 `git diff --check`를 실행한다. 앱 코드나 빌드 설정을 바꾸지 않은 문서 작업에는 앱 빌드를 요구하지 않는다.

[OKF 유지보수](../maintenance.md), [워크트리 절차](worktrees.md)를 참고한다.

## FormStateAudit 분류별 선택 (2026-10-19)

PC/MO는 각 15개이며 Validation 13개·Expired 1개·Inheritance 1개로 나눈다. 전체 선택은 기존 `form-audit`·`form-audit-new`, 플랫폼별 선택은 `form-audit-pc`·`form-audit-mo`, 상태별 선택은 `form-audit-validation`·`form-audit-expired`·`form-audit-inheritance` 태그를 사용한다. PC/MO의 story export 이름은 동일하며 Mobile 접두사는 경로의 MO 분류로 대체한다. render/play 선언은 5개 도메인별 scenarios 모듈에 한 번만 둔다. 플랫폼은 meta.parameters에, 상품/가입 경로는 scenario.parameters에 두어 Storybook의 계층 병합을 사용한다.

이번 분리 후 타입·변경 파일 ESLint/Prettier·Storybook 빌드와 정적 Storybook의 Edge headless play 30개가 통과했다. 원본 15개 시나리오 선언이 변경 없이 이동했으며 정적 인덱스에도 누락 없이 30개가 등록됨을 확인했다. 검증용 브라우저 패키지와 실행 스크립트는 임시 디렉터리만 사용했고 프로젝트 의존성은 추가하지 않았다.
