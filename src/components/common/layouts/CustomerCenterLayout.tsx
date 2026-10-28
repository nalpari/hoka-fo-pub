import { type ComponentProps, type ReactNode } from 'react';

import { Box } from 'styled-system/jsx';

import { Button, ButtonLink } from '@/components/common/atoms/Button/Button';
import { LoadMoreButton, LoadMoreButtonContent } from '@/components/common/atoms/LoadMoreButton';

import { type BreadcrumbItem } from '@/components/common/molecules/Breadcrumb';
import {
  ContentHeader,
  type ContentHeaderProps,
} from '@/components/common/molecules/ContentHeader';

import { ContentSection } from '@/components/common/layouts/ContentSection';
import {
  type SidebarNavigationGroup,
  SidebarNavigationLayout,
} from '@/components/common/layouts/SidebarNavigationLayout';

type LayoutProps = {
  activePath: string;
  breadcrumbItems: BreadcrumbItem[];
  children: ReactNode;
  groups: SidebarNavigationGroup[];
};

type FooterActionPresentation = {
  label: ReactNode;
  variant?: 'primary' | 'secondary';
  size?: 'short' | 'tall';
  width?: 'default' | 'compact' | 'narrow';
  containerProps?: Pick<ComponentProps<typeof Box>, 'mt' | 'pt' | 'pb' | '_mobile'>;
};

export type CustomerCenterFooterAction = FooterActionPresentation &
  (
    | { kind: 'link'; href: string; counter?: { current: number; total: number } }
    | { kind: 'loadMore'; onClick?: () => void; counter: { current: number; total: number } }
    | { kind: 'button'; onClick?: () => void }
  );

type Props = LayoutProps &
  (
    | { footer?: ReactNode; footerAction?: never }
    | { footer?: never; footerAction: CustomerCenterFooterAction | false | null | undefined }
  ) &
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

/** 고객센터 하단의 이동·더보기·일반 버튼을 배치합니다. (Arranges a customer-center link, load-more action, or regular button.) */
function CustomerCenterFooter({ action }: { action: CustomerCenterFooterAction }) {
  const {
    label,
    variant = 'secondary',
    size = 'short',
    width = 'default',
    containerProps,
  } = action;
  return (
    <Box
      pt="9"
      w="100%"
      maxW={width === 'compact' ? '180px' : width === 'narrow' ? '160px' : '500px'}
      mx="auto"
      {...containerProps}
      _mobile={{ maxW: width === 'default' ? '500px' : 'none', ...containerProps?._mobile }}
    >
      {action.kind === 'link' ? (
        <ButtonLink href={action.href} variant={variant} size={size} fullWidth>
          {action.counter ? (
            <LoadMoreButtonContent counter={action.counter} label={label} />
          ) : (
            label
          )}
        </ButtonLink>
      ) : action.kind === 'loadMore' ? (
        <LoadMoreButton
          counter={action.counter}
          label={label}
          variant={variant}
          size={size}
          fullWidth
          onClick={action.onClick}
        />
      ) : (
        <Button variant={variant} size={size} fullWidth onClick={action.onClick}>
          {label}
        </Button>
      )}
    </Box>
  );
}

/** 고객센터 탐색과 본문 프레임을 구성합니다 (Displays the customer center layout composition). */
export function CustomerCenterLayout(props: Props) {
  const { activePath, breadcrumbItems, children, footer, footerAction, groups } = props;
  const resolvedFooter = footerAction ? <CustomerCenterFooter action={footerAction} /> : footer;
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
    <SidebarNavigationLayout
      activePath={activePath}
      appearance="support"
      breadcrumbItems={breadcrumbItems}
      groups={groups}
      title="SUPPORT"
      titleTo="/support"
    >
      <ContentSection minW="0" gap="0" footer={resolvedFooter} header={header}>
        {children}
      </ContentSection>
    </SidebarNavigationLayout>
  );
}
