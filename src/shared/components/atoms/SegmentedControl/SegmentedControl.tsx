import type { ReactNode } from 'react';
import { cva } from 'styled-system/css';
import { Button } from '@/shared/components/atoms/Button/Button';

const root = cva({
  base: { display: 'flex', flexWrap: 'wrap', gap: '8px' },
  variants: { fullWidth: { true: { '& > button': { flex: '1' } }, false: {} } },
  defaultVariants: { fullWidth: false },
});
const item = cva({
  base: { borderColor: '#ddd' },
  variants: { active: { true: { borderColor: '#111', bg: '#111', color: '#fff' }, false: {} } },
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
    <div
      aria-label={ariaLabel}
      className={[root({ fullWidth }), className].filter(Boolean).join(' ')}
      role="tablist"
    >
      {options.map((option) => (
        <Button
          aria-selected={option.value === value}
          className={item({ active: option.value === value })}
          disabled={option.disabled}
          key={option.value}
          onClick={() => onValueChange(option.value)}
          role="tab"
        >
          {option.label}
        </Button>
      ))}
    </div>
  );
}
