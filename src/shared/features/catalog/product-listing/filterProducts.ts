import type { Product } from '@/mocks/products';

const matchingActivities: Record<string, string[]> = {
  'road-running': ['러닝'],
  'trail-running': ['트레일'],
  hiking: ['트레일'],
  walking: ['러닝', '라이프스타일'],
  training: ['라이프스타일', '러닝'],
  lifestyle: ['라이프스타일'],
};

export type ProductListingFilters = {
  activity: string;
  category: string;
  cushioning: string;
  gender: string;
  maxPrice: number;
  searchQuery: string;
  selectedColors: string[];
  size: string;
  stability: string;
  width: string;
};

export function filterProducts(products: Product[], filters: ProductListingFilters) {
  const normalizedSearchQuery = filters.searchQuery.trim().toLocaleLowerCase('ko-KR');

  return products.filter((product) => {
    const matchedCategory = !filters.category || product.category === filters.category;
    const matchedGender =
      !filters.gender ||
      product.gender?.toLowerCase().replace("'s", '') === filters.gender.toLowerCase();
    const matchedActivity =
      !filters.activity ||
      matchingActivities[filters.activity]?.some((keyword) => product.category.includes(keyword)) ||
      product.use.toLowerCase().includes(filters.activity.replace(/-/g, ' ')) ||
      product.category.toLowerCase().includes(filters.activity.replace(/-/g, ' '));
    const matchedWidth =
      !filters.width ||
      (filters.width === 'wide'
        ? product.width === 'Wide'
        : filters.width === 'x-wide'
          ? product.width === 'Wide'
          : product.width === 'Regular');
    const matchedCushioning =
      !filters.cushioning || product.cushioning.toLowerCase() === filters.cushioning.toLowerCase();
    const matchedStability =
      !filters.stability ||
      (filters.stability === 'stable'
        ? product.stability === 'Stable'
        : product.stability.toLowerCase() === filters.stability.toLowerCase());
    const matchedSize = !filters.size || product.sizes.includes(filters.size);
    const matchedColor =
      !filters.selectedColors.length ||
      filters.selectedColors.some((color) => product.colors.includes(color));
    const matchedSearch =
      !normalizedSearchQuery ||
      `${product.name} ${product.category} ${product.gender} ${product.use}`
        .toLocaleLowerCase('ko-KR')
        .includes(normalizedSearchQuery);

    return (
      matchedCategory &&
      matchedGender &&
      matchedActivity &&
      matchedWidth &&
      matchedCushioning &&
      matchedStability &&
      matchedSize &&
      matchedColor &&
      matchedSearch &&
      product.price <= filters.maxPrice
    );
  });
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
