import { useRef } from 'react';
import type { KeyboardEvent, ReactNode } from 'react';
import { Button } from '@/shared/components/atoms/Button/Button';
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
  const buttonRefs = useRef<Array<HTMLButtonElement | null>>([]);

  const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    if (!['ArrowRight', 'ArrowDown', 'ArrowLeft', 'ArrowUp', 'Home', 'End'].includes(event.key)) {
      return;
    }

    event.preventDefault();
    const enabledIndexes = values
      .map((item, itemIndex) => (disabledValues?.includes(item) ? -1 : itemIndex))
      .filter((itemIndex) => itemIndex >= 0);
    const currentEnabledIndex = enabledIndexes.indexOf(index);
    if (enabledIndexes.length === 0) return;

    const nextEnabledIndex =
      event.key === 'Home'
        ? 0
        : event.key === 'End'
          ? enabledIndexes.length - 1
          : (currentEnabledIndex + (event.key === 'ArrowRight' || event.key === 'ArrowDown' ? 1 : -1) +
              enabledIndexes.length) %
            enabledIndexes.length;
    const nextIndex = enabledIndexes[nextEnabledIndex];
    const nextValue = values[nextIndex];

    if (nextIndex !== undefined && nextValue !== undefined) {
      buttonRefs.current[nextIndex]?.focus();
      onChange(nextValue);
    }
  };

  return (
    <ProductOptionField action={action} label={label}>
      <div aria-label={ariaLabel} className={listClassName} role="radiogroup">
        {values.map((item, index) => {
          const isSelected = item === value;
          return (
            <Button
              aria-checked={isSelected}
              className={isSelected ? selectedButtonClassName : undefined}
              disabled={disabledValues?.includes(item)}
              key={item}
              onClick={() => onChange(item)}
              onKeyDown={(event) => handleKeyDown(event, index)}
              ref={(element) => {
                buttonRefs.current[index] = element;
              }}
              role="radio"
              tabIndex={isSelected ? 0 : -1}
            >
              {item}
            </Button>
          );
        })}
      </div>
    </ProductOptionField>
  );
}
