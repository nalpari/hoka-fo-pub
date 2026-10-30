---
type: Playbook
title: '변경 검증'
description: '변경 범위에 맞는 정적 검사, 빌드와 수동 검증을 안내한다.'
tags: [verification, testing, build]
status: draft
generated:
  by: codex/gpt-6
  at: '2026-10-30T06:40:14+00:00'
source_revision: b3f7243062b500eb4909961667ad142cc368ff91
working_tree_sources:
  - tests/form-controls.test.mjs
  - tests/preview-links.test.mjs
  - tests/app-router.test.mjs
  - src/stories/features/login/LoginPage.scenarios.tsx
  - src/stories/features/cart/CartPage.scenarios.tsx
  - src/app/login/preview-error/page.tsx
  - src/app/cart/preview-empty/page.tsx
  - src/app/screen-index/storybookLinks.ts
  - src/stories/features/screen-index/IaStructurePage.stories.tsx
  - tests/screen-progress.test.mjs
  - scripts/screen-files.mjs
  - src/app/screen-index/screenConnections.ts
  - src/app/screen-index/_components/IaStructurePage.tsx
  - src/app/screen-index/sourceGraph.generated.json
  - tests/screen-files.test.mjs
  - src/components/orders/OrdersRoute.tsx
  - src/components/orders/order-policy.ts
  - src/context/OrdersContext.ts
  - src/context/AccountFlowContext.tsx
  - src/types/binding.ts
  - tests/inquiry-binding.test.mjs
  - src/stories/features/binding/RemainingBinding.stories.tsx
  - tests/cart-display.test.mjs
  - src/stories/features/binding/Binding.stories.tsx
  - .codex/skills/component-reusability/references/data-binding.md
  - .codex/skills/component-reusability/references/page-ownership.md
  - .codex/skills/component-reusability/references/form-fields.md
  - src/stories/components/common/atoms/Button/Button.Social.stories.tsx
  - src/stories/components/common/atoms/Button/Button.LoadMore.stories.tsx
  - src/types/type-tests/Button.type-test.tsx
  - tests/import-order.test.mjs
  - AGENTS.md
  - .codex/skills/component-reusability/SKILL.md
  - tests/order-policy.test.mjs
  - src/stories/features/orders/OrdersPage.mobile.stories.tsx
  - tests/product-detail-presentation.test.mjs
  - src/app/products/[id]/productDetailPresentation.ts
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
  - src/app/support/inquiries/new/inquiryOrderSelection.storage.ts
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

## 장바구니·로그인 마크업 단순화 검증 (2026-10-30)

- `npm run typecheck`와 변경한 TS/TSX의 ESLint를 통과했다. `npm run lint:fix` 실행 중 생긴 범위 밖 import 정렬 수정은 되돌렸다. 전체 `npm run lint`는 기존 publishing-guide 4개 파일의 import 순서/그룹 오류 9건으로 실패한다.
- `node --test tests/cart-display.test.mjs tests/form-controls.test.mjs tests/screen-files.test.mjs tests/screen-progress.test.mjs` 59개를 통과했다.
- 실제 브라우저에서 PC/MO Storybook 14개 시나리오의 `storyFinished`와 play 예외를 함께 확인했다. 기본 입력/Enter/버튼, 고정 오류 유지, 도움말 Escape/포커스, 수량 변경과 금액 고정, 선택/삭제 무동작, 품절, 옵션 선택 후 미저장 닫기와 재열기, 제한 안내, 빈 목록, 로그인 서비스 미호출을 확인했다. 전역 a11y `todo` 설정의 경고는 남아 있으며 접근성 전체 통과를 뜻하지 않는다.
- 실제 `/login`에서 입력·체크 후 제출/Enter/소셜 버튼을 눌러 URL·입력 유지, alert 없음, fetch/XHR 추가 0건과 local/session storage 변경 없음을 확인했다. `/login/preview-error`는 입력/제출 후 두 오류와 aria-invalid를 유지했다.
- `/cart`에서 수량 증가 후 행 금액 유지, 주문·삭제 후 이동/행 제거 없음, checkout 링크 없음, `/cart/preview-empty`의 직접 빈 상태와 `/screen-index`의 상태별 링크를 확인했다.
- 모달을 연 상태로 1024/1025px, 1199/1200px를 전환해 플랫폼 변경과 모달 유지, 1200px 이상 가로 넘침 없음을 확인했다. 1025~1199px의 1200px 캔버스는 기존 정책대로 유지한다. 브라우저 스크린샷 캡처가 시간 초과되어 픽셀 대조는 수행하지 못했으며 DOM·계산된 크기와 상호작용으로 검증했다.
- 라우트 manifest 테스트에 새 확인 URL과 기존 누락 `/publishing-guide`를 반영했다. `npm run build`를 통과했고 새 URL 2개를 포함한 정적 페이지 생성과 TypeScript 검사를 완료했다. 이후 `node --test tests/app-router.test.mjs` 2개도 통과했다(관련 Node 테스트 합계 61개).


## IA 설명 제거 확인 (2026-10-29)

`screen-progress.test.mjs`의 기존 비고 단언을 제거된 데이터에 맞춰 갱신했다. 상태·플랫폼별 override 검증은 유지한다. 시안 반영·연동 대기 비고의 제거는 퍼블리싱 상태를 바꾸지 않는다.

## IA 디자인 조사와 수정 상태 검증 (2026-10-29)

`tests/screen-progress.test.mjs` 5개는 레거시 퍼블리싱 초기값과 디자인 수급 독립성, PC/MO별 override와 교체 데이터, 명시적 null, 수정예정/수정 구분, 상품 공통 템플릿 수급을 검증한다. 타입 검사·변경 파일 ESLint/Prettier·Panda 생성과 앱 브라우저에서 수급 수치·가입완료 플랫폼 차이·수정 필터를 확인했다. 디자인 PC 200/49, MO 210/39의 수급/미수급은 삭제 제외 249개 IA 행 기준이며 고유 프레임 수와 다르다.

Figma 프레임 목록은 데스크탑 UI로 읽었으나 캡처 실패와 연결 도구 재인증 요구로 구현 화면과의 시각 비교를 수행하지 못했다. 기존 퍼블리싱 값을 이번 검수 완료로 해석하지 않는다. 전체 프로덕션/Storybook 빌드·play는 이번 상태 추가 후 재실행하지 않았다. [조사 근거와 한계](../architecture/ia-design-audit.md).

작업 트리 출처: tests/screen-progress.test.mjs, src/app/screen-index/storybookLinks.ts, src/app/screen-index/_components/IaStructurePage.tsx, src/stories/features/screen-index/IaStructurePage.stories.tsx.

## 부모 옵션 통합 검증 (2026-10-28)

Codex가 CustomerCenterLayout.footerAction·AccountPageLayout 제목/액션·Checkbox.consent·Radio.label을 확인했다. 작업 트리 출처는 네 기반 컴포넌트·전환 소비처·스토리와 tests/form-controls.test.mjs다. 기존 생성·신뢰 메타데이터는 보존한다.

- 타입 검사, 전체 ESLint, Panda 생성, Next·Storybook 빌드와 기존 Node 테스트 72개가 통과했다. 가상 TypeScript fixture로 footer/footerAction 배타성, link.href·loadMore.counter 필수, consent props·Radio 제네릭 계약을 확인했다. fixture는 저장소 파일로 남기지 않았다.
- form-controls의 Terms fixture를 Checkbox.consent로 전환해 동일한 필드 오류·설명 상속 검사를 유지했다. 계정 레이아웃 도우미는 내부 ContentSection 대신 main의 실제 첫 콘텐츠 프레임을 검사하도록 수정했다. 기존 maxWidth·간격·버튼 폭·폼 연결 기대값은 유지한다.
- 수정 전 production 응답과 새 production 서버의 7개 화면을 1440px·390px에서 비교해 기록한 제목·체크박스·액션 스타일 14상태가 일치했다. 두 폭의 캡처는 데스크톱 User-Agent였으므로 모바일 플랫폼 검증으로 과장하지 않는다. 별도로 실제 mobile 플랫폼 스토리에서 h1 22px, 계정 간격·액션을 검증하고 mobile User-Agent로 문의 footer의 64px 하단 여백·폭을 확인했다.
- 동일 CDP 세션에서 포커스 에뮬레이션을 활성화해 15개 스토리를 확인했다. 휴대폰 인증·가입 약관·회원 정보의 WEB/Mobile 기본 스토리 6개, consent 오류·비활성·제어형, Radio 레이블, 고객센터 loadMore·footer 없음·custom footer·모바일·compact 모바일 스토리에서 오류가 없었다. 동의 오류 해제·링크 클릭 유지, 라디오 클릭·방향키, 더보기 콜백까지 play 검사를 수행했다.
- 실제 공지 더보기를 눌러 목록 증가와 버튼 제거를 확인했고 consent의 aria-describedby→alert 연결·비활성 레이블의 미토글, 라디오 가로 배치·24px 간격·pre-line 줄바꿈을 별도로 확인했다. 폼·정책 로직을 공통 컴포넌트로 옮기지 않았다.

Storybook은 의존성의 module-level directive·번들 경고를 출력했으나 빌드는 성공했다. 임시 검증 서버·브라우저는 종료하고 기존 사용자 서버는 유지한다.

## Storybook 자동 입력과 브라우저 포커스 (2026-10-28)

Codex가 정적 Storybook `Molecules/FormFields/Controlled`의 자동 play 실패 원인을 Ego 브라우저에서 확정했다. 대상은 래퍼 전환 검증에서 만든 `storybook-static`과 `src/stories/components/common/molecules/FormFields/FormFields.stories.tsx`이며 이번 분석에서 앱·스토리 소스는 수정하지 않았다. 기존 생성·출처·신뢰 메타데이터는 보존한다.

문서는 `visibilityState === 'visible'`이지만 `document.hasFocus() === false`였다. 이 환경에서는 `userEvent.type`의 focus 호출이 activeElement를 바꿔도 focus 이벤트가 발생하지 않았다. Storybook에 포함된 userEvent는 `prepareDocument`의 focus 리스너에서 `prepareElement`를 호출해 입력값 interceptor를 설치한다. 이벤트가 빠지면서 이 준비도 누락됐다. userEvent가 DOM value를 설정할 때 React의 value setter를 그대로 호출해 `_valueTracker`까지 새 값으로 갱신했고, React는 뒤따르는 input 이벤트를 변경 없음으로 처리했다. onChange는 호출되지 않고 React name 상태는 빈 값, DOM 값은 홍길동, aria-invalid는 true로 남았다.

이벤트·속성 추적에서 포커스가 없을 때에는 focus 이벤트와 interceptor가 없고 첫 input의 DOM과 tracker가 모두 홍이었다. 포커스가 있을 때에는 focus 이벤트와 interceptor가 존재했고 첫 input의 DOM은 홍, tracker는 이전 빈 값이어서 React 상태가 갱신됐다. userEvent의 `patchFocus`는 hidden 문서에 보완 이벤트를 보내므로 이번 visible·unfocused 조건에는 적용되지 않는다.

| 폭     | 포커스 에뮬레이션 | document.hasFocus() | 자동 play 결과                           |
| ------ | ----------------- | ------------------- | ---------------------------------------- |
| 390px  | 비활성            | false               | 이름 오류 해제 검사 실패, 제출 0회       |
| 390px  | 활성              | true                | 전체 play 통과, 예상 FormData로 제출 1회 |
| 1440px | 비활성            | false               | 동일 실패, 제출 0회                      |
| 1440px | 활성              | true                | 전체 play 통과, 예상 FormData로 제출 1회 |

네 실험 모두 문서 visibility는 visible이었다. 같은 번들·시나리오에서 포커스 조건만 바꿔 실패와 성공이 전환됐으므로 이 실패는 브라우저 검증 환경의 포커스 조건에 기인한다. 래퍼 제거·검증 로직·렌더 대기 시간 문제로 분류하지 않는다. 성공한 전체 play에는 오류 표시·해제, 전화번호 입력, 비밀번호 보기, 인증번호 6자리 제한, 카운트다운·textarea 카운터와 최종 FormData 검사가 포함된다.

Ego Page에서 검증할 때에는 탐색·자동 play 시작 전에 `await page.cdp('Emulation.setFocusEmulationEnabled', { enabled: true })`를 실행하고 동일한 CDP 세션 안에서 검증한다. 별도 ego-browser 호출에도 설정이 유지된다고 가정하지 않는다. 이 현상을 모든 Storybook 실행기·브라우저로 일반화하지 않는다.

근거 구현은 설치된 `node_modules/storybook/dist/test/index.js`의 `prepareDocument`, `prepareElement`, `prepareValueInterceptor`, `patchFocus`와 React DOM의 `trackValueOnNode`, `updateValueIfChanged`다. 원시 이벤트·대조 실험 로그는 세션 임시 `hoka-play-analysis-20261028/results.json`에 기록했으며 영구 저장소 산출물로 의존하지 않는다.

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

## 반응형·공통 폴더·Badge 회귀 검증 (2026-10-28)

공통 폴더 이동에 따라 form-controls의 직접 import와 동적 fixture 경로, import-order의 샘플 경로를 갱신했다. 자동 플랫폼의 SSR web 및 명시 web/mobile, Badge 기본/출시 상태와 프로모션 순서·구분선·weight·빈 배열 검사를 추가했다. 전체 Node 테스트 77개와 타입·lint·Panda·Next/Storybook 빌드가 통과했다. 실제 경계 폭과 상태 수명 검증 범위는 [구현 기록](../architecture/responsive-platform-2026-10-28.md#검증-codex-2026-10-28)에 명시했다. 작업 트리 출처: tests/form-controls.test.mjs, tests/import-order.test.mjs.

커밋 전 재검사에서 다른 작업의 next/image 적용으로 Node ESM 해석 오류가 확인되어 form-controls 테스트 로더의 Next 모듈 해석 목록에 next/image를 추가했다. 실제 컴포넌트를 유지한 채 전체 77개 테스트가 다시 통과했다.

## 버튼 아이콘 모드·타입 검증 위치 (2026-10-28)

Button.type-test.tsx는 src/types/type-tests/에서 npm run typecheck에 포함된다. 일반 버튼의 variant/size 오류 사례를 유지하고 아이콘 모드의 치수·shape·tone·loading 정상 사례와 텍스트/아이콘 옵션 혼용 오류를 추가했다. form-controls 테스트는 새 Button 경로를 사용하며 직접 자식 SVG, 기본·숫자·CSS 길이 치수, type/form 전달, 옵션의 DOM 누출 방지, loading의 aria-busy·비활성화와 disabled tone의 표현 전용 계약을 검사한다. import-order 및 OKF 매핑 테스트의 버튼 예시 경로도 평탄화했다.

작성: codex/gpt-6, 2026-10-28T10:35:32.419Z. 출처는 위 working_tree_sources의 이번 작업 트리 변경이며 기존 source_revision의 검증 기록과 구분한다.

검증: npm run typecheck·npm run lint·Panda 생성·Next production build·Storybook production build가 통과했다. form-controls·import-order·OKF 회귀 테스트 60개와 빌드 후 App Router 테스트 2개가 통과했다. 변경 파일의 Prettier 검사도 통과했다. 새 정적 Storybook을 별도 6028 포트에서 Ego로 실행해 기본 36px·원형 24px 치수, 직접 SVG 자식, 실제 disabled·loading/aria-busy, 375px 키보드 포커스와 모바일 바텀시트 클릭·Enter 닫기/다시 열기를 확인했다. 기존 일반 ButtonLink의 /support/faq 링크를 확인했고 두 문서의 렌더링과 코드 복사 결과를 페이지 내 Clipboard API 테스트 대역으로 검사했다. 아이콘 예제 코드는 평탄화된 Button import와 variant="icon"을 포함한다. 전체 화면의 픽셀 비교나 전체 접근성 인증을 수행했다는 뜻은 아니다. 기존 Storybook 번들 지시문·성능 경고는 빌드 실패가 아니었다.

## 보조 TS 모듈의 사용처별 배치 (2026-10-28)

계정 복구·주문 합계·상품 상세 표시의 기존 테스트 import를 새 소유 경로로 갱신했다. 테스트의 검증 로직과 시나리오는 유지한다. 이번 검증 결과와 전체 이동 목록은 아래 기록을 참고한다. [이동 목록과 검증](../architecture/ts-module-ownership-2026-10-28.md).

작성: codex/gpt-6, 2026-10-28T10:52:23.370Z. 이번 작업 트리 출처는 위 working_tree_sources이며 고정 source_revision의 과거 이력과 구분한다.

## 더보기·소셜 버튼 부모 옵션 검증 (2026-10-28)

Button.loadMore·Button.social·ButtonLink.loadMore의 배타적 타입 사례를 src/types/type-tests/Button.type-test.tsx에서 검사한다. Prettier로 여러 줄이 된 JSX의 @ts-expect-error 위치를 맞춰 실제 진단을 소비하도록 수정했으며 후속 타입 검사와 Next 빌드가 통과했다. tests/form-controls.test.mjs에 남은 수량 0·커스텀 라벨·type/form 유지, 수량 링크의 실제 anchor/href·role, loading 비활성화와 카카오/네이버 아이콘·DOM 옵션 누출 검사를 추가했다. 기존 일반·아이콘 버튼 검증을 유지했고 폼·import 순서 테스트 56개 및 빌드 후 App Router 테스트 2개가 통과했다.

이전 래퍼 스토리와 새 부모 옵션 스토리의 PC 1600px·375px 사례 18개에서 DOM 구조, 위치·치수, 색상·배경·글꼴·굵기·행간·간격·패딩·그림자와 아이콘 경로를 비교해 모두 일치했다. 래퍼 제거로 Typography의 한글 탐지 대상이 바뀌던 부분은 기존 바깥 스케일을 명시해 보존했다. Storybook은 다른 작업의 출력과 분리한 .tmp-button-options-storybook에 빌드했고 비교 전후 페이지는 별도 6018/6019 포트에서 확인했다. 스크린샷 픽셀 비교나 전체 접근성 인증을 수행했다는 의미는 아니다.

작성: codex/gpt-6, 2026-10-28T10:54:54.282Z. 출처는 위 working_tree_sources의 이번 작업 트리 변경이며 전체 작업 트리의 다른 작업 검증과 구분한다.

브라우저 상호작용에서는 제어형 수량 1→2→3 이후 비활성화, 두 모드의 loading/aria-busy, 수량 링크의 href와 링크 의미, 로그인 소셜 미지원 안내, 가입의 두 제공자 안내 모달 열기·확인 닫기, 쿠폰 5→10개 확장, 리뷰 페이지 수 1/7→2/7과 고객센터 일반 링크를 확인했다.

## 화면 바인딩 계약 보완 (2026-10-29)

도메인별 현재 데이터·비동기 요청 계약, 실제 상품 ID의 장바구니/결제 표시, 리뷰 데이터와 데모 이미지 경계를 보완했다. AGENTS.md와 component-reusability 스킬에 같은 기준과 상세 워크플로를 추가하고 페이지 소유권·폼 가이드에 연결했다. [계약과 적용 범위](../architecture/data-binding.md).

- 변경 파일 ESLint --fix·Prettier를 적용했고 최종 전체 lint와 typecheck를 통과했다.
- `node --test tests/*.test.mjs`의 87개 테스트가 통과했다. cart-display 회귀 테스트 2개는 실제 색상명을 가진 상품 이미지 보존과 명시적 fixture override를 검사한다.
- Panda 생성, Next production build, 별도 임시 폴더 Storybook production build가 통과했다. Storybook 의존 패키지의 module directive·번들 시간 경고는 빌드 실패가 아니다.
- Ego 브라우저에서 Integration/Binding 8개 스토리의 play 검증을 통과했다. 비목 상품 ID·서버 견적·완전한 주문 payload(저장 배송지 ID 포함), 결제/로그인/인증/배송지 삭제/구매 확정/리뷰 저장 실패와 재시도, 늦게 도착한 목록, 리뷰의 문자열 ID와 상품 정보를 확인했다. 결제 pending 시 제출 버튼 비활성화와 성공 전 장바구니 유지도 확인했다.
- 기존 장바구니 기본·선택, 결제 기본·완료·쿠폰의 PC/모바일 10개 스토리를 확인했다. 위 18개 사례 모두 play/render 예외가 없고 main은 하나이며 가로 overflow가 없었다. 단순한 Storybook finished 상태 대신 playFunctionThrewException·storyThrewException·storyErrored 이벤트도 확인했다. 1440px PC와 375px 모바일 결제 스크린샷을 시각 검토했다. 이전 버전과의 픽셀 비교는 수행하지 않았다.
- 정책·스킬 참조 문서의 로컬 링크와 SKILL.md의 단순 scalar frontmatter, 이름/설명 제한, 미완성 placeholder 부재를 검사했다. 기본 Python에 PyYAML이 없어 skill-creator quick_validate.py는 실행되지 않았으며, 현재 두 필드 형식에 맞는 별도 검사로 검증했다.
- 실제 API/인증/결제 서버는 연결하지 않았다. 실제 DTO 변환, 조회 취소/응답 순서 보장, 저장 성공 이후 재조회는 개발팀의 서비스 연결 책임이다.

출처: 위 working_tree_sources와 현재 작업 트리. 작성: codex/gpt-6, 2026-10-29T00:15:42Z. Git index는 변경하지 않았으며 커밋·푸시하지 않았다.

## 남은 화면 바인딩·환불 논리·전체 소스 주석 검증 (2026-10-29)

[연결 계약과 인계 주석](../architecture/data-binding.md#나머지-화면의-연결과-상세-주석-2026-10-29)을 적용했다. 매장 지도와 기존 refund-account 경로의 diff는 없으며 기존 스타일을 복제/교체하는 작업은 하지 않았다.

- 전체 ESLint, TypeScript 검사, Panda 생성과 Next.js production build, 별도 임시 폴더 Storybook production build를 통과했다. 기존 MainContentCard의 Next/React import 그룹 간격도 수정했다.
- `node --test tests/*.test.mjs`의 90개 테스트를 통과했다. 새 문의 테스트는 비목 ID 복원, 실패/중단 시 저장 선택 유지, 최신 선택이 도착했을 때 오래된 복원 무시를 검사한다. 주문 정책은 취소 비용 없음, 고객 귀책 반품비 차감, 회사 귀책/무료반품/쿠폰, 기타 비용 미확정을 검사한다.
- Integration/RemainingBinding의 16개 play 사례에서 예외가 없었다. 서버 FAQ 검색/동일 제목의 서로 다른 ID/지연 응답, 실제 공지 ID 링크와 BO 본문, 문의 질문/답변, Strict Mode의 실제 주문 선택 복원, File[] 포함 문의 payload와 등록 실패/재시도, 쿠폰 실패 후 코드 유지/성공 후 초기화, 결제수단 취소/실패/성공, 실제 찜 ID와 오류 후 행 유지, 런클럽 정원/예약금/접수 실패/재시도를 확인했다.
- 같은 16개 사례에서 PC/모바일 반품 견적 전 제출 차단, 사유 변경 후 새 견적 대기, 견적 ID/선택 수량을 포함한 접수 payload, 실패 후 시트 유지와 재시도도 확인했다. 비밀번호 변경의 resetProof, 늦게 도착하고 교체된 프로필의 편집 원본, BO 가입 약관, 서버 인증 proof/약관 버전/회원정보를 포함한 실제 가입 요청 실패/재시도를 확인했다.
- 기본 가입 입력/약관·프로필·쿠폰·FAQ·공지·런클럽·홈의 PC/모바일 대표 화면 14개와 기존 Integration/Binding 8개, 총 22개를 회귀 확인했다. 각 화면의 main은 하나였고 가로 overflow가 없으며 play/render 예외가 없었다. PC 1440px 가입 입력과 모바일 375px 프로필 스크린샷도 시각 검토했다. 이전 소스와 픽셀 비교를 수행한 것은 아니다.
- 서버 페이지 크기를 임의로 추정하지 않도록 더보기 카운터는 실제 pageInfo 또는 읽은 항목 수/전체 건수를 사용한다. 이 최종 보완 뒤 FAQ PC/모바일·쿠폰 3개 play 사례와 타입/lint/Next/Storybook 빌드를 다시 통과했다.
- Storybook의 finished 상태만 보지 않고 playFunctionThrewException/storyThrewException/storyErrored 이벤트도 확인했다. 임시 정적 서버의 모듈 로드 실패는 캐시/서버 로깅을 정리하고 별도 포트의 최종 빌드에서 검증했다. 실제 앱 예외와 구분한다.
- 소스 111개 파일의 [개발팀 바인딩] 주석에 연결 소유자·입출력·요청/오류·갱신 책임과 현재 미연동 지점을 적었다. 운영 API·인증·결제사·BO·지도 SDK를 실제로 연결한 것은 아니며 댓글만 있는 미연동 영역도 구현 완료로 표시하지 않았다.
- `npm run okf:check`와 diff 공백 검사를 통과했다. index를 변경하지 않았고 커밋·푸시하지 않았다.

작성: codex/gpt-6, 2026-10-29T01:27:30Z. 출처는 위 working_tree_sources와 이번 작업 트리이며 기존 검증 이력은 보존했다.

## IA 파일 자동 갱신 검증 (2026-10-29)

작업 트리 출처는 tests/screen-files.test.mjs, scripts/screen-files.mjs, src/app/screen-index/의 화면·연결 코드다. node --test tests/screen-files.test.mjs로 별칭, 재수출, 순환 import, 리터럴 동적 import, 타입 전용/스토리 제외와 파일 이동·삭제를 확인한다. 같은 테스트에서 구형/현재 바인딩 표기 인식과 공통 UI·범용 훅·Preview 제외를 검증했다. 실제 watch 실행 중 임시 바인딩 파일의 추가·이름 변경·삭제가 생성 결과에 반영되는 것을 확인하고 임시 파일을 제거했다.

브라우저에서 작업자 열 없는 8열 전체 행 정렬, 관련 파일 펼치기, RunClubDataContext 경로 검색 결과, Button 파일 검색의 빈 결과와 공통 UI 경로 미노출을 확인했다. 375px에서는 표 내부 가로 스크롤과 펼침 상태 유지를 확인했다. 실제 외부 API 연결은 변경하거나 검증하지 않았다.

정적 검증: 전체 lint, 타입 검사, 변경 코드/생성 JSON의 Prettier, 생성기 테스트와 npm run okf:check를 통과했다. Panda 생성과 Next.js 프로덕션 빌드를 통과했다. Storybook 기본 출력 폴더 빌드는 정적 파일 복사 EEXIST로 실패해 별도 .tmp-ia-storybook-20261029 출력 폴더에서 재실행했고 프로덕션 빌드를 통과했다. 이 검증은 Storybook play 실행을 포함하지 않는다.

## IA 플랫폼별 상태 검증 (2026-10-29)

작업 트리 출처: tests/screen-progress.test.mjs, src/app/screen-index/storybookLinks.ts, src/app/screen-index/_components/IaStructurePage.tsx, src/stories/features/screen-index/IaStructurePage.stories.tsx. 신규 Node 테스트 2개는 기존 완료/진행/대기 이관 우선순위, 디자인 미추정, 비fixture IA 번호의 PC/MO 독립값과 값 교체 후 기본값 복귀를 확인한다. 기존 screen-files 테스트와 함께 3개를 통과했다. 전체 lint·타입 검사·Panda 생성·Next 프로덕션 빌드를 통과했다.

브라우저 앱에서 NAV 16개와 진행 막대·상태 집계 문구·긴급 이슈 제거, 266개 화면 모두 10열과 rowSpan=2/colSpan=9가 맞음을 확인했다. 수급 필터에 미확인 디자인이 노출되지 않고, 확인 전 필터에는 삭제 제외 249개가 나타난다. 회원가입 NAV는 13개로 필터링한다. Storybook의 검증용 PlatformProgress에서 회원가입 안내는 수급/미수급/완료/대기, 휴대폰 인증은 미수급/수급/진행중/완료로 표시되며 MO 미수급 필터와 WEB/Mobile 링크를 확인했다. 스토리 fixture는 실제 수급·퍼블리싱 진척 데이터가 아니다. 전체 Storybook play와 작은 모바일 레이아웃 재검증은 하지 않았다.

Storybook 프로덕션 빌드도 별도 출력 폴더 .tmp-ia-progress-storybook-20261029에서 통과했다. 이는 전체 Storybook play 실행과 구분한다.

IA 헤더·본문의 최신 배치는 7열·두 행이며 이전 10열/파일 colSpan=9 검증을 대체한다. 전체 tbody와 thead의 rowspan/colspan 그리드 누락·겹침 없음, 1535px 화면, 375px platform-mobile 내부 가로 스크롤, 전체 접기 뒤 파일 미잔존, Storybook fixture의 디자인 윗줄·퍼블리싱 아랫줄과 WEB/Mobile 링크를 확인했다. 타입·변경 파일 lint/포맷·Panda·diff 검사를 통과했으며 이 배치 변경의 프로덕션 빌드는 다시 실행하지 않았다. 작업 트리 출처: src/app/screen-index/_components/IaStructurePage.tsx.

## 첨부 디자인·소스 대조 상태 검증 (2026-10-29)

변경 TS/TSX·테스트의 ESLint/Prettier, 타입 검사, Panda 생성과 diff 공백 검사를 통과했다. 작업 트리 기준 OKF 매핑 누락은 없다. 마지막 IA 검색/필터 재검사에서는 localhost:3000 연결이 거절되어 검사를 마치지 못했으며, 앞서 확인한 IA 비고 노출과 구분한다.

`node --test tests/screen-progress.test.mjs` 10개를 통과했다. 디자인 수급과 퍼블리싱 완료의 독립성, 플랫폼별 수정, 주문 PC 수정예정·MO 팝업 미수급, 사용자 확인 장바구니 MO 완료 보존 및 외부 override 우선순위를 확인했다. 브라우저 DOM에서 약관 상세 빈 본문, 이전 약관 데모 선택 제한, 홈으로 링크, 고객센터 본문 및 IA 비고 노출을 확인했다. 창 최소화로 스크린샷을 확보하지 못해 전체 픽셀/반응형 시각 검증은 수행하지 않았다. 작업 트리 출처는 `tests/screen-progress.test.mjs`, `src/app/screen-index/storybookLinks.ts`, `src/app/screen-index/_components/IaStructurePage.tsx`다. [대조 결과](../architecture/design-source-comparison-2026-10-29.md)를 참고한다.


## 첨부 디자인 반영 검증 (2026-10-29)

최종 프로덕션 빌드에서 컴파일·타입 검사·58개 정적 페이지 생성이 성공했다. Panda 생성과 변경 소스 ESLint/Prettier·diff 검사·작업 트리 OKF 매핑 검사도 통과했다. UI/서비스 연결 범위는 아래 구현 기록을 따른다.

기존 표시·주문 요약·IA 테스트 15개와 변경 소스 타입/ESLint/Prettier를 통과했다. 1440px PC/390px MO 6개 경로 렌더·알럿/문서 가로 넘침과 스크린샷을 확인했다. 외부 쿠폰 응답·실패/재시도 스토리는 추가했으며 실행 결과는 별도 기록한다. [구현 범위·출처·검증](../architecture/design-implementation-2026-10-29.md).


후속 검증: 계정/장바구니/주문 요약/IA 모델 19개 및 새 DesignBinding의 PC/MO 쿠폰·취소 4개 play를 통과했다. 쿠폰 실패 후 선택 유지·재시도·제출 payload와 서버 신청 ID 취소를 확인했다. 17개 경로의 PC/MO 렌더와 1024/1025·1199/1200 경계 및 열린 모달 왕복 전환을 확인했다. [기록](../architecture/design-implementation-2026-10-29.md).

## 첨부 디자인 재검수 (2026-10-29)

회원가입·로그인·고객센터·마이페이지·장바구니·주문의 첨부 확대본, 현재 소스와 PC 1440px/MO 390px 앱을 대조했다. 주요 경로의 본문 DOM·비어 있지 않은 알럿·문서 가로 넘침을 확인하고 홈·프로필·등급·쿠폰·배송지·신청내역·FAQ·공지·장바구니·주문 등을 스크린샷으로 읽었다. 경로 렌더만으로 모든 상태의 시각 일치를 추정하지 않는다. 명확한 차이와 이전 판정 정정은 [재검수 기록](../architecture/design-reaudit-2026-10-29.md)에 있다.

`tests/screen-progress.test.mjs`의 기존 10개 테스트를 갱신해 통과했다. PC/MO 독립 상태, 디자인 수정예정 보존, 미수급과 대기, 범위 밖 기존 초기값과 명시적 override 우선순위를 확인한다. 실제 서비스 요청·모든 모달·경계 해상도 회귀와 프로덕션 빌드는 이번 데이터 변경에서 다시 실행하지 않았다.

추가로 타입 검사, 변경 TS·테스트 ESLint/Prettier, `git diff --check`, 작업 트리 OKF 매핑 검사를 통과했다. IA 검색으로 쿠폰 174 양쪽 완료·아이핀 235 양쪽 대기·FAQ 공유 화면 185/207 양쪽 완료·회원등급 195 양쪽 수정 및 상세 비고를 확인했다. 회원등급 검색에서 MO 완료 필터는 빈 결과, MO 수정 필터는 해당 화면을 표시했다. 소스 그래프는 바뀌지 않았다.

## 퍼블리싱 고정 상태 preview 검증 (2026-10-30)

[상태 URL·소유권·미확정 목록](../architecture/publishing-state-previews-2026-10-30.md)의 새 preview 61개를 검증했다. 기존 2개를 포함해 모든 preview가 활성 IA에서 도달 가능하고 진입 파일이 생성 그래프에 포함되는지 검사한다. preview 링크의 행별 중복·미구현 URL과 삭제된 198/활성 200 매핑 회귀도 검사한다.

- 전체 TypeScript 검사, 변경 TS/TSX·테스트의 ESLint 및 Prettier, Panda 생성, 최종 Next production build와 Storybook production build 통과.
- `node --test`에 tests의 모든 `*.test.mjs`를 전달해 105개 통과. 명시적인 App Router 기대 목록도 새 라우트로 갱신했다.
- Ego 브라우저에서 production 서버의 새 preview 61개를 1280px PC와 375px 모바일로 각각 직접 열었다. 122건에서 예상 플랫폼 클래스가 적용되고 수집한 window error·서비스 오류 fallback이 없었다. 모바일 61건은 문서의 수평 overflow가 없었다. 이것은 전체 픽셀 비교나 실제 API 검증을 뜻하지 않는다.
- 기본 화면 13개(장바구니·로그인·주문서·마이페이지·쿠폰·회원정보·신청내역·문의 목록/등록/주문선택·가입정보/약관·런클럽)의 PC/MO 26건 직접 진입에서 런타임 오류가 없었다. 기존 전체 서비스 상호작용을 재검사한 것은 아니다.
- screen-index의 상태명/URL 검색, 신청내역 200번의 기본·빈 목록 링크, 새 창으로 주문서 오류 preview 열기와 모바일 첨부 오류 링크 노출을 확인했다. 중복된 문의 IA 189·211에는 같은 preview가 각각 표시되는 것이 의도다.
- 주문서에 입력해도 필드 오류가 유지되고 제출/완료 이동이 발생하지 않으며, 리뷰의 입력·별점·저장 이후 고정 오류와 입력값이 유지됨을 확인했다. 리뷰 모달은 Escape로 닫히고 다시 연 뒤 닫으면 '리뷰 작성' 버튼으로 포커스가 돌아왔다. 약관 전체동의 후에도 고정 오류를 유지하며 가입정보 오류 페이지 새로고침에서도 9개 필드 오류가 바로 표시됐다. 모바일 리뷰 오류 화면 캡처를 확인했다.
- 리뷰 모달을 연 상태로 1024/1025·1199/1200px를 순서대로 바꿔 단일 모달과 platform 전환을 확인했다. 1025px에서는 1200px PC canvas에 따른 175px, 1199px에서는 1px 차이가 있었고 1200px에서는 추가 수평 overflow가 없었다. 플랫폼 구현 자체는 변경하지 않았다.
- 전체 `npm run lint`는 이번에 수정하지 않은 publishing-guide의 ButtonGuide/FormGuide/TypographyGuide/page import 정렬 오류 9건으로 실패했다. 해당 파일은 작업 범위와 커밋에서 제외한다. Storybook은 기존 번들/플러그인 타이밍 경고와 함께 빌드됐다.

마지막 보완에서는 FAQ의 조건 변경 후에도 빈 결과/페이지 수가 유지되도록 하고, 휴대폰 약관의 체크값과 고정 오류 표시를 분리했다. 실제 PhoneVerificationContent를 서버 렌더링해 모든 약관이 체크된 경우에도 preview에서만 4개 invalid가 유지되고 일반 폼에는 invalid가 생기지 않는 회귀 검사를 추가했다. 최종 소스의 타입·Next/Storybook 빌드와 관련 검사도 다시 수행했다.

preview는 고정 표시만 검증한다. 기존 화면의 서비스 계약, 실제 요청 실패·재시도, 인증·결제·외부 PG는 이번 검증 대상이 아니다. 미확정 디자인을 구현 완료로 바꾸거나 IA 진행 상태를 변경하지 않았다.


## 문의 대기·완료 목록 통합 검증 (2026-10-30)

`/support/inquiries/preview-list`에서 대기·완료 각 1건을 함께 표시한다. 기존 두 상태 route를 제거하고 IA 187·210과 PC/MO Storybook의 List 사례를 같은 목록으로 연결했다.

- 타입 검사, 변경 파일 ESLint/Prettier, Next production build와 Storybook production build 통과.
- App Router·preview 링크·소스 그래프 관련 Node 테스트 6개 통과. 현재 route manifest에 통합 경로가 있고 제거한 두 route가 없으며 모든 preview가 활성 IA에 연결됨을 확인했다.
- localhost:3000의 개발 화면을 브라우저로 열어 1280px PC와 375px MO 모두 두 질문·접수완료/답변완료 상태가 함께 보이고 수평 overflow가 없음을 확인했다. 완료 답변을 접어도 두 질문은 유지되고 다시 펼칠 수 있다.
- screen-index에서 새 URL로 검색하면 두 원본 IA의 통합 목록 링크가 표시되고 옛 두 상태 링크는 없었다. 서비스 등록·답변 변경은 구현하거나 검증하지 않았다.

## Empty 문구와 화면 목록 정리 검증 (2026-10-30)

사용자 확정 문구·IA 정리 범위를 검증했다. 타입 검사, Next production build와 preview 링크·그래프·화면 진행 상태 테스트 14개가 통과했다. 새 URL 2개를 기존 라우트 manifest 검사에 추가한 뒤 관련 테스트 16개가 통과했다. 변경 파일 ESLint도 통과했다. 실제 컴포넌트의 서버 렌더링으로 쿠폰·공지 각각 완료 Empty 표시, pending·실패 시 Empty 미표시 6건을 확인했다. 브라우저에서는 1280/375px에서 세 Empty와 세 기본 목록의 문구를 확인했으며 리뷰 Empty의 탭 전환 후 기존 ‘작성한 리뷰가 없습니다.’를 유지했다. 최종 모바일 재확인에서 리뷰 기본 목록의 가로 넘침이 없었다. 변경된 IA 158의 이름·PC/MO 수급·비고, 회원가입 전용 IA 링크 유지와 상위 중복 제거를 DOM에서 확인했다. 기획전 IA 167의 미수급·대기·링크 없음과 새 Empty URL 검색 결과도 확인했다. 스크린샷 캡처는 CDP timeout으로 완료하지 못했으며 시각 검수 완료로 기록하지 않는다. 외부 API 요청·실제 쿠폰 등록·운영 디자인 승인 검증은 수행하지 않았다.

## 상품문의 Empty 전체 상세 검증 (2026-10-30)

타입 검사와 변경 소스 ESLint, Next production build를 통과했다. preview 링크·IA 진행 상태·파일 그래프·route manifest 테스트 16개가 통과했다. 생성 명령 실행 후 import 그래프의 추가 변경은 없었다.

브라우저 DOM으로 1280px PC·375px 모바일에서 기존 Clifton 11 GTX 상품명·갤러리·사이즈 선택과 문의 0건·빈 안내가 전체 상세에 함께 표시되는 것을 확인했다. 기본 `/products/shoe-1`은 문의 목록을 유지한다. 모바일 Empty 아코디언은 초기 열림이며 접기/펼치기 소유자는 유지했다. 최종 모바일에서 fragment 대상의 상단 76px 여백과 가로 넘침 없음, PC에서 문의 영역으로 이동을 확인했다. screen-index의 ‘상품문의 없음’ 링크를 실제 클릭해 새 창의 전체 상품 상세·Empty·fragment URL을 확인했다. 픽셀 대조나 실제 상품 조회/장바구니 요청은 검증하지 않았다. 출처는 `ProductDetailContent.tsx`, `screenConnections.ts`, `preview-empty-inquiries/page.tsx`, `tests/preview-links.test.mjs` 및 이 채팅의 브라우저 확인이다.

## 러닝 세션 경로 이전 정적 검사 (2026-10-30)

preview 링크·IA 진행 상태·소스 그래프 Node 테스트 14개를 통과했다. 기존 Next 생성 타입이 이전 run-club 경로를 참조하여 첫 타입 검사는 실패했으며 라우트 타입 재생성 후 재검사한다. 브라우저·빌드 결과는 후속 검증에서 별도 기록한다. 출처: tests/preview-links.test.mjs, tests/screen-progress.test.mjs, tests/screen-files.test.mjs.

출처: 사용자 확정 결정과 현재 작업 트리. 생성 시점은 frontmatter를 따른다.

## Featured 하위 러닝 세션 계층 정정 (2026-10-30)

사용자 후속 확인에 따라 독립 D2 Running Session 묶음을 제거했다. IA 155·258·259는 모두 EXPLORE > Featured > Running Session에 속하며 기존 목록·상세 번호와 상태 링크는 유지한다. 목록·상세 상태 행은 D4에 배치하고 페이지 연결은 D3 Running Session에서 제공한다. tests/preview-links.test.mjs는 세 IA의 D1~D3 일치와 독립 D2 부재를 검사한다. 출처: src/data/screenRegistry.ts, tests/preview-links.test.mjs.

출처: 사용자 확정 결정과 현재 작업 트리. 생성 시점은 frontmatter를 따른다.

## 매장 찾기 정보 목록 정리 (2026-10-30)

매장 목록 변경 후 TypeScript 검사를 통과했다. 탭·지도·길 찾기를 제거하고 네 매장 예시와 누락된 영업시간의 조건부 표시를 유지한다. 브라우저 PC/MO 확인 결과는 후속 검증으로 별도 기록한다. 출처: src/app/support/store와 관련 표시 타입.

출처: 사용자 확정 결정과 현재 작업 트리. 생성 시점은 frontmatter를 따른다.
