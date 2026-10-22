'use client';

import { CustomerCenterLayout } from '@/shared/components/layouts/CustomerCenterLayout/CustomerCenterLayout';
import { SupportTabs } from '@/shared/components/molecules/SupportTabs/SupportTabs';
import { Stack } from 'styled-system/jsx';
import { apparelCareSections, shoeCareSections } from './care.data';
import { CareInstructions } from './CareInstructions';
import { supportNavigation } from '@/shared/features/support/support.navigation';

const tabs = [
  { value: 'shoes', label: '신발', content: <CareInstructions sections={shoeCareSections} /> },
  {
    value: 'apparel',
    label: '의류/용품',
    content: <CareInstructions sections={apparelCareSections} />,
  },
] as const;

export function CareGuidePage() {
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
