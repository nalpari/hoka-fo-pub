import { css } from 'styled-system/css';
import { Radio } from '@/shared/components/atoms/Radio/Radio';
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
      bg: '#f7f7f9',
      cursor: 'pointer',
    },
    '& [data-checked]': { borderBottomColor: '#000' },
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
    <ProductVariantSection title={`컬러: ${value}`}>
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
