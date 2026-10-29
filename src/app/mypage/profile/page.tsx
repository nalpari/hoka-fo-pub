'use client';

/**
 * [개발팀 바인딩]
 * MyPageDataContext.profile.item에 현재 회원정보를 전달하고 save/changePassword/withdraw/requestPhone/verifyPhone을 연결합니다.
 * 읽기 화면은 최신 item을 사용하고 편집 시작 시 초안을 만듭니다. 편집 중 재조회로 입력을 덮지 않으며 취소/다시 편집하면 최신 원본을 읽습니다.
 * 전화번호 변경 인증의 proof는 save로 전달합니다. 모든 변경은 서버 성공 후에만 완료 처리하고 오류는 확인 모달 안에 표시합니다.
 */

import { useContext } from 'react';
import { MyPageDataContext } from '@/context/MyPageDataContext';

import { Typography } from '@/components/common/atoms/Typography';

import { BindingFeedback } from '@/components/common/molecules/BindingFeedback';

import { MyPageFrame } from '@/components/mypage/MyPageFrame';

import { ProfileContent } from './_components/ProfileContent';

/** 회원정보 조회를 기다린 뒤 편집 상태를 구성합니다. (Waits for profile data before initializing the editor.) */
export default function Page() {
  const binding = useContext(MyPageDataContext).profile;
  if (binding && !binding.item)
    return (
      <MyPageFrame activePath="/mypage/profile">
        <BindingFeedback {...binding} />
        {!binding.pending && !binding.error && (
          <Typography role="status">회원정보가 없습니다.</Typography>
        )}
      </MyPageFrame>
    );
  return <ProfileContent key={binding?.item?.id ?? 'demo'} />;
}
