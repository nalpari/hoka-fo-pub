import { css } from 'styled-system/css';
import { Radio } from '@/shared/components/atoms/Radio/Radio';
import { Typography } from '@/shared/components/atoms/Typography/Typography';
import { ProductVariantSection } from '@/shared/features/product/ProductVariantSection';

const styles = {
  colors: css({
    minW: '0',
    '&[role="radiogroup"]': {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '2',
      _mobile: { flexWrap: 'nowrap', overflowX: 'auto' },
    },
    '& [role="radio"]': {
      position: 'relative',
      flex: '0 0 74px',
      w: '74px',
      h: '78px',
      pb: '4px',
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
    '& [role="radio"][data-checked]::after': { bg: 'var(--color-black-100)' },
    '& img': { w: '74px', h: '74px', objectFit: 'contain', bg: 'var(--color-black-10)' },
  }),
};

type ProductColorSelectorProps = {
  colors: string[];
  gallery: string[];
  value: string;
  onValueChange: (color: string) => void;
};

export function ProductColorSelector({
  colors,
  gallery,
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
        options={colors.map((color, index) => ({
          label: <img alt={color} src={gallery[index % gallery.length]} />,
          value: color,
        }))}
        value={value}
        variant="custom"
      />
    </ProductVariantSection>
  );
}
