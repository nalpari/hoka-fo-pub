import { css } from 'styled-system/css';

import './work-history-animations.css';

// Sound Bars adapted from https://github.com/zzzzshawn/matrix (custom license).
const styles = {
  full: css({
    minH: '100dvh',
    bg: '#f3f5f7',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }),
  status: css({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '14px',
    color: '#416478',
    fontSize: '13px',
    fontWeight: '600',
    py: '24px',
  }),
  dots: css({
    display: 'grid',
    gridTemplateColumns: 'repeat(5, 5px)',
    gap: '3px',
  }),
  column: css({ position: 'relative', display: 'grid', gap: '3px' }),
  litColumn: css({
    position: 'absolute',
    inset: '0',
    display: 'grid',
    gap: '3px',
    animation: 'whSoundBars 1296ms steps(1) infinite',
    '@media (prefers-reduced-motion: reduce)': { animation: 'none', clipPath: 'inset(40% 0 0)' },
  }),
  dot: css({
    w: '5px',
    h: '5px',
    borderRadius: '50%',
    bg: '#416478',
  }),
  dimDot: css({ opacity: '0.08' }),
};

/** 변경 내역 조회 상태를 표시합니다. (Displays the work history loading state.) */
export function WorkHistoryLoading({ full = false }: { readonly full?: boolean }) {
  const status = (
    <div role="status" className={styles.status}>
      <span className={styles.dots} aria-hidden="true">
        {Array.from({ length: 5 }, (_, column) => (
          <span key={column} className={styles.column}>
            {Array.from({ length: 5 }, (_, row) => (
              <span key={row} className={`${styles.dot} ${styles.dimDot}`} />
            ))}
            <span className={styles.litColumn} style={{ animationDelay: `${column * -239}ms` }}>
              {Array.from({ length: 5 }, (_, row) => (
                <span key={row} className={styles.dot} />
              ))}
            </span>
          </span>
        ))}
      </span>
      <span>변경 내역을 불러오는 중입니다.</span>
    </div>
  );

  return full ? <main className={styles.full}>{status}</main> : status;
}
