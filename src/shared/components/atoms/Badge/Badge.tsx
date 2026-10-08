import type { ComponentPropsWithoutRef } from 'react';
import { cva } from 'styled-system/css';

const badge = cva({
  base: {
    display: 'inline-flex',
    alignItems: 'center',
    w: 'fit-content',
    px: '7px',
    py: '5px',
    fontSize: '12' /* 기존: 10px */,
    fontWeight: 'bold',
    lineHeight: 'hoka',
  },
  variants: {
    tone: {
      neutral: { bg: 'var(--color-black-100)', color: 'var(--color-white-000)' },
      accent: { bg: 'var(--color-blue-100)', color: 'var(--color-white-000)' },
      danger: { bg: 'var(--color-red-100)', color: 'var(--color-white-000)' },
      subtle: { bg: 'var(--color-black-10)', color: 'var(--color-black-60)' },
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
