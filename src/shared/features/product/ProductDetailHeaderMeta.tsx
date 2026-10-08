import { css } from 'styled-system/css';
import type { Product } from '@/mocks/products';

const styles = {
  eyebrow: css({ color: 'var(--color-blue-100)', fontSize: '14' /* 기존 13px */, fontWeight: 'bold' }),
  audience: css({ mt: '2', color: 'var(--color-black-60)', fontSize: '14' }),
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
