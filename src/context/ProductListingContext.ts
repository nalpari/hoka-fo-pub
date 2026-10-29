'use client';

import { createContext } from 'react';

import type { FilterValues } from '@/components/catalog/productListing.types';
import type { Product } from '@/mocks/products';

export type ProductListingQuery = { filters: FilterValues; sort: string; searchQuery: string };

export type ProductListingBinding = {
  items: readonly Product[];
  totalCount: number;
  hasMore: boolean;
  pending?: boolean;
  error?: string;
  mobileResultCount?: number;
  onQueryChange: (query: ProductListingQuery) => void;
  onPreviewQueryChange?: (query: ProductListingQuery) => void;
  onLoadMore: () => void | Promise<void>;
  onRetry?: () => void | Promise<void>;
};

export const ProductListingContext = createContext<ProductListingBinding | null>(null);
