import type { ReactNode } from 'react';
import { css, cva } from 'styled-system/css';
import { Box } from 'styled-system/jsx';
import { Typography } from '@/shared/components/atoms/Typography/Typography';

export type RunClubFact = {
  label: string;
  value: ReactNode;
  detail?: ReactNode;
  mobileOnly?: boolean;
};

const facts = cva({
  base: {
    m: '0',
    '& > div': { display: 'grid', gridTemplateColumns: '64px minmax(0, 1fr)' },
    '& dd': { m: '0' },
  },
  variants: {
    variant: {
      hero: {
        py: '5',
        borderBlock: '1px solid var(--color-border-default)',
        '& > div': { gap: '2', py: '1.5' },
        _mobile: {
          py: '5',
          '& > div': { gridTemplateColumns: '62px minmax(0, 1fr)', gap: '3', py: '1.5' },
        },
      },
      guide: {
        '& > div': { gap: '4', py: '4', borderTop: '1px solid var(--color-border-default)' },
        '& > div:last-child': { borderBottom: '1px solid var(--color-border-default)' },
        _mobile: { '& > div': { gridTemplateColumns: '62px minmax(0, 1fr)', gap: '3', py: '5' } },
      },
    },
  },
});

export function RunClubFacts({
  rows,
  variant,
}: {
  rows: RunClubFact[];
  variant: 'hero' | 'guide';
}) {
  return (
    <Box as="dl" className={facts({ variant })}>
      {rows.map(({ label, value, detail, mobileOnly }) => (
        <Box
          key={label}
          display={mobileOnly ? 'none!' : undefined}
          _mobile={mobileOnly ? { display: 'grid!' } : undefined}
        >
          <Typography
            as="dt"
            variant={variant === 'hero' ? 'body3' : 'body4'}
            mo="body4"
            weight="bold"
          >
            {label}
          </Typography>
          <Typography as="dd" variant={variant === 'hero' ? 'sessionFactBody' : 'sessionGuideBody'}>
            {value}
            {detail ? (
              <Typography as="span" variant="body4" tone="tertiary" className={detailText}>
                {detail}
              </Typography>
            ) : null}
          </Typography>
        </Box>
      ))}
    </Box>
  );
}

const detailText = css({ display: 'block' });
