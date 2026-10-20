import type { ReactNode } from 'react';
import type { Product } from '@/mocks/products';
import { ContentLayout } from '@/shared/components/layouts/ContentLayout/ContentLayout';
import type { BreadcrumbItem } from '@/shared/components/molecules/Breadcrumb/Breadcrumb';
import type { Platform } from '@/shared/lib/device';
import { DesktopProductSort } from './DesktopProductSort';
import { MobileProductFilterTrigger } from './MobileProductFilterTrigger';
import { ProductListingContent } from './ProductListingContent';
import { ProductListTitle } from './ProductListTitle';
import { MobileCategoryTabs } from './MobileCategoryTabs';
import { css } from 'styled-system/css';
import { SearchListingLayout } from './SearchListingLayout';

const catalogLayout = css({
  w: 'min(calc(100% - var(--layout-web-content-inline-space)), var(--layout-web-content-max-width))',
  maxW: 'var(--layout-web-content-max-width)',
  mx: 'auto',
  pb: '16',
  gap: '5',
  _mobile: {
    w: '100%',
    gap: '2',
    px: 'var(--layout-mobile-inline-gutter)',
    py: 'var(--layout-mobile-page-block-padding)',
  },
});

type ProductListingLayoutProps = {
  breadcrumbItems: BreadcrumbItem[];
  activity: string;
  filterDrawerOpen: boolean;
  filterPanel: ReactNode;
  onFilterChange: (key: string, value: string) => void;
  onFilterDrawerOpenChange: (open: boolean) => void;
  onLoadMore: () => void;
  onMobileFilterApply: () => void;
  onReset: () => void;
  onSortChange: (sort: string) => void;
  onSearch: (query: string) => void;
  onCloseSearch: () => void;
  hasActiveFilters: boolean;
  isSearchPage: boolean;
  platform: Platform;
  productListingTitle: string;
  mobileResultCount: number;
  mobileSort: string;
  onMobileSortChange: (sort: string) => void;
  result: Product[];
  searchQuery: string;
  shown: Product[];
  sort: string;
  sortPlaceholder?: string;
};

export function ProductListingLayout({
  breadcrumbItems,
  activity,
  filterDrawerOpen,
  filterPanel,
  onFilterChange,
  onFilterDrawerOpenChange,
  onLoadMore,
  onMobileFilterApply,
  onReset,
  onSortChange,
  onSearch,
  onCloseSearch,
  hasActiveFilters,
  isSearchPage,
  platform,
  productListingTitle,
  mobileResultCount,
  mobileSort,
  onMobileSortChange,
  result,
  searchQuery,
  shown,
  sort,
  sortPlaceholder,
}: ProductListingLayoutProps) {
  const normalizedSearchQuery = searchQuery.trim();

  const content = (
    <ProductListingContent
      filterDrawerOpen={filterDrawerOpen}
      filterPanel={filterPanel}
      mobileResultCount={mobileResultCount}
      mobileSort={mobileSort}
      onMobileSortChange={onMobileSortChange}
      onFilterDrawerOpenChange={onFilterDrawerOpenChange}
      onLoadMore={onLoadMore}
      onMobileFilterApply={onMobileFilterApply}
      onReset={onReset}
      platform={platform}
      result={result}
      shown={shown}
    />
  );

  if (isSearchPage) {
    return (
      <SearchListingLayout
        key={normalizedSearchQuery}
        query={normalizedSearchQuery}
        platform={platform}
        resultCount={result.length}
        onSearch={onSearch}
        onClose={onCloseSearch}
        hasActiveFilters={hasActiveFilters}
        filterAction={
          <MobileProductFilterTrigger
            onClick={() => onFilterDrawerOpenChange(true)}
            label="Filter & Sort"
          />
        }
      >
        {content}
      </SearchListingLayout>
    );
  }

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
      stickyHeader={platform === 'web'}
      title={
        <ProductListTitle
          platform={platform}
          resultCount={result.length}
          searchQuery={normalizedSearchQuery}
          title={productListingTitle}
        />
      }
    >
      {platform === 'mobile' && (
        <MobileCategoryTabs
          activity={activity}
          onChange={(value) => onFilterChange('activity', value)}
        />
      )}
      {content}
    </ContentLayout>
  );
}
