import { useState } from 'react';
import { Checkbox } from '@/components/common/atoms/Checkbox/Checkbox';
import { CatalogFilterSection } from '@/components/common/molecules/CatalogFilterSection/CatalogFilterSection';

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
