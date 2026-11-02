import type { ComponentProps } from 'react';

import { css, cva } from 'styled-system/css';
import { Box, Divider as PandaDivider } from 'styled-system/jsx';

const dividerStyle = cva({
  variants: {
    variant: {
      subtle: { h: '1px', bg: 'black.20' },
      strong: { h: '1px', bg: 'black.100' },
      heading: { h: '2px', bg: 'black.100' },
    },
    mo: {
      subtle: { _mobile: { h: '1px', bg: 'black.20' } },
      strong: { _mobile: { h: '1px', bg: 'black.100' } },
      heading: { _mobile: { h: '2px', bg: 'black.100' } },
    },
  },
  defaultVariants: { variant: 'subtle' },
});

type DividerProps = Omit<ComponentProps<typeof PandaDivider>, 'orientation' | 'h' | 'bg'> & {
  variant?: 'subtle' | 'strong' | 'heading';
  mo?: 'subtle' | 'strong' | 'heading';
} & (
    | { orientation?: 'horizontal'; length?: never }
    | { orientation: 'vertical'; length: ComponentProps<typeof Box>['h'] }
  );

/** 장식용 가로 또는 세로 구분선을 표시합니다. (Renders a decorative horizontal or vertical divider.) */
export function Divider({
  variant = 'subtle',
  mo,
  className,
  orientation = 'horizontal',
  length,
  color,
  ...props
}: DividerProps) {
  if (orientation === 'vertical') {
    return (
      <Box
        as="span"
        aria-hidden="true"
        {...props}
        h={length}
        className={[
          css({
            w: variant === 'heading' ? '2px' : '1px',
            bg: color ?? (variant === 'subtle' ? 'black.20' : 'black.100'),
            _mobile: mo
              ? {
                  w: mo === 'heading' ? '2px' : '1px',
                  bg: color ?? (mo === 'subtle' ? 'black.20' : 'black.100'),
                }
              : undefined,
          }),
          className,
        ]
          .filter(Boolean)
          .join(' ')}
      />
    );
  }

  return (
    <PandaDivider
      aria-hidden="true"
      {...props}
      orientation="horizontal"
      color={color}
      className={[dividerStyle({ variant, mo }), className].filter(Boolean).join(' ')}
    />
  );
}
