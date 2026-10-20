import { Divider } from '@/shared/components/atoms/Divider/Divider';
import { Box } from 'styled-system/jsx';
import { Typography } from '@/shared/components/atoms/Typography/Typography';

export function MyPageProductHistoryNote({ note }: { note: string }) {
  return (
    <Box px="4" pb="16">
      <Divider />
      <Box pt="4" whiteSpace="pre-line">
        <Typography as="p" variant="body4" tone="tertiary">
          {note}
        </Typography>
      </Box>
    </Box>
  );
}
