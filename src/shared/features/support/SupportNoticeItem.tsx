import { Divider } from '@/shared/components/atoms/Divider/Divider';
import Link from 'next/link';
import { css } from 'styled-system/css';
import { Box, HStack } from 'styled-system/jsx';
import { Typography } from '@/shared/components/atoms/Typography/Typography';

type SupportNoticeItemProps = {
  title: string;
  date: string;
};

const styles = {
  noticeLink: css({ display: 'block' }),
  noticeTitle: css({
    minW: '0',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  }),
};

export function SupportNoticeItem({ title, date }: SupportNoticeItemProps) {
  return (
    <Box as="li">
      <Link className={styles.noticeLink} href="/support/notices/1">
        <HStack
          justifyContent="space-between"
          gap="4"
          minH={{ base: '69px', _mobile: '51px' }}
          px="4"
          py="6"
          _mobile={{ gap: '2', px: '0', py: '4' }}
        >
          <Typography className={styles.noticeTitle} web="heading9" mo="body4">
            {title}
          </Typography>
          <Box flexShrink="0">
            <Typography as="time" dateTime={date} web="body4" mo="body5" tone="tertiary">
              {date}
            </Typography>
          </Box>
        </HStack>
      </Link>
      <Divider />
    </Box>
  );
}
