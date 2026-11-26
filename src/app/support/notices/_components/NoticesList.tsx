'use client';

import Link from 'next/link';

import { css } from 'styled-system/css';
import { Stack } from 'styled-system/jsx';

import { dataListRecipe } from '@/components/common/atoms/DataList.recipe';
import { EmptyState } from '@/components/common/atoms/EmptyState';
import { Typography } from '@/components/common/atoms/Typography';

type NoticesListProps = {
  notices: readonly { id?: string; title: string; date: string }[];
  shown: number;
  pending?: boolean;
  error?: boolean;
};

const noticeLink = css({
  display: 'flex',
  alignItems: 'flex-start',
  gap: '24px',
  px: '16px',
  py: '24px',
  _mobile: { minH: '56px', px: '0', py: '16px', gap: '16px' },
  _focusVisible: {
    outline: '2px solid var(--color-focus-ring)',
    outlineOffset: '-2px',
  },
});

const styles = {
  title: css({ flex: '1', minW: '0', overflowWrap: 'anywhere' }),
  date: css({
    minW: '105px',
    flexShrink: '0',
    whiteSpace: 'nowrap',
    textAlign: 'right',
    _mobile: { minW: '74px' },
  }),
};

/** 공지사항 목록을 표시합니다. (Displays the notice list.) */
export function NoticesList({ notices, shown, pending, error }: NoticesListProps) {
  return (
    <Stack as="section" aria-label="공지사항 목록" gap="0">
      {!notices.length && !pending && !error ? (
        <EmptyState title="등록된 공지사항이 없습니다." variant="plain" layout="notices" />
      ) : null}
      <Stack
        as="ul"
        gap="0"
        m="0"
        p="0"
        listStyleType="none"
        className={notices.length ? dataListRecipe({ top: 'thinSubtle' }).root : undefined}
      >
        {notices.slice(0, shown).map((notice, index) => (
          <li key={notice.id ?? `${notice.title}-${index}`}>
            <Link
              href={`/support/notices/${encodeURIComponent(notice.id ?? String(index + 1))}`}
              className={noticeLink}
            >
              <Typography web="b3M" mo="b4M" className={styles.title}>
                {notice.title}
              </Typography>
              <Typography
                as="time"
                web="b4"
                mo="b6"
                tone="tertiary"
                dateTime={notice.date}
                className={styles.date}
              >
                {notice.date}
              </Typography>
            </Link>
          </li>
        ))}
      </Stack>
    </Stack>
  );
}
