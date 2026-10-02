import type { Product } from '@/mocks/products';
import { Box, Grid } from 'styled-system/jsx';

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
    <Grid as="dl" gridTemplateColumns="1fr 1fr" my="5" borderTop="1px solid #111">
      {labels.map(([label, key]) => (
        <Box py="2.5" borderBottom="1px solid #ddd" key={key}>
          <Box as="dt" color="#666" fontSize="12px">
            {label}
          </Box>
          <Box as="dd" m="4px 0 0" fontWeight="700">
            {values[key]}
          </Box>
        </Box>
      ))}
    </Grid>
  );
}
