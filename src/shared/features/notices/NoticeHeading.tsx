import { Box, HStack } from 'styled-system/jsx';
import { Typography } from '@/shared/components/atoms/Typography/Typography';

type Props = { notice: { title: string; date: string }; platform: 'web' | 'mobile' };

export function NoticeHeading({ notice, platform }: Props) {
  return (
    <HStack w="100%" justifyContent="space-between" gap="4" alignItems="center">
      <Box minW="0" flex="1" overflow="hidden" whiteSpace="nowrap" textOverflow="ellipsis">
        <Typography web="heading9" mo="body3">
          {notice.title}
        </Typography>
      </Box>
      <Typography
        as="time"
        variant="body4"

        tone={platform === 'web' ? 'subtle' : 'tertiary'}
      >
        {notice.date}
      </Typography>
    </HStack>
  );
}
