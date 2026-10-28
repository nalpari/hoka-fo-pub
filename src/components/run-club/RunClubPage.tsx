'use client';

import Image from 'next/image';
import Link from 'next/link';

import { type ReactNode, useState } from 'react';

import { css } from 'styled-system/css';
import {
  Box,
  Center,
  Flex,
  Grid,
  HStack,
  LinkOverlay,
  Square,
  Stack,
  VStack,
} from 'styled-system/jsx';

import { Button, ButtonLink } from '@/components/common/atoms/Button/Button';
import { EmptyState } from '@/components/common/atoms/EmptyState';
import { SegmentedControl } from '@/components/common/atoms/SegmentedControl';
import { Typography } from '@/components/common/atoms/Typography';

import { ContentHeader } from '@/components/common/molecules/ContentHeader';

import { ContentSection } from '@/components/common/layouts/ContentSection';

import {
  runClubImage,
  type RunClubSession,
  runClubSessions,
} from '@/components/run-club/runClub.data';
import { RunClubBadge } from '@/components/run-club/RunClubBadge';

function RunClubHistoryLink({ compact = false }: { compact?: boolean }) {
  return (
    <Flex justifyContent="flex-end">
      <ButtonLink href="/mypage/event-entries" variant="link" size={compact ? 'sm' : 'lg'}>
        세션 신청 내역
      </ButtonLink>
    </Flex>
  );
}

type RunClubFilter = 'all' | RunClubSession['category'];

type RunClubFiltersProps = {
  filter: RunClubFilter;
  onFilterChange: (filter: RunClubFilter) => void;
};

const filters = [
  { value: 'all', label: '전체보기', mobileLabel: '전체' },
  { value: 'Road', label: '로드 러닝', mobileLabel: '로드 러닝' },
  { value: 'Trail', label: '트레일 러닝', mobileLabel: '트레일 러닝' },
] as const;

const filterButton = css({
  minW: '120px',
  '& > span': { w: '100%' },
  _mobile: {
    minW: '0',
    '--button-height': '32px!',
    '--button-padding-x': '16px!',
    '--button-label-size': '14px!',
  },
});

const options = filters.map(({ value, label, mobileLabel }) => ({
  value,
  label: (
    <>
      <Typography as="span" className={css({ _mobile: { display: 'none' } })}>
        {label}
      </Typography>
      <Typography as="span" className={css({ display: 'none', _mobile: { display: 'inline' } })}>
        {mobileLabel}
      </Typography>
    </>
  ),
}));

function RunClubFilters({ filter, onFilterChange }: RunClubFiltersProps) {
  return (
    <SegmentedControl
      unstyled
      ariaLabel="러닝 유형"
      options={options}
      value={filter}
      onValueChange={onFilterChange}
      className={css({ display: 'flex', alignItems: 'center', gap: '4', _mobile: { gap: '2' } })}
      itemClassName={() => filterButton}
      itemRender={(option) => (
        <Button size="short" variant={filter === option.value ? 'primary' : 'secondary'} />
      )}
    />
  );
}

type RunClubHeaderProps = {
  filter: RunClubFilter;
  onFilterChange: (filter: RunClubFilter) => void;
};

function RunClubHeader({ filter, onFilterChange }: RunClubHeaderProps) {
  return (
    <ContentSection
      as="header"
      gap="10"
      _mobile={{ alignItems: 'stretch', gap: '10', px: '4', pb: '4' }}
      alignItems="center"
      title="HOKA Run Club"
      headerProps={{
        gap: '8',
        _mobile: { gap: '4' },
        css: css.raw({
          alignItems: 'center',
          textAlign: 'center',
          _mobile: { alignItems: 'flex-start', textAlign: 'left' },
        }),
        titleAs: 'h1',
        titleProps: { variant: 'heading5', mo: 'heading4' },
        description: (
          <>
            경쾌한 도심의 로드 러닝부터 거친 트레일까지.
            <br />
            당신의 모든 러닝을{' '}
            <Typography as="span" variant="body3">
              HOKA Run Club
            </Typography>
            과 함께하세요.
          </>
        ),
        descriptionProps: { variant: 'body3' },
      }}
    >
      <HStack gap="4" _mobile={{ gap: '2', justifyContent: 'space-between', flexWrap: 'wrap' }}>
        <RunClubFilters filter={filter} onFilterChange={onFilterChange} />
        <HStack display="none" _mobile={{ display: 'flex' }}>
          <RunClubHistoryLink compact />
        </HStack>
      </HStack>
    </ContentSection>
  );
}

type RunClubLayoutProps = { header: ReactNode; children: ReactNode; empty?: boolean };

function RunClubLayout({ header, children, empty = false }: RunClubLayoutProps) {
  return (
    <VStack
      as="main"
      gap="4"
      w="min(calc(100% - var(--layout-web-content-inline-space)), var(--layout-web-content-max-width))"
      mx="auto"
      pt="88px"
      pb="24"
      _mobile={{ w: '100%', gap: '0', pt: '12', pb: empty ? '0' : '16', alignItems: 'stretch' }}
    >
      {header}
      <Stack w="100%" maxW="1280px" gap="6" _mobile={{ gap: '0', maxW: 'none' }}>
        {!empty ? (
          <Stack _mobile={{ display: 'none' }}>
            <RunClubHistoryLink />
          </Stack>
        ) : null}
        {children}
      </Stack>
    </VStack>
  );
}

const styles = {
  image: css({
    position: 'relative',
    aspectRatio: '3 / 4',
    overflow: 'hidden',
    borderRadius: '8px',
    _mobile: { aspectRatio: '1', borderRadius: '0' },
    '&::before': {
      bg: 'rgba(0, 0, 0, 0.3)',
    },
  }),
};

/** 세션 이미지 위에 날짜·장소·거리를 겹쳐 표시합니다. (Overlays the session date, location, and distance on its image.) */
function RunClubSessionCardImage({ session }: { session: RunClubSession }) {
  return (
    <LinkOverlay
      as={Link}
      href={`/running/run-club/${session.id}`}
      className={styles.image}
      aria-label={`${session.title} 상세 보기`}
    >
      <Image
        className={css({ w: '100%', h: '100%', objectFit: 'cover' })}
        src={runClubImage(session.image)}
        alt=""
        width={371}
        height={494}
        sizes="(max-width: 767px) 100vw, 25vw"
      />
      <Square pos="absolute" left="0" top="0" w="100%" h="100%">
        <VStack gap="0" color="#fff">
          <Typography variant="heading6" mo="heading4">
            {session.overlayDate}
          </Typography>
          <HStack gap="2">
            <Typography variant="heading6" mo="heading4">
              {session.location}
            </Typography>
            <Typography variant="heading6" mo="heading4">
              {session.distance}
            </Typography>
          </HStack>
        </VStack>
      </Square>
    </LinkOverlay>
  );
}

function RunClubSessionCardContent({ session }: { session: RunClubSession }) {
  return (
    <ContentSection
      gap="6"
      _mobile={{ px: '4' }}
      header={
        <Stack gap="3.5" _mobile={{ gap: '2' }}>
          <Flex justifyContent="flex-start">
            <RunClubBadge category={session.category} />
          </Flex>
          <ContentHeader
            gap="2"
            _mobile={{ gap: '2' }}
            titleAs="h2"
            title={<>{session.title}</>}
            titleProps={{ variant: 'heading7', mo: 'body1', weight: 'black' }}
            description={
              <>
                {session.schedule} | {session.location} {session.distance}
              </>
            }
            descriptionProps={{ variant: 'body3', mo: 'body4' }}
          />
        </Stack>
      }
      footer={
        <ButtonLink
          href={`/running/run-club/${session.id}`}
          variant="primary"
          className={css({ _mobile: { display: 'none' } })}
        >
          자세히 보기
        </ButtonLink>
      }
    />
  );
}

function RunClubSessionCard({ session }: { session: RunClubSession }) {
  return (
    <Stack as="article" gap="5" _mobile={{ gap: '3' }}>
      <RunClubSessionCardImage session={session} />
      <RunClubSessionCardContent session={session} />
    </Stack>
  );
}

function RunClubEmptyState() {
  return (
    <Box role="status">
      <Box _mobile={{ display: 'none' }}>
        <EmptyState title="현재 운영중인 세션이 없습니다." />
      </Box>
      <Center display="none" _mobile={{ display: 'flex', h: '340px', px: '4' }}>
        <Typography as="h2" variant="body1" weight="black">
          현재 운영중인 세션이 없습니다.
        </Typography>
      </Center>
    </Box>
  );
}

function RunClubResults({ sessions }: { sessions: RunClubSession[] }) {
  return sessions.length ? (
    <Grid
      gridTemplateColumns="repeat(4, minmax(0, 1fr))"
      columnGap="4"
      rowGap="24"
      _mobile={{ gridTemplateColumns: '1fr', rowGap: '10' }}
    >
      {sessions.map((session) => (
        <RunClubSessionCard key={session.id} session={session} />
      ))}
    </Grid>
  ) : (
    <RunClubEmptyState />
  );
}

type RunClubPageProps = { sessions?: RunClubSession[] };

/** 런클럽 세션 목록과 필터를 구성합니다 (Displays the run club page composition). */
export function RunClubPage({ sessions = runClubSessions }: RunClubPageProps) {
  const [filter, setFilter] = useState<RunClubFilter>('all');
  const visibleSessions = sessions.filter(
    (session) => filter === 'all' || session.category === filter,
  );

  return (
    <RunClubLayout
      empty={visibleSessions.length === 0}
      header={<RunClubHeader filter={filter} onFilterChange={setFilter} />}
    >
      <RunClubResults sessions={visibleSessions} />
    </RunClubLayout>
  );
}
