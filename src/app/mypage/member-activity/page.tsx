'use client';

import { AccountDataList } from '@/components/common/organisms/Account/AccountDataList';

import { ContentSection } from '@/components/common/layouts/ContentSection/ContentSection';
import { SidebarNavigationLayout } from '@/components/common/layouts/SidebarNavigationLayout/SidebarNavigationLayout';

import { myPageNavigation } from '@/components/mypage/mypage.data';

/** 멤버십 활동과 적립 내역을 표시합니다. (Displays membership activities and earned rewards.) */
export default function Page() {
  return (
    <SidebarNavigationLayout
      activePath="/mypage/member-activity"
      groups={myPageNavigation}
      title="MY HOKA"
      titleTo="/mypage"
    >
      <ContentSection
        gap="6"
        title={<>멤버십 활동 내역</>}
        headerProps={{ titleAs: 'h1', titleProps: { web: 'heading8', mo: 'heading5' } }}
      >
        <AccountDataList
          rows={[{ label: '2026.09.12', value: '포토 리뷰 작성', status: '+1,000P' }]}
        />
      </ContentSection>
    </SidebarNavigationLayout>
  );
}
