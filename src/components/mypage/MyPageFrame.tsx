import { type ReactNode } from 'react';

import { css } from 'styled-system/css';
import { Box, Grid } from 'styled-system/jsx';

import { Breadcrumb, type BreadcrumbItem } from '@/components/common/molecules/Breadcrumb';

import { SideNavigation } from '@/components/common/layouts/SidebarNavigationLayout';

import { myPageNavigation } from '@/components/mypage/mypage.data';

type MyPageFrameLayout = 'sidebar' | 'centered';

type Props = { breadcrumbs: BreadcrumbItem[] };

function MyPageBreadcrumbs({ breadcrumbs }: Props) {
  const content = (
    <Breadcrumb
      items={[
        { label: 'Home', href: '/' },
        { label: '마이페이지', href: '/mypage' },
        ...breadcrumbs,
      ]}
    />
  );

  return (
    <Box
      pt="6"
      h="14"
      _mobile={{
        h: 'auto',
        pb: '8',
        overflowX: 'auto',
        '& nav': { whiteSpace: 'nowrap', gap: '2px' },
        '& nav > span': { gap: '2px', flexShrink: '0' },
        '& nav > span > span, & nav a > span': { fontSize: 'var(--font-sizes-12)' },
      }}
    >
      {content}
    </Box>
  );
}

type MyPageFrameProps = {
  activePath: string;
  breadcrumbs?: BreadcrumbItem[];
  layout?: MyPageFrameLayout;
  children: ReactNode;
};

/** 공통 위치의 경로와 메인 전용 사이드바 없는 본문을 배치합니다. (Positions shared breadcrumbs and omits the sidebar for the my page overview.) */
export function MyPageFrame({
  activePath,
  breadcrumbs = [],
  layout = 'sidebar',
  children,
}: MyPageFrameProps) {
  return (
    <Box
      as="main"
      w="min(calc(100% - 64px), 1532px)"
      mx="auto"
      pb="24"
      _mobile={{ w: '100%', px: '4', pb: '16' }}
    >
      <MyPageBreadcrumbs breadcrumbs={breadcrumbs} />
      <Grid
        w="1200px"
        maxW="100%"
        mx="auto"
        px="34px"
        pt="14"
        gridTemplateColumns={layout === 'centered' ? 'minmax(0, 1fr)' : '190px minmax(0, 1fr)'}
        gap="98px"
        _mobile={{ display: 'block', px: '0', pt: '0' }}
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
        <Box minW="0">{children}</Box>
      </Grid>
    </Box>
  );
}
