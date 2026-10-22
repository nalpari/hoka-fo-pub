import { ContentSection } from '@/shared/components/layouts/ContentSection/ContentSection';
import {
  ContentHeader,
  type ContentHeaderProps,
} from '@/shared/components/molecules/ContentHeader/ContentHeader';
import type { ReactNode } from 'react';
import { SidebarColumns } from '@/shared/components/layouts/SidebarColumns/SidebarColumns';
import { PageFrame } from '@/shared/components/layouts/PageFrame/PageFrame';
import type { BreadcrumbItem } from '@/shared/components/molecules/Breadcrumb/Breadcrumb';
import {
  SideNavigation,
  type SideNavigationGroup,
} from '@/shared/components/organisms/Navigation/SideNavigation/SideNavigation';

type LayoutProps = {
  activePath: string;
  breadcrumbItems: BreadcrumbItem[];
  children: ReactNode;
  footer?: ReactNode;
  groups: SideNavigationGroup[];
};

type Props = LayoutProps &
  (
    | {
        title: string;
        description?: ReactNode;
        descriptionProps?: ContentHeaderProps['descriptionProps'];
        mobileTitleVariant?: 'heading4' | 'heading5' | 'heading6' | 'heading7';
        header?: never;
      }
    | {
        header: Exclude<ReactNode, undefined>;
        title?: never;
        description?: never;
        descriptionProps?: never;
      }
  );

export function CustomerCenterLayout(props: Props) {
  const { activePath, breadcrumbItems, children, footer, groups } = props;
  const header =
    props.header !== undefined ? (
      props.header
    ) : (
      <ContentHeader
        title={props.title}
        titleAs="h1"
        titleProps={{ web: 'heading6', mo: props.mobileTitleVariant ?? 'heading6' }}
        description={props.description}
        descriptionProps={{ variant: 'body3', ...props.descriptionProps }}
      />
    );

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
        <ContentSection minW="0" gap="0" footer={footer} header={header}>
          {children}
        </ContentSection>
      </SidebarColumns>
    </PageFrame>
  );
}
