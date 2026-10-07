import { css } from 'styled-system/css';
import type { ProductWidthOption } from '@/mocks/products';
import { Radio } from '@/shared/components/atoms/Radio/Radio';
import { Typography } from '@/shared/components/atoms/Typography/Typography';
import { ProductVariantSection } from '@/shared/features/product/ProductVariantSection';

const styles = {
  sizes: css({
    display: 'grid',
    gridTemplateColumns: 'repeat(5, 1fr)',
    gap: '1.5',
    mt: '3',
    '& [role="radio"]': {
      display: 'grid',
      minH: '8',
      placeItems: 'center',
      border: '1px solid #c9c9c9',
      borderRadius: '999px',
      bg: '#fff',
      fontSize: '12px',
      cursor: 'pointer',
    },
    '& [data-checked]': { borderColor: '#000', bg: '#000', color: '#fff' },
    '& [data-disabled]': {
      borderColor: 'transparent',
      bg: '#eee',
      color: '#aaa',
      cursor: 'not-allowed',
    },
  }),
  error: css({ mt: '2', color: '#c00', fontSize: '12px' }),
  recommendation: css({ mt: '2', color: '#777', fontSize: '11px' }),
};

type ProductSizeSelectorProps = {
  selectedWidth?: ProductWidthOption;
  value: string;
  error: string;
  onValueChange: (size: string) => void;
  onOpenSizeGuide: () => void;
};

export function ProductSizeSelector({
  selectedWidth,
  value,
  error,
  onValueChange,
  onOpenSizeGuide,
}: ProductSizeSelectorProps) {
  return (
    <ProductVariantSection
      action={
        <Typography
          as="button"
          className={css({ p: '0', border: '0', bg: 'transparent', textDecoration: 'underline' })}
          onClick={onOpenSizeGuide}
          type="button"
          variant="productSelectorAction"
        >
          사이즈 가이드
        </Typography>
      }
      id="product-size"
      title="사이즈"
    >
      <Radio
        ariaLabel="사이즈 선택"
        className={styles.sizes}
        onValueChange={onValueChange}
        options={
          selectedWidth?.sizes.map((size) => ({
            disabled: selectedWidth.soldOut.includes(size),
            label: size,
            value: size,
          })) ?? []
        }
        value={value}
        variant="custom"
      />
      {error && (
        <p className={styles.error} role="alert">
          {error}
        </p>
      )}
      <p className={styles.recommendation}>사이즈 추천: 정사이즈</p>
    </ProductVariantSection>
  );
}
