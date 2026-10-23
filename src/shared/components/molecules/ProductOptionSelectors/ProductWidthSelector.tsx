import { css, cva } from 'styled-system/css';
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
      color: 'var(--color-text-primary)',
      cursor: 'pointer',
      _focusVisible: { outline: '2px solid var(--color-focus-ring)', outlineOffset: '2px' },
    },
    '& [role="radio"][data-checked]': {
      bg: 'var(--color-black-100)',
      color: 'var(--color-text-inverse)',
    },
    '& [role="radio"][data-unchecked]:not([data-disabled]):hover': {
      bg: 'var(--color-black-60)',
      color: 'var(--color-text-inverse)',
    },
    '& [role="radio"][data-disabled]': {
      bg: 'var(--color-black-60)',
      color: 'var(--color-text-inverse)',
      cursor: 'not-allowed',
    },
  },
  variants: {
    single: {
      true: {
        '&[role="radiogroup"]': { h: '11', p: '0' },
        '& [role="radio"][data-checked]:not([data-disabled])': {
          bg: 'transparent',
          color: 'var(--color-text-primary)',
        },
      },
    },
  },
});

export type ProductWidthSelectorProps = {
  options: readonly string[];
  appearance?: 'detail' | 'cart';
  value: string;
  onValueChange: (width: string) => void;
  disabled?: boolean;
};

/** 상품 상세와 장바구니의 발볼 선택을 표시합니다. (Displays width selection for product details and cart options.) */
export function ProductWidthSelector({
  options,
  appearance = 'detail',
  value,
  onValueChange,
  disabled,
}: ProductWidthSelectorProps) {
  if (appearance === 'cart') {
    return (
      <Radio
        ariaLabel="발볼"
        variant="custom"
        value={value}
        disabled={disabled}
        onValueChange={onValueChange}
        options={options.map((value) => ({ value, label: value }))}
        className={css({
          display: 'flex!',
          gap: '0',
          bg: 'black.20',
          borderRadius: 'full',
          p: '0.5',
        })}
        optionClassName={css({
          flex: '1',
          textAlign: 'center',
          cursor: 'pointer',
          _focusVisible: { outline: '2px solid var(--colors-black-100)', outlineOffset: '2px' },
          borderRadius: 'full',
          py: '3',
          justifyContent: 'center',
        })}
        selectedOptionClassName={css({ bg: 'black.100', color: 'white' })}
      />
    );
  }

  return (
    <Radio
      ariaLabel="발볼 선택"
      className={root({ single: options.length === 1 })}
      disabled={disabled}
      onValueChange={onValueChange}
      options={options.map((option) => ({
        label: (
          <Typography variant="productWidthOption" tone="inherit">
            {option}
          </Typography>
        ),
        value: option,
      }))}
      value={value}
      variant="custom"
    />
  );
}
