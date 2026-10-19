import { HStack, Stack } from 'styled-system/jsx';
import { Button } from '@/shared/components/atoms/Button/Button';
import { Typography } from '@/shared/components/atoms/Typography/Typography';

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
    <Stack as="article" border="1px solid var(--colors-black-20)" gap="6" px="4" py="6">
      <HStack justifyContent="space-between" alignItems="flex-start">
        <Typography as="h3" variant="heading6">
          {coupon.name}
        </Typography>
        <Button size="sm" variant="link" onClick={() => onDetails(coupon)}>
          상세보기
        </Button>
      </HStack>
      <Stack gap="3">
        <Typography variant="heading7">{coupon.benefit}</Typography>
        <Stack gap="1">
          <Typography variant="body4">{coupon.condition}</Typography>
          <Typography variant="body4" language="en" tone="tertiary">
            {coupon.expiresAt}
          </Typography>
        </Stack>
      </Stack>
    </Stack>
  );
}
