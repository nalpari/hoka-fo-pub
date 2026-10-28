'use client';

import Link from 'next/link';

import { useState } from 'react';
import { usePlatform } from '@/context/platform';

import { css } from 'styled-system/css';
import { HStack, Stack } from 'styled-system/jsx';

import { Typography } from '@/components/common/atoms/Typography';

import { CustomerCenterLayout } from '@/components/common/layouts/CustomerCenterLayout';

import { notices } from '@/components/notices/notices.data';
import { supportNavigation } from '@/components/support/support.navigation';

type Props = { notice: { title: string; date: string }; platform: 'web' | 'mobile' };

function NoticeHeading({ notice, platform }: Props) {
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

type NoticesListProps = {
  notices: readonly { title: string; date: string }[];
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

function NoticesList({ notices, shown, platform }: NoticesListProps) {
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
          <li key={`${notice.title}-${index}`}>
            <Link href={`/support/notices/${index + 1}`} className={noticeLink}>
              <NoticeHeading notice={notice} platform={platform} />
            </Link>
          </li>
        ))}
      </Stack>
    </Stack>
  );
}

/** 공지 목록과 화면별 상세 탐색을 구성합니다. (Composes notices and platform-specific detail navigation.) */
export default function Page() {
  const platform = usePlatform();
  const [shown, setShown] = useState(10);

  return (
    <CustomerCenterLayout
      title="공지사항"
      activePath="/support/notices"
      breadcrumbItems={[
        { label: 'Home', href: '/' },
        { label: '고객센터', href: '/support' },
        { label: '공지사항' },
      ]}
      groups={supportNavigation}
      footerAction={
        shown < notices.length
          ? {
              kind: 'loadMore',
              label: '더보기',
              onClick: () => setShown((count) => count + 10),
              counter: { current: Math.ceil(shown / 10), total: Math.ceil(notices.length / 10) },
              width: 'narrow',
              containerProps: css.raw({ _mobile: { pt: '6' } }),
            }
          : null
      }
    >
      <Stack gap="0" pt={{ base: '10', _mobile: '6' }}>
        <NoticesList notices={notices} shown={shown} platform={platform} />
      </Stack>
    </CustomerCenterLayout>
  );
}
