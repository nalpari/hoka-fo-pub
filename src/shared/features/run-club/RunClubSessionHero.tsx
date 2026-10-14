import { css } from 'styled-system/css';
import { Button } from '@/shared/components/atoms/Button/Button';
import { Typography } from '@/shared/components/atoms/Typography/Typography';
import { runClubImage, runClubVenue, runClubAddress, type RunClubSession } from './runClub.data';
import { RunClubBadge } from './RunClubBadge';
import { RunClubSessionNotes } from './RunClubSessionNotes';

const styles = {
  hero: css({
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '60px',
    w: 'min(calc(100% - 110px), 1340px)',
    mx: 'auto',
    py: '72px',
    alignItems: 'center',
    _mobile: {
      w: '100%',
      gridTemplateColumns: '1fr',
      gap: '28px',
      px: 'var(--layout-mobile-inline-gutter)',
      py: '32px',
    },
  }),
  image: css({ w: '100%', h: 'auto', aspectRatio: '1', objectFit: 'cover', display: 'block' }),
  heading: css({
    m: '12px 0 10px',
  }),
  schedule: css({ m: '0 0 24px', fontSize: '16px' }),
  opening: css({ color: 'var(--color-blue-100)', fontSize: '14px', mb: '24px' }),
  facts: css({
    m: '0',
    py: '20px',
    borderBlock: '1px solid var(--color-border-default)',
    fontSize: '16px',
    '& > div': {
      display: 'grid',
      gridTemplateColumns: '64px minmax(0, 1fr)',
      gap: '8px',
      py: '6px',
    },
    '& dt': { fontWeight: '700' },
    '& dd': { m: '0', lineHeight: '1.6' },
    '& small': { display: 'block', color: 'var(--color-text-tertiary)', fontSize: '14px' },
  }),
  apply: css({ w: '260px', '& > span': { w: '100%' }, _mobile: { w: '100%' } }),
};

type RunClubSessionHeroProps = { session: RunClubSession; onApply: () => void };

export function RunClubSessionHero({ session, onApply }: RunClubSessionHeroProps) {
  const upcoming = session.status === 'upcoming';

  return (
    <section className={styles.hero}>
      <img
        className={styles.image}
        src={runClubImage(session.detailImage)}
        alt={`${session.title} 러닝 현장`}
        width={544}
        height={544}
      />
      <div>
        <RunClubBadge category={session.category} />
        <Typography as="h1" variant="sessionTitle" className={styles.heading}>
          {session.title}
        </Typography>
        <p className={styles.schedule}>
          {session.schedule} | {session.location} {session.distance}
        </p>
        {upcoming ? <p className={styles.opening}>ⓘ 1월 23일 (토) 10:00 신청 시작</p> : null}
        <dl className={styles.facts}>
          <div>
            <dt>일시</dt>
            <dd>{session.schedule}</dd>
          </div>
          <div>
            <dt>장소</dt>
            <dd>
              {runClubVenue}
              <small>{runClubAddress}</small>
            </dd>
          </div>
          <div>
            <dt>예약금</dt>
            <dd>
              5,000원
              <small>
                노쇼 방지를 위해 예약금을 받고 있습니다. 현장 출석 확인 후 자동 취소 됩니다.
              </small>
            </dd>
          </div>
          <div>
            <dt>신청 기간</dt>
            <dd>1월 23일 (토) - 1월 29일 (금)</dd>
          </div>
        </dl>
        <RunClubSessionNotes />
        <Button
          variant="primary"
          className={styles.apply}
          disabled={session.status !== 'open'}
          onClick={onApply}
        >
          {session.status === 'closed'
            ? '모집 마감'
            : upcoming
              ? '신청이 곧 시작됩니다.'
              : '신청하기'}
        </Button>
      </div>
    </section>
  );
}
