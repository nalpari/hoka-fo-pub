import { css } from 'styled-system/css';
import { Radio } from '@/shared/components/atoms/Radio/Radio';
import { Typography } from '@/shared/components/atoms/Typography/Typography';
import { ProductVariantSection } from '@/shared/features/product/ProductVariantSection';

const styles = {
  colors: css({
    display: 'flex',
    gap: '1.5',
    overflowX: 'auto',
    '& [role="radio"]': {
      flex: '0 0 58px',
      h: '44px',
      overflow: 'hidden',
      borderBottom: '3px solid transparent',
      bg: 'var(--color-black-10)',
      cursor: 'pointer',
    },
    '& [data-checked]': { borderBottomColor: 'var(--color-black-100)' },
    '& img': { w: '100%', h: '100%', objectFit: 'cover' },
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
          label: <img alt="" src={gallery[index % gallery.length]} />,
          value: color,
        }))}
        value={value}
        variant="custom"
      />
    </ProductVariantSection>
  );
}
