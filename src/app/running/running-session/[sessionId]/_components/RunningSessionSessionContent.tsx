'use client';

import Image from 'next/image';

import { type ReactNode } from 'react';
import { type Platform } from '@/context/platform';

import { css, cva } from 'styled-system/css';
import { Box, Center, Grid, HStack } from 'styled-system/jsx';

import { Badge } from '@/components/common/atoms/Badge';
import { Button } from '@/components/common/atoms/Button';
import { Typography } from '@/components/common/atoms/Typography';

import { ContentHeader } from '@/components/common/molecules/ContentHeader';
import { HomeCarouselSection } from '@/components/common/molecules/HomeCarouselSection';
import { ProductCard } from '@/components/common/molecules/ProductCard/ProductCard';

import { ContentSection } from '@/components/common/layouts/ContentSection';
import { ModalDialog } from '@/components/common/layouts/ModalDialog';

import {
  runningSessionImage,
  type RunningSessionSession,
  sessionNotices,
  sessionPrecautions,
} from '@/components/running-session/runningSession.data';
import { type Product } from '@/mocks/products';

const applyButton = css({
  w: '260px',
  '& > span': { w: '100%' },
  _mobile: {
    w: '100%',
    '--button-height': '44px!',
    '--button-label-size': '16px!',
    '--button-disabled-bg': 'var(--color-black-20)!',
    '--button-disabled-color': 'var(--color-black-40)!',
  },
});

type RunningSessionApplyButtonProps = {
  status: RunningSessionSession['status'];
  onApply: () => void;
  pending?: boolean;
};

function RunningSessionApplyButton({ status, onApply, pending }: RunningSessionApplyButtonProps) {
  return (
    <Button
      variant="primary"
      className={applyButton}
      disabled={pending || status !== 'open'}
      onClick={onApply}
    >
      {status === 'closed'
        ? '모집 마감'
        : status === 'upcoming'
          ? '신청이 곧 시작됩니다.'
          : '신청하기'}
    </Button>
  );
}

/** 세션 안내 또는 주의 사항 목록을 표시합니다. (Displays a session notice or precaution list.) */
function RunningSessionSessionNotes({ precautions = false }: { precautions?: boolean }) {
  return (
    <Box
      as="aside"
      my="24px"
      color="var(--color-text-tertiary)"
      _mobile={{ mt: '8', mb: '6' }}

      aria-label={precautions ? '주의 사항' : '안내 사항'}
    >
      <Typography as="p" variant="body4" mo="body5" weight="bold" className={css({ m: '0 0 6px' })}>
        {precautions ? '주의 사항' : '안내 사항'} ⓘ
      </Typography>
      <Box as="ul" listStyle="none" p="0" m="0">
        {(precautions ? sessionPrecautions : sessionNotices).map((notice) => (
          <Typography
            as="li"
            variant="body4"
            mo="body5"
            key={notice}
            className={css({ _before: { content: '"- "' } })}
          >
            {notice}
          </Typography>
        ))}
      </Box>
    </Box>
  );
}

export type RunningSessionFact = {
  label: string;
  value: ReactNode;
  detail?: ReactNode;
  mobileOnly?: boolean;
};

const facts = cva({
  base: {
    m: '0',
  },
  variants: {
    variant: {
      hero: {
        py: '5',
        borderBlock: '1px solid var(--color-border-default)',
        _mobile: {
          py: '5',
        },
      },
      guide: {},
    },
  },
});

/** 런클럽 세션 정보를 요약 행으로 표시합니다. (Displays run club session facts as summary rows.) */
function RunningSessionFacts({ rows, variant }: { rows: RunningSessionFact[]; variant: 'hero' | 'guide' }) {
  return (
    <Box as="dl" className={facts({ variant })}>
      {rows.map(({ label, value, detail, mobileOnly }) => (
        <Grid
          key={label}
          display={mobileOnly ? 'none!' : 'grid'}
          gridTemplateColumns="64px minmax(0, 1fr)"
          gap={variant === 'hero' ? '2' : '4'}
          py={variant === 'hero' ? '1.5' : '4'}
          borderTop={variant === 'guide' ? '1px solid var(--color-border-default)' : undefined}
          _last={
            variant === 'guide'
              ? { borderBottom: '1px solid var(--color-border-default)' }
              : undefined
          }
          _mobile={{
            display: mobileOnly ? 'grid!' : undefined,
            gridTemplateColumns: '62px minmax(0, 1fr)',
            gap: '3',
            py: variant === 'hero' ? '1.5' : '5',
          }}
        >
          <Typography
            as="dt"
            variant={variant === 'hero' ? 'body3' : 'body4'}
            mo="body4"
            weight="bold"
          >
            {label}
          </Typography>
          <Typography
            as="dd"
            variant={variant === 'hero' ? 'body3' : 'body4'}
            mo="body4"
            className={css({ m: '0' })}
          >
            {value}
            {detail ? (
              <Typography as="span" variant="body4" tone="tertiary" className={detailText}>
                {detail}
              </Typography>
            ) : null}
          </Typography>
        </Grid>
      ))}
    </Box>
  );
}

const detailText = css({ display: 'block' });

const styles = {
  image: css({ w: '100%', h: 'auto', aspectRatio: '1', objectFit: 'cover', display: 'block' }),
  opening: css({ color: 'var(--color-blue-100)', mb: '24px' }),
};

type RunningSessionSessionHeroProps = {
  session: RunningSessionSession;
  rows: RunningSessionFact[];
  onApply: () => void;
  pending?: boolean;
};

/** 세션 대표 이미지와 일정·신청 정보를 표시합니다. (Displays a session hero image, schedule, and application details.) */
export function RunningSessionSessionHero({ session, rows, onApply, pending }: RunningSessionSessionHeroProps) {
  const upcoming = session.status === 'upcoming';

  return (
    <Grid
      as="section"
      gridTemplateColumns="1fr 1fr"
      gap="60px"
      w="min(calc(100% - 110px), 1340px)"
      mx="auto"
      py="72px"
      alignItems="center"
      _mobile={{ w: '100%', gridTemplateColumns: '1fr', gap: '0', py: '0' }}
    >
      <Image
        className={styles.image}
        src={runningSessionImage(session.detailImage)}
        alt={`${session.title} 러닝 현장`}
        width={544}
        height={544}
        sizes="(max-width: 767px) 100vw, 50vw"
      />
      <Box _mobile={{ px: '4', pt: '4', pb: '10' }}>
        <HStack>
          <Badge runningSessionCategory={session.category} />
        </HStack>
        <ContentHeader
          mt="3"
          mb={{ base: '6', _mobile: '10' }}
          gap="10px"
          title={session.title}
          titleAs="h1"
          titleProps={{ variant: 'heading6', mo: 'heading4', weight: 'black' }}
          description={
            <>
              {session.schedule} | {session.location} {session.distance}
            </>
          }
          descriptionProps={{ variant: 'body3' }}
        />
        {upcoming ? (
          <Typography as="p" variant="body4" weight="bold" className={styles.opening}>
            ⓘ 1월 23일 (토) 10:00 신청 시작
          </Typography>
        ) : null}
        <RunningSessionFacts variant="hero" rows={rows} />
        <RunningSessionSessionNotes />
        <Box _mobile={{ display: 'none' }}>
          <RunningSessionApplyButton status={session.status} onApply={onApply} pending={pending} />
        </Box>
      </Box>
    </Grid>
  );
}

type Props = { session: Pick<RunningSessionSession, 'category' | 'overlayDate'> };

/** 세션 카테고리에 맞는 홍보 제목과 날짜를 표시합니다. (Displays a promotional title and date for the session category.) */
function RunningSessionSessionPoster({ session }: Props) {
  return (
    <ContentSection
      color="var(--color-blue-100)"
      gap="7"
      title={
        <>
          {session.category === 'Trail'
            ? 'Bugaksan Uphill Interval Session'
            : 'HOKA Night City Run'}
        </>
      }
      headerProps={{
        gap: '18px',
        eyebrow: <>Hoka Run Club</>,
        eyebrowProps: { variant: 'body2', web: 'heading6', mo: 'body1', weight: 'black' },
        titleAs: 'h2',
        titleProps: {
          variant: 'heading1',
          mo: 'heading2',
          weight: 'black',
          className: css({ overflowWrap: 'anywhere' }),
        },
      }}
    >
      <Typography as="span" variant="body2" mo="body3">
        {session.overlayDate}
        <br />
        @hoka_kr
      </Typography>
    </ContentSection>
  );
}

type RunningSessionSessionGuideContentProps = { title: string; rows: RunningSessionGuideRow[] };

/** 런클럽 세션 안내와 정보 행을 구성합니다. (Composes run club session guidance and fact rows.) */
function RunningSessionSessionGuideContent({ title, rows }: RunningSessionSessionGuideContentProps) {
  return (
    <Box maxW="640px" _mobile={{ maxW: 'none' }}>
      <ContentSection
        gap={{ base: '20px', _mobile: '6' }}
        title="세션 안내"
        headerProps={{
          gap: '4',
          titleProps: { variant: 'body1', mo: 'body2', weight: 'black' },
          description: (
            <>
              호카 런 클럽 {title}에서
              <br />
              러너들과 함께 달리며 그룹 러닝의 즐거움을 느껴보세요!
            </>
          ),
          descriptionProps: { variant: 'body4' },
        }}
      >
        <RunningSessionFacts variant="guide" rows={rows} />
      </ContentSection>
      <RunningSessionSessionNotes precautions />
    </Box>
  );
}

export type RunningSessionGuideRow = { label: string; value: string };

type RunningSessionSessionGuideProps = { session: RunningSessionSession; rows: RunningSessionGuideRow[] };

/** 런클럽 세션 안내를 구성합니다. (Composes the run club session guide.) */
export function RunningSessionSessionGuide({ session, rows }: RunningSessionSessionGuideProps) {
  return (
    <Box
      as="section"
      bg="var(--color-black-10)"
      py="72px"
      _mobile={{ py: '10' }}
      aria-label="세션 안내"
    >
      <Grid
        w="min(calc(100% - var(--layout-web-content-inline-space)), var(--layout-web-content-max-width))"
        mx="auto"
        gridTemplateColumns="1fr 1fr"
        gap="12"
        _mobile={{
          w: '100%',
          px: 'var(--layout-mobile-inline-gutter)',
          gridTemplateColumns: '1fr',
          gap: '8',
        }}
      >
        <RunningSessionSessionPoster session={session} />
        <RunningSessionSessionGuideContent title={session.title} rows={rows} />
      </Grid>
    </Box>
  );
}

/** 런클럽 세션 대표 이미지 영역을 표시합니다. (Displays the run club session hero image area.) */
export function RunningSessionSessionImage() {
  return (
    <Center
      w="min(calc(100% - 110px), 1776px)"
      mx="auto"
      my="72px"
      aspectRatio="2.77"
      bg="var(--color-black-40)"
      _mobile={{
        w: 'auto',
        mx: 'var(--layout-mobile-inline-gutter)',
        my: '10',
        aspectRatio: '1.5',
      }}
    >
      <Typography variant="heading7" mo="body2" weight="black">
        이미지 영역
      </Typography>
    </Center>
  );
}

const mobileSlide = css({
  w: '176px!',
  '& > *': { w: '100%' },
});

type RunningSessionRecommendationsProps = { products: Product[]; platform: Platform };

/** 추천 런클럽 세션을 표시합니다. (Displays recommended run club sessions.) */
export function RunningSessionRecommendations({ products, platform }: RunningSessionRecommendationsProps) {
  return (
    <Box as="section" py="72px" overflow="hidden" _mobile={{ py: '10' }}>
      <HomeCarouselSection
        title="로드 러닝 Essential"
        titleVariant="heading7"
        itemCount={products.length}
        platform={platform}
        slideClassName={platform === 'mobile' ? mobileSlide : undefined}
        desktopCenteredItemCount={5}
        desktopItemGutter={16}
        mobileItemGutter={8}
      >
        {products.map((product) => (
          <ProductCard key={product.id} product={product} variant="showcase" />
        ))}
      </HomeCarouselSection>
    </Box>
  );
}

const RunningSessionApplicationNoticeStyles = {
  modalText: css({ m: '0 0 24px' }),
};

type RunningSessionApplicationNoticeProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  registered?: boolean;
};

/** 런클럽 신청 안내를 표시합니다. (Displays the run club application notice.) */
export function RunningSessionApplicationNotice({
  open,
  onOpenChange,
  registered,
}: RunningSessionApplicationNoticeProps) {
  return (
    <ModalDialog
      open={open}
      onOpenChange={onOpenChange}
      title="세션 신청 안내"
      closeLabel="세션 신청 안내 닫기"
      size="sm"
      actions={{ kind: 'single', onConfirm: () => onOpenChange(false) }}
    >
      <Typography as="p" variant="body3" className={RunningSessionApplicationNoticeStyles.modalText}>
        {registered ? '세션 신청이 접수되었습니다.' : '신청 기능 준비 중입니다.'}
      </Typography>
    </ModalDialog>
  );
}

type RunningSessionDetailLayoutProps = {
  hero: ReactNode;
  guide: ReactNode;
  desktopContent: ReactNode;
  mobileAction: ReactNode;
  applicationNotice: ReactNode;
};

/** 런클럽 상세 화면의 골격을 구성합니다. (Composes the run club detail layout.) */
export function RunningSessionDetailLayout({
  hero,
  guide,
  desktopContent,
  mobileAction,
  applicationNotice,
}: RunningSessionDetailLayoutProps) {
  return (
    <Box as="main" _mobile={{ '& ~ footer': { mb: 'calc(92px + env(safe-area-inset-bottom))' } }}>
      {hero}
      {guide}
      <Box _mobile={{ display: 'none' }}>{desktopContent}</Box>
      {mobileAction}
      {applicationNotice}
    </Box>
  );
}

type RunningSessionFixedActionBarProps = {
  status: RunningSessionSession['status'];
  onApply: () => void;
  pending?: boolean;
};

/** 런클럽 상세의 고정 액션 영역을 표시합니다. (Displays the fixed run club detail action area.) */
export function RunningSessionFixedActionBar({ status, onApply, pending }: RunningSessionFixedActionBarProps) {
  return (
    <Box
      as="section"
      aria-label="세션 신청"
      display="none"
      _mobile={{
        display: 'block',
        position: 'fixed',
        bottom: '0',
        insetInline: '0',
        zIndex: '20',
        bg: 'white.0',
        borderTop: '1px solid var(--color-border-default)',
        px: '4',
        pt: '4',
        pb: 'max(32px, env(safe-area-inset-bottom))',
      }}
    >
      <RunningSessionApplyButton status={status} onApply={onApply} pending={pending} />
    </Box>
  );
}
