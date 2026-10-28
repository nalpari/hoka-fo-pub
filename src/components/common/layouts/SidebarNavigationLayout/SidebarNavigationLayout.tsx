import type { ReactNode } from 'react';
import { css } from 'styled-system/css';
import {
  SideNavigation,
  type SideNavigationGroup,
} from '@/components/common/organisms/Navigation/SideNavigation/SideNavigation';
import { Box } from 'styled-system/jsx';
import { SidebarColumns } from '@/components/common/layouts/SidebarColumns/SidebarColumns';

export type SidebarNavigationGroup = SideNavigationGroup;

type Props = {
  title: string;
  titleTo: string;
  groups: SidebarNavigationGroup[];
  activePath: string;
  children: ReactNode;
  mobileNavigation?: 'scroll' | 'hidden';
  className?: string;
  mobileSpacing?: 'default' | 'none';
};

const page = css.raw({
  maxW: 'var(--layout-content-max-width)',
  mx: 'auto',
  py: '70px',
  pb: '120px',
  _mobile: {
    px: 'var(--layout-mobile-inline-gutter)',
    py: '38px',
    pb: '70px',
  },
});

export function SidebarNavigationLayout({
  title: navigationTitle,
  titleTo,
  groups,
  activePath,
  children,
  mobileNavigation = 'scroll',
  className,
  mobileSpacing = 'default',
}: Props) {
  return (
    <SidebarColumns
      as="main"
      sidebarWidth="180px"
      sidebar={
        <SideNavigation
          activePath={activePath}
          groups={groups}
          mobileNavigation={mobileNavigation}
          title={navigationTitle}
          titleTo={titleTo}
        />
      }
      className={[
        css(page, mobileSpacing === 'none' && { _mobile: { px: '0', py: '0', pb: '0' } }),
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <Box minW="0">{children}</Box>
    </SidebarColumns>
  );
}
