'use client';

import Image from 'next/image';

import { type ReactNode } from 'react';
import { type Platform, usePlatform } from '@/context/platform';

import { css, cva } from 'styled-system/css';
import { Box, Center, Grid, HStack, Stack } from 'styled-system/jsx';

import { Badge } from '@/components/common/atoms/Badge';
import { Button } from '@/components/common/atoms/Button';
import { DescriptionList } from '@/components/common/atoms/DescriptionList';
import { Typography } from '@/components/common/atoms/Typography';

import { ContentHeader } from '@/components/common/molecules/ContentHeader';
import { HomeCarouselSection } from '@/components/common/molecules/HomeCarouselSection';
import { ProductCard } from '@/components/common/molecules/ProductCard/ProductCard';

import { ContentSection } from '@/components/common/layouts/ContentSection';
import { ModalDialog } from '@/components/common/layouts/ModalDialog';
import { OrderActionBar } from '@/components/common/layouts/OrderActionBar';

import {
  runningSessionImage,
  type RunningSessionSession,
  sessionNotices,
  sessionPrecautions,
} from '@/components/running-session/runningSession.data';
import { type Product } from '@/mocks/products';

const applyButton = css({
  w: '260px',
  '--button-height': '48px!',
  '& > span': { w: '100%' },
  _mobile: {
    w: '100%',
    '--button-height': '48px!',
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
    <Stack
      as="aside"
      gap="16px"
      m="0"
      color="var(--color-text-tertiary)"

      aria-label={precautions ? '주의 사항' : '안내 사항'}
    >
      <Typography as="p" variant="body4" mo="body5" className={css({ m: '0' })}>
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
    </Stack>
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
        py: '32px',
        display: 'grid',
        rowGap: '24px',
        borderBlock: '1px solid var(--color-border-default)',
        _mobile: {
          py: '32px',
        },
      },
      guide: {},
    },
  },
});

/** 런클럽 세션 정보를 요약 행으로 표시합니다. (Displays run club session facts as summary rows.) */
function RunningSessionFacts({
  rows,
  variant,
}: {
  rows: RunningSessionFact[];
  variant: 'hero' | 'guide';
}) {
  return (
    <DescriptionList
      items={rows.map(({ label, value, detail, mobileOnly }) => ({
        term: label,
        description: (
          <>
            {value}
            {detail ? (
              <Typography as="span" variant="body4" tone="tertiary" className={detailText}>
                {detail}
              </Typography>
            ) : null}
          </>
        ),
        rowClassName: mobileOnly
          ? css({ display: 'none!', _mobile: { display: 'grid!' } })
          : undefined,
      }))}
      termProps={{
        variant: variant === 'hero' ? 'body3' : 'body4',
        mo: variant === 'hero' ? 'body3' : 'body4',
        weight: variant === 'hero' ? 'semibold' : 'regular',
      }}
      descriptionProps={{
        variant: variant === 'hero' ? 'body3' : 'body4',
        mo: variant === 'hero' ? 'body3' : 'body4',
        tone: undefined,
      }}
      slotStyles={{
        root: css.raw(facts.raw({ variant }), {
          display: variant === 'hero' ? 'grid' : 'block',
          gridTemplateColumns: 'none',
          gap: variant === 'hero' ? '24px normal' : 'normal',
        }),
        row: css.raw({
          display: 'grid',
          gridTemplateColumns: variant === 'hero' ? '58px minmax(0, 1fr)' : '60px minmax(0, 1fr)',
          gap: '16px',
          py: variant === 'hero' ? '0' : '24px',
          borderTop: variant === 'guide' ? '1px solid var(--color-border-default)' : undefined,
          _last:
            variant === 'guide'
              ? { borderBottom: '1px solid var(--color-border-default)' }
              : undefined,
          _mobile: { py: variant === 'hero' ? '0' : '24px' },
        }),
        description: css.raw({ m: '0' }),
      }}
    />
  );
}

const detailText = css({ display: 'block', mt: '4px' });

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
export function RunningSessionSessionHero({
  session,
  rows,
  onApply,
  pending,
}: RunningSessionSessionHeroProps) {
  const upcoming = session.status === 'upcoming';
  const mobile = usePlatform() === 'mobile';

  return (
    <Grid
      as="section"
      gridTemplateColumns="1fr 1fr"
      gap="60px"
      w="min(calc(100% - 110px), 1340px)"
      mx="auto"
      py="96px"
      alignItems="start"
      _mobile={{ w: '100%', gridTemplateColumns: '1fr', gap: '0', py: '0' }}
    >
      <Image
        className={styles.image}
        src={runningSessionImage(session.detailImage)}
        alt={`${session.title} 러닝 현장`}
        width={544}
        height={544}
        sizes={
          mobile
            ? '100vw'
            : '(max-width: 1199px) 515px, (max-width: 1450px) calc((100vw - 170px) / 2), 640px'
        }
      />
      <Stack gap="32px" _mobile={{ px: '4', pt: '4', pb: '72px' }}>
        <Stack gap="12px" _mobile={{ gap: '18px' }}>
          <HStack>
            <Badge runningSessionCategory={session.category} />
          </HStack>
          <ContentHeader
            gap="16px"
            _mobile={{ gap: '8px' }}
            title={session.title}
            titleAs="h1"
            titleProps={{ variant: 'heading6', mo: 'heading4', weight: 'black' }}
            description={
              <>
                {session.schedule} | {session.location} {session.distance}
              </>
            }
            descriptionProps={{ variant: 'body2', mo: 'body3' }}
          />
        </Stack>
        {upcoming && session.applicationOpeningLabel ? (
          <Typography as="p" variant="body4" weight="bold" className={styles.opening}>
            ⓘ {session.applicationOpeningLabel}
          </Typography>
        ) : null}
        <RunningSessionFacts variant="hero" rows={rows} />
        <RunningSessionSessionNotes />
        <Box mt="8px" _mobile={{ display: 'none' }}>
          <RunningSessionApplyButton status={session.status} onApply={onApply} pending={pending} />
        </Box>
      </Stack>
    </Grid>
  );
}

type Props = { session: Pick<RunningSessionSession, 'category' | 'overlayDate'> };

/** 세션 카테고리에 맞는 홍보 제목과 날짜를 표시합니다. (Displays a promotional title and date for the session category.) */
function RunningSessionSessionPoster({ session }: Props) {
  return (
    <ContentSection
      color="var(--color-blue-100)"
      gap="56px"
      _mobile={{ gap: '24px' }}
      title={
        <>
          {session.category === 'Trail'
            ? 'Bugaksan Uphill Interval Session'
            : 'HOKA Night City Run'}
        </>
      }
      headerProps={{
        gap: '40px',
        _mobile: { gap: '20px' },
        eyebrow: <>Hoka Run Club</>,
        eyebrowProps: { variant: 'heading5', mo: 'heading4', weight: 'black' },
        titleAs: 'h2',
        titleProps: {
          variant: 'heading1',
          mo: 'heading2',
          weight: 'black',
          className: css({ overflowWrap: 'anywhere' }),
        },
      }}
    >
      <Typography as="span" variant="body1" mo="body3">
        {session.overlayDate}
        <br />
        @hoka_kr
      </Typography>
    </ContentSection>
  );
}

type RunningSessionSessionGuideContentProps = { title: string; rows: RunningSessionGuideRow[] };

/** 런클럽 세션 안내와 정보 행을 구성합니다. (Composes run club session guidance and fact rows.) */
function RunningSessionSessionGuideContent({
  title,
  rows,
}: RunningSessionSessionGuideContentProps) {
  return (
    <Stack maxW="640px" gap="32px" _mobile={{ maxW: 'none' }}>
      <ContentSection
        gap="32px"
        title="세션 안내"
        headerProps={{
          gap: '4',
          titleProps: { variant: 'heading7', mo: 'heading6' },
          description: (
            <>
              호카 런 클럽 {title}에서
              <br />
              러너들과 함께 달리며 그룹 러닝의 즐거움을 느껴보세요!
            </>
          ),
          descriptionProps: { variant: 'body3' },
        }}
      >
        <RunningSessionFacts variant="guide" rows={rows} />
      </ContentSection>
      <RunningSessionSessionNotes precautions />
    </Stack>
  );
}

export type RunningSessionGuideRow = { label: string; value: string };

type RunningSessionSessionGuideProps = {
  session: RunningSessionSession;
  rows: RunningSessionGuideRow[];
};

/** 런클럽 세션 안내를 구성합니다. (Composes the run club session guide.) */
export function RunningSessionSessionGuide({ session, rows }: RunningSessionSessionGuideProps) {
  return (
    <Box
      as="section"
      bg="var(--color-black-10)"
      py="96px"
      _mobile={{ pt: '48px', pb: '72px' }}
      aria-label="세션 안내"
    >
      <Grid
        w="min(calc(100% - 144px), 1558px)"
        ml="max(72px, calc((100% - 1776px) / 2))"
        gridTemplateColumns="minmax(0, 858fr) minmax(0, 640fr)"
        gap="60px"
        _mobile={{
          w: '100%',
          ml: '0',
          px: 'var(--layout-mobile-inline-gutter)',
          gridTemplateColumns: '1fr',
          gap: '64px',
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
      my="96px"
      aspectRatio="2.6667"
      bg="var(--color-black-40)"
      _mobile={{
        w: 'auto',
        mx: 'var(--layout-mobile-inline-gutter)',
        my: '10',
        aspectRatio: '1.5',
      }}
    >
      <Typography
        variant="heading7"
        mo="body2"
        weight="medium"
        className={css({ '&&': { fontSize: '34px' } })}
      >
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
export function RunningSessionRecommendations({
  products,
  platform,
}: RunningSessionRecommendationsProps) {
  return (
    <Box
      as="section"
      pb="192px"
      overflow="hidden"
      _mobile={{ py: '10' }}
      css={{
        '--layout-web-content-max-width': '1776px',
        '--layout-web-content-inline-space': '144px',
      }}
    >
      <HomeCarouselSection
        title="로드 러닝 Essential"
        titleVariant="heading6"
        itemCount={products.length}
        platform={platform}
        slideClassName={platform === 'mobile' ? mobileSlide : undefined}
        desktopCenteredItemCount={5}
        desktopItemGutter={8}
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
      <Typography
        as="p"
        variant="body3"
        className={RunningSessionApplicationNoticeStyles.modalText}
      >
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
    <Box as="main" _mobile={{ '& ~ footer': { mb: 'calc(96px + env(safe-area-inset-bottom))' } }}>
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
export function RunningSessionFixedActionBar({
  status,
  onApply,
  pending,
}: RunningSessionFixedActionBarProps) {
  return (
    <OrderActionBar variant="mobileOnly" as="section" ariaLabel="세션 신청">
      <RunningSessionApplyButton status={status} onApply={onApply} pending={pending} />
    </OrderActionBar>
  );
}
