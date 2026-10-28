'use client';

import { useCallback, useMemo, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { products } from '@/mocks/products';
import { usePlatform } from '@/context/platform';
import { ProductListingFilterPanel } from '@/components/features/catalog/ProductListingFilterPanel';
import { productListingPriceRange } from '@/components/features/catalog/productListingFilterValues';
import { ProductListingLayout } from '@/components/features/catalog/product-listing/ProductListingLayout';
import {
  filterProducts,
  sortProducts,
} from '@/components/features/catalog/product-listing/filterProducts';
import {
  getBreadcrumbItems,
  getProductListingTitle,
} from '@/components/features/catalog/product-listing/productListingMetadata';

type ProductListingPageProps = {
  searchQuery?: string;
};

type FilterValues = {
  activity: string[];
  category: string;
  collection: string[];
  cushioning: string[];
  gender: string[];
  minPrice: number;
  maxPrice: number;
  selectedColors: string[];
  runningType: string[];
  size: string[];
  stability: string[];
  width: string[];
};

const facetKeys = [
  'activity',
  'collection',
  'cushioning',
  'gender',
  'color',
  'runningType',
  'size',
  'support',
  'width',
] as const;

const sortTokenLabels: Record<string, string> = { new: '신상품순', popular: '베스트순' };

const productsPerLoad = 36;

const emptyFilters = (): FilterValues => ({
  activity: [],
  category: '',
  collection: [],
  cushioning: [],
  gender: [],
  minPrice: productListingPriceRange.min,
  maxPrice: productListingPriceRange.defaultMax,
  selectedColors: [],
  runningType: [],
  size: [],
  stability: [],
  width: [],
});

/** Coordinates catalog URL filters, local price controls, and listing layout. */
export function ProductListingPage({ searchQuery = '' }: ProductListingPageProps) {
  const platform = usePlatform();
  const params = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const setParams = (next: URLSearchParams) => {
    const query = next.toString();
    router.push(`${pathname}${query ? `?${query}` : ''}`, { scroll: false });
  };
  const [minPrice, setMinPrice] = useState(productListingPriceRange.min);
  const [maxPrice, setMaxPrice] = useState(productListingPriceRange.defaultMax);
  const [filterDrawerOpen, setFilterDrawerOpen] = useState(false);

  const paramsKey = params.toString();
  const category = params.get('category') ?? '';
  const activeFilters = useMemo<FilterValues>(() => {
    const query = new URLSearchParams(paramsKey);
    const support = query.getAll('support');

    return {
      activity: query.getAll('activity'),
      category: query.get('category') ?? '',
      collection: query.getAll('collection'),
      cushioning: query.getAll('cushioning'),
      gender: query.getAll('gender'),
      minPrice,
      maxPrice,
      selectedColors: query.getAll('color'),
      runningType: query.getAll('runningType'),
      size: query.getAll('size'),
      stability: support.length ? support : query.getAll('stability'),
      width: query.getAll('width'),
    };
  }, [maxPrice, minPrice, paramsKey]);
  const [mobileFilters, setMobileFilters] = useState<FilterValues>(activeFilters);
  const selectedSort = params.get('sort');
  const sort = (selectedSort && sortTokenLabels[selectedSort]) || selectedSort || '베스트순';
  const [mobileSort, setMobileSort] = useState(sort);
  const breadcrumbItems = getBreadcrumbItems({
    gender: activeFilters.gender[0] ?? '',
    category,
    activity: activeFilters.activity[0] ?? '',
    sort: selectedSort ?? '',
  });

  const productListingTitle = getProductListingTitle({
    gender: activeFilters.gender[0] ?? '',
    category,
    activity: activeFilters.activity[0] ?? '',
    sort: selectedSort ?? '',
  });
  const result = useMemo(
    () => sortProducts(filterProducts(products, { ...activeFilters, searchQuery }), sort),
    [activeFilters, searchQuery, sort],
  );
  const listingKey = JSON.stringify([paramsKey, minPrice, maxPrice, searchQuery]);
  const [visibleProductState, setVisibleProductState] = useState({
    key: listingKey,
    count: productsPerLoad,
  });
  const visibleProductCount =
    visibleProductState.key === listingKey ? visibleProductState.count : productsPerLoad;
  const shown = result.slice(0, visibleProductCount);
  const mobileResultCount = filterProducts(products, { ...mobileFilters, searchQuery }).length;

  const updateFacet = (key: string, values: string[]) => {
    const next = new URLSearchParams(params.toString());
    next.delete(key);
    values.forEach((value) => next.append(key, value));
    next.delete('page');
    setParams(next);
  };

  const update = (key: string, value: string) => {
    const next = new URLSearchParams(params.toString());
    if (value) next.set(key, value);
    else next.delete(key);
    next.delete('page');
    setParams(next);
  };

  const reset = () => {
    const next = new URLSearchParams();
    for (const key of ['q', 'sort']) {
      const value = params.get(key);
      if (value) next.set(key, value);
    }
    setParams(next);
    setMinPrice(productListingPriceRange.min);
    setMaxPrice(productListingPriceRange.defaultMax);
    setMobileFilters(emptyFilters());
  };

  const openMobileFilters = (open: boolean) => {
    if (open) {
      setMobileFilters(activeFilters);
      setMobileSort(sort);
    }
    setFilterDrawerOpen(open);
  };

  const applyMobileFilters = () => {
    const next = new URLSearchParams(params.toString());
    facetKeys.forEach((key) => {
      next.delete(key);
      const values =
        key === 'color'
          ? mobileFilters.selectedColors
          : key === 'support'
            ? mobileFilters.stability
            : mobileFilters[key];
      values.forEach((value) => next.append(key, value));
    });
    next.delete('page');
    next.set('sort', mobileSort);
    setParams(next);
    setMinPrice(mobileFilters.minPrice);
    setMaxPrice(mobileFilters.maxPrice);
    setFilterDrawerOpen(false);
  };

  const updateMobileFilter = (key: string, values: string[]) => {
    const normalizedKey =
      key === 'support' ? 'stability' : key === 'color' ? 'selectedColors' : key;
    setMobileFilters((previous) => ({ ...previous, [normalizedKey]: values }));
  };

  const displayedFilters = platform === 'mobile' ? mobileFilters : activeFilters;

  const loadMore = useCallback(() => {
    setVisibleProductState((previous) => {
      const count = previous.key === listingKey ? previous.count : productsPerLoad;

      return { key: listingKey, count: Math.min(count + productsPerLoad, result.length) };
    });
  }, [listingKey, result.length]);

  const filterPanel = (
    <ProductListingFilterPanel
      mobileSort={
        platform === 'mobile' ? { value: mobileSort, onValueChange: setMobileSort } : undefined
      }
      activity={displayedFilters.activity}
      collection={displayedFilters.collection}
      cushioning={displayedFilters.cushioning}
      gender={displayedFilters.gender}
      minPrice={displayedFilters.minPrice}
      maxPrice={displayedFilters.maxPrice}
      onFilterChange={platform === 'mobile' ? updateMobileFilter : updateFacet}
      onMinPriceChange={(value) =>
        platform === 'mobile'
          ? setMobileFilters((previous) => ({ ...previous, minPrice: value }))
          : setMinPrice(value)
      }
      onMaxPriceChange={(value) =>
        platform === 'mobile'
          ? setMobileFilters((previous) => ({ ...previous, maxPrice: value }))
          : setMaxPrice(value)
      }
      onReset={reset}
      onSelectedColorsChange={(values) =>
        platform === 'mobile' ? updateMobileFilter('color', values) : updateFacet('color', values)
      }
      runningType={displayedFilters.runningType}
      selectedColors={displayedFilters.selectedColors}
      size={displayedFilters.size}
      stability={displayedFilters.stability}
      width={displayedFilters.width}
    />
  );

  return (
    <ProductListingLayout
      activity={activeFilters.activity[0] ?? ''}
      breadcrumbItems={breadcrumbItems}
      filterDrawerOpen={filterDrawerOpen}
      filterPanel={filterPanel}
      onFilterChange={update}
      onFilterDrawerOpenChange={openMobileFilters}
      onMobileFilterApply={applyMobileFilters}
      onLoadMore={loadMore}
      onReset={reset}
      onSortChange={(nextSort) => update('sort', nextSort)}
      onSearch={(query) => router.push(`/search?q=${encodeURIComponent(query)}`)}
      onCloseSearch={() => router.push('/products')}
      isSearchPage={pathname === '/search' || Boolean(searchQuery.trim())}
      hasActiveFilters={
        facetKeys.some((key) => params.has(key)) ||
        minPrice !== productListingPriceRange.min ||
        maxPrice !== productListingPriceRange.defaultMax
      }
      platform={platform}
      productListingTitle={productListingTitle}
      mobileResultCount={mobileResultCount}
      result={result}
      searchQuery={searchQuery}
      shown={shown}
      sort={sort}
      sortPlaceholder={selectedSort ? undefined : '정렬기준'}
    />
  );
}
