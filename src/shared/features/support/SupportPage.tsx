import { css } from 'styled-system/css';
import { Box, Stack } from 'styled-system/jsx';
import { CustomerCenterLayout } from '@/shared/components/layouts/CustomerCenterLayout/CustomerCenterLayout';
import { supportNavigation } from '@/shared/features/support/support.navigation';
import { SupportContacts } from './SupportContacts';
import { SupportHours } from './SupportHours';
import { SupportNotices } from './SupportNotices';
import { SupportFaq } from './SupportFaq';

export function SupportPage() {
  return (
    <CustomerCenterLayout
      title="고객센터"
      description={
        <>
          HOKA와 함께하는 모든 순간,
          <Box as="br" display={{ base: 'none', _mobile: 'block' }} /> 더 나은 경험을 위해 항상
          도와드리겠습니다.
        </>
      }
      mobileTitleVariant="heading4"
      headingProps={css.raw({ mb: '10', gap: { base: '6', _mobile: '4' } })}
      activePath="/support"
      groups={supportNavigation}
      breadcrumbItems={[{ label: 'Home', href: '/' }, { label: '고객센터' }]}
    >
      <Stack gap={{ base: '20', _mobile: '10' }}>
        <Stack gap="2">
          <SupportContacts />
          <SupportHours />
        </Stack>

        <SupportNotices />

        <SupportFaq />
      </Stack>
    </CustomerCenterLayout>
  );
}
