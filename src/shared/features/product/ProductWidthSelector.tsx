import { css } from 'styled-system/css';
import type { ProductWidthOption } from '@/mocks/products';
import { Radio } from '@/shared/components/atoms/Radio/Radio';

const root = css({
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  mt: '6',
  overflow: 'hidden',
  borderRadius: '999px',
  bg: 'var(--color-black-20)',
  '& [role="radio"]': {
    display: 'grid',
    minH: '12',
    placeItems: 'center',
    borderRadius: '999px',
    fontWeight: 'bold',
    cursor: 'pointer',
  },
  '& [data-checked]': { bg: 'var(--color-black-100)', color: 'var(--color-white-000)' },
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
