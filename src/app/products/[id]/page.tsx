'use client';

/**
 * [개발팀 바인딩]
 * 상품 본문/옵션/가격/갤러리는 useShop().products에서 경로 ID로 찾습니다. 상품 DTO를 Product로 변환해 ShopShell.state.products에 포함합니다.
 * 주문 선택은 id/color/width/size/quantity를 장바구니 add로 전달합니다. 재고·구매 가능 여부·가격 확정은 서비스에서 검증합니다.
 * 현재 상세의 wish는 로컬 토글입니다. 영구 찜을 연결할 때 onWishChange 소유자에서 실제 상품 ID로 요청하고 성공 상태/실패 복원을 관리해야 합니다.
 */

import { useRoutePreview } from '@/context/RoutePreview';

import { RouteContent, routePreviewComponents } from './_components/ProductDetailContent';

/** 실제 화면 또는 컨텍스트로 선택한 로컬 구성을 표시합니다. (Displays the route or its context-selected local composition.) */
export default function Page() {
  const preview = useRoutePreview(routePreviewComponents);
  return preview ?? <RouteContent />;
}
