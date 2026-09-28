import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { products, type Product } from '@/mocks/products';
import { Button } from '@/shared/components/atoms/Button/Button';
import { Select } from '@/shared/components/atoms/Select/Select';
import { ContentLayout } from '@/shared/components/layouts/ContentLayout/ContentLayout';
import { BottomSheet } from '@/shared/components/layouts/BottomSheet/BottomSheet';
import type { BreadcrumbItem } from '@/shared/components/molecules/Breadcrumb/Breadcrumb';
import { usePlatform } from '@/shared/context/platform';
import { ProductListingFilterPanel } from '@/shared/features/catalog/ProductListingFilterPanel';
import { ProductListingResults } from '@/shared/features/catalog/ProductListingResults';
import { Grid } from 'styled-system/jsx';
import { css } from 'styled-system/css';

type ProductListingPageProps = {
  searchQuery?: string;
};

const matchingActivities: Record<string, string[]> = {
  'road-running': ['러닝'],
  'trail-running': ['트레일'],
  hiking: ['트레일'],
  walking: ['러닝', '라이프스타일'],
  training: ['라이프스타일', '러닝'],
  lifestyle: ['라이프스타일'],
};

const genderBreadcrumbs: Record<string, { label: string; productLabel: string }> = {
  men: { label: 'Men', productLabel: '남성 신발' },
  women: { label: 'Women', productLabel: '여성 신발' },
  kids: { label: 'Kids', productLabel: '키즈 신발' },
};

const genderTitleLabels: Record<string, string> = {
  men: '남성',
  women: '여성',
  kids: '키즈',
};

const activityBreadcrumbLabels: Record<string, string> = {
  'road-running': '로드 러닝',
  'trail-running': '트레일 러닝',
  walking: '워킹',
  training: '트레이닝',
  hiking: '하이킹',
};

const categoryBreadcrumbLabels: Record<string, string> = {
  'road running': '로드 러닝',
  'trail running': '트레일 러닝',
  'trail running & hiking': '트레일 러닝',
  '로드 러닝': '로드 러닝',
  러닝: '러닝',
  트레일: '트레일 러닝',
  하이킹: '하이킹',
  라이프스타일: '라이프스타일',
  워킹: '워킹',
  '스튜디오/피트니스': '스튜디오/피트니스',
};

const activityTitleLabels: Record<string, string> = {
  'road-running': '로드러닝 러닝화',
  'trail-running': '트레일 러닝화',
  walking: '워킹화',
  training: '트레이닝화',
  hiking: '하이킹화',
};

const categoryTitleLabels: Record<string, string> = {
  'road running': '로드러닝 러닝화',
  'trail running': '트레일 러닝화',
  'trail running & hiking': '트레일 러닝화',
  '로드 러닝': '로드러닝 러닝화',
  러닝: '러닝화',
  트레일: '트레일 러닝화',
  하이킹: '하이킹화',
  라이프스타일: '라이프스타일 신발',
  워킹: '워킹화',
  '스튜디오/피트니스': '스튜디오/피트니스 신발',
};

const normalizedKey = (value: string) => value.trim().toLowerCase();

function getBreadcrumbItems({
  gender,
  category,
  activity,
}: {
  gender: string;
  category: string;
  activity: string;
}): BreadcrumbItem[] {
  const normalizedGender = normalizedKey(gender);
  const genderBreadcrumb = genderBreadcrumbs[normalizedGender];
  const activityLabel = activityBreadcrumbLabels[normalizedKey(activity)];
  const categoryLabel = categoryBreadcrumbLabels[normalizedKey(category)] ?? category;
  const currentLabel = activityLabel ?? categoryLabel;

  if (!genderBreadcrumb) {
    return currentLabel
      ? [
          { label: 'HOME', href: '/' },
          { label: '상품', href: '/products' },
          { label: currentLabel },
        ]
      : [{ label: 'HOME', href: '/' }, { label: '상품' }];
  }

  const genderHref = `/products?gender=${normalizedGender}`;
  const items: BreadcrumbItem[] = [
    { label: genderBreadcrumb.label, href: genderHref },
    { label: genderBreadcrumb.productLabel },
  ];

  return currentLabel ? [...items, { label: currentLabel }] : items;
}

function getProductListingTitle({
  gender,
  category,
  activity,
}: {
  gender: string;
  category: string;
  activity: string;
}) {
  const genderLabel = genderTitleLabels[normalizedKey(gender)];
  const productLabel =
    activityTitleLabels[normalizedKey(activity)] ??
    categoryTitleLabels[normalizedKey(category)] ??
    '';

  if (genderLabel && productLabel) return `${genderLabel} ${productLabel}`;
  if (genderLabel) return `${genderLabel} 신발`;
  if (productLabel) return productLabel;

  return '상품 목록';
}

const catalogLayout = css({
  maxW: '1384px',
  mx: 'auto',
  py: '64px',
  _mobile: { px: '16px', py: '32px' },
});

const catalogBody = css({
  display: 'grid',
  gridTemplateColumns: '220px 1fr',
  gap: '36px',
  pt: '22px',
  borderTop: '1px solid #111',
  '& aside': { borderRight: '1px solid var(--line)' },
  _mobile: {
    display: 'block',
    '& aside': {
      mb: '18px',
      p: '12px',
      border: '1px solid var(--line)',
      borderRight: '1px solid var(--line)',
      '& fieldset:not(:first-child)': { display: 'none' },
    },
  },
});

const filterSheetContent = css({
  px: '20px',
  py: '8px',
  '& aside': { border: '0' },
  '& aside > h3': { display: 'none' },
  '& aside > button': { display: 'none' },
});

const filterResetButton = css({
  border: '0',
  bg: 'transparent',
  color: '#111',
  fontSize: '14px',
  textDecoration: 'underline',
  cursor: 'pointer',
  _focusVisible: { outline: '2px solid #000', outlineOffset: '2px' },
});

const filterApplyButton = css({
  width: '100%',
  minH: '52px',
  border: '0',
  borderRadius: '999px',
  bg: '#000',
  color: '#fff',
  fontSize: '18px',
  fontWeight: '700',
  cursor: 'pointer',
  _focusVisible: { outline: '2px solid #000', outlineOffset: '2px' },
});

const titleCount = css({
  ml: '8px',
  color: '#111',
  fontSize: '14px',
  fontWeight: '400',
  lineHeight: '18px',
  verticalAlign: 'baseline',
});

const productListingTitleStyle = css({
  color: '#000',
  fontSize: '28px',
  fontWeight: '900',
  lineHeight: '120%',
  letterSpacing: '-0.02em',
});

const sortSelect = css({ width: '132px' });

/** Shared catalog layout for the product list and search result pages. */
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
  const sort = params.get('sort') ?? '추천순';
  const page = Number(params.get('page') ?? 1);
  const normalizedSearchQuery = searchQuery.trim().toLocaleLowerCase('ko-KR');
  const breadcrumbItems = getBreadcrumbItems({ gender, category, activity });
  const productListingTitle = getProductListingTitle({ gender, category, activity });

  const update = (key: string, value: string) => {
    const next = new URLSearchParams(params);
    if (value) next.set(key, value);
    else next.delete(key);
    next.set('page', '1');
    setParams(next);
  };

  let result = products.filter((product) => {
    const matchedCategory = !category || product.category === category;
    const matchedGender = !gender || product.gender.toLowerCase() === gender.toLowerCase();
    const matchedActivity =
      !activity ||
      matchingActivities[activity]?.some((keyword) => product.category.includes(keyword)) ||
      product.use.toLowerCase().includes(activity.replace(/-/g, ' ')) ||
      product.category.toLowerCase().includes(activity.replace(/-/g, ' '));
    const matchedWidth =
      !width ||
      (width === 'wide'
        ? product.width === 'Wide'
        : width === 'x-wide'
          ? product.width === 'Wide'
          : product.width === 'Regular');
    const matchedCushioning =
      !cushioning || product.cushioning.toLowerCase() === cushioning.toLowerCase();
    const matchedStability =
      !stability ||
      (stability === 'stable'
        ? product.stability === 'Stable'
        : product.stability.toLowerCase() === stability.toLowerCase());
    const matchedSize = !size || product.sizes.includes(size);
    const matchedColor =
      !selectedColors.length || selectedColors.some((color) => product.colors.includes(color));
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
      product.price <= maxPrice
    );
  });

  result = [...result].sort((a, b) =>
    sort === '가격 낮은순'
      ? a.price - b.price
      : sort === '가격 높은순'
        ? b.price - a.price
        : a.id.localeCompare(b.id),
  );

  const shown = result.slice((page - 1) * 8, page * 8);

  const reset = () => {
    setParams({});
    setMaxPrice(189000);
    setSelectedColors([]);
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
      category={category}
      gender={gender}
      activity={activity}
      width={width}
      cushioning={cushioning}
      stability={stability}
      size={size}
      maxPrice={maxPrice}
      selectedColors={selectedColors}
      onFilterChange={update}
      onMaxPriceChange={setMaxPrice}
      onSelectedColorsChange={setSelectedColors}
      onReset={reset}
    />
  );

  return (
    <ContentLayout
      className={catalogLayout}
      breadcrumbItems={breadcrumbItems}
      titleClassName={productListingTitleStyle}
      headerAction={
        platform === 'mobile' ? (
          <Button size="sm" onClick={() => setFilterDrawerOpen(true)} aria-haspopup="dialog">
            필터
          </Button>
        ) : (
          <Select
            aria-label="상품 정렬"
            className={sortSelect}
            value={sort}
            onChange={(event) => update('sort', event.target.value)}
          >
            {['추천순', '신상품순', '가격 낮은순', '가격 높은순'].map((option) => (
              <option key={option}>{option}</option>
            ))}
          </Select>
        )
      }
      title={
        <>
          {normalizedSearchQuery ? `“${searchQuery.trim()}”에 대한 검색결과` : productListingTitle}
          <span className={titleCount}>({result.length})</span>
        </>
      }
    >
      <Grid className={catalogBody}>
        {platform === 'web' && filterPanel}
        <ProductListingResults
          category={category}
          gender={gender}
          page={page}
          result={result}
          shown={shown}
          compared={compared}
          onFilterChange={update}
          onPageChange={(nextPage) => {
            const next = new URLSearchParams(params);
            next.set('page', String(nextPage));
            setParams(next);
          }}
          onReset={reset}
          onToggleCompare={toggleCompare}
          onClearCompare={() => setCompared([])}
        />
      </Grid>
      {platform === 'mobile' && filterDrawerOpen && (
        <BottomSheet
          title="필터"
          ariaLabel="상품 필터"
          onClose={() => setFilterDrawerOpen(false)}
          headerAction={
            <button type="button" className={filterResetButton} onClick={reset}>
              초기화
            </button>
          }
          footer={
            <button
              type="button"
              className={filterApplyButton}
              onClick={() => setFilterDrawerOpen(false)}
            >
              필터 적용하기 ({result.length})
            </button>
          }
        >
          <div className={filterSheetContent}>{filterPanel}</div>
        </BottomSheet>
      )}
    </ContentLayout>
  );
}
