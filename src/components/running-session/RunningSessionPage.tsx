'use client';
/** [ 개발팀 바인딩 ] 현재는 준비된 표시 데이터와 고정 상태의 마크업입니다. 입력·선택·열람·열기/닫기만 로컬로 처리하며 인증·조회·저장·삭제·결제·완료 전환은 실행하지 않습니다. 실제 런클럽 연결 소유자가 표시 모델과 식별자·입력/선택 payload, 요청 중/실패/성공/재시도 및 응답 갱신을 별도로 구현해야 합니다. */
import Image from 'next/image';
import Link from 'next/link';

import { type ReactNode, useState } from 'react';
import { usePlatform } from '@/context/platform';

import { css } from 'styled-system/css';
import { Box, Flex, Grid, HStack, LinkOverlay, Square, Stack, VStack } from 'styled-system/jsx';

import { Badge } from '@/components/common/atoms/Badge';
import { Button, ButtonLink } from '@/components/common/atoms/Button';
import { Card } from '@/components/common/atoms/Card';
import { EmptyState } from '@/components/common/atoms/EmptyState';
import { SegmentedControl } from '@/components/common/atoms/SegmentedControl';
import { Typography } from '@/components/common/atoms/Typography';

import { ContentHeader } from '@/components/common/molecules/ContentHeader';

import { ContentSection } from '@/components/common/layouts/ContentSection';

import { type RunningSessionEntry } from '@/components/running-session/runningSession.data';
import {
  runningSessionImage,
  type RunningSessionSession,
  runningSessionSessions,
} from '@/components/running-session/runningSession.data';
function RunningSessionHistoryLink({ compact = false }: { compact?: boolean }) {
  return (
    <Flex justifyContent={compact ? 'flex-start' : 'flex-end'}>
      <ButtonLink href="/mypage/event-entries" variant="link" size={compact ? 'sm' : 'lg'}>
        <Typography variant="eland-session-history" className={css({ display: 'block' })}>
          세션 신청 내역
        </Typography>
      </ButtonLink>
    </Flex>
  );
}
type RunningSessionFilter = 'all' | RunningSessionSession['category'];
type RunningSessionFiltersProps = {
  filter: RunningSessionFilter;
  onFilterChange: (filter: RunningSessionFilter) => void;
  empty?: boolean;
};
const filters = [
  { value: 'all', label: '전체보기', mobileLabel: '전체' },
  { value: 'Road', label: '로드 러닝', mobileLabel: '로드 러닝' },
  { value: 'Trail', label: '트레일 러닝', mobileLabel: '트레일 러닝' },
] as const;
const filterButton = css({
  minW: '0',
  '& > span': { w: '100%' },
  _mobile: {
    minW: '0',
    flex: '1',
    h: '44px',
    p: '12px 8px',
    border: '0',
    borderRadius: '0',
    cursor: 'pointer',
    _focusVisible: { outline: '2px solid {colors.blue.100}', outlineOffset: '-2px' },
  },
});
function RunningSessionFilters({
  filter,
  onFilterChange,
  empty = false,
}: RunningSessionFiltersProps) {
  const mobile = usePlatform() === 'mobile';
  const segmented = mobile || empty;
  const options = filters.map(({ value, label, mobileLabel }) => ({
    value,
    label: (
      <Typography as="span" variant="eland-session-filter">
        {mobile ? mobileLabel : label}
      </Typography>
    ),
  }));
  return (
    <SegmentedControl
      unstyled
      ariaLabel="러닝 유형"
      options={options}
      value={filter}
      onValueChange={onFilterChange}
      className={css({
        display: 'flex',
        alignItems: 'center',
        gap: empty ? '0' : '8px',
        w: empty ? '484px' : undefined,
        maxW: '100%',
        bg: empty ? 'black.20' : undefined,
        _mobile: { w: '100%', gap: '0', bg: 'black.20' },
      })}
      itemClassName={(_, selected) =>
        [
          filterButton,
          segmented &&
            css({
              flex: '1',
              h: '48px',
              p: '12px 8px',
              border: '0',
              borderRadius: '0',
              cursor: 'pointer',
              bg: selected ? 'black.100' : 'black.20',
              color: selected ? 'white.0' : 'black.100',
              fontSize: '14px',
              fontWeight: '500',
              _mobile: { h: '44px', fontSize: '12px' },
            }),
        ]
          .filter(Boolean)
          .join(' ')
      }
      itemRender={
        segmented
          ? undefined
          : (option) => (
              <Button size="short" variant={filter === option.value ? 'primary' : 'secondary'} />
            )
      }
    />
  );
}
type RunningSessionHeaderProps = {
  filter: RunningSessionFilter;
  onFilterChange: (filter: RunningSessionFilter) => void;
  empty?: boolean;
};
function RunningSessionHeader({
  filter,
  onFilterChange,
  empty = false,
}: RunningSessionHeaderProps) {
  return (
    <ContentSection
      as="header"
      gap="10"
      _mobile={{ alignItems: 'stretch', gap: '0', px: '4' }}
      alignItems="center"
      title="HOKA Run Club"
      headerProps={{
        gap: '8',
        _mobile: { gap: '24px', pb: '24px' },
        css: css.raw({
          alignItems: 'center',
          textAlign: 'center',
          _mobile: { alignItems: 'flex-start', textAlign: 'left', maxW: '316px' },
        }),
        titleAs: 'h1',
        titleProps: { variant: 'eland-campaign-title' },
        description: (
          <>
            경쾌한 도심의 로드 러닝부터 거친 트레일까지.
            <br />
            당신의 모든 러닝을{' '}
            <Typography as="span" variant="eland-session-intro-name">
              HOKA Run Club
            </Typography>
            과 함께하세요.
          </>
        ),
        descriptionProps: { variant: 'eland-body' },
      }}
    >
      <Stack gap="0" _mobile={{ w: '100%' }}>
        <Box display="none" _mobile={{ display: 'block', pb: '24px' }}>
          <RunningSessionHistoryLink compact />
        </Box>
        <Box _mobile={{ pt: '16px', pb: empty ? '16px' : '24px' }}>
          <RunningSessionFilters filter={filter} onFilterChange={onFilterChange} empty={empty} />
        </Box>
      </Stack>
    </ContentSection>
  );
}
type RunningSessionLayoutProps = {
  header: ReactNode;
  children: ReactNode;
  empty?: boolean;
};
function RunningSessionLayout({ header, children, empty = false }: RunningSessionLayoutProps) {
  return (
    <VStack
      as="main"
      gap={empty ? '0' : '4'}
      w="min(calc(100% - var(--layout-web-content-inline-space)), var(--layout-web-content-max-width))"
      mx="auto"
      pt="96px"
      pb={empty ? '160px' : '96px'}
      _mobile={{ w: '100%', gap: '0', pt: '12', pb: empty ? '0' : '72px', alignItems: 'stretch' }}
    >
      {header}
      <Stack w="100%" gap="32px" _mobile={{ gap: '0' }}>
        {!empty ? (
          <Stack _mobile={{ display: 'none' }}>
            <RunningSessionHistoryLink />
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
    borderRadius: '0',
    _mobile: { aspectRatio: '1' },
    '&::before': {
      bg: 'rgba(0, 0, 0, 0.3)',
    },
  }),
};
/** 세션 이미지 위에 날짜·장소·거리를 겹쳐 표시합니다. (Overlays the session date, location, and distance on its image.) */
function RunningSessionSessionCardImage({ session }: { session: RunningSessionSession }) {
  const mobile = usePlatform() === 'mobile';
  return (
    <LinkOverlay
      as={Link}
      href={`/running/running-session/${session.id}`}
      className={styles.image}
      aria-label={`${session.title} 상세 보기`}
    >
      <Image
        className={css({ w: '100%', h: '100%', objectFit: 'cover' })}
        src={runningSessionImage(session.image)}
        alt=""
        width={371}
        height={494}
        sizes={
          mobile
            ? '100vw'
            : '(max-width: 1199px) 260.5px, (max-width: 1642px) calc((100vw - 158px) / 4), 371px'
        }
      />
      <Square pos="absolute" left="0" top="0" w="100%" h="100%">
        <VStack gap="8px" color="white.0">
          <Typography variant="eland-session-overlay">{session.overlayDate}</Typography>
          <HStack gap="8px">
            <Typography variant="heading6" mo="heading3">
              {session.location}
            </Typography>
            <Typography variant="eland-session-overlay">{session.distance}</Typography>
          </HStack>
        </VStack>
      </Square>
    </LinkOverlay>
  );
}
function RunningSessionSessionCardContent({ session }: { session: RunningSessionSession }) {
  return (
    <ContentSection
      gap="26px"
      _mobile={{ p: '16px' }}
      header={
        <Stack gap="14px" _mobile={{ gap: '16px' }}>
          <Flex justifyContent="flex-start">
            <Badge
              runningSessionCategory={session.category}
              textProps={{ variant: 'eland-session-badge' }}
            />
          </Flex>
          <ContentHeader
            gap="16px"
            _mobile={{ gap: '2' }}
            titleAs="h2"
            title={<>{session.title}</>}
            titleProps={{
              web: 'headingKr7',
              mo: 'headingKr5',
              language: 'ko',
              style: { fontFamily: 'var(--font-family-korean)' },
            }}
            description={
              <>
                {session.schedule} | {session.location} {session.distance}
              </>
            }
            descriptionProps={{ variant: 'eland-session-card-description' }}
          />
        </Stack>
      }
      footer={
        <ButtonLink
          href={`/running/running-session/${session.id}`}
          variant="primary"
          size="tall"
          className={css({ w: '140px', '& > span': { w: '100%' }, _mobile: { display: 'none' } })}
        >
          <Typography variant="eland-purchase-action">자세히 보기</Typography>
        </ButtonLink>
      }
    />
  );
}
function RunningSessionSessionCard({ session }: { session: RunningSessionSession }) {
  return (
    <Card className={css({ gap: '20px', _mobile: { gap: '0' } })}>
      <RunningSessionSessionCardImage session={session} />
      <RunningSessionSessionCardContent session={session} />
    </Card>
  );
}
function RunningSessionEmptyState() {
  const mobile = usePlatform() === 'mobile';
  return (
    <Box role="status">
      <EmptyState
        title="현재 운영중인 세션이 없습니다."
        titleProps={{
          web: 'headingKr7',
          mo: 'headingKr5',
          className: css({
            '&&': { fontFamily: 'var(--font-family-korean)' },
            _mobile: { color: 'black.60' },
          }),
        }}
        action={mobile ? undefined : <RunningSessionHistoryLink />}
        className={css({
          '&&': {
            h: '516px',
            p: '0',
            gap: '24px',
            alignItems: 'center',
            justifyContent: 'center',
            _mobile: {
              h: '504px',
              px: 'calc(var(--layout-mobile-inline-gutter) + 12px)',
            },
          },
        })}
      />
    </Box>
  );
}
function RunningSessionResults({
  sessions,
  entries,
}: {
  sessions: readonly RunningSessionSession[];
  entries?: readonly RunningSessionEntry[];
}) {
  return sessions.length ? (
    <Grid
      gridTemplateColumns="repeat(4, minmax(0, 1fr))"
      columnGap="4"
      rowGap="24"
      _mobile={{
        gridTemplateColumns: '1fr',
        rowGap: '16px',
        '& > :not(:last-child) article': { pb: '48px' },
      }}
    >
      {sessions.map((session, index) => (
        <Stack key={entries?.[index]?.id ?? session.id} gap="3">
          <RunningSessionSessionCard session={session} />
          {entries?.[index] && (
            <Typography variant="body4" role="status">
              {entries[index].status}
            </Typography>
          )}
        </Stack>
      ))}
    </Grid>
  ) : (
    <RunningSessionEmptyState />
  );
}
type RunningSessionPageProps = {
  sessions?: RunningSessionSession[];
};
/** 런클럽 세션 목록과 필터를 구성합니다 (Displays the run club page composition). */
export function RunningSessionPage({ sessions = runningSessionSessions }: RunningSessionPageProps) {
  const [filter, setFilter] = useState<RunningSessionFilter>('all');
  const entries = undefined;
  const visibleSessions = sessions.filter(
    (session) => filter === 'all' || session.category === filter,
  );
  return (
    <RunningSessionLayout
      empty={visibleSessions.length === 0}
      header={
        <RunningSessionHeader
          filter={filter}
          onFilterChange={setFilter}
          empty={visibleSessions.length === 0}
        />
      }
    >
      {<RunningSessionResults sessions={visibleSessions} entries={entries} />}
    </RunningSessionLayout>
  );
}
