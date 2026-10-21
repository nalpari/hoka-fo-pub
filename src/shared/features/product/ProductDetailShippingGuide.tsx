import { ProductSupportTextLink } from './ProductSupportTextLink';
import {
  ProductDetailDeliverySection,
  ProductDetailDeliveryList,
} from './ProductDetailDeliverySection';

export function ProductDetailShippingGuide() {
  return (
    <ProductDetailDeliverySection title="배송 안내">
      <ProductDetailDeliveryList>
        <li>구매 금액에 관계없이 전 상품 무료배송입니다.</li>
        <li>결제일로부터 1~5일 이내에 상품이 출고됩니다. (토·일요일 및 공휴일 제외)</li>
        <li>상품은 호카 물류센터 또는 매장에서 발송됩니다.</li>
        <li>
          <ProductSupportTextLink href="/mypage/orders">
            마이페이지 &gt; 주문/배송 조회
          </ProductSupportTextLink>
          에서 구매하신 상품의 배송 상태를 확인하실 수 있습니다.
        </li>
      </ProductDetailDeliveryList>
    </ProductDetailDeliverySection>
  );
}
