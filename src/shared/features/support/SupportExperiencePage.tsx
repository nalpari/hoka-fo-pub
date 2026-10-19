'use client';

import { Typography } from '@/shared/components/atoms/Typography/Typography';
import { useState } from 'react';
import { css } from 'styled-system/css';
import { Button } from '@/shared/components/atoms/Button/Button';
import { Disclosure } from '@/shared/components/molecules/Disclosure/Disclosure';
import { PageHeader } from '@/shared/components/molecules/PageHeader/PageHeader';
import { SidebarNavigationLayout } from '@/shared/components/layouts/SidebarNavigationLayout/SidebarNavigationLayout';
import { CustomerCenterLayout } from '@/shared/components/layouts/CustomerCenterLayout/CustomerCenterLayout';
import { supportNavigation } from '@/shared/features/support/support.navigation';
import { Box, Flex } from 'styled-system/jsx';

export type SupportExperienceKind = 'member-benefits' | 'mileage';

const activeTab = css({
  borderBottomColor: 'var(--color-black-100) !important',
  fontWeight: 'var(--font-weights-extrabold)',
});

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
        <>
          <Flex
            as="nav"
            overflowX="auto"
            borderBottom="1px solid var(--color-border-subtle)"
            css={{
              '& button': {
                flex: '0 0 auto',
                minH: '11',
                border: '0',
                borderBottom: '2px solid transparent',
                bg: 'transparent',
                px: '3.5',
              },
            }}
          >
            {mileageTabs.map((item) => (
              <Button
                key={item}
                className={active === item ? activeTab : ''}
                onClick={() => setActive(item)}
              >
                {item}
              </Button>
            ))}
          </Flex>
          <Box as="article" py="7" minH="280px" lineHeight="var(--line-heights-body)">
            <Typography as="h2">{active}</Typography>
            <Typography as="p">
              온라인과 오프라인에서 적립 및 사용할 수 있는 통합 마일리지 정책을 안내합니다. 정책별
              적용 기준과 소멸 조건은 주문 시점에 따라 달라질 수 있습니다.
            </Typography>
          </Box>
        </>
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
