import type { ComponentPropsWithoutRef } from 'react';
import { cva } from 'styled-system/css';

const badge = cva({
  base: {
    display: 'inline-flex',
    alignItems: 'center',
    w: 'fit-content',
    px: '7px',
    py: '5px',
    fontSize: '10px',
    fontWeight: '700',
    lineHeight: '1',
  },
  variants: {
    tone: {
      neutral: { bg: '#111', color: '#fff' },
      accent: { bg: '#0082ca', color: '#fff' },
      danger: { bg: '#d71920', color: '#fff' },
      subtle: { bg: '#f2f2f2', color: '#555' },
    },
    shape: { square: {}, pill: { borderRadius: 'full' } },
  },
  defaultVariants: { tone: 'neutral', shape: 'square' },
});

export type BadgeProps = ComponentPropsWithoutRef<'span'> & {
  tone?: 'neutral' | 'accent' | 'danger' | 'subtle';
  shape?: 'square' | 'pill';
};

/** Compact semantic label for status, counts, and product metadata. */
export function Badge({ tone, shape, className, ...props }: BadgeProps) {
  return (
    <span {...props} className={[badge({ tone, shape }), className].filter(Boolean).join(' ')} />
  );
}
