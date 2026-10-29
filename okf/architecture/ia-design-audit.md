---
type: Reference
title: 'IA 디자인 수급 조사'
description: 'Figma 데스크탑에서 발견한 PC·MO 최종 프레임과 IA 수급 상태 및 비교 검증의 한계를 기록한다.'
tags: [ia, figma, design, publishing]
status: draft
generated:
  by: codex/gpt-6
  at: '2026-10-29T05:37:21Z'
source_revision: e5a45fe7cf3a9ad89d767594c7b9787de4571e84
working_tree_sources:
  - src/app/screen-index/storybookLinks.ts
  - src/app/screen-index/_components/IaStructurePage.tsx
  - src/stories/features/screen-index/IaStructurePage.stories.tsx
  - tests/screen-progress.test.mjs
sources:
  - id: hoka-design
    resource: https://www.figma.com/design/qyXJp4bnoeYSQxQULV8Wql/-HOKA-Design
    title: '[HOKA]Design — Figma 데스크탑에서 읽은 프레임 목록'
  - id: hoka-main
    resource: https://www.figma.com/design/soQFEF6eeDjnQP7wY9Q96M/Main---PLP---PDP?node-id=2536-2823
    title: 'Main / PLP / PDP — HOKA RUN CLUB'
---

# IA 디자인 수급 조사

후속 사용자 첨부 6개 영역을 이용한 [디자인·소스 대조](design-source-comparison-2026-10-29.md)에서 최초 검색으로 누락한 PC/MO 프레임을 추가 확인하고 구체적인 미적용 항목을 퍼블리싱 수정으로 반영했다. 아래 수급 수치·발견 목록·재판정 불가 기록은 최초 Figma 조사 시점의 이력이다. 특히 IA 200 PC와 251/252 MO 등은 후속 첨부에서 수급으로 정정됐다. 실제 브라우저 픽셀 비교 제한은 계속 남는다.

2026-10-29 사용자가 정한 기준은 PC/MO 최종 화면 프레임을 찾으면 `수급`, 조사 목록에서 찾지 못하면 `미수급`이다. 디자인 `수정예정`과 퍼블리싱 `수정`은 서로 다른 상태다. 파일·스토리 존재나 기존 퍼블리싱 완료 상태로 디자인 수급을 추정하지 않는다.

## 확인 범위

Figma 데스크탑의 현재 페이지 찾기와 접근성 트리로 다음 목록을 읽었다. PC는 `Desktop /`, `PC /`, `[PC]`, MO는 `Mobile /`, `[MO]` 이름을 구분했다. 전용 프레임이 발견되지 않은 것은 조사한 파일에서의 미수급이며 모든 Figma 파일의 부재를 증명하지 않는다.[^hoka-design][^hoka-main]

| 파일·페이지 | 페이지 node-id | 발견한 화면 |
| --- | --- | --- |
| Main / PLP / PDP · HOKA RUN CLUB | 2536-2823 | PC/Mobile List, Detail 및 마감·미리보기 상태 |
| [HOKA]Design · 메인/ 상품리스트 / 상세페이지 | 1181-38880 | PC/Mobile Main, PLP, PDP, Navigation 및 필터 상태 |
| 로그인/ID찾기/비밀번호 찾기 | 1-18 | Desktop/Mobile Login, 아이디/비밀번호 찾기, 아이디 확인, 재설정, 계정잠금 인증·해제 완료. PC 계정잠금·비밀번호 변경완료 모달 |
| 회원가입 | 127-1333 | Desktop/Mobile Join, 휴대폰 인증, 약관, 정보 입력, 부가정보와 모달. 가입완료 검색은 Desktop 프레임 2개 |
| 마이페이지 | 389-9339 | Desktop/Mobile MY Page, Product Reviews, 회원등급. Mobile 쿠폰·러닝세션 신청내역·회원정보·배송지·관심/최근/재입고 상품 |
| 장바구니/주문하기/주문내역 | 962-5160 | Desktop/Mobile Cart, Order/Payment, Order&Shipping. Mobile 보유 쿠폰 조회·주문/취소/반품 상세 |
| 고객센터 | 324-4175 | Desktop/Mobile 메인·FAQs·공지목록·문의등록·매장·배송/반품·손질·개인정보·사이즈. Mobile 공지상세·이용약관, PC 문의목록 상태 |
| 검색_공통 | 648-17782 | Desktop/Mobile Search, Results, No results 및 입력 상태 |
| 에러페이지 | 577-10864 | [PC]/[MO] 404·점검·기타 에러 |

`storybookLinks.ts`가 내부 IA 번호별 확인값을 보관한다. 동일 `eland_hca_01`/`eland_hca_02` 카테고리 IA는 발견한 PLP/PDP 공통 템플릿 수급 상태를 공유한다. 검색 결과 IA 247은 별도의 실제 검색 디자인 확인값이 우선한다. 고객센터와 마이페이지 Q&A의 같은 화면 코드도 공통 디자인을 연결한다. IA 200 러닝세션 신청내역은 실제 발견한 Mobile 마이페이지 프레임만 수급이며, 런클럽 구현을 재사용한다는 이유로 PC 수급을 추정하지 않는다.

기본값은 미수급이며 호출자가 명시적으로 null을 주면 `-`로 지울 수 있다. 삭제/제외 17개는 상태 대신 `-`를 유지한다. 앱에서 삭제 제외 249개 화면 중 PC 수급 200·미수급 49, MO 수급 210·미수급 39를 확인했다. 이는 공통 템플릿을 공유하는 IA 행 수이며 고유 Figma 프레임 수가 아니다.

## 퍼블리싱 비교와 제한

사용자 확인으로 아이핀 인증 IA 235(eland_hjo_03)의 PC/MO 퍼블리싱을 기존 통합 완료 초기값에서 대기로 정정했다. 디자인은 PC/MO 미수급을 유지한다.

사용자가 자체 회원가입 완료(IA 238, eland_hjo_06)의 MO 디자인 수급을 확인하여 미수급에서 수급으로 갱신했다. 최초 Figma 검색에서 Mobile 이름을 찾지 못한 기록보다 후속 사용자 확인을 우선한다. PC 디자인과 퍼블리싱 상태는 유지하며 소셜회원 가입완료 항목에는 적용하지 않는다.

추가 사용자 직접 확인으로 전체메뉴 IA 245의 PC/MO 디자인을 수급으로, 검색 레이어 IA 246과 404·시스템점검·기타에러 IA 248/249/250의 PC/MO 퍼블리싱을 완료로 갱신했다. 검색결과 IA 247은 이미 완료인 기존 상태를 유지한다. 이 변경은 사용자 상태 전달에 따른 것이며 Figma 시각 비교를 새로 수행한 결과가 아니다.

같은 날 사용자가 장바구니 MO 퍼블리싱 완료를 직접 전달하여 IA 170의 `moPublishing`을 `ready`로 반영했다. 이는 Codex의 시각 비교 판정이 아닌 사용자 확인이다. PC 퍼블리싱과 MO 디자인은 유지하며, 해당 MO 확인값에는 기존 통합 상태 이관 툴팁을 노출하지 않는다.

2026-10-29 사용자 직접 확인으로 장바구니(내부 IA 170)와 주문 상세(내부 IA 171)의 PC 디자인을 `revision-planned`(수정예정)으로 갱신했다. 위 수급 수치는 최초 조사 당시 기록이며, 이후 PC 수급에서 2개가 수정예정으로 이동한다. MO 디자인은 수급을 유지하고 퍼블리싱 상태는 변경하지 않았다. 프레임 존재 확인과 사용자 전달 수정 진행 상태를 구분하며, 아래의 "수정예정을 실제 데이터에 추가하지 않았다"는 최초 Figma 조사 시점에만 해당한다.

사용자는 PC/MO별 디자인 대비 퍼블리싱을 `완료 / 수정 / 대기`로 판단하도록 요청했다. 비교 기준은 구현이 디자인과 맞으면 완료, 차이가 있으면 수정, 구현이 없으면 대기다. `revision` 타입·주황 배지·필터와 Storybook 예시를 추가했다. 기존 `working` 진행중 값은 일괄 변환하지 않았다.

Figma 네이티브 화면 캡처는 `window capture timed out: timed out waiting on channel`로 실패했다. Figma 연결 도구도 재인증을 요구했다. 프레임 이름과 목록은 읽었지만 픽셀·타이포·간격·반응형을 실제 구현과 시각 비교하지 못했으므로 실제 화면의 퍼블리싱 상태는 재판정하지 않았다. 기존 완료/진행중/대기는 이전 통합 상태의 초기값이며 툴팁도 이를 밝힌다. 디자인 수급 확인은 시각적 퍼블리싱 검수 완료가 아니다.

데스크탑 파일에는 재연결 전 변경 동기화 지연 안내도 있었다. 이번 목록은 읽은 로컬 데스크탑 상태이며 서버 최신본 확인을 의미하지 않는다. 고객센터 검색 결과 일부는 가상화되어 전체 결과가 한 번에 노출되지 않았으므로 미수급 항목은 후속 검색에서 새 프레임을 찾으면 갱신한다. 디자인 `수정예정`은 개별 IA에 연결할 확실한 근거가 없어 실제 데이터에 추가하지 않았다.

## 검증

Codex가 상태 모델 테스트 5개, 타입 검사, 변경 TS/TSX ESLint·Prettier와 Panda 생성을 통과했다. 브라우저에서 앱의 수급 수치, 가입완료 PC 수급/MO 미수급, PC 퍼블리싱 수정 필터와 실제 판정 항목 0개를 확인했다. Storybook은 독립 PC/MO 수정 상태 fixture를 수정했지만 이번 변경 후 전체 빌드·play를 실행하지 않았다. 전체 화면의 디자인 대비 시각 검증은 위 캡처 실패로 수행하지 못했다.

[^hoka-design]: [HOKA 디자인](https://www.figma.com/design/qyXJp4bnoeYSQxQULV8Wql/-HOKA-Design), 2026-10-29 네이티브 UI 읽기.
[^hoka-main]: [런클럽 디자인](https://www.figma.com/design/soQFEF6eeDjnQP7wY9Q96M/Main---PLP---PDP?node-id=2536-2823), 2026-10-29 네이티브 UI 읽기.
