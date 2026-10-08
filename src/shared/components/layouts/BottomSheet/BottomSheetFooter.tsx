import type { ReactNode } from 'react';
import { css } from 'styled-system/css';

const footer = css({
  flexShrink: '0',
  p: 'var(--layout-mobile-inline-gutter) var(--layout-mobile-inline-gutter) calc(var(--layout-mobile-inline-gutter) + env(safe-area-inset-bottom))',
  borderTopWidth: '1px',
  borderTopStyle: 'solid',
  borderTopColor: 'var(--color-black-20)',
});

type BottomSheetFooterProps = {
  children: ReactNode;
};

export function BottomSheetFooter({ children }: BottomSheetFooterProps) {
  return <footer className={footer}>{children}</footer>;
}
