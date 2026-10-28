'use client';

import { ContentSection } from '@/components/common/layouts/ContentSection/ContentSection';
import { SidebarNavigationLayout } from '@/components/common/layouts/SidebarNavigationLayout/SidebarNavigationLayout';
import { AccountDataList } from '@/components/common/organisms/Account/AccountDataList';
import { myPageNavigation } from '@/components/mypage/mypage.data';

/** 결제수단 등록 현황을 표시합니다. (Displays the payment method registration status.) */
export default function Page() {
  return (
    <SidebarNavigationLayout
      activePath="/mypage/payment-methods"
      groups={myPageNavigation}
      title="MY HOKA"
      titleTo="/mypage"
    >
      <ContentSection
        gap="6"
        title={<>결제수단 관리</>}
        headerProps={{ titleAs: 'h1', titleProps: { web: 'heading8', mo: 'heading5' } }}
      >
        <AccountDataList
          rows={[{ label: '기본 결제수단', value: '등록된 결제수단이 없습니다.', status: '등록' }]}
        />
      </ContentSection>
    </SidebarNavigationLayout>
  );
}
