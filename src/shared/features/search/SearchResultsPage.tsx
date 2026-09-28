import { useSearchParams } from 'react-router-dom';
import { ProductListingPage } from '@/shared/features/catalog/ProductListingPage';

/** Renders search results in the same filterable product-list layout as the catalog. */
export function SearchResultsPage() {
  const [params] = useSearchParams();
  return <ProductListingPage searchQuery={params.get('q') ?? ''} />;
}
