import { Checkbox as BaseCheckbox } from '@base-ui/react/checkbox';
import { CheckboxGroup as BaseCheckboxGroup } from '@base-ui/react/checkbox-group';
import type { CSSProperties } from 'react';
import { css } from 'styled-system/css';
import { Grid } from 'styled-system/jsx';
import { colorOptions } from '@/shared/features/catalog/productListingFilterValues';

const options = css({
  display: 'flex',
  flexWrap: 'wrap',
  gap: '4',
  mt: '2.5',
});
const control = css({
  position: 'absolute',
  opacity: '0',
  _checked: { '& + [data-swatch]': { outline: '2px solid #111', outlineOffset: '2px' } },
});
const swatch = css({ w: '8', h: '8', border: '1px solid #ddd', borderRadius: 'full', bg: 'var(--swatch-color)' });

export function ColorFilter({
  selected,
  onChange,
}: {
  selected: string[];
  onChange: (values: string[]) => void;
}) {
  return (
    <BaseCheckboxGroup value={selected} onValueChange={onChange} className={options}>
      {colorOptions.map(({ value, label, hex }) => (
        <Grid as="label" position="relative" placeItems="center" cursor="pointer" key={value}>
          <BaseCheckbox.Root value={value} aria-label={label} className={control} />
          <span
            className={swatch}
            data-swatch
            style={{ '--swatch-color': hex } as CSSProperties}
          />
        </Grid>
      ))}
    </BaseCheckboxGroup>
  );
}
