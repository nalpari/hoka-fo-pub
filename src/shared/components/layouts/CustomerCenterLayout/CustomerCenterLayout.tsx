import { ContentSection } from '@/shared/components/layouts/ContentSection/ContentSection';
import { ContentHeader } from '@/shared/components/molecules/ContentHeader/ContentHeader';
import type { ComponentProps, ReactNode } from 'react';
import { Box, Divider, Stack } from 'styled-system/jsx';
import { SidebarColumns } from '@/shared/components/layouts/SidebarColumns/SidebarColumns';

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
  footer?: ReactNode;
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
  footer,
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
        <SidebarColumns
          sidebarWidth="190px"
          gap="98px"
          pt={{ base: '14', _mobile: '6' }}
          sidebar={
            <SideNavigation
              activePath={activePath}
              appearance="support"
              groups={groups}
              mobileNavigation="hidden"
              title="고객센터"
              titleTo="/support"
            />
          }
        >
          <ContentSection
            minW="0"
            gap="0"
            footer={footer}
            header={
              <Stack gap="4" mb="6" {...headingProps}>
                <ContentHeader
                  gap={headingProps?.gap ?? '4'}
                  _mobile={{ gap: headingProps?._mobile?.gap }}
                  title={title}
                  titleAs="h1"
                  titleProps={{ web: 'heading6', mo: mobileTitleVariant }}
                  description={description}
                  descriptionProps={{ variant: 'body3' }}
                />
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
            }
          >
            {children}
          </ContentSection>
        </SidebarColumns>
      </Box>
    </Box>
  );
}
