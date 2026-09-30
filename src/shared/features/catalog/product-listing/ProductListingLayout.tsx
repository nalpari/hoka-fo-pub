import type { ReactNode } from 'react';
import type { Product } from '@/mocks/products';
import { Typography } from '@/shared/components/atoms/Typography/Typography';
import { ContentLayout } from '@/shared/components/layouts/ContentLayout/ContentLayout';
import type { BreadcrumbItem } from '@/shared/components/molecules/Breadcrumb/Breadcrumb';
import { ProductListingResults } from '@/shared/features/catalog/ProductListingResults';
import type { Platform } from '@/shared/lib/device';
import { DesktopProductSort } from './DesktopProductSort';
import { MobileProductFilter } from './MobileProductFilter';
import { MobileProductFilterTrigger } from './MobileProductFilterTrigger';
import { css } from 'styled-system/css';
import { Grid } from 'styled-system/jsx';

const catalogLayout = css({
  maxW: 'var(--layout-content-max-width)',
  mx: 'auto',
  py: '64px',
  _mobile: {
    px: 'var(--layout-mobile-inline-gutter)',
    py: 'var(--layout-mobile-page-block-padding)',
  },
});

const catalogBody = css({
  display: 'grid',
  gridTemplateColumns: '220px 1fr',
  gap: '36px',
  pt: '22px',
  borderTop: '1px solid var(--color-border-strong)',
  '& aside': { borderRight: '1px solid var(--line)' },
  _mobile: {
    display: 'block',
    '& aside': {
      mb: '18px',
      p: '12px',
      border: '1px solid var(--line)',
      borderRight: '1px solid var(--line)',
      '& fieldset:not(:first-child)': { display: 'none' },
    },
  },
});

const titleCount = css({
  ml: '8px',
  color: 'var(--color-text-primary)',
  verticalAlign: 'baseline',
});

type ProductListingLayoutProps = {
  breadcrumbItems: BreadcrumbItem[];
  category: string;
  compared: Product[];
  filterDrawerOpen: boolean;
  filterPanel: ReactNode;
  gender: string;
  onClearCompare: () => void;
  onFilterChange: (key: string, value: string) => void;
  onFilterDrawerOpenChange: (open: boolean) => void;
  onPageChange: (page: number) => void;
  onReset: () => void;
  onSortChange: (sort: string) => void;
  onToggleCompare: (product: Product) => void;
  page: number;
  platform: Platform;
  productListingTitle: string;
  result: Product[];
  searchQuery: string;
  shown: Product[];
  sort: string;
  sortPlaceholder?: string;
};

export function ProductListingLayout({
  breadcrumbItems,
  category,
  compared,
  filterDrawerOpen,
  filterPanel,
  gender,
  onClearCompare,
  onFilterChange,
  onFilterDrawerOpenChange,
  onPageChange,
  onReset,
  onSortChange,
  onToggleCompare,
  page,
  platform,
  productListingTitle,
  result,
  searchQuery,
  shown,
  sort,
  sortPlaceholder,
}: ProductListingLayoutProps) {
  const normalizedSearchQuery = searchQuery.trim();

  return (
    <ContentLayout
      breadcrumbItems={breadcrumbItems}
      className={catalogLayout}
      headerAction={
        platform === 'mobile' ? (
          <MobileProductFilterTrigger onClick={() => onFilterDrawerOpenChange(true)} />
        ) : (
          <DesktopProductSort placeholder={sortPlaceholder} onChange={onSortChange} value={sort} />
        )
      }
      title={
        <>
          <Typography as="span" variant="heading">
            {normalizedSearchQuery ? `“${normalizedSearchQuery}”에 대한 검색결과` : productListingTitle}
          </Typography>
          <Typography as="span" className={titleCount} variant="meta">
            ({result.length})
          </Typography>
        </>
      }
    >
      <Grid className={catalogBody}>
        {platform === 'web' && filterPanel}
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
          onReset={onReset}
          resultCount={result.length}
        >
          {filterPanel}
        </MobileProductFilter>
      )}
    </ContentLayout>
  );
}
