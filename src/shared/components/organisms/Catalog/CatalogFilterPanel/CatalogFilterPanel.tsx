import type { ReactNode } from 'react';
import { Button } from '@/shared/components/atoms/Button/Button';
import { Tag } from '@/shared/components/atoms/Tag/Tag';
import { css } from 'styled-system/css';

const panel = css({ w: '100%', '& h3': { m: '0 0 18px', fontSize: '20px' } });

const selectedFilterList = css({
  display: 'flex',
  flexWrap: 'wrap',
  gap: '8px',
  mb: '16px',
});

const reset = css({
  mb: '14px',
});

export type CatalogSelectedFilter = {
  id: string;
  label: string;
  onRemove: () => void;
};

export function CatalogFilterPanel({
  children,
  onReset,
  selectedFilters = [],
}: {
  children: ReactNode;
  onReset: () => void;
  selectedFilters?: CatalogSelectedFilter[];
}) {
  return (
    <aside className={panel}>
      {selectedFilters.length > 0 && (
        <div aria-label="선택된 필터" className={selectedFilterList}>
          {selectedFilters.map(({ id, label, onRemove }) => (
            <Tag key={id} onDelete={onRemove}>
              {label}
            </Tag>
          ))}
        </div>
      )}
      <Button className={reset} onClick={onReset} variant="link">
        초기화
      </Button>
      {children}
    </aside>
  );
}
