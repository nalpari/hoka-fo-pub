import { HStack } from 'styled-system/jsx';
import { Typography } from '@/shared/components/atoms/Typography/Typography';

type Props = { count: number };

export function MyPageReviewCount({ count }: Props) {
  return (
    <HStack gap="0.5">
      <Typography variant="body4">총</Typography>
      <Typography variant="body4" weight="medium">
        {count}
        <Typography variant="bodyKr4">건</Typography>
      </Typography>
    </HStack>
  );
}
