import type { ReactNode } from 'react';

import { css } from 'styled-system/css';
import { Box, Grid } from 'styled-system/jsx';

import { Breadcrumb, type BreadcrumbItem } from '@/components/common/molecules/Breadcrumb';

import {
  SideNavigation,
  type SideNavigationGroup,
} from '@/components/common/organisms/Navigation/SideNavigation';

export type SidebarNavigationGroup = SideNavigationGroup;

type Props = {
  title: string;
  titleTo: string;
  groups: SidebarNavigationGroup[];
  activePath: string;
  children: ReactNode;
  className?: string;
} & (
  | {
      appearance?: 'default';
      mobileNavigation?: 'scroll' | 'hidden';
      mobileSpacing?: 'default' | 'none';
      breadcrumbItems?: never;
    }
  | {
      appearance: 'support';
      breadcrumbItems?: BreadcrumbItem[];
      mobileNavigation?: never;
      mobileSpacing?: never;
    }
);

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

/** 기본·고객센터 탐색의 폭과 반응형 본문 프레임을 배치합니다. (Arranges default or support navigation with its responsive content frame.) */
export function SidebarNavigationLayout({
  title: navigationTitle,
  titleTo,
  groups,
  activePath,
  children,
  appearance = 'default',
  mobileNavigation = 'scroll',
  className,
  mobileSpacing = 'default',
  breadcrumbItems,
}: Props) {
  const support = appearance === 'support';
  const columns = (
    <Grid
      as={support ? 'div' : 'main'}
      gridTemplateColumns={support ? '190px minmax(0, 1fr)' : '180px minmax(0, 1fr)'}
      gap={support ? '98px' : '50px'}
      pt={support ? { base: '14', _mobile: '6' } : undefined}
      _mobile={{ display: 'block' }}
      className={
        support
          ? undefined
          : [
              css(page, mobileSpacing === 'none' && { _mobile: { px: '0', py: '0', pb: '0' } }),
              className,
            ]
              .filter(Boolean)
              .join(' ')
      }
    >
      <SideNavigation
        activePath={activePath}
        appearance={appearance}
        groups={groups}
        mobileNavigation={support ? 'hidden' : mobileNavigation}
        title={navigationTitle}
        titleTo={titleTo}
      />
      {support ? children : <Box minW="0">{children}</Box>}
    </Grid>
  );

  if (!support) return columns;

  return (
    <Box
      as="main"
      className={className}
      w="min(calc(100% - var(--layout-web-content-inline-space)), 1532px)"
      mx="auto"
      pb="24"
      _mobile={{ w: '100%', px: '4', pb: '10' }}
    >
      {breadcrumbItems?.length ? (
        <Box h="14" pt="6" pb="2">
          <Breadcrumb items={breadcrumbItems} />
        </Box>
      ) : null}
      <Box w="1200px" maxW="100%" mx="auto" px="34px" _mobile={{ px: '0' }}>
        {columns}
      </Box>
    </Box>
  );
}
