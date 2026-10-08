import type { ComponentPropsWithoutRef } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { cva } from 'styled-system/css';

const link = cva({
  base: {
    display: 'inline-flex',
    alignItems: 'center',
    color: 'var(--color-black-100)',
    fontFamily: 'var(--font-family-base)',
    fontSize: '12',
    fontWeight: 'bold',
    lineHeight: 'koreanHeading',
    letterSpacing: 'korean',
    textDecoration: 'underline',
    textDecorationThickness: '1px',
    textUnderlineOffset: '3px',
    _hover: { opacity: '0.65' },
    _focusVisible: { outline: '2px solid var(--color-black-100)', outlineOffset: '3px' },
    _mobile: {
      fontSize: '12' /* 기존: 8px */,
      textUnderlineOffset: '2px',
    },
  },
});

export type LinkProps = ComponentPropsWithoutRef<typeof RouterLink>;

/** A compact, underlined text link for secondary navigation actions. */
export function Link({ className, ...props }: LinkProps) {
  return <RouterLink {...props} className={[link, className].filter(Boolean).join(' ')} />;
}
