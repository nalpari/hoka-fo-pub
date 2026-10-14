---
type: Project
title: '프로젝트 개요'
description: '서비스 목적, 기술 버전과 구현 범위를 설명한다.'
tags: [hoka, frontend, overview]
status: draft
generated:
  by: codex/gpt-6
  at: '2026-10-14T06:02:14Z'
source_revision: b3f7243062b500eb4909961667ad142cc368ff91
sources:
  - id: package-json
    resource: https://github.com/nalpari/hoka-fo-pub/blob/b3f7243062b500eb4909961667ad142cc368ff91/package.json
    title: 'package.json'
  - id: readme-md
    resource: https://github.com/nalpari/hoka-fo-pub/blob/b3f7243062b500eb4909961667ad142cc368ff91/README.md
    title: 'README.md'
  - id: src-mocks-products-ts
    resource: https://github.com/nalpari/hoka-fo-pub/blob/b3f7243062b500eb4909961667ad142cc368ff91/src/mocks/products.ts
    title: 'src/mocks/products.ts'
  - id: src-data-screenregistry-ts
    resource: https://github.com/nalpari/hoka-fo-pub/blob/b3f7243062b500eb4909961667ad142cc368ff91/src/data/screenRegistry.ts
    title: 'src/data/screenRegistry.ts'
---

# 프로젝트 개요

HOKA 쇼핑몰의 PC·모바일 화면을 구현하는 퍼블리싱·데모 프로젝트다. 패키지 이름은 `eland-adaptive-wireframe`이다. 실제 상품·회원·주문 서버를 연결한 운영 서비스로 취급하지 않는다.

## 기술 기준

| 영역          | 구성                                   |
| ------------- | -------------------------------------- |
| 라우팅        | Next.js App Router                     |
| 고정 버전     | Next.js 16.3.5, React·React DOM 19.2.8 |
| 언어          | TypeScript, strict 검사                |
| UI            | React, Base UI                         |
| 스타일        | Panda CSS, 전역 SCSS                   |
| 컴포넌트 검수 | Storybook, Next.js Vite 프레임워크     |
| 의존성 설치   | npm, package-lock.json                 |

설치된 실제 버전은 `package-lock.json`과 `npm ls next react react-dom --depth=0`으로 확인한다. Node.js 24.21.0과 npm 11.19.0은 README에 기록된 개발 기준이며, 현재 실행 환경의 버전은 별도로 확인한다.

## 구현 범위

홈, 상품 목록·상세, 검색, 장바구니, 로그인·회원가입, 마이페이지, 고객지원, 런클럽·러닝 콘텐츠 화면을 제공한다. URL 목록은 `src/app/**/page.tsx`가 결정한다.

`src/data/screenRegistry.ts`는 IA 화면 메타데이터다. IA에 등록된 화면이 실제 라우트나 완성된 기능이라는 뜻은 아니다. 상품 정보는 `src/mocks/products.ts`, 기능별 정적 콘텐츠는 해당 기능 폴더에서 관리한다.

## 현재 제약

- 로그인과 회원 관련 흐름은 데모 구현이다.
- 주문·결제 화면 `/checkout`은 구현되지 않았다.
- 목 데이터 기반 화면에 실제 데이터 저장·결제·인증을 기대하지 않는다.
- 화면 존재, 빌드 성공, 실제 서비스 연동 완료를 구분한다.

[라우팅](architecture/routing.md), [공통 상태](architecture/state.md), [로컬 실행](development/setup.md)을 함께 읽는다.
