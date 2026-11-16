export const checkoutCouponGroups = [1, 2, 3, 4].map((index) => ({
  id: `coupon-product-${index}`,
  name: 'Speedgoat 7 GTX',
  image: '/images/cart/speedgoat-black.png',
  optionText: '레귤러, 브라운, 235, 1개',
  amount: 240000,
  available: index % 2 === 0 ? 2 : 1,
  total: index === 1 ? 4 : index === 3 ? 2 : 5,
  options: [
    { id: 'none', label: '적용 쿠폰 없음', amount: '0원', disabled: false },
    {
      id: 'family-apparel',
      label: '[등급쿠폰] HOKA FAMILY 감사 쿠폰\n(온라인·성인·의류/용품) [7%]',
      amount: '- 5,000원',
      disabled: true,
    },
    {
      id: 'family-shoes',
      label: '[상품쿠폰] HOKA FAMILY 감사 쿠폰\n(온라인·성인·신발) [7%]',
      amount: '- 13,580원',
      disabled: false,
    },
    {
      id: 'family-kids',
      label: '[등급쿠폰] HOKA FAMILY 감사 쿠폰\n(온라인·키즈·신발/ 의류/용품) [7%]',
      amount: '- 13,580원',
      disabled: index % 2 !== 0,
    },
    {
      id: 'family-offline',
      label: '[NEW][등급쿠폰] HOKA FAMILY\n감사 쿠폰 (오프라인)[7%]',
      amount: '- 13,580원',
      disabled: true,
    },
  ],
}));
