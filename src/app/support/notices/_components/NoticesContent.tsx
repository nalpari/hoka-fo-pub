'use client';
import { useState } from 'react';

import { css } from 'styled-system/css';
import { Stack, VStack } from 'styled-system/jsx';

import { Button } from '@/components/common/atoms/Button';

import { notices } from '@/app/support/notices/notices.data';
import { supportNavigation } from '@/app/support/support.navigation';
import { CustomerCenterLayout } from '@/components/support/CustomerCenterLayout';

import { NoticesList } from './NoticesList';
/** 공지 목록과 화면별 상세 탐색을 구성합니다. (Composes notices and platform-specific detail navigation.) */
export function NoticesContent({ previewEmpty = false }: { previewEmpty?: boolean }) {
  const items = previewEmpty ? [] : notices;
  const pageSize = 10;
  const [shown, setShown] = useState(pageSize);
  const more =
    shown < items.length
      ? {
          counter: { current: shown / pageSize, total: Math.ceil(items.length / pageSize) },
          onLoadMore: () => setShown((count) => count + pageSize),
        }
      : undefined;
  return (
    <CustomerCenterLayout
      className={css({
        '--line-heights-body': '1.5',
        _mobile: { pb: '72px!', '& h1': { fontSize: 'heading.24' } },
      })}
      title="공지사항"
      mobileTitleVariant="h7B"
      activePath="/support/notices"
      breadcrumbItems={[
        { label: 'Home', href: '/' },
        { label: '고객센터', href: '/support' },
        { label: '공지사항' },
      ]}
      groups={supportNavigation}
      footer={
        more ? (
          <VStack mt="24px">
            <Button
              variant="plain"
              size="lg"
              onClick={more.onLoadMore}
              loadMore={{ counter: more.counter }}
            />
          </VStack>
        ) : null
      }
    >
      <Stack gap="0" pt={{ base: '10', _mobile: '8' }}>
        <NoticesList
          notices={items}
          shown={shown}
          pending={false}
          error={Boolean(undefined)}
        />
      </Stack>
    </CustomerCenterLayout>
  );
}
