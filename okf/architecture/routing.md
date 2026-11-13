---

type: Architecture
title: '라우팅과 플랫폼'
description: 'App Router 경로, 페이지 경계와 PC·모바일 선택을 설명한다.'
tags: [nextjs, routing, platform]
status: draft

## 매장 찾기 모바일 전화 연결 (2026-11-13)

`/support/store`의 기존 경로와 목록 표시를 유지하면서 모바일의 매장 전화번호만 `tel:` 링크로 연결한다. 전화 연결 주소는 표시 번호와 분리된 `phoneHref` fixture 필드가 소유하며, PC에서는 같은 전화번호를 비링크 텍스트로 유지한다. 새 URL·조회·지도 요청은 추가하지 않았다. 출처: `src/app/support/store/_components/StoreContent.tsx`, `src/app/support/store/store.data.ts`, `src/types/component-contracts/app-support-store-page.d.ts` 작업 트리, Codex, 2026-11-13.

## 타이포그래피 토큰 동기화의 경로 영향 검토 (2026-11-13)

`Typography` variant와 `/publishing-guide` 표시는 최신 Figma 타이포그래피 토큰을 반영하지만 App Router 경로, URL 상태, preview 진입점과 플랫폼 선택 책임은 변경하지 않는다. 출처: `src/components/common/atoms/Typography.tsx`, `src/app/publishing-guide/_components/TypographyGuide.tsx`, Codex, 2026-11-13.

10회 이상 반복된 Body weight 조합을 고정 variant로 바꾼 호출부는 기존 화면·URL·preview 경로를 그대로 유지한다. `web`·`mo` 선택은 Typography 표시 책임에만 속하며 라우팅 상태를 만들거나 변경하지 않는다. 출처: `src/app/cart/`, `src/app/checkout/`, `src/app/login/`, `src/app/mypage/`, `src/app/publishing-guide/`, Codex, 2026-11-13.

## 홈 배너 언어별 폰트 (2026-11-13)

HomeContent.tsx의 HeroCopy 제목에서 강제 korean 폰트·행간·자간을 제거해 Typography heading1의 언어 판별을 사용한다. 설명은 기존 bodyKr 크기·행간·자간을 유지하며 `--font-family-base`로 영문 HOKA·한글 Pretendard를 조합한다. 다른 화면과 라우트·데이터 계약은 변경하지 않는다. 기존 모바일42px 선언은 보존했지만 현재 계산 크기는50px으로 관측했다.

검증: PC1440px·모바일375px에서 영문 제목 HOKA와 혼합 설명의 HOKA/Pretendard-Regular 실제 렌더링을 CDP로 확인했다. HOKA 파일의 내부 이름은 점으로 보고되며 CSS family는 hoka다. 임시 한글 제목은 두 폭에서 Pretendard Black을 확인한 뒤 원래 TECTON X 4로 복원했다. 사용자 IAB 제목의 계산 font-family도 hoka 우선임을 확인했다. Panda 생성과 대상 ESLint를 통과했다. 출처: src/app/_components/HomeContent.tsx 작업 트리, Typography.tsx와 layout.tsx. 기록: Codex, 2026-11-13. 기존 provenance와 신뢰 상태를 유지한다.

## 공통 가이드 간격의 선별 커밋 범위 (2026-11-11)

현재 선별 스테이지는 기존 고객센터·공지·문의 작성·배송지 편집·배송/반품 안내·쿠폰·리뷰·404·잠금 안내·약관 확인 경로를 재사용한다. 새 URL·IA 상태·서비스 요청 계약은 추가하지 않는다. 문의 입력과 취소창, 리뷰 탭, 약관 스크롤의 소유자도 유지한다.

이번 커밋에는 준비된 작업 전체가 아니라 선택된 소스 부분만 포함한다. 잠금 팝업의 폭/제목 스타일, 배송지의 모바일 제목/입력 높이, 반품 STEP 카드, 공지 제목 말줄임, 404 제목 크기, 전체 약관 헤더 스타일은 미스테이징 상태로 남긴다. 세부 구현은 [선별 UI 기록](ui.md#공통-가이드-간격의-선별-반영-2026-11-11)을 따른다. 앞선 전체 작업 트리의 PC/MO 캡처 결과를 이 부분 커밋의 시각 검증 결과로 간주하지 않는다. 출처: 현재 선택한 라우트 및 관련 컴포넌트의 Git 스테이지, Codex, 2026-11-11.

## 회원정보 브레드크럼 명칭 통일 (2026-11-13)

ProfileContent와 ProfileStatePreview의 MyPageFrame breadcrumb 표시를 ‘회원정보 관리’로 통일했다. 기존 `/mypage/profile` activePath와 기본·편집·오류 preview 경로 및 입력 상태는 유지한다. 문자열 diff로 확인했으며 브라우저 실행 검증은 수행하지 않았다. 출처: `src/app/mypage/profile/_components/ProfileContent.tsx`, `src/app/mypage/profile/_components/ProfileStatePreview.tsx` 작업 트리, Codex, 2026-11-13.

## 주문서 배송지 팝업 시안 반영 (2026-11-13)

`/checkout/preview-address-change`, `/checkout/preview-address-edit`, `/checkout/preview-address-new`의 기존 URL과 IA172·173 연결을 유지한다. 목록 제목은 배송지 관리이며 네 행·고정 더보기 1/10과 하단 추가 액션을 표시한다. 추가·수정은 같은 폼의 dialog 옵션으로 이름·배송지명·전화·주소를 표시하고 취소는 목록으로 돌아간다. 일반 주문서의 inline 배송지 입력과 마이페이지 목록은 기존 표현을 유지한다. 새 상태 URL·API·PG를 만들지 않는다.

PC 폭 640px, 입력 팝업 836px 높이, 본문 좌우 32px·상단 24px, 위쪽 2px 선·내부 24px, 필드 63px·간격 16px, 액션 전후 40px·버튼 180×48px을 적용했다. 모바일은 기존 fullscreen·16px gutter·44px 버튼과 본문 스크롤을 재사용한다. [공유 목록과 검증](ui.md#배송지-목록과-입력-팝업의-국소-디자인-옵션-2026-11-13). 출처: [HOKA 화면 디자인](https://www.figma.com/design/qyXJp4bnoeYSQxQULV8Wql/-HOKA-Design), CheckoutShipping.tsx·checkout-address-preview.ts 작업 트리, Codex, 2026-11-13.
