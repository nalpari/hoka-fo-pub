import { useState } from 'react';
import { Link } from 'react-router-dom';
import { css } from 'styled-system/css';
import type { Product } from '@/mocks/products';
import { Typography } from '@/shared/components/atoms/Typography/Typography';
import { RatingStars } from '@/shared/components/atoms/RatingStars/RatingStars';
import { ProductDetails } from '@/shared/components/molecules/ProductDetails/ProductDetails';
import { ProductOptionList } from '@/shared/components/molecules/ProductOptionList/ProductOptionList';

const styles = {
  panel: css({
    position: 'absolute',
    top: '-16px',
    left: '-16px',
    right: '-16px',
    zIndex: '3',
    p: '4',
    display: 'grid',
    gap: '4',
    bg: 'var(--color-surface-subtle)',
    border: '1px solid var(--color-border-tertiary)',
    boxShadow: '0 8px 24px rgb(0 0 0 / 8%)',
  }),
  link: css({
    display: 'block',
    color: 'inherit',
    textDecoration: 'none',
    _focusVisible: { outline: '2px solid var(--color-text-primary)', outlineOffset: '2px' },
  }),
  image: css({ display: 'block', w: '100%', aspectRatio: '1', objectFit: 'contain' }),
  promotion: css({ minH: '20px' }),
  rating: css({ display: 'flex', alignItems: 'center', gap: '2' }),
  specs: css({ m: '0' }),
  row: css({
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '2',
    py: '2',
    borderBottom: '1px solid var(--color-border-tertiary)',
  }),
};

export function ProductCardPreview({ product }: { product: Product }) {
  const colorOptions = product.colorThumbnails ?? [];
  const [selectedColorId, setSelectedColorId] = useState<string>();
  const selectedColor = colorOptions.find((option) => option.id === selectedColorId);
  const widths = new Set(
    product.colorOptions?.flatMap((option) => option.widths.map((width) => width.label)) ?? [
      product.width,
    ],
  );
  const activity =
    product.use === 'Everyday Run'
      ? '데일리 러닝'
      : product.use === 'Trail Running'
        ? '트레일 러닝'
        : '워킹';

  return (
    <section aria-label={`${product.name} 상품 요약`} className={styles.panel}>
      <Link
        className={styles.link}
        to={`/products/${product.id}`}
        aria-label={`${product.name} 상세 보기`}
      >
        <img
          className={styles.image}
          src={selectedColor?.image ?? product.hoverImage}
          alt={selectedColor ? `${product.name} - ${selectedColor.label}` : product.name}
        />
      </Link>
      {colorOptions.length > 0 && (
        <ProductOptionList
          ariaLabel="상품 색상 옵션"
          layout="preview"
          options={colorOptions}
          selectedId={selectedColorId}
          onSelect={setSelectedColorId}
        />
      )}
      <div className={styles.promotion}>
        {product.promotion && (
          <Typography variant="body4" tone="red80">
            {product.promotion}
          </Typography>
        )}
      </div>
      <div className={styles.rating}>
        <RatingStars value={product.rating} aria-label={`평점 ${product.rating}점`} />
        <Typography variant="body5" tone="subtle">
          ({product.reviewCount})
        </Typography>
      </div>
      <Link className={styles.link} to={`/products/${product.id}`}>
        <ProductDetails
          activities={[activity]}
          colorCount={colorOptions.length || product.colors.length}
          gender={product.gender}
          name={product.name}
          optionThumbnails={[]}
          platform="web"
          price={product.price}
          showVariantSummary
          variant="listing"
          widthCount={widths.size}
        />
      </Link>
      <dl className={styles.specs}>
        {[
          ['안정성', product.stability],
          ['쿠셔닝', product.cushioning],
          ['발볼', product.width],
        ].map(([label, value]) => (
          <div className={styles.row} key={label}>
            <Typography as="dt" variant="body4" weight="medium">
              {label}
            </Typography>
            <Typography as="dd" variant="body4" tone="subtle" className={css({ m: '0' })}>
              {value}
            </Typography>
          </div>
        ))}
      </dl>
    </section>
  );
}
