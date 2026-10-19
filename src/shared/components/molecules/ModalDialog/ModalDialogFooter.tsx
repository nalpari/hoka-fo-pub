import type { ReactNode } from 'react';
import { css } from 'styled-system/css';

const footerStyle = css({
  display: 'flex',
  justifyContent: 'center',
  flexShrink: '0',
  px: '4',
  pb: '6',
  '& > button': { w: '40', '--button-height': '40px', _mobile: { w: '100%' } },
});

const footerWithScrollFade = css({
  position: 'relative',
  '&::before': {
    content: '""',
    position: 'absolute',
    right: '0',
    bottom: '100%',
    left: '0',
    h: '20',
    background:
      'linear-gradient(180deg, color-mix(in srgb, var(--color-white-000) 0%, transparent) 0%, var(--color-white-000) 80%, var(--color-white-000) 100%)',
    pointerEvents: 'none',
  },
});

/** Internal fixed action region with an optional fade over scrollable content. */
export function ModalDialogFooter({
  children,
  scrollFade,
}: {
  children: ReactNode;
  scrollFade: boolean;
}) {
  return (
    <footer className={scrollFade ? `${footerStyle} ${footerWithScrollFade}` : footerStyle}>
      {children}
    </footer>
  );
}
