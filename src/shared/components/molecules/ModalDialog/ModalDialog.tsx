'use client';

import type { ReactNode } from 'react';
import { Dialog } from '@base-ui/react/dialog';
import { css, cva } from 'styled-system/css';
import { usePlatform } from '@/shared/context/platform';
import { Icon } from '@/shared/components/atoms/Icon/Icon';
import { Typography } from '@/shared/components/atoms/Typography/Typography';
import { faXmark } from '@/shared/icons/fontAwesome';

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
      lg: { maxW: 'min(1080px, 75vw)' },
    },
    mobilePresentation: {
      popup: { _mobile: { maxW: 'none' } },
      fullscreen: {
        _mobile: {
          w: '100vw',
          h: '100dvh',
          maxH: '100dvh',
          borderRadius: '0',
        },
      },
      bottomSheet: {
        _mobile: {
          maxH: 'calc(100dvh - 16px)',
          borderRadius: '0',
        },
      },
    },
  },
  defaultVariants: { size: 'md', mobilePresentation: 'popup' },
});

const header = css({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  minH: '14',
  px: '4',
  bg: 'var(--color-surface-subtle)',
  _mobile: {
    px: '4',
  },
});

const titleStyle = css({ height: '32px' });

const closeButton = css({
  display: 'grid',
  placeItems: 'center',
  w: '4',
  h: '4',
  p: '0',
  color: 'var(--color-black-60)',
  '& svg': { w: '4', h: '4' },
});

export type ModalSize = 'sm' | 'md' | 'lg';
export type ModalMobilePresentation = 'popup' | 'fullscreen' | 'bottomSheet';
export type ModalOverlayTone = 'dark' | 'light';

export type ModalDialogProps = {
  children: ReactNode;
  closeLabel: string;
  onOpenChange: (open: boolean) => void;
  open: boolean;
  size?: ModalSize;
  mobilePresentation?: ModalMobilePresentation;
  overlayTone?: ModalOverlayTone;
  popupClassName?: string;
  title: ReactNode;
};

/** Controlled, focus-managed modal following HDS overlay, sizing, and mobile presentation rules. */
export function ModalDialog({
  children,
  closeLabel,
  onOpenChange,
  open,
  size = 'md',
  mobilePresentation = 'popup',
  overlayTone = 'dark',
  popupClassName,
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
              className={[popup({ size, mobilePresentation }), popupClassName]
                .filter(Boolean)
                .join(' ')}
            >
              <header className={header}>
                <Dialog.Title className={titleStyle}>
                  <Typography as="span">
                    {title}
                  </Typography>
                </Dialog.Title>
                <Dialog.Close
                  render={<button type="button" aria-label={closeLabel} className={closeButton} />}
                >
                  <Icon fontAwesomeIcon={faXmark} size="16px" />
                </Dialog.Close>
              </header>
              {children}
            </Dialog.Popup>
          </Dialog.Viewport>
        </div>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
