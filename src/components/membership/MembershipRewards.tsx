'use client';

import { usePlatform } from '@/context/platform';

import { css, cva } from 'styled-system/css';
import { Box, Grid, HStack, Stack } from 'styled-system/jsx';

import { Icon } from '@/components/common/atoms/Icon';
import { Typography } from '@/components/common/atoms/Typography';

import { ContentHeader } from '@/components/common/molecules/ContentHeader';

import { ContentSection } from '@/components/common/layouts/ContentSection';

import type { OverviewView } from '@/types/mypage-display';

import {
  type MembershipBenefitsDisplay,
  membershipBenefitsPreview,
  type MembershipSummaryDisplay,
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
    _mobile: {
      '&[data-placement="summary"]': { display: 'none' },
      '&[data-placement="compact"]': { w: '42px', h: '48px' },
      '&[data-placement="side"]': {
        position: 'absolute',
        top: '16px',
        right: '0',
        w: '56.7px',
        h: '64.8px',
      },
    },
  },
  variants: {
    tier: {
      ELITE: {
        w: '72px',
        bg: 'blue.100',
        borderRadius: 'full',
        clipPath: 'none',
        _mobile: {
          '&[data-placement="compact"]': { w: '48px' },
          '&[data-placement="side"]': { w: '64.8px' },
        },
      },
      ADVANCED: {
        w: '72px',
        h: '70px',
        bg: 'citrus.100',
        clipPath: 'polygon(50% 0,100% 38%,81% 100%,19% 100%,0 38%)',
        _mobile: {
          '&[data-placement="compact"]': { w: '48px', h: '46px' },
          '&[data-placement="side"]': { w: '64.8px', h: '62.1px' },
        },
      },
      RUNNER: {},
    },
  },
});

const sideBadgeInitial = css({ _mobile: { '&&': { fontSize: '29.7px' } } });

/** 등급별 도형과 이니셜을 표시합니다. (Displays the membership tier shape and initial.) */
function TierBadge({
  tier,
  initial,
  placement,
}: {
  tier?: string;
  initial?: string;
  placement?: 'compact' | 'side' | 'summary';
}) {
  const knownTier = tier === 'ELITE' || tier === 'ADVANCED' || tier === 'RUNNER' ? tier : undefined;
  return (
    <Box className={badge({ tier: knownTier })} data-placement={placement} aria-hidden="true">
      <Typography
        web="h4B"
        mo={placement === 'compact' ? 'h7B' : 'h1B'}
        className={placement === 'side' ? sideBadgeInitial : undefined}
      >
        {initial}
      </Typography>
    </Box>
  );
}

const styles = {
  supportBody: css({ '&&': { lineHeight: 'body' } }),
  accountPurchaseAmount: css({ _mobile: { '&&': { lineHeight: 'hoka' } } }),
  accountBenefitHeading: css({ pb: '16px', borderBottom: '2px solid black' }),
  accountBenefit: css({
    _web: {
      py: '32px',
      borderBottom: '1px solid var(--color-border-subtle)',
      '&:nth-child(odd):not(:last-child)::after': {
        content: '""',
        position: 'absolute',
        right: '-20px',
        top: '50%',
        transform: 'translateY(-50%)',
        w: '1px',
        h: '60px',
        bg: 'black.20',
      },
      '&:nth-child(odd):not(:last-child)::before': {
        content: '""',
        position: 'absolute',
        right: '-40px',
        bottom: '-1px',
        w: '40px',
        h: '1px',
        bg: 'black.20',
      },
    },
    _mobile: {
      py: '20px',
      '&:first-child': { pt: '0' },
      '&:last-child': { pb: '0' },
      '&:not(:last-child)': { borderBottom: '1px solid var(--color-border-subtle)' },
    },
  }),
  accountBenefitDescription: css({ _mobile: { pl: '28px' } }),
  accountCouponTitle: css({ _mobile: { '&&': { lineHeight: '1.4' }, whiteSpace: 'pre-line' } }),
  accountValidity: css({ color: '#707070' }),
  accountTooltip: css({
    textAlign: 'center',
    overflowWrap: 'anywhere',
  }),
  commonBenefitHeading: css({
    _web: { pb: '16px', borderBottom: '2px solid black' },
  }),
  commonBenefit: css({
    _web: {
      py: '32px',
      borderBottom: '1px solid var(--color-border-subtle)',
      '&:nth-child(even)': { pl: '20px' },
      '&:nth-child(odd)': {
        pr: '20px',
        position: 'relative',
        '&:not(:last-child)::after': {
          content: '""',
          position: 'absolute',
          right: '20px',
          top: '50%',
          transform: 'translateY(-50%)',
          w: '1px',
          h: '60px',
          bg: 'offWhite.100',
        },
      },
    },
    _mobile: {
      minH: '128px',
      p: '24px',
      border: '1px solid var(--color-border-tertiary)',
      '&:nth-child(4) h3': { gap: '12px' },
    },
  }),
};

const tierHeading = css({
  pb: '16px',
  borderBottom: '2px solid black',
  _mobile: { display: 'none' },
});

function RewardBenefits({
  display,
  account,
}: {
  display: MembershipBenefitsDisplay;
  account: boolean;
}) {
  const { tiers, commonBenefits } = display;
  const accountMobile = usePlatform() === 'mobile' && account;
  return (
    <Stack gap="48px" _mobile={{ gap: account ? '60px' : '16px' }}>
      <ContentSection
        as="section"
        gap="0"
        aria-label="등급 안내"
        title="등급 안내"
        headerProps={{
          titleAs: 'h2',
          titleProps: {
            web: account ? 'h8' : 'h8B',
            mo: 'h8',
            className: tierHeading,
          },
        }}
      >
        <Stack gap="0" _mobile={{ borderTop: '1px solid var(--color-border-subtle)' }}>
          {tiers.map((tier, index) => (
            <HStack
              key={tier.name}
              alignItems="flex-start"
              gap="56px"
              pl="56px"
              pr={tier.name === 'ELITE' ? '32px' : '56px'}
              py="40px"
              borderBottom="1px solid var(--color-border-subtle)"
              _mobile={
                account
                  ? {
                      position: 'relative',
                      flexDirection: 'column',
                      gap: '8px',
                      pl: '0',
                      pr: '88px',
                      pt: '18px',
                      pb: index === tiers.length - 1 ? '0' : '28px',
                      borderBottom: index === tiers.length - 1 ? '0' : undefined,
                    }
                  : {
                      flexDirection: 'column',
                      gap: '16px',
                      px: '16px',
                      py: '24px',
                    }
              }
            >
              <Stack
                gap={tier.name === 'RUNNER' ? '8px' : '16px'}
                w="160px"
                flexShrink="0"
                alignItems="center"
                _mobile={
                  account
                    ? { flexDirection: 'row', w: 'auto', h: '48px', pt: '16px' }
                    : { flexDirection: 'row', w: 'auto', gap: '8px' }
                }
              >
                <TierBadge
                  tier={tier.name}
                  initial={tier.initial}
                  placement={account ? 'side' : 'compact'}
                />
                <ContentHeader
                  title={tier.name}
                  titleAs="h3"
                  titleProps={{ web: 'h10B', mo: 'h7B' }}
                  gap="0"
                />
              </Stack>
              <Stack gap="16px" flex="1" _mobile={{ gap: account ? '8px' : '16px' }}>
                <Typography
                  as="p"
                  web={account && tier.name !== 'RUNNER' ? 'b2B' : 'b2M'}
                  mo={account ? 'b4B' : 'b4M'}
                  className={styles.supportBody}
                >
                  {tier.requirement}
                </Typography>
                <Stack
                  as="ol"
                  gap={!account && tier.name === 'ELITE' ? '12px' : '8px'}
                  listStyleType="none"
                  _mobile={{ gap: account ? '4px' : '8px' }}
                >
                  {tier.benefits.map((benefit, index) => (
                    <HStack as="li" key={benefit.title} gap="4px" alignItems="flex-start">
                      <Typography
                        web={account ? 'b4M' : 'b4'}
                        mo="b6"
                        language={account ? 'ko' : 'auto'}
                        className={styles.supportBody}
                      >
                        {index + 1}.
                      </Typography>
                      <Stack gap="8px" minW="0">
                        <Typography as="p" web="b4M" mo="b6" className={styles.supportBody}>
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
        _mobile={{ gap: account ? '24px' : '16px' }}
        title="HOKA 회원 공통 혜택"
        headerProps={{
          titleAs: 'h2',
          titleProps: {
            web: 'h8',
            mo: 'h8',
            className: account ? styles.accountBenefitHeading : styles.commonBenefitHeading,
          },
        }}
      >
        <Grid
          as="ul"
          columns={2}
          rowGap="0"
          columnGap={account ? '40px' : '0'}
          pb="40px"
          _mobile={{
            gridTemplateColumns: '1fr',
            columnGap: '0',
            rowGap: account ? '0' : '12px',
            pb: '0',
          }}
        >
          {commonBenefits.map((benefit) => {
            const mobile = accountMobile ? benefit.accountMobile : undefined;
            return (
              <Stack
                as="li"
                key={benefit.title}
                minW="0"
                gap="16px"
                position={account ? 'relative' : undefined}
                _mobile={{ gap: account ? '8px' : '12px' }}
                className={account ? styles.accountBenefit : styles.commonBenefit}
              >
                <HStack
                  as="h3"
                  gap="12px"
                  _mobile={{ gap: '8px', alignItems: mobile?.titleLines ? 'flex-start' : 'center' }}
                >
                  <Icon name="ticket-simple-solid" size={20} color="blue.100" />
                  <Typography
                    web="b2M"
                    mo={account ? 'b2B' : 'b4B'}
                    className={account ? styles.accountCouponTitle : undefined}
                  >
                    {mobile?.titleLines?.join('\n') ?? benefit.title}
                  </Typography>
                </HStack>
                <Typography
                  as="p"
                  variant="b6"
                  className={account ? styles.accountBenefitDescription : undefined}
                >
                  {mobile ? (
                    <>
                      {mobile.description ? (
                        <>
                          {mobile.description}
                          <br />
                        </>
                      ) : null}
                      <span className={styles.accountValidity}>{mobile.validity}</span>
                    </>
                  ) : (
                    benefit.description
                  )}
                </Typography>
              </Stack>
            );
          })}
        </Grid>
      </ContentSection>
    </Stack>
  );
}

/** 준비된 누적 구매 진행률과 등급 안내를 표시합니다. (Displays prepared purchase progress and tier guidance.) */
function RewardProgress({
  progress,
  account,
}: {
  progress: NonNullable<OverviewView['tierProgress']>;
  account: boolean;
}) {
  const percent = Number.isFinite(progress.percent)
    ? Math.max(0, Math.min(100, progress.percent))
    : 0;
  const label = progress.label ?? '';
  const [labelAmount = '', labelText = label] =
    account && progress.labelSize !== 'compact'
      ? label.split(/^(\p{Decimal_Number}+(?:[,.]\p{Decimal_Number}+)*)/u).slice(1)
      : [];
  return (
    <Stack
      flex="1"
      minW="0"
      gap="4px"
      justifyContent="center"
      bg="black.10"
      px="32px"
      py="32px"
      _mobile={{ w: 'full', py: '24px', gap: '8px', minH: account ? '159px' : undefined }}
    >
      {label ? (
        <Box
          position="relative"
          h={account ? undefined : '44px'}
          mr={account ? '168px' : '180px'}
          _mobile={{ h: account ? undefined : '47px', mr: '0' }}
        >
          <Box
            position={account ? 'relative' : 'absolute'}
            style={{
              left: `${percent}%`,
              transform: account ? `translateX(-${percent}%)` : undefined,
            }}
            transform={account ? undefined : 'translateX(-50%)'}
            bottom={account ? undefined : '0'}
            maxW={account ? 'min(260px, 100%)' : 'none'}
            w="max-content"
            className={account ? styles.accountTooltip : undefined}
          >
            <Box bg="black.100" color="white" px="12px" py="10px" borderRadius="12px">
              <Typography
                variant={progress.labelSize === 'compact' ? 'b8' : 'b6'}
                language={account ? 'ko' : 'auto'}
              >
                {labelAmount ? (
                  <Typography variant="b6M" language="ko">
                    {labelAmount}
                  </Typography>
                ) : null}
                {labelText}
              </Typography>
            </Box>
            <Box
              mx={account ? undefined : 'auto'}
              position={account ? 'relative' : undefined}
              style={account ? { left: `clamp(6px, ${percent}%, 100% - 6px)` } : undefined}
              transform={account ? 'translateX(-50%)' : undefined}
              w="12px"
              h="6px"
              bg="black.100"
              clipPath="polygon(0 0,100% 0,50% 100%)"
              mt={account ? '0' : '-1px'}
            />
          </Box>
        </Box>
      ) : null}
      <HStack gap="24px" minH="24px" _mobile={{ flexDirection: 'column', alignItems: 'stretch' }}>
        <Box
          flex="1"
          h="8px"
          bg="black.20"
          borderRadius="full"
          position="relative"
          role="progressbar"
          aria-label={label || progress.notice || '등급 산정 구매금액'}
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
            border={account ? '1.5px solid black' : '1px solid black'}
            borderRadius="full"
          />
        </Box>
        <HStack
          gap="6px"
          minW={account ? '144px' : '156px'}
          flexShrink="0"
          whiteSpace="nowrap"
          justifyContent="flex-end"
          _mobile={{ w: 'full', minH: '24px' }}
        >
          {progress.currentAmount ? (
            <Typography
              variant={account ? 'b6M' : 'b6'}
              mo="b6M"
              language={account ? 'en' : 'auto'}
            >
              {progress.currentAmount}
              <Typography variant={account ? 'b6M' : 'b6'}>원</Typography>
            </Typography>
          ) : null}
          {progress.targetAmount ? (
            <>
              <Typography variant={account ? 'b4M' : 'b4'} language={account ? 'ko' : 'auto'}>
                /
              </Typography>
              <Typography variant="b6" tone="subtle" language={account ? 'en' : 'auto'}>
                {progress.targetAmount}
                <Typography variant="b6">원</Typography>
              </Typography>
            </>
          ) : null}
        </HStack>
      </HStack>
      {progress.notice ? (
        <Typography as="p" variant="b8">
          {progress.notice}
        </Typography>
      ) : null}
    </Stack>
  );
}

type MembershipRewardsProps = {
  /** 준비된 개인 등급 표시 데이터이며 null이면 기존 빈 요약을 표시합니다. */
  summary?: MembershipSummaryDisplay | null;
  benefits?: MembershipBenefitsDisplay;
  /** 개인 요약 표시 여부입니다. @default true */
  showSummary?: boolean;
  /** 마이페이지 시안의 배치를 선택합니다. 생략하면 고객센터 공통 배치를 사용합니다. */
  layout?: 'standard' | 'account';
};

/** [ 개발팀 바인딩 ] 두 경로가 같은 개인 요약·등급·혜택 본문을 공유합니다. summary/benefits는 현재 props를 읽고 생략 시 고정 예시를 사용합니다. 공통 혜택의 accountMobile은 마이페이지 모바일에 준비된 줄 구성을 선택하며 생략하면 title/description을 그대로 표시합니다. 고객센터 소유자가 셸의 로그인 표시 상태를 showSummary로 전달합니다. 인증·정책 조회·쿠폰 지급은 없으며 운영 조회·갱신·실패 처리는 각 통합 소유자가 연결해야 합니다. */
/** 개인 회원등급 요약과 공통 혜택 본문을 표시합니다. (Displays the shared personal membership summary and tier benefits.) */
export function MembershipRewards({
  summary = rewardPreview,
  benefits = membershipBenefitsPreview,
  showSummary = true,
  layout = 'standard',
}: MembershipRewardsProps) {
  const account = layout === 'account';
  return (
    <Stack
      as="section"
      aria-label="회원등급 및 혜택"
      gap="48px"
      _mobile={{ gap: account ? '60px' : '40px' }}
    >
      {showSummary ? (
        <Stack gap="32px" _mobile={{ gap: '24px' }}>
          <HStack gap="16px" alignItems="flex-start">
            {summary?.tier ? (
              <TierBadge
                tier={summary.tier}
                initial={summary.tierInitial}
                placement={account ? 'summary' : undefined}
              />
            ) : null}
            <ContentHeader
              title={summary?.tier}
              titleAs="h2"
              titleProps={{ web: 'h4B', mo: 'h1B' }}
              description={
                <>
                  <Typography as="span" web={account ? 'b4' : 'b4B'} mo={account ? 'b6' : 'b6B'}>
                    {summary?.name}
                  </Typography>
                  {summary ? '님의 이번 달 멤버십 등급' : null}
                </>
              }
              descriptionProps={{ web: 'b4', mo: 'b6' }}
              gap="12px"
              pt="12px"
              _mobile={account ? { gap: '8px', pt: '0' } : undefined}
            />
          </HStack>
          <Stack gap="12px">
            <HStack
              gap="8px"
              alignItems="stretch"
              _mobile={{ flexDirection: 'column', gap: '12px' }}
            >
              {summary?.tierProgress ? (
                <RewardProgress progress={summary.tierProgress} account={account} />
              ) : null}
              <Stack
                bg="black.10"
                p="32px"
                gap="12px"
                w={summary?.tierProgress ? '240px' : 'full'}
                minH="133px"
                justifyContent="space-between"
                alignItems={account ? 'flex-end' : undefined}
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
                  <Typography
                    web="h10B"
                    mo={account ? 'b4B' : 'h8'}
                    className={account ? styles.accountPurchaseAmount : undefined}
                  >
                    {summary?.purchaseAmount}
                  </Typography>
                  <Typography variant="b4">원</Typography>
                </HStack>
              </Stack>
            </HStack>
            {account ? (
              <Typography as="p" web="b6" mo="b7" tone="tertiary">
                매월 3일, 전월 말일까지를 기준으로 최근 1년간의 구매 금액으로 회원 등급 산정
                <br />※ 현재 구매금액은 실제 구매 확정 금액을 기준으로 표시되며, 등급별 기준 금액을
                초과한 경우에도 실제 금액으로 표시됩니다.
              </Typography>
            ) : (
              <Typography as="p" web="b6" mo="b7" tone="tertiary">
                * 매월 1일, 전월 말일자부터 최근 1년 내 구매 금액으로 산정
              </Typography>
            )}
          </Stack>
        </Stack>
      ) : null}
      <RewardBenefits display={benefits} account={account} />
    </Stack>
  );
}
