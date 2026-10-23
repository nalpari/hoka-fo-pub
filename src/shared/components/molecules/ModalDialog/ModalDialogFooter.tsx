import type { ReactNode } from 'react';
import { css } from 'styled-system/css';
import type { SystemStyleObject } from 'styled-system/types';

const footerStyle = css.raw({
  display: 'flex',
  justifyContent: 'center',
  flexShrink: '0',
  gap: '2',
  px: '4',
  pb: '6',
  '& > button': { w: '40', '--button-height': '40px', _mobile: { w: '100%' } },
});

const footerWithScrollFade = css.raw({
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

/** 모달의 고정 액션과 선택적 스크롤 페이드를 표시합니다. (Displays fixed modal actions and an optional scroll fade.) */
export function ModalDialogFooter({
  children,
  scrollFade,
  css: styleOverrides,
}: {
  children: ReactNode;
  scrollFade: boolean;
  css?: SystemStyleObject;
}) {
  return (
    <footer className={css(footerStyle, scrollFade && footerWithScrollFade, styleOverrides)}>
      {children}
    </footer>
  );
}
