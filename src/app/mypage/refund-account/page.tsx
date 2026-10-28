'use client';

import { ContentSection } from '@/components/common/layouts/ContentSection/ContentSection';
import { SidebarNavigationLayout } from '@/components/common/layouts/SidebarNavigationLayout/SidebarNavigationLayout';
import { AccountDataList } from '@/components/common/organisms/Account/AccountDataList';
import { myPageNavigation } from '@/components/mypage/mypage.data';

/** 환불계좌 등록 현황을 표시합니다. (Displays the refund account registration status.) */
export default function Page() {
  return (
    <SidebarNavigationLayout
      activePath="/mypage/refund-account"
      groups={myPageNavigation}
      title="MY HOKA"
      titleTo="/mypage"
    >
      <ContentSection
        gap="6"
        title={<>환불계좌 관리</>}
        headerProps={{ titleAs: 'h1', titleProps: { web: 'heading8', mo: 'heading5' } }}
      >
        <AccountDataList
          rows={[{ label: '환불계좌', value: '등록된 환불계좌가 없습니다.', status: '등록' }]}
        />
      </ContentSection>
    </SidebarNavigationLayout>
  );
}
