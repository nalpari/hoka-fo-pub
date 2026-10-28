import { type ReactNode } from 'react';

import { Box } from 'styled-system/jsx';

import {
  Breadcrumb,
  type BreadcrumbItem,
} from '@/components/common/molecules/Breadcrumb/Breadcrumb';

import { SidebarNavigationLayout } from '@/components/common/layouts/SidebarNavigationLayout/SidebarNavigationLayout';

import { myPageNavigation } from '@/components/mypage/mypage.data';

type MyPageFrameLayout = 'sidebar' | 'centered';

type Props = { breadcrumbs: BreadcrumbItem[]; layout: MyPageFrameLayout };

function MyPageBreadcrumbs({ breadcrumbs, layout }: Props) {
  const content = (
    <Breadcrumb
      items={[
        { label: 'Home', href: '/' },
        { label: '마이페이지', href: '/mypage' },
        ...breadcrumbs,
      ]}
    />
  );

  return layout === 'centered' ? (
    <Box boxSizing="border-box" h="14" pt="6">
      {content}
    </Box>
  ) : (
    <Box px="4" pt="6" pb="2">
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

/** 사이드바 또는 중앙 정렬로 마이페이지 경로와 본문을 배치합니다. (Arranges my page breadcrumbs and content with a sidebar or centered layout.) */
export function MyPageFrame({
  activePath,
  breadcrumbs = [],
  layout = 'sidebar',
  children,
}: MyPageFrameProps) {
  const content = (
    <>
      <MyPageBreadcrumbs breadcrumbs={breadcrumbs} layout={layout} />
      {children}
    </>
  );

  if (layout === 'centered') {
    return (
      <Box as="main" boxSizing="border-box" w="100vw" maxW="640px" mx="auto" px="4" pb="16">
        {content}
      </Box>
    );
  }

  return (
    <SidebarNavigationLayout
      activePath={activePath}
      groups={myPageNavigation}
      mobileNavigation="hidden"
      mobileSpacing="none"
      title="MY HOKA"
      titleTo="/mypage"
    >
      {content}
    </SidebarNavigationLayout>
  );
}
