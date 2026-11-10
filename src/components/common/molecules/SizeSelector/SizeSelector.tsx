'use client';

import { Checkbox } from '@base-ui/react/checkbox';
import { CheckboxGroup } from '@base-ui/react/checkbox-group';
import { Radio } from '@base-ui/react/radio';
import { RadioGroup } from '@base-ui/react/radio-group';
import type { CSSProperties } from 'react';

import { css, cva } from 'styled-system/css';

import { useFormFieldContext } from '@/components/common/atoms/FormField';
import { Icon } from '@/components/common/atoms/Icon';
import { Typography } from '@/components/common/atoms/Typography';

const grid = css({
  display: 'grid',
  gridTemplateColumns: 'repeat(var(--size-columns), minmax(0, 1fr))',
  gap: '2',
  _mobile: {
    gridTemplateColumns: 'repeat(var(--size-mobile-columns, var(--size-columns)), minmax(0, 1fr))',
  },
});

const pill = cva({
  base: {
    '&[aria-invalid="true"]': { outline: '2px solid var(--colors-red-100)', outlineOffset: '2px' },
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '1',
    minW: '0',
    minH: '8',
    px: '0.5',
    border: '1px solid var(--color-black-40)',
    borderRadius: 'full',
    bg: 'var(--color-white-000)',
    color: 'var(--color-black-60)',
    cursor: 'pointer',
    '&:hover:not([data-disabled]):not(:disabled):not([data-checked]):not([data-restock])': {
      color: 'var(--color-black-100)',
      borderColor: 'var(--color-black-100)',
    },
    _focusVisible: { outline: '2px solid var(--color-focus-ring)', outlineOffset: '2px' },
  },
  variants: {
    size: {
      compact: {},
      medium: { minH: '9' },
      regular: { minH: '10' },
    },
    selected: {
      true: {
        bg: 'var(--color-black-100)',
        borderColor: 'var(--color-black-100)',
        color: 'var(--color-text-inverse)',
      },
    },
    restock: {
      true: {
        '&[data-checked], &:hover:not([data-disabled]):not(:disabled):not([data-checked]), &:focus-visible':
          {
            bg: 'var(--color-black-20)',
            color: 'var(--color-black-40)',
            borderColor: 'var(--color-black-100)',
          },
      },
    },
    disabled: { true: { cursor: 'not-allowed' } },
    unavailableAppearance: {
      gray: {
        bg: 'var(--color-black-20)',
        borderColor: 'transparent',
        color: 'var(--color-black-40)',
      },
      diagonal: {
        borderColor: 'var(--color-black-20)',
        color: 'var(--color-black-40)',
        overflow: 'hidden',
        _after: {
          content: '""',
          position: 'absolute',
          inset: '0',
          pointerEvents: 'none',
          background:
            'linear-gradient(to bottom right, transparent calc(50% - 0.5px), currentColor 50%, transparent calc(50% + 0.5px))',
        },
      },
    },
  },
});

export type SizeOptionState = 'available' | 'soldOut' | 'unavailable';

export type SizeSelectorOption = { value: string; state?: SizeOptionState };

export type SizeSelectorProps = {
  options: readonly SizeSelectorOption[];
  ariaLabel: string;
  columns?: number;
  mobileColumns?: number;
  soldOutAppearance?: 'gray' | 'diagonal';
  allowSoldOutSelection?: boolean;
  size?: 'compact' | 'medium' | 'regular';
} & (
  | { mode: 'single'; value: string; onValueChange: (value: string) => void }
  | { mode: 'multiple'; value: string[]; onValueChange: (value: string[]) => void }
);

const stateLabels: Record<SizeOptionState, string> = {
  available: '',
  soldOut: '품절',
  unavailable: '미제공',
};

/** 네이티브 단일·다중 선택 의미를 유지하는 공통 사이즈 옵션입니다. (Provides shared size options with native single- or multiple-choice semantics.) */
export function SizeSelector(props: SizeSelectorProps) {
  const field = useFormFieldContext();
  const {
    options,
    ariaLabel,
    columns = 5,
    mobileColumns,
    soldOutAppearance = 'gray',
    size = 'compact',
    allowSoldOutSelection = false,
  } = props;
  const children = options.map(({ value, state = 'available' }) => {
    const soldOut = state === 'soldOut';
    const disabled = state === 'unavailable' || (soldOut && !allowSoldOutSelection);
    const selected =
      !disabled && (props.mode === 'single' ? props.value === value : props.value.includes(value));
    const className = pill({
      size,
      selected,
      disabled,
      unavailableAppearance: disabled || soldOut ? soldOutAppearance : undefined,
      restock: soldOut && allowSoldOutSelection,
    });
    const label =
      soldOut && allowSoldOutSelection
        ? `${value}mm, 품절, 입고 알림 선택`
        : stateLabels[state]
          ? `${value}mm, ${stateLabels[state]}`
          : `${value}mm`;
    const content = (
      <>
        {soldOut && allowSoldOutSelection && (
          <Icon name="bell-regular" size="14px" className={css({ order: 1 })} />
        )}
        <Typography variant="body4" style={{ color: 'inherit' }}>
          {value}
        </Typography>
      </>
    );
    return props.mode === 'single' ? (
      <Radio.Root
        key={value}
        value={value}
        data-restock={soldOut && allowSoldOutSelection ? '' : undefined}
        disabled={disabled}
        aria-label={label}
        className={className}
      >
        {content}
      </Radio.Root>
    ) : (
      <Checkbox.Root
        key={value}
        value={value}
        data-restock={soldOut && allowSoldOutSelection ? '' : undefined}
        disabled={disabled}
        aria-label={label}
        className={className}
      >
        {content}
      </Checkbox.Root>
    );
  });
  const style = {
    '--size-columns': columns,
    '--size-mobile-columns': mobileColumns ?? columns,
  } as CSSProperties;
  return props.mode === 'single' ? (
    <RadioGroup
      aria-describedby={field?.describedBy}
      aria-label={ariaLabel}
      className={grid}
      style={style}
      value={props.value}
      onValueChange={(value) => props.onValueChange(value as string)}
    >
      {children}
    </RadioGroup>
  ) : (
    <CheckboxGroup
      aria-describedby={field?.describedBy}
      aria-label={ariaLabel}
      className={grid}
      style={style}
      value={props.value}
      onValueChange={props.onValueChange}
    >
      {children}
    </CheckboxGroup>
  );
}
