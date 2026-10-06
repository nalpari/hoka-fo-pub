'use client';

import { useLayoutEffect, useRef, type ReactNode } from 'react';
import { Toggle } from '@base-ui/react/toggle';
import { ToggleGroup } from '@base-ui/react/toggle-group';
import { usePlatform } from '@/shared/context/platform';
import { css, cva } from 'styled-system/css';
import { Flex } from 'styled-system/jsx';

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

const rail = cva({
  base: { display: 'flex' },
  variants: {
    platform: {
      web: { gap: '16px', mb: '32px' },
      mobile: {
        w: 'max-content',
        gap: '6px',
        mb: '16px',
        px: 'var(--layout-mobile-inline-gutter)',
      },
    },
    variant: {
      categoryNavigation: { _mobile: { h: '46px', mb: '16px', px: '0' } },
      fill: { gap: '2', _mobile: { gap: '6px' } },
      default: {},
    },
  },
  defaultVariants: { platform: 'web', variant: 'default' },
});

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
    variant: {
      fill: {
        color: '#4D4D4D',
        fontSize: '16px',
        fontWeight: 500,
        letterSpacing: '-0.02em',
        lineHeight: '130%',
        _mobile: { fontSize: '12px', fontWeight: 500 },
      },
      default: {},
      categoryNavigation: {},
    },
    selected: {
      true: { fontWeight: 700, _mobile: { fontWeight: 600, color: '#FFFFFF' } },
      false: {},
    },
  },
  compoundVariants: [
    {
      variant: 'fill',
      selected: true,
      css: { color: '#FFFFFF', fontWeight: 600, _mobile: { color: '#FFFFFF', fontWeight: 600 } },
    },
  ],
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
    variant: {
      categoryNavigation: {
        _mobile: {
          h: '100%',
          p: '0',
          borderRadius: '0',
          bg: 'transparent',
          color: '#666',
          '& > span': { color: 'inherit', fontSize: '14px', fontWeight: '400', lineHeight: 'normal' },
        },
      },
      fill: {
        h: '35px',
        px: '16px',
        borderRadius: '50px',
        bg: '#E9EAEB',
        whiteSpace: 'nowrap',
        _hover: { textDecoration: 'none' },
        _mobile: {
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          h: '30px',
          px: '16px',
          borderRadius: '50px',
          bg: '#E9EAEB',
          whiteSpace: 'nowrap',
        },
      },
      default: {},
    },
    selected: {
      true: {
        _mobile: {
          bg: '#111',
          color: '#fff',
          '&[data-filter-tabs-variant="categoryNavigation"]': {
            bg: 'transparent',
            color: '#111',
            '& > span': { fontWeight: '600' },
          },
        },
      },
      false: {},
    },
  },
  compoundVariants: [
    {
      variant: 'fill',
      selected: true,
      css: { bg: '#000000', color: '#FFFFFF', _mobile: { bg: '#000000', color: '#FFFFFF' } },
    },
  ],
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
  variant?: 'default' | 'categoryNavigation' | 'fill';
};

/** Controlled single-select filter buttons for replacing a related result set. */
export function FilterTabs<T extends string = string>({
  ariaLabel,
  className,
  itemClassName,
  onValueChange,
  options,
  value,
  variant = 'default',
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
      <ToggleGroup
        aria-label={ariaLabel}
        className={rail({ platform, variant })}
        onValueChange={(nextValue) => {
          const next = nextValue[0];
          if (next) onValueChange(next as T);
        }}
        value={[value]}
      >
        {options.map((option) => {
          const isSelected = option.value === value;

          return (
            <Toggle
              className={[item({ selected: isSelected, variant }), itemClassName?.(option, isSelected)]
                .filter(Boolean)
                .join(' ')}
              data-filter-tabs-variant={variant}
              disabled={option.disabled}
              key={option.value}
              ref={(node) => {
                if (node) itemRefs.current.set(option.value, node);
                else itemRefs.current.delete(option.value);
              }}
              value={option.value}
            >
              <Flex as="span" className={label({ selected: isSelected, variant })}>
                {option.label}
              </Flex>
            </Toggle>
          );
        })}
      </ToggleGroup>
    </div>
  );
}
