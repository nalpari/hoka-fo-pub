/**
 * [개발팀 바인딩]
 * InquiryOrder.id는 주문 ID, products[].id는 선택 가능한 주문 상품 행 ID입니다. 같은 상품의 다른 옵션/주문 행을 구분해야 합니다.
 * 운영 조회는 InquiryDataContext.orders, 저장된 선택 복원은 form.resolveSelection을 사용합니다. 아래 생성 배열은 시안 전용입니다.
 */

export type InquiryOrderProduct = {
  id: string;
  name: string;
  code: string;
  color: string;
  size: string;
  quantity: number;
  image: string;
};

export type InquiryOrder = {
  id: string;
  date: string;
  products: InquiryOrderProduct[];
};

const product = (id: string, code: string, color: string, size: string): InquiryOrderProduct => ({
  id,
  name: '클리프톤 6',
  code,
  color,
  size,
  quantity: 1,
  image: '/images/products/clifton-11-gtx/gallery-1.png',
});

export const inquiryOrders: InquiryOrder[] = Array.from({ length: 13 }, (_, index) => {
  const number = String(2026091635153701 - index * 125431).padStart(16, '0');
  const orderDate = new Date(Date.UTC(2026, 7, 15 - index * 25)).toISOString().slice(0, 10);
  return {
    id: `HK${number}`,
    date: orderDate,
    products:
      index === 0
        ? [
            product('H0KA12', 'HRKRGF747G', 'Gray', '270'),
            product('H0KA13', 'HRKRGF869G', 'Gray', '270'),
            product('H0KA14', 'HRKRGF871G', 'Black', '270'),
            product('H0KA15', 'HRKRGF872G', 'Black', '275'),
            product('H0KA16', 'HRKRGF873G', 'Gray', '275'),
            product('H0KA17', 'HRKRGF874G', 'Gray', '280'),
          ]
        : [product(`H0KA${20 + index}`, `HRKRGF${740 + index}G`, 'Gray', '270')],
  };
});
