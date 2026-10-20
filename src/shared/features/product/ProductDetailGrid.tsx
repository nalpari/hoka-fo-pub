import type { ReactNode } from 'react';
import { Grid } from 'styled-system/jsx';

export function ProductDetailGrid({ children }: { children: ReactNode }) {
  return (
    <Grid
      w="min(calc(100% - var(--layout-web-content-inline-space)), var(--layout-web-content-max-width))"
      mx="auto"
      gridTemplateColumns="minmax(0, 2fr) minmax(340px, .96fr)"
      gap="8"
      _mobile={{ display: 'block', w: '100%' }}
    >
      {children}
    </Grid>
  );
}
