'use client';

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
      <Stack gap="0" pt={{ base: '10', _mobile: '6' }}>
        <NoticesList notices={notices} shown={shown} platform={platform} />
      </Stack>
    </CustomerCenterLayout>
  );
}
