import type { ComponentPropsWithoutRef } from 'react';
import Link from 'next/link';
import { css } from 'styled-system/css';

const textLink = css({
  color: 'text.primary',
  textDecoration: 'underline',
  textUnderlineOffset: '3px',
  _focusVisible: { outline: '2px solid', outlineOffset: '4px' },
});

type Props = Omit<ComponentPropsWithoutRef<'a'>, 'className' | 'href'> & { href: string };

export function ProductSupportTextLink({ href, ...props }: Props) {
  return href.startsWith('/') ? (
    <Link {...props} href={href} className={textLink} />
  ) : (
    <a {...props} href={href} className={textLink} />
  );
}
