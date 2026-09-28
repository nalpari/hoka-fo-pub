import { Checkbox as BaseCheckbox } from '@base-ui/react/checkbox';
import { CheckboxGroup as BaseCheckboxGroup } from '@base-ui/react/checkbox-group';
import type { ReactNode } from 'react';
import { css } from 'styled-system/css';
import { Stack } from 'styled-system/jsx';

const control = css({
  display: 'inline-grid',
  placeItems: 'center',
  w: '16px',
  h: '16px',
  border: '1px solid #777',
  bg: '#fff',
  _checked: { bg: '#111', borderColor: '#111', color: '#fff' },
});
const indicator = css({ fontSize: '11px', lineHeight: '1' });
const group = css({ display: 'grid', gap: '7px' });

export type CheckboxOption<T extends string = string> = {
  value: T;
  label: ReactNode;
  disabled?: boolean;
};
export type CheckboxGroupProps<T extends string = string> = {
  options: CheckboxOption<T>[];
  value: T[];
  onValueChange: (value: T[]) => void;
  ariaLabel?: string;
  className?: string;
  renderOption?: (option: CheckboxOption<T>, control: ReactNode) => ReactNode;
};

/** Controlled multi-choice group with reusable option metadata and a custom render slot. */
export function CheckboxGroup<T extends string = string>({
  options,
  value,
  onValueChange,
  ariaLabel,
  className,
  renderOption,
}: CheckboxGroupProps<T>) {
  return (
    <BaseCheckboxGroup
      aria-label={ariaLabel}
      className={[group, className].filter(Boolean).join(' ')}
      value={value}
      onValueChange={(next) => onValueChange(next as T[])}
    >
      {options.map((option) => {
        const controlNode = (
          <BaseCheckbox.Root disabled={option.disabled} value={option.value} className={control}>
            <BaseCheckbox.Indicator className={indicator}>✓</BaseCheckbox.Indicator>
          </BaseCheckbox.Root>
        );
        return renderOption ? (
          <span key={option.value}>{renderOption(option, controlNode)}</span>
        ) : (
          <Stack
            as="label"
            direction="row"
            alignItems="center"
            gap="7px"
            cursor={option.disabled ? 'not-allowed' : 'pointer'}
            fontSize="14px"
            key={option.value}
          >
            {controlNode}
            {option.label}
          </Stack>
        );
      })}
    </BaseCheckboxGroup>
  );
}
