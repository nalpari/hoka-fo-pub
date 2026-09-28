import type { ReactNode } from 'react';
import { Button } from '@/shared/components/atoms/Button/Button';

export function CatalogFilterPanel({
  children,
  onReset,
}: {
  children: ReactNode;
  onReset: () => void;
}) {
  return (
    <aside>
      <h3>필터</h3>
      {children}
      <Button onClick={onReset} variant="primary">
        전체 선택 취소
      </Button>
    </aside>
  );
}
