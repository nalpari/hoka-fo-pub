import { type ReactNode } from 'react';
import { Box } from 'styled-system/jsx';
import {
  Breadcrumb,
  type BreadcrumbItem,
} from '@/components/common/molecules/Breadcrumb/Breadcrumb';
import { ContentSection } from '@/components/common/layouts/ContentSection/ContentSection';
import {
  ContentHeader,
  type ContentHeaderProps,
} from '@/components/common/molecules/ContentHeader/ContentHeader';
import { SidebarColumns } from '@/components/common/layouts/SidebarColumns/SidebarColumns';
import {
  SideNavigation,
  type SideNavigationGroup,
} from '@/components/common/organisms/Navigation/SideNavigation/SideNavigation';

type PageFrameProps = {
  breadcrumbItems?: BreadcrumbItem[];
  children: ReactNode;
};

/** Shared page width, breadcrumb region, and responsive content gutters. */
function PageFrame({ breadcrumbItems, children }: PageFrameProps) {
  return (
    <Box
      as="main"
      w="min(calc(100% - var(--layout-web-content-inline-space)), 1532px)"
      mx="auto"
      pb="24"
      _mobile={{ w: '100%', px: '4', pb: '10' }}
    >
      {breadcrumbItems && breadcrumbItems.length > 0 ? (
        <Box h="14" pt="6" pb="2">
          <Breadcrumb items={breadcrumbItems} />
        </Box>
      ) : null}
      <Box w="1200px" maxW="100%" mx="auto" px="34px" _mobile={{ px: '0' }}>
        {children}
      </Box>
    </Box>
  );
}

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

/** 고객센터 탐색과 본문 프레임을 구성합니다 (Displays the customer center layout composition). */
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
