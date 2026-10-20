import { Stack } from 'styled-system/jsx';
import { Typography } from '@/shared/components/atoms/Typography/Typography';
import { ModalDialog } from '@/shared/components/molecules/ModalDialog/ModalDialog';
import type { CouponItem } from './CouponCard';

type Props = {
  coupon: CouponItem | null;
  onOpenChange: (open: boolean) => void;
};

export function CouponDetailsDialog({ coupon, onOpenChange }: Props) {
  return (
    <ModalDialog
      closeLabel="쿠폰 상세 닫기"
      open={coupon !== null}
      onOpenChange={onOpenChange}
      size="sm"
      title="쿠폰 상세"
    >
      <Stack gap="3">
        <Typography variant="body3" weight="semibold">
          {coupon?.name}
        </Typography>
        <Typography variant="body4">{coupon?.benefit}</Typography>
        <Typography variant="body4">{coupon?.condition}</Typography>
        <Typography variant="body5" tone="tertiary">
          {coupon?.expiresAt}
        </Typography>
      </Stack>
    </ModalDialog>
  );
}
