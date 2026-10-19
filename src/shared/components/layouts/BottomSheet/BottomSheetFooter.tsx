import { cloneElement, type ReactElement } from 'react';
import type { ButtonProps } from '@/shared/components/atoms/Button/Button';
import { css } from 'styled-system/css';

const footer = css({
  flexShrink: '0',
  p: 'var(--layout-mobile-inline-gutter) var(--layout-mobile-inline-gutter) calc(var(--layout-mobile-inline-gutter) + env(safe-area-inset-bottom))',
  borderTopWidth: '1px',
  borderTopStyle: 'solid',
  borderTopColor: 'var(--color-black-20)',
});

type BottomSheetFooterProps = {
  children: ReactElement<ButtonProps>;
};

export function BottomSheetFooter({ children }: BottomSheetFooterProps) {
  return (
    <footer className={footer}>{cloneElement(children, { size: 'tall', fullWidth: true })}</footer>
  );
}
