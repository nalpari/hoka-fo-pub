import { cva } from 'styled-system/css';
import type { ProductWidthOption } from '@/mocks/products';
import { Radio } from '@/shared/components/atoms/Radio/Radio';
import { Typography } from '@/shared/components/atoms/Typography/Typography';

const root = cva({
  base: {
    '&[role="radiogroup"]': {
      display: 'grid',
      gridAutoFlow: 'column',
      gridAutoColumns: 'minmax(0, 1fr)',
      gap: '0',
      h: '12',
      p: '2px',
      borderRadius: '999px',
      bg: 'var(--color-black-20)',
    },
    '& [role="radio"]': {
      display: 'grid',
      minW: '0',
      h: '100%',
      placeItems: 'center',
      borderRadius: '999px',
      color: 'var(--color-black-100)',
      cursor: 'pointer',
      _focusVisible: { outline: '2px solid var(--color-focus-ring)', outlineOffset: '2px' },
    },
    '& [role="radio"][data-checked]': {
      bg: 'var(--color-black-100)',
      color: 'var(--color-white-000)',
    },
    '& [role="radio"][data-unchecked]:not([data-disabled]):hover': {
      bg: 'var(--color-black-60)',
      color: 'var(--color-white-000)',
    },
    '& [role="radio"][data-disabled]': {
      bg: 'var(--color-black-60)',
      color: 'var(--color-white-000)',
      cursor: 'not-allowed',
    },
  },
  variants: {
    single: {
      true: {
        '&[role="radiogroup"]': { h: '11', p: '0' },
        '& [role="radio"][data-checked]:not([data-disabled])': {
          bg: 'transparent',
          color: 'var(--color-black-100)',
        },
      },
    },
  },
});

type ProductWidthSelectorProps = {
  options: ProductWidthOption[];
  value: string;
  onValueChange: (width: string) => void;
  disabled?: boolean;
};

export function ProductWidthSelector({
  options,
  value,
  onValueChange,
  disabled,
}: ProductWidthSelectorProps) {
  return (
    <Radio
      ariaLabel="발볼 선택"
      className={root({ single: options.length === 1 })}
      disabled={disabled}
      onValueChange={onValueChange}
      options={options.map((option) => ({
        label: (
          <Typography variant="productWidthOption" style={{ color: 'inherit' }}>
            {option.label}
          </Typography>
        ),
        value: option.label,
      }))}
      value={value}
      variant="custom"
    />
  );
}
