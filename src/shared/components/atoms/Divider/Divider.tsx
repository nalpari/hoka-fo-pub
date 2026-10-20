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
  },
  defaultVariants: { variant: 'subtle' },
});

type DividerProps = Omit<ComponentProps<typeof PandaDivider>, 'orientation' | 'h' | 'bg'> & {
  variant?: 'subtle' | 'strong' | 'heading';
};

/** Decorative horizontal rule; callers own spacing and responsive visibility. */
export function Divider({ variant = 'subtle', className, ...props }: DividerProps) {
  return (
    <PandaDivider
      aria-hidden="true"
      {...props}
      orientation="horizontal"
      className={[dividerStyle({ variant }), className].filter(Boolean).join(' ')}
    />
  );
}
