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
