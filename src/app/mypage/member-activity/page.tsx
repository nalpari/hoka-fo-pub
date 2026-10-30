'use client';

/**
 * [개발팀 바인딩]
 * MyPageDataContext.activities.items에 실제 활동의 label/value/status를 전달합니다.
 * 완료 여부를 로컬 클릭으로 추정하지 않고 pending/error/onRetry와 재조회한 서버 상태를 사용합니다.
 */

import { useContext } from 'react';
import { MyPageDataContext } from '@/context/MyPageDataContext';

import { BindingFeedback } from '@/components/common/molecules/BindingFeedback';

import { AccountDataList } from '@/components/common/organisms/Account/AccountDataList';

import { ContentSection } from '@/components/common/layouts/ContentSection';

import { MyPageFrame } from '@/components/mypage/MyPageFrame';

/** 멤버십 활동과 적립 내역을 표시합니다. (Displays membership activities and earned rewards.) */
export default function Page() {
  const binding = useContext(MyPageDataContext).activities;
  return (
    <MyPageFrame activePath="/mypage/member-activity" breadcrumbs={[{ label: '멤버십 활동 내역' }]}>
      <ContentSection
        gap="6"
        title={<>멤버십 활동 내역</>}
        headerProps={{ titleAs: 'h1', titleProps: { web: 'heading8', mo: 'heading5' } }}
      >
        <BindingFeedback {...binding} />
        <AccountDataList
          rows={
            binding
              ? [...binding.items]
              : [{ label: '2026.09.12', value: '포토 리뷰 작성', status: '+1,000P' }]
          }
        />
      </ContentSection>
    </MyPageFrame>
  );
}
