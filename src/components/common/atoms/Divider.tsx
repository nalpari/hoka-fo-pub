import type { ComponentProps } from 'react';

import { cva } from 'styled-system/css';
import { Divider as PandaDivider } from 'styled-system/jsx';

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
};

/** 장식용 가로 구분선을 기본 및 모바일 variant로 표시합니다. (Renders a decorative horizontal divider with base and mobile variants.) */
export function Divider({ variant = 'subtle', mo, className, ...props }: DividerProps) {
  return (
    <PandaDivider
      aria-hidden="true"
      {...props}
      orientation="horizontal"
      className={[dividerStyle({ variant, mo }), className].filter(Boolean).join(' ')}
    />
  );
}
