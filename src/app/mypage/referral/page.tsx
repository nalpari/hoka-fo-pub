'use client';

import { ContentSection } from '@/components/common/layouts/ContentSection/ContentSection';
import { SidebarNavigationLayout } from '@/components/common/layouts/SidebarNavigationLayout/SidebarNavigationLayout';
import { AccountMetricPanel } from '@/components/common/organisms/Account/AccountMetricPanel';
import { myPageNavigation } from '@/components/features/mypage/mypage.data';

/** 친구 추천 코드와 추천 실적을 표시합니다. (Displays the referral code and referral metrics.) */
export default function Page() {
  return (
    <SidebarNavigationLayout
      activePath="/mypage/referral"
      groups={myPageNavigation}
      title="MY HOKA"
      titleTo="/mypage"
    >
      <ContentSection
        gap="6"
        title={<>친구 추천</>}
        headerProps={{ titleAs: 'h1', titleProps: { web: 'heading8', mo: 'heading5' } }}
      >
        <AccountMetricPanel
          tone="dark"
          metrics={[
            { label: '나의 추천 코드', value: 'HOKA-2026' },
            { label: '추천 완료', value: '0명' },
            { label: '적립 리워드', value: '0P' },
          ]}
        />
      </ContentSection>
    </SidebarNavigationLayout>
  );
}
