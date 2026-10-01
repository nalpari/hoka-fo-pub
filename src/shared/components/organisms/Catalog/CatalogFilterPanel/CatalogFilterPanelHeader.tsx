import { Button } from '@/shared/components/atoms/Button/Button';
import { Tag } from '@/shared/components/atoms/Tag/Tag';
import { css } from 'styled-system/css';
import { Stack } from 'styled-system/jsx';

const selectedFilterList = css({
  display: 'flex',
  flexWrap: 'wrap',
  gap: '8px',
});

const reset = css({ mb: '14px' });

export type CatalogSelectedFilter = {
  id: string;
  label: string;
  onRemove: () => void;
};

type CatalogFilterPanelHeaderProps = {
  onReset: () => void;
  selectedFilters: CatalogSelectedFilter[];
};

export function CatalogFilterPanelHeader({
  onReset,
  selectedFilters,
}: CatalogFilterPanelHeaderProps) {
  return (
    <>
      <Stack>
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
      </Stack>
    </>
  );
}
