import type { Product } from '@/mocks/products';
import { EmptyState } from '@/shared/components/atoms/EmptyState/EmptyState';
import { Button } from '@/shared/components/atoms/Button/Button';
import { Pagination } from '@/shared/components/atoms/Pagination/Pagination';
import { CompareBar } from '@/shared/components/molecules/CompareBar/CompareBar';
import {
  ProductCard,
  type ProductCardOption,
} from '@/shared/components/molecules/ProductCard/ProductCard';
import { PromotionCard } from '@/shared/components/molecules/PromotionCard/PromotionCard';
import { CatalogResults } from '@/shared/components/organisms/Catalog/CatalogResults/CatalogResults';
import { Box, Grid } from 'styled-system/jsx';
import { css } from 'styled-system/css';

const chips = css({
  '& button': { mr: '1.5', mb: '15px', px: '2.5', py: '5px', borderRadius: '20px' },
});

const catalogGrid = css({
  display: 'grid',
  gridTemplateColumns: 'repeat(4, 1fr)',
  gap: '4',
  _mobile: { gridTemplateColumns: 'repeat(2, 1fr)', gap: '2.5' },
});

const catalogProductCardOptions: readonly ProductCardOption[] = [
  'promotion',
  'launch-status',
  'like',
  'quick',
  'colors',
  'specifications',
  'compare',
];

type ProductListingResultsProps = {
  category: string;
  gender: string;
  page: number;
  result: Product[];
  shown: Product[];
  compared: Product[];
  onFilterChange: (key: string, value: string) => void;
  onPageChange: (page: number) => void;
  onReset: () => void;
  onToggleCompare: (product: Product) => void;
  onClearCompare: () => void;
};

export function ProductListingResults({
  category,
  gender,
  page,
  result,
  shown,
  compared,
  onFilterChange,
  onPageChange,
  onReset,
  onToggleCompare,
  onClearCompare,
}: ProductListingResultsProps) {
  return (
    <CatalogResults>
      {(category || gender) && (
        <Box className={chips}>
          {category && (
            <Button onClick={() => onFilterChange('category', '')} size="sm">
              {category} ×
            </Button>
          )}
          {gender && (
            <Button onClick={() => onFilterChange('gender', '')} size="sm">
              {gender} ×
            </Button>
          )}
        </Box>
      )}
      {shown.length ? (
        <Grid className={catalogGrid}>
          {shown.map((product, index) =>
            index === 1 ? (
              <PromotionCard key="promotion" />
            ) : (
              <ProductCard
                compareSelected={compared.some((item) => item.id === product.id)}
                key={product.id}
                onCompare={onToggleCompare}
                options={catalogProductCardOptions}
                product={product}
                quick={index === 0}
              />
            ),
          )}
        </Grid>
      ) : (
        <EmptyState
          action={<Button onClick={onReset}>필터 초기화</Button>}
          description="선택한 필터를 초기화한 뒤 다시 찾아보세요."
          title="조건에 맞는 상품이 없습니다"
        />
      )}
      <Pagination total={Math.ceil(result.length / 8)} page={page} onChange={onPageChange} />
      {compared.length > 0 && (
        <CompareBar
          products={compared}
          onClear={onClearCompare}
          onCompare={() => alert('비교 화면은 다음 UI 단계에서 연결됩니다.')}
        />
      )}
    </CatalogResults>
  );
}
