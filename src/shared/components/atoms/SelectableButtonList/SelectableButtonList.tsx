import { useMemo, useRef } from 'react';
import type { KeyboardEvent, ReactNode } from 'react';
import { Button, type ButtonProps } from '@/shared/components/atoms/Button/Button';
import { Box } from 'styled-system/jsx';

type Primitive = string | number;
type Selection<T extends Primitive = Primitive> = T | T[];

type SelectableButtonListOption<T extends Primitive = Primitive> = {
  value: T;
  label?: ReactNode;
  disabled?: boolean;
  description?: ReactNode;
  meta?: unknown;
};

type SelectableButtonListProps<T extends Primitive = Primitive> = {
  values?: T[];
  options?: SelectableButtonListOption<T>[];
  selected: Selection<T>;
  onChange: (selected: Selection<T>) => void;
  multiple?: boolean;
  disabledValues?: T[];
  className?: string;
  buttonSize?: ButtonProps['size'];
  buttonClassName?: (value: T, isSelected: boolean) => string | undefined;
  renderValue?: (value: T, option?: SelectableButtonListOption<T>) => ReactNode;
  renderOption?: (option: SelectableButtonListOption<T>, isSelected: boolean) => ReactNode;
  ariaLabel?: string;
};

/** A controlled button list for product options, filter pills, and toggle controls. */
export function SelectableButtonList<T extends Primitive = Primitive>({
  values,
  options,
  selected,
  onChange,
  multiple = false,
  disabledValues = [],
  className,
  buttonSize,
  buttonClassName,
  renderValue,
  renderOption,
  ariaLabel,
}: SelectableButtonListProps<T>) {
  const buttonRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const normalizedOptions = useMemo(() => {
    if (options && options.length > 0) {
      return options;
    }

    const fallbackValues = values ?? [];
    return fallbackValues.map<SelectableButtonListOption<T>>((value) => ({
      value,
      label: String(value),
    }));
  }, [options, values]);

  const selectedValues = useMemo(() => {
    const selection = Array.isArray(selected) ? selected : [selected];
    return selection.filter((item) => item !== undefined && item !== null) as T[];
  }, [selected]);

  const handleClick = (value: T) => {
    if (multiple) {
      const nextSelection = selectedValues.includes(value)
        ? selectedValues.filter((item) => item !== value)
        : [...selectedValues, value];
      onChange(nextSelection as Selection<T>);
      return;
    }

    onChange(value as Selection<T>);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>, index: number) => {
    if (!['ArrowRight', 'ArrowDown', 'ArrowLeft', 'ArrowUp', 'Home', 'End'].includes(event.key)) {
      return;
    }

    event.preventDefault();
    const total = normalizedOptions.length;
    let nextIndex = index;

    if (event.key === 'ArrowRight' || event.key === 'ArrowDown') nextIndex = (index + 1) % total;
    if (event.key === 'ArrowLeft' || event.key === 'ArrowUp')
      nextIndex = (index - 1 + total) % total;
    if (event.key === 'Home') nextIndex = 0;
    if (event.key === 'End') nextIndex = total - 1;

    const nextButton = buttonRefs.current[nextIndex];
    if (nextButton) {
      nextButton.focus();
      const nextValue = normalizedOptions[nextIndex]?.value;
      if (nextValue !== undefined && !multiple) {
        onChange(nextValue as Selection<T>);
      }
    }
  };

  return (
    <Box
      aria-label={ariaLabel}
      className={className}
      onKeyDown={(event) => {
        const target = event.target as HTMLElement;
        const currentIndex = buttonRefs.current.indexOf(target as HTMLButtonElement);
        if (currentIndex >= 0) handleKeyDown(event, currentIndex);
      }}
      role={multiple ? 'group' : 'radiogroup'}
    >
      {normalizedOptions.map((option, index) => {
        const value = option.value;
        const isSelected = selectedValues.includes(value);
        const isDisabled = Boolean(option.disabled) || disabledValues.includes(value);

        return (
          <Button
            size={buttonSize}
            {...(multiple
              ? {}
              : { role: 'radio', 'aria-checked': isSelected, tabIndex: isSelected ? 0 : -1 })}
            aria-pressed={multiple ? isSelected : undefined}
            className={buttonClassName?.(value, isSelected)}
            disabled={isDisabled}
            key={String(value)}
            onClick={() => handleClick(value)}
            ref={(element) => {
              buttonRefs.current[index] = element;
            }}
          >
            {renderOption
              ? renderOption(option, isSelected)
              : renderValue
                ? renderValue(value, option)
                : (option.label ?? value)}
          </Button>
        );
      })}
    </Box>
  );
}
