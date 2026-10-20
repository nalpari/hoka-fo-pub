import { Button, type ButtonProps } from '@/shared/components/atoms/Button/Button';
import {
  ModalDialog,
  type ModalDialogProps,
} from '@/shared/components/molecules/ModalDialog/ModalDialog';

export type SingleActionDialogProps = Omit<ModalDialogProps, 'footer'> & {
  confirmLabel?: string;
  /** The caller decides whether confirming closes the dialog or advances its flow. */
  onConfirm: () => void;
  confirmButtonProps?: Pick<ButtonProps, 'className' | 'disabled' | 'fullWidth' | 'density'> & {
    size?: 'short' | 'tall';
  };
};

/** A modal with one primary footer action, preserving the shared fixed-footer layout. */
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
