'use client';

import type { ComponentPropsWithoutRef } from 'react';
import RouterLink from 'next/link';
import { cva } from 'styled-system/css';

const link = cva({
  base: {
    display: 'inline-flex',
    alignItems: 'center',
    color: 'var(--color-text-primary)',
    fontFamily: 'var(--font-family-base)',
    fontWeight: 'bold',
    lineHeight: 'koreanHeading',
    letterSpacing: 'korean',
    textDecoration: 'underline',
    textDecorationThickness: '1px',
    textUnderlineOffset: '3px',
    _hover: { opacity: '0.65' },
    _focusVisible: { outline: '2px solid var(--color-black-100)', outlineOffset: '3px' },
    _mobile: {
      textUnderlineOffset: '2px',
    },
  },
  variants: {
    size: {
      lg: { fontSize: '16px' },
      md: { fontSize: '14px' },
      sm: { fontSize: '12px' },
    },
  },
  defaultVariants: { size: 'sm' },
});

export type LinkProps = ComponentPropsWithoutRef<typeof RouterLink> & {
  size?: 'lg' | 'md' | 'sm';
};

/** An underlined text link with the shared Text Link 1/2/3 type scale. */
export function Link({ className, size = 'sm', ...props }: LinkProps) {
  return (
    <RouterLink {...props} className={[link({ size }), className].filter(Boolean).join(' ')} />
  );
}
