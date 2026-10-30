'use client';

import { AccountDataList } from '@/components/common/organisms/Account/AccountDataList';

import { ContentSection } from '@/components/common/layouts/ContentSection';

import { MyPageFrame } from '@/components/mypage/MyPageFrame';

/** 환불계좌 등록 현황을 표시합니다. (Displays the refund account registration status.) */
export default function Page() {
  return (
    <MyPageFrame activePath="/mypage/refund-account" breadcrumbs={[{ label: '환불계좌 관리' }]}>
      <ContentSection
        gap="6"
        title={<>환불계좌 관리</>}
        headerProps={{ titleAs: 'h1', titleProps: { web: 'heading8', mo: 'heading5' } }}
      >
        <AccountDataList
          rows={[{ label: '환불계좌', value: '등록된 환불계좌가 없습니다.', status: '등록' }]}
        />
      </ContentSection>
    </MyPageFrame>
  );
}
