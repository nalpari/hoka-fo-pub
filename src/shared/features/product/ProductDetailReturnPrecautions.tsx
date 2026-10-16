import { css } from 'styled-system/css';
import {
  ProductDetailDeliverySection,
  ProductDetailDeliveryList,
} from './ProductDetailDeliverySection';

const bulletList = css({ listStyleType: 'disc', pl: '4', mt: '3' });

export function ProductDetailReturnPrecautions() {
  return (
    <ProductDetailDeliverySection title="반품 유의사항">
      <ProductDetailDeliveryList>
        <li>상품 수령일로부터 7일 이내에 반품을 신청해 주세요.</li>
        <li>
          호카 온라인 스토어에서 구매하신 상품은 온라인으로 반품을 신청해 주세요. 교환을 원하시는
          경우 고객센터의 안내를 확인해 주세요. 온라인 구매 상품의 오프라인 매장 반품은 불가합니다.
        </li>
        <li>
          다음과 같은 경우 반품 처리가 불가합니다.
          <ul className={bulletList}>
            <li>상품을 이미 착용하거나 사용한 경우</li>
            <li>단순 변심으로 상품 수령일로부터 7일이 경과한 경우</li>
            <li>
              상품 또는 구성품(신발 박스, 가격 택, 라벨, 폴리백 등)을 분실하거나 훼손한 경우 (신발
              박스에 테이프를 붙이거나 운송장을 부착한 경우 포함)
            </li>
            <li>사은품을 사용하거나 분실 또는 훼손한 경우</li>
            <li>소비자의 책임으로 상품 가치가 감소한 경우</li>
          </ul>
        </li>
        <li>
          반품 배송비 안내
          <ul className={bulletList}>
            <li>상품 불량 또는 오배송으로 인한 반품 배송비는 호카가 부담합니다.</li>
            <li>고객님의 단순 변심으로 인한 반품 배송비는 고객님 부담입니다.</li>
            <li>제주도 및 도서 산간 지역은 추가 배송비가 발생할 수 있습니다.</li>
            <li>정확한 반품 배송비와 결제 방법은 반품 접수 시 안내를 확인해 주세요.</li>
            <li>타 택배사를 이용하실 경우 발송 전 고객센터에 문의해 주세요.</li>
          </ul>
        </li>
      </ProductDetailDeliveryList>
    </ProductDetailDeliverySection>
  );
}
