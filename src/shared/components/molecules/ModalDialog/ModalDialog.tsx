'use client';

import type { ReactNode } from 'react';
import { Dialog } from '@base-ui/react/dialog';
import { css, cva } from 'styled-system/css';
import { ModalDialogHeader } from '@/shared/components/molecules/ModalDialog/ModalDialogHeader';
import { ModalDialogFooter } from '@/shared/components/molecules/ModalDialog/ModalDialogFooter';
import { usePlatform } from '@/shared/context/platform';

const viewport = cva({
  base: {
    position: 'fixed',
    inset: '0',
    zIndex: '100',
    display: 'grid',
    placeItems: 'center',
    p: '6',
  },
  variants: {
    mobilePresentation: {
      popup: { _mobile: { p: '4' } },
      fullscreen: { _mobile: { p: '0' } },
      bottomSheet: { _mobile: { alignItems: 'end', p: '0' } },
    },
  },
  defaultVariants: { mobilePresentation: 'popup' },
});

const backdrop = cva({
  base: {
    position: 'fixed',
    inset: '0',
    zIndex: '99',
    backdropFilter: 'blur(48px)',
  },
  variants: {
    overlayTone: {
      dark: { bg: 'color-mix(in srgb, var(--color-black-100) 50%, transparent)' },
      light: { bg: 'color-mix(in srgb, var(--color-white-000) 50%, transparent)' },
    },
  },
  defaultVariants: { overlayTone: 'dark' },
});

const popup = cva({
  base: {
    w: '100%',
    maxH: 'calc(100dvh - 48px)',
    overflowY: 'auto',
    borderRadius: '0',
    bg: 'var(--color-white-000)',
    boxShadow: '0 4px 4px color-mix(in srgb, var(--color-black-100) 25%, transparent)',
    _mobile: { maxH: 'calc(100dvh - 32px)' },
  },
  variants: {
    size: {
      sm: { maxW: '420px' },
      md: { maxW: '568px' },
      lg: { maxW: '864px' },
    },
    mobilePresentation: {
      popup: {
        _mobile: { w: 'calc(100vw - 32px)!', maxW: 'none' },
      },
      fullscreen: {
        _mobile: {
          w: '100vw!',
          h: '100dvh',
          maxH: '100dvh',
          borderRadius: '0',
        },
      },
      bottomSheet: {
        _mobile: {
          w: 'calc(100vw - 32px)!',
          maxH: 'calc(100dvh - 16px)',
          borderRadius: '0',
        },
      },
    },
  },
  defaultVariants: { size: 'md', mobilePresentation: 'popup' },
});

const popupWithFooter = css({ display: 'flex', flexDirection: 'column', overflow: 'hidden' });

const content = css({ p: '24px 24px 16px', _mobile: { p: '24px 16px 16px 16px' } });

const scrollableContent = css({ flex: '1', minH: '0', overflowY: 'auto' });

export type ModalSize = 'sm' | 'md' | 'lg';

export type ModalMobilePresentation = 'popup' | 'fullscreen' | 'bottomSheet';

export type ModalOverlayTone = 'dark' | 'light';

export type ModalDialogProps = {
  children: ReactNode;
  closeLabel: string;
  footer?: ReactNode;
  onOpenChange: (open: boolean) => void;
  open: boolean;
  size?: ModalSize;
  mobilePresentation?: ModalMobilePresentation;
  overlayTone?: ModalOverlayTone;
  popupClassName?: string;
  /** Fade the scrollable content into the fixed footer. */
  scrollFade?: boolean;
  title: ReactNode;
};

/** Controlled, focus-managed modal following HDS overlay, sizing, and mobile presentation rules. */
export function ModalDialog({
  children,
  closeLabel,
  footer,
  onOpenChange,
  open,
  size = 'md',
  mobilePresentation = 'popup',
  overlayTone = 'dark',
  popupClassName,
  scrollFade = false,
  title,
}: ModalDialogProps) {
  const platform = usePlatform();

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <div className={`platform-${platform}`}>
          <Dialog.Backdrop className={backdrop({ overlayTone })} />
          <Dialog.Viewport className={viewport({ mobilePresentation })}>
            <Dialog.Popup
              className={[
                popup({ size, mobilePresentation }),
                footer ? popupWithFooter : '',
                popupClassName,
              ]
                .filter(Boolean)
                .join(' ')}
            >
              <ModalDialogHeader title={title} closeLabel={closeLabel} />
              <div className={[content, footer && scrollableContent].filter(Boolean).join(' ')}>
                {children}
              </div>
              {footer ? (
                <ModalDialogFooter scrollFade={scrollFade}>{footer}</ModalDialogFooter>
              ) : null}
            </Dialog.Popup>
          </Dialog.Viewport>
        </div>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
