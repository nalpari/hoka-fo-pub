import { type ReactNode } from 'react';

import { css } from 'styled-system/css';
import { Box, Grid } from 'styled-system/jsx';

import { Breadcrumb, type BreadcrumbItem } from '@/components/common/molecules/Breadcrumb';

import { SideNavigation } from '@/components/common/layouts/SidebarNavigationLayout';

import { myPageNavigation } from '@/app/mypage/mypage.data';

type MyPageFrameLayout = 'sidebar' | 'centered';

type MyPageFrameProps = {
  activePath: string;
  breadcrumbs?: BreadcrumbItem[];
  layout?: MyPageFrameLayout;
  children: ReactNode;
  fillAvailable?: boolean;
};

/** 공통 위치의 경로와 메인 전용 사이드바 없는 본문을 배치합니다. (Positions shared breadcrumbs and omits the sidebar for the my page overview.) */
export function MyPageFrame({
  activePath,
  breadcrumbs = [],
  layout = 'sidebar',
  children,
  fillAvailable = false,
}: MyPageFrameProps) {
  return (
    <Box
      as="main"
      data-fill-available={fillAvailable ? 'true' : undefined}
      flex={fillAvailable ? '1' : undefined}
      display={fillAvailable ? 'flex' : undefined}
      flexDirection={fillAvailable ? 'column' : undefined}
      w="min(calc(100% - var(--layout-web-content-inline-space)), 1532px)"
      mx="auto"
      pb="96px"
      _mobile={{ w: '100%', px: '16px', pb: '64px' }}
    >
      <Breadcrumb
        items={[
          { label: 'Home', href: '/' },
          { label: '마이페이지', href: '/mypage' },
          ...breadcrumbs,
        ]}
      />
      <Grid
        flex={fillAvailable ? '1' : undefined}
        w="1200px"
        maxW="100%"
        mx="auto"
        px="34px"
        pt="56px"
        gridTemplateColumns={layout === 'centered' ? 'minmax(0, 1fr)' : '190px minmax(0, 1fr)'}
        gap="98px"
        _mobile={{
          display: fillAvailable ? 'flex' : 'block',
          flexDirection: 'column',
          px: '0',
          pt: '0',
        }}
      >
        {layout === 'sidebar' ? (
          <SideNavigation
            activePath={activePath}
            groups={myPageNavigation}
            mobileNavigation="hidden"
            title="마이페이지"
            titleTo="/mypage"
            className={css({
              '& a[aria-current="page"]': {
                color: 'black.100',
                textDecoration: 'underline',
                textUnderlineOffset: '6px',
              },
            })}
          />
        ) : null}
        <Box
          minW="0"
          display={fillAvailable ? 'flex' : undefined}
          flexDirection={fillAvailable ? 'column' : undefined}
          flex={fillAvailable ? '1' : undefined}
        >
          {children}
        </Box>
      </Grid>
    </Box>
  );
}
