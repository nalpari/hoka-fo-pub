import type { Product } from '@/mocks/products';
import { Box, Grid } from 'styled-system/jsx';
import { Typography } from '@/shared/components/atoms/Typography/Typography';
import { css } from 'styled-system/css';

type ProductSpecsProps = Pick<Product, 'cushioning' | 'stability' | 'width' | 'use'>;

const labels = [
  ['쿠셔닝', 'cushioning'],
  ['안정성', 'stability'],
  ['발볼', 'width'],
  ['추천 용도', 'use'],
] as const;

export function ProductSpecs({ cushioning, stability, width, use }: ProductSpecsProps) {
  const values = { cushioning, stability, width, use };

  return (
    <Grid as="dl" gridTemplateColumns="1fr 1fr" my="5" borderTop="1px solid var(--color-black-100)">
      {labels.map(([label, key]) => (
        <Box py="2.5" borderBottom="1px solid var(--color-black-20)" key={key}>
          <Typography as="dt" variant="body5" tone="tertiary">
            {label}
          </Typography>
          <Typography as="dd" variant="heading9" className={css({ mt: '1' })}>
            {values[key]}
          </Typography>
        </Box>
      ))}
    </Grid>
  );
}
