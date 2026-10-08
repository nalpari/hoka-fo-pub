import { useState } from 'react';
import { SizeSelector } from '@/shared/components/molecules/SizeSelector/SizeSelector';
import { CatalogFilterSection } from '@/shared/components/molecules/CatalogFilterSection/CatalogFilterSection';

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
      <SizeSelector
        mode="multiple"
        ariaLabel={title}
        columns={4}
        options={values.map((value) => ({ value }))}
        onValueChange={(next) => (onChange ? onChange(next) : setInternalSelected(next))}
        value={selectedValues}
      />
    </CatalogFilterSection>
  );
}
