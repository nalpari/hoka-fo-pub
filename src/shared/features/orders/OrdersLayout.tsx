import type { ReactNode } from 'react';
import { Stack } from 'styled-system/jsx';
import { SidebarNavigationLayout } from '@/shared/components/layouts/SidebarNavigationLayout/SidebarNavigationLayout';
import { ContentSection } from '@/shared/components/layouts/ContentSection/ContentSection';
import { myPageNavigation } from '@/shared/features/mypage/mypage.data';

/** 주문 화면의 데스크톱 탐색과 모바일 본문 여백을 배치합니다. (Lays out desktop navigation and mobile order content.) */
export function OrdersLayout({
  title,
  children,
  returns = false,
}: {
  title: string;
  children: ReactNode;
  returns?: boolean;
}) {
  return (
    <SidebarNavigationLayout
      title="MY HOKA"
      titleTo="/mypage"
      groups={myPageNavigation}
      activePath={returns ? '/mypage/returns' : '/mypage/orders'}
      mobileNavigation="hidden"
      mobileSpacing="none"
    >
      <Stack
        px={{ base: '0', _mobile: '4' }}
        pt={{ base: '0', _mobile: '6' }}
        pb={{ base: '0', _mobile: '18' }}
        gap="0"
      >
        <ContentSection
          title={title}
          headerProps={{ titleAs: 'h1', titleProps: { web: 'heading8', mo: 'heading5' } }}
          gap="4"
        >
          {children}
        </ContentSection>
      </Stack>
    </SidebarNavigationLayout>
  );
}
