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
  filterDrawerOpen: boolean;
  filterPanel: ReactNode;
  mobileResultCount: number;
  onFilterDrawerOpenChange: (open: boolean) => void;
  onLoadMore: () => void;
  onMobileFilterApply: () => void;
  onReset: () => void;
  platform: Platform;
  result: Product[];
  shown: Product[];
};

/** Product results with desktop and mobile filter presentations. */
export function ProductListingContent({
  filterDrawerOpen,
  filterPanel,
  mobileResultCount,
  onFilterDrawerOpenChange,
  onLoadMore,
  onMobileFilterApply,
  onReset,
  platform,
  result,
  shown,
}: ProductListingContentProps) {
  return (
    <>
      <Grid className={catalogBody}>
        {platform === 'web' && <DesktopProductFilter>{filterPanel}</DesktopProductFilter>}
        <ProductListingResults
          hasMore={shown.length < result.length}
          onLoadMore={onLoadMore}
          onReset={onReset}
          platform={platform}
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
