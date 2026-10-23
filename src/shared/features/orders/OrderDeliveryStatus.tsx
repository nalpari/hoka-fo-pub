import { Typography } from '@/shared/components/atoms/Typography/Typography';

/** 주문 상태와 도착 예정일을 함께 표시합니다. (Displays order status with the expected arrival date.) */
export function OrderDeliveryStatus({
  label,
  expectedDate,
}: {
  label: string;
  expectedDate: string;
}) {
  return (
    <Typography variant="body5">
      <Typography variant="body5" tone="primary" weight="semibold">
        {label}
      </Typography>{' '}
      · {expectedDate} 도착 예정
    </Typography>
  );
}
