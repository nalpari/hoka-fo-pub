import { Box, Divider } from 'styled-system/jsx';
import { Typography } from '@/shared/components/atoms/Typography/Typography';

export function MyPageProductHistoryNote({ note }: { note: string }) {
  return (
    <Box px="4" pb="16">
      <Divider aria-hidden="true" orientation="horizontal" h="1px" bg="black.20" />
      <Box pt="4" whiteSpace="pre-line">
        <Typography as="p" variant="body4" tone="tertiary">
          {note}
        </Typography>
      </Box>
    </Box>
  );
}
