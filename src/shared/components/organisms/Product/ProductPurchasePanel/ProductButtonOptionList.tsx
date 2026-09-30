import type { ReactNode } from 'react';
import { SelectableButtonList } from '@/shared/components/atoms/SelectableButtonList/SelectableButtonList';
import { ProductOptionField } from '@/shared/components/organisms/Product/ProductPurchasePanel/ProductOptionField';

type ProductButtonOptionListProps = {
  label: string;
  values: string[];
  value: string;
  onChange: (value: string) => void;
  action?: ReactNode;
  disabledValues?: string[];
  listClassName?: string;
  selectedButtonClassName?: string;
  ariaLabel: string;
};

/** A labeled, single-select product option list with shared keyboard navigation. */
export function ProductButtonOptionList({
  label,
  values,
  value,
  onChange,
  action,
  disabledValues,
  listClassName,
  selectedButtonClassName,
  ariaLabel,
}: ProductButtonOptionListProps) {
  return (
    <ProductOptionField action={action} label={label}>
      <SelectableButtonList
        ariaLabel={ariaLabel}
        buttonClassName={(_, isSelected) => (isSelected ? selectedButtonClassName : undefined)}
        className={listClassName}
        disabledValues={disabledValues}
        onChange={(next) => onChange(next as string)}
        selected={value}
        values={values}
      />
    </ProductOptionField>
  );
}
