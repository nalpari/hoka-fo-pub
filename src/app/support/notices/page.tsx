'use client';

import { useState } from 'react';
import { Stack } from 'styled-system/jsx';
import { PageActionButton } from '@/components/common/molecules/PageActionButton/PageActionButton';
import { CustomerCenterLayout } from '@/components/common/layouts/CustomerCenterLayout/CustomerCenterLayout';
import { supportNavigation } from '@/components/features/support/support.navigation';
import { usePlatform } from '@/context/platform';
import { NoticesList } from '@/components/features/notices/NoticesList';
import { notices } from '@/components/features/notices/notices.data';

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
