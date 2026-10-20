import { useState } from 'react';
import { HStack, Stack } from 'styled-system/jsx';
import { ContentSection } from '@/shared/components/layouts/ContentSection/ContentSection';
import { LoadMoreButton } from '@/shared/components/atoms/LoadMoreButton/LoadMoreButton';
import { SegmentedControl } from '@/shared/components/atoms/SegmentedControl/SegmentedControl';
import { Typography } from '@/shared/components/atoms/Typography/Typography';
import { CouponCard, type CouponItem } from './CouponCard';

type Category = '전체' | CouponItem['category'];

type CouponHistorySectionProps = {
  coupons: CouponItem[];
  onDetails: (coupon: CouponItem) => void;
};

export function CouponHistorySection({ coupons, onDetails }: CouponHistorySectionProps) {
  const [category, setCategory] = useState<Category>('전체');
  const [visibleCount, setVisibleCount] = useState(5);
  const visibleCoupons = coupons.filter(
    (coupon) => category === '전체' || coupon.category === category,
  );

  return (
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
            <CouponCard key={coupon.id} coupon={coupon} onDetails={onDetails} />
          ))}
        </Stack>
      </Stack>
    </ContentSection>
  );
}
