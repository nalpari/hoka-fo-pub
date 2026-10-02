import type { Product } from '@/mocks/products';
import { matchesProductFilters } from '@/shared/features/catalog/product-listing/productFilterPolicy';

export type ProductListingFilters = {
  activity: string[];
  category: string;
  collection: string[];
  cushioning: string[];
  gender: string[];
  minPrice: number;
  maxPrice: number;
  searchQuery: string;
  selectedColors: string[];
  runningType: string[];
  size: string[];
  stability: string[];
  width: string[];
};

export function filterProducts(products: Product[], filters: ProductListingFilters) {
  return products.filter((product) => matchesProductFilters(product, filters));
}

export function sortProducts(products: Product[], sort: string) {
  return [...products].sort((a, b) =>
    sort === '낮은가격순'
      ? a.price - b.price
      : sort === '높은가격순'
        ? b.price - a.price
        : a.id.localeCompare(b.id),
  );
}
