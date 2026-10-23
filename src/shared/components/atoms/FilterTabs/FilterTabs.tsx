'use client';

import { Typography } from '@/shared/components/atoms/Typography/Typography';
import { useLayoutEffect, useRef, type ReactNode } from 'react';
import { Toggle } from '@base-ui/react/toggle';
import { ToggleGroup } from '@base-ui/react/toggle-group';
import { usePlatform } from '@/shared/context/platform';
import { css, cva } from 'styled-system/css';

const viewport = css({
  minW: '0',
  _mobile: {
    w: '100%',
    overflowX: 'auto',
    overflowY: 'hidden',
    scrollbarWidth: 'none',
    '&::-webkit-scrollbar': {
      display: 'none',
    },
  },
});

const lineViewport = css({
  _mobile: {
    borderBottomWidth: '1px',
    borderBottomStyle: 'solid',
    borderBottomColor: 'black.20',
  },
});

const rail = cva({
  base: { display: 'flex' },
  variants: {
    platform: {
      web: { gap: '4', mb: '8' },
      mobile: {
        w: 'max-content',
        gap: '6px',
        mb: '4',
        px: 'var(--layout-mobile-inline-gutter)',
      },
    },
    variant: {
      categoryNavigation: {
        _mobile: {
          h: '37px',
          mb: '4',
          px: '0',
        },
      },
      fill: {
        gap: '2',
        _mobile: {
          gap: '6px',
        },
      },
      outline: {
        gap: '3',
        mb: '0',
        _mobile: { gap: '2', mb: '0', px: '0' },
      },
      line: {
        gap: '6',
        mb: '0',
        _mobile: {
          gap: '5',
          mb: '0',
          px: '0',
        },
      },
      default: {},
    },
  },
  defaultVariants: { platform: 'web', variant: 'default' },
});

const label = cva({
  base: {
    '&&': {
      color: 'var(--color-text-primary)',
    },
  },
  variants: {
    variant: {
      fill: { '&&': { color: 'var(--color-text-subtle)' } },
      default: {},
      categoryNavigation: {},
      line: {},
      outline: {
        '&&': { color: 'inherit', _mobile: { color: 'inherit' } },
      },
    },
    selected: {
      true: {
        '&&': {
          fontWeight: 'var(--font-weights-bold)',
          _mobile: {
            fontWeight: 'var(--font-weights-semibold)',
            color: 'var(--color-text-inverse)',
          },
        },
      },
      false: {},
    },
  },
  compoundVariants: [
    {
      variant: 'outline',
      selected: true,
      css: { '&&': { color: 'inherit', _mobile: { color: 'inherit' } } },
    },
    {
      variant: 'fill',
      selected: true,
      css: {
        '&&': {
          color: 'var(--color-text-inverse)',
          fontWeight: 'var(--font-weights-semibold)',
          _mobile: {
            color: 'var(--color-text-inverse)',
            fontWeight: 'var(--font-weights-semibold)',
          },
        },
      },
    },
  ],
});

const item = cva({
  base: {
    p: '0',
    border: '0',
    bg: 'transparent',
    cursor: 'pointer',
    _hover: {
      textDecoration: 'underline',
    },
    _disabled: {
      cursor: 'not-allowed',
      opacity: '0.55',
    },
    _focusVisible: {
      outline: '2px solid var(--color-focus-ring)',
      outlineOffset: '2px',
    },
    _mobile: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      px: '4',
      height: '30px',
      borderRadius: '99px',
      bg: 'var(--color-black-20)',
      whiteSpace: 'nowrap',
      _hover: {
        textDecoration: 'none',
      },
    },
    '&&': {
      color: 'inherit',
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
        },
        '&&': { _mobile: { color: 'var(--color-text-tertiary)' } },
      },
      fill: {
        h: '37px',
        px: '4',
        borderRadius: '50px',
        bg: 'var(--color-black-20)',
        whiteSpace: 'nowrap',
        _hover: {
          textDecoration: 'none',
        },
        _mobile: {
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          h: '37px',
          px: 'var(--home-body-16, var(--spacing-4))',
          borderRadius: '50px',
          bg: 'var(--color-black-20)',
          whiteSpace: 'nowrap',
        },
      },
      line: {
        display: 'flex',
        flex: '0 0 auto',
        alignItems: 'center',
        justifyContent: 'center',
        h: '37px',
        borderBottomWidth: '2px',
        borderBottomStyle: 'solid',
        borderBottomColor: 'transparent',
        whiteSpace: 'nowrap',
        _hover: { textDecoration: 'none' },
        _mobile: {
          p: '0',
          borderRadius: '0',
          bg: 'transparent',
        },
      },
      outline: {
        display: 'flex',
        flex: '0 0 auto',
        alignItems: 'center',
        justifyContent: 'center',
        h: '37px',
        px: '4',
        border: '1px solid',
        borderColor: 'black.40',
        borderRadius: 'full',
        bg: 'white.0',
        whiteSpace: 'nowrap',
        '&&': { color: 'var(--color-text-tertiary)' },
        _hover: { textDecoration: 'none' },
        _mobile: { bg: 'white.0', px: '3' },
      },
      default: {},
    },
    selected: {
      true: {
        _mobile: {
          bg: 'var(--color-black-100)',
          '&[data-filter-tabs-variant="categoryNavigation"]': {
            bg: 'transparent',
          },
          '&[data-filter-tabs-variant="line"]': {
            bg: 'transparent',
          },
        },
        '&&': {
          _mobile: {
            '&[data-filter-tabs-variant="categoryNavigation"]': {
              color: 'var(--color-text-primary)',
            },
            color: 'var(--color-text-inverse)',
          },
        },
      },
      false: {},
    },
  },
  compoundVariants: [
    {
      variant: 'outline',
      selected: true,
      css: {
        bg: 'black.100',
        borderColor: 'black.100',
        '&&': { color: 'var(--color-text-inverse)' },
        _mobile: { bg: 'black.100' },
      },
    },
    {
      variant: 'line',
      selected: true,
      css: { borderBottomColor: 'black.100' },
    },
    {
      variant: 'fill',
      selected: true,
      css: {
        bg: 'var(--color-black-100)',
        _mobile: {
          bg: 'var(--color-black-100)',
        },
        '&&': {
          color: 'var(--color-text-inverse)',
          _mobile: {
            color: 'var(--color-text-inverse)',
          },
        },
      },
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
  variant?: 'default' | 'categoryNavigation' | 'fill' | 'line' | 'outline';
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
  const mobileCategory = platform === 'mobile' && variant === 'categoryNavigation';
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
    <div
      className={[viewport, variant === 'line' ? lineViewport : '', className]
        .filter(Boolean)
        .join(' ')}
      ref={viewportRef}
    >
      <ToggleGroup
        aria-label={ariaLabel}
        className={rail({ platform, variant })}
        onValueChange={(nextValue) => {
          const next = nextValue[0];
          if (next !== undefined) onValueChange(next as T);
        }}
        value={[value]}
      >
        {options.map((option) => {
          const isSelected = option.value === value;

          return (
            <Toggle
              className={[
                item({ selected: isSelected, variant }),
                itemClassName?.(option, isSelected),
              ]
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
              <Typography
                variant={mobileCategory ? 'bodyKr4' : 'cta2'}
                weight={
                  variant === 'line' || (mobileCategory && isSelected) ? 'semibold' : undefined
                }
                tone={
                  mobileCategory
                    ? isSelected
                      ? 'primary'
                      : 'subtle'
                    : variant === 'line'
                      ? isSelected
                        ? 'primary'
                        : 'tertiary'
                      : undefined
                }
                className={
                  variant === 'line' || mobileCategory
                    ? undefined
                    : label({ selected: isSelected, variant })
                }
              >
                {option.label}
              </Typography>
            </Toggle>
          );
        })}
      </ToggleGroup>
    </div>
  );
}
