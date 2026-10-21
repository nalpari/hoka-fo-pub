import { css } from 'styled-system/css';
import { CustomerCenterLayout } from '@/shared/components/layouts/CustomerCenterLayout/CustomerCenterLayout';
import { supportNavigation } from '@/shared/features/support/support.navigation';
import { SupportContacts } from './SupportContacts';

export function SupportPage() {
  return (
    <CustomerCenterLayout
      title="고객센터"
      description="HOKA와 함께하는 모든 순간, 더 나은 경험을 위해 항상 도와드리겠습니다."
      mobileTitleVariant="heading4"
      descriptionProps={{ web: 'body2', mo: 'body3' }}
      headingProps={css.raw({ mb: '10', gap: { base: '3', _mobile: '4' } })}
      activePath="/support"
      groups={supportNavigation}
      breadcrumbItems={[{ label: 'Home', href: '/' }, { label: '고객센터' }]}
    >
      <SupportContacts />
    </CustomerCenterLayout>
  );
}
