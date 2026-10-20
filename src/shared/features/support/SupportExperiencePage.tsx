'use client';

import { Typography } from '@/shared/components/atoms/Typography/Typography';
import { useState } from 'react';
import { css } from 'styled-system/css';
import { SupportTabs } from '@/shared/components/molecules/SupportTabs/SupportTabs';
import { Disclosure } from '@/shared/components/molecules/Disclosure/Disclosure';
import { PageHeader } from '@/shared/components/molecules/PageHeader/PageHeader';
import { SidebarNavigationLayout } from '@/shared/components/layouts/SidebarNavigationLayout/SidebarNavigationLayout';
import { CustomerCenterLayout } from '@/shared/components/layouts/CustomerCenterLayout/CustomerCenterLayout';
import { supportNavigation } from '@/shared/features/support/support.navigation';
import { Box } from 'styled-system/jsx';
import { SupportMileageContent } from './SupportMileageContent';

export type SupportExperienceKind = 'member-benefits' | 'mileage';

function SupportFrame({ activePath, children }: { activePath: string; children: React.ReactNode }) {
  if (activePath === '/support/member-benefits') {
    return (
      <CustomerCenterLayout
        title="온라인 회원 등급 안내"
        mobileTitleVariant="heading5"
        showHeadingDivider
        headingProps={{ mb: '0' }}
        activePath={activePath}
        breadcrumbItems={[
          { label: 'Home', href: '/' },
          { label: '고객센터', href: '/support' },
          { label: '온라인 회원 등급 안내' },
        ]}
        groups={supportNavigation}
      >
        <section>{children}</section>
      </CustomerCenterLayout>
    );
  }

  return (
    <SidebarNavigationLayout
      activePath={activePath}
      groups={supportNavigation}
      title="SUPPORT"
      titleTo="/support"
    >
      <Box as="section" maxW="760px" css={{ '& h2': { fontSize: '20' } }}>
        {children}
      </Box>
    </SidebarNavigationLayout>
  );
}

function SupportNotice({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <Disclosure title="유의 사항" open={open} onOpenChange={setOpen}>
      {children}
    </Disclosure>
  );
}

function PolicyPage({ kind }: { kind: 'member-benefits' | 'mileage' }) {
  const [active, setActive] = useState(kind === 'mileage' ? '마일리지 적립/사용' : '공통 혜택');
  const mileageTabs = ['마일리지 적립/사용', '온라인 통합 마일리지', '마일리지 소멸', '기타 안내'];

  return (
    <SupportFrame activePath={kind === 'mileage' ? '/support/mileage' : '/support/member-benefits'}>
      {kind === 'mileage' && <PageHeader title="통합 마일리지 안내" />}
      {kind === 'mileage' ? (
        <SupportTabs
          ariaLabel="마일리지 정책"
          variant="scrollable"
          defaultValue="마일리지 적립/사용"
          value={active}
          onValueChange={setActive}
          tabs={mileageTabs.map((item) => ({
            value: item,
            label: item,
            content: <SupportMileageContent title={item} />,
          }))}
        />
      ) : (
        <>
          <Typography as="h2" className={css({ mt: '30px' })}>
            디자인 작업중
          </Typography>
        </>
      )}
      <SupportNotice>
        <Typography as="p">
          등급은 최근 구매 실적을 기준으로 산정되며, 쿠폰·마일리지 정책은 운영 상황에 따라 변경될 수
          있습니다.
        </Typography>
      </SupportNotice>
    </SupportFrame>
  );
}

export function SupportExperiencePage({ kind }: { kind: SupportExperienceKind }) {
  return <PolicyPage kind={kind} />;
}
