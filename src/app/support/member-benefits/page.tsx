'use client';

import { Typography } from '@/components/common/atoms/Typography/Typography';
import { Divider } from '@/components/common/atoms/Divider/Divider';
import { CustomerCenterLayout } from '@/components/common/layouts/CustomerCenterLayout/CustomerCenterLayout';
import { supportNavigation } from '@/components/features/support/support.navigation';
import { Stack } from 'styled-system/jsx';

/** 온라인 회원등급 안내 화면을 구성합니다. (Composes the customer benefit information screen.) */
export default function Page() {
  const path = '/support/member-benefits';
  const title = '온라인 회원등급 안내';

  return (
    <CustomerCenterLayout
      title={title}
      mobileTitleVariant="heading5"
      activePath={path}
      breadcrumbItems={[
        { label: 'Home', href: '/' },
        { label: '고객센터', href: '/support' },
        { label: title },
      ]}
      groups={supportNavigation}
    >
      <Stack gap="6" mt="6">
        <Divider variant="heading" display={{ base: 'block', _mobile: 'none' }} />
        <Stack as="section">
          <Typography as="p" web="body3" mo="body4" tone="subtle">
            디자인 작업 중입니다.
          </Typography>
        </Stack>
      </Stack>
    </CustomerCenterLayout>
  );
}
