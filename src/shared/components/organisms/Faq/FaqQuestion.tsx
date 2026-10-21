import { HStack } from 'styled-system/jsx';
import { Typography } from '@/shared/components/atoms/Typography/Typography';

type Props = { question: string };

export function FaqQuestion({ question }: Props) {
  return (
    <HStack gap="2" minW="0">
      <Typography as="b" variant="body2">
        Q
      </Typography>
      <Typography as="span" web="heading9" mo="body5" weight="semibold">
        {question}
      </Typography>
    </HStack>
  );
}
