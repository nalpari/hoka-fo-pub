'use client';

import { useState, type CSSProperties, type ReactNode } from 'react';
import { Select as BaseSelect } from '@base-ui/react/select';
import { css } from 'styled-system/css';
import { Flex } from 'styled-system/jsx';

const styles = {
  trigger: css({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    w: '100%',
    p: '8px 12px',
    border: '1px solid #d5d5d5',
    bg: '#fff',
    color: '#000000',
    cursor: 'pointer',
  }),
  label: css({
    flex: 1,
    textAlign: 'left',
    fontWeight: 400,
    fontSize: '16px',
    lineHeight: '21px',
  }),
  positioner: css({ zIndex: 10 }),
  popup: css({
    w: 'var(--anchor-width)',
    mt: '4px',
    border: '1px solid #d5d5d5',
    bg: '#fff',
    color: '#222',
    boxShadow: '0 4px 12px rgb(0 0 0 / 20%)',
  }),
  item: css({
    p: '8px 12px',
    cursor: 'pointer',
    _hover: { bg: '#f2f2f2' },
    '&[data-highlighted]': { bg: '#f2f2f2' },
  }),
  indicator: css({ display: 'block', flexShrink: 0 }),
};

export type DropdownOption = { value: string; label: ReactNode; prefix?: ReactNode };
export type DropdownProps = {
  ariaLabel: string;
  options: DropdownOption[];
  defaultValue: string;
  className?: string;
  indicator?: ReactNode;
  indicatorSize?: string;
  indicatorWidth?: string;
  indicatorHeight?: string;
  indicatorColor?: string;
  disabled?: boolean;
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
}: DropdownProps) {
  const [value, setValue] = useState(defaultValue);
  const selectedOption = options.find((option) => option.value === value);

  return (
    <BaseSelect.Root
      items={options}
      defaultValue={defaultValue}
      disabled={disabled}
      onValueChange={(nextValue) => setValue(nextValue ?? defaultValue)}
    >
      <BaseSelect.Trigger
        aria-label={ariaLabel}
        className={[styles.trigger, className].filter(Boolean).join(' ')}
        style={disabled ? { backgroundColor: '#F7F7F9', color: '#B3B3B3', cursor: 'not-allowed' } : undefined}
      >
        <Flex alignItems="center" gap="8px">
          {selectedOption?.prefix}
          <span className={styles.label} style={disabled ? { color: '#4D4D4D' } : undefined}>{selectedOption?.label}</span>
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
                  color: disabled ? '#B3B3B3' : indicatorColor,
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
                  <Flex alignItems="center" gap="8px">
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
