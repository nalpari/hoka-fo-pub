'use client';

/**
 * [ 개발팀 바인딩 ]
 * 현재 RouteContent는 경로 ID에 대응하는 준비된 상품 표시 데이터를 사용합니다. 실제 상품 DTO·옵션·가격·재고는 향후 상품 상세 통합 소유자가 전달해야 합니다.
 * 옵션과 수량은 로컬 표시만 바꾸고 장바구니 추가·주문 생성·결제 이동은 실행하지 않습니다. 향후 연결할 payload는 상품 ID·색상·너비·사이즈·수량이며 pending/실패/재시도·성공 갱신은 통합 소유자가 관리합니다.
 * 현재 상세의 wish는 로컬 토글입니다. 영구 찜을 연결할 때 onWishChange 소유자에서 실제 상품 ID로 요청하고 성공 상태/실패 복원을 관리해야 합니다.
 */

import { RouteContent } from './_components/ProductDetailContent';

/** 라우트의 기본 화면을 표시합니다. (Displays the default route screen.) */
export default function Page() {
  return <RouteContent />;
}
