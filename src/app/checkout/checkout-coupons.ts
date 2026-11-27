const productCouponOptions = [
  { id: 'none', label: '적용 쿠폰 없음', amount: '0' },
  { id: 'product-7', label: '[상품쿠폰] 온라인·성인·의류/용품 [7%]', amount: '- 19,460' },
  { id: 'product-10', label: '[상품쿠폰] 온라인·성인·의류/용품 [10%]', amount: '- 27,800' },
  { id: 'product-15', label: '[상품쿠폰] 온라인·성인·의류/용품 [15%]', amount: '- 41,700' },
  { id: 'product-20', label: '[상품쿠폰] 온라인·성인·의류/용품 [20%]', amount: '- 55,600' },
];

export const checkoutCouponGroups = [
  { available: 1, total: 4, allowTenPercent: false },
  { available: 2, total: 5, allowTenPercent: true },
  { available: 1, total: 2, allowTenPercent: false },
  { available: 2, total: 5, allowTenPercent: true },
].map(({ available, total, allowTenPercent }, index) => ({
  id: `coupon-product-${index + 1}`,
  name: 'Speedgoat 7 GTX',
  image: '/images/cart/speedgoat-black.png',
  optionText: '브라운, 235, 레귤러, 1개',
  amount: 240000,
  available,
  total,
  initialCouponId: 'product-7',
  options: productCouponOptions.map((option) => ({
    ...option,
    disabled:
      option.id === 'product-15' ||
      option.id === 'product-20' ||
      (option.id === 'product-10' && !allowTenPercent),
  })),
}));
