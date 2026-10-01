import type { ReactNode } from 'react';
import { CatalogFilterPanelBody } from '@/shared/components/organisms/Catalog/CatalogFilterPanel/CatalogFilterPanelBody';
import {
  CatalogFilterPanelHeader,
  type CatalogSelectedFilter,
} from '@/shared/components/organisms/Catalog/CatalogFilterPanel/CatalogFilterPanelHeader';
import { VStack } from 'styled-system/jsx';
import { css } from 'styled-system/css';

const panel = css({ '& > * ': { w: '100%' } });

export type { CatalogSelectedFilter } from '@/shared/components/organisms/Catalog/CatalogFilterPanel/CatalogFilterPanelHeader';

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
    <VStack as="aside" w="100%" className={panel} gap="0">
      <CatalogFilterPanelHeader onReset={onReset} selectedFilters={selectedFilters} />
      <CatalogFilterPanelBody>{children}</CatalogFilterPanelBody>
    </VStack>
  );
}
