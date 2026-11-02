/** [ 개발팀 바인딩 ] 현재는 준비된 표시 데이터와 고정 상태의 마크업입니다. 입력·선택·열람·열기/닫기만 로컬로 처리하며 인증·조회·저장·삭제·결제·완료 전환은 실행하지 않습니다. 실제 문의 연결 소유자가 표시 모델과 식별자·입력/선택 payload, 요청 중/실패/성공/재시도 및 응답 갱신을 별도로 구현해야 합니다. */
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
export type InquiryOrderSelection = {
  order: InquiryOrder;
  products: InquiryOrder['products'];
} | null;
