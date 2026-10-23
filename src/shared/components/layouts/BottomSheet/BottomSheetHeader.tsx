import type { ReactNode } from 'react';
import { Icon } from '@/shared/components/atoms/Icon/Icon';
import { IconButton } from '@/shared/components/atoms/IconButton/IconButton';
import { BottomSheetTitle } from '@/shared/components/layouts/BottomSheet/BottomSheetTitle';
import { HStack } from 'styled-system/jsx';

type BottomSheetHeaderProps = {
  action?: ReactNode;
  onClose?: () => void;
  title: ReactNode;
};

export function BottomSheetHeader({ action, onClose, title }: BottomSheetHeaderProps) {
  return (
    <HStack
      as="header"
      flexShrink="0"
      justifyContent="space-between"
      pt="6"
      pb="6"
      px="6"
      gap="2.5"
    >
      <BottomSheetTitle>{title}</BottomSheetTitle>
      {action && <HStack gap="2.5">{action}</HStack>}
      {onClose && (
        <IconButton aria-label="닫기" onClick={onClose} size="15px">
          <Icon name="close" size="15px" />
        </IconButton>
      )}
    </HStack>
  );
}
