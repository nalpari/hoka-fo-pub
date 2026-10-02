import type { MouseEventHandler } from 'react';
import { Link } from 'react-router-dom';
import { css } from 'styled-system/css';

const logo = css({
  display: 'flex',
  alignItems: 'center',
  flexShrink: 0,
  w: '85px',
  h: '23px',
  '& img': { display: 'block', w: '100%', h: '100%', objectFit: 'contain' },
  _mobile: { order: 0, w: '74px', h: '5' },
});

type HeaderLogoProps = {
  onClick?: MouseEventHandler<HTMLAnchorElement>;
};

export function HeaderLogo({ onClick }: HeaderLogoProps) {
  return (
    <Link className={logo} to="/" onClick={onClick} aria-label="HOKA 홈으로">
      <img src="/images/header/logo-primary.svg" alt="HOKA" />
    </Link>
  );
}
