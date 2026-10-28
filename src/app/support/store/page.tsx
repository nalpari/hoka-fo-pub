'use client';

import { Stack } from 'styled-system/jsx';
import { CustomerCenterLayout } from '@/components/common/layouts/CustomerCenterLayout/CustomerCenterLayout';
import { SupportTabs } from '@/components/common/molecules/SupportTabs/SupportTabs';
import { StoreResults } from '@/components/common/organisms/StoreFinder/StoreResults';
import { storeCities, storesByCity } from '@/components/features/store-finder/store.data';
import { supportNavigation } from '@/components/features/support/support.navigation';

const tabs = storeCities.map((city) => ({
  value: city,
  label: city,
  content: <StoreResults stores={storesByCity[city]} />,
}));

/** 매장 검색 조건과 검색 결과를 관리합니다. (Manages store search filters and results.) */
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
        <SupportTabs ariaLabel="매장 지역" defaultValue="서울" tabs={tabs} />
      </Stack>
    </CustomerCenterLayout>
  );
}
