import { useState } from 'react';
import { Checkbox } from '@/shared/components/atoms/Checkbox/Checkbox';
import { CatalogFilterSection } from '@/shared/components/molecules/CatalogFilterSection/CatalogFilterSection';

export function CatalogFilterGroup({
  title,
  values,
  selected: controlledSelected = [],
  onChange,
}: {
  title: string;
  values: string[];
  selected?: string[];
  onChange?: (values: string[]) => void;
}) {
  const [internalSelected, setInternalSelected] = useState<string[]>([]);
  const selectedValues = onChange ? controlledSelected : internalSelected;
  return (
    <CatalogFilterSection title={title}>
      <Checkbox
        onValueChange={(next) => (onChange ? onChange(next) : setInternalSelected(next))}
        options={values.map((item) => ({ label: item, value: item }))}
        value={selectedValues}
      />
    </CatalogFilterSection>
  );
}
