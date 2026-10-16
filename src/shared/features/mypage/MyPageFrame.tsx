import type { ReactNode } from 'react';
import { Box, Grid } from 'styled-system/jsx';
import type { BreadcrumbItem } from '@/shared/components/molecules/Breadcrumb/Breadcrumb';
import { MyPageBreadcrumbs } from './MyPageBreadcrumbs';
import { SideNavigation } from '@/shared/components/organisms/Navigation/SideNavigation/SideNavigation';
import { myPageNavigation } from './mypage.data';

type MyPageFrameProps = {
  activePath: string;
  breadcrumbs: BreadcrumbItem[];
  children: ReactNode;
};

export function MyPageFrame({ activePath, breadcrumbs, children }: MyPageFrameProps) {
  return (
    <Grid
      as="main"
      gridTemplateColumns="180px minmax(0, 1fr)"
      gap="50px"
      maxW="var(--layout-content-max-width)"
      mx="auto"
      py="70px"
      pb="120px"
      _mobile={{ display: 'block', py: '0', pb: '0' }}
    >
      <SideNavigation
        activePath={activePath}
        groups={myPageNavigation}
        mobileNavigation="hidden"
        title="MY HOKA"
        titleTo="/mypage"
      />
      <Box minW="0">
        <MyPageBreadcrumbs breadcrumbs={breadcrumbs} />
        {children}
      </Box>
    </Grid>
  );
}
