import { Button, type ButtonProps } from '@/shared/components/atoms/Button/Button';
import {
  ModalDialog,
  type ModalDialogProps,
} from '@/shared/components/molecules/ModalDialog/ModalDialog';

export type SingleActionDialogProps = Omit<ModalDialogProps, 'footer'> & {
  confirmLabel?: string;
  /** Non-submit actions use this callback; submit actions use the associated form's handler. */
  onConfirm?: () => void;
  confirmButtonProps?: Pick<
    ButtonProps,
    'className' | 'disabled' | 'fullWidth' | 'density' | 'type' | 'form'
  > & {
    size?: 'short' | 'tall';
  };
};

/** 단일 확인 또는 폼 제출 액션을 고정 푸터에 표시합니다. (Displays one confirmation or form submission action in a fixed footer.) */
export function SingleActionDialog({
  confirmLabel = '확인',
  onConfirm,
  confirmButtonProps,
  ...props
}: SingleActionDialogProps) {
  return (
    <ModalDialog
      {...props}
      footer={
        <Button
          {...confirmButtonProps}
          size={confirmButtonProps?.size ?? 'short'}
          fullWidth={confirmButtonProps?.fullWidth ?? true}
          variant="primary"
          onClick={onConfirm}
        >
          {confirmLabel}
        </Button>
      }
    />
  );
}
