'use client';

import { useLayoutEffect, useRef, type ReactNode } from 'react';
import { usePlatform } from '@/shared/context/platform';
import { css, cva } from 'styled-system/css';
import { Flex, HStack } from 'styled-system/jsx';

const viewport = css({
  minW: '0',
  _mobile: {
    w: '100%',
    overflowX: 'auto',
    overflowY: 'hidden',
    scrollbarWidth: 'none',
    '&::-webkit-scrollbar': { display: 'none' },
  },
});

const rail = css({ _mobile: { w: 'max-content', px: 'var(--layout-mobile-inline-gutter)' } });

const label = cva({
  base: {
    color: '#000',
    fontSize: '16px',
    fontWeight: 400,
    letterSpacing: '-0.02em',
    lineHeight: '130%',

    _mobile: {
      fontWeight: '500',
      fontSize: '12px',
      color: '#4D4D4D',
    },
  },
  variants: {
    selected: {
      true: { fontWeight: 700, _mobile: { fontWeight: 600, color: '#FFFFFF' } },
      false: {},
    },
  },
});

const item = cva({
  base: {
    p: '0',
    border: '0',
    bg: 'transparent',
    color: 'inherit',
    cursor: 'pointer',
    _hover: { textDecoration: 'underline' },
    _disabled: { cursor: 'not-allowed', opacity: '0.55' },
    _focusVisible: { outline: '2px solid var(--color-focus-ring)', outlineOffset: '2px' },
    _mobile: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      px: '4',
      height: '30px',
      borderRadius: '99px',
      bg: '#E9EAEB',
      whiteSpace: 'nowrap',

      _hover: { textDecoration: 'none' },
    },
  },
  variants: {
    selected: { true: { _mobile: { bg: '#111', color: '#fff' } }, false: {} },
  },
});

export type FilterTabOption<T extends string = string> = {
  disabled?: boolean;
  label: ReactNode;
  value: T;
};

export type FilterTabsProps<T extends string = string> = {
  ariaLabel: string;
  className?: string;
  itemClassName?: (option: FilterTabOption<T>, isSelected: boolean) => string | undefined;
  onValueChange: (value: T) => void;
  options: readonly FilterTabOption<T>[];
  value: T;
};

/** Controlled single-select filter buttons for replacing a related result set. */
export function FilterTabs<T extends string = string>({
  ariaLabel,
  className,
  itemClassName,
  onValueChange,
  options,
  value,
}: FilterTabsProps<T>) {
  const platform = usePlatform();
  const viewportRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef(new Map<T, HTMLButtonElement>());

  useLayoutEffect(() => {
    if (platform !== 'mobile') return;

    const viewport = viewportRef.current;
    const selectedItem = itemRefs.current.get(value);

    if (!viewport || !selectedItem) return;

    const viewportBounds = viewport.getBoundingClientRect();
    const itemBounds = selectedItem.getBoundingClientRect();
    const isVisible =
      itemBounds.left >= viewportBounds.left && itemBounds.right <= viewportBounds.right;

    if (!isVisible) {
      viewport.scrollTo({
        left:
          viewport.scrollLeft +
          (itemBounds.left +
            itemBounds.width / 2 -
            (viewportBounds.left + viewportBounds.width / 2)),
      });
    }
  }, [platform, value]);

  return (
    <div className={[viewport, className].filter(Boolean).join(' ')} ref={viewportRef}>
      <HStack
        aria-label={ariaLabel}
        className={rail}
        role="group"
        gap={platform === 'mobile' ? '6px' : '16px'}
        mb={platform === 'mobile' ? '16px' : '32px'}
      >
        {options.map((option) => {
          const isSelected = option.value === value;

          return (
            <button
              aria-pressed={isSelected}
              className={[item({ selected: isSelected }), itemClassName?.(option, isSelected)]
                .filter(Boolean)
                .join(' ')}
              disabled={option.disabled}
              key={option.value}
              onClick={() => onValueChange(option.value)}
              ref={(node) => {
                if (node) itemRefs.current.set(option.value, node);
                else itemRefs.current.delete(option.value);
              }}
              type="button"
            >
              <Flex as="span" className={label({ selected: isSelected })}>
                {option.label}
              </Flex>
            </button>
          );
        })}
      </HStack>
    </div>
  );
}
