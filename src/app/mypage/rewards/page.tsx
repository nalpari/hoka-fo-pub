'use client';

import { useContext } from 'react';
import { MyPageDataContext } from '@/context/MyPageDataContext';
import { usePlatform } from '@/context/platform';

import { Box, HStack, Stack } from 'styled-system/jsx';

import { Typography } from '@/components/common/atoms/Typography';

import { BindingFeedback } from '@/components/common/molecules/BindingFeedback';

import { MyPageFrame } from '@/components/mypage/MyPageFrame';

import { RewardBenefits, RewardProgress, TierBadge } from './_components/RewardsContent';
import { rewardPreview } from './rewards-data';

/** 회원 등급별 혜택과 리워드 안내를 표시합니다. (Displays membership tier benefits and reward information.) */
export default function Page() {
  // [ 개발팀 바인딩 ] 연결 어댑터가 overview.item의 이름·등급·이니셜·구매금액과
  // tierProgress의 진행률·툴팁·누적/목표 표시 금액을 준비합니다. 미공급 값을 계산하거나 fixture로 대체하지 않습니다.
  // Provider가 없을 때만 플랫폼별 시안 fixture를 사용합니다. 현재 Context를 직접 읽어 지연 응답/교체를 반영하며,
  // pending/error/onRetry는 BindingFeedback에 전달합니다. 조회·재시도·성공 후 갱신과 오래된 응답 배제는 어댑터 책임입니다.
  const binding = useContext(MyPageDataContext).overview;
  const platform = usePlatform();
  const summary = binding ? binding.item : rewardPreview[platform];

  return (
    <MyPageFrame activePath="/mypage/rewards" breadcrumbs={[{ label: '회원등급' }]}>
      <BindingFeedback {...binding} />
      <Stack gap="14" _mobile={{ gap: '10', pt: '6' }}>
        <Stack gap="6">
          <HStack gap="4" alignItems="flex-start">
            <Box display={{ base: 'block', _mobile: 'none' }} aria-hidden="true">
              <TierBadge tier={summary?.tier} initial={summary?.tierInitial} />
            </Box>
            <Stack gap="3" pt="3" _mobile={{ gap: '2', pt: '0' }}>
              <Typography as="h1" web="heading6" mo="heading3">
                {summary?.tier}
              </Typography>
              <Typography as="p" web="body3" mo="body4">
                {summary?.name}
                {summary ? '님의 이번달 멤버십 등급' : null}
              </Typography>
            </Stack>
          </HStack>
          <HStack gap="2" alignItems="stretch">
            {summary?.tierProgress ? <RewardProgress progress={summary.tierProgress} /> : null}
            <Stack
              bg="black.10"
              p="8"
              gap="3"
              w={summary?.tierProgress ? '240px' : 'full'}
              minH="133px"
              justifyContent="space-between"
              _mobile={{
                w: 'full',
                minH: '0',
                px: '4',
                py: '5',
                flexDirection: 'row',
                alignItems: 'center',
              }}
            >
              <Typography web="body3" mo="body4">
                구매금액
              </Typography>
              <HStack gap="0.5" justifyContent="flex-end" alignItems="baseline">
                <Typography web="heading8" mo="heading7" weight="black">
                  {summary?.purchaseAmount}
                </Typography>
                <Typography variant="body3">원</Typography>
              </HStack>
            </Stack>
          </HStack>
        </Stack>
        <RewardBenefits />
      </Stack>
    </MyPageFrame>
  );
}
