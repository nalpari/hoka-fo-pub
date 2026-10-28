'use client';

import { Stack } from 'styled-system/jsx';

import { Divider } from '@/components/common/atoms/Divider';
import { Typography } from '@/components/common/atoms/Typography';

import { CustomerCenterLayout } from '@/components/common/layouts/CustomerCenterLayout';

import { supportNavigation } from '@/app/support/support.navigation';

/** 통합 마일리지 안내 화면을 구성합니다. (Composes the customer benefit information screen.) */
export default function Page() {
  const path = '/support/mileage';
  const title = '통합 마일리지 안내';

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
