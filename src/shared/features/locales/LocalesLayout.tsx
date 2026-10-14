import type { ReactNode } from 'react';
import { css } from 'styled-system/css';
import { Typography } from '@/shared/components/atoms/Typography/Typography';

const styles = {
  heading: css({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '3',
    minH: '92px',
    bg: 'var(--color-black-10)',
    _mobile: { minH: '15' },
  }),
  globe: css({ w: '7', h: '7', flexShrink: 0 }),
  content: css({
    maxW: '1200px',
    mx: 'auto',
    px: '10',
    pt: '13',
    pb: '18',
    _mobile: { px: 'var(--layout-mobile-inline-gutter)', pt: '11', pb: '12' },
  }),
};

export function LocalesLayout({ children }: { children: ReactNode }) {
  return (
    <main>
      <div className={styles.heading}>
        <svg
          className={styles.globe}
          aria-hidden="true"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.4"
        >
          <circle cx="12" cy="12" r="9" />
          <path d="M3 12h18M12 3c2.7 2.5 4.1 5.5 4.1 9S14.7 18.5 12 21c-2.7-2.5-4.1-5.5-4.1-9S9.3 5.5 12 3" />
        </svg>
        <Typography as="h1" variant="localeHeading">
          Choose your shipping country
        </Typography>
      </div>
      <div className={styles.content}>{children}</div>
    </main>
  );
}
