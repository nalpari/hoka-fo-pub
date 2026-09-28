import { CatalogFilterGroup } from '@/shared/components/molecules/CatalogFilterGroup/CatalogFilterGroup';
import { CatalogFilterSection } from '@/shared/components/molecules/CatalogFilterSection/CatalogFilterSection';
import { ColorFilter } from '@/shared/components/molecules/ColorFilter/ColorFilter';
import { FilterPillGroup } from '@/shared/components/molecules/FilterPillGroup/FilterPillGroup';
import { PriceRange } from '@/shared/components/molecules/PriceRange/PriceRange';
import { CatalogFilterPanel } from '@/shared/components/organisms/Catalog/CatalogFilterPanel/CatalogFilterPanel';

type ProductListingFilterPanelProps = {
  category: string;
  gender: string;
  activity: string;
  width: string;
  cushioning: string;
  stability: string;
  size: string;
  maxPrice: number;
  selectedColors: string[];
  onFilterChange: (key: string, value: string) => void;
  onMaxPriceChange: (value: number) => void;
  onSelectedColorsChange: (values: string[]) => void;
  onReset: () => void;
};

const normalizeWidthValue = (value: string) => {
  if (!value) return '';
  if (value === 'regular') return '레귤러';
  if (value === 'wide') return '와이드';
  if (value === 'x-wide') return '엑스트라 와이드';
  return value;
};

const normalizeCushioningValue = (value: string) => {
  if (!value) return '';
  const normalized = value.toLowerCase();
  if (normalized === 'balanced') return 'Balanced';
  if (normalized === 'plush') return 'Plush';
  if (normalized === 'responsive') return 'Responsive';
  return value;
};

const normalizeStabilityValue = (value: string) => {
  if (!value) return '';
  const normalized = value.toLowerCase();
  if (normalized === 'stable') return 'Stable';
  if (normalized === 'neutral') return 'Neutral';
  return value;
};

export function ProductListingFilterPanel({
  category,
  gender,
  activity,
  width,
  cushioning,
  stability,
  size,
  maxPrice,
  selectedColors,
  onFilterChange,
  onMaxPriceChange,
  onSelectedColorsChange,
  onReset,
}: ProductListingFilterPanelProps) {
  return (
    <CatalogFilterPanel onReset={onReset}>
      <CatalogFilterGroup
        title="카테고리"
        values={['전체보기', '러닝', '트레일', '라이프스타일', '워킹', '스튜디오/피트니스']}
        value={category || '전체보기'}
        onChange={(value) => onFilterChange('category', value === '전체보기' ? '' : value)}
      />
      <CatalogFilterGroup
        title="성별"
        values={['Men', 'Women', 'Kids']}
        value={gender}
        onChange={(value) => onFilterChange('gender', gender === value ? '' : value)}
      />
      <FilterPillGroup
        title="신발 사이즈"
        values={[
          '220',
          '225',
          '230',
          '235',
          '240',
          '245',
          '250',
          '255',
          '260',
          '265',
          '270',
          '275',
          '280',
          '285',
          '290',
        ]}
        selected={size ? [size] : []}
        onChange={(next) => onFilterChange('size', next[0] ?? '')}
      />
      <CatalogFilterGroup
        title="발볼"
        values={['레귤러', '와이드', '엑스트라 와이드']}
        value={normalizeWidthValue(width)}
        onChange={(value) =>
          onFilterChange(
            'width',
            value === '레귤러' ? 'regular' : value === '와이드' ? 'wide' : 'x-wide',
          )
        }
      />
      <CatalogFilterSection title="색상">
        <ColorFilter selected={selectedColors} onChange={onSelectedColorsChange} />
      </CatalogFilterSection>
      <CatalogFilterSection title="가격">
        <PriceRange value={maxPrice} onChange={onMaxPriceChange} />
      </CatalogFilterSection>
      <CatalogFilterGroup
        title="할인율"
        values={['10% 할인 이상', '20% 할인 이상', '30% 할인 이상', '40% 할인 이상']}
      />
      <CatalogFilterGroup
        title="핏 (Width)"
        values={['Regular', 'Wide', 'X-Wide']}
        value={width ? (width === 'wide' ? 'Wide' : width === 'x-wide' ? 'X-Wide' : 'Regular') : ''}
        onChange={(value) =>
          onFilterChange(
            'width',
            value === 'Wide' ? 'wide' : value === 'X-Wide' ? 'x-wide' : 'regular',
          )
        }
      />
      <CatalogFilterGroup
        title="주요 용도"
        values={['Everyday Run', 'Trail Running', 'Walking', 'Hiking']}
        value={activity}
        onChange={(value) => onFilterChange('activity', value)}
      />
      <CatalogFilterGroup
        title="쿠셔닝"
        values={['Balanced', 'Plush', 'Responsive']}
        value={normalizeCushioningValue(cushioning)}
        onChange={(value) => onFilterChange('cushioning', value.toLowerCase())}
      />
      <CatalogFilterGroup
        title="안정성"
        values={['Neutral', 'Stable']}
        value={normalizeStabilityValue(stability)}
        onChange={(value) => onFilterChange('support', value.toLowerCase())}
      />
      <CatalogFilterGroup
        title="힐 / 토 오프셋 (MM)"
        values={['3.00', '4.00', '5.00', '6.00', '7.00', '8.00', '10.00']}
      />
    </CatalogFilterPanel>
  );
}
