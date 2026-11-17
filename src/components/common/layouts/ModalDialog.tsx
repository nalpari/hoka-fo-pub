'use client';

import { Dialog } from '@base-ui/react/dialog';
import { type ComponentProps, type CSSProperties, type ReactNode } from 'react';
import { usePlatform } from '@/context/platform';

import { css, cx } from 'styled-system/css';
import { type SystemStyleObject } from 'styled-system/types';

import { Button, type ButtonTextProps } from '@/components/common/atoms/Button';
import { Icon } from '@/components/common/atoms/Icon';

import { getModalDialogClasses } from './ModalDialog.recipe';

export type ModalSize = 'sm' | 'lg';

export type ModalDialogVariant =
  | 'alert'
  | 'confirm'
  | 'terms'
  | 'form'
  | 'selection'
  | 'orderLookup'
  | 'productOption'
  | 'tracking'
  | 'detail'
  | 'image'
  | 'sizeGuide';

export type ModalMobilePresentation = 'popup' | 'fullscreen' | 'bottomSheet';

export type ModalOverlayTone = 'dark' | 'light';

type ModalActionButtonTextProps = Pick<
  ButtonTextProps,
  'className' | 'disabled' | 'fullWidth' | 'type' | 'form'
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
      buttonProps?: Pick<ModalActionButtonTextProps, 'size' | 'className'>;
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
  closeLabel: string;
  onOpenChange: (open: boolean) => void;
  open: boolean;
  size?: ModalSize;
  variant: ModalDialogVariant;
  formLayout?: 'divided';
  mobilePresentation?: ModalMobilePresentation;
  /** Keep the footer outside the scroll area on mobile fullscreen dialogs. */
  mobileFixedFooter?: boolean;
  overlayTone?: ModalOverlayTone;
  blurBackdrop?: boolean;
  popupClassName?: string;
  contentClassName?: string;
  /** 모바일 바텀시트를 최대 높이로 확장하고 본문만 스크롤합니다. */
  scrollable?: boolean;
  /** Explicit return target for a directly opened preview without a dialog trigger. */
  finalFocus?: ComponentProps<typeof Dialog.Popup>['finalFocus'];
  headerProps?: { css?: SystemStyleObject; className?: string };
  footerProps?: { css?: SystemStyleObject; className?: string; desktopContentOffset?: number };
  /** Fade the scrollable content into the fixed footer. */
  scrollFade?: boolean;
  title: ReactNode;
};

type ModalDialogContentProps =
  | {
      variant: 'alert' | 'confirm';
      message: ReactNode;
      description?: ReactNode;
      feedback?: ReactNode;
      children?: never;
      intro?: never;
      noticeLayout?: never;
    }
  | {
      variant: 'confirm';
      noticeLayout: 'result';
      intro: ReactNode;
      message: ReactNode;
      description?: ReactNode;
      feedback?: ReactNode;
      children?: never;
    }
  | {
      variant: Exclude<ModalDialogVariant, 'alert' | 'confirm'>;
      children: ReactNode;
      message?: never;
      description?: never;
      feedback?: never;
      intro?: never;
      noticeLayout?: never;
    };

export type ModalDialogProps = ModalDialogBaseProps &
  ModalDialogContentProps &
  ({ actions?: undefined; footer?: ReactNode } | { actions: ModalDialogActions; footer?: never });

/** 모달 옵션에 맞는 기본 액션 버튼을 구성합니다. (Composes standard modal action buttons.) */
function ModalDialogActionButtons({
  actions,
  onOpenChange,
  className,
}: {
  actions: ModalDialogActions;
  onOpenChange: (open: boolean) => void;
  className?: string;
}) {
  if (actions.kind === 'single') {
    return (
      <Button
        {...actions.buttonProps}
        size={actions.buttonProps?.size ?? 'tall'}
        fullWidth={actions.buttonProps?.fullWidth ?? true}
        variant="primary"
        onClick={actions.onConfirm}
      >
        {actions.label ?? '확인'}
      </Button>
    );
  }
  return (
    <div className={className}>
      <Button
        fullWidth
        {...actions.buttonProps}
        size={actions.buttonProps?.size ?? 'tall'}
        variant="secondary"
        onClick={actions.onCancel ?? (() => onOpenChange(false))}
      >
        {actions.cancelLabel ?? '취소'}
      </Button>
      <Button
        fullWidth
        {...actions.buttonProps}
        size={actions.buttonProps?.size ?? 'tall'}
        variant="primary"
        disabled={actions.confirmDisabled ?? false}
        onClick={actions.onConfirm}
      >
        {actions.confirmLabel ?? '확인'}
      </Button>
    </div>
  );
}

/** [ 개발팀 바인딩 ] 모달을 여는 기존 화면이 open·onOpenChange와 표시용 title·message·description 또는 children, actions/footer를 소유합니다. 공통 모달은 요청·성공 판정·자동 닫기를 수행하지 않습니다. 연결 소유자가 식별자와 제출 payload, pending·실패·재시도 및 성공 후 갱신을 관리하고 기존 버튼의 disabled·form·type과 콜백으로 전달합니다. */
/** 유형별 콘텐츠와 모바일 표시를 제공하고 포커스를 관리합니다. (Provides typed modal content, mobile presentations and focus management.) */
export function ModalDialog({
  children,
  message,
  description,
  feedback,
  intro,
  noticeLayout,
  closeLabel,
  footer,
  actions,
  onOpenChange,
  open,
  size,
  variant,
  formLayout,
  mobilePresentation = 'popup',
  mobileFixedFooter = false,
  overlayTone = 'dark',
  blurBackdrop = true,
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
  const footerInContent =
    platform === 'mobile' && mobilePresentation === 'fullscreen' && !mobileFixedFooter;
  const hasFooter =
    actions !== undefined || (footer !== undefined && footer !== null && footer !== false);
  const structured = message !== undefined;
  const classes = getModalDialogClasses(
    {
      variant,
      size,
      mobilePresentation,
      overlayTone,
      blur: blurBackdrop,
      sheet,
      scrollable,
      hasFooter,
      inContent: footerInContent,
      scrollFade: scrollFade && !footerInContent,
      contentOffset: footerProps?.desktopContentOffset !== undefined,
      actionDirection:
        actions?.kind === 'confirm' ? (actions.direction ?? 'horizontal') : 'horizontal',
      fullWidthActions:
        actions?.kind === 'confirm' &&
        (actions.direction === 'vertical' || (actions.fullWidth ?? true)),
      structured,
      formLayout,
      noticeLayout,
    },
    { header: headerProps?.css, footer: footerProps?.css },
  );
  const resolvedFooter = actions ? (
    <ModalDialogActionButtons
      actions={actions}
      onOpenChange={onOpenChange}
      className={classes.actions}
    />
  ) : (
    footer
  );
  const footerContent = hasFooter ? (
    <footer
      className={cx(classes.footer, footerProps?.className)}
      style={
        footerProps?.desktopContentOffset === undefined
          ? undefined
          : ({
              '--modal-footer-content-offset': `${footerProps.desktopContentOffset}px`,
            } as CSSProperties)
      }
    >
      {resolvedFooter}
    </footer>
  ) : null;

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <div className={cx(`platform-${platform}`, css({ position: 'relative', zIndex: '100' }))}>
          <Dialog.Backdrop forceRender className={classes.backdrop} />
          <Dialog.Viewport className={classes.viewport}>
            <Dialog.Popup
              finalFocus={finalFocus}
              data-modal-variant={variant}
              className={cx(classes.popup, popupClassName)}
            >
              <header className={cx(classes.header, headerProps?.className)}>
                <Dialog.Title className={classes.title}>{title}</Dialog.Title>
                <Dialog.Close
                  render={
                    <Button aria-label={closeLabel} variant="icon" size={18}>
                      <Icon name="xmark-regular" size={18} />
                    </Button>
                  }
                />
              </header>
              <div className={cx(classes.content, contentClassName)}>
                {structured ? (
                  <>
                    {feedback}
                    {intro !== undefined && <p className={classes.intro}>{intro}</p>}
                    <h3 className={classes.message}>{message}</h3>
                    {description !== undefined && description !== null && (
                      <Dialog.Description className={classes.description}>
                        {description}
                      </Dialog.Description>
                    )}
                  </>
                ) : (
                  children
                )}
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
