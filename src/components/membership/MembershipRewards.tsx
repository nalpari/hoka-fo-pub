'use client';

import { css, cva } from 'styled-system/css';
import { Box, Grid, HStack, Stack } from 'styled-system/jsx';

import { Typography } from '@/components/common/atoms/Typography';

import { ContentHeader } from '@/components/common/molecules/ContentHeader';

import { ContentSection } from '@/components/common/layouts/ContentSection';

import type { OverviewView } from '@/types/mypage-display';

import {
  type MembershipBenefitsDisplay,
  membershipBenefitsPreview,
  rewardPreview,
} from './rewards-data';

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
function TierBadge({ tier, initial }: { tier?: string; initial?: string }) {
  const knownTier = tier === 'ELITE' || tier === 'ADVANCED' || tier === 'RUNNER' ? tier : undefined;
  return (
    <Box className={badge({ tier: knownTier })} aria-hidden="true">
      <Typography web="h4B" mo="h7B">
        {initial}
      </Typography>
    </Box>
  );
}

const styles = {
  supportBody: css({ '&&': { lineHeight: 'body' } }),
  supportBenefitTitle: css({
    '&&': {
      lineHeight: 'body',
      _mobile: { lineHeight: 'body' },
    },
  }),
  sectionHeading: css({
    pb: '16px',
    borderBottom: '2px solid black',
    _mobile: { pb: '12px', borderBottom: '1px solid black' },
  }),
};

const tierHeading = css({
  pb: '16px',
  borderBottom: '2px solid black',
  _mobile: { display: 'none' },
});

function RewardBenefits({ display }: { display: MembershipBenefitsDisplay }) {
  const { tiers, commonBenefits } = display;
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
            web: 'h8B',
            mo: 'h8',
            className: tierHeading,
          },
        }}
      >
        <Stack gap="0" _mobile={{ border: '1px solid var(--colors-black-20)', py: '32px' }}>
          {tiers.map((tier) => (
            <HStack
              key={tier.name}
              alignItems="flex-start"
              gap="56px"
              pl="56px"
              pr={tier.name === 'ELITE' ? '32px' : '56px'}
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
                  titleProps={{ web: 'h10B', mo: 'h7B' }}
                  gap="0"
                />
              </Stack>
              <Stack gap="16px" flex="1">
                <Typography
                  as="p"
                  web="b2M"
                  mo="b4M"

                  className={styles.supportBody}
                >
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
                      <Typography web="b4" mo="b6" className={styles.supportBody}>
                        {index + 1}.
                      </Typography>
                      <Stack gap="8px" minW="0">
                        <Typography
                          as="p"
                          web="b4M"
                          mo="b6"

                          className={styles.supportBody}
                        >
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
          titleProps: { web: 'h8B', mo: 'h8', className: styles.sectionHeading },
        }}
      >
        <Stack gap="0" pb={'40px'} _mobile={{ gap: '20px', pb: '0' }}>
          {[commonBenefits.slice(0, 2), commonBenefits.slice(2, 4)]
            .filter((row) => row.length > 0)
            .map((row) => (
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
                    titleProps={{
                      web: 'b2M',
                      mo: 'h8',
                      className: styles.supportBenefitTitle,
                    }}
                    description={benefit.description}
                    descriptionProps={{
                      variant: 'b6',
                      className: styles.supportBody,
                    }}
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

/** 준비된 누적 구매 진행률과 등급 안내를 표시합니다. (Displays prepared purchase progress and tier guidance.) */
function RewardProgress({ progress }: { progress: NonNullable<OverviewView['tierProgress']> }) {
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
            <Typography variant="b6">{progress.label}</Typography>
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
            <Typography variant="b6" mo="b6M">
              {progress.currentAmount}
              <Typography variant="b6">원</Typography>
            </Typography>
          ) : null}
          {progress.targetAmount ? (
            <>
              <Typography variant="b4">/</Typography>
              <Typography variant="b6" tone="subtle">
                {progress.targetAmount}
                <Typography variant="b6">원</Typography>
              </Typography>
            </>
          ) : null}
        </HStack>
      </HStack>
    </Stack>
  );
}

type MembershipSummaryDisplay = Pick<
  OverviewView,
  'name' | 'tier' | 'tierInitial' | 'purchaseAmount' | 'tierProgress'
>;

type MembershipRewardsProps = {
  /** 준비된 개인 등급 표시 데이터이며 null이면 기존 빈 요약을 표시합니다. */
  summary?: MembershipSummaryDisplay | null;
  benefits?: MembershipBenefitsDisplay;
  /** 개인 요약 표시 여부입니다. @default true */
  showSummary?: boolean;
};

/** [ 개발팀 바인딩 ] 두 경로가 같은 개인 요약·등급·혜택 본문을 공유합니다. summary/benefits는 현재 props를 읽고 생략 시 고정 예시를 사용합니다. 고객센터 소유자가 셸의 로그인 표시 상태를 showSummary로 전달합니다. 인증·정책 조회·쿠폰 지급은 없으며 운영 조회·갱신·실패 처리는 각 통합 소유자가 연결해야 합니다. */
/** 개인 회원등급 요약과 공통 혜택 본문을 표시합니다. (Displays the shared personal membership summary and tier benefits.) */
export function MembershipRewards({
  summary = rewardPreview,
  benefits = membershipBenefitsPreview,
  showSummary = true,
}: MembershipRewardsProps) {
  return (
    <Stack as="section" aria-label="회원등급 및 혜택" gap="48px" _mobile={{ gap: '40px' }}>
      {showSummary ? (
        <Stack gap="32px" _mobile={{ gap: '24px' }}>
          <HStack gap="16px" alignItems="flex-start">
            <Box display={{ base: 'block', _mobile: 'none' }} aria-hidden="true">
              <TierBadge tier={summary?.tier} initial={summary?.tierInitial} />
            </Box>
            <ContentHeader
              title={summary?.tier}
              titleAs="h2"
              titleProps={{ web: 'h4B', mo: 'h1B' }}
              description={
                <>
                  <Typography as="span" web="b4M" mo="b6M">
                    {summary?.name}
                  </Typography>
                  {summary ? '님의 이번 달 멤버십 등급' : null}
                </>
              }
              descriptionProps={{ web: 'b4', mo: 'b6' }}
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
                <Typography web="b4M" mo="b6M">
                  구매금액
                </Typography>
                <HStack gap="2px" justifyContent="flex-end" alignItems="baseline">
                  <Typography web="h10B" mo="h8">
                    {summary?.purchaseAmount}
                  </Typography>
                  <Typography variant="b4">원</Typography>
                </HStack>
              </Stack>
            </HStack>
            <Typography as="p" web="b6" mo="b7" tone="tertiary">
              * 매월 1일, 전월 말일자부터 최근 1년 내 구매 금액으로 산정
            </Typography>
          </Stack>
        </Stack>
      ) : null}
      <RewardBenefits display={benefits} />
    </Stack>
  );
}
