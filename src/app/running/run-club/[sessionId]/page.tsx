'use client';

import {
  sessionNotices,
  sessionPrecautions,
  type RunClubSession,
  runClubImage,
  runClubSessions,
  runClubVenue,
  runClubAddress,
} from '@/components/run-club/runClub.data';
import { Typography } from '@/components/common/atoms/Typography/Typography';
import { Box, Grid, HStack, Center } from 'styled-system/jsx';
import { css, cva } from 'styled-system/css';
import { Button } from '@/components/common/atoms/Button/Button';
import { type ReactNode, useContext, useEffect, useState } from 'react';
import { ContentHeader } from '@/components/common/molecules/ContentHeader/ContentHeader';
import Image from 'next/image';
import { RunClubBadge } from '@/components/run-club/RunClubBadge';
import { ContentSection } from '@/components/common/layouts/ContentSection/ContentSection';
import { HomeCarouselSection } from '@/components/common/molecules/HomeCarouselSection/HomeCarouselSection';
import { ProductCard } from '@/components/common/molecules/ProductCard/ProductCard';
import { type Product, products } from '@/mocks/products';
import { type Platform } from '@/lib/device';
import { SingleActionDialog } from '@/components/common/molecules/SingleActionDialog/SingleActionDialog';
import { RunClubSessionContext } from '@/components/run-club/RunClubSessionContext';
import { useParams } from 'next/navigation';
import { NotFoundPage } from '@/components/not-found/NotFoundPage';
import { usePlatform } from '@/context/platform';

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

type RunClubApplyButtonProps = {
  status: RunClubSession['status'];
  onApply: () => void;
};

function RunClubApplyButton({ status, onApply }: RunClubApplyButtonProps) {
  return (
    <Button
      variant="primary"
      className={applyButton}
      disabled={status !== 'open'}
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
function RunClubSessionNotes({ precautions = false }: { precautions?: boolean }) {
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

type RunClubFact = {
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
function RunClubFacts({ rows, variant }: { rows: RunClubFact[]; variant: 'hero' | 'guide' }) {
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

type RunClubSessionHeroProps = {
  session: RunClubSession;
  rows: RunClubFact[];
  onApply: () => void;
};

/** 세션 대표 이미지와 일정·신청 정보를 표시합니다. (Displays a session hero image, schedule, and application details.) */
function RunClubSessionHero({ session, rows, onApply }: RunClubSessionHeroProps) {
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
        src={runClubImage(session.detailImage)}
        alt={`${session.title} 러닝 현장`}
        width={544}
        height={544}
        sizes="(max-width: 767px) 100vw, 50vw"
      />
      <Box _mobile={{ px: '4', pt: '4', pb: '10' }}>
        <HStack>
          <RunClubBadge category={session.category} />
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
        <RunClubFacts variant="hero" rows={rows} />
        <RunClubSessionNotes />
        <Box _mobile={{ display: 'none' }}>
          <RunClubApplyButton status={session.status} onApply={onApply} />
        </Box>
      </Box>
    </Grid>
  );
}

type Props = { session: Pick<RunClubSession, 'category' | 'overlayDate'> };

/** 세션 카테고리에 맞는 홍보 제목과 날짜를 표시합니다. (Displays a promotional title and date for the session category.) */
function RunClubSessionPoster({ session }: Props) {
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

type RunClubSessionGuideContentProps = { title: string; rows: RunClubGuideRow[] };

/** 런클럽 세션 안내와 정보 행을 구성합니다. (Composes run club session guidance and fact rows.) */
function RunClubSessionGuideContent({ title, rows }: RunClubSessionGuideContentProps) {
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
        <RunClubFacts variant="guide" rows={rows} />
      </ContentSection>
      <RunClubSessionNotes precautions />
    </Box>
  );
}

type RunClubGuideRow = { label: string; value: string };

type RunClubSessionGuideProps = { session: RunClubSession; rows: RunClubGuideRow[] };

function RunClubSessionGuide({ session, rows }: RunClubSessionGuideProps) {
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
        <RunClubSessionPoster session={session} />
        <RunClubSessionGuideContent title={session.title} rows={rows} />
      </Grid>
    </Box>
  );
}

/** 런클럽 세션 대표 이미지 영역을 표시합니다. (Displays the run club session hero image area.) */
function RunClubSessionImage() {
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

type RunClubRecommendationsProps = { products: Product[]; platform: Platform };

function RunClubRecommendations({ products, platform }: RunClubRecommendationsProps) {
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

const RunClubApplicationNoticeStyles = {
  modalText: css({ m: '0 0 24px' }),
};

type RunClubApplicationNoticeProps = { open: boolean; onOpenChange: (open: boolean) => void };

function RunClubApplicationNotice({ open, onOpenChange }: RunClubApplicationNoticeProps) {
  return (
    <SingleActionDialog
      onConfirm={() => onOpenChange(false)}
      open={open}
      onOpenChange={onOpenChange}
      title="세션 신청 안내"
      closeLabel="세션 신청 안내 닫기"
      size="sm"
    >
      <Typography as="p" variant="body3" className={RunClubApplicationNoticeStyles.modalText}>
        신청 기능 준비 중입니다.
      </Typography>
    </SingleActionDialog>
  );
}

type RunClubDetailLayoutProps = {
  hero: ReactNode;
  guide: ReactNode;
  desktopContent: ReactNode;
  mobileAction: ReactNode;
  applicationNotice: ReactNode;
};

function RunClubDetailLayout({
  hero,
  guide,
  desktopContent,
  mobileAction,
  applicationNotice,
}: RunClubDetailLayoutProps) {
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

type RunClubFixedActionBarProps = {
  status: RunClubSession['status'];
  onApply: () => void;
};

function RunClubFixedActionBar({ status, onApply }: RunClubFixedActionBarProps) {
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
      <RunClubApplyButton status={status} onApply={onApply} />
    </Box>
  );
}

/** 해당 경로의 화면과 상호작용을 구성합니다. (Composes the route screen and its interactions.) */
export default function Page() {
  const suppliedSession = useContext(RunClubSessionContext);
  const { sessionId } = useParams<{ sessionId: string }>();
  const platform = usePlatform();
  const [showApplicationNotice, setShowApplicationNotice] = useState(false);
  const session =
    suppliedSession ?? runClubSessions.find((candidate) => candidate.id === sessionId);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [sessionId]);

  if (!session) return <NotFoundPage />;

  const recommendedProducts = products.slice(0, 6);
  const heroRows: RunClubFact[] = [
    { label: '일시', value: session.schedule },
    { label: '장소', value: runClubVenue, detail: runClubAddress },
    { label: '정원', value: '20명' },
    {
      label: '예약금',
      value: '5,000원',
      detail: '노쇼 방지를 위해 예약금을 받고 있습니다. 현장 출석 확인 후 자동 취소 됩니다.',
    },
    { label: '신청 기간', value: '1월 23일 (토) - 1월 29일 (금)' },
  ];
  const guideRows: RunClubGuideRow[] = [
    { label: '장소', value: `${runClubVenue} · ${runClubAddress}` },
    { label: '체크인', value: '세션 시작 20분 전부터' },
    { label: '소요시간', value: '약 1시간 30분 소요' },
    { label: '코스', value: session.location },
    { label: '페이스', value: '6′30″ / 7′00″ (중급 레벨)' },
    { label: '거리', value: session.distance },
    { label: '준비물', value: '러닝화, 편안한 복장, 헤드 랜턴' },
    { label: '혜택', value: '세션에서 제공되는 선물 & 트라이얼 서비스' },
  ];

  return (
    <RunClubDetailLayout
      hero={
        <RunClubSessionHero
          session={session}
          rows={heroRows}
          onApply={() => setShowApplicationNotice(true)}
        />
      }
      guide={<RunClubSessionGuide session={session} rows={guideRows} />}
      desktopContent={
        <>
          {session.id === 'bukchon-night' ? <RunClubSessionImage /> : null}
          <RunClubRecommendations products={recommendedProducts} platform={platform} />
        </>
      }
      mobileAction={
        <RunClubFixedActionBar
          status={session.status}
          onApply={() => setShowApplicationNotice(true)}
        />
      }
      applicationNotice={
        <RunClubApplicationNotice
          open={showApplicationNotice}
          onOpenChange={setShowApplicationNotice}
        />
      }
    />
  );
}
