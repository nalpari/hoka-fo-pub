import { css } from 'styled-system/css';
import type { Product } from '@/mocks/products';

const styles = {
  eyebrow: css({ color: '#009dff', fontSize: '13px', fontWeight: '700' }),
  audience: css({ mt: '2', color: '#555', fontSize: '14px' }),
};

type ProductDetailHeaderMetaProps = {
  product: Product;
};

export function ProductDetailHeaderMeta({ product }: ProductDetailHeaderMetaProps) {
  return (
    <>
      <p className={styles.eyebrow}>{product.promotion}</p>
      <p className={styles.audience}>{product.gender} | 데일리 러닝, 워킹</p>
    </>
  );
}
