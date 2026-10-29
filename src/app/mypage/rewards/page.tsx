'use client';

/**
 * [개발팀 바인딩]
 * 현재 사용자명/등급/구매금액은 MyPageDataContext.overview.item을 사용합니다.
 * tiers는 모든 회원에게 보여주는 등급 정책 설명입니다. BO 운영이 필요하면 이 표시 모델의 name/initial/benefits를 서버 정책으로 변환하고 현재 회원 등급과 구분합니다.
 */

import { useContext } from 'react';
import { MyPageDataContext } from '@/context/MyPageDataContext';

import { css } from 'styled-system/css';
import { Box, Circle, HStack, Stack } from 'styled-system/jsx';

import { Typography } from '@/components/common/atoms/Typography';

import { BindingFeedback } from '@/components/common/molecules/BindingFeedback';

import { ContentSection } from '@/components/common/layouts/ContentSection';

import { MyPageFrame } from '@/components/mypage/MyPageFrame';

import { commonBenefits, RewardBenefitItem, tierCard, tiers } from './_components/RewardsContent';

/** 회원 등급별 혜택과 리워드 안내를 표시합니다. (Displays membership tier benefits and reward information.) */
export default function Page() {
  const binding = useContext(MyPageDataContext).overview;
  const summary = binding?.item;
  const progress = binding
    ? summary?.tierProgress
    : { percent: 36.5, label: '다음 등급까지의 구매금액' };
  return (
    <MyPageFrame activePath="/mypage/rewards" breadcrumbs={[{ label: '회원등급' }]}>
      <BindingFeedback {...binding} />
      <Stack gap="10" px="4" pt="6" pb="16">
        <ContentSection
          gap="4"
          header={
            <Box as="h1">
              <HStack gap="0.5" alignItems="baseline">
                <Typography mo="heading5">{binding ? summary?.name : '박*진'}</Typography>
                <Typography mo="body2">님의 회원등급은</Typography>
              </HStack>
              <HStack gap="0.5" alignItems="baseline">
                <Typography mo="heading5">{binding ? summary?.tier : 'RUNNER'}</Typography>
                <Typography mo="body2">입니다.</Typography>
              </HStack>
            </Box>
          }
        >
          <Stack bg="black.10" px="4" py="5" gap="3">
            <HStack justifyContent="space-between" alignItems="center">
              <Typography mo="body4" weight="medium">
                구매금액
              </Typography>
              <HStack gap="0.5" alignItems="baseline">
                <Typography mo="heading7">
                  {binding ? summary?.purchaseAmount : '182,500'}
                </Typography>
                <Typography mo="body3">원</Typography>
              </HStack>
            </HStack>
            <Box
              display={{ base: progress ? 'block' : 'none', _mobile: 'none' }}
              role="img"
              aria-label="등급별 구매금액 안내"
            >
              <HStack justifyContent="space-between">
                <Typography variant="body5">RUNNER</Typography>
                <Typography variant="body5">ADVANCED</Typography>
                <Typography variant="body5">ELITE</Typography>
              </HStack>
              <Box h="2" bg="black.20" mt="3">
                <Box
                  style={{ width: `${Math.max(0, Math.min(100, progress?.percent ?? 0))}%` }}
                  h="100%"
                  bg="black.100"
                />
              </Box>
              <Typography variant="body5" className={css({ mt: '2' })}>
                현재 구매금액 : {binding ? summary?.purchaseAmount : '182,500'}원
              </Typography>
            </Box>
            <Box mt="2">
              <Typography as="p" mo="body5" tone="tertiary">
                * 매월 1일, 최근 1년간의 구매 금액을 기준으로 산정됩니다.
              </Typography>
            </Box>
          </Stack>
        </ContentSection>
        <Stack gap="4">
          {tiers.map((tier) => (
            <Stack key={tier.name} className={tierCard({ tier: tier.name })} px="4" py="6">
              <HStack alignItems="center" gap="2" minW="200px">
                <Circle
                  size="12"
                  flex="0 1 auto"
                  bg="black.100"
                  color="var(--tier-color)"
                  css={{
                    borderRadius: 0,
                    clipPath: 'polygon(25% 0,75% 0,100% 50%,75% 100%,25% 100%,0 50%)',
                    _mobile: { borderRadius: 'full', clipPath: 'none' },
                  }}
                >
                  <Typography mo="heading5" weight="black">
                    {tier.initial}
                  </Typography>
                </Circle>
                <Typography mo="heading5">{tier.name}</Typography>
              </HStack>
              <Stack as="ol" gap="2" listStyleType="none">
                {tier.benefits.map((benefit, index) => (
                  <RewardBenefitItem key={benefit.title} number={index + 1}>
                    <Typography as="p" mo="body4">
                      {benefit.title}
                    </Typography>
                    {benefit.details.length > 0 ? (
                      <Stack as="ul" gap="1" pl="2" listStyleType="none">
                        {benefit.details.map((detail) => (
                          <HStack as="li" key={detail} alignItems="flex-start" gap="1">
                            <Typography as="span" mo="body5" aria-hidden="true">
                              ・
                            </Typography>
                            <Typography mo="body5">{detail}</Typography>
                          </HStack>
                        ))}
                      </Stack>
                    ) : null}
                  </RewardBenefitItem>
                ))}
              </Stack>
            </Stack>
          ))}
          <ContentSection
            gap="5"
            px="4"
            py="6"
            border="1px solid var(--colors-black-20)"
            title="HOKA 회원 공통 혜택"
            headerProps={{ titleAs: 'h2', titleProps: { mo: 'heading6' } }}
          >
            {commonBenefits.map((benefit) => (
              <ContentSection
                as="section"
                key={benefit.title}
                gap="3"
                title={<>{benefit.title}</>}
                headerProps={{ titleAs: 'h3', titleProps: { mo: 'heading7' } }}
              >
                <Stack as="ol" gap="2" listStyleType="none">
                  {benefit.items.map((item, index) => (
                    <RewardBenefitItem key={item.text} number={index + 1}>
                      <Typography as="span" mo="body4">
                        {item.text}
                      </Typography>
                      {item.details.length > 0 ? (
                        <Stack as="ul" gap="1" listStyleType="none">
                          {item.details.map((detail) => (
                            <Typography as="li" key={detail} mo="body5">
                              • &nbsp;{detail}
                            </Typography>
                          ))}
                        </Stack>
                      ) : null}
                    </RewardBenefitItem>
                  ))}
                </Stack>
              </ContentSection>
            ))}
          </ContentSection>
        </Stack>
      </Stack>
    </MyPageFrame>
  );
}
