import { css } from 'styled-system/css';
import type { Product } from '@/mocks/products';
import { Typography } from '@/shared/components/atoms/Typography/Typography';
import { ProductCard } from '@/shared/components/molecules/ProductCard/ProductCard';

const styles = {
  root: css({
    gridColumn: '1 / -1',
    mt: '16',
    _mobile: { mt: '10', px: '4' },
  }),
  title: css({ mb: '5' }),
  rail: css({
    display: 'flex',
    gap: '3',
    overflowX: 'auto',
    '& > *': { flex: '0 0 190px' },
    _mobile: { gap: '2', '& > *': { flexBasis: '118px' } },
  }),
};

type ProductDetailRecommendProps = {
  products: Product[];
};

export function ProductDetailRecommend({ products }: ProductDetailRecommendProps) {
  return (
    <section aria-labelledby="recommendation-title" className={styles.root}>
      <Typography as="h2" variant="heading6" id="recommendation-title" className={styles.title}>
        추천 상품
      </Typography>
      <div className={styles.rail}>
        {products.map((product) => (
          <ProductCard key={product.id} product={product} variant="showcase" />
        ))}
      </div>
    </section>
  );
}
