import { cva, css } from 'styled-system/css';
import { Stack } from 'styled-system/jsx';
import {
  SegmentedControl,
  type SegmentedControlOption,
} from '@/shared/components/atoms/SegmentedControl/SegmentedControl';
import { Typography } from '@/shared/components/atoms/Typography/Typography';

const option = cva({
  base: {
    minW: '80px',
    minH: '36px',
    px: '3',
    border: '1px solid var(--color-black-20)',
    borderRadius: '3px',
    bg: 'white',
    color: 'var(--color-black-80)',
    cursor: 'pointer',
    _focusVisible: { outline: '2px solid var(--color-focus-ring)', outlineOffset: '2px' },
  },
  variants: {
    selected: {
      true: { bg: 'var(--color-black-100)', color: 'white', borderColor: 'var(--color-black-100)' },
    },
    compact: { true: { minW: '40px', minH: '24px', px: '1', border: '0', borderRadius: '0' } },
  },
});

export function SizeGuideChoiceGroup<T extends string>({
  label,
  options,
  value,
  onValueChange,
  compact = false,
}: {
  label: string;
  options: readonly SegmentedControlOption<T>[];
  value: T;
  onValueChange: (value: T) => void;
  compact?: boolean;
}) {
  const choices = (
    <SegmentedControl
      unstyled
      ariaLabel={label}
      options={options}
      value={value}
      onValueChange={onValueChange}
      className={css({ display: 'flex', flexWrap: 'wrap', gap: compact ? '0' : '3' })}
      itemClassName={(_, selected) => option({ selected, compact })}
      itemRender={({ label }) => (
        <Typography as="button" variant={compact ? 'unitLabel' : 'choiceLabel'}>
          {label}
        </Typography>
      )}
    />
  );

  if (compact) return choices;

  return (
    <Stack gap="2">
      <Typography variant="body4" tone="subtle">
        {label}
      </Typography>
      {choices}
    </Stack>
  );
}
