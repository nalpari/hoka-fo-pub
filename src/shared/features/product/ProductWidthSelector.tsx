import { css } from 'styled-system/css';
import type { ProductWidthOption } from '@/mocks/products';
import { Radio } from '@/shared/components/atoms/Radio/Radio';

const root = css({
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  mt: '6',
  overflow: 'hidden',
  borderRadius: '999px',
  bg: '#e9eaec',
  '& [role="radio"]': {
    display: 'grid',
    minH: '12',
    placeItems: 'center',
    borderRadius: '999px',
    fontWeight: '700',
    cursor: 'pointer',
  },
  '& [data-checked]': { bg: '#000', color: '#fff' },
});

type ProductWidthSelectorProps = {
  options: ProductWidthOption[];
  value: string;
  onValueChange: (width: string) => void;
};

export function ProductWidthSelector({ options, value, onValueChange }: ProductWidthSelectorProps) {
  return (
    <Radio
      ariaLabel="발볼 선택"
      className={root}
      onValueChange={onValueChange}
      options={options.map((option) => ({ label: option.label, value: option.label }))}
      value={value}
      variant="custom"
    />
  );
}
