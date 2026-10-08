import type { ReactNode } from 'react';
import { Toggle } from '@base-ui/react/toggle';
import { ToggleGroup } from '@base-ui/react/toggle-group';
import { cva } from 'styled-system/css';
import { Button } from '@/shared/components/atoms/Button/Button';

const root = cva({
  base: { display: 'flex', flexWrap: 'wrap', gap: '2' },
  variants: { fullWidth: { true: { '& > button': { flex: '1' } }, false: {} } },
  defaultVariants: { fullWidth: false },
});
const item = cva({
  base: { borderColor: 'var(--color-black-20)' },
  variants: {
    active: {
      true: {
        borderColor: 'var(--color-black-100)',
        bg: 'var(--color-black-100)',
        color: 'var(--color-white-000)',
      },
      false: {},
    },
  },
});
export type SegmentedControlOption<T extends string = string> = {
  value: T;
  label: ReactNode;
  disabled?: boolean;
};
export type SegmentedControlProps<T extends string = string> = {
  options: SegmentedControlOption<T>[];
  value: T;
  onValueChange: (value: T) => void;
  ariaLabel: string;
  fullWidth?: boolean;
  className?: string;
};

/** Accessible single-choice button group for tabs, filters, and view modes. */
export function SegmentedControl<T extends string = string>({
  options,
  value,
  onValueChange,
  ariaLabel,
  fullWidth,
  className,
}: SegmentedControlProps<T>) {
  return (
    <ToggleGroup
      aria-label={ariaLabel}
      className={[root({ fullWidth }), className].filter(Boolean).join(' ')}
      onValueChange={(nextValue) => {
        const next = nextValue[0];
        if (next) onValueChange(next as T);
      }}
      value={[value]}
    >
      {options.map((option) => (
        <Toggle
          disabled={option.disabled}
          key={option.value}
          render={<Button className={item({ active: option.value === value })} />}
          value={option.value}
        >
          {option.label}
        </Toggle>
      ))}
    </ToggleGroup>
  );
}
