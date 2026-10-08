'use client';

import type { CSSProperties } from 'react';
import { Radio } from '@base-ui/react/radio';
import { RadioGroup } from '@base-ui/react/radio-group';
import { Checkbox } from '@base-ui/react/checkbox';
import { CheckboxGroup } from '@base-ui/react/checkbox-group';
import { css, cva } from 'styled-system/css';
import { Icon } from '@/shared/components/atoms/Icon/Icon';
import { Typography } from '@/shared/components/atoms/Typography/Typography';

const grid = css({
  display: 'grid',
  gridTemplateColumns: 'repeat(var(--size-columns), minmax(0, 1fr))',
  gap: '5px',
});

const pill = cva({
  base: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '1',
    minW: '0',
    minH: '8',
    px: '0.5',
    border: '1px solid var(--color-black-20)',
    borderRadius: 'full',
    bg: 'var(--color-white-000)',
    color: 'var(--color-black-100)',
    cursor: 'pointer',
    _focusVisible: { outline: '2px solid var(--color-focus-ring)', outlineOffset: '2px' },
  },
  variants: {
    selected: {
      true: {
        bg: 'var(--color-black-100)',
        borderColor: 'var(--color-black-100)',
        color: 'var(--color-white-000)',
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

export type SizeOptionState = 'available' | 'lowStock' | 'soldOut' | 'unavailable';

export type SizeSelectorOption = { value: string; state?: SizeOptionState };

export type SizeSelectorProps = {
  options: readonly SizeSelectorOption[];
  ariaLabel: string;
  columns?: number;
  soldOutAppearance?: 'gray' | 'diagonal';
} & (
  | { mode: 'single'; value: string; onValueChange: (value: string) => void }
  | { mode: 'multiple'; value: string[]; onValueChange: (value: string[]) => void }
);

const stateLabels: Record<SizeOptionState, string> = {
  available: '',
  lowStock: '재고 부족',
  soldOut: '품절',
  unavailable: '미제공',
};

/** Shared size pills with native single- or multiple-choice semantics. */
export function SizeSelector(props: SizeSelectorProps) {
  const { options, ariaLabel, columns = 5, soldOutAppearance = 'gray' } = props;
  const children = options.map(({ value, state = 'available' }) => {
    const disabled = state === 'soldOut' || state === 'unavailable';
    const selected =
      !disabled && (props.mode === 'single' ? props.value === value : props.value.includes(value));
    const className = pill({
      selected,
      disabled,
      unavailableAppearance: disabled ? soldOutAppearance : undefined,
    });
    const label = stateLabels[state] ? `${value}mm, ${stateLabels[state]}` : `${value}mm`;
    const content = (
      <>
        {state === 'lowStock' && (
          <Icon name="action/fa-clock-nine" size="12px" color="currentColor" />
        )}
        <Typography variant="sizeOption" style={{ color: 'inherit' }}>
          {value}
        </Typography>
      </>
    );
    return props.mode === 'single' ? (
      <Radio.Root
        key={value}
        value={value}
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
        disabled={disabled}
        aria-label={label}
        className={className}
      >
        {content}
      </Checkbox.Root>
    );
  });
  const style = { '--size-columns': columns } as CSSProperties;
  return props.mode === 'single' ? (
    <RadioGroup
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
