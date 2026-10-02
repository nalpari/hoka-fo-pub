import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { products, type Product } from '@/mocks/products';
import { usePlatform } from '@/shared/context/platform';
import { ProductListingFilterPanel } from '@/shared/features/catalog/ProductListingFilterPanel';
import { productListingPriceRange } from '@/shared/features/catalog/productListingFilterValues';
import { ProductListingLayout } from '@/shared/features/catalog/product-listing/ProductListingLayout';
import {
  filterProducts,
  sortProducts,
} from '@/shared/features/catalog/product-listing/filterProducts';
import {
  getBreadcrumbItems,
  getProductListingTitle,
} from '@/shared/features/catalog/product-listing/productListingMetadata';

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
  const [params, setParams] = useSearchParams();
  const [minPrice, setMinPrice] = useState(productListingPriceRange.min);
  const [maxPrice, setMaxPrice] = useState(productListingPriceRange.defaultMax);
  const [compared, setCompared] = useState<Product[]>([]);
  const [filterDrawerOpen, setFilterDrawerOpen] = useState(false);

  const category = params.get('category') ?? '';
  const activeFilters: FilterValues = {
    activity: params.getAll('activity'),
    category,
    collection: params.getAll('collection'),
    cushioning: params.getAll('cushioning'),
    gender: params.getAll('gender'),
    minPrice,
    maxPrice,
    selectedColors: params.getAll('color'),
    runningType: params.getAll('runningType'),
    size: params.getAll('size'),
    stability: params.getAll('support').length ? params.getAll('support') : params.getAll('stability'),
    width: params.getAll('width'),
  };
  const [mobileFilters, setMobileFilters] = useState<FilterValues>(activeFilters);
  const selectedSort = params.get('sort');
  const sort = selectedSort || '베스트순';
  const page = Number(params.get('page') ?? 1);
  const breadcrumbItems = getBreadcrumbItems({ gender: activeFilters.gender[0] ?? '', category, activity: activeFilters.activity[0] ?? '' });
  const productListingTitle = getProductListingTitle({ gender: activeFilters.gender[0] ?? '', category, activity: activeFilters.activity[0] ?? '' });
  const result = sortProducts(filterProducts(products, { ...activeFilters, searchQuery }), sort);
  const shown = result.slice((page - 1) * 8, page * 8);
  const mobileResultCount = filterProducts(products, { ...mobileFilters, searchQuery }).length;

  const updateFacet = (key: string, values: string[]) => {
    const next = new URLSearchParams(params);
    next.delete(key);
    values.forEach((value) => next.append(key, value));
    next.set('page', '1');
    setParams(next);
  };

  const update = (key: string, value: string) => {
    const next = new URLSearchParams(params);
    if (value) next.set(key, value);
    else next.delete(key);
    next.set('page', '1');
    setParams(next);
  };

  const reset = () => {
    setParams({});
    setMinPrice(productListingPriceRange.min);
    setMaxPrice(productListingPriceRange.defaultMax);
    setMobileFilters(emptyFilters());
  };

  const openMobileFilters = (open: boolean) => {
    if (open) setMobileFilters(activeFilters);
    setFilterDrawerOpen(open);
  };

  const applyMobileFilters = () => {
    const next = new URLSearchParams(params);
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
    next.set('page', '1');
    setParams(next);
    setMinPrice(mobileFilters.minPrice);
    setMaxPrice(mobileFilters.maxPrice);
    setFilterDrawerOpen(false);
  };

  const updateMobileFilter = (key: string, values: string[]) => {
    const normalizedKey = key === 'support' ? 'stability' : key === 'color' ? 'selectedColors' : key;
    setMobileFilters((previous) => ({ ...previous, [normalizedKey]: values }));
  };

  const displayedFilters = platform === 'mobile' ? mobileFilters : activeFilters;

  const changePage = (nextPage: number) => {
    const next = new URLSearchParams(params);
    next.set('page', String(nextPage));
    setParams(next);
  };

  const toggleCompare = (product: Product) =>
    setCompared((previous) =>
      previous.some((item) => item.id === product.id)
        ? previous.filter((item) => item.id !== product.id)
        : previous.length === 3
          ? [...previous.slice(1), product]
          : [...previous, product],
    );

  const filterPanel = (
    <ProductListingFilterPanel
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
      activity={activity}
      breadcrumbItems={breadcrumbItems}
      category={category}
      compared={compared}
      filterDrawerOpen={filterDrawerOpen}
      filterPanel={filterPanel}
      gender={activeFilters.gender[0] ?? ''}
      onClearCompare={() => setCompared([])}
      onFilterChange={update}
      onFilterDrawerOpenChange={openMobileFilters}
      onMobileFilterApply={applyMobileFilters}
      onPageChange={changePage}
      onReset={reset}
      onSortChange={(nextSort) => update('sort', nextSort)}
      onToggleCompare={toggleCompare}
      page={page}
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
