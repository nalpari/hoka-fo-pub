import type { ReactNode } from 'react';
import type { Product } from '@/mocks/products';
import { ProductListingResults } from '@/shared/features/catalog/ProductListingResults';
import type { Platform } from '@/shared/lib/device';
import { css } from 'styled-system/css';
import { Grid } from 'styled-system/jsx';
import { DesktopProductFilter } from './DesktopProductFilter';
import { MobileProductFilter } from './MobileProductFilter';

const catalogBody = css({
  display: 'grid',
  gridTemplateColumns: 'clamp(252px, 22%, 337px) minmax(0, 1fr)',
  gap: 'clamp(20px, 3.2%, 48px)',
  '& > :last-child': { minW: '0' },
  _mobile: {
    display: 'block',
  },
});

type ProductListingContentProps = {
  category: string;
  compared: Product[];
  filterDrawerOpen: boolean;
  filterPanel: ReactNode;
  gender: string;
  mobileResultCount: number;
  onClearCompare: () => void;
  onFilterChange: (key: string, value: string) => void;
  onFilterDrawerOpenChange: (open: boolean) => void;
  onMobileFilterApply: () => void;
  onPageChange: (page: number) => void;
  onReset: () => void;
  onToggleCompare: (product: Product) => void;
  page: number;
  platform: Platform;
  result: Product[];
  shown: Product[];
};

/** Product results with desktop and mobile filter presentations. */
export function ProductListingContent({
  category,
  compared,
  filterDrawerOpen,
  filterPanel,
  gender,
  mobileResultCount,
  onClearCompare,
  onFilterChange,
  onFilterDrawerOpenChange,
  onMobileFilterApply,
  onPageChange,
  onReset,
  onToggleCompare,
  page,
  platform,
  result,
  shown,
}: ProductListingContentProps) {
  return (
    <>
      <Grid className={catalogBody}>
        {platform === 'web' && <DesktopProductFilter>{filterPanel}</DesktopProductFilter>}
        <ProductListingResults
          category={category}
          compared={compared}
          gender={gender}
          onClearCompare={onClearCompare}
          onFilterChange={onFilterChange}
          onPageChange={onPageChange}
          onReset={onReset}
          onToggleCompare={onToggleCompare}
          page={page}
          result={result}
          shown={shown}
        />
      </Grid>
      {platform === 'mobile' && filterDrawerOpen && (
        <MobileProductFilter
          onClose={() => onFilterDrawerOpenChange(false)}
          onApply={onMobileFilterApply}
          resultCount={mobileResultCount}
        >
          {filterPanel}
        </MobileProductFilter>
      )}
    </>
  );
}
