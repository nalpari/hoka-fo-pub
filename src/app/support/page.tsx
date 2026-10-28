'use client';

import { ContentHeader } from '@/components/common/molecules/ContentHeader/ContentHeader';
import { CustomerCenterLayout } from '@/components/common/layouts/CustomerCenterLayout/CustomerCenterLayout';
import { supportNavigation } from '@/components/features/support/support.navigation';
import { SupportContacts } from '@/components/features/support/SupportContacts';

/** 고객센터의 주요 문의와 안내 영역을 구성합니다. (Composes the main customer support and information sections.) */
export default function Page() {
  return (
    <CustomerCenterLayout
      header={
        <ContentHeader
          gap={{ base: '3', _mobile: '4' }}
          mb="10"
          title="고객센터"
          titleAs="h1"
          titleProps={{ web: 'heading6', mo: 'heading4' }}
          description="HOKA와 함께하는 모든 순간, 더 나은 경험을 위해 항상 도와드리겠습니다."
          descriptionProps={{ variant: 'body3', web: 'body2', mo: 'body3' }}
        />
      }
      activePath="/support"
      groups={supportNavigation}
      breadcrumbItems={[{ label: 'Home', href: '/' }, { label: '고객센터' }]}
    >
      <SupportContacts />
    </CustomerCenterLayout>
  );
}
