'use client';

/**
 * [개발팀 바인딩]
 * SupportContentContext.notice.onQueryChange({ id })에 경로의 실제 공지 ID가 전달됩니다.
 * item.body는 BO 본문 렌더링 결과입니다. pending/error와 실제 item: null을 구분하며 없는 ID를 첫 공지로 대체하지 않습니다.
 */

import { useParams } from 'next/navigation';

import { useContext } from 'react';
import { SupportContentContext } from '@/context/SupportContentContext';
import { useBindingQuery } from '@/hooks/useBindingQuery';

import { css } from 'styled-system/css';
import { Box, Stack } from 'styled-system/jsx';

import { Typography } from '@/components/common/atoms/Typography';

import { BindingFeedback } from '@/components/common/molecules/BindingFeedback';

import { SystemStatusPage } from '@/components/common/organisms/SystemStatusPage';

import { notices } from '@/app/support/notices/notices.data';
import { supportNavigation } from '@/app/support/support.navigation';
import { CustomerCenterLayout } from '@/components/support/CustomerCenterLayout';

/** 경로에 해당하는 공지 상세 내용을 표시합니다. (Displays notice details for the current route.) */
export default function Page() {
  const { id } = useParams<{ id?: string }>();
  const { notice: binding } = useContext(SupportContentContext);
  useBindingQuery(binding?.onQueryChange, { id: id ?? '' });
  const noticeIndex = Number(id ?? 1) - 1;
  const notice = binding ? binding.item : notices[noticeIndex];
  if (binding?.pending || binding?.error) return <BindingFeedback {...binding} />;
  if (!notice) return <SystemStatusPage status="not-found" />;

  return (
    <CustomerCenterLayout
      title="공지사항"
      activePath="/support/notices"
      breadcrumbItems={[
        { label: 'Home', href: '/' },
        { label: '고객센터', href: '/support' },
        { label: '공지사항', href: '/support/notices' },
        { label: '상세' },
      ]}
      groups={supportNavigation}
      footerAction={{
        kind: 'link',
        label: '목록보기',
        href: '/support/notices',
        size: 'tall',
        width: 'compact',
        containerProps: css.raw({ pt: '6' }),
      }}
    >
      <Box
        mt="10"
        borderTop="2px solid"
        borderBottom="1px solid"
        borderColor="black.20"
        borderTopColor="black.100"
        py="6"
        _mobile={{ py: '4', borderTopWidth: '1px' }}
      >
        <Stack gap="2">
          <Typography as="h2" web="body1" mo="body3" weight="medium">
            {notice.title}
          </Typography>
          <Typography as="time" variant="body4" dateTime={notice.date} tone="tertiary">
            {notice.date}
          </Typography>
        </Stack>
      </Box>
      <Stack gap="4" px="2" py="6" borderBottom="1px solid" borderColor="black.20">
        {binding ? (
          binding.item?.body
        ) : notice === notices[0] ? (
          <>
            <Typography as="p" variant="body4">
              안녕하세요, HOKA 코리아입니다.
            </Typography>
            <Typography as="p" variant="body4">
              네이버페이 9월 프로모션을 안내드립니다.
            </Typography>
            <Typography as="p" variant="body4">
              1. 이벤트 진행기간: 9월 1일 00:00 ~ 9월 14일 09:59
            </Typography>
            <Typography as="p" variant="body4">
              2. 네이버페이로 10만원 이상 결제 시 7천원 즉시할인
            </Typography>
            <Typography as="p" variant="body4">
              3. 대상 상품: 호카 공식 홈페이지 내 전 상품
            </Typography>
            <Typography as="p" variant="body4">
              이용해 주셔서 감사합니다.
            </Typography>
          </>
        ) : (
          <Typography as="p" variant="body4">
            {notice.title} 상세 안내입니다.
          </Typography>
        )}
      </Stack>
    </CustomerCenterLayout>
  );
}
