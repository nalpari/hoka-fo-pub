import { useState } from 'react';
import { CheckboxGroup } from '@/shared/components/atoms/CheckboxGroup/CheckboxGroup';
import { CatalogFilterSection } from '@/shared/components/molecules/CatalogFilterSection/CatalogFilterSection';

export function CatalogFilterGroup({
  title,
  values,
  value,
  onChange,
}: {
  title: string;
  values: string[];
  value?: string;
  onChange?: (value: string) => void;
}) {
  const [selected, setSelected] = useState<string[]>([]);
  const selectedValues = onChange ? (value ? [value] : []) : selected;
  return (
    <CatalogFilterSection title={title}>
      <CheckboxGroup
        onValueChange={(next) => {
          if (!onChange) return setSelected(next);
          onChange(next.find((item) => !selectedValues.includes(item)) ?? '');
        }}
        options={values.map((item) => ({ label: item, value: item }))}
        value={selectedValues}
      />
    </CatalogFilterSection>
  );
}
