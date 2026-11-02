'use client';

import { Stack } from 'styled-system/jsx';

import { supportNavigation } from '@/app/support/support.navigation';
import { CustomerCenterLayout } from '@/components/support/CustomerCenterLayout';

import { StoreResults } from './_components/StoreContent';
import { stores } from './store.data';

/** 매장의 주소와 연락처 목록을 표시합니다. (Displays store addresses and contact details.) */
export default function Page() {
  return (
    <CustomerCenterLayout
      title="매장 찾기"
      mobileTitleVariant="heading5"
      activePath="/support/store"
      breadcrumbItems={[
        { label: 'Home', href: '/' },
        { label: '고객센터', href: '/support' },
        { label: '매장찾기' },
      ]}
      groups={supportNavigation}
    >
      <Stack gap="6" mt="6">
        <StoreResults stores={stores} />
      </Stack>
    </CustomerCenterLayout>
  );
}
