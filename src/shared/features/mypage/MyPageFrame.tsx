import type { ReactNode } from 'react';
import type { BreadcrumbItem } from '@/shared/components/molecules/Breadcrumb/Breadcrumb';
import { MyPageBreadcrumbs } from './MyPageBreadcrumbs';
import { SidebarNavigationLayout } from '@/shared/components/layouts/SidebarNavigationLayout/SidebarNavigationLayout';
import { myPageNavigation } from './mypage.data';

type MyPageFrameProps = {
  activePath: string;
  breadcrumbs: BreadcrumbItem[];
  children: ReactNode;
};

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
