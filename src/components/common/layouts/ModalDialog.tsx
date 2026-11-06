'use client';

import { Dialog } from '@base-ui/react/dialog';
import { type ComponentProps, type CSSProperties, type ReactNode } from 'react';
import { usePlatform } from '@/context/platform';

import { css, cva } from 'styled-system/css';
import { HStack, Stack } from 'styled-system/jsx';
import { type SystemStyleObject } from 'styled-system/types';

import { Button, type ButtonTextProps } from '@/components/common/atoms/Button';
import { Icon } from '@/components/common/atoms/Icon';
import { Typography } from '@/components/common/atoms/Typography';

const header = css.raw({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  minH: '14',
  px: '4',
  _mobile: {
    px: '4',
  },
});

const titleStyle = css({ h: '32px' });

const sheetTitleStyle = css({ m: '0', minW: '0' });

/** 공통 모달의 제목과 닫기 영역을 표시합니다. (Displays the shared modal title and dismissal action.) */
function ModalDialogHeader({
  title,
  closeLabel,
  css: styleOverrides,
  bottomSheet = false,
  scrollable = false,
}: {
  bottomSheet?: boolean;
  scrollable?: boolean;
  title: ReactNode;
  closeLabel: string;
  css?: SystemStyleObject;
}) {
  return (
    <header
      className={css(
        header,
        bottomSheet && {
          gap: '2',
          flexShrink: '0',
          _mobile: {
            borderBottom: scrollable ? '1px solid token(colors.black.20)' : '0',
          },
        },
        styleOverrides,
      )}
    >
      <Dialog.Title className={bottomSheet ? sheetTitleStyle : titleStyle}>
        {!bottomSheet ? (
          <Typography variant="body3">{title}</Typography>
        ) : typeof title === 'string' || typeof title === 'number' ? (
          <Typography variant="headingKr9" weight="semibold">
            {title}
          </Typography>
        ) : (
          title
        )}
      </Dialog.Title>
      <Dialog.Close
        render={
          <Button aria-label={closeLabel} variant="icon" size={20}>
            <Icon name="xmark-regular" size={20} />
          </Button>
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
  inContent,
  bottomSheet,
  desktopContentOffset,
  css: styleOverrides,
}: {
  children: ReactNode;
  scrollFade: boolean;
  inContent: boolean;
  bottomSheet: boolean;
  desktopContentOffset?: number;
  css?: SystemStyleObject;
}) {
  return (
    <footer
      className={css(
        footerStyle,
        bottomSheet && { _mobile: { pb: '8' } },
        scrollFade && footerWithScrollFade,
        desktopContentOffset !== undefined && {
          paddingInlineStart: 'calc(24px + var(--modal-footer-content-offset))',
          paddingInlineEnd: '24px',
          _mobile: { paddingInlineStart: '16px', paddingInlineEnd: '16px' },
        },
        inContent && { px: '0', pt: '4' },
        styleOverrides,
      )}
      style={
        desktopContentOffset === undefined
          ? undefined
          : ({ '--modal-footer-content-offset': `${desktopContentOffset}px` } as CSSProperties)
      }
    >
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
    borderRadius: '10px',
    bg: 'var(--color-white-000)',
    boxShadow: '0 4px 4px color-mix(in srgb, var(--color-black-100) 25%, transparent)',
    _mobile: { maxH: 'calc(100dvh - 32px)', borderRadius: '0' },
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
          w: '100vw!',
          maxW: '100vw',
          maxH: 'calc(100dvh - 44px)',
          borderRadius: '24px 24px 0 0',
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

const sheetPopup = css.raw({
  display: 'flex',
  flexDirection: 'column',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    display: 'block',
    flexShrink: '0',
    w: '36px',
    h: '4px',
    borderRadius: 'full',
    bg: '#E9EAEB',
    mx: 'auto',
    mt: '2',
  },
});

const content = css({ p: '24px 24px 16px', _mobile: { p: '24px 16px 16px' } });

const scrollableContent = css({ flex: '1', minH: '0', overflowY: 'auto' });

export type ModalSize = 'sm' | 'md' | 'lg';

export type ModalMobilePresentation = 'popup' | 'fullscreen' | 'bottomSheet';

export type ModalOverlayTone = 'dark' | 'light';

type ModalActionButtonTextProps = Pick<
  ButtonTextProps,
  'className' | 'disabled' | 'fullWidth' | 'density' | 'type' | 'form'
> & { size?: 'short' | 'tall' };

export type ModalDialogActions =
  | {
      kind: 'single';
      label?: string;
      /** Submit buttons use their associated form's handler when this is omitted. */
      onConfirm?: () => void;
      buttonProps?: ModalActionButtonTextProps;
    }
  | {
      kind: 'confirm';
      buttonProps?: Pick<ModalActionButtonTextProps, 'size' | 'density' | 'className'>;
      onConfirm: () => void;
      confirmLabel?: string;
      confirmDisabled?: boolean;
      cancelLabel?: string;
      /** Defaults to requesting that the dialog close. */
      onCancel?: () => void;
      direction?: 'horizontal' | 'vertical';
      /** Vertical actions always fill the footer, even when this is false. */
      fullWidth?: boolean;
    };

type ModalDialogBaseProps = {
  children: ReactNode;
  closeLabel: string;
  onOpenChange: (open: boolean) => void;
  open: boolean;
  size?: ModalSize;
  mobilePresentation?: ModalMobilePresentation;
  /** Keep the footer outside the scroll area on mobile fullscreen dialogs. */
  mobileFixedFooter?: boolean;
  overlayTone?: ModalOverlayTone;
  popupClassName?: string;
  contentClassName?: string;
  /** 모바일 바텀시트를 최대 높이로 확장하고 본문만 스크롤합니다. */
  scrollable?: boolean;
  /** Explicit return target for a directly opened preview without a dialog trigger. */
  finalFocus?: ComponentProps<typeof Dialog.Popup>['finalFocus'];
  headerProps?: Pick<ComponentProps<typeof ModalDialogHeader>, 'css'>;
  footerProps?: Pick<ComponentProps<typeof ModalDialogFooter>, 'css' | 'desktopContentOffset'>;
  /** Fade the scrollable content into the fixed footer. */
  scrollFade?: boolean;
  title: ReactNode;
};

export type ModalDialogProps = ModalDialogBaseProps &
  ({ actions?: undefined; footer?: ReactNode } | { actions: ModalDialogActions; footer?: never });

/** 모달 옵션에 맞는 기본 액션 버튼을 구성합니다. (Composes the modal's standard action buttons from its options.) */
function ModalDialogActionButtons({
  actions,
  onOpenChange,
}: {
  actions: ModalDialogActions;
  onOpenChange: (open: boolean) => void;
}) {
  if (actions.kind === 'single') {
    return (
      <Button
        {...actions.buttonProps}
        size={actions.buttonProps?.size ?? 'short'}
        fullWidth={actions.buttonProps?.fullWidth ?? true}
        variant="primary"
        onClick={actions.onConfirm}
      >
        {actions.label ?? '확인'}
      </Button>
    );
  }

  const buttons = (
    <>
      <Button
        fullWidth
        {...actions.buttonProps}
        size={actions.buttonProps?.size ?? 'short'}
        variant="secondary"
        onClick={actions.onCancel ?? (() => onOpenChange(false))}
      >
        {actions.cancelLabel ?? '취소'}
      </Button>
      <Button
        fullWidth
        {...actions.buttonProps}
        size={actions.buttonProps?.size ?? 'short'}
        variant="primary"
        disabled={actions.confirmDisabled ?? false}
        onClick={actions.onConfirm}
      >
        {actions.confirmLabel ?? '확인'}
      </Button>
    </>
  );

  return actions.direction === 'vertical' ? (
    <Stack w="100%" gap="2">
      {buttons}
    </Stack>
  ) : (actions.fullWidth ?? true) ? (
    <HStack w="100%" gap="2" justifyContent="center">
      {buttons}
    </HStack>
  ) : (
    buttons
  );
}

/** 포커스와 모바일 표시 방식을 관리하는 공통 모달입니다. (Provides a controlled modal with focus management and mobile presentations.) */
export function ModalDialog({
  children,
  closeLabel,
  footer,
  actions,
  onOpenChange,
  open,
  size = 'md',
  mobilePresentation = 'popup',
  mobileFixedFooter = false,
  overlayTone = 'dark',
  popupClassName,
  contentClassName,
  scrollable = false,
  finalFocus,
  headerProps,
  footerProps,
  scrollFade = false,
  title,
}: ModalDialogProps) {
  const platform = usePlatform();
  const sheet = mobilePresentation === 'bottomSheet' && platform === 'mobile';
  const resolvedFooter = actions ? (
    <ModalDialogActionButtons actions={actions} onOpenChange={onOpenChange} />
  ) : (
    footer
  );

  const footerInContent =
    platform === 'mobile' && mobilePresentation === 'fullscreen' && !mobileFixedFooter;
  const footerContent = resolvedFooter ? (
    <ModalDialogFooter
      {...footerProps}
      bottomSheet={sheet}
      inContent={footerInContent}
      scrollFade={scrollFade && !footerInContent}
    >
      {resolvedFooter}
    </ModalDialogFooter>
  ) : null;

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <div className={`platform-${platform}`}>
          <Dialog.Backdrop className={backdrop({ overlayTone })} />
          <Dialog.Viewport className={viewport({ mobilePresentation })}>
            <Dialog.Popup
              finalFocus={finalFocus}
              className={[
                css(
                  popup.raw({ size, mobilePresentation }),
                  Boolean(resolvedFooter) && popupWithFooter,
                  sheet && sheetPopup,
                  sheet && scrollable && { h: 'calc(100dvh - 44px)' },
                ),
                popupClassName,
              ]
                .filter(Boolean)
                .join(' ')}
            >
              <ModalDialogHeader
                {...headerProps}
                title={title}
                closeLabel={closeLabel}
                bottomSheet={sheet}
                scrollable={scrollable}
              />
              <div
                className={[
                  !sheet && content,
                  !sheet && resolvedFooter && scrollableContent,
                  sheet &&
                    css({
                      minH: '0',
                      flex: scrollable ? '1' : '0 1 auto',
                      overflowY: 'auto',
                      p: resolvedFooter && !scrollable ? '24px 16px' : '24px 16px 32px',
                    }),
                  contentClassName,
                ]
                  .filter(Boolean)
                  .join(' ')}
              >
                {children}
                {footerInContent && footerContent}
              </div>
              {!footerInContent && footerContent}
            </Dialog.Popup>
          </Dialog.Viewport>
        </div>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
