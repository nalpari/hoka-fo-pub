import { HStack } from 'styled-system/jsx';
import { Typography } from '@/components/common/atoms/Typography/Typography';

type Props = { question: string };

export function FaqQuestion({ question }: Props) {
  return (
    <HStack gap="2" minW="0">
      <Typography as="b" variant="body2">
        Q
      </Typography>
      <Typography as="span" variant="body3" weight="medium">
        {question}
      </Typography>
    </HStack>
  );
}
