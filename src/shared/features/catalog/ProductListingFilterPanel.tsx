import { CatalogFilterGroup } from '@/shared/components/molecules/CatalogFilterGroup/CatalogFilterGroup';
import { CatalogFilterSection } from '@/shared/components/molecules/CatalogFilterSection/CatalogFilterSection';
import { ColorFilter } from '@/shared/components/molecules/ColorFilter/ColorFilter';
import { FilterPillGroup } from '@/shared/components/molecules/FilterPillGroup/FilterPillGroup';
import { PriceRange } from '@/shared/components/molecules/PriceRange/PriceRange';
import {
  activityLabels,
  collectionValues,
  colorLabels,
  cushioningLabels,
  genderLabels,
  labelsToValues,
  productListingPriceRange,
  runningTypeValues,
  sizeValues,
  stabilityLabels,
  valuesToLabels,
  widthLabels,
} from '@/shared/features/catalog/productListingFilterValues';
import {
  CatalogFilterPanel,
  type CatalogSelectedFilter,
} from '@/shared/components/organisms/Catalog/CatalogFilterPanel/CatalogFilterPanel';

type ProductListingFilterPanelProps = {
  gender: string[];
  activity: string[];
  width: string[];
  cushioning: string[];
  stability: string[];
  size: string[];
  collection: string[];
  runningType: string[];
  maxPrice: number;
  selectedColors: string[];
  onFilterChange: (key: string, values: string[]) => void;
  onMaxPriceChange: (value: number) => void;
  onSelectedColorsChange: (values: string[]) => void;
  onReset: () => void;
};

const selectedFilterItems = (
  key: string,
  values: string[],
  labels: Record<string, string>,
  onChange: (values: string[]) => void,
) =>
  values.map((value) => ({
    id: `${key}-${value}`,
    label: labels[value] ?? value,
    onRemove: () => onChange(values.filter((selected) => selected !== value)),
  }));

/** Controls all catalog facets and exposes their current selections as removable tags. */
export function ProductListingFilterPanel({
  gender,
  activity,
  width,
  cushioning,
  stability,
  size,
  collection,
  runningType,
  maxPrice,
  selectedColors,
  onFilterChange,
  onMaxPriceChange,
  onSelectedColorsChange,
  onReset,
}: ProductListingFilterPanelProps) {
  const selectedFilters: CatalogSelectedFilter[] = [
    ...selectedFilterItems('gender', gender, genderLabels, (next) => onFilterChange('gender', next)),
    ...selectedFilterItems('size', size, {}, (next) => onFilterChange('size', next)),
    ...selectedFilterItems('width', width, widthLabels, (next) => onFilterChange('width', next)),
    ...selectedFilterItems('color', selectedColors, colorLabels, onSelectedColorsChange),
    ...selectedFilterItems('activity', activity, activityLabels, (next) => onFilterChange('activity', next)),
    ...selectedFilterItems('collection', collection, {}, (next) => onFilterChange('collection', next)),
    ...selectedFilterItems('running-type', runningType, {}, (next) => onFilterChange('runningType', next)),
    ...selectedFilterItems('cushioning', cushioning, cushioningLabels, (next) =>
      onFilterChange('cushioning', next),
    ),
    ...selectedFilterItems('stability', stability, stabilityLabels, (next) =>
      onFilterChange('support', next),
    ),
    ...(maxPrice !== productListingPriceRange.defaultMax
      ? [
          {
            id: 'price',
            label: `${maxPrice.toLocaleString('ko-KR')}원 이하`,
            onRemove: () => onMaxPriceChange(productListingPriceRange.defaultMax),
          },
        ]
      : []),
  ];

  return (
    <CatalogFilterPanel onReset={onReset} selectedFilters={selectedFilters}>
      <CatalogFilterGroup
        title="성별"
        values={Object.values(genderLabels)}
        selected={valuesToLabels(gender, genderLabels)}
        onChange={(values) => onFilterChange('gender', labelsToValues(values, genderLabels))}
      />
      <FilterPillGroup
        title="사이즈"
        values={sizeValues}
        selected={size}
        onChange={(next) => onFilterChange('size', next)}
      />
      <CatalogFilterGroup
        title="발볼"
        values={Object.values(widthLabels)}
        selected={valuesToLabels(width, widthLabels)}
        onChange={(values) => onFilterChange('width', labelsToValues(values, widthLabels))}
      />
      <CatalogFilterSection title="색상">
        <ColorFilter selected={selectedColors} onChange={onSelectedColorsChange} />
      </CatalogFilterSection>
      <CatalogFilterGroup
        title="액티비티"
        values={Object.values(activityLabels)}
        selected={valuesToLabels(activity, activityLabels)}
        onChange={(values) => onFilterChange('activity', labelsToValues(values, activityLabels))}
      />
      <CatalogFilterGroup
        title="컬렉션"
        values={collectionValues}
        selected={collection}
        onChange={(values) => onFilterChange('collection', values)}
      />
      <CatalogFilterGroup
        title="러닝 타입"
        values={runningTypeValues}
        selected={runningType}
        onChange={(values) => onFilterChange('runningType', values)}
      />
      <CatalogFilterGroup
        title="주행감"
        values={Object.values(cushioningLabels)}
        selected={valuesToLabels(cushioning, cushioningLabels)}
        onChange={(values) => onFilterChange('cushioning', labelsToValues(values, cushioningLabels))}
      />
      <CatalogFilterGroup
        title="안정성"
        values={Object.values(stabilityLabels)}
        selected={valuesToLabels(stability, stabilityLabels)}
        onChange={(values) => onFilterChange('support', labelsToValues(values, stabilityLabels))}
      />
      <CatalogFilterSection title="가격">
        <PriceRange
          min={productListingPriceRange.min}
          max={productListingPriceRange.max}
          value={maxPrice}
          onChange={onMaxPriceChange}
        />
      </CatalogFilterSection>
    </CatalogFilterPanel>
  );
}
