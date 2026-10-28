import { HStack } from 'styled-system/jsx';
import { Typography } from '@/components/common/atoms/Typography/Typography';
import { css } from 'styled-system/css';

type Props = { notice: { title: string; date: string }; platform: 'web' | 'mobile' };

export function NoticeHeading({ notice, platform }: Props) {
  return (
    <HStack as="span" w="100%" justifyContent="space-between" gap="4" alignItems="center">
      <Typography web="body2" mo="body3" weight="medium">
        {notice.title}
      </Typography>
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
