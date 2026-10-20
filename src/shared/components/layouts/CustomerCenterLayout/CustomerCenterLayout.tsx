import { Divider } from '@/shared/components/atoms/Divider/Divider';
import { ContentSection } from '@/shared/components/layouts/ContentSection/ContentSection';
import { ContentHeader } from '@/shared/components/molecules/ContentHeader/ContentHeader';
import type { ComponentProps, ReactNode } from 'react';
import { Stack } from 'styled-system/jsx';
import { SidebarColumns } from '@/shared/components/layouts/SidebarColumns/SidebarColumns';
import { PageFrame } from '@/shared/components/layouts/PageFrame/PageFrame';
import type { BreadcrumbItem } from '@/shared/components/molecules/Breadcrumb/Breadcrumb';
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
  mobileTitleVariant?: 'heading4' | 'heading5' | 'heading6' | 'heading7';
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
  mobileTitleVariant = 'heading6',
  headingProps,
}: Props) {
  return (
    <PageFrame breadcrumbItems={breadcrumbItems}>
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
            title="SUPPORT"
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
                <Divider variant="heading" mt="2" display={{ base: 'block', _mobile: 'none' }} />
              )}
            </Stack>
          }
        >
          {children}
        </ContentSection>
      </SidebarColumns>
    </PageFrame>
  );
}
