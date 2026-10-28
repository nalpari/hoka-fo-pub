import { Stack } from 'styled-system/jsx';
import { css } from 'styled-system/css';
import { ContentSection } from '@/components/common/layouts/ContentSection/ContentSection';
import { Button } from '@/components/common/atoms/Button/Button';
import { Typography } from '@/components/common/atoms/Typography/Typography';

export type CouponItem = {
  id: string;
  name: string;
  benefit: string;
  condition: string;
  expiresAt: string;
  category: '상품 할인' | '배송 할인';
};

type CouponCardProps = {
  coupon: CouponItem;
  onDetails: (coupon: CouponItem) => void;
};

export function CouponCard({ coupon, onDetails }: CouponCardProps) {
  return (
    <ContentSection
      as="article"
      border="1px solid var(--colors-black-20)"
      gap="6"
      px="4"
      py="6"
      title={coupon.name}
      headerProps={{
        orientation: 'horizontal',
        gap: '8px',
        css: css.raw({ alignItems: 'flex-start' }),
        titleAs: 'h3',
        titleProps: { variant: 'heading6' },
        action: (
          <Button size="sm" variant="link" onClick={() => onDetails(coupon)}>
            상세보기
          </Button>
        ),
      }}
    >
      <Stack gap="3">
        <Typography variant="heading7">{coupon.benefit}</Typography>
        <Stack gap="1">
          <Typography variant="body4">{coupon.condition}</Typography>
          <Typography variant="body4" language="en" tone="tertiary">
            {coupon.expiresAt}
          </Typography>
        </Stack>
      </Stack>
    </ContentSection>
  );
}
