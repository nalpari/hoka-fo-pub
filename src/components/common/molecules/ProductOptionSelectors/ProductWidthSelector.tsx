import { css } from 'styled-system/css';

import { Radio } from '@/components/common/atoms/Radio';
import { Typography } from '@/components/common/atoms/Typography';

const root = css({
  '&[role="radiogroup"]': {
    display: 'grid',
    gridAutoFlow: 'column',
    gridAutoColumns: 'minmax(0, 1fr)',
    gap: '0',
    h: '48px',
    _mobile: { h: '44px' },
    p: '2px',
    borderRadius: '999px',
    bg: '#E9EAEB',
  },
  '& [role="radio"]': {
    display: 'grid',
    minW: '0',
    h: '100%',
    placeItems: 'center',
    borderRadius: '999px',
    color: 'var(--color-text-primary)',
    cursor: 'pointer',
    '& [data-width-label]': {
      fontFamily: 'en',
      fontSize: 'body.16',
      fontWeight: '500',
      lineHeight: 'body',
      _mobile: { fontSize: 'body.14' },
    },
    _focusVisible: { outline: '2px solid var(--color-focus-ring)', outlineOffset: '2px' },
  },
  '& [role="radio"][data-checked]': {
    bg: 'var(--color-black-100)',
    color: 'var(--color-text-inverse)',
    '& [data-width-label]': { fontWeight: '400' },
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
  '& [role="radio"][data-disabled]:has([data-width-sold-out])': {
    bg: '#E9EAEB',
    color: 'black.40',
    '& [data-width-label]': { fontSize: 'body.14', fontWeight: '500' },
  },
});

export type ProductWidthSelectorProps = {
  /** Detail controls are hidden for zero or one option; the controlled value is preserved. */
  options: readonly string[];
  /** Detail options that remain visible but cannot be selected because they are sold out. */
  soldOutOptions?: readonly string[];
  appearance?: 'detail' | 'cart';
  value: string;
  onValueChange: (width: string) => void;
  disabled?: boolean;
};

/** 상품 상세와 장바구니의 발볼 선택을 표시합니다. (Displays width selection for product details and cart options.) */
export function ProductWidthSelector({
  options,
  soldOutOptions,
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
        options={options.map((value) => ({
          value,
          label: (
            <Typography variant="b6" tone="inherit">
              {value}
            </Typography>
          ),
        }))}
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

  // [ 개발팀 바인딩 ] 상세 소유자가 options와 soldOutOptions를 전달합니다. 품절값의 선택 이벤트는 차단하고, 부모가 현재 재고에 맞는 선택값과 사이즈를 연결합니다. 단일 옵션은 표시를 생략합니다.
  if (options.length <= 1) return null;

  return (
    <Radio
      ariaLabel="발볼 선택"
      className={root}
      disabled={disabled}
      onValueChange={onValueChange}
      options={options.map((option) => {
        const soldOut = soldOutOptions?.includes(option);
        return {
          disabled: soldOut,
          label: (
            <Typography
              data-width-label
              data-width-sold-out={soldOut ? '' : undefined}
              variant="b6"
              tone="inherit"
            >
              {option}
              {soldOut && <Typography srOnly> 품절</Typography>}
            </Typography>
          ),
          value: option,
        };
      })}
      value={value}
      variant="custom"
    />
  );
}
