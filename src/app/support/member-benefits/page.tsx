import { Box } from 'styled-system/jsx';

import { supportNavigation } from '@/app/support/support.navigation';
import { CustomerCenterLayout } from '@/components/support/CustomerCenterLayout';

import { MemberBenefitsContent } from './_components/MemberBenefitsContent';

/** 온라인 회원등급 조건과 공통 혜택을 안내합니다. (Displays online membership tiers and shared benefits.) */
export default function Page() {
  const title = '온라인 회원등급 안내';

  return (
    <CustomerCenterLayout
      title={title}
      mobileTitleVariant="h7"
      activePath="/support/member-benefits"
      breadcrumbItems={[
        { label: 'Home', href: '/' },
        { label: '고객센터', href: '/support' },
        { label: title },
      ]}
      groups={supportNavigation}
    >
      <Box mt="48px" _mobile={{ mt: '32px', pb: '24px' }}>
        <MemberBenefitsContent />
      </Box>
    </CustomerCenterLayout>
  );
}
