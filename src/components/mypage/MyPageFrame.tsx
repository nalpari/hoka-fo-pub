import { Box } from 'styled-system/jsx';
import {
  Breadcrumb,
  type BreadcrumbItem,
} from '@/components/common/molecules/Breadcrumb/Breadcrumb';
import { type ReactNode } from 'react';
import { SidebarNavigationLayout } from '@/components/common/layouts/SidebarNavigationLayout/SidebarNavigationLayout';
import { myPageNavigation } from '@/components/mypage/mypage.data';

type Props = { breadcrumbs: BreadcrumbItem[] };

function MyPageBreadcrumbs({ breadcrumbs }: Props) {
  return (
    <Box px="4" pt="6" pb="2">
      <Breadcrumb
        items={[
          { label: 'Home', href: '/' },
          { label: '마이페이지', href: '/mypage' },
          ...breadcrumbs,
        ]}
      />
    </Box>
  );
}

type MyPageFrameProps = {
  activePath: string;
  breadcrumbs: BreadcrumbItem[];
  children: ReactNode;
};

/** 마이페이지 메뉴와 본문 영역을 배치합니다 (Displays the my page frame composition). */
export function MyPageFrame({ activePath, breadcrumbs, children }: MyPageFrameProps) {
  return (
    <SidebarNavigationLayout
      activePath={activePath}
      groups={myPageNavigation}
      mobileNavigation="hidden"
      mobileSpacing="none"
      title="MY HOKA"
      titleTo="/mypage"
    >
      <MyPageBreadcrumbs breadcrumbs={breadcrumbs} />
      {children}
    </SidebarNavigationLayout>
  );
}
