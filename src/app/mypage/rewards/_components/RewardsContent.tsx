'use client';

import { css, cva } from 'styled-system/css';
import { Box, Grid, HStack, Stack } from 'styled-system/jsx';

import { Typography } from '@/components/common/atoms/Typography';

import { BindingFeedback } from '@/components/common/molecules/BindingFeedback';
import { ContentHeader } from '@/components/common/molecules/ContentHeader';

import { ContentSection } from '@/components/common/layouts/ContentSection';

import { MyPageFrame } from '@/app/mypage/_components/MyPageFrame';
import { commonBenefits, rewardPreview, tiers } from '@/app/mypage/rewards/rewards-data';
import type { OverviewView } from '@/types/mypage-display';
const badge = cva({
  base: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexShrink: 0,
    w: '63px',
    h: '72px',
    bg: 'offWhite.100',
    clipPath: 'polygon(50% 0,100% 25%,100% 75%,50% 100%,0 75%,0 25%)',
    _mobile: { w: '42px', h: '48px' },
  },
  variants: {
    tier: {
      ELITE: {
        w: '72px',
        bg: 'blue.100',
        borderRadius: 'full',
        clipPath: 'none',
        _mobile: { w: '48px' },
      },
      ADVANCED: {
        w: '72px',
        h: '70px',
        bg: 'citrus.100',
        clipPath: 'polygon(50% 0,100% 38%,81% 100%,19% 100%,0 38%)',
        _mobile: { w: '48px', h: '46px' },
      },
      RUNNER: {},
    },
  },
});
/** 등급별 도형과 이니셜을 표시합니다. (Displays the membership tier shape and initial.) */
export function TierBadge({ tier, initial }: { tier?: string; initial?: string }) {
  const knownTier = tier === 'ELITE' || tier === 'ADVANCED' || tier === 'RUNNER' ? tier : undefined;
  return (
    <Box className={badge({ tier: knownTier })} aria-hidden="true">
      <Typography web="heading6" mo="heading5">
        {initial}
      </Typography>
    </Box>
  );
}
/** 준비된 누적 구매 진행률과 등급 안내를 표시합니다. (Displays prepared purchase progress and tier guidance.) */
export function RewardProgress({
  progress,
}: {
  progress: NonNullable<OverviewView['tierProgress']>;
}) {
  const percent = Number.isFinite(progress.percent)
    ? Math.max(0, Math.min(100, progress.percent))
    : 0;
  return (
    <Stack
      flex="1"
      minW="0"
      gap="4px"
      justifyContent="center"
      bg="black.10"
      px="32px"
      py="32px"
      _mobile={{ w: 'full', py: '24px', gap: '8px' }}
    >
      <Box position="relative" h="44px" mr="180px" _mobile={{ h: '47px', mr: '0' }}>
        <Box
          position="absolute"
          style={{ left: `${percent}%` }}
          transform="translateX(-50%)"
          bottom="0"
          maxW="none"
          w="max-content"
        >
          <Box bg="black.100" color="white" px="12px" py="10px" borderRadius="12px">
            <Typography variant="body4">{progress.label}</Typography>
          </Box>
          <Box
            mx="auto"
            w="12px"
            h="6px"
            bg="black.100"
            clipPath="polygon(0 0,100% 0,50% 100%)"
            mt="-1px"
          />
        </Box>
      </Box>
      <HStack gap="24px" minH="24px" _mobile={{ flexDirection: 'column', alignItems: 'stretch' }}>
        <Box
          flex="1"
          h="8px"
          bg="black.20"
          borderRadius="full"
          position="relative"
          role="progressbar"
          aria-label={progress.label}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={percent}
          _mobile={{ flex: 'none' }}
        >
          <Box style={{ width: `${percent}%` }} h="full" bg="black.100" borderRadius="full" />
          <Box
            position="absolute"
            style={{ left: `${percent}%` }}
            top="50%"
            transform="translate(-50%,-50%)"
            w="24px"
            h="24px"
            bg="white"
            border="1px solid black"
            borderRadius="full"
          />
        </Box>
        <HStack
          gap="6px"
          w="156px"
          flexShrink="0"
          justifyContent="flex-end"
          _mobile={{ w: 'full', minH: '24px' }}
        >
          {progress.currentAmount ? (
            <Typography variant="body4" mo="body4Medium">
              {progress.currentAmount}
              <Typography variant="bodyKr4">원</Typography>
            </Typography>
          ) : null}
          {progress.targetAmount ? (
            <>
              <Typography variant="body3">/</Typography>
              <Typography variant="body4" tone="subtle">
                {progress.targetAmount}
                <Typography variant="bodyKr4">원</Typography>
              </Typography>
            </>
          ) : null}
        </HStack>
      </HStack>
    </Stack>
  );
}
const sectionHeading = css({
  pb: '16px',
  borderBottom: '2px solid black',
  _mobile: { pb: '12px', borderBottom: '1px solid black' },
});
/** 등급별 혜택과 공통 쿠폰 안내를 배치합니다. (Lays out tier benefits and common coupon information.) */
export function RewardBenefits() {
  return (
    <Stack gap="48px" _mobile={{ gap: '16px' }}>
      <ContentSection
        as="section"
        gap="0"
        aria-label="등급 안내"
        title="등급 안내"
        headerProps={{
          titleAs: 'h2',
          titleProps: {
            variant: 'heading7',
            className: css({
              pb: '16px',
              borderBottom: '1px solid black',
              _mobile: { display: 'none' },
            }),
          },
        }}
      >
        <Stack gap="0" _mobile={{ border: '1px solid var(--colors-black-20)', py: '32px' }}>
          {tiers.map((tier) => (
            <HStack
              key={tier.name}
              alignItems="flex-start"
              gap="56px"
              px="56px"
              py="40px"
              borderBottom="1px solid var(--colors-black-20)"
              _mobile={{
                flexDirection: 'column',
                gap: '16px',
                px: '16px',
                py: '24px',
                '&:first-child': { pt: '0' },
                '&:last-child': { pb: '0', borderBottom: '0' },
              }}
            >
              <Stack
                gap={tier.name === 'RUNNER' ? '8px' : '16px'}
                w="160px"
                flexShrink="0"
                alignItems="center"
                _mobile={{ flexDirection: 'row', w: 'auto', gap: '8px' }}
              >
                <TierBadge tier={tier.name} initial={tier.initial} />
                <ContentHeader
                  title={tier.name}
                  titleAs="h3"
                  titleProps={{ web: 'heading8', mo: 'heading5' }}
                  gap="0"
                />
              </Stack>
              <Stack gap="16px" flex="1">
                <Typography as="p" web="body2" mo="body3" weight="medium">
                  {tier.requirement}
                </Typography>
                <Stack
                  as="ol"
                  gap={tier.name === 'ELITE' ? '12px' : '8px'}
                  listStyleType="none"
                  _mobile={{ gap: '8px' }}
                >
                  {tier.benefits.map((benefit, index) => (
                    <HStack as="li" key={benefit.title} gap="4px" alignItems="flex-start">
                      <Typography web="body3" mo="body4">
                        {index + 1}.
                      </Typography>
                      <Stack gap="8px" minW="0">
                        <Typography as="p" web="body3" mo="body4">
                          {benefit.title}
                        </Typography>
                      </Stack>
                    </HStack>
                  ))}
                </Stack>
              </Stack>
            </HStack>
          ))}
        </Stack>
      </ContentSection>
      <ContentSection
        as="section"
        gap="0"
        _mobile={{ bg: 'black.10', px: '16px', py: '24px', gap: '20px' }}
        title="HOKA 회원 공통 혜택"
        headerProps={{
          titleAs: 'h2',
          titleProps: { web: 'heading7', mo: 'heading6', className: sectionHeading },
        }}
      >
        <Stack gap="0" _mobile={{ gap: '20px' }}>
          {[commonBenefits.slice(0, 2), commonBenefits.slice(2, 4)].map((row) => (
            <Grid
              key={row[0].title}
              gridTemplateColumns="repeat(2, minmax(0, 1fr))"
              columnGap="40px"
              py="32px"
              borderBottom="1px solid var(--colors-black-20)"
              _mobile={{
                gridTemplateColumns: 'minmax(0, 1fr)',
                gap: '20px',
                py: 0,
                borderBottom: 0,
              }}
            >
              {row.map((benefit, index) => (
                <ContentHeader
                  as="section"
                  key={benefit.title}
                  gap="16px"
                  title={benefit.title}
                  titleAs="h3"
                  titleProps={{ web: 'body2', mo: 'heading7' }}
                  description={benefit.description}
                  descriptionProps={{ variant: 'body4' }}
                  borderRight={index === 0 ? '1px solid var(--colors-black-20)' : undefined}
                  pr={index === 0 ? '40px' : undefined}
                  _mobile={{ gap: '12px', borderRight: 0, pr: 0 }}
                />
              ))}
            </Grid>
          ))}
        </Stack>
      </ContentSection>
    </Stack>
  );
}
/** 회원등급의 고정 데이터와 조회 상태를 표시합니다. (Displays prepared reward data and query states.) */
export function RewardsPageContent({
  display,
  preview,
}: {
  display?: OverviewView | null;
  preview?: 'loading' | 'error';
} = {}) {
  const summary = preview ? null : display === undefined ? rewardPreview : display;
  return (
    <MyPageFrame activePath="/mypage/rewards" breadcrumbs={[{ label: '회원등급' }]}>
      <BindingFeedback
        pending={preview === 'loading'}
        error={preview === 'error' ? '회원등급을 불러오지 못했습니다.' : undefined}
      />
      <Stack gap="48px" _mobile={{ gap: '40px', pt: '24px' }}>
        <Stack gap="32px" _mobile={{ gap: '24px' }}>
          <HStack gap="16px" alignItems="flex-start">
            <Box display={{ base: 'block', _mobile: 'none' }} aria-hidden="true">
              <TierBadge tier={summary?.tier} initial={summary?.tierInitial} />
            </Box>
            <ContentHeader
              title={summary?.tier}
              titleAs="h2"
              titleProps={{ web: 'heading6', mo: 'heading3' }}
              description={
                <>
                  {summary?.name}
                  {summary ? '님의 이번달 멤버십 등급' : null}
                </>
              }
              descriptionProps={{ web: 'body3', mo: 'body4' }}
              gap="12px"
              pt="12px"
              _mobile={{ gap: '8px', pt: '0' }}
            />
          </HStack>
          <Stack gap="12px">
            <HStack
              gap="8px"
              alignItems="stretch"
              _mobile={{ flexDirection: 'column', gap: '12px' }}
            >
              {summary?.tierProgress ? <RewardProgress progress={summary.tierProgress} /> : null}
              <Stack
                bg="black.10"
                p="32px"
                gap="12px"
                w={summary?.tierProgress ? '240px' : 'full'}
                minH="133px"
                justifyContent="space-between"
                _mobile={{
                  w: 'full',
                  minH: '0',
                  px: '16px',
                  py: '20px',
                  flexDirection: 'row',
                  alignItems: 'center',
                }}
              >
                <Typography web="body3" mo="body4">
                  구매금액
                </Typography>
                <HStack gap="2px" justifyContent="flex-end" alignItems="baseline">
                  <Typography web="heading8" mo="heading7">
                    {summary?.purchaseAmount}
                  </Typography>
                  <Typography variant="body3">원</Typography>
                </HStack>
              </Stack>
            </HStack>
            <Typography as="p" web="body4" mo="body4-2" tone="tertiary">
              * 매월 1일, 전월 말일자부터 최근 1년 내 구매 금액으로 산정
            </Typography>
          </Stack>
        </Stack>
        <RewardBenefits />
      </Stack>
    </MyPageFrame>
  );
}
