import type { ComponentProps, ReactNode } from 'react';
import { Box, Divider, Grid, Stack } from 'styled-system/jsx';
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
  title: string;
  description?: ReactNode;
  showHeadingDivider?: boolean;
  mobileTitleVariant?: 'heading4' | 'heading5' | 'heading7';
  headingProps?: Pick<ComponentProps<typeof Stack>, 'gap' | 'mb' | '_mobile'>;
};

export function CustomerCenterLayout({
  activePath,
  breadcrumbItems,
  children,
  groups,
  title,
  description,
  showHeadingDivider = false,
  mobileTitleVariant = 'heading7',
  headingProps,
}: Props) {
  return (
    <Box as="main" maxW="1532px" mx="auto" pb="24" _mobile={{ px: '4', pb: '10' }}>
      <Box h="14" pt="6" pb="2">
        <Breadcrumb items={breadcrumbItems} />
      </Box>
      <Box w="1200px" maxW="100%" mx="auto" px="34px" _mobile={{ px: '0' }}>
        <Grid
          gridTemplateColumns="190px minmax(0, 1fr)"
          gap="98px"
          pt={{ base: '14', _mobile: '6' }}
          _mobile={{ display: 'block' }}
        >
          <SideNavigation
            activePath={activePath}
            appearance="support"
            groups={groups}
            mobileNavigation="hidden"
            title="고객센터"
            titleTo="/support"
          />
          <Box minW="0">
            <Stack gap="4" mb="6" {...headingProps}>
              <Typography as="h1" web="heading6" mo={mobileTitleVariant}>
                {title}
              </Typography>
              {description && (
                <Typography as="p" variant="body3">
                  {description}
                </Typography>
              )}
              {showHeadingDivider && (
                <Divider
                  aria-hidden="true"
                  orientation="horizontal"
                  h="2px"
                  mt="2"
                  bg="black.100"
                  display={{ base: 'block', _mobile: 'none' }}
                />
              )}
            </Stack>
            {children}
          </Box>
        </Grid>
      </Box>
    </Box>
  );
}
