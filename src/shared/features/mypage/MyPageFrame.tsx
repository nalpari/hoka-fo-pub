import type { ReactNode } from 'react';
import { css } from 'styled-system/css';
import { Box } from 'styled-system/jsx';
import { Breadcrumb, type BreadcrumbItem } from '@/shared/components/molecules/Breadcrumb/Breadcrumb';
import { SideNavigation } from '@/shared/components/organisms/Navigation/SideNavigation/SideNavigation';
import { myPageNavigation } from './mypage.data';

const page = css({
  display: 'grid',
  gridTemplateColumns: '180px minmax(0, 1fr)',
  gap: '50px',
  maxW: 'var(--layout-content-max-width)',
  mx: 'auto',
  py: '70px',
  pb: '120px',
  _mobile: { display: 'block', py: '0', pb: '0' },
});

const content = css({ minW: '0' });

type MyPageFrameProps = {
  activePath: string;
  breadcrumbs: BreadcrumbItem[];
  children: ReactNode;
};

export function MyPageFrame({ activePath, breadcrumbs, children }: MyPageFrameProps) {
  return (
    <main className={page}>
      <SideNavigation
        activePath={activePath}
        groups={myPageNavigation}
        mobileNavigation="hidden"
        title="MY HOKA"
        titleTo="/mypage"
      />
      <div className={content}>
        <Box px="4" pt="6" pb="2">
          <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: '마이페이지', href: '/mypage' }, ...breadcrumbs]} />
        </Box>
        {children}
      </div>
    </main>
  );
}
