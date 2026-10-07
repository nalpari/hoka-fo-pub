import { css } from 'styled-system/css';
import type { Product } from '@/mocks/products';

const styles = {
  root: css({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    mt: '4',
    '& button': { p: '0', border: '0', bg: 'transparent' },
  }),
  reviewLink: css({
    display: 'flex',
    gap: '2',
    color: '#555',
    fontSize: '13px',
    textDecoration: 'underline',
  }),
  icons: css({ display: 'flex', gap: '3', '& button': { fontSize: '25px', lineHeight: '1' } }),
};

type ProductDetailHeaderActionsProps = {
  product: Product;
  wish: boolean;
  onWishChange: () => void;
};

export function ProductDetailHeaderActions({
  product,
  wish,
  onWishChange,
}: ProductDetailHeaderActionsProps) {
  return (
    <div className={styles.root}>
      <button
        className={styles.reviewLink}
        onClick={() =>
          document.getElementById('product-information')?.scrollIntoView({ behavior: 'smooth' })
        }
        type="button"
      >
        <strong>★★★★☆</strong>
        <span>{product.reviewCount}개 리뷰 보기</span>
      </button>
      <div className={styles.icons}>
        <button aria-label="공유하기" type="button">
          ♧
        </button>
        <button aria-label="관심상품" aria-pressed={wish} onClick={onWishChange} type="button">
          {wish ? '♥' : '♡'}
        </button>
      </div>
    </div>
  );
}
