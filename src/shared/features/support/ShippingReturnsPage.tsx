'use client';

import { Stack } from 'styled-system/jsx';
import { CustomerCenterLayout } from '@/shared/components/layouts/CustomerCenterLayout/CustomerCenterLayout';
import { SupportTabs } from '@/shared/components/molecules/SupportTabs/SupportTabs';
import { supportNavigation } from '@/shared/features/support/support.navigation';
import { ShippingGuidePanel } from './ShippingGuidePanel';
import { ReturnCautionsPanel } from './ReturnCautionsPanel';
import { ProductReturnsPanel } from './ProductReturnsPanel';

const tabs = [
  { value: 'shipping', label: '배송 안내', content: <ShippingGuidePanel /> },
  { value: 'return-cautions', label: '반품 주의사항', content: <ReturnCautionsPanel /> },
  { value: 'product-returns', label: '상품 반품 안내', content: <ProductReturnsPanel /> },
] as const;

export function ShippingReturnsPage() {
  return (
    <CustomerCenterLayout
      title="배송 및 반품안내"
      mobileTitleVariant="heading5"
      activePath="/support/after-sales"
      breadcrumbItems={[
        { label: 'Home', href: '/' },
        { label: '고객센터', href: '/support' },
        { label: '배송 및 반품안내' },
      ]}
      groups={supportNavigation}
    >
      <Stack gap="6">
        <SupportTabs ariaLabel="배송 및 반품 안내 항목" defaultValue="shipping" tabs={tabs} />
      </Stack>
    </CustomerCenterLayout>
  );
}
