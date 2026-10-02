import type { Product } from '@/mocks/products';
import type { ProductListingFilters } from '@/shared/features/catalog/product-listing/filterProducts';

const matchingActivities: Record<string, string[]> = {
  'road-running': ['러닝'],
  'trail-running': ['트레일'],
  hiking: ['트레일'],
  walking: ['러닝', '라이프스타일'],
  training: ['라이프스타일', '러닝'],
  lifestyle: ['라이프스타일'],
};

const matchesAny = <T>(selected: T[], predicate: (value: T) => boolean) =>
  selected.length === 0 || selected.some(predicate);

/**
 * Catalog matching policy belongs here, not in filter controls or URL state.
 * Replace this function when product-search semantics are finalized.
 */
export function matchesProductFilters(product: Product, filters: ProductListingFilters) {
  const normalizedSearchQuery = filters.searchQuery.trim().toLocaleLowerCase('ko-KR');
  const matchedCategory = !filters.category || product.category === filters.category;
  const matchedGender = matchesAny(
    filters.gender,
    (gender) => product.gender?.toLowerCase().replace("'s", '') === gender.toLowerCase(),
  );
  const matchedActivity = matchesAny(
    filters.activity,
    (activity) =>
      matchingActivities[activity]?.some((keyword) => product.category.includes(keyword)) ||
      product.use.toLowerCase().includes(activity.replace(/-/g, ' ')) ||
      product.category.toLowerCase().includes(activity.replace(/-/g, ' ')),
  );
  const matchedWidth = matchesAny(filters.width, (width) =>
    width === 'wide' || width === 'x-wide' ? product.width === 'Wide' : product.width === 'Regular',
  );
  const matchedCushioning = matchesAny(
    filters.cushioning,
    (cushioning) => product.cushioning.toLowerCase() === cushioning.toLowerCase(),
  );
  const matchedStability = matchesAny(filters.stability, (stability) =>
    stability === 'stable'
      ? product.stability === 'Stable'
      : product.stability.toLowerCase() === stability.toLowerCase(),
  );
  const matchedSize = matchesAny(filters.size, (size) => product.sizes.includes(size));
  const matchedColor = matchesAny(filters.selectedColors, (color) => product.colors.includes(color));
  const matchedCollection = matchesAny(filters.collection, (collection) => product.collection === collection);
  const matchedRunningType = matchesAny(
    filters.runningType,
    (runningType) => product.runningType === runningType,
  );
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
    matchedCollection &&
    matchedRunningType &&
    matchedSearch &&
    product.price <= filters.maxPrice
  );
}
