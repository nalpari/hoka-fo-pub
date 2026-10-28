'use client';

import { Dialog } from '@base-ui/react/dialog';
import { type ComponentProps, type ReactNode } from 'react';
import { usePlatform } from '@/context/platform';

import { css, cva } from 'styled-system/css';
import { type SystemStyleObject } from 'styled-system/types';

import { Button } from '@/components/common/atoms/Button/Button';
import { Icon } from '@/components/common/atoms/Icon/Icon';
import { Typography } from '@/components/common/atoms/Typography/Typography';

import { faXmark } from '@/icons/fontAwesome';

const header = css.raw({
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

/** 공통 모달의 제목과 닫기 영역을 표시합니다. (Displays the shared modal title and dismissal action.) */
function ModalDialogHeader({
  title,
  closeLabel,
  css: styleOverrides,
}: {
  title: ReactNode;
  closeLabel: string;
  css?: SystemStyleObject;
}) {
  return (
    <header className={css(header, styleOverrides)}>
      <Dialog.Title className={titleStyle}>
        <Typography variant="body3">{title}</Typography>
      </Dialog.Title>
      <Dialog.Close
        render={
          <Button
            aria-label={closeLabel}
            icon={<Icon fontAwesomeIcon={faXmark} size="16px" />}
            variant="ghost"
          />
        }
      />
    </header>
  );
}

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
function ModalDialogFooter({
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

const popupWithFooter = css.raw({
  display: 'flex',
  flexDirection: 'column',
  overflowX: 'hidden',
  overflowY: 'hidden',
});

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
  headerProps?: Pick<ComponentProps<typeof ModalDialogHeader>, 'css'>;
  footerProps?: Pick<ComponentProps<typeof ModalDialogFooter>, 'css'>;
  /** Fade the scrollable content into the fixed footer. */
  scrollFade?: boolean;
  title: ReactNode;
};

/** 포커스와 모바일 표시 방식을 관리하는 공통 모달입니다. (Provides a controlled modal with focus management and mobile presentations.) */
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
  headerProps,
  footerProps,
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
                css(popup.raw({ size, mobilePresentation }), Boolean(footer) && popupWithFooter),
                popupClassName,
              ]
                .filter(Boolean)
                .join(' ')}
            >
              <ModalDialogHeader {...headerProps} title={title} closeLabel={closeLabel} />
              <div className={[content, footer && scrollableContent].filter(Boolean).join(' ')}>
                {children}
              </div>
              {footer ? (
                <ModalDialogFooter {...footerProps} scrollFade={scrollFade}>
                  {footer}
                </ModalDialogFooter>
              ) : null}
            </Dialog.Popup>
          </Dialog.Viewport>
        </div>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
