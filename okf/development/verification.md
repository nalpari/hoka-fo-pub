---
type: Playbook
title: '변경 검증'
description: '변경 범위에 맞는 정적 검사, 빌드와 수동 검증을 안내한다.'
tags: [verification, testing, build]
status: draft
generated:
  by: codex/gpt-6
  at: '2026-10-28T07:03:09+00:00'
source_revision: b3f7243062b500eb4909961667ad142cc368ff91
working_tree_sources:
  - tests/import-order.test.mjs
  - AGENTS.md
  - .codex/skills/component-reusability/SKILL.md
  - tests/order-policy.test.mjs
  - src/stories/features/orders/OrdersPage.mobile.stories.tsx
  - tests/product-detail-presentation.test.mjs
  - src/components/product/productDetailPresentation.ts
  - okf/architecture/storefront-design.md
  - tests/app-router.test.mjs
  - tests/form-controls.test.mjs
  - src/components/common/atoms/RatingStars/RatingStars.tsx
  - src/stories/components/common/atoms/RatingStars/RatingStarsSelection.stories.tsx
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
  - src/lib/emailValidation.ts
  - src/stories/features/phone-verification/PhoneVerificationPage.stories.tsx
  - src/lib/passwordValidation.ts
  - src/stories/features/find-account/PasswordResetPage.stories.tsx
  - src/stories/features/signup/SignupPage.stories.tsx
  - src/stories/features/signup-registration/RegistrationPage.stories.tsx
  - tests/account-recovery.test.mjs
  - tests/checkout-summary.test.mjs
  - eslint.config.js
  - tests/okf-sync.test.mjs
  - scripts/okf-sync.mjs
  - scripts/okf.ps1
  - src/stories/features/support/SupportPages.stories.tsx
  - src/app/support/inquiries/new/order-products/page.tsx
  - src/components/support/InquiryOrderLookupPage.tsx
  - src/components/support/InquiryNewPage.tsx
  - src/components/support/inquiryOrderSelection.storage.ts
  - src/stories/features/Mockup/teamwear/TeamwearPage.stories.tsx
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

## 문의 주문상품 페이지 라우트 회귀 (2026-10-26)

주문상품 조회를 문의 폼 내부 모달에서 별도 App Router 페이지로 전환하면서 `tests/app-router.test.mjs`의 기대 경로에 `/support/inquiries/new/order-products`를 추가했다. manifest 경로 검사는 페이지 URL의 존재를 확인하며 주문 fixture 조회나 선택 상태 보존 동작을 검증하지 않는다. 선택 상호작용은 지원 페이지 Storybook의 Mobile·Web 사례에서 확인한다.

## 고객센터 라우트 범위 갱신 (2026-10-20)

App Router manifest 검사에서 /support/teamwear를 제외하고 /support/size-guide를 포함하도록 expectedRoutes를 갱신했다. 삭제한 화면은 Mockup Storybook으로 이동했으며 사이즈 가이드는 PC/MO 빈 본문 스토리를 제공한다. 이 변경은 라우트 범위·화면 구성 분리의 검증이며 실제 인증·주소 검색·문의 저장·결제 API를 검증하지 않는다.

기존 테스트가 누락한 현재 /support/care 경로도 expectedRoutes에 반영했다. 최종 Next build 후 manifest 검사 2개가 통과했고 실제 서버의 사이즈 가이드 200·팀/단체복 404를 확인했다. 폼·계정 복구·주문 합계 테스트 40개, 변경 파일 린트/포맷, Storybook build와 관련 브라우저 32개 사례를 확인했다.

## RatingStars 선택 모드 통합 검사 (2026-10-19)

커밋 전 스테이징된 파일만 임시 디렉터리에 복원하고 설치된 의존성·Panda 런타임을 연결한 별도 스냅샷에서도 타입 검사와 form-controls 테스트 33개가 통과했다. ReviewManager의 미스테이징 버튼 크기 수정 등 다른 작업 트리 변경을 포함하지 않은 검증이다.

form-controls.test.mjs의 기존 RatingInput 오류/정상 fixture를 RatingStars 선택 모드로 이전했다. 표시 모드의 role img·4.5점 반별점·radio 부재와 선택 모드의 5개 radio·단일 선택·Icon 사용 검사를 추가했으며 총 33개가 통과했다. 실제 브라우저 클릭·방향키·disabled 검사는 Atoms/RatingStars/Selection의 기존 이전 스토리로 확인하며 SSR 검사와 구분한다.

정적 Storybook을 임시 로컬 HTTP 서버로 열고 Edge/Playwright에서 1280px·375px의 클릭·좌우 방향키·포커스·아이콘 수, disabled, 기존 반별점 표시를 확인했다. Default 스토리에 모바일 화면 폭과 platform-mobile 클래스를 적용하는 방식이며 Mobile 스토리 play 완료를 판정한 결과는 아니다. 타입·변경 파일 ESLint/Prettier·Next/Storybook build도 통과했다.

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

## Mockup 제거 후 라우트 검사 (2026-10-20)

`tests/app-router.test.mjs`의 expectedRoutes에서 Mockup 구현 전용 라우트 12개를 제외했다. `npm run build`로 manifest를 갱신한 뒤 `node --test tests/app-router.test.mjs`를 실행해 실제 페이지 목록 일치 및 의존성 버전 검사 2개가 통과했다. Storybook 재분류는 production index의 페이지 스토리 179개 ID·IA 링크 유효성·Mockup 분류 부재를 별도로 확인했다. 브라우저 play는 재실행하지 않았다.

## 스토어프런트 시안 반영 검증 (2026-10-20)

라우트 manifest 검사의 예상 목록에 `/maintenance`와 `/service-unavailable`를 추가했다. 기존 등록 경로와 Next/React 버전 검사를 함께 유지한다. 검색 필드 스토리는 Enter와 아이콘 submit이 같은 onSearch를 호출하는 시나리오를 포함한다. 검색결과/0개, 시스템 점검/접속 불가의 PC·모바일 스토리를 추가했다.

이번 실행에서 Panda 생성, TypeScript, 변경 TS/TSX/MJS ESLint, 변경 파일 Prettier, Next.js production build, Storybook production build, `node --test tests/app-router.test.mjs` 2개를 확인했다. 전체 저장소 `npm run lint`는 오래 종료되지 않아 중단하고 변경 파일 ESLint를 완료했다. Storybook의 의존성 use-client/bundle 경고는 빌드 실패가 아니다.

브라우저에서 모바일 375px의 메인·상품 2열·필터 시트·검색 0개·상세 고정 구매 버튼을 확인했다. 상세의 사이즈 미선택 오류와 250mm 선택 상태를 확인했다. 메뉴 글꼴은 최종 정적 빌드에서 24px/900 계산값을 확인했다. 개발 Storybook이 생성 CSS를 갱신하지 않은 상태가 관찰돼 정적 빌드로 재확인했다. 전체검색의 오류 테두리/안내도 정적 빌드에서 확인했다. 각 화면의 모든 필터 조합이나 실제 결제·서버 장애 유발을 검증한 것은 아니다.

추가로 PC 목록의 3열 계산값, 검색 패널의 배경 dim·최근 검색어 없는 배치·자동완성 축소/강조·Escape 닫기, 키보드 Tab으로 진입하는 PC 5열 메뉴를 확인했다. 마지막 대조에서 Button 기본 변수와 메뉴 변수의 원자 클래스 충돌이 발견되어 `&&` 범위에 패딩 변수 재정의를 두었다. 점검 dl의 간격은 columnGap/rowGap으로 명시했다. 최종 정적 빌드에서 메뉴 내부 패딩 0px과 Men 버튼 폭 65px, 모바일 점검·접속 불가 화면을 확인했다. 이후 Next/Storybook 빌드와 변경 파일 ESLint, 라우트 2개 검사를 다시 통과했다. OKF 작업 트리 매핑 검사에서 누락 문서는 없었고 diff 공백 검사도 통과했다.

## 고객센터 시안 반영 검증 (2026-10-20)

고객센터 UI 변경 후 Panda 생성·타입·변경 TS/TSX ESLint·Next/Storybook production build를 통과했다. 기존 App Router manifest 테스트 2개와 diff 공백 검사, 미스테이징 변경을 포함한 pendingDocs(false) 매핑도 확인했다. production Storybook의 PC FAQ와 375px 모바일 화면에서 필터 간격·지도 비율·문의 첨부 목록/팝업을 확인했고 모바일 공지 링크, 팝업 닫기/포커스 복원, 약관 시행일 선택 시나리오를 실행했다. 문의 빈 제출 오류·입력 후 해제·글자 수, 배송/반품 세 탭과 의류/용품 탭은 수동 UI로 확인했다. 실제 서버 업로드/저장·지도 API·운영 약관 데이터는 추가/검증하지 않았다. [전체 범위와 출처](../architecture/support-design.md)를 참고한다.

## 상품 상세 표시 데이터 분기 검사 (2026-10-23)

node --test tests/product-detail-presentation.test.mjs는 실제 getProductDetailPresentation을 불러 Clifton 샘플 사양과 로컬 사진 파일 존재, 다른 상품의 Clifton 사양·척도·이미지 미상속, 품번 누락 고시 fallback을 검사한다. 2026-10-23 Codex 실행 결과 3개가 통과했다. 수치의 제품 정확성이나 브라우저 렌더링·ScrollSpy 상호작용을 검증하는 테스트는 아니다. 출처는 작업 트리의 tests/product-detail-presentation.test.mjs와 productDetailPresentation.ts다.

## 상품 고시 표 데이터 분기 검사 (2026-10-23)

기존 tests/product-detail-presentation.test.mjs의 3개 테스트를 보강해 Clifton의 고시 항목 8개·예시 제조국과 다른 상품의 소재 fallback을 검사했다. 기존 스타일코드 누락 fallback 검사도 유지한다. Codex가 node --test tests/product-detail-presentation.test.mjs로 3개 통과를 확인했으며, Next.js 빌드의 타입 검사와 Storybook 빌드·변경 파일 ESLint·Prettier도 통과했다. 출처는 해당 테스트와 작업 트리의 productDetailPresentation.ts다. UI 실측은 architecture/ui.md의 상품 상세 지원 아코디언 시안 보정·상품 고시 정보 신규 표 기록을 참고한다.

## 주문 조회·신청 계산 검증 (2026-10-23)

`node --test tests/order-policy.test.mjs tests/checkout-summary.test.mjs`는 9개 테스트를 통과했다. 부분 신청의 잔여 수량·원본 비변경·재신청 한도, 빈 선택/사유·알 수 없는 키·음수/소수/NaN 거부, 주문 상태별 허용 액션, 반품비 한도와 불량 면제, 날짜/상품 검색, 윤년/월말 기간을 검사한다. 신청 스토리는 오류 표시→상품/사유 선택→접수→상세 링크 반영을 확인하는 play를 포함한다.

초기 타입 검사·변경 범위 ESLint, Next.js와 Storybook 정적 빌드는 통과했다. 개발 Storybook에서 기존 스토리의 acorn 인덱스 오류가 발생해 정적 빌드를 별도 로컬 포트로 제공하여 시각 검증한다. Figma 픽셀 대조 및 실제 서버 주문/결제/환불 검증은 수행하지 않았다.

브라우저 정적 빌드에서 375px 주문 목록/직접 기간 입력·반품 신청 시트·반품 상세를 시각 확인했다. 부분 취소 play는 오류 표시 후 접수 상태와 취소상세 링크를 확인했고, 배송조회 play는 단계/송장/추적 표를 표시했다. 기존 주문 완료 play(감사 안내), 쿠폰 선택 play(432,000원 결제 금액), 장바구니 옵션 저장·취소 play를 실행했으며 콘솔 오류가 없었다. 최종 변경의 타입 검사·범위 ESLint·Next.js/Storybook 빌드도 통과했다.

추가로 개발 서버에서 배송지 변경→주소 검색 모달 입력→이름/휴대폰 입력→동의→완료를 확인했다. boxed 주소의 disabled/name 누락을 주문서 어댑터에서 수정했으며 최신 타입 검사/해당 파일 ESLint가 통과했다. 반품 신청도 상품 선택·불량 사유로 접수 메시지까지 확인했고, PC 스토리는 단일 헤더와 MY HOKA 사이드바를 유지한다. 개발 Storybook은 재시작 후 정상화했다.

## IA 구조도 경로 (2026-10-28)

작업 트리 `tests/app-router.test.mjs`의 기대 라우트에 `/screen-index`를 추가했다. 이 검사는 Next 빌드 manifest가 필요하다.

## src 폴더 구조 승격 (2026-10-28)

shared 내부를 src로 승격했다. 공통 UI는 src/components/common, 기능별 UI는 src/components/features, ShopShell과 플랫폼 상태는 src/context에 둔다. icons·lib·styles·types는 src 바로 아래에서 관리한다. app·data·mocks·stories의 역할과 라우트는 유지한다. 별칭과 Storybook 스타일 참조, Panda 생성 경로, OKF 동기화 규칙을 새 경로에 맞췄다. 작업 트리 출처: tsconfig.json, package.json, scripts/okf-sync.mjs, src/context/ShopShell.tsx, src/components/, .storybook/preview.ts.

## 단일 부모 통합과 도메인 폴더 승격 (2026-10-28)

단일 부모 통합 후 form-controls 회귀 테스트의 RangeInput 소비처를 src/components/catalog/ProductListingPage.tsx로 변경했다. 테스트 TS 로더가 transpileModule에 실제 fileName을 전달해 .ts의 제네릭 함수를 JSX로 오인하지 않도록 했다. 기존 62개 테스트의 검증 내용은 유지한다. 상세 검증 기록은 ../architecture/single-parent-consolidation-2026-10-28.md를 참고한다.

검증: 폴더 승격 후 타입·Panda·Next/Storybook 빌드와 기존 테스트 62개를 통과했다. 이동 함수 409개·초기화 표현식 211개의 구조 비교, PC·모바일 주요 동작 및 스토리 확인 범위는 [통합 검증 기록](../architecture/single-parent-consolidation-2026-10-28.md#검증)에 명시했다.

## Import 자동 정렬 (2026-10-28)

import 그룹은 Next.js → 외부 패키지·공용 훅·컨텍스트(React·Node 내장 포함) → Panda → common atoms → molecules → organisms → layouts → 나머지 내부 모듈 → 상대 경로 순이다. 모듈 경로와 named binding을 알파벳순으로 정렬하고 그룹 간 빈 줄은 하나다. 호환 별칭도 같은 계층으로 분류하며 타입 전용 import는 경로 그룹에 속하고 기존 타입 표기는 유지한다.

Perfectionist 기본 sortSideEffects:false는 부수 효과 import의 위치만 고정하고 일반 import가 이를 건너뛰는 것은 막지 않는다. eslint.config.js의 얇은 래퍼가 구간마다 기존 정렬 규칙을 호출해 CSS/SCSS·부수 효과 import 및 비-import 문장을 경계로 유지한다. export 정렬 규칙은 추가하지 않는다. tests/import-order.test.mjs에서 그룹·별칭·타입·named binding·주석·지시문·경계·멱등성을 검증한다. 전체 소스 적용 전후에는 import 대상과 코드 본문 보존도 별도 비교한다.

검증 결과 (2026-10-28): 533개 TS/TSX 중 453개를 정렬했다. 수정 전후 TypeScript AST에서 import 순서와 named binding 순서를 제외한 본문·import 대상·타입 표기와 주석이 보존되었고 부수 효과 import 7개 및 비-import 경계를 넘는 이동이 없었다. 반복 자동 수정 두 번에서 소스 바이트 변경이 0개였으며, 생성물 제외를 포함한 규칙 회귀 9개와 전체 테스트 71개·타입 검사·Next/Storybook 빌드가 통과했다. 스킬 validator도 통과했다.

사용자 승인에 따라 기존 AccountLockedPage 스토리 끝의 의미 없는 숫자 표현식 `1`을 삭제했다. import 정리 외의 본문 변경은 이 무효 문장 제거 한 건이며, 컴포넌트·스토리 동작에는 영향이 없다. 전체 ESLint 및 정상 종료하는 lint:fix 반복 검증 결과는 아래에 기록한다.

승인 후 재검증: 전체 `npm run lint`가 오류 없이 통과했고 전체 테스트 71개가 다시 통과했다. `npm run lint:fix`도 정상 종료한다.

## 공용 훅·컨텍스트 import 우선순위 (2026-10-28)

외부 패키지 다음에 공용 훅·컨텍스트(`@/context/*`, `@/hooks/*`, `@/lib/use[A-Z]*`)를 빈 줄 없이 두고 Panda 앞에서 그룹을 구분한다. `tests/import-order.test.mjs`에 이 순서와 일반 데이터·타입·유틸리티의 내부 그룹 유지, 두 번째 수정의 멱등성을 검사하는 회귀 사례를 추가했다. 존재하지 않는 훅 경로는 정렬기 입력 문자열로만 사용하며 모듈을 새로 만들지 않는다. Codex 검증: 규칙 테스트 10개·전체 테스트 72개, 전체 ESLint와 타입 검사를 통과했다. 재사용 스킬 validator도 통과했다. 기존 소스 적용의 본문 보존·멱등성은 적용 커밋에 별도로 기록한다.
