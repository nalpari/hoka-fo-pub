import { Box } from 'styled-system/jsx';
import { Typography } from '@/components/common/atoms/Typography/Typography';

export function MyPageProductHistoryHeading({ title }: { title: string }) {
  return (
    <Box px="4" pt="6">
      <Typography as="h1" web="heading8" mo="heading5">
        {title}
      </Typography>
    </Box>
  );
}
