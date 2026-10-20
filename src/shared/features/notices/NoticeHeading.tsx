import { Box, HStack } from 'styled-system/jsx';
import { Typography } from '@/shared/components/atoms/Typography/Typography';
import { css } from 'styled-system/css';

type Props = { notice: { title: string; date: string }; platform: 'web' | 'mobile' };

export function NoticeHeading({ notice, platform }: Props) {
  return (
    <HStack as="span" w="100%" justifyContent="space-between" gap="4" alignItems="center">
      <Box
        as="span"
        minW="0"
        flex="1"
        overflow="hidden"
        whiteSpace="nowrap"
        textOverflow="ellipsis"
      >
        <Typography web="heading9" mo="body3">
          {notice.title}
        </Typography>
      </Box>
      <Typography
        as="time"
        variant="body4"
        dateTime={notice.date}
        className={css({ flexShrink: '0' })}
        tone={platform === 'web' ? 'subtle' : 'tertiary'}
      >
        {notice.date}
      </Typography>
    </HStack>
  );
}
