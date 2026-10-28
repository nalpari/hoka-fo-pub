'use client';

import { CustomerCenterLayout } from '@/components/common/layouts/CustomerCenterLayout/CustomerCenterLayout';
import { SupportTabs } from '@/components/common/molecules/SupportTabs/SupportTabs';
import { Stack } from 'styled-system/jsx';
import { apparelCareSections, shoeCareSections } from '@/components/care-guide/care.data';
import { CareInstructions } from '@/components/care-guide/CareInstructions';
import { supportNavigation } from '@/components/support/support.navigation';

const tabs = [
  { value: 'shoes', label: '신발', content: <CareInstructions sections={shoeCareSections} /> },
  {
    value: 'apparel',
    label: '의류/용품',
    content: <CareInstructions sections={apparelCareSections} />,
  },
] as const;

/** 해당 경로의 화면과 상호작용을 구성합니다. (Composes the route screen and its interactions.) */
export default function Page() {
  return (
    <CustomerCenterLayout
      title="세탁 및 손질 방법 안내"
      mobileTitleVariant="heading5"
      activePath="/support/care"
      breadcrumbItems={[
        { label: 'Home', href: '/' },
        { label: '고객센터', href: '/support' },
        { label: '세탁 및 손질 방법 안내' },
      ]}
      groups={supportNavigation}
    >
      <Stack mt="6">
        <SupportTabs ariaLabel="세탁 및 손질 방법" defaultValue="shoes" tabs={tabs} />
      </Stack>
    </CustomerCenterLayout>
  );
}
