# HOKA Front Office

HOKA 쇼핑몰의 PC·모바일 화면을 구현하는 Next.js 기반 퍼블리싱·데모 프로젝트다. 상품 탐색, 회원, 장바구니·주문, 마이페이지, 고객지원과 러닝 콘텐츠 화면을 제공한다. 상품·회원·주문 API와 실제 결제는 연결하지 않았다.

## 개발 환경

| 항목          | 구성                               |
| ------------- | ---------------------------------- |
| 런타임 기준   | Node.js `24.21.0`, npm `11.19.0`   |
| 프레임워크    | Next.js `16.3.5`, App Router       |
| UI            | React·React DOM `19.2.8`, Base UI  |
| 언어·스타일   | TypeScript, Panda CSS, 전역 SCSS   |
| 컴포넌트 검수 | Storybook, Next.js Vite 프레임워크 |

Next.js와 React·React DOM 버전은 고정한다. 의존성은 `package-lock.json`을 기준으로 설치한다.

## 실행

저장소 루트에서 실행한다. PowerShell에서 `npm.ps1`이 실행 정책으로 차단되면 `npm` 대신 `npm.cmd`를 사용한다.

```sh
npm ci
npm run dev
```

`npm ci`는 Panda 코드·CSS를 생성하고 Git 훅을 설치한다. `npm run dev`는 Panda 생성 후 Next.js 개발 서버와 CSS 감시 작업을 함께 실행한다. 기본 앱 주소는 `http://localhost:3000`이다.

| 명령                      | 용도                                      |
| ------------------------- | ----------------------------------------- |
| `npm run dev:all`         | 앱·Storybook·Panda CSS 감시 동시 실행     |
| `npm run storybook`       | Storybook 실행 (`http://localhost:6006`)  |
| `npm run panda`           | Panda 코드·CSS 재생성                     |
| `npm run build`           | Panda 생성 후 Next.js 운영 빌드           |
| `npm run start`           | 빌드된 앱 실행                            |
| `npm run build-storybook` | 정적 Storybook 생성 (`storybook-static/`) |

`npm ci --ignore-scripts`로 설치했다면 `npm run panda`와 `npm run hooks:install`을 직접 실행한다. Storybook 단독 실행도 생성 스타일이 먼저 필요하다.

## 화면과 데모 범위

| 영역          | 대표 경로                                                                             |
| ------------- | ------------------------------------------------------------------------------------- |
| 홈·상품·검색  | `/`, `/products`, `/products/[id]`, `/collection/[id]`, `/search`                     |
| 장바구니·주문 | `/cart`, `/checkout`                                                                  |
| 회원          | `/login`, `/signup` 및 계정 찾기·잠금 해제·가입 하위 경로                             |
| 마이페이지    | `/mypage` 및 주문·리뷰·쿠폰·회원정보 등 하위 경로                                     |
| 브랜드·콘텐츠 | `/explore`, `/explore/[...slug]`, `/launch-calendar`, `/locales`, `/store/experience` |
| 러닝          | `/running/run-club`, `/running/run-club/[sessionId]` 및 러닝 하위 경로                |
| 고객지원      | `/support` 및 FAQ·공지·문의·매장·약관 등 하위 경로                                    |

실제 경로는 `src/app/**/page.tsx`가 결정한다. 라우트 회귀 테스트는 63개 경로 패턴을 검사하며, 미등록 URL은 `src/app/not-found.tsx`에서 처리한다. `src/data/screenRegistry.ts`는 IA 메타데이터이므로 화면 완성 여부를 나타내지 않는다.

- PC·모바일은 루트 레이아웃에서 User-Agent로 선택한다. 휴대폰·태블릿은 `mobile`, 그 외는 `web`이며 화면 너비만 줄여서는 플랫폼이 바뀌지 않는다.
- 로그인은 데모 검증과 `localStorage` 플래그를 사용한다. 실제 계정 인증과 소셜 로그인은 연결하지 않았다.
- 장바구니는 클라이언트 페이지 이동 중 유지되며 새로고침하면 초기화된다.
- `/checkout`은 배송 정보·결제 수단·주문 합계·완료 상태를 제공한다. 데모 주문 완료 시 장바구니를 비우며 실제 주문 저장이나 결제 승인은 수행하지 않는다.

## 코드 구조와 작업 기준

| 위치                                        | 책임                                             |
| ------------------------------------------- | ------------------------------------------------ |
| `src/app/`                                  | URL별 진입점, 루트 레이아웃과 404                |
| `src/context/ShopShell.tsx`, `src/context/` | 로그인·장바구니 공통 상태와 플랫폼 전달          |
| `src/components/`                           | 기능별 화면, 상태·탐색 처리, 표시 조합과 정책    |
| `src/components/common/`                    | 공통 atoms·molecules·organisms·layouts           |
| `src/lib/`                                  | 기기 판별·이름 검증·인증 타이머 등 공용 로직     |
| `src/styles/`, `panda.config.ts`            | 전역 스타일, 디자인 토큰과 플랫폼 조건           |
| `src/mocks/`, `src/data/`                   | 목 상품과 IA 메타데이터                          |
| `src/stories/`                              | 컴포넌트·기능 화면 Storybook                     |
| `tests/`                                    | 라우트·버전 고정, 주문 합계와 OKF 훅 회귀 테스트 |

로그인·주문 화면과 헤더는 상태·동작을 소유하는 컴포넌트와 레이아웃·표시 영역을 분리해 조합한다. 기존 공통 UI와 `Typography`를 먼저 확인하고, 기능 전용 구성은 해당 기능 폴더에 둔다.

컴포넌트 스타일은 해당 TSX에서 Panda `css`·`cva`로 작성한다. `*.module.scss`는 사용하지 않는다. `styled-system/`과 `src/styles/panda.css`는 생성 결과이므로 직접 편집하지 않는다. 상세 규칙은 [AGENTS.md](AGENTS.md)와 [UI 아키텍처](okf/architecture/ui.md)를 따른다.

Next.js 코드를 수정하기 전에 설치된 `node_modules/next/dist/docs/`의 관련 가이드를 읽는다. 내부 링크는 `next/link`, 탐색은 `next/navigation`을 사용한다.

## 검증

코드 변경 시 다음 명령을 실행한다.

```sh
npm run typecheck
npm run lint
npm run build
```

변경 범위에 따라 추가로 확인한다.

| 변경 범위             | 검증 명령                                       |
| --------------------- | ----------------------------------------------- |
| 라우팅·의존성         | 빌드 후 `node --test tests/app-router.test.mjs` |
| 주문 합계 계산        | `node --test tests/checkout-summary.test.mjs`   |
| Storybook 스토리      | `npm run build-storybook`                       |
| OKF 훅·검사 스크립트  | `npm run test:okf`                              |
| 커밋할 소스·관련 문서 | 스테이징 후 `npm run okf:check`                 |
| 문서                  | 내부 링크 확인, `git diff --check`              |

화면 변경은 PC·모바일 플랫폼에서 직접 진입·내부 이동·주요 상호작용을 확인한다. Storybook은 `src/stories/**/*.stories.@(ts|tsx)`를 탐색하고 App Router 탐색 모킹을 사용한다. 접근성 설정 `a11y.test: todo`는 검사 통과를 뜻하지 않는다. 자세한 절차는 [변경 검증](okf/development/verification.md)에 있다.

## 프로젝트 지식 (OKF)

[okf/index.md](okf/index.md)에서 프로젝트 개요, 라우팅·상태·스타일 구조와 개발 절차를 확인한다. 문서는 OKF v0.2 형식으로 관리하며 [유지보수 기준](okf/maintenance.md)에 따라 출처와 변경 이력을 기록한다.

소스 변경에 연결된 OKF 문서와 `okf/log.md`는 같은 커밋에 포함한다. Git pre-commit은 스테이징된 변경을 검사하며 관련 문서가 누락되면 차단한다. 매핑은 `scripts/okf-sync.mjs`가 관리한다. 훅은 문서를 자동 수정하거나 스테이징하지 않는다.

`npm ci`의 `prepare` 또는 `npm run hooks:install`로 Git 훅을 설치한다. Codex 파일 편집 후 안내는 `.codex/hooks.json`을 사용하며, 처음에는 `/hooks`에서 검토·신뢰해야 한다. PowerShell 전용 `scripts/okf.ps1` 사용법은 [PowerShell 안내](okf/maintenance.md#powershell)를 참고한다.

## 팀 Codex 스킬

컴포넌트 재사용·구조 조합 점검 스킬 원본은 [`.codex/skills/component-reusability/SKILL.md`](.codex/skills/component-reusability/SKILL.md)에 있다. 저장소를 최신화한 뒤 아래 PowerShell 명령으로 개인 Codex 스킬 폴더에 설치하거나 업데이트한다.

```powershell
Copy-Item -Recurse -Force .\.codex\skills\component-reusability "$env:USERPROFILE\.codex\skills\component-reusability"
```
