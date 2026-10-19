'use client';

import { Stack } from 'styled-system/jsx';
import { CustomerCenterLayout } from '@/shared/components/layouts/CustomerCenterLayout/CustomerCenterLayout';
import { SupportPageHeading } from '@/shared/components/molecules/SupportPageHeading/SupportPageHeading';
import { SupportTabs } from '@/shared/components/molecules/SupportTabs/SupportTabs';
import { StoreResults } from '@/shared/Mockup/store-finder/StoreResults';
import { storeCities, storesByCity } from '@/shared/Mockup/store-finder/store.data';
import { supportNavigation } from '@/shared/features/support/support.navigation';

const tabs = storeCities.map((city) => ({
  value: city,
  label: city,
  content: <StoreResults stores={storesByCity[city]} />,
}));

export function StoreFinderPage() {
  return (
    <CustomerCenterLayout
      activePath="/support/store"
      breadcrumbItems={[
        { label: 'Home', href: '/' },
        { label: '고객센터', href: '/support' },
        { label: '매장찾기' },
      ]}
      groups={supportNavigation}
      hideIntroMobile
    >
      <Stack gap="6">
        <SupportPageHeading title="매장찾기" />
        <SupportTabs ariaLabel="매장 지역" defaultValue="서울" tabs={tabs} />
      </Stack>
    </CustomerCenterLayout>
  );
}
