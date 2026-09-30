import type { ReactNode } from 'react';
import { BottomSheet } from '@/shared/components/layouts/BottomSheet/BottomSheet';
import { css } from 'styled-system/css';

const filterSheetContent = css({
  px: '20px',
  py: '8px',
  '& aside': { border: '0' },
  '& aside > h3': { display: 'none' },
  '& aside > button': { display: 'none' },
});

const filterApplyButton = css({
  width: '100%',
  minH: '52px',
  border: '0',
  borderRadius: '999px',
  bg: 'var(--color-text-primary)',
  color: 'var(--color-text-inverse)',
  cursor: 'pointer',
  _focusVisible: { outline: '2px solid var(--color-focus-default)', outlineOffset: '2px' },
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
        <button className={filterApplyButton} onClick={onApply} type="button">
          필터 적용하기 ({resultCount})
        </button>
      }
      onClose={onClose}
      title="필터"
    >
      <div className={filterSheetContent}>{children}</div>
    </BottomSheet>
  );
}
