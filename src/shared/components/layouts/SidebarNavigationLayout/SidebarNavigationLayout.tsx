import type { ReactNode } from 'react';
import { css } from 'styled-system/css';
import {
  SideNavigation,
  type SideNavigationGroup,
} from '@/shared/components/organisms/Navigation/SideNavigation/SideNavigation';

export type SidebarNavigationGroup = SideNavigationGroup;

type Props = {
  title: string;
  titleTo: string;
  groups: SidebarNavigationGroup[];
  activePath: string;
  children: ReactNode;
  mobileNavigation?: 'scroll' | 'hidden';
  className?: string;
};

const page = css({
  display: 'grid',
  gridTemplateColumns: '180px minmax(0, 1fr)',
  gap: '50px',
  maxW: 'var(--layout-content-max-width)',
  mx: 'auto',
  py: '70px',
  pb: '120px',
  _mobile: {
    display: 'block',
    px: 'var(--layout-mobile-inline-gutter)',
    py: '38px',
    pb: '70px',
  },
});

const content = css({ minW: '0' });

export function SidebarNavigationLayout({
  title: navigationTitle,
  titleTo,
  groups,
  activePath,
  children,
  mobileNavigation = 'scroll',
  className,
}: Props) {
  return (
    <main className={[page, className].filter(Boolean).join(' ')}>
      <SideNavigation
        activePath={activePath}
        groups={groups}
        mobileNavigation={mobileNavigation}
        title={navigationTitle}
        titleTo={titleTo}
      />
      <div className={content}>{children}</div>
    </main>
  );
}
