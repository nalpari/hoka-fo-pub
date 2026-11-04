# 아키텍처

현재 구조와 구현 기준은 아래 주제에서 찾는다. 개별 작업의 상세 변경 이력은 [변경 이력](../log.md)에 기록하며, 완료된 구조 변경 보고서는 [소유권 기준](component-ownership.md)에서 커밋 고정 원문으로 연결한다. 과거 문서의 Storybook·서비스 계약·경로 설명은 해당 시점의 기록이며 현재 소스와 후속 인계 결정을 우선한다.

## 구조와 데이터

- [라우팅과 플랫폼](routing.md) - App Router 진입점, 고정 상태 URL과 IA 연결.
- [컴포넌트·모듈 소유권](component-ownership.md) - 페이지 전용 UI, 단일 부모, 래퍼·폴더와 1024/1200px 플랫폼 기준.
- [공통 상태와 데모 데이터](state.md) - 상태 소유권과 표시 데이터의 수명·제약.
- [데이터 바인딩](data-binding.md) - 표시 데이터·콜백과 서비스 연결 경계의 변경 기록.
- [퍼블리싱 인계](../development/markup-handoff.md) - 서비스·시연 흐름 제거와 준비된 표시 데이터의 현재 인계 범위.
- [고정 상태 preview](publishing-state-previews-2026-10-30.md) - 직접 진입 URL, 기존 UI 재사용과 IA 대응.

## 공통 UI와 스타일

- [컴포넌트와 스타일](ui.md) - 공통 UI·Panda·기능별 구현 및 검증 이력.
- [공통 UI 재사용 조사](common-reuse-audit.md) - 공통 API, 재사용 판단과 잔여 스타일 정리.
- [Organisms 재사용](organisms.md) - 메뉴·FAQ와 공통 조합의 책임.
- [콘텐츠 섹션](content-sections.md) - 레일·제목·카드·본문 구성.
- [폼 필드](form-fields.md) - 입력·선택·폼 표현과 공통화.
- [Footer 액션](footer-actions.md) - 페이지·모달 하단 액션과 간격.
- [스타일 예시](style-examples.md) - Panda·타이포그래피 적용 예시.

## 디자인과 화면

- [IA 디자인 수급 조사](ia-design-audit.md) - 디자인 수급과 퍼블리싱 판정의 근거·한계, 과거 대조·반영 원문.
- [홈·상품 디자인](home-product-design.md) - 메인·상품 목록·상세의 디자인 적용.
- [스토어프런트 디자인](storefront-design.md) - 관련 화면의 디자인 기준.
- [고객지원 디자인](support-design.md) - FAQ·공지·매장·약관·배송/반품 안내.
- [문의 디자인](inquiry-design-2026-11-02.md) - 문의 목록·등록·상품 선택 상태.
- [러닝세션 디자인](running-session-design.md) - 목록·상세·신청내역.
- [사이즈 가이드](size-guide.md) - 품목별 표와 성별·단위 선택.
- [런칭 캘린더](launch-calendar.md) - 화면 연결과 PC/MO 표현. 이후 디자인 미확정 상태는 [UI 이력](ui.md#런칭-캘린더-디자인-미확정-상태-반영-2026-11-03)을 참고한다.
