'use client';

import { useState, type CSSProperties, type ReactNode } from 'react';
import { Select as BaseSelect } from '@base-ui/react/select';
import { css, cva } from 'styled-system/css';
import { Flex } from 'styled-system/jsx';

const styles = {
  trigger: cva({
    base: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      w: '100%',
      py: '2',
      px: '3',
      border: '1px solid var(--color-black-20)',
      bg: 'var(--color-white-000)',
      color: 'var(--color-black-100)',
      cursor: 'pointer',
    },
    variants: {
      disabled: {
        true: {
          bg: 'var(--color-black-10)',
          color: 'var(--color-black-40)',
          cursor: 'not-allowed',
        },
        false: {},
      },
    },
  }),
  label: cva({
    base: {
      flex: 1,
      textAlign: 'left',
      fontWeight: 'var(--font-weights-normal)',
      fontSize: '16',
      lineHeight: 'body',
    },
    variants: { disabled: { true: { color: 'var(--color-black-60)' }, false: {} } },
  }),
  positioner: css({ zIndex: 10 }),
  popup: css({
    w: 'var(--anchor-width)',
    mt: '1',
    border: '1px solid var(--color-black-20)',
    bg: 'var(--color-white-000)',
    color: 'var(--color-black-100)',
    boxShadow: '0 4px 12px color-mix(in srgb, var(--color-black-100) 20%, transparent)',
  }),
  item: css({
    py: '2',
    px: '3',
    cursor: 'pointer',
    _hover: { bg: 'var(--color-black-10)' },
    '&[data-highlighted]': { bg: 'var(--color-black-10)' },
  }),
  indicator: css({ display: 'block', flexShrink: 0 }),
};

export type DropdownOption = { value: string; label: ReactNode; prefix?: ReactNode };
export type DropdownProps = {
  ariaLabel: string;
  options: readonly DropdownOption[];
  defaultValue?: string;
  className?: string;
  indicator?: ReactNode;
  indicatorSize?: string;
  indicatorWidth?: string;
  indicatorHeight?: string;
  indicatorColor?: string;
  disabled?: boolean;
  onValueChange?: (value: string) => void;
  value?: string;
};

export function Dropdown({
  ariaLabel,
  options,
  defaultValue,
  className,
  indicator,
  indicatorSize = '12px',
  indicatorWidth = indicatorSize,
  indicatorHeight = indicatorSize,
  indicatorColor = 'currentColor',
  disabled = false,
  onValueChange,
  value: controlledValue,
}: DropdownProps) {
  const fallbackValue = defaultValue ?? options[0]?.value ?? '';
  const [uncontrolledValue, setUncontrolledValue] = useState(fallbackValue);
  const value = controlledValue ?? uncontrolledValue;
  const selectedOption = options.find((option) => option.value === value);

  return (
    <BaseSelect.Root
      items={options}
      defaultValue={fallbackValue}
      disabled={disabled}
      onValueChange={(nextValue) => {
        const next = nextValue ?? fallbackValue;

        if (controlledValue === undefined) setUncontrolledValue(next);
        onValueChange?.(next);
      }}
      value={controlledValue}
    >
      <BaseSelect.Trigger
        aria-label={ariaLabel}
        className={[styles.trigger({ disabled }), className].filter(Boolean).join(' ')}
      >
        <Flex alignItems="center" gap="2">
          {selectedOption?.prefix}
          <span className={styles.label({ disabled })}>{selectedOption?.label}</span>
        </Flex>
        <BaseSelect.Icon>
          {indicator ?? (
            <svg
              aria-hidden="true"
              className={styles.indicator}
              fill="none"
              viewBox="0 0 12 18"
              style={
                {
                  width: indicatorWidth,
                  height: indicatorHeight,
                  color: disabled ? 'var(--color-black-40)' : indicatorColor,
                } as CSSProperties
              }
            >
              <path
                d="M6.79434 12.5441C6.35488 12.9836 5.64121 12.9836 5.20176 12.5441L0.701758 8.04414C0.37832 7.7207 0.283398 7.23906 0.45918 6.81719C0.634961 6.39531 1.04277 6.12109 1.4998 6.12109H10.4998C10.9533 6.12109 11.3646 6.39531 11.5404 6.81719C11.7162 7.23906 11.6178 7.7207 11.2979 8.04414L6.79785 12.5441H6.79434Z"
                fill="currentColor"
              />
            </svg>
          )}
        </BaseSelect.Icon>
      </BaseSelect.Trigger>
      <BaseSelect.Portal>
        <BaseSelect.Positioner className={styles.positioner} sideOffset={4}>
          <BaseSelect.Popup className={styles.popup}>
            <BaseSelect.List>
              {options.map((option) => (
                <BaseSelect.Item className={styles.item} key={option.value} value={option.value}>
                  <Flex alignItems="center" gap="2">
                    {option.prefix}
                    <span>{option.label}</span>
                  </Flex>
                </BaseSelect.Item>
              ))}
            </BaseSelect.List>
          </BaseSelect.Popup>
        </BaseSelect.Positioner>
      </BaseSelect.Portal>
    </BaseSelect.Root>
  );
}
