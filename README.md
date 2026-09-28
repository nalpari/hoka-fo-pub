# 이랜드 신규 브랜드 적응형 웹 와이어프레임 (Next.js)

## 실행

Node.js `v24.21.0`, npm `11.19.0`, Next.js App Router에서 구성했다. `npm install` 후 `npm run dev`를 실행한다. 운영 서버는 `npm run build` 후 `npm run start`로 실행한다. 검증 명령은 `npm run typecheck`, `npm run lint`, `npm run build`다.

개발 환경에서만 `?__platform=web` 또는 `?__platform=mobile`로 강제 선택할 수 있다. 운영 빌드에서는 무시한다.

## 제공 경로

`/`, `/products`, `/products/:productId`, `/search`, `/cart`, `/checkout`, `/login`, `/signup`, `/mypage`, `/launch-calendar`, `/collections`, `/events`, `/support`, `/about`, `/dev/screens`, `/dev/components`.

`/dev/screens`는 원본 메뉴 항목과 임시 화면/경로 매핑을 보여준다.

## Storybook

`npm run storybook`으로 컴포넌트 검수 환경을 실행한다. 정적 결과물은 `npm run build-storybook`으로 생성한다. 현재 Product Card와 상품 목록 필터 컨트롤 스토리를 제공한다.
