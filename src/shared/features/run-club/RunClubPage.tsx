'use client';

import { useState } from 'react';
import { Link } from 'react-router-dom';
import { css, cva } from 'styled-system/css';
import { ButtonLink, Button } from '@/shared/components/atoms/Button/Button';
import { Typography } from '@/shared/components/atoms/Typography/Typography';
import { runClubImage, runClubSessions, type RunClubSession } from './runClub.data';

export const runClubBadge = cva({
  base: {
    display: 'inline-block',
    px: '2',
    py: '1',
    fontSize: '14px',
    fontWeight: '700',
    lineHeight: '1.4',
  },
  variants: {
    category: { Road: { bg: '#dfff00', color: '#000' }, Trail: { bg: '#5d6825', color: '#fff' } },
  },
});

const styles = {
  page: css({
    w: 'min(calc(100% - 110px), 1532px)',
    mx: 'auto',
    pt: '88px',
    pb: '96px',
    _mobile: { w: '100%', px: 'var(--layout-mobile-inline-gutter)', pt: '40px', pb: '56px' },
  }),
  header: css({
    textAlign: 'center',
    mb: '12px',
    '& h1': { m: '0 0 20px' },
    '& p': { m: '0', lineHeight: '1.6' },
  }),
  filters: css({
    display: 'flex',
    justifyContent: 'center',
    gap: '16px',
    mt: '36px',
    _mobile: { gap: '8px', mt: '24px' },
  }),
  filter: css({
    minW: '120px',
    '& > span': { w: '100%' },
    _mobile: { minW: '0', flex: '1', '--button-padding-x': '12px' },
  }),
  history: css({
    display: 'flex',
    justifyContent: 'flex-end',
    mt: '12px',
    mb: '28px',
    fontSize: '16px',
    textDecoration: 'underline',
    textUnderlineOffset: '3px',
    _mobile: { mt: '24px', mb: '20px' },
  }),
  grid: css({
    display: 'grid',
    gridTemplateColumns: 'repeat(4, minmax(0, 1fr))',
    columnGap: '16px',
    rowGap: '96px',
    _mobile: { gridTemplateColumns: '1fr', rowGap: '40px' },
  }),
  image: css({
    position: 'relative',
    display: 'grid',
    placeItems: 'center',
    aspectRatio: '3 / 4',
    overflow: 'hidden',
    borderRadius: '8px',
    '& img': { position: 'absolute', inset: '0', w: '100%', h: '100%', objectFit: 'cover' },
  }),
  dim: css({ position: 'absolute', inset: '0', bg: 'rgba(0, 0, 0, 0.3)' }),
  overlay: css({
    position: 'relative',
    color: '#fff',
    textAlign: 'center',
    fontSize: '32px',
    fontWeight: '900',
    lineHeight: '1.2',
    letterSpacing: '-0.04em',
    _mobile: { fontSize: '32px' },
  }),
  info: css({
    pt: '20px',
    '& h2': {
      m: '12px 0 8px',
      fontSize: '28px',
      fontWeight: '900',
      lineHeight: '1.2',
      letterSpacing: '-0.04em',
    },
    '& p': { m: '0 0 20px', fontSize: '16px' },
  }),
  empty: css({ textAlign: 'center', py: '160px', '& p': { m: '0' }, _mobile: { py: '100px' } }),
};

type RunClubPageProps = { sessions?: RunClubSession[] };

export function RunClubPage({ sessions = runClubSessions }: RunClubPageProps) {
  const [filter, setFilter] = useState<'all' | RunClubSession['category']>('all');
  const visibleSessions = sessions.filter(
    (session) => filter === 'all' || session.category === filter,
  );

  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <Typography as="h1" variant="heading4">
          HOKA Run Club
        </Typography>
        <Typography as="p" variant="body3">
          경쾌한 도심의 로드 러닝부터 거친 트레일까지.
          <br />
          당신의 모든 러닝을 HOKA Run Club과 함께하세요.
        </Typography>
        <div className={styles.filters} role="group" aria-label="러닝 유형">
          {(
            [
              { value: 'all', label: '전체보기' },
              { value: 'Road', label: '로드 러닝' },
              { value: 'Trail', label: '트레일 러닝' },
            ] as const
          ).map(({ value, label }) => (
            <Button
              key={value}
              variant={filter === value ? 'primary' : 'secondary'}
              className={styles.filter}
              aria-pressed={filter === value}
              onClick={() => setFilter(value)}
            >
              {label}
            </Button>
          ))}
        </div>
      </header>
      <div className={styles.history}>
        <Link to="/mypage/event-entries">세션 신청 내역</Link>
      </div>
      {visibleSessions.length ? (
        <div className={styles.grid}>
          {visibleSessions.map((session) => (
            <article key={session.id}>
              <Link
                to={`/running/run-club/${session.id}`}
                className={styles.image}
                aria-label={`${session.title} 상세 보기`}
              >
                <img
                  src={runClubImage(session.image)}
                  alt=""
                  width={371}
                  height={494}
                  loading="lazy"
                />
                <span className={styles.dim} aria-hidden="true" />
                <span className={styles.overlay}>
                  {session.overlayDate}
                  <br />
                  {session.course}
                </span>
              </Link>
              <div className={styles.info}>
                <span className={runClubBadge({ category: session.category })}>
                  {session.category}
                </span>
                <h2>{session.title}</h2>
                <p>
                  {session.schedule} | {session.course}
                </p>
                <ButtonLink to={`/running/run-club/${session.id}`} variant="primary">
                  자세히 보기
                </ButtonLink>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className={styles.empty} role="status">
          <Typography as="p" variant="heading7">
            현재 운영중인 세션이 없습니다.
          </Typography>
        </div>
      )}
    </main>
  );
}
