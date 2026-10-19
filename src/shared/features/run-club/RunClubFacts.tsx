import type { ReactNode } from 'react';
import { css, cva } from 'styled-system/css';
import { Box, Grid } from 'styled-system/jsx';
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
  },
  variants: {
    variant: {
      hero: {
        py: '5',
        borderBlock: '1px solid var(--color-border-default)',
        _mobile: {
          py: '5',
        },
      },
      guide: {},
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
        <Grid
          key={label}
          display={mobileOnly ? 'none!' : 'grid'}
          gridTemplateColumns="64px minmax(0, 1fr)"
          gap={variant === 'hero' ? '2' : '4'}
          py={variant === 'hero' ? '1.5' : '4'}
          borderTop={variant === 'guide' ? '1px solid var(--color-border-default)' : undefined}
          _last={
            variant === 'guide'
              ? { borderBottom: '1px solid var(--color-border-default)' }
              : undefined
          }
          _mobile={{
            display: mobileOnly ? 'grid!' : undefined,
            gridTemplateColumns: '62px minmax(0, 1fr)',
            gap: '3',
            py: variant === 'hero' ? '1.5' : '5',
          }}
        >
          <Typography
            as="dt"
            variant={variant === 'hero' ? 'body3' : 'body4'}
            mo="body4"
            weight="bold"
          >
            {label}
          </Typography>
          <Typography
            as="dd"
            variant={variant === 'hero' ? 'sessionFactBody' : 'sessionGuideBody'}
            className={css({ m: '0' })}
          >
            {value}
            {detail ? (
              <Typography as="span" variant="body4" tone="tertiary" className={detailText}>
                {detail}
              </Typography>
            ) : null}
          </Typography>
        </Grid>
      ))}
    </Box>
  );
}

const detailText = css({ display: 'block' });
