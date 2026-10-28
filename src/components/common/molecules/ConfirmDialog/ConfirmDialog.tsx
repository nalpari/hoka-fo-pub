import { HStack, Stack } from 'styled-system/jsx';
import { Button } from '@/components/common/atoms/Button/Button';
import {
  ModalDialog,
  type ModalDialogProps,
} from '@/components/common/molecules/ModalDialog/ModalDialog';

export type ConfirmDialogProps = Omit<ModalDialogProps, 'footer'> & {
  onConfirm: () => void;
  confirmLabel?: string;
  confirmDisabled?: boolean;
  cancelLabel?: string;
  /** Override the secondary action; otherwise it requests closing the dialog. */
  onCancel?: () => void;
  /** Vertical actions always use a full-width group, including compact footers. */
  actionDirection?: 'horizontal' | 'vertical';
  /** Fill the footer with a spaced action row; false preserves compact direct-button footers. */
  fullWidthActions?: boolean;
};

export function ConfirmDialog({
  onConfirm,
  confirmLabel = '확인',
  confirmDisabled = false,
  cancelLabel = '취소',
  onCancel,
  actionDirection = 'horizontal',
  fullWidthActions = true,
  size = 'sm',
  ...props
}: ConfirmDialogProps) {
  const actions = (
    <>
      <Button
        fullWidth
        size="short"
        variant="secondary"
        onClick={onCancel ?? (() => props.onOpenChange(false))}
      >
        {cancelLabel}
      </Button>
      <Button
        fullWidth
        size="short"
        variant="primary"
        disabled={confirmDisabled}
        onClick={onConfirm}
      >
        {confirmLabel}
      </Button>
    </>
  );

  return (
    <ModalDialog
      {...props}
      size={size}
      footer={
        actionDirection === 'vertical' ? (
          <Stack w="100%" gap="2">
            {actions}
          </Stack>
        ) : fullWidthActions ? (
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
