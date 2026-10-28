'use client';

import { CustomerCenterLayout } from '@/components/common/layouts/CustomerCenterLayout/CustomerCenterLayout';
import { SupportTabs } from '@/components/common/molecules/SupportTabs/SupportTabs';
import { Stack } from 'styled-system/jsx';
import { supportNavigation } from '@/components/features/support/support.navigation';
import { ShippingGuidePanel } from '@/components/features/support/ShippingGuidePanel';
import { ReturnCautionsPanel } from '@/components/features/support/ReturnCautionsPanel';
import { ProductReturnsPanel } from '@/components/features/support/ProductReturnsPanel';

const tabs = [
  { value: 'shipping', label: '배송 안내', content: <ShippingGuidePanel /> },
  { value: 'return-cautions', label: '반품 주의사항', content: <ReturnCautionsPanel /> },
  { value: 'product-returns', label: '상품 반품 안내', content: <ProductReturnsPanel /> },
] as const;

/** 해당 경로의 화면과 상호작용을 구성합니다. (Composes the route screen and its interactions.) */
export default function Page() {
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
      <Stack mt="6">
        <SupportTabs ariaLabel="배송 및 반품 안내 항목" defaultValue="shipping" tabs={tabs} />
      </Stack>
    </CustomerCenterLayout>
  );
}
