import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { products, type Product } from '@/mocks/products';
import { usePlatform } from '@/shared/context/platform';
import { ProductListingFilterPanel } from '@/shared/features/catalog/ProductListingFilterPanel';
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
  activity: string;
  category: string;
  cushioning: string;
  gender: string;
  maxPrice: number;
  selectedColors: string[];
  size: string;
  stability: string;
  width: string;
};

/** Coordinates catalog URL filters, local filter controls, and listing layout. */
export function ProductListingPage({ searchQuery = '' }: ProductListingPageProps) {
  const platform = usePlatform();
  const [params, setParams] = useSearchParams();
  const [maxPrice, setMaxPrice] = useState(189000);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [compared, setCompared] = useState<Product[]>([]);
  const [filterDrawerOpen, setFilterDrawerOpen] = useState(false);

  const category = params.get('category') ?? '';
  const gender = params.get('gender') ?? '';
  const activity = params.get('activity') ?? '';
  const width = params.get('width') ?? '';
  const cushioning = params.get('cushioning') ?? '';
  const stability = params.get('support') ?? params.get('stability') ?? '';
  const size = params.get('size') ?? '';
  const activeFilters: FilterValues = {
    activity,
    category,
    cushioning,
    gender,
    maxPrice,
    selectedColors,
    size,
    stability,
    width,
  };
  const [mobileFilters, setMobileFilters] = useState<FilterValues>(activeFilters);
  const selectedSort = params.get('sort');
  const sort = selectedSort || '베스트순';
  const page = Number(params.get('page') ?? 1);
  const breadcrumbItems = getBreadcrumbItems({ gender, category, activity });
  const productListingTitle = getProductListingTitle({ gender, category, activity });
  const result = sortProducts(
    filterProducts(products, {
      activity,
      category,
      cushioning,
      gender,
      maxPrice,
      searchQuery,
      selectedColors,
      size,
      stability,
      width,
    }),
    sort,
  );
  const shown = result.slice((page - 1) * 8, page * 8);
  const mobileResultCount = filterProducts(products, { ...mobileFilters, searchQuery }).length;

  const update = (key: string, value: string) => {
    const next = new URLSearchParams(params);
    if (value) next.set(key, value);
    else next.delete(key);
    next.set('page', '1');
    setParams(next);
  };

  const reset = () => {
    setParams({});
    setMaxPrice(189000);
    setSelectedColors([]);
  };

  const openMobileFilters = (open: boolean) => {
    if (open) setMobileFilters(activeFilters);
    setFilterDrawerOpen(open);
  };

  const applyMobileFilters = () => {
    const next = new URLSearchParams(params);
    (['activity', 'category', 'cushioning', 'gender', 'size', 'support', 'width'] as const).forEach(
      (key) => {
        const value = mobileFilters[key === 'support' ? 'stability' : key];
        if (value) next.set(key, value);
        else next.delete(key);
      },
    );
    next.set('page', '1');
    setParams(next);
    setMaxPrice(mobileFilters.maxPrice);
    setSelectedColors(mobileFilters.selectedColors);
    setFilterDrawerOpen(false);
  };

  const updateMobileFilter = (key: string, value: string) => {
    const normalizedKey = key === 'support' ? 'stability' : key;
    setMobileFilters((previous) => ({ ...previous, [normalizedKey]: value }));
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
      cushioning={displayedFilters.cushioning}
      gender={displayedFilters.gender}
      maxPrice={displayedFilters.maxPrice}
      onFilterChange={platform === 'mobile' ? updateMobileFilter : update}
      onMaxPriceChange={(value) =>
        platform === 'mobile'
          ? setMobileFilters((previous) => ({ ...previous, maxPrice: value }))
          : setMaxPrice(value)
      }
      onReset={reset}
      onSelectedColorsChange={(values) =>
        platform === 'mobile'
          ? setMobileFilters((previous) => ({ ...previous, selectedColors: values }))
          : setSelectedColors(values)
      }
      selectedColors={displayedFilters.selectedColors}
      size={displayedFilters.size}
      stability={displayedFilters.stability}
      width={displayedFilters.width}
    />
  );

  return (
    <ProductListingLayout
      breadcrumbItems={breadcrumbItems}
      category={category}
      compared={compared}
      filterDrawerOpen={filterDrawerOpen}
      filterPanel={filterPanel}
      gender={gender}
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
