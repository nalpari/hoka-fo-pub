import { css } from 'styled-system/css';
import { sessionNotices, sessionPrecautions } from './runClub.data';
import { Typography } from '@/shared/components/atoms/Typography/Typography';

const styles = {
  notes: css({
    my: '24px',
    color: 'var(--color-text-tertiary)',
    '& p': { m: '0 0 6px' },
    '& ul': { listStyle: 'none', p: '0', m: '0' },
    '& li::before': { content: '"- "' },
    _mobile: { mt: '8', mb: '6' },
  }),
};

export function RunClubSessionNotes({ precautions = false }: { precautions?: boolean }) {
  return (
    <aside className={styles.notes} aria-label={precautions ? '주의 사항' : '안내 사항'}>
      <Typography as="p" variant="body4" mo="body5" weight="bold">
        {precautions ? '주의 사항' : '안내 사항'} ⓘ
      </Typography>
      <ul>
        {(precautions ? sessionPrecautions : sessionNotices).map((notice) => (
          <Typography as="li" variant="sessionNote" key={notice}>
            {notice}
          </Typography>
        ))}
      </ul>
    </aside>
  );
}
