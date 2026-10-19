import type { ReactNode } from 'react';
import { Button } from '@/shared/components/atoms/Button/Button';
import { BottomSheet } from '@/shared/components/layouts/BottomSheet/BottomSheet';
import { Box } from 'styled-system/jsx';

type MobileProductFilterProps = {
  children: ReactNode;
  resultCount: number;
  onClose: () => void;
  onApply: () => void;
};

/** Mobile-only filter bottom sheet for the product listing. */
export function MobileProductFilter({
  children,
  resultCount,
  onClose,
  onApply,
}: MobileProductFilterProps) {
  return (
    <BottomSheet
      ariaLabel="상품 필터"
      footer={
        <Button onClick={onApply} variant="primary">
          필터 적용하기 ({resultCount})
        </Button>
      }
      onClose={onClose}
      title="필터"
    >
      <Box px="4">{children}</Box>
    </BottomSheet>
  );
}
