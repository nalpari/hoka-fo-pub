import { Stack } from 'styled-system/jsx';
import { Typography } from '@/shared/components/atoms/Typography/Typography';

export function InquiryEmptyState() {
  return (
    <Stack
      align="center"
      justify="center"
      textAlign="center"
      minH={{ base: '430px', _mobile: '146px' }}
    >
      <Typography web="body3" mo="body4" tone="subtle">
        등록된 문의사항이 없습니다.
      </Typography>
    </Stack>
  );
}
