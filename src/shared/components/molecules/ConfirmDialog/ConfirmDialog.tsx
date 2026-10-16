import { HStack } from 'styled-system/jsx';
import { Button } from '@/shared/components/atoms/Button/Button';
import {
  ModalDialog,
  type ModalDialogProps,
} from '@/shared/components/molecules/ModalDialog/ModalDialog';

export type ConfirmDialogProps = Omit<ModalDialogProps, 'footer'> & {
  onConfirm: () => void;
  confirmLabel?: string;
  cancelLabel?: string;
  /** Fill the footer with a spaced action row; false preserves compact direct-button footers. */
  fullWidthActions?: boolean;
};

export function ConfirmDialog({
  onConfirm,
  confirmLabel = '확인',
  cancelLabel = '취소',
  fullWidthActions = true,
  size = 'sm',
  ...props
}: ConfirmDialogProps) {
  const actions = (
    <>
      <Button fullWidth size="short" variant="secondary" onClick={() => props.onOpenChange(false)}>
        {cancelLabel}
      </Button>
      <Button fullWidth size="short" variant="primary" onClick={onConfirm}>
        {confirmLabel}
      </Button>
    </>
  );

  return (
    <ModalDialog
      {...props}
      size={size}
      footer={
        fullWidthActions ? (
          <HStack w="100%" gap="2">
            {actions}
          </HStack>
        ) : (
          actions
        )
      }
    />
  );
}
