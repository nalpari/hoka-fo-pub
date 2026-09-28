import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { Icon } from '@/shared/components/atoms/Icon/Icon';
import { usePlatform } from '@/shared/context/platform';
import { css } from 'styled-system/css';

const iconLink = css({
  position: 'relative',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  w: '34px',
  h: '36px',
  '& img': { display: 'block' },
  _mobile: { w: '32px', h: '32px' },
});

export type HeaderIconProps = {
  desktopSrc: string;
  mobileSrc?: string;
  alt?: string;
};

export type HeaderIconLinkProps = {
  to: string;
  ariaLabel: string;
  className?: string;
  icon: HeaderIconProps;
  children?: ReactNode;
};

export function HeaderIcon({ desktopSrc, mobileSrc = desktopSrc, alt = '' }: HeaderIconProps) {
  const platform = usePlatform();

  return (
    <Icon
      src={platform === 'mobile' ? mobileSrc : desktopSrc}
      alt={alt}
      size={platform === 'mobile' ? '20px' : '22px'}
    />
  );
}

export function HeaderIconLink({ to, ariaLabel, className, icon, children }: HeaderIconLinkProps) {
  return (
    <Link
      to={to}
      aria-label={ariaLabel}
      className={[iconLink, className].filter(Boolean).join(' ')}
    >
      <HeaderIcon {...icon} />
      {children}
    </Link>
  );
}
