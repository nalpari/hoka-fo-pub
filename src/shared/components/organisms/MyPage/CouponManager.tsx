'use client';

import { useState } from 'react';
import { Box, HStack, Stack } from 'styled-system/jsx';
import { Button } from '@/shared/components/atoms/Button/Button';

import { SegmentedControl } from '@/shared/components/atoms/SegmentedControl/SegmentedControl';

import { Typography } from '@/shared/components/atoms/Typography/Typography';
import { ModalDialog } from '@/shared/components/molecules/ModalDialog/ModalDialog';
import { EmployeeCoupons } from './EmployeeCoupons';
import { CouponCard, type CouponItem } from './CouponCard';
import { TextFormField } from '@/shared/components/molecules/FormFields/TextFormField';

export type { CouponItem } from './CouponCard';

type Props = { coupons: CouponItem[] };

type Category = '전체' | CouponItem['category'];

export function CouponManager({ coupons }: Props) {
  const [category, setCategory] = useState<Category>('전체');
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [registered, setRegistered] = useState(false);
  const [visibleCount, setVisibleCount] = useState(5);
  const [selectedCoupon, setSelectedCoupon] = useState<CouponItem | null>(null);
  const visibleCoupons = coupons.filter(
    (coupon) => category === '전체' || coupon.category === category,
  );

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
      <Stack as="section" gap="4" aria-label="쿠폰 등록">
        <Typography as="h1" web="heading8" mo="heading5">
          쿠폰 등록
        </Typography>
        <Typography as="p" variant="body3" tone="subtle">
          이벤트를 통해 발급 받은 쿠폰의 일련번호를 입력하십시오. 발급 받으신 쿠폰 일련번호를
          등록기간 내에 등록 하셔야 사용 가능합니다.
        </Typography>
        <form
          noValidate
          onSubmit={(event) => {
            event.preventDefault();
            registerCoupon();
          }}
        >
          <TextFormField
            id="coupon-code"
            label="일련번호"
            required
            variant="boxed"
            invalid={Boolean(error)}
            error={error || undefined}
            inputProps={{
              'aria-label': '쿠폰 일련번호',
              placeholder: '일련 번호를 입력해 주세요',
              value: code,
              onChange: (event) => {
                setCode(event.target.value);
                setError('');
                setRegistered(false);
              },
            }}
          />
          {code ? (
            <Box mt="3">
              <Button fullWidth type="submit" size="short" variant="primary">
                쿠폰 등록
              </Button>
            </Box>
          ) : null}
        </form>
      </Stack>

      <EmployeeCoupons />

      <Stack as="section" gap="6" aria-label="쿠폰 내역">
        <Stack gap="3">
          <Typography as="h2" web="heading8" mo="heading5">
            쿠폰 내역
          </Typography>
          <Typography as="p" variant="body3" tone="subtle">
            쿠폰별 사용조건이 상이하니 사용 전에 반드시 확인하시기 바랍니다.
          </Typography>
        </Stack>
        <Stack gap="6">
          <SegmentedControl
            ariaLabel="쿠폰 종류"
            onValueChange={(value) => {
              setCategory(value);
              setVisibleCount(5);
            }}
            options={[
              { value: '전체', label: '전체' },
              { value: '상품 할인', label: '상품할인' },
              { value: '배송 할인', label: '배송할인' },
            ]}
            variant="underline"
            value={category}
          />
          <Stack gap="2">
            <HStack justifyContent="flex-end">
              <HStack gap="0.5">
                <Typography variant="body4">총</Typography>
                <Typography variant="body4" weight="medium">
                  {visibleCoupons.length}
                  <Typography variant="bodyKr4">건</Typography>
                </Typography>
              </HStack>
            </HStack>
            <Stack gap="4">
              {visibleCoupons.slice(0, visibleCount).map((coupon) => (
                <CouponCard key={coupon.id} coupon={coupon} onDetails={setSelectedCoupon} />
              ))}
            </Stack>
          </Stack>
          {visibleCount < visibleCoupons.length ? (
            <Button
              fullWidth
              size="short"
              variant="secondary"
              onClick={() => setVisibleCount((count) => count + 5)}
            >
              <HStack gap="1">
                <Typography mo="ctaKr2">더보기</Typography>
                <Typography mo="body5" tone="tertiary">
                  ({Math.ceil(visibleCount / 5)}/{Math.ceil(visibleCoupons.length / 5)})
                </Typography>
              </HStack>
            </Button>
          ) : null}
        </Stack>
      </Stack>

      <ModalDialog
        closeLabel="쿠폰 등록 결과 닫기"
        open={registered}
        onOpenChange={setRegistered}
        size="sm"
        title="쿠폰등록"
      >
        <Stack gap="6">
          <Typography as="p" variant="body3">
            쿠폰이 등록되었습니다.
          </Typography>
          <Button fullWidth size="short" variant="primary" onClick={() => setRegistered(false)}>
            확인
          </Button>
        </Stack>
      </ModalDialog>
      <ModalDialog
        closeLabel="쿠폰 상세 닫기"
        open={selectedCoupon !== null}
        onOpenChange={(open) => {
          if (!open) setSelectedCoupon(null);
        }}
        size="sm"
        title="쿠폰 상세"
      >
        <Stack gap="3">
          <Typography variant="body3" weight="semibold">
            {selectedCoupon?.name}
          </Typography>
          <Typography variant="body4">{selectedCoupon?.benefit}</Typography>
          <Typography variant="body4">{selectedCoupon?.condition}</Typography>
          <Typography variant="body5" tone="tertiary">
            {selectedCoupon?.expiresAt}
          </Typography>
        </Stack>
      </ModalDialog>
    </Stack>
  );
}
