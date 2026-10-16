import type { Product } from '@/mocks/products';
import { css } from 'styled-system/css';
import { Radio } from '@/shared/components/atoms/Radio/Radio';
import { Typography } from '@/shared/components/atoms/Typography/Typography';
import { ProductVariantSection } from '@/shared/features/product/ProductVariantSection';

const styles = {
  colors: css({
    '&[role="radiogroup"]': {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, 80px)',
      gap: '8px',
      _mobile: { display: 'flex' },
    },
    pb: '8px',
    scrollbarWidth: 'thin',
    scrollbarColor: 'var(--color-black-40) transparent',
    '&::-webkit-scrollbar': { h: '4px' },
    '&::-webkit-scrollbar-thumb': { bg: 'var(--color-black-40)' },
    _mobile: {
      overflowX: 'auto',
      w: 'calc(100% + 16px)',
      mr: '-16px',
    },
    '& [role="radio"]': {
      position: 'relative',
      flex: '0 0 80px',
      w: '80px',
      h: '53px',
      overflow: 'hidden',
      bg: 'var(--color-black-10)',
      cursor: 'pointer',
      _focusVisible: { outline: '2px solid var(--color-focus-ring)', outlineOffset: '-2px' },
      _after: {
        content: '""',
        position: 'absolute',
        bottom: '0',
        insetInline: '0',
        h: '4px',
        borderRadius: '50px',
        bg: 'transparent',
      },
    },
    '& [role="radio"][data-checked]::after': {
      content: '""',
      position: 'absolute',
      bottom: '0',
      left: '0',
      right: '0',
      h: '4px',
      bg: 'var(--color-black-100)',
      borderRadius: '999px',
      pointerEvents: 'none',
    },
    '& img': { w: '100%', h: '100%', objectFit: 'contain' },
  }),
};

type ProductColorSelectorProps = {
  colors: string[];
  gallery: string[];
  colorThumbnails?: Product['colorThumbnails'];
  value: string;
  onValueChange: (color: string) => void;
};

export function ProductColorSelector({
  colors,
  gallery,
  colorThumbnails,
  value,
  onValueChange,
}: ProductColorSelectorProps) {
  return (
    <ProductVariantSection
      title={
        <>
          컬러: <Typography variant="productOptionValue">{value}</Typography>
        </>
      }
    >
      <Radio
        ariaLabel="컬러 선택"
        className={styles.colors}
        onValueChange={onValueChange}
        options={
          colorThumbnails?.length
            ? colorThumbnails.map((option) => ({
                label: <img alt={option.label} src={option.image} />,
                value: option.label,
              }))
            : colors.map((color, index) => ({
                label: <img alt={color} src={gallery[index % gallery.length]} />,
                value: color,
              }))
        }
        value={value}
        variant="custom"
      />
    </ProductVariantSection>
  );
}
