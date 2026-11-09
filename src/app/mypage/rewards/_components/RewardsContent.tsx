'use client';
import { usePlatform } from '@/context/platform';

import { css, cva } from 'styled-system/css';
import { Box, Grid, HStack, Stack } from 'styled-system/jsx';

import { Typography } from '@/components/common/atoms/Typography';

import { BindingFeedback } from '@/components/common/molecules/BindingFeedback';
import { ContentHeader } from '@/components/common/molecules/ContentHeader';

import { ContentSection } from '@/components/common/layouts/ContentSection';

import { commonBenefits, rewardPreview, tiers } from '@/app/mypage/rewards/rewards-data';
import { MyPageFrame } from '@/components/mypage/MyPageFrame';
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
      gap="1"
      justifyContent="center"
      bg="black.10"
      px="8"
      py="8"
      display={{ _mobile: 'none' }}
    >
      <Box position="relative" h="44px" mr="180px">
        <Box
          position="absolute"
          style={{ left: `${percent}%` }}
          transform="translateX(-50%)"
          bottom="0"
          maxW="none"
          w="max-content"
        >
          <Box bg="black.100" color="white" px="3" py="2.5" borderRadius="12px">
            <Typography variant="body4">{progress.label}</Typography>
          </Box>
          <Box mx="auto" w="3" h="1.5" bg="black.100" clipPath="polygon(0 0,100% 0,50% 100%)" />
        </Box>
      </Box>
      <HStack gap="6" minH="6">
        <Box
          flex="1"
          h="2"
          bg="black.20"
          borderRadius="full"
          position="relative"
          role="progressbar"
          aria-label={progress.label}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={percent}
        >
          <Box style={{ width: `${percent}%` }} h="full" bg="black.100" borderRadius="full" />
          <Box
            position="absolute"
            style={{ left: `${percent}%` }}
            top="50%"
            transform="translate(-50%,-50%)"
            w="6"
            h="6"
            bg="white"
            border="1px solid black"
            borderRadius="full"
          />
        </Box>
        <HStack gap="1.5" w="156px" flexShrink="0" justifyContent="flex-end">
          {progress.currentAmount ? (
            <Typography variant="body4">
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
const sectionHeading = css({ pb: '4', borderBottom: '1px solid black', _mobile: { pb: '3' } });
/** 등급별 혜택과 공통 쿠폰 안내를 배치합니다. (Lays out tier benefits and common coupon information.) */
export function RewardBenefits() {
  const platform = usePlatform();
  return (
    <Stack gap="14" _mobile={{ gap: '4' }}>
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
              pb: '4',
              borderBottom: '1px solid black',
              _mobile: { display: 'none' },
            }),
          },
        }}
      >
        <Stack gap="0" _mobile={{ border: '1px solid var(--colors-black-20)', py: '8' }}>
          {tiers.map((tier) => (
            <HStack
              key={tier.name}
              alignItems="flex-start"
              gap="14"
              px="14"
              py="10"
              borderBottom="1px solid var(--colors-black-20)"
              _mobile={{
                flexDirection: 'column',
                gap: '4',
                px: '4',
                py: '6',
                '&:first-child': { pt: '0' },
                '&:last-child': { pb: '0', borderBottom: '0' },
              }}
            >
              <Stack
                gap="4"
                w="160px"
                flexShrink="0"
                alignItems="center"
                _mobile={{ flexDirection: 'row', w: 'auto', gap: '2' }}
              >
                <TierBadge tier={tier.name} initial={tier.initial} />
                <ContentHeader
                  title={tier.name}
                  titleAs="h3"
                  titleProps={{ web: 'heading8', mo: 'heading5' }}
                  gap="0"
                />
              </Stack>
              <Stack as="ol" gap="3" listStyleType="none" flex="1" _mobile={{ gap: '2' }}>
                {tier.benefits.map((benefit, index) => (
                  <HStack as="li" key={benefit.title} gap="1" alignItems="flex-start">
                    <Typography web="body3" mo="body4">
                      {index + 1}.
                    </Typography>
                    <Stack gap="2" minW="0">
                      <Typography as="p" web="body3" mo="body4">
                        {'mobileTitle' in benefit && platform === 'mobile'
                          ? benefit.mobileTitle
                          : benefit.title}
                      </Typography>
                      {benefit.detail ? (
                        <Typography as="p" web="body4" mo="body5" className={css({ pl: '3' })}>
                          ・{' '}
                          {'mobileDetail' in benefit && platform === 'mobile'
                            ? benefit.mobileDetail
                            : benefit.detail}
                        </Typography>
                      ) : null}
                    </Stack>
                  </HStack>
                ))}
              </Stack>
            </HStack>
          ))}
        </Stack>
      </ContentSection>
      <ContentSection
        as="section"
        gap="0"
        _mobile={{ bg: 'black.10', px: '4', py: '6', gap: '5' }}
        title="HOKA 회원 공통 혜택"
        headerProps={{
          titleAs: 'h2',
          titleProps: { web: 'heading7', mo: 'heading6', className: sectionHeading },
        }}
      >
        <Grid
          gridTemplateColumns="repeat(2,minmax(0,1fr))"
          columnGap="10"
          rowGap="16"
          py="8"
          borderBottom="1px solid var(--colors-black-20)"
          _mobile={{ gridTemplateColumns: 'minmax(0,1fr)', gap: '5', py: '0', borderBottom: '0' }}
        >
          {commonBenefits.map((benefit) => (
            <ContentHeader
              as="section"
              key={benefit.title}
              gap="4"
              title={benefit.title}
              titleAs="h3"
              titleProps={{ web: 'body2', mo: 'heading7' }}
              description={benefit.description}
              descriptionProps={{ variant: 'body4' }}
              css={{
                '&:nth-child(odd)': { borderRight: '1px solid var(--colors-black-20)', pr: '10' },
              }}
              _mobile={{ gap: '3', '&:nth-child(odd)': { borderRight: '0', pr: '0' } }}
            />
          ))}
        </Grid>
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
  const platform = usePlatform();
  const summary = preview ? null : display === undefined ? rewardPreview[platform] : display;
  return (
    <MyPageFrame activePath="/mypage/rewards" breadcrumbs={[{ label: '회원등급' }]}>
      <BindingFeedback
        pending={preview === 'loading'}
        error={preview === 'error' ? '회원등급을 불러오지 못했습니다.' : undefined}
      />
      <Stack gap="14" _mobile={{ gap: '10', pt: '6' }}>
        <Stack gap="6">
          <ContentHeader
            title="회원등급"
            titleAs="h1"
            titleProps={{ web: 'heading6', mo: 'heading5' }}
          />
          <HStack gap="4" alignItems="flex-start">
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
              gap="3"
              pt="3"
              _mobile={{ gap: '2', pt: '0' }}
            />
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
