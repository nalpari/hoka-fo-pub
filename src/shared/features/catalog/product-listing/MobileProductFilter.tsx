import type { ReactNode } from 'react';
import { Button } from '@/shared/components/atoms/Button/Button';
import { BottomSheet } from '@/shared/components/layouts/BottomSheet/BottomSheet';
import { css } from 'styled-system/css';

const filterSheetContent = css({
  px: '4',
  // '& aside': { border: '0' },
  // '& aside > h3': { display: 'none' },
  // '& aside > button': { display: 'none' },
});

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
        <Button onClick={onApply} variant="bottomSheetPrimary">
          필터 적용하기 ({resultCount})
        </Button>
      }
      onClose={onClose}
      title="필터"
    >
      <div className={filterSheetContent}>{children}</div>
    </BottomSheet>
  );
}
