import { Box } from 'styled-system/jsx';
import { Typography } from '@/shared/components/atoms/Typography/Typography';

export function FaqEmptyState() {
  return (
    <Box py="15" textAlign="center">
      <Typography as="p" web="body4" mo="body5" tone="tertiary">
        검색 결과가 없습니다.
      </Typography>
    </Box>
  );
}
