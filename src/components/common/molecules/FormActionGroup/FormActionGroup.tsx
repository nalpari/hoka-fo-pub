import type { ComponentProps } from 'react';

import { HStack } from 'styled-system/jsx';

import { Button } from '@/components/common/atoms/Button/Button';

type Props = Omit<ComponentProps<typeof HStack>, 'children'> & {
  onCancel: () => void;
  cancelLabel?: string;
  submitLabel: string;
  size?: 'short' | 'tall';
  disabled?: boolean;
  form?: string;
};

/** Equal-width cancel and submit actions, kept inside or explicitly associated with a form. */
export function FormActionGroup({
  onCancel,
  cancelLabel = '취소',
  submitLabel,
  size,
  disabled,
  form,
  ...layout
}: Props) {
  return (
    <HStack gap="2" {...layout}>
      <Button fullWidth size={size} variant="secondary" type="button" onClick={onCancel}>
        {cancelLabel}
      </Button>
      <Button fullWidth size={size} variant="primary" type="submit" disabled={disabled} form={form}>
        {submitLabel}
      </Button>
    </HStack>
  );
}
