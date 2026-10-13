import { css } from 'styled-system/css';
import type { RunClubSession } from './runClub.data';
import { RunClubSessionNotes } from './RunClubSessionNotes';

const styles = {
  guide: css({ bg: 'var(--color-black-10)', py: '72px', _mobile: { py: '40px' } }),
  guideInner: css({
    w: 'min(calc(100% - 110px), 1776px)',
    mx: 'auto',
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '48px',
    _mobile: {
      w: '100%',
      px: 'var(--layout-mobile-inline-gutter)',
      gridTemplateColumns: '1fr',
      gap: '32px',
    },
  }),
  poster: css({
    color: 'var(--color-blue-100)',
    '& p': { m: '0 0 18px', fontSize: '36px', fontWeight: '900' },
    '& h2': {
      m: '0 0 28px',
      fontSize: '96px',
      fontWeight: '900',
      lineHeight: '1.05',
      letterSpacing: '-0.04em',
      overflowWrap: 'anywhere',
    },
    '& span': { fontSize: '20px' },
    _mobile: {
      '& p': { fontSize: '24px' },
      '& h2': { fontSize: '42px' },
      '& span': { fontSize: '16px' },
    },
  }),
  guideContent: css({
    maxW: '640px',
    '& h2': { m: '0 0 16px', fontSize: '24px', fontWeight: '900' },
    '& > p': { fontSize: '14px', lineHeight: '1.6', mb: '20px' },
    _mobile: { maxW: 'none' },
  }),
  guideFacts: css({
    m: '0',
    fontSize: '14px',
    '& > div': {
      display: 'grid',
      gridTemplateColumns: '64px minmax(0, 1fr)',
      gap: '16px',
      py: '16px',
      borderTop: '1px solid var(--color-border-default)',
    },
    '& > div:last-child': { borderBottom: '1px solid var(--color-border-default)' },
    '& dt': { fontWeight: '700' },
    '& dd': { m: '0', lineHeight: '1.6' },
  }),
};

export type RunClubGuideRow = { label: string; value: string };

type RunClubSessionGuideProps = { session: RunClubSession; rows: RunClubGuideRow[] };

export function RunClubSessionGuide({ session, rows }: RunClubSessionGuideProps) {
  return (
    <section className={styles.guide} aria-label="세션 안내">
      <div className={styles.guideInner}>
        <div className={styles.poster}>
          <p>Hoka Run Club</p>
          <h2>
            {session.category === 'Trail'
              ? 'Bugaksan Uphill Interval Session'
              : 'HOKA Night City Run'}
          </h2>
          <span>
            {session.overlayDate}
            <br />
            @hoka_kr
          </span>
        </div>
        <div className={styles.guideContent}>
          <h2>세션 안내</h2>
          <p>
            호카 런 클럽 {session.title}에서
            <br />
            러너들과 함께 달리며 그룹 러닝의 즐거움을 느껴보세요!
          </p>
          <dl className={styles.guideFacts}>
            {rows.map(({ label, value }) => (
              <div key={label}>
                <dt>{label}</dt>
                <dd>{value}</dd>
              </div>
            ))}
          </dl>
          <RunClubSessionNotes precautions />
        </div>
      </div>
    </section>
  );
}
