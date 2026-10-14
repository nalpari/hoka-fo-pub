# 이랜드 신규 브랜드 적응형 웹 와이어프레임 (Next.js)

## 실행

Node.js `v24.21.0`, npm `11.19.0`, Next.js `16.3.5`, React·React DOM `19.2.8`을 사용한다. Next.js와 React 버전은 고정한다. `npm ci` 후 `npm run dev`를 실행한다. 운영 서버는 `npm run build` 후 `npm run start`로 실행한다. 검증 명령은 `npm run typecheck`, `npm run lint`, `npm run build`다.

루트 레이아웃에서 User-Agent로 PC·모바일을 선택한다. 공통 `ShopShell`이 로그인·장바구니 상태를 유지하고 각 `src/app/**/page.tsx`가 화면을 렌더링한다. 내부 링크는 `next/link`, 탐색은 `next/navigation`을 사용한다.

## 제공 경로

`/`, `/products`, `/products/[id]`, `/collection/[id]`, `/search`, `/cart`, `/login`, `/signup`, `/mypage`, `/launch-calendar`, `/locales`, `/explore`, `/running/run-club`, `/support` 및 회원·고객지원·러닝 하위 경로를 제공한다.

등록되지 않은 경로는 `src/app/not-found.tsx`로 처리한다. 주문·결제 화면(`/checkout`)은 아직 구현되지 않았다. 빌드 후 `node --test tests/app-router.test.mjs`로 기존 62개 경로와 버전 고정을 검증한다.

## Storybook

`npm run storybook`으로 컴포넌트·페이지 검수 환경을 실행한다. 정적 결과물은 `npm run build-storybook`으로 생성한다. `nextjs.appDirectory`와 Next.js 탐색 모킹을 사용한다.

## 팀 Codex 스킬

공유 스킬 원본은 [`.codex/skills/component-reusability/`](.codex/skills/component-reusability/)에 있다. 저장소를 최신화한 뒤 아래 PowerShell 명령으로 개인 Codex 스킬 폴더에 설치하거나 업데이트한다.

```powershell
Copy-Item -Recurse -Force .\.codex\skills\component-reusability "$env:USERPROFILE\.codex\skills\component-reusability"
```
