import { useState } from 'react';
import { css } from 'styled-system/css';
import { SelectableButtonList } from '@/shared/components/atoms/SelectableButtonList/SelectableButtonList';
import { CatalogFilterSection } from '@/shared/components/molecules/CatalogFilterSection/CatalogFilterSection';

const pills = css({
  display: 'grid',
  gridTemplateColumns: { base: 'repeat(4, minmax(0, 1fr))' },
  gap: '5px',
  '& button': {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#ddd',
    py: '7px',
    px: '0.5',
    fontSize: '12px',
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
      <SelectableButtonList
        ariaLabel={title}
        buttonClassName={(_, isSelected) => (isSelected ? 'selected' : undefined)}
        className={pills}
        buttonSize="sm"
        multiple
        onChange={(next) => {
          const nextValues = Array.isArray(next) ? next : [String(next)];
          if (onChange) onChange(nextValues);
          else setInternalSelected(nextValues);
        }}
        selected={selectedValues}
        values={values}
      />
    </CatalogFilterSection>
  );
}
