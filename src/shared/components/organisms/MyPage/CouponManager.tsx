'use client';

import { useState } from 'react';
import { Stack } from 'styled-system/jsx';
import { CouponRegistrationSection } from './CouponRegistrationSection';
import { CouponHistorySection } from './CouponHistorySection';
import { CouponRegistrationDialog } from './CouponRegistrationDialog';
import { CouponDetailsDialog } from './CouponDetailsDialog';
import { EmployeeCoupons } from './EmployeeCoupons';
import type { CouponItem } from './CouponCard';

export type { CouponItem } from './CouponCard';

type Props = { coupons: CouponItem[] };

export function CouponManager({ coupons }: Props) {
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [registered, setRegistered] = useState(false);
  const [selectedCoupon, setSelectedCoupon] = useState<CouponItem | null>(null);

  function registerCoupon() {
    if (code.trim().length < 6) {
      setError('쿠폰 일련번호를 확인해 주세요.');
      return;
    }
    setError('');
    setRegistered(true);
    setCode('');
  }

  return (
    <Stack gap="10" px="4" pt="6" pb="16">
      <CouponRegistrationSection
        code={code}
        error={error}
        onCodeChange={(value) => {
          setCode(value);
          setError('');
          setRegistered(false);
        }}
        onRegister={registerCoupon}
      />

      <EmployeeCoupons />

      <CouponHistorySection coupons={coupons} onDetails={setSelectedCoupon} />

      <CouponRegistrationDialog open={registered} onOpenChange={setRegistered} />
      <CouponDetailsDialog
        coupon={selectedCoupon}
        onOpenChange={(open) => {
          if (!open) setSelectedCoupon(null);
        }}
      />
    </Stack>
  );
}
