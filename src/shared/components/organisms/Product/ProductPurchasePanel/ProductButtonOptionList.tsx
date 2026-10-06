import type { ReactNode } from 'react';
import { Radio } from '@/shared/components/atoms/Radio/Radio';
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
      <Radio
        ariaLabel={ariaLabel}
        className={listClassName}
        onValueChange={onChange}
        options={values.map((item) => ({
          disabled: disabledValues?.includes(item),
          label: item,
          value: item,
        }))}
        selectedOptionClassName={selectedButtonClassName}
        value={value}
        variant="custom"
      />
    </ProductOptionField>
  );
}
