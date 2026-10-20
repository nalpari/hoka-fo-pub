'use client';

import { useState } from 'react';
import { Box, HStack, Stack } from 'styled-system/jsx';
import { Button } from '@/shared/components/atoms/Button/Button';
import { LoadMoreButton } from '@/shared/components/atoms/LoadMoreButton/LoadMoreButton';

import { SegmentedControl } from '@/shared/components/atoms/SegmentedControl/SegmentedControl';

import { Typography } from '@/shared/components/atoms/Typography/Typography';
import { CouponRegistrationDialog } from './CouponRegistrationDialog';
import { CouponDetailsDialog } from './CouponDetailsDialog';
import { EmployeeCoupons } from './EmployeeCoupons';
import { CouponCard, type CouponItem } from './CouponCard';
import { TextFormField } from '@/shared/components/molecules/FormFields/TextFormField';

import { ContentSection } from '@/shared/components/layouts/ContentSection/ContentSection';

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
      <ContentSection
        as="section"
        gap="4"
        aria-label="쿠폰 등록"
        title="쿠폰 등록"
        headerProps={{
          gap: '4',
          titleAs: 'h1',
          titleProps: { web: 'heading8', mo: 'heading5' },
          description: (
            <>
              이벤트를 통해 발급 받은 쿠폰의 일련번호를 입력하십시오. 발급 받으신 쿠폰 일련번호를
              등록기간 내에 등록 하셔야 사용 가능합니다.
            </>
          ),
          descriptionProps: { variant: 'body3', tone: 'subtle' },
        }}
      >
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
      </ContentSection>

      <EmployeeCoupons />

      <ContentSection
        as="section"
        gap="6"
        aria-label="쿠폰 내역"
        title="쿠폰 내역"
        headerProps={{
          titleProps: { web: 'heading8', mo: 'heading5' },
          description: '쿠폰별 사용조건이 상이하니 사용 전에 반드시 확인하시기 바랍니다.',
          descriptionProps: { variant: 'body3', tone: 'subtle' },
        }}
        footer={
          visibleCount < visibleCoupons.length ? (
            <LoadMoreButton
              fullWidth
              size="short"
              variant="secondary"
              onClick={() => setVisibleCount((count) => count + 5)}
              counter={{
                current: Math.ceil(visibleCount / 5),
                total: Math.ceil(visibleCoupons.length / 5),
              }}
              labelProps={{ mo: 'ctaKr2' }}
              counterProps={{ mo: 'body5' }}
            />
          ) : null
        }
      >
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
      </ContentSection>

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
