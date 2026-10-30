---
type: Reference
title: '퍼블리싱 고정 상태 preview와 IA 연결'
description: '직접 열 수 있는 상태 URL, 기존 화면 재사용, IA 연결과 미확정 항목을 기록한다.'
tags: [publishing, preview, routing, ia, handoff]
status: draft
generated:
  by: codex/gpt-6
  at: '2026-10-30T01:52:56Z'
source_revision: 27b7e2f5b2c5e21681af53df27a535f3f13aa170
working_tree_sources:
  - src/app/screen-index/storybookLinks.ts
  - src/app/mypage/reviews/_components/MyPageReviewsContent.tsx
  - src/app/support/notices/preview-empty/page.tsx
  - src/app/support/notices/_components/NoticesList.tsx
  - src/app/support/notices/_components/NoticesContent.tsx
  - src/app/mypage/coupons/preview-empty/page.tsx
  - src/app/mypage/coupons/_components/CouponManagement.tsx
  - src/app/screen-index/screenConnections.ts
  - src/app/screen-index/_components/IaStructurePage.tsx
  - src/app/screen-index/sourceGraph.generated.json
  - src/data/screenRegistry.ts
  - src/app/checkout/_components/CheckoutStatePreview.tsx
  - src/components/catalog/ProductListingStatePreview.tsx
  - src/components/phone-verification/PhoneVerificationStatePreview.tsx
  - src/components/phone-verification/PhoneVerificationContent.tsx
  - src/components/phone-verification/phone-verification.types.ts
  - src/app/mypage/event-entries/_components/RunClubEntriesContent.tsx
  - src/app/support/inquiries/new/order-products/_components/InquiryOrderLookup.tsx
  - src/app/support/inquiries/_components/InquiryListPreview.tsx
  - src/app/support/inquiries/preview-list/page.tsx
  - tests/preview-links.test.mjs
  - tests/app-router.test.mjs
---

# 퍼블리싱 고정 상태 preview와 IA 연결

59개 기존 페이지와 266개 IA를 조사한 뒤, 기존 표시 UI가 있는 상태에 직접 확인용 URL 61개를 추가했다. 후속 요청으로 문의 대기/완료의 두 URL을 하나로 통합하여 추가 preview는 60개가 되었다. 후속 쿠폰·공지 Empty 2개를 더해 현재 추가 preview는 62개, 기존 장바구니 Empty·로그인 오류를 포함한 고정 preview는 64개다. 기본 화면의 서비스 연결 계약은 유지하며 preview는 화면 확인을 위해 고정 표시 데이터와 로컬 입력·열기/닫기를 사용한다. preview 자체를 실제 조회·저장·인증·결제의 성공 증거로 취급하지 않는다.

## 새 상태 URL

아래 suffix는 해당 기본 경로 뒤에 붙인다. PC/MO는 같은 URL에서 기존 platform 소유자가 선택한다. 스토리 전용 모듈이나 page의 임의 props를 운영 진입점으로 가져오지 않는다.

| 기본 경로                               | 추가한 suffix                                                                                                                    | 연결 내부 IA             |
| --------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------- | ------------------------ |
| `/checkout`                             | `/preview-empty`, `/preview-error`, `/preview-complete`                                                                          | 171                      |
| `/mypage/orders`                        | `/preview-empty`, `/preview-detail`, `/preview-cancel-detail`, `/preview-return-detail`                                          | 178·179·180·181          |
| `/mypage/returns`                       | `/preview-empty`                                                                                                                 | 180                      |
| `/mypage/wishlist`                      | `/preview-empty`                                                                                                                 | 182                      |
| `/mypage/recent`                        | `/preview-empty`                                                                                                                 | 183                      |
| `/mypage/restock-alerts`                | `/preview-empty`                                                                                                                 | 184                      |
| `/mypage/reviews`                       | `/preview-empty`, `/preview-written-empty`, `/preview-new`, `/preview-edit`, `/preview-error`                                    | 191·192·193              |
| `/mypage/addresses`                     | `/preview-empty`, `/preview-new`, `/preview-edit`, `/preview-error`                                                              | 203·204·205              |
| `/mypage`                               | `/preview-no-orders`                                                                                                             | 177                      |
| `/mypage/coupons`                       | `/preview-error`, `/preview-complete`, `/preview-detail`                                                                         | 196·197                  |
| `/mypage/profile`                       | `/preview-edit`, `/preview-error`, `/preview-code-entry`, `/preview-expired`, `/preview-password-complete`                       | 201·202                  |
| `/mypage/event-entries`                 | `/preview-empty`                                                                                                                 | 200                      |
| `/running/run-club`                     | `/preview-empty`                                                                                                                 | 258                      |
| `/products`                             | `/preview-no-results`, `/preview-empty-inquiries`                                                                                | 상품 목록·상세 공통 연결 |
| `/search`                               | `/preview-no-results`                                                                                                            | 247                      |
| `/support/faq`                          | `/preview-no-results`                                                                                                            | 185·207                  |
| `/support/inquiries`                    | `/preview-list`                                                                                                                  | 187·210                  |
| `/support/inquiries/new`                | `/preview-error`, `/preview-order-required`, `/preview-attachment-type`, `/preview-attachment-size`, `/preview-attachment-count` | 189·211                  |
| `/support/inquiries/new/order-products` | `/preview-empty`                                                                                                                 | 189·211의 보조 링크      |
| `/login/find-account`                   | `/preview-error`, `/preview-code-entry`, `/preview-expired`                                                                      | 224                      |
| `/login/find-account/password-reset`    | `/preview-error`, `/preview-complete`                                                                                            | 229·252                  |
| `/signup/verify/phone`                  | `/preview-error`, `/preview-agreement-error`, `/preview-code-entry`, `/preview-expired`, `/preview-already-registered`           | 234·257                  |
| `/login/account-locked/verification`    | `/preview-error`, `/preview-agreement-error`, `/preview-code-entry`, `/preview-expired`                                          | 253                      |
| `/signup/terms`                         | `/preview-error`                                                                                                                 | 236                      |
| `/signup/information`                   | `/preview-error`, `/preview-marketing-consent`                                                                                   | 237·256                  |
| 공통                                    | `/preview-not-found`                                                                                                             | 248                      |

상품문의 preview는 전체 상품을 가공해 만든 화면이 아니라 기존 상품문의 영역의 빈 상태를 직접 표시한다. 별도 상품 ID나 서비스 계약을 만들어내지 않는다. 리뷰 Empty 두 URL은 초기 선택 탭을 구분하고 양쪽 목록을 모두 빈 데이터로 유지한다. 취소·반품 Empty는 기존 주문 목록의 빈 상태 표현을 재사용하며 새 안내 문구를 만들지 않았다.

## 기존 URL 재사용

- 런클럽 상세 IA 259에는 `/running/run-club/bukhansan-trail`의 모집 마감과 `/running/run-club/inwangsan-trail`의 신청 예정을 보조 링크로 추가했다.
- 가입 부가정보는 `/signup/information?step=additional`을 내부 IA 255의 직접 URL과 237의 보조 링크로 연결했다. 가입 인증방법 선택 `/signup/verify`는 233의 보조 링크로 연결했다.
- 기획전 상세 IA 167은 기존 `/collection/8386`으로 연결했다. 표시 구현은 기존 제목·본문 프레임이며 전체 디자인 완성을 뜻하지 않는다.
- 아이디 확인, 가입 완료, 계정 잠금·해제 완료, 점검·서비스 오류는 기존 전용 URL을 유지했다.
- 문의 기본 목록은 원래부터 Empty이므로 별도 Empty를 중복 생성하지 않았다. 매장 없음은 기존 인천 탭에서 확인할 수 있어 별도 URL을 만들지 않았다.

## IA 연결과 소유권

러닝세션 신청내역 `/mypage/event-entries`는 삭제된 이벤트 응모내역 IA 198 대신 활성 IA 200에 연결했다. 화면의 기존 진행 상태는 변경하지 않았다. `screenRegistry.ts`의 오래된 RunClubPage 동일 화면 설명을 실제 신청내역 소유자 `RunClubEntriesContent`로 정정했다.

`previewRoutes`와 실제 preview 진입 파일은 원본 IA의 `sourceFiles`에 함께 등록한다. 화면 목록은 원본 route가 없는 행도 previewRoutes가 있으면 링크를 표시할 수 있다. 상태명·URL 검색과 기존 기본 링크를 유지했다. 그래프는 `npm run screen-files`로 재생성한다.

신청내역과 문의 주문상품 조회는 기본/preview 두 라우트에서 동일한 상태 소유자와 JSX를 재사용한다. 따라서 원래 구현을 각 route의 `_components/RunClubEntriesContent.tsx`, `_components/InquiryOrderLookup.tsx`로 옮겼다. 이 공유는 실제 복수 라우트 소비가 생겨 필요한 것이며 페이지를 짧게 만드는 목적의 추출이 아니다. 문의 목록·등록은 제목·탐색을 기존 책임 위치의 layout으로 공유한다.

## 고정 상태의 동작 경계

preview에서는 API 요청·인증 발송·시간 경과·결제·저장·목록 삭제·브라우저 저장값 복원을 상태 도달 조건으로 사용하지 않는다. 폼 오류는 제출 전부터 고정하며 입력 뒤에도 유지한다. 완료와 안내 모달은 처음부터 열고 로컬 닫기·Escape를 유지한다. 주문서 오류는 저장 배송지 대신 입력 폼을 처음부터 열어 필드 오류를 보인다. 전화번호 인증 preview는 실제 타이머를 시작하지 않는다.

원본 기본 화면의 기존 서비스 흐름과 Storybook의 서비스 연결 시나리오는 별도 계약으로 유지한다. 전체 기본 화면의 서비스 로직을 모두 제거한 작업은 아니다. 연결 소유자는 기존 domain context의 ID·payload와 요청 성공/실패/pending·재시도 및 갱신 책임을 계속 가진다.

## 미확정 또는 별도 합의가 필요한 항목

| 항목                                                  | 현재 근거와 남은 결정                                                                                                                                                                      |
| ----------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 결제수단·환불계좌·멤버십 활동·친구추천·국가선택       | 기존 라우트는 있으나 대응 IA가 명확하지 않다. 새 번호를 만들거나 무관한 행에 연결하지 않았다. 미등록 결제수단·환불계좌는 기본 화면에서 확인한다.                                           |
| 상품 상세 리뷰 없음·전체 품절·접근 권한·회원정보 없음 | 현재 상품 상세에서 확인된 것은 일부 사이즈 품절 표시이며 전체 품절 전용 화면·preview는 없다. 전체 품절은 필요 여부·디자인 미확정 후보다. 상품 상세 리뷰 없음·접근 권한·회원정보 없음도 별도 화면 디자인과 사용 조건을 확인한 후 분리한다.                                                                                   |
| 조회 중·처리 중·실패·더보기 실패·부분 실패            | 범용 BindingFeedback 및 일부 inline 안내는 유지한다. 이를 모든 화면의 확정된 skeleton·실패 레이아웃으로 확대하지 않았다. 화면별 검수 대상과 디자인 차이를 정한 후 대표 preview를 추가한다. |
| 외부 PG·소셜·아이핀                                   | 외부 서비스나 아직 구현되지 않은 결과를 임의로 성공 화면처럼 만들지 않는다.                                                                                                                |

## 검증

최종 검증 결과는 [검증 문서](../development/verification.md#퍼블리싱-고정-상태-preview-검증-2026-10-30)에 기록한다. 이 문서는 디자인 승인 또는 실제 서비스 검증 기록이 아니다.

## 문의 목록 통합 (2026-10-30)

사용자 요청으로 대기/완료 URL을 분리하지 않고 `/support/inquiries/preview-list`에서 함께 표시한다. `InquiryListPreview.items`는 ID별 질문·답변 상태·본문·답변·첨부를 받는 현재 배열이며 개수를 고정하지 않는다. 기본 fixture는 대기 1건과 완료 1건이다. 완료 항목만 기존 답변 접기/펼치기를 제공한다. PC/MO Storybook의 개별 Pending·Answered도 통합 List 사례로 교체했다. 실제 등록·답변 상태 전환은 구현하지 않는다. 기존 두 상태 route·컴포넌트와 IA 187·210의 중복 링크를 제거했다. 기본 `/support/inquiries`의 Empty는 유지한다.

## Empty 문구와 IA 연결 정리 (2026-10-30)

사용자 확정 문구를 기존 minimal EmptyState로 표시하며 새 이미지·CTA를 추가하지 않는다.

| 화면             | 문구                              | 직접 URL                         | IA  |
| ---------------- | --------------------------------- | -------------------------------- | --- |
| 쿠폰             | 보유 중인 쿠폰이 없습니다.        | `/mypage/coupons/preview-empty`  | 196 |
| 공지사항         | 등록된 공지사항이 없습니다.       | `/support/notices/preview-empty` | 208 |
| 작성 가능한 리뷰 | 작성 가능한 상품 리뷰가 없습니다. | `/mypage/reviews/preview-empty`  | 191 |

쿠폰·공지는 pending/error의 빈 응답과 완료된 Empty를 구분한다. 쿠폰 preview는 운영 목록 context를 조회하지 않는 빈 fixture이며 등록 요청도 실행하지 않는다. 공지는 기본/preview 두 진입점이 `NoticesContent`를 공유한다. 마이페이지 ‘작성한 리뷰’ 탭의 기존 문구와 상품 상세 리뷰 영역은 변경하지 않는다.

IA 158은 사용자 확인에 따라 표시명을 ‘러닝 세션 신청’, PC/MO 디자인을 수급으로 수정했다. 번호와 `/running/run-club` 연결, 원본 sourceDepths의 UTMB 계보는 보존하며 비고에 변경 적용 완료를 명시한다. IA 167 기획전 상세는 사용자 판단상 목업·PC/MO 디자인 미수급이므로 `/collection/8386` 연결을 제외했다. 실제 collection 라우트와 IA 행은 유지한다. 마일리지 안내는 사용자 확인으로 삭제 유지를 확정했으며 링크나 IA를 복구하지 않는다.

중복 보조 링크는 전용 IA 기준으로 정리했다. IA 234의 기존 회원 안내는 IA 257에, IA 237의 부가정보는 IA 255에, IA 237·255의 수신내역은 IA 256에만 남긴다. 상위 행에 직접 지정한 중복 preview 소스도 제외하며 실제 import 그래프는 정식 `npm run screen-files`로 생성한다.

출처: 사용자 문구 표·screen-index 브라우저 코멘트 및 현재 `CouponManagement.tsx`, `NoticesContent.tsx`, `NoticesList.tsx`, `MyPageReviewsContent.tsx`, `screenConnections.ts`, `storybookLinks.ts`, `screenRegistry.ts` 작업 트리. 디자인 파일을 새로 조사한 결과가 아니라 사용자 직접 확인을 반영했다.
