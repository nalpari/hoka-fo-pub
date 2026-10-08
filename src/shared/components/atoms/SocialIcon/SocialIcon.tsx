import type { AnchorHTMLAttributes } from 'react';
import { css } from 'styled-system/css';

const socialLink = css({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '24px',
  height: '24px',
  padding: '0',
  color: 'var(--color-white-000)',
  flexShrink: '0',
  transition: 'border-color 0.15s ease, background-color 0.15s ease',
  _hover: {
    borderColor: 'color-mix(in srgb, var(--color-white-000) 80%, transparent)',
    backgroundColor: 'color-mix(in srgb, var(--color-white-000) 12%, transparent)',
  },
  _focusVisible: {
    outline: '2px solid currentColor',
    outlineOffset: '2px',
  },
});

const socialIcon = css({
  display: 'block',
  width: '24px',
  height: '24px',
  objectFit: 'contain',
  flexShrink: '0',
  filter: 'brightness(0) invert(1)',
});

export type SocialIconLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  label: string;
  file: string;
  href?: string;
};

export function SocialIconLink({
  label,
  file,
  href = '#',
  className,
  ...props
}: SocialIconLinkProps) {
  return (
    <a
      {...props}
      href={href}
      className={[socialLink, className].filter(Boolean).join(' ')}
      aria-label={label}
      title={label}
    >
      <img src={`/images/icon/social/${file}`} alt={label} className={socialIcon} />
    </a>
  );
}
