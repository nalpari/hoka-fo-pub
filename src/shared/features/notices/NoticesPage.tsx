'use client';

import { Divider } from '@/shared/components/atoms/Divider/Divider';

import { useState } from 'react';
import { Stack } from 'styled-system/jsx';
import { PageActionButton } from '@/shared/components/molecules/PageActionButton/PageActionButton';
import { CustomerCenterLayout } from '@/shared/components/layouts/CustomerCenterLayout/CustomerCenterLayout';
import { supportNavigation } from '@/shared/features/support/support.navigation';
import { usePlatform } from '@/shared/context/platform';
import { NoticesList } from './NoticesList';
import { notices } from './notices.data';

export function NoticesPage() {
  const platform = usePlatform();
  const [openIndex, setOpenIndex] = useState<number | null>(platform === 'web' ? 0 : null);
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
      footer={
        shown < notices.length ? (
          <PageActionButton
            onClick={() => setShown((count) => count + 10)}
            counter={{ current: Math.ceil(shown / 10), total: Math.ceil(notices.length / 10) }}
            width="narrow"
            containerProps={{ _mobile: { pt: '6' } }}
          >
            더보기
          </PageActionButton>
        ) : null
      }
    >
      <Stack gap="0" mt={{ base: '9', _mobile: '6' }}>
        <Divider variant="heading" _mobile={{ display: 'none' }} />
        <Stack as="section" aria-label="공지사항 목록" gap="0">
          <NoticesList
            notices={notices}
            shown={shown}
            openIndex={openIndex}
            onOpenIndexChange={setOpenIndex}
            platform={platform}
          />
        </Stack>
      </Stack>
    </CustomerCenterLayout>
  );
}
