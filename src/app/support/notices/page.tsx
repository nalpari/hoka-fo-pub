'use client';

/**
 * [개발팀 바인딩]
 * SupportContentContext.notices에 안정적인 id/title/date/body와 서버 목록 상태를 전달합니다.
 * 상세 링크는 배열 순번이 아닌 id입니다. 더보기는 다음 응답을 누적한 뒤 resolve하고 실패하면 reject합니다.
 */

import Link from 'next/link';

import { useContext } from 'react';
import { useState } from 'react';
import { usePlatform } from '@/context/platform';
import { SupportContentContext } from '@/context/SupportContentContext';
import { useBindingQuery } from '@/hooks/useBindingQuery';
import { useRequestAction } from '@/hooks/useRequestAction';

import { css } from 'styled-system/css';
import { HStack, Stack } from 'styled-system/jsx';

import { Typography } from '@/components/common/atoms/Typography';

import { BindingFeedback } from '@/components/common/molecules/BindingFeedback';

import { notices } from '@/app/support/notices/notices.data';
import { supportNavigation } from '@/app/support/support.navigation';
import { CustomerCenterLayout } from '@/components/support/CustomerCenterLayout';

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

/** 공지 목록과 화면별 상세 탐색을 구성합니다. (Composes notices and platform-specific detail navigation.) */
export default function Page() {
  const { notices: binding } = useContext(SupportContentContext);
  const request = useRequestAction();
  useBindingQuery(binding?.onQueryChange, {});
  const items = binding ? [...binding.items] : notices;
  const total = binding?.totalCount ?? notices.length;
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
        (binding ? binding.hasMore : shown < notices.length)
          ? {
              kind: 'loadMore',
              label: '더보기',
              onClick: () => {
                if (binding) void request.run(binding.onLoadMore);
                else setShown((count) => count + 10);
              },
              counter: binding
                ? (binding.pageInfo ?? { current: items.length, total })
                : { current: Math.ceil(shown / 10), total: Math.ceil(total / 10) },
              width: 'narrow',
              containerProps: css.raw({ _mobile: { pt: '6' } }),
            }
          : null
      }
    >
      <Stack gap="0" pt={{ base: '10', _mobile: '6' }}>
        <BindingFeedback
          {...binding}
          pending={binding?.pending || request.pending}
          error={binding?.error || request.error}
        />
        <NoticesList notices={items} shown={binding ? items.length : shown} platform={platform} />
      </Stack>
    </CustomerCenterLayout>
  );
}
