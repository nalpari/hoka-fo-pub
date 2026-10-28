'use client';

import { CouponManager, type CouponItem } from '@/components/common/organisms/MyPage/CouponManager';
import { MyPageFrame } from '@/components/features/mypage/MyPageFrame';

const couponSamples: Omit<CouponItem, 'id'>[] = [
  {
    name: '신규 회원가입 쿠폰',
    benefit: '10,000원',
    condition: '50,000원 이상 구매 시',
    expiresAt: '2026.05.19 - 2026.10.15',
    category: '상품 할인',
  },
  {
    name: '15% 감사 쿠폰',
    benefit: '5,000원',
    condition: '온라인, 성인 의류/신발/용품',
    expiresAt: '2026.05.19 - 2026.10.15',
    category: '상품 할인',
  },
  {
    name: '생일 쿠폰',
    benefit: '10,000원',
    condition: '50,000원 이상 구매 시',
    expiresAt: '2026.05.19 - 2026.10.15',
    category: '배송 할인',
  },
];

const coupons: CouponItem[] = Array.from({ length: 62 }, (_, index) => ({
  ...couponSamples[index % couponSamples.length],
  id: `coupon-${index + 1}`,
}));

/** 보유 쿠폰과 쿠폰 등록 예시 상태를 관리합니다. (Manages owned coupons and the example coupon registration state.) */
export default function Page() {
  return (
    <MyPageFrame
      activePath="/mypage/coupons"
      breadcrumbs={[{ label: 'MY HOKA', href: '/mypage' }, { label: '쿠폰' }]}
    >
      <CouponManager coupons={coupons} />
    </MyPageFrame>
  );
}
