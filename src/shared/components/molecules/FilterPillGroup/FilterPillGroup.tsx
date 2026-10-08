import { useState } from 'react';
import { Checkbox as BaseCheckbox } from '@base-ui/react/checkbox';
import { CheckboxGroup as BaseCheckboxGroup } from '@base-ui/react/checkbox-group';
import { css } from 'styled-system/css';
import { CatalogFilterSection } from '@/shared/components/molecules/CatalogFilterSection/CatalogFilterSection';

const pills = css({
  display: 'grid',
  gridTemplateColumns: { base: 'repeat(4, minmax(0, 1fr))' },
  gap: '5px',
  '& [role="checkbox"]': {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'var(--color-black-20)',
    border: '1px solid var(--color-black-20)',
    borderRadius: 'full',
    bg: 'var(--color-white-000)',
    py: '7px',
    px: '0.5',
    fontSize: '12',
    cursor: 'pointer',
    _checked: {
      bg: 'var(--color-black-100)',
      borderColor: 'var(--color-black-100)',
      color: 'var(--color-white-000)',
    },
    _focusVisible: { outline: '2px solid var(--color-focus-ring)', outlineOffset: '2px' },
  },
});

export function FilterPillGroup({
  title,
  values,
  selected = [],
  onChange,
}: {
  title: string;
  values: string[];
  selected?: string[];
  onChange?: (next: string[]) => void;
}) {
  const [internalSelected, setInternalSelected] = useState<string[]>([]);
  const selectedValues = onChange ? selected : internalSelected;

  return (
    <CatalogFilterSection title={title}>
      <BaseCheckboxGroup
        aria-label={title}
        className={pills}
        onValueChange={(next) => (onChange ? onChange(next) : setInternalSelected(next))}
        value={selectedValues}
      >
        {values.map((value) => (
          <BaseCheckbox.Root key={value} value={value}>
            {value}
          </BaseCheckbox.Root>
        ))}
      </BaseCheckboxGroup>
    </CatalogFilterSection>
  );
}
