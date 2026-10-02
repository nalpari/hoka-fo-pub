'use client';

import type { ReactNode } from 'react';
import { Dialog } from '@base-ui/react/dialog';
import { css, cva } from 'styled-system/css';
import { Button } from '@/shared/components/atoms/Button/Button';

const viewport = cva({
  base: { position: 'fixed', inset: '0', zIndex: '100', display: 'grid', p: '6' },
  variants: {
    placement: {
      center: { placeItems: 'center', _mobile: { p: '0' } },
      centerToBottom: { placeItems: 'center', _mobile: { alignItems: 'end', p: '0' } },
    },
  },
});

const backdrop = css({ position: 'fixed', inset: '0', zIndex: '100', bg: 'rgb(17 24 39 / 56%)' });

const popup = css({
  w: 'min(640px, 100%)',
  overflow: 'hidden',
  borderRadius: '8px',
  bg: '#fff',
  boxShadow: '0 18px 42px rgb(0 0 0 / 25%)',
});

const header = css({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  minH: '14',
  px: '18px',
  borderBottom: '1px solid #edf0f2',
});

const titleStyle = css({ m: '0', fontSize: '16px' });

const closeButton = css({ p: '1', border: '0', color: '#8b95a5', fontSize: '24px' });

export type ModalDialogProps = {
  children: ReactNode;
  closeLabel: string;
  onOpenChange: (open: boolean) => void;
  open: boolean;
  placement?: 'center' | 'centerToBottom';
  popupClassName?: string;
  title: string;
};

/** Controlled, focus-managed dialog with the project's standard overlay and header. */
export function ModalDialog({
  children,
  closeLabel,
  onOpenChange,
  open,
  placement = 'center',
  popupClassName,
  title,
}: ModalDialogProps) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Backdrop className={backdrop} />
        <Dialog.Viewport className={viewport({ placement })}>
          <Dialog.Popup className={[popup, popupClassName].filter(Boolean).join(' ')}>
            <header className={header}>
              <Dialog.Title className={titleStyle}>{title}</Dialog.Title>
              <Dialog.Close render={<Button aria-label={closeLabel} className={closeButton} />}>
                ×
              </Dialog.Close>
            </header>
            {children}
          </Dialog.Popup>
        </Dialog.Viewport>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
