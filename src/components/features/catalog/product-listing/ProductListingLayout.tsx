import { type ReactNode } from 'react';
import { type Product } from '@/mocks/products';
import { ContentLayout } from '@/components/common/layouts/ContentLayout/ContentLayout';
import { type BreadcrumbItem } from '@/components/common/molecules/Breadcrumb/Breadcrumb';
import { type Platform } from '@/lib/device';
import { ProductSortDropdown } from '@/components/features/catalog/product-listing/ProductSortDropdown';
import { Button } from '@/components/common/atoms/Button/Button';
import { Icon } from '@/components/common/atoms/Icon/Icon';
import { Typography } from '@/components/common/atoms/Typography/Typography';
import { ProductListingContent } from '@/components/features/catalog/product-listing/ProductListingContent';
import { ProductListTitle } from '@/components/features/catalog/product-listing/ProductListTitle';
import { Box, HStack } from 'styled-system/jsx';
import { IconButton } from '@/components/common/atoms/IconButton/IconButton';
import { useScrollPin } from '@/lib/useScrollPin';
import { FilterTabs } from '@/components/common/atoms/FilterTabs/FilterTabs';
import { css } from 'styled-system/css';
import { SearchListingLayout } from '@/components/features/catalog/product-listing/SearchListingLayout';

type ProductFilterTriggerProps = {
  onClick: () => void;
  label?: string;
  appearance?: 'catalog' | 'search';
};

/** 목록과 검색 시안에 맞는 버튼으로 모바일 필터를 엽니다. (Opens mobile filters with the catalog or search presentation.) */
function ProductFilterTrigger({
  onClick,
  label = '필터',
  appearance = 'catalog',
}: ProductFilterTriggerProps) {
  const isSearch = appearance === 'search';

  return (
    <Button
      aria-haspopup="dialog"
      icon={<Icon name="filter" size={isSearch ? 20 : undefined} />}
      onClick={onClick}
      variant="filterTrigger"
      size={isSearch ? 'regular' : 'compact'}
    >
      <Typography variant={isSearch ? 'cta1' : 'body4'}>{label}</Typography>
    </Button>
  );
}

const tabs = css({
  flex: '1',
  '& > [role="group"]': { h: '36px', mb: '0', gap: '5' },
  '& [data-filter-tabs-variant="plain"]': { px: '0', flexShrink: '0' },
});

const categories = [
  { label: '전체보기', activity: '' },
  { label: '로드러닝', activity: 'road-running' },
  { label: '트레일 러닝', activity: 'trail-running' },
  { label: '라이프스타일', activity: 'lifestyle' },
  { label: '하이킹', activity: 'hiking' },
  { label: '워킹', activity: 'walking' },
  { label: '리커버리', activity: 'recovery' },
];

type ProductActivityTabsProps = {
  activity: string;
  onChange: (activity: string) => void;
};

function ProductActivityTabs({ activity, onChange }: ProductActivityTabsProps) {
  return (
    <FilterTabs
      className={tabs}
      ariaLabel="상품 카테고리"
      onValueChange={onChange}
      options={categories.map((category) => ({ label: category.label, value: category.activity }))}
      value={activity}
      variant="plain"
    />
  );
}

type ProductActivityNavigationProps = {
  activity: string;
  onActivityChange: (activity: string) => void;
  onOpenFilters: () => void;
};

/** Keep the activity rail and filter action together below the mobile GNB. */
function ProductActivityNavigation({
  activity,
  onActivityChange,
  onOpenFilters,
}: ProductActivityNavigationProps) {
  const { markerRef, pinned } = useScrollPin();

  return (
    <Box h="9">
      <Box ref={markerRef} h="1px" mb="-1px" scrollMarginTop="var(--layout-site-header-height)" />
      <HStack
        as="nav"
        aria-label="상품 목록 탐색"
        pos={pinned ? 'fixed' : 'relative'}
        top={pinned ? 'var(--layout-site-header-height)' : undefined}
        insetInline={pinned ? '0' : undefined}
        zIndex="10"
        h="9"
        px="4"
        gap={pinned ? '3' : '0'}
        bg="var(--hoka-white)"
        borderBottom={pinned ? '1px solid token(colors.black.20)' : undefined}
      >
        <ProductActivityTabs activity={activity} onChange={onActivityChange} />
        {pinned && (
          <IconButton
            aria-label="상품 필터 열기"
            aria-haspopup="dialog"
            size={36}
            onClick={onOpenFilters}
          >
            <Icon name="filter" />
          </IconButton>
        )}
      </HStack>
    </Box>
  );
}

const catalogLayout = css({
  w: 'min(calc(100% - var(--layout-web-content-inline-space)), var(--layout-web-content-max-width))',
  maxW: 'var(--layout-web-content-max-width)',
  mx: 'auto',
  pb: '16',
  gap: '5',
  _mobile: {
    w: '100%',
    gap: '0',
    px: '0',
    pt: '7',
    pb: '24',
    '& > div:first-child': { px: '4', pb: '6' },
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
  result: Product[];
  searchQuery: string;
  shown: Product[];
  sort: string;
  sortPlaceholder?: string;
};

/** 목록과 검색 결과에 공통 상품·필터 영역을 배치합니다. (Arranges shared product results and filters for catalog and search pages.) */
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
        filterAction={<ProductFilterTrigger onClick={() => onFilterDrawerOpenChange(true)} />}
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
          <ProductFilterTrigger onClick={() => onFilterDrawerOpenChange(true)} />
        ) : (
          <ProductSortDropdown placeholder={sortPlaceholder} onChange={onSortChange} value={sort} />
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
        <ProductActivityNavigation
          activity={activity}
          onActivityChange={(value) => onFilterChange('activity', value)}
          onOpenFilters={() => onFilterDrawerOpenChange(true)}
        />
      )}
      {content}
    </ContentLayout>
  );
}
