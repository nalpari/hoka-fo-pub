# 컴포넌트 목록

- 플랫폼: `AdaptiveRoot`, `WebApp`, `MobileApp`, Web/Mobile 전용 동적 청크
- 레이아웃: Header, Menu Drawer, Search overlay, Footer
- 카탈로그: Product list, Filter, selected chips, sort, pagination, Product card, empty state
- 상세: Gallery, image viewer, color/size selector, quantity control, wishlist, cart/order actions, accordion sections
- 마이페이지: `MyPageLayout` (웹 사이드바·모바일 가로 메뉴), `MemberHero`, 빠른 현황 링크, 공통 내역/빈 상태 화면, 쿠폰 카드, 러닝 프로필 질문 흐름
- 개발 도구: Screen index, component preview

공유되는 것은 상품 데이터와 옵션/장바구니 로직이다. Web과 Mobile은 별도 지연 로드 진입점과 별도 레이아웃 클래스가 배치한다.
