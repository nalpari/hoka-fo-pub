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

const rail = cva({
  base: { display: 'flex' },
  variants: {
    platform: {
      web: { gap: '2' },
      mobile: {
        gap: '6px',
      },
    },
    variant: {
      plain: {
        _mobile: {
          w: 'max-content',
          h: '37px',
        },
      },
      fill: { gap: '6px', _mobile: { w: 'max-content' } },
      outline: {
        gap: '3',
        mb: '0',
        _mobile: { w: 'max-content', gap: '2', mb: '0', px: '0' },
      },
      line: {
        w: '100%',
        gap: '0',
        mb: '0',
        _mobile: {
          w: '100%',
          gap: '0',
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
      default: {},
      plain: { '&&': { _mobile: { color: 'var(--color-text-subtle)' } } },
      fill: { '&&': { color: 'var(--color-text-subtle)' } },
      line: {
        '&&': {
          color: 'var(--color-text-primary)',
          fontWeight: 'var(--font-weights-medium)',
        },
      },
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
            // color: 'var(--color-text-inverse)',
          },
        },
      },
      false: {},
    },
  },
  compoundVariants: [
    {
      variant: 'plain',
      selected: true,
      css: {
        '&&': {
          _mobile: {
            color: 'var(--color-text-primary)',
            fontWeight: 'var(--font-weights-semibold)',
          },
        },
      },
    },
    {
      variant: 'line',
      selected: true,
      css: {
        '&&': {
          color: 'var(--color-text-primary)',
          fontWeight: 'var(--font-weights-medium)',
        },
      },
    },
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

const getLabelClassName = (variant: FilterTabsProps['variant'], selected: boolean) =>
  css(label.raw({ variant, selected }));

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
      plain: {
        _mobile: { h: '100%', p: '0', borderRadius: '0', bg: 'transparent' },
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
          borderRadius: '50px',
          bg: 'var(--color-black-20)',
          whiteSpace: 'nowrap',
        },
      },
      line: {
        display: 'flex',
        flex: '1 0 0',
        alignItems: 'center',
        justifyContent: 'center',
        minW: '0',
        h: '40px',
        borderBottomWidth: '1px',
        borderBottomStyle: 'solid',
        borderBottomColor: 'black.40',
        whiteSpace: 'nowrap',
        _hover: { textDecoration: 'none' },
        _mobile: {
          p: '0',
          h: '32px',
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
      default: { _mobile: { w: 'max-content' } },
    },
    selected: {
      true: {
        _mobile: {
          bg: 'var(--color-black-100)',
          '&[data-filter-tabs-variant="plain"]': {
            bg: 'transparent',
          },
          '&[data-filter-tabs-variant="line"]': {
            bg: 'transparent',
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
      css: { borderBottomWidth: '2px', borderBottomColor: 'black.100' },
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
  railClassName?: string;
  itemClassName?: (option: FilterTabOption<T>, isSelected: boolean) => string | undefined;
  onValueChange: (value: T) => void;
  options: readonly FilterTabOption<T>[];
  value: T;
  variant?: 'default' | 'plain' | 'fill' | 'line' | 'outline';
};

const typographyByVariant = {
  default: { variant: 'cta2' },
  plain: { web: 'cta2', mo: 'bodyKr4' },
  fill: { variant: 'cta2' },
  line: { variant: 'bodyKr3', weight: 'medium' },
  outline: { variant: 'cta2' },
} as const;

/** 관련 결과를 바꾸는 단일 선택 필터 탭을 표시합니다. (Displays single-select filter tabs for related results.) */
export function FilterTabs<T extends string = string>({
  ariaLabel,
  className,
  railClassName,
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
        className={[rail({ platform, variant }), railClassName].filter(Boolean).join(' ')}
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
                {...typographyByVariant[variant]}
                className={getLabelClassName(variant, isSelected)}
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
