import { Typography } from '@/shared/components/atoms/Typography/Typography';
import { Box } from 'styled-system/jsx';

type LaunchNoticeProps = {
  status: 'COMING';
};

/** 출시 전 상품의 구매 가능 시점을 알리는 안내입니다. */
export function LaunchNotice({ status }: LaunchNoticeProps) {
  if (status !== 'COMING') return null;

  return (
    <Box p="11px" bg="var(--color-black-10)">
      <Typography as="p" variant="body4" tone="red80">
        COMING SOON · 발매 알림은 출시 후 제공됩니다.
      </Typography>
    </Box>
  );
}
