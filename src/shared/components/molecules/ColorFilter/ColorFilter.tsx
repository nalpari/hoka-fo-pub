import { Checkbox as BaseCheckbox } from '@base-ui/react/checkbox';
import { CheckboxGroup as BaseCheckboxGroup } from '@base-ui/react/checkbox-group';
import type { CSSProperties } from 'react';
import { css } from 'styled-system/css';
import { Circle } from 'styled-system/jsx';

export type ColorFilterOption = {
  value: string;
  label: string;
  hex: string;
};

export type ColorFilterProps = {
  options: readonly ColorFilterOption[];
  selected: string[];
  onChange: (values: string[]) => void;
};

const optionsLayout = css({
  display: 'flex',
  flexWrap: 'wrap',
  gap: '4',
});

const outer = css({
  w: '9',
  h: '9',
  bg: 'var(--color-white-000)',
  '&:has([role="checkbox"][data-checked])': {
    outline: '2px solid var(--color-black-100)',
    '& [data-swatch]': { w: '8', h: '8' },
  },
});

const control = css({
  position: 'absolute',
  opacity: '0',
});

const swatch = css({
  w: '9',
  h: '9',
  border: '0.5px solid color-mix(in srgb, var(--color-black-100) 20%, transparent)',
  bg: 'var(--swatch-color)',
});

export function ColorFilter({ options, selected, onChange }: ColorFilterProps) {
  return (
    <BaseCheckboxGroup value={selected} onValueChange={onChange} className={optionsLayout}>
      {options.map(({ value, label, hex }) => (
        <Circle
          as="label"
          position="relative"
          placeItems="center"
          cursor="pointer"
          key={value}
          className={outer}
        >
          <BaseCheckbox.Root value={value} aria-label={label} className={control} />
          <Circle
            as="span"
            className={swatch}
            data-swatch
            style={{ '--swatch-color': hex } as CSSProperties}
          />
        </Circle>
      ))}
    </BaseCheckboxGroup>
  );
}
