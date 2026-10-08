import { Button } from '@/shared/components/atoms/Button/Button';
import { Tag } from '@/shared/components/atoms/Tag/Tag';
import { css } from 'styled-system/css';
import { Flex } from 'styled-system/jsx';

const selectedFilterHeader = css({ pb: '6', _mobile: { pb: '0' } });

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
      <Flex
        alignItems="center"
        aria-label="선택된 필터"
        className={selectedFilterHeader}
        flexWrap="wrap"
        gap="2"
        w="100%"
      >
        {selectedFilters.length > 0 && (
          <>
            {selectedFilters.map(({ id, label, onRemove }) => (
              <Tag key={id} onDelete={onRemove}>
                {label}
              </Tag>
            ))}
          </>
        )}
        <Flex h="8" alignItems="center">
          <Button onClick={onReset} variant="link" size="sm">
            초기화
          </Button>
        </Flex>
      </Flex>
    </>
  );
}
