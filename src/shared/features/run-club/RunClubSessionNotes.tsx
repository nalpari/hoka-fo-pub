import { css } from 'styled-system/css';
import { sessionNotices, sessionPrecautions } from './runClub.data';

const styles = {
  notes: css({
    my: '24px',
    fontSize: '14px',
    color: 'var(--color-text-tertiary)',
    lineHeight: '1.8',
    '& p': { m: '0 0 6px' },
    '& ul': { listStyle: 'none', p: '0', m: '0' },
    '& li::before': { content: '"- "' },
  }),
};

export function RunClubSessionNotes({ precautions = false }: { precautions?: boolean }) {
  return (
    <aside className={styles.notes} aria-label={precautions ? '주의 사항' : '안내 사항'}>
      <p>{precautions ? '주의 사항' : '안내 사항'} ⓘ</p>
      <ul>
        {(precautions ? sessionPrecautions : sessionNotices).map((notice) => (
          <li key={notice}>{notice}</li>
        ))}
      </ul>
    </aside>
  );
}
