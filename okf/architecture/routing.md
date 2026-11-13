---
type: Architecture
title: '라우팅과 플랫폼'
description: 'App Router 경로, 페이지 경계와 PC·모바일 선택을 설명한다.'
tags: [nextjs, routing, platform]
status: draft

## 공통 가이드 간격의 선별 커밋 범위 (2026-11-11)

현재 선별 스테이지는 기존 고객센터·공지·문의 작성·배송지 편집·배송/반품 안내·쿠폰·리뷰·404·잠금 안내·약관 확인 경로를 재사용한다. 새 URL·IA 상태·서비스 요청 계약은 추가하지 않는다. 문의 입력과 취소창, 리뷰 탭, 약관 스크롤의 소유자도 유지한다.

이번 커밋에는 준비된 작업 전체가 아니라 선택된 소스 부분만 포함한다. 잠금 팝업의 폭/제목 스타일, 배송지의 모바일 제목/입력 높이, 반품 STEP 카드, 공지 제목 말줄임, 404 제목 크기, 전체 약관 헤더 스타일은 미스테이징 상태로 남긴다. 세부 구현은 [선별 UI 기록](ui.md#공통-가이드-간격의-선별-반영-2026-11-11)을 따른다. 앞선 전체 작업 트리의 PC/MO 캡처 결과를 이 부분 커밋의 시각 검증 결과로 간주하지 않는다. 출처: 현재 선택한 라우트 및 관련 컴포넌트의 Git 스테이지, Codex, 2026-11-11.

## 회원정보 브레드크럼 명칭 통일 (2026-11-13)

ProfileContent와 ProfileStatePreview의 MyPageFrame breadcrumb 표시를 ‘회원정보 관리’로 통일했다. 기존 `/mypage/profile` activePath와 기본·편집·오류 preview 경로 및 입력 상태는 유지한다. 문자열 diff로 확인했으며 브라우저 실행 검증은 수행하지 않았다. 출처: `src/app/mypage/profile/_components/ProfileContent.tsx`, `src/app/mypage/profile/_components/ProfileStatePreview.tsx` 작업 트리, Codex, 2026-11-13.
