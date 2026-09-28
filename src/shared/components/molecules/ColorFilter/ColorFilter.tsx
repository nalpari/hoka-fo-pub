import { Checkbox as BaseCheckbox } from '@base-ui/react/checkbox';
import { CheckboxGroup as BaseCheckboxGroup } from '@base-ui/react/checkbox-group';
import { css, cva } from 'styled-system/css';
import { Grid } from 'styled-system/jsx';

const catalogColors = [
  'black',
  'gray',
  'navy',
  'blue',
  'beige',
  'orange',
  'green',
  'pink',
] as const;
const options = css({
  display: 'grid',
  gridTemplateColumns: 'repeat(4, 1fr)',
  gap: '8px',
  mt: '10px',
});
const control = css({
  position: 'absolute',
  opacity: '0',
  _checked: { '& + [data-swatch]': { outline: '2px solid #111', outlineOffset: '2px' } },
});
const swatch = cva({
  base: { w: '18px', h: '18px', border: '1px solid #bbb', borderRadius: 'full' },
  variants: {
    color: {
      black: { bg: '#111' },
      gray: { bg: '#969696' },
      navy: { bg: '#18376d' },
      blue: { bg: '#1a67ad' },
      beige: { bg: '#eed49e' },
      orange: { bg: '#ec7615' },
      green: { bg: '#547b50' },
      pink: { bg: '#df99a8' },
    },
  },
});

export function ColorFilter({
  selected,
  onChange,
}: {
  selected: string[];
  onChange: (values: string[]) => void;
}) {
  return (
    <BaseCheckboxGroup value={selected} onValueChange={onChange} className={options}>
      {catalogColors.map((color) => (
        <Grid as="label" position="relative" placeItems="center" cursor="pointer" key={color}>
          <BaseCheckbox.Root value={color} aria-label={color} className={control} />
          <span className={swatch({ color })} data-swatch />
        </Grid>
      ))}
    </BaseCheckboxGroup>
  );
}
