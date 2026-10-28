import type { ReactNode } from 'react';
import { Grid } from 'styled-system/jsx';
import { Typography } from '@/components/common/atoms/Typography/Typography';

/** Shared geometry for the feature's IMC and external review integration slots. */
export function ProductDetailPlaceholder({ children }: { children: ReactNode }) {
  return (
    <Grid
      gap="normal"
      placeItems="center"
      aspectRatio="2 / 1"
      bg="var(--color-black-10)"
      p="8"
      textAlign="center"
    >
      <Typography variant="heading8">{children}</Typography>
    </Grid>
  );
}
