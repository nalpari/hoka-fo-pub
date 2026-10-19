import type { ReactNode } from 'react';
import { Box } from 'styled-system/jsx';
import { Typography } from '@/shared/components/atoms/Typography/Typography';

type Props = { answer: ReactNode };

export function FaqAnswer({ answer }: Props) {
  return (
    <Box bg="black.10" px="6" py="8" whiteSpace="pre-line" _mobile={{ px: '3', py: '5' }}>
      <Box as="p" m="0">
        <Typography as="span" web="body4" mo="body5">
          {answer}
        </Typography>
      </Box>
    </Box>
  );
}
