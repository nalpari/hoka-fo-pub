'use client';

import Link from 'next/link';

import { css } from 'styled-system/css';
import { HStack, Stack } from 'styled-system/jsx';

import { Typography } from '@/components/common/atoms/Typography';

type Props = { notice: { title: string; date: string }; platform: 'web' | 'mobile' };

function NoticeHeading({ notice, platform }: Props) {
  return (
    <HStack
      as="span"
      w="100%"
      justifyContent="space-between"
      gap={{ base: '4', _mobile: '2' }}
      alignItems={{ base: 'center', _mobile: 'flex-start' }}
      flexDirection={{ base: 'row', _mobile: 'column' }}
    >
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

type NoticesListProps = {
  notices: readonly { id?: string; title: string; date: string }[];
  shown: number;
  platform: 'web' | 'mobile';
};

const noticeLink = css({
  display: 'flex',
  alignItems: 'center',
  minH: '74px',
  px: '16px',
  py: '24px',
  borderBottom: '1px solid token(colors.black.20)',
  _mobile: { minH: '58px', px: '0', py: '16px' },
  _focusVisible: {
    outline: '2px solid var(--color-focus-ring)',
    outlineOffset: '-2px',
  },
});

/** 공지사항 목록을 표시합니다. (Displays the notice list.) */
export function NoticesList({ notices, shown, platform }: NoticesListProps) {
  return (
    <Stack
      as="section"
      aria-label="공지사항 목록"
      gap="0"
      borderTopColor="black.100"
      borderTopStyle="solid"
      borderTopWidth={{ base: '2px', _mobile: '0' }}
      pt="8px"
    >
      <Stack as="ul" gap="0" m="0" p="0" listStyleType="none">
        {notices.slice(0, shown).map((notice, index) => (
          <li key={notice.id ?? `${notice.title}-${index}`}>
            <Link
              href={`/support/notices/${encodeURIComponent(notice.id ?? String(index + 1))}`}
              className={noticeLink}
            >
              <NoticeHeading notice={notice} platform={platform} />
            </Link>
          </li>
        ))}
      </Stack>
    </Stack>
  );
}
