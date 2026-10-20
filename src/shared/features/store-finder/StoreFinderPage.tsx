'use client';

import { Stack } from 'styled-system/jsx';
import { CustomerCenterLayout } from '@/shared/components/layouts/CustomerCenterLayout/CustomerCenterLayout';
import { SupportTabs } from '@/shared/components/molecules/SupportTabs/SupportTabs';
import { StoreResults } from '@/shared/components/organisms/StoreFinder/StoreResults';
import { storeCities, storesByCity } from './store.data';
import { supportNavigation } from '@/shared/features/support/support.navigation';

const tabs = storeCities.map((city) => ({
  value: city,
  label: city,
  content: <StoreResults stores={storesByCity[city]} />,
}));

export function StoreFinderPage() {
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
      <Stack gap="6">
        <SupportTabs ariaLabel="매장 지역" defaultValue="서울" tabs={tabs} />
      </Stack>
    </CustomerCenterLayout>
  );
}
