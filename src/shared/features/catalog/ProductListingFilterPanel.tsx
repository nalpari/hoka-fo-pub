import { useState } from 'react';
import { CatalogFilterGroup } from '@/shared/components/molecules/CatalogFilterGroup/CatalogFilterGroup';
import { CatalogFilterSection } from '@/shared/components/molecules/CatalogFilterSection/CatalogFilterSection';
import { ColorFilter } from '@/shared/components/molecules/ColorFilter/ColorFilter';
import { FilterPillGroup } from '@/shared/components/molecules/FilterPillGroup/FilterPillGroup';
import { PriceRange } from '@/shared/components/molecules/PriceRange/PriceRange';
import {
  CatalogFilterPanel,
  type CatalogSelectedFilter,
} from '@/shared/components/organisms/Catalog/CatalogFilterPanel/CatalogFilterPanel';

type ProductListingFilterPanelProps = {
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
  if (value === 'x-wide') return 'X-와이드';
  return value;
};

const normalizeCushioningValue = (value: string) => {
  if (!value) return '';
  const normalized = value.toLowerCase();
  if (normalized === 'balanced') return '균형 있는';
  if (normalized === 'plush') return '폭신한';
  if (normalized === 'responsive') return '스피드 있는';
  return value;
};

const normalizeStabilityValue = (value: string) => {
  if (!value) return '';
  const normalized = value.toLowerCase();
  if (normalized === 'stable') return '안정성';
  if (normalized === 'neutral') return '뉴트럴';
  return value;
};

const normalizeGenderValue = (value: string) => {
  if (value.toLowerCase() === 'men') return '남성';
  if (value.toLowerCase() === 'women') return '여성';
  return '';
};

const normalizeActivityValue = (value: string) => {
  const activityLabels: Record<string, string> = {
    'road-running': '로드 러닝',
    'trail-running': '트레일 러닝',
    lifestyle: '라이프스타일',
    hiking: '하이킹',
    walking: '워킹',
    recovery: '리커버리',
  };

  return activityLabels[value] ?? value;
};

const colorLabels: Record<string, string> = {
  red: '레드',
  blue: '블루',
  green: '그린',
  orange: '오렌지',
  gray: '그레이',
  black: '블랙',
  white: '화이트',
  pink: '핑크',
  brown: '브라운',
  yellow: '옐로우',
  purple: '퍼플',
  cream: '크림',
};

export function ProductListingFilterPanel({
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
  const [collection, setCollection] = useState('');
  const [runningType, setRunningType] = useState('');

  const selectedFilters: CatalogSelectedFilter[] = [
    ...(gender
      ? [
          {
            id: 'gender',
            label: normalizeGenderValue(gender),
            onRemove: () => onFilterChange('gender', ''),
          },
        ]
      : []),
    ...(size ? [{ id: 'size', label: size, onRemove: () => onFilterChange('size', '') }] : []),
    ...(width
      ? [
          {
            id: 'width',
            label: normalizeWidthValue(width),
            onRemove: () => onFilterChange('width', ''),
          },
        ]
      : []),
    ...selectedColors.map((color) => ({
      id: `color-${color}`,
      label: colorLabels[color] ?? color,
      onRemove: () =>
        onSelectedColorsChange(selectedColors.filter((selected) => selected !== color)),
    })),
    ...(activity
      ? [
          {
            id: 'activity',
            label: normalizeActivityValue(activity),
            onRemove: () => onFilterChange('activity', ''),
          },
        ]
      : []),
    ...(collection
      ? [{ id: 'collection', label: collection, onRemove: () => setCollection('') }]
      : []),
    ...(runningType
      ? [{ id: 'running-type', label: runningType, onRemove: () => setRunningType('') }]
      : []),
    ...(cushioning
      ? [
          {
            id: 'cushioning',
            label: normalizeCushioningValue(cushioning),
            onRemove: () => onFilterChange('cushioning', ''),
          },
        ]
      : []),
    ...(stability
      ? [
          {
            id: 'stability',
            label: normalizeStabilityValue(stability),
            onRemove: () => onFilterChange('support', ''),
          },
        ]
      : []),
    ...(maxPrice !== 189000
      ? [
          {
            id: 'price',
            label: `${maxPrice.toLocaleString('ko-KR')}원 이하`,
            onRemove: () => onMaxPriceChange(189000),
          },
        ]
      : []),
  ];

  const handleReset = () => {
    setCollection('');
    setRunningType('');
    onReset();
  };

  return (
    <CatalogFilterPanel onReset={handleReset} selectedFilters={selectedFilters}>
      <CatalogFilterGroup
        title="성별"
        values={['남성', '여성']}
        value={normalizeGenderValue(gender)}
        onChange={(value) => onFilterChange('gender', value === '남성' ? 'men' : 'women')}
      />
      <FilterPillGroup
        title="사이즈"
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
          '295',
          '300',
        ]}
        selected={size ? [size] : []}
        onChange={(next) => onFilterChange('size', next[0] ?? '')}
      />
      <CatalogFilterGroup
        title="발볼"
        values={['레귤러', '와이드', 'X-와이드']}
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
      <CatalogFilterGroup
        title="액티비티"
        values={['로드 러닝', '트레일 러닝', '라이프스타일', '하이킹', '워킹', '리커버리']}
        value={normalizeActivityValue(activity)}
        onChange={(value) =>
          onFilterChange(
            'activity',
            value === '로드 러닝'
              ? 'road-running'
              : value === '트레일 러닝'
                ? 'trail-running'
                : value === '라이프스타일'
                  ? 'lifestyle'
                  : value === '하이킹'
                    ? 'hiking'
                    : value === '워킹'
                      ? 'walking'
                      : 'recovery',
          )
        }
      />
      <CatalogFilterGroup
        title="컬렉션"
        values={['클리프톤', '아라히', '가비오타', '마하']}
        value={collection}
        onChange={setCollection}
      />
      <CatalogFilterGroup
        title="러닝 타입"
        values={['데일리 러닝', '레이스 데이']}
        value={runningType}
        onChange={setRunningType}
      />
      <CatalogFilterGroup
        title="주행감"
        values={['폭신한', '균형 있는', '스피드 있는']}
        value={normalizeCushioningValue(cushioning)}
        onChange={(value) =>
          onFilterChange(
            'cushioning',
            value === '폭신한' ? 'plush' : value === '균형 있는' ? 'balanced' : 'responsive',
          )
        }
      />
      <CatalogFilterGroup
        title="안정성"
        values={['뉴트럴', '안정성']}
        value={normalizeStabilityValue(stability)}
        onChange={(value) => onFilterChange('support', value === '안정성' ? 'stable' : 'neutral')}
      />
      <CatalogFilterSection title="가격">
        <PriceRange min={50000} max={389000} value={maxPrice} onChange={onMaxPriceChange} />
      </CatalogFilterSection>
    </CatalogFilterPanel>
  );
}
