import type { ReactNode } from 'react';
import { Button } from '@/components/common/atoms/Button/Button';
import { BottomSheet } from '@/components/common/layouts/BottomSheet/BottomSheet';

type MobileProductFilterProps = {
  children: ReactNode;
  resultCount: number;
  onClose: () => void;
  onApply: () => void;
};

/** 상품 목록과 검색에서 모바일 필터 시트와 적용 버튼을 표시합니다. (Displays the mobile filter sheet and apply action for catalog and search.) */
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
      {children}
    </BottomSheet>
  );
}
