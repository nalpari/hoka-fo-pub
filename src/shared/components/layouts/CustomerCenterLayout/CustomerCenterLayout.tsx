import type { ReactNode } from 'react';
import { Box, Grid, Stack } from 'styled-system/jsx';
import { Typography } from '@/shared/components/atoms/Typography/Typography';
import {
  Breadcrumb,
  type BreadcrumbItem,
} from '@/shared/components/molecules/Breadcrumb/Breadcrumb';
import {
  SideNavigation,
  type SideNavigationGroup,
} from '@/shared/components/organisms/Navigation/SideNavigation/SideNavigation';

type Props = {
  activePath: string;
  breadcrumbItems: BreadcrumbItem[];
  children: ReactNode;
  groups: SideNavigationGroup[];
  hideIntro?: boolean;
  hideIntroMobile?: boolean;
};

export function CustomerCenterLayout({
  activePath,
  breadcrumbItems,
  children,
  groups,
  hideIntro = false,
  hideIntroMobile = false,
}: Props) {
  return (
    <Box as="main" maxW="1532px" mx="auto" pb="24" _mobile={{ px: '4', pb: '10' }}>
      <Box h="14" pt="6">
        <Breadcrumb items={breadcrumbItems} />
      </Box>
      <Box w="1200px" maxW="100%" mx="auto" px="34px" _mobile={{ px: '0' }}>
        <Stack
          mt={{ base: '14', _mobile: '6' }}
          mb="10"
          gap={{ base: '6', _mobile: '4' }}
          display={
            hideIntro ? 'none' : hideIntroMobile ? { base: 'flex', _mobile: 'none' } : 'flex'
          }
        >
          <Typography as="h1" web="heading6" mo="heading4">
            고객센터
          </Typography>
          <Typography as="p" variant="body3">
            HOKA와 함께하는 모든 순간,
            <Box as="br" display={{ base: 'none', _mobile: 'block' }} /> 더 나은 경험을 위해 항상
            도와드리겠습니다.
          </Typography>
        </Stack>

        <Grid
          gridTemplateColumns="240px minmax(0, 1fr)"
          gap="3.5"
          mt={hideIntro || hideIntroMobile ? { base: '0', _mobile: '6' } : '0'}
          _mobile={{ display: 'block' }}
        >
          <SideNavigation
            activePath={activePath}
            appearance="support"
            groups={groups}
            mobileNavigation="hidden"
            title="Help Center"
            titleTo="/support"
          />
          <Box minW="0">{children}</Box>
        </Grid>
      </Box>
    </Box>
  );
}
