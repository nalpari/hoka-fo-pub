import type { ReactNode } from 'react';
import { Box } from 'styled-system/jsx';
import { Typography } from '@/shared/components/atoms/Typography/Typography';

type Props = { answer: ReactNode };

export function FaqAnswer({ answer }: Props) {
  return (
    <Box bg="black.10" px="4" py="6" whiteSpace="pre-line">
      <Typography as="p" web="body4" mo="body4">
        {answer}
      </Typography>
    </Box>
  );
}
