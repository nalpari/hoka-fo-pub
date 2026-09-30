import { Checkbox as BaseCheckbox } from '@base-ui/react/checkbox';
import { CheckboxGroup as BaseCheckboxGroup } from '@base-ui/react/checkbox-group';
import { css, cva } from 'styled-system/css';
import { Grid } from 'styled-system/jsx';

const catalogColors = [
  'red',
  'blue',
  'green',
  'orange',
  'gray',
  'black',
  'white',
  'pink',
  'brown',
  'yellow',
  'purple',
  'cream',
] as const;
const options = css({
  display: 'flex',
  flexWrap: 'wrap',
  gap: '16px',
  mt: '10px',
});
const control = css({
  position: 'absolute',
  opacity: '0',
  _checked: { '& + [data-swatch]': { outline: '2px solid #111', outlineOffset: '2px' } },
});
const swatch = cva({
  base: { w: '32px', h: '32px', border: '1px solid #ddd', borderRadius: 'full' },
  variants: {
    color: {
      red: { bg: '#f10b0b' },
      blue: { bg: '#357ab7' },
      green: { bg: '#48794b' },
      orange: { bg: '#f5a633' },
      gray: { bg: '#99a1a7' },
      black: { bg: '#111' },
      white: { bg: '#fff' },
      pink: { bg: '#e43891' },
      brown: { bg: '#5b4b3d' },
      yellow: { bg: '#fff94a' },
      purple: { bg: '#76127b' },
      cream: { bg: '#f4f3dc' },
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
