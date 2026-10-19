import { Stack } from 'styled-system/jsx';
import { Typography } from '@/shared/components/atoms/Typography/Typography';
import { CustomerCenterLayout } from '@/shared/components/layouts/CustomerCenterLayout/CustomerCenterLayout';
import { supportNavigation } from '@/shared/features/support/support.navigation';

export type SupportExperienceKind = 'member-benefits' | 'mileage';

const pageDetails: Record<SupportExperienceKind, { path: string; title: string }> = {
  'member-benefits': { path: '/support/member-benefits', title: '온라인 회원등급 안내' },
  mileage: { path: '/support/mileage', title: '통합 마일리지 안내' },
};

export function SupportExperiencePage({ kind }: { kind: SupportExperienceKind }) {
  const { path, title } = pageDetails[kind];

  return (
    <CustomerCenterLayout
      title={title}
      mobileTitleVariant="heading5"
      showHeadingDivider
      activePath={path}
      breadcrumbItems={[
        { label: 'Home', href: '/' },
        { label: '고객센터', href: '/support' },
        { label: title },
      ]}
      groups={supportNavigation}
    >
      <Stack as="section">
        <Typography as="p" web="body3" mo="body4" tone="subtle">
          디자인 작업 중입니다.
        </Typography>
      </Stack>
    </CustomerCenterLayout>
  );
}
