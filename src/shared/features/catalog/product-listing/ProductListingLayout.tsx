import type { ReactNode } from 'react';
import type { Product } from '@/mocks/products';
import { ContentLayout } from '@/shared/components/layouts/ContentLayout/ContentLayout';
import type { BreadcrumbItem } from '@/shared/components/molecules/Breadcrumb/Breadcrumb';
import type { Platform } from '@/shared/lib/device';
import { DesktopProductSort } from './DesktopProductSort';
import { MobileProductFilterTrigger } from './MobileProductFilterTrigger';
import { ProductListingContent } from './ProductListingContent';
import { ProductListTitle } from './ProductListTitle';
import { css } from 'styled-system/css';

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
  category: string;
  compared: Product[];
  filterDrawerOpen: boolean;
  filterPanel: ReactNode;
  gender: string;
  onClearCompare: () => void;
  onFilterChange: (key: string, value: string) => void;
  onFilterDrawerOpenChange: (open: boolean) => void;
  onMobileFilterApply: () => void;
  onPageChange: (page: number) => void;
  onReset: () => void;
  onSortChange: (sort: string) => void;
  onToggleCompare: (product: Product) => void;
  page: number;
  platform: Platform;
  productListingTitle: string;
  mobileResultCount: number;
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
  onMobileFilterApply,
  onPageChange,
  onReset,
  onSortChange,
  onToggleCompare,
  page,
  platform,
  productListingTitle,
  mobileResultCount,
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
      <ProductListingContent
        category={category}
        compared={compared}
        filterDrawerOpen={filterDrawerOpen}
        filterPanel={filterPanel}
        gender={gender}
        mobileResultCount={mobileResultCount}
        onClearCompare={onClearCompare}
        onFilterChange={onFilterChange}
        onFilterDrawerOpenChange={onFilterDrawerOpenChange}
        onMobileFilterApply={onMobileFilterApply}
        onPageChange={onPageChange}
        onReset={onReset}
        onToggleCompare={onToggleCompare}
        page={page}
        platform={platform}
        result={result}
        shown={shown}
      />
    </ContentLayout>
  );
}
