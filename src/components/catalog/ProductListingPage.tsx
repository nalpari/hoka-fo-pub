'use client';

/**
 * [개발팀 바인딩]
 * data prop 또는 ProductListingContext에 실제 Product 결과와 검색/필터/페이지 계약을 전달합니다. data prop이 우선합니다.
 * onQueryChange는 적용 조건, onPreviewQueryChange는 모바일 초안 조건입니다. 서버 페이지의 전체 건수를 items.length로 추정하지 않습니다.
 */

import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import { Checkbox as BaseCheckbox } from '@base-ui/react/checkbox';
import { CheckboxGroup as BaseCheckboxGroup } from '@base-ui/react/checkbox-group';
import { Collapsible as BaseCollapsible } from '@base-ui/react/collapsible';
import { Slider as BaseSlider } from '@base-ui/react/slider';
import { AnimatePresence, motion } from 'motion/react';
import {
  type ComponentProps,
  type ComponentPropsWithoutRef,
  type CSSProperties,
  type ReactNode,
  useCallback,
  useContext,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from 'react';
import { type Platform, usePlatform } from '@/context/platform';
import { type ProductListingBinding, ProductListingContext } from '@/context/ProductListingContext';
import { useRequestAction } from '@/hooks/useRequestAction';
import { useScrollPin } from '@/lib/useScrollPin';

import { css, cva } from 'styled-system/css';
import { Box, Circle, Flex, Grid, HStack, Stack, VStack } from 'styled-system/jsx';
import { token } from 'styled-system/tokens';

import { Button } from '@/components/common/atoms/Button';
import { Checkbox } from '@/components/common/atoms/Checkbox';
import { EmptyState } from '@/components/common/atoms/EmptyState';
import { FilterTabs } from '@/components/common/atoms/FilterTabs';
import { useFormFieldContext } from '@/components/common/atoms/FormField';
import { Icon } from '@/components/common/atoms/Icon';
import { Radio } from '@/components/common/atoms/Radio';
import { Typography } from '@/components/common/atoms/Typography';

import { type BreadcrumbItem } from '@/components/common/molecules/Breadcrumb';
import { ContentHeader } from '@/components/common/molecules/ContentHeader';
import { MainContentCard } from '@/components/common/molecules/MainContentCard';
import { ProductCard } from '@/components/common/molecules/ProductCard/ProductCard';
import { SearchField } from '@/components/common/molecules/SearchField';
import { SizeSelector } from '@/components/common/molecules/SizeSelector/SizeSelector';

import { SearchHeader } from '@/components/common/organisms/Search/SearchHeader';

import { BottomSheet } from '@/components/common/layouts/BottomSheet';
import { ContentLayout } from '@/components/common/layouts/ContentLayout';

import { filterProducts, sortProducts } from '@/components/catalog/product-listing/filterProducts';
import {
  getBreadcrumbItems,
  getProductListingTitle,
} from '@/components/catalog/product-listing/productListingMetadata';
import { productSortOptions } from '@/components/catalog/product-listing/productSortOptions';
import type { FilterValues } from '@/components/catalog/productListing.types';
import {
  activityLabels,
  collectionValues,
  colorLabels,
  colorOptions,
  cushioningLabels,
  genderLabels,
  labelsToValues,
  productListingPriceRange,
  runningTypeValues,
  sizeValues,
  stabilityLabels,
  valuesToLabels,
  widthLabels,
} from '@/components/catalog/productListingFilterValues';
import { type Product, products } from '@/mocks/products';
import type { ProductCardOption } from '@/types/component-contracts/components-common-molecules-ProductCard-ProductCard';

const fieldset = css({ m: '0', border: '0', p: '0' });

type FieldsetProps = Omit<ComponentPropsWithoutRef<'fieldset'>, 'children'> & {
  legend?: ReactNode;
  children: ReactNode;
  visuallyHiddenLegend?: boolean;
};

/** 관련 폼 컨트롤을 의미 있는 그룹으로 묶습니다 (Semantic grouping primitive for related form controls). */
function Fieldset({
  legend: label,
  visuallyHiddenLegend = false,
  className,
  children,
  ...props
}: FieldsetProps) {
  return (
    <fieldset {...props} className={[fieldset, className].filter(Boolean).join(' ')}>
      {label ? (
        <Typography
          as="legend"
          srOnly={visuallyHiddenLegend}
          className={css({ p: '0', fontWeight: 'bold' })}
        >
          {label}
        </Typography>
      ) : null}
      {children}
    </fieldset>
  );
}

const icon = css({ w: '4', h: '4', flexShrink: 0 });

const trigger = css({
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'row',
  gap: '2',
  w: '100%',
  justifyContent: 'space-between',
  border: '0',
  bg: 'transparent',
  cursor: 'pointer',
  px: '0',
  py: '6',
  textAlign: 'left',
});

type CatalogFilterTriggerProps = {
  controlsId: string;
  expanded: boolean;
  onToggle: () => void;
  title: string;
};

/** 카탈로그 필터 섹션의 열기 상태와 제목을 표시합니다. (Displays the title and toggle state of a catalog filter section.) */
function CatalogFilterTrigger({
  controlsId,
  expanded,
  onToggle,
  title,
}: CatalogFilterTriggerProps) {
  return (
    <button
      aria-controls={controlsId}
      aria-expanded={expanded}
      className={trigger}
      onClick={onToggle}
      type="button"
    >
      <Typography variant="body3" weight="semibold">
        {title}
      </Typography>
      <img
        alt=""
        aria-hidden="true"
        className={icon}
        height={16}
        src={expanded ? '/images/icon/filter-expanded.svg' : '/images/icon/filter-collapsed.svg'}
        width={16}
      />
    </button>
  );
}

const root = css({
  pb: '6',
});

const content = css({
  w: '100%',
  overflow: 'hidden',
});

/** 필터 섹션의 제목과 펼침 상태를 구성합니다 (Displays the catalog filter section composition). */
function CatalogFilterSection({ title, children }: { title: string; children: ReactNode }) {
  const [expanded, setExpanded] = useState(true);
  const contentId = useId();

  return (
    <>
      <Box
        bg="var(--color-black-40)"
        _mobile={{
          '&:first-child': { display: 'none' },
        }}
        h="1px"
        w="100%"
      />
      <div>
        <CatalogFilterTrigger
          controlsId={contentId}
          expanded={expanded}
          onToggle={() => setExpanded((current) => !current)}
          title={title}
        />
        <AnimatePresence initial={false}>
          {expanded && (
            <motion.div
              animate={{ height: 'auto', opacity: 1 }}
              className={content}
              exit={{ height: 0, opacity: 0 }}
              initial={{ height: 0, opacity: 0 }}
              key="content"
              transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
              id={contentId}
            >
              <Fieldset className={root} legend={title} visuallyHiddenLegend>
                {children}
              </Fieldset>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}

/** 같은 기준의 필터 선택지를 묶습니다 (Displays the catalog filter group composition). */
function CatalogFilterGroup({
  title,
  values,
  selected: controlledSelected = [],
  onChange,
}: {
  title: string;
  values: string[];
  selected?: string[];
  onChange?: (values: string[]) => void;
}) {
  const [internalSelected, setInternalSelected] = useState<string[]>([]);
  const selectedValues = onChange ? controlledSelected : internalSelected;
  return (
    <CatalogFilterSection title={title}>
      <Checkbox
        onValueChange={(next) => (onChange ? onChange(next) : setInternalSelected(next))}
        options={values.map((item) => ({ label: item, value: item }))}
        value={selectedValues}
      />
    </CatalogFilterSection>
  );
}

type ColorFilterOption = {
  value: string;
  label: string;
  hex: string;
};

type ColorFilterProps = {
  options: readonly ColorFilterOption[];
  selected: string[];
  onChange: (values: string[]) => void;
};

const optionsLayout = css({
  display: 'flex',
  flexWrap: 'wrap',
  gap: '4',
});

const outer = css({
  w: '9',
  h: '9',
  bg: 'var(--color-white-000)',
  '&:has([role="checkbox"][data-checked])': {
    outline: '2px solid var(--color-black-100)',
    '& [data-swatch]': { w: '8', h: '8' },
  },
});

const control = css({
  position: 'absolute',
  opacity: '0',
});

/** 상품 색상 필터의 선택지를 표시합니다 (Displays the color filter composition). */
function ColorFilter({ options, selected, onChange }: ColorFilterProps) {
  return (
    <BaseCheckboxGroup value={selected} onValueChange={onChange} className={optionsLayout}>
      {options.map(({ value, label, hex }) => (
        <Circle
          as="label"
          position="relative"
          placeItems="center"
          cursor="pointer"
          key={value}
          className={outer}
        >
          <BaseCheckbox.Root value={value} aria-label={label} className={control} />
          <Circle
            as="span"
            w="9"
            h="9"
            border="0.5px solid color-mix(in srgb, var(--color-black-100) 20%, transparent)"
            bg="var(--swatch-color)"
            data-swatch
            style={{ '--swatch-color': hex } as CSSProperties}
          />
        </Circle>
      ))}
    </BaseCheckboxGroup>
  );
}

/** 필터 선택지를 필 형태로 표시합니다 (Displays the filter pill group composition). */
function FilterPillGroup({
  title,
  values,
  selected = [],
  onChange,
}: {
  title: string;
  values: string[];
  selected?: string[];
  onChange?: (next: string[]) => void;
}) {
  const [internalSelected, setInternalSelected] = useState<string[]>([]);
  const selectedValues = onChange ? selected : internalSelected;

  return (
    <CatalogFilterSection title={title}>
      <SizeSelector
        mode="multiple"
        ariaLabel={title}
        columns={4}
        options={values.map((value) => ({ value }))}
        onValueChange={(next) => (onChange ? onChange(next) : setInternalSelected(next))}
        value={selectedValues}
      />
    </CatalogFilterSection>
  );
}

const RangeInputRoot = css({
  w: '100%',
  '&[aria-invalid="true"]': { outline: '2px solid var(--colors-red-100)', outlineOffset: '2px' },
});

const RangeInputControl = css({
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  h: '34px',
});

const track = css({ position: 'relative', w: '100%', h: '4px', bg: 'var(--color-black-20)' });

const indicator = css({ h: '100%', bg: 'var(--color-black-100)' });

const thumb = css({
  w: '16px',
  h: '16px',
  border: '3px solid var(--color-black-100)',
  borderRadius: 'full',
  bg: 'var(--color-white-000)',
});

type RangeValue = number | readonly number[];

type RangeInputProps<Value extends RangeValue = RangeValue> = {
  'aria-label'?: string;
  className?: string;
  disabled?: boolean;
  form?: string;
  max?: number;
  min?: number;
  name?: string;
  onValueChange: (value: Value) => void;
  step?: number;
  thumbAriaLabels?: readonly string[];
  thumbCollisionBehavior?: 'none' | 'push' | 'swap';
  value: Value;
};

/** 하나 이상의 조절점을 가진 범위 슬라이더를 제공합니다 (Controlled Base UI slider supporting one or more labeled thumbs). */
function RangeInput<Value extends RangeValue>({
  'aria-label': ariaLabel,
  className,
  disabled,
  form,
  max,
  min,
  name,
  onValueChange,
  step,
  thumbAriaLabels,
  thumbCollisionBehavior,
  value,
}: RangeInputProps<Value>) {
  const field = useFormFieldContext();
  const values = Array.isArray(value) ? value : [value];

  return (
    <BaseSlider.Root
      aria-describedby={field?.describedBy}
      className={[RangeInputRoot, className].filter(Boolean).join(' ')}
      disabled={disabled}
      form={form}
      max={max}
      min={min}
      name={name}
      onValueChange={(nextValue) => onValueChange(nextValue as Value)}
      step={step}
      thumbCollisionBehavior={thumbCollisionBehavior}
      value={value}
    >
      <BaseSlider.Control className={RangeInputControl}>
        <BaseSlider.Track className={track}>
          <BaseSlider.Indicator className={indicator} />
          {values.map((_, index) => (
            <BaseSlider.Thumb
              aria-label={thumbAriaLabels?.[index] ?? ariaLabel}
              className={thumb}
              index={index}
              key={index}
            />
          ))}
        </BaseSlider.Track>
      </BaseSlider.Control>
    </BaseSlider.Root>
  );
}

const formatPrice = (value: number, showUnit: boolean) =>
  `${value.toLocaleString('ko-KR')}${showUnit ? '원' : ''}`;

function PriceRangeValue({
  value: [minimumValue, maximumValue],
  showUnit = false,
}: {
  value: [number, number];
  showUnit?: boolean;
}) {
  return (
    <Flex justifyContent="space-between" alignItems="center">
      <Typography variant="body4">{formatPrice(minimumValue, showUnit)}</Typography>
      <Typography variant="body4">{formatPrice(maximumValue, showUnit)}</Typography>
    </Flex>
  );
}

/** 최소·최대 가격 입력과 슬라이더를 연결합니다 (Displays the price range composition). */
function PriceRange({
  min = 129000,
  max = 189000,
  value,
  onChange,
}: {
  min?: number;
  max?: number;
  value: [number, number];
  onChange: (value: [number, number]) => void;
}) {
  return (
    <Flex direction="column" gap="2">
      <Box px="2">
        <RangeInput
          max={max}
          min={min}
          onValueChange={onChange}
          step={10000}
          thumbAriaLabels={['최소 가격', '최대 가격']}
          thumbCollisionBehavior="none"
          value={value}
        />
      </Box>
      <PriceRangeValue value={value} />
    </Flex>
  );
}

type CatalogFilterPanelBodyProps = {
  children: ReactNode;
};

function CatalogFilterPanelBody({ children }: CatalogFilterPanelBodyProps) {
  return (
    <VStack w="100%" gap="0" css={{ '& > *': { w: '100%' } }}>
      {children}
    </VStack>
  );
}

const tag = css({
  h: '8',
  p: '7px 8px 7px 10px',
  bg: 'var(--color-black-20)',
  _mobile: {
    h: '7',
  },
});

type TagProps = {
  children: ReactNode;
  onDelete?: () => void;
};

/** 선택 항목의 이름과 제거 동작을 표시합니다 (A compact label that can optionally remove its associated selection). */
function Tag({ children, onDelete }: TagProps) {
  const platform = usePlatform();
  if (!onDelete) return <span className={tag}>{children}</span>;

  return (
    <Flex className={tag} gap="1.5" alignItems="center" justifyContent="space-between">
      <Typography variant="body3" tone="primary">
        {children}
      </Typography>
      <Button
        variant="icon"
        aria-label={`${typeof children === 'string' ? children : '태그'} 삭제`}
        onClick={onDelete}
        size={platform === 'mobile' ? '14px' : '16px'}
      >
        <Icon name="tag-delete" size={platform === 'mobile' ? '14px' : '16px'} />
      </Button>
    </Flex>
  );
}

type CatalogSelectedFilter = {
  id: string;
  label: string;
  onRemove: () => void;
};

type CatalogFilterPanelHeaderProps = {
  onReset: () => void;
  selectedFilters: CatalogSelectedFilter[];
};

function CatalogFilterPanelHeader({ onReset, selectedFilters }: CatalogFilterPanelHeaderProps) {
  if (!selectedFilters.length) return null;

  return (
    <>
      <Flex
        alignItems="center"
        aria-label="선택된 필터"
        pb="6"
        _mobile={{ pb: '0' }}
        flexWrap="wrap"
        gap="2"
        w="100%"
      >
        {selectedFilters.length > 0 && (
          <>
            {selectedFilters.map(({ id, label, onRemove }) => (
              <Tag key={id} onDelete={onRemove}>
                {label}
              </Tag>
            ))}
          </>
        )}
        <Flex h="8" alignItems="center">
          <Button onClick={onReset} variant="link" size="sm">
            초기화
          </Button>
        </Flex>
      </Flex>
    </>
  );
}

/** 필터의 본문과 적용 액션을 배치합니다 (Displays the catalog filter panel composition). */
function CatalogFilterPanel({
  children,
  onReset,
  selectedFilters = [],
}: {
  children: ReactNode;
  onReset: () => void;
  selectedFilters?: CatalogSelectedFilter[];
}) {
  return (
    <VStack
      as="aside"
      w="100%"
      pb="var(--spacing-64)"
      alignItems="stretch"
      _mobile={{ pb: 'var(--spacing-4)' }}
      gap="0"
    >
      <CatalogFilterPanelHeader onReset={onReset} selectedFilters={selectedFilters} />
      <CatalogFilterPanelBody>{children}</CatalogFilterPanelBody>
    </VStack>
  );
}

type ProductListingFilterPanelProps = {
  gender: string[];
  activity: string[];
  width: string[];
  cushioning: string[];
  stability: string[];
  size: string[];
  collection: string[];
  minPrice: number;
  runningType: string[];
  maxPrice: number;
  selectedColors: string[];
  onFilterChange: (key: string, values: string[]) => void;
  onMinPriceChange: (value: number) => void;
  onMaxPriceChange: (value: number) => void;
  onSelectedColorsChange: (values: string[]) => void;
  onReset: () => void;
  mobileSort?: { value: string; onValueChange: (value: string) => void };
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

/** 상품 필터와 모바일 정렬을 구성하고 선택 항목을 태그로 표시합니다. (Composes product facets and mobile sorting with removable selection tags.) */
function ProductListingFilterPanel({
  gender,
  activity,
  width,
  cushioning,
  stability,
  size,
  collection,
  minPrice,
  runningType,
  maxPrice,
  selectedColors,
  onFilterChange,
  onMinPriceChange,
  onMaxPriceChange,
  onSelectedColorsChange,
  onReset,
  mobileSort,
}: ProductListingFilterPanelProps) {
  const selectedFilters: CatalogSelectedFilter[] = [
    ...selectedFilterItems('gender', gender, genderLabels, (next) =>
      onFilterChange('gender', next),
    ),
    ...selectedFilterItems('size', size, {}, (next) => onFilterChange('size', next)),
    ...selectedFilterItems('width', width, widthLabels, (next) => onFilterChange('width', next)),
    ...selectedFilterItems('color', selectedColors, colorLabels, onSelectedColorsChange),
    ...selectedFilterItems('activity', activity, activityLabels, (next) =>
      onFilterChange('activity', next),
    ),
    ...selectedFilterItems('collection', collection, {}, (next) =>
      onFilterChange('collection', next),
    ),
    ...selectedFilterItems('running-type', runningType, {}, (next) =>
      onFilterChange('runningType', next),
    ),
    ...selectedFilterItems('cushioning', cushioning, cushioningLabels, (next) =>
      onFilterChange('cushioning', next),
    ),
    ...selectedFilterItems('stability', stability, stabilityLabels, (next) =>
      onFilterChange('support', next),
    ),
    ...(minPrice !== productListingPriceRange.min ||
    maxPrice !== productListingPriceRange.defaultMax
      ? [
          {
            id: 'price',
            label: `${minPrice.toLocaleString('ko-KR')}원 ~ ${maxPrice.toLocaleString('ko-KR')}원`,
            onRemove: () => {
              onMinPriceChange(productListingPriceRange.min);
              onMaxPriceChange(productListingPriceRange.defaultMax);
            },
          },
        ]
      : []),
  ];

  return (
    <CatalogFilterPanel onReset={onReset} selectedFilters={selectedFilters}>
      {mobileSort && (
        <CatalogFilterSection title="정렬">
          <Radio
            ariaLabel="상품 정렬"
            value={mobileSort.value}
            onValueChange={mobileSort.onValueChange}
            options={productSortOptions}
          />
        </CatalogFilterSection>
      )}
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
        <ColorFilter
          options={colorOptions}
          selected={selectedColors}
          onChange={onSelectedColorsChange}
        />
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
        onChange={(values) =>
          onFilterChange('cushioning', labelsToValues(values, cushioningLabels))
        }
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
          value={[minPrice, maxPrice]}
          onChange={([nextMinPrice, nextMaxPrice]) => {
            onMinPriceChange(nextMinPrice);
            onMaxPriceChange(nextMaxPrice);
          }}
        />
      </CatalogFilterSection>
    </CatalogFilterPanel>
  );
}

const CollapsibleTrigger = css({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  w: '100%',
  p: '0',
  border: '0',
  bg: 'transparent',
  color: 'inherit',
  cursor: 'pointer',
  '&[data-panel-open] [data-collapsible-indicator]': { transform: 'rotate(180deg)' },
  _focusVisible: { outline: '2px solid var(--color-focus-ring)', outlineOffset: '2px' },
  _disabled: { cursor: 'not-allowed', opacity: '0.55' },
});

const CollapsibleIndicator = css({
  display: 'block',
  flexShrink: 0,
  transition: 'transform 0.15s ease',
});

const defaultIndicator = css({
  display: 'block',
  flexShrink: 0,
});

function DefaultIndicator() {
  return (
    <svg className={defaultIndicator} fill="none" height="8" viewBox="0 0 13 8" width="13">
      <path
        d="M0.480469 0.508114L6.24565 6.2733L11.9805 0.477905"
        stroke="currentColor"
        strokeWidth="1.35887"
      />
    </svg>
  );
}

type CollapsibleProps = {
  children: ReactNode;
  trigger: ReactNode;
  /** Compose an existing button while Base UI owns the disclosure behavior. */
  triggerRender?: ComponentProps<typeof BaseCollapsible.Trigger>['render'];
  className?: string;
  defaultOpen?: boolean;
  disabled?: boolean;
  /** Custom indicator. Pass `null` to hide the default chevron. */
  indicator?: ReactNode | null;
  open?: boolean;
  panelClassName?: string;
  triggerClassName?: string;
  onOpenChange?: (open: boolean) => void;
};

/** 접근 가능한 펼침 트리거와 콘텐츠 영역을 제공합니다 (Reusable expandable region with an accessible Base UI trigger and panel). */
function Collapsible({
  children,
  trigger: triggerContent,
  triggerRender,
  className,
  defaultOpen,
  disabled,
  indicator: indicatorContent,
  open,
  panelClassName,
  triggerClassName,
  onOpenChange,
}: CollapsibleProps) {
  return (
    <BaseCollapsible.Root
      className={className}
      defaultOpen={defaultOpen}
      disabled={disabled}
      onOpenChange={(nextOpen) => onOpenChange?.(nextOpen)}
      open={open}
    >
      <BaseCollapsible.Trigger
        render={triggerRender}
        className={
          triggerRender
            ? triggerClassName
            : [CollapsibleTrigger, triggerClassName].filter(Boolean).join(' ')
        }
      >
        {triggerContent}
        {indicatorContent !== null ? (
          <span aria-hidden="true" className={CollapsibleIndicator} data-collapsible-indicator>
            {indicatorContent ?? <DefaultIndicator />}
          </span>
        ) : null}
      </BaseCollapsible.Trigger>
      <BaseCollapsible.Panel className={panelClassName}>{children}</BaseCollapsible.Panel>
    </BaseCollapsible.Root>
  );
}

const DisclosureRoot = cva({
  base: { w: '100%' },
  variants: {
    variant: {
      default: { borderBottom: '1px solid var(--color-black-20)' },
      panel: { position: 'relative' },
    },
  },
  defaultVariants: { variant: 'default' },
});

const DisclosureTrigger = cva({
  base: {
    display: 'flex',
    justifyContent: 'space-between',
    flexShrink: 0,
    w: '100%',
    border: '0',
    bg: 'transparent',
    textAlign: 'left',
  },
  variants: {
    variant: {
      default: { px: '0', py: '22px' },
      panel: {
        gap: '2',
      },
    },
  },
  defaultVariants: { variant: 'default' },
});

const panel = cva({
  variants: {
    variant: {
      default: {},
      panel: {
        position: 'absolute',
        zIndex: 10,
        top: 'calc(100% + 8px)',
        right: '0',
        w: 'max-content',
        borderWidth: '1px',
        borderStyle: 'solid',
        borderColor: 'var(--color-border-tertiary)',
        bg: 'var(--color-surface-default)',
        borderRadius: '4px',
      },
    },
  },
  defaultVariants: { variant: 'default' },
});

const DisclosureContent = cva({
  variants: {
    variant: {
      default: {
        pb: '22px',
        '&&': {
          color: 'var(--color-text-tertiary)',
          lineHeight: 'body',
        },
      },
      panel: { p: '3' },
    },
  },
  defaultVariants: { variant: 'default' },
});

type DisclosureVariant = 'default' | 'panel';

type DisclosureProps = {
  title: ReactNode;
  children: ReactNode;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  className?: string;
  contentClassName?: string;
  indicator?: ReactNode | null;
  panelClassName?: string;
  triggerClassName?: string;
  variant?: DisclosureVariant;
};

/** 펼칠 수 있는 행과 옵션 메뉴를 구성합니다 (Styled Collapsible composition for expandable content, rows, and option menus). */
function Disclosure({
  title,
  children,
  open,
  onOpenChange,
  className,
  contentClassName,
  indicator,
  panelClassName,
  triggerClassName,
  variant = 'default',
}: DisclosureProps) {
  return (
    <Collapsible
      className={[DisclosureRoot({ variant }), className].filter(Boolean).join(' ')}
      indicator={indicator}
      onOpenChange={onOpenChange}
      open={open}
      panelClassName={[panel({ variant }), panelClassName].filter(Boolean).join(' ')}
      trigger={<Typography variant="body3">{title}</Typography>}
      triggerClassName={[DisclosureTrigger({ variant }), triggerClassName]
        .filter(Boolean)
        .join(' ')}
    >
      <Flex
        className={[DisclosureContent({ variant }), contentClassName].filter(Boolean).join(' ')}
      >
        {children}
      </Flex>
    </Collapsible>
  );
}

const sortOptions = css({ minW: '106px' });

type ProductSortDropdownProps = {
  placeholder?: string;
  value: string;
  onChange: (sort: string) => void;
};

/** 상품 정렬 드롭다운의 선택과 키보드 조작을 관리합니다. (Manages selection and keyboard interaction in the product sort dropdown.) */
function ProductSortDropdown({ placeholder, value, onChange }: ProductSortDropdownProps) {
  const [open, setOpen] = useState(false);

  const selectingWithKeyboard = useRef(false);

  return (
    <Box
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setOpen(false);
      }}
    >
      <Disclosure onOpenChange={setOpen} open={open} title={placeholder ?? value} variant="panel">
        <Box
          onKeyDownCapture={(event) => {
            selectingWithKeyboard.current = event.key === ' ' || event.key.startsWith('Arrow');
          }}
          onPointerDownCapture={() => {
            selectingWithKeyboard.current = false;
          }}
        >
          <Radio
            ariaLabel="상품 정렬"
            className={sortOptions}
            onValueChange={(nextValue) => {
              onChange(nextValue);

              if (!selectingWithKeyboard.current) setOpen(false);

              selectingWithKeyboard.current = false;
            }}
            options={productSortOptions}
            value={value}
          />
        </Box>
      </Disclosure>
    </Box>
  );
}

const promotion = {
  title: '데일리 러닝화 가이드',
  description: '목적에 맞는 호카 러닝화 기능을 비교해보세요.',
  image: '/images/temp/@product-list-promotion.png',
  actions: [{ label: '바로가기', to: '/explore/guides/running' }],
} as const;

type PromotionCardVariant = 'inline' | 'fullWidth';

type PromotionCardProps = {
  variant?: PromotionCardVariant;
};

const PromotionCardRoot = cva({
  base: { w: '100%' },
  variants: {
    variant: {
      inline: {
        _mobile: {
          gap: '3',
          '& .card__header': { px: '3', gap: '2' },
          '& h3': { fontSize: '16px', fontWeight: 'bold', lineHeight: '1.4' },
          '& .card__action': { px: '3' },
        },
      },
      fullWidth: {
        _mobile: {
          gap: '4',
          '& h3': { fontSize: '24px', fontWeight: 'black', lineHeight: '1.4' },
        },
      },
    },
  },
  defaultVariants: { variant: 'inline' },
});

const imageAspectRatios = {
  inline: {
    desktop: token.var('aspectRatios.media.productThumbnail'),
    mobile: token.var('aspectRatios.media.productThumbnail'),
  },
  fullWidth: { desktop: '375 / 248', mobile: '375 / 248' },
} as const;

/** 상품 목록의 프로모션 콘텐츠를 표시합니다 (Catalog promotion card with inline and full-width presentations). */
function PromotionCard({ variant = 'inline' }: PromotionCardProps) {
  return (
    <MainContentCard
      {...promotion}
      className={PromotionCardRoot({ variant })}
      imageAspectRatio={imageAspectRatios[variant]}
      imageSizes={
        variant === 'fullWidth'
          ? '(max-width: 1024px) 100vw, 1200px'
          : '(max-width: 1024px) 50vw, 25vw'
      }
      variant="descriptionLink"
    />
  );
}

/** 상품 결과 목록과 빈 상태를 표시합니다 (Displays the catalog results composition). */
function CatalogResults({ children }: { children: ReactNode }) {
  return (
    <Box className="results" minW="0">
      {children}
    </Box>
  );
}

const catalogProductCardOptions: readonly ProductCardOption[] = ['promotion', 'like', 'colors'];

type ProductListingResultsProps = {
  pending?: boolean;
  error?: string;
  hasMore: boolean;
  onLoadMore: () => void;
  platform: Platform;
  shown: Product[];
  onReset: () => void;
};

function ProductListingResults({
  pending,
  error,
  hasMore,
  onLoadMore,
  platform,
  shown,
  onReset,
}: ProductListingResultsProps) {
  const loadMoreRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const target = loadMoreRef.current;
    if (!target || !hasMore || pending || error) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) onLoadMore();
      },
      { rootMargin: '240px 0px' },
    );

    observer.observe(target);
    return () => observer.disconnect();
  }, [hasMore, onLoadMore, pending, error]);

  return (
    <CatalogResults>
      {shown.length ? (
        <>
          <Grid
            gridTemplateColumns="repeat(3, minmax(0, 1fr))"
            columnGap="4"
            rowGap="12"
            css={
              platform === 'web'
                ? {
                    _wideDesktop: { gridTemplateColumns: 'repeat(4, minmax(0, 1fr))' },
                    _ultraWideDesktop: { gridTemplateColumns: 'repeat(5, minmax(0, 1fr))' },
                  }
                : undefined
            }
            _mobile={{ gridTemplateColumns: 'repeat(2, 1fr)', columnGap: '2', rowGap: '10' }}
          >
            {shown.flatMap((product, index) => [
              ...(index === 5 ? [<PromotionCard key="promotion" />] : []),
              <ProductCard
                key={product.id}
                options={catalogProductCardOptions}
                product={product}
              />,
            ])}
          </Grid>
          {platform === 'mobile' && (
            <Box mt="10" w="100%">
              <PromotionCard variant="fullWidth" />
            </Box>
          )}
          {hasMore && <Box ref={loadMoreRef} aria-hidden="true" h="1px" />}
        </>
      ) : pending || error ? null : (
        <EmptyState
          action={<Button onClick={onReset}>필터 초기화</Button>}
          description="선택한 필터를 초기화한 뒤 다시 찾아보세요."
          title="조건에 맞는 상품이 없습니다"
        />
      )}
    </CatalogResults>
  );
}

type ProductListingContentProps = {
  onRetry?: () => void;
  pending?: boolean;
  error?: string;
  resultCount?: number;
  hasMore?: boolean;
  filterDrawerOpen: boolean;
  filterPanel: ReactNode;
  mobileResultCount: number;
  onFilterDrawerOpenChange: (open: boolean) => void;
  onLoadMore: () => void;
  onMobileFilterApply: () => void;
  onReset: () => void;
  platform: Platform;
  result: Product[];
  shown: Product[];
};

/** 상품 필터와 목록을 구성하고 고정 영역 또는 시트로 배치합니다. (Composes shared product filters in a sticky area or bottom sheet.) */
function ProductListingContent({
  onRetry,
  hasMore,
  pending,
  error,
  filterDrawerOpen,
  filterPanel,
  mobileResultCount,
  onFilterDrawerOpenChange,
  onLoadMore,
  onMobileFilterApply,
  onReset,
  platform,
  result,
  shown,
}: ProductListingContentProps) {
  return (
    <>
      {pending && <Typography role="status">상품을 불러오고 있습니다.</Typography>}
      {error && (
        <>
          <Typography role="alert">{error}</Typography>
          {onRetry && <Button onClick={onRetry}>다시 시도</Button>}
        </>
      )}
      <Grid
        gridTemplateColumns="clamp(252px, 22%, 337px) minmax(0, 1fr)"
        gap="clamp(20px, 3.2%, 48px)"
        _mobile={{
          display: 'block',
        }}
      >
        {platform === 'web' && (
          <Box
            position="sticky"
            top="calc(var(--layout-site-header-height) + var(--content-layout-header-height))"
            alignSelf="start"
            maxH="calc(100dvh - var(--layout-site-header-height) - var(--content-layout-header-height))"
            overflowX="hidden"
            overflowY="auto"
            scrollbar="hidden"
          >
            {filterPanel}
          </Box>
        )}
        <ProductListingResults
          hasMore={hasMore ?? shown.length < result.length}
          pending={pending}
          error={error}
          onLoadMore={onLoadMore}
          onReset={onReset}
          platform={platform}
          shown={shown}
        />
      </Grid>
      {platform === 'mobile' && filterDrawerOpen && (
        <BottomSheet
          ariaLabel="상품 필터"
          footer={
            <Button onClick={onMobileFilterApply} variant="primary">
              필터 적용하기 ({mobileResultCount})
            </Button>
          }
          onClose={() => onFilterDrawerOpenChange(false)}
          title="필터"
        >
          {filterPanel}
        </BottomSheet>
      )}
    </>
  );
}

type ProductListTitleProps = {
  platform: Platform;
  resultCount: number;
  searchQuery: string;
  title: string;
};

/** 상품 목록 제목과 검색 결과 건수를 표시합니다. (Displays the product listing title and result count.) */
function ProductListTitle({ platform, resultCount, searchQuery, title }: ProductListTitleProps) {
  return (
    <HStack gap={platform === 'mobile' ? '10px' : '12px'} alignItems={'flex-end'}>
      <Typography web="heading7" mo="body1" weight="black">
        {searchQuery ? `“${searchQuery}”에 대한 검색결과` : title}
      </Typography>
      <Typography variant="body5">({resultCount})</Typography>
    </HStack>
  );
}

type SearchListingLayoutProps = {
  children: ReactNode;
  filterAction: ReactNode;
  onSearch: (query: string) => void;
  onClose: () => void;
  platform: Platform;
  query: string;
  resultCount: number;
  hasActiveFilters: boolean;
};

/** 검색 안내와 빈 상태를 구성하고 상품 목록·필터를 공유합니다. (Composes the search introduction and empty state with shared catalog results and filters.) */
function SearchListingLayout({
  children,
  filterAction,
  onSearch,
  onClose,
  platform,
  query,
  resultCount,
  hasActiveFilters,
}: SearchListingLayoutProps) {
  const [draftQuery, setDraftQuery] = useState(query);
  const hasResultsOrFilters = resultCount > 0 || hasActiveFilters;
  const results = hasResultsOrFilters ? (
    children
  ) : (
    <ContentHeader
      as="section"
      title="검색된 결과가 없습니다."
      titleProps={{ web: 'body3', mo: 'body4', weight: 'regular', tone: 'subtle' }}
      description="검색어를 정확하게 다시 한번 입력해 주세요."
      descriptionProps={{ web: 'body3', mo: 'body4', weight: 'regular', tone: 'subtle' }}
      alignItems="center"
      justifyContent="center"
      textAlign="center"
      minH="470px"
      gap="0"
      _mobile={{ minH: 'auto', py: '96px' }}
    />
  );

  if (platform === 'mobile') {
    return (
      <Stack as="main" pos="fixed" inset="0" zIndex="80" bg="white.0" gap="0" overflow="hidden">
        <Box as="header" flexShrink="0" bg="white.0">
          <SearchHeader onClose={onClose} />
          <Stack px="4" pt="8" pb="4" gap="8">
            <SearchField
              label="검색어"
              placeholder="검색어를 입력해주세요"
              value={draftQuery}
              onValueChange={setDraftQuery}
              onSearch={() => draftQuery.trim() && onSearch(draftQuery.trim())}
            />
            <ContentHeader
              orientation="horizontal"
              minW="0"
              gap="3"
              titleAs="h1"
              title={
                <>
                  <Typography as="span" className={css({ flexShrink: '0' })}>
                    “
                  </Typography>
                  <Typography
                    as="span"
                    className={css({ minW: '0', overflow: 'hidden', textOverflow: 'ellipsis' })}
                  >
                    {query}
                  </Typography>
                  <Typography
                    as="span"
                    className={css({ flexShrink: '0' })}
                  >{`”에 대한 ${resultCount}개의 검색결과`}</Typography>
                </>
              }
              titleProps={{
                variant: 'body3',
                weight: 'medium',
                className: css({ display: 'flex', minW: '0', whiteSpace: 'nowrap' }),
              }}
              action={hasResultsOrFilters ? <Box flexShrink="0">{filterAction}</Box> : undefined}
            />
          </Stack>
        </Box>
        <Box flex="1" minH="0" overflowY="auto" overscrollBehavior="contain" pb="12">
          {results}
        </Box>
      </Stack>
    );
  }

  return (
    <Box as="main">
      <Stack
        w="min(calc(100% - var(--layout-web-content-inline-space)), var(--layout-web-content-max-width))"
        mx="auto"
        pt="8"
        pb="16"
        gap="10"
        _mobile={{ w: '100%', px: '0', pt: '8', pb: '12', gap: '4' }}
      >
        <Stack as="header" gap="6" _mobile={{ px: '4', gap: '8' }}>
          <ContentHeader
            titleAs="h1"
            title={`“${query}”에 대한 ${resultCount}개의 검색결과`}
            titleProps={{ web: 'heading6', mo: 'body3', weight: 'medium' }}
            gap="6"
            _mobile={{ gap: '4' }}
          />
        </Stack>
        {results}
      </Stack>
    </Box>
  );
}

type ProductFilterTriggerProps = {
  onClick: () => void;
  label?: string;
  appearance?: 'catalog' | 'search';
};

/** 목록과 검색 시안에 맞는 버튼으로 모바일 필터를 엽니다. (Opens mobile filters with the catalog or search presentation.) */
function ProductFilterTrigger({
  onClick,
  label = '필터',
  appearance = 'catalog',
}: ProductFilterTriggerProps) {
  const isSearch = appearance === 'search';

  return (
    <Button
      aria-haspopup="dialog"
      icon={<Icon name="filter" size={isSearch ? 20 : undefined} />}
      onClick={onClick}
      variant="filterTrigger"
      size={isSearch ? 'regular' : 'compact'}
    >
      <Typography variant={isSearch ? 'cta1' : 'body4'}>{label}</Typography>
    </Button>
  );
}

const tabs = css({
  flex: '1',
  '& > [role="group"]': { h: '36px', mb: '0', gap: '5' },
  '& [data-filter-tabs-variant="plain"]': { px: '0', flexShrink: '0' },
});

const categories = [
  { label: '전체보기', activity: '' },
  { label: '로드러닝', activity: 'road-running' },
  { label: '트레일 러닝', activity: 'trail-running' },
  { label: '라이프스타일', activity: 'lifestyle' },
  { label: '하이킹', activity: 'hiking' },
  { label: '워킹', activity: 'walking' },
  { label: '리커버리', activity: 'recovery' },
];

type ProductActivityTabsProps = {
  activity: string;
  onChange: (activity: string) => void;
};

function ProductActivityTabs({ activity, onChange }: ProductActivityTabsProps) {
  return (
    <FilterTabs
      className={tabs}
      ariaLabel="상품 카테고리"
      onValueChange={onChange}
      options={categories.map((category) => ({ label: category.label, value: category.activity }))}
      value={activity}
      variant="plain"
    />
  );
}

type ProductActivityNavigationProps = {
  activity: string;
  onActivityChange: (activity: string) => void;
  onOpenFilters: () => void;
};

/** Keep the activity rail and filter action together below the mobile GNB. */
function ProductActivityNavigation({
  activity,
  onActivityChange,
  onOpenFilters,
}: ProductActivityNavigationProps) {
  const { markerRef, pinned } = useScrollPin();

  return (
    <Box h="9">
      <Box ref={markerRef} h="1px" mb="-1px" scrollMarginTop="var(--layout-site-header-height)" />
      <HStack
        as="nav"
        aria-label="상품 목록 탐색"
        pos={pinned ? 'fixed' : 'relative'}
        top={pinned ? 'var(--layout-site-header-height)' : undefined}
        insetInline={pinned ? '0' : undefined}
        zIndex="10"
        h="9"
        px="4"
        gap={pinned ? '3' : '0'}
        bg="var(--hoka-white)"
        borderBottom={pinned ? '1px solid token(colors.black.20)' : undefined}
      >
        <ProductActivityTabs activity={activity} onChange={onActivityChange} />
        {pinned && (
          <Button
            variant="icon"
            aria-label="상품 필터 열기"
            aria-haspopup="dialog"
            size={36}
            onClick={onOpenFilters}
          >
            <Icon name="filter" />
          </Button>
        )}
      </HStack>
    </Box>
  );
}

const catalogLayout = css({
  w: 'min(calc(100% - var(--layout-web-content-inline-space)), var(--layout-web-content-max-width))',
  maxW: 'var(--layout-web-content-max-width)',
  mx: 'auto',
  pb: '16',
  gap: '5',
  _mobile: {
    w: '100%',
    gap: '0',
    px: '0',
    pt: '7',
    pb: '24',
    '& > div:first-child': { px: '4', pb: '6' },
  },
});

type ProductListingLayoutProps = {
  onRetry?: () => void;
  pending?: boolean;
  error?: string;
  resultCount?: number;
  hasMore?: boolean;
  breadcrumbItems: BreadcrumbItem[];
  activity: string;
  filterDrawerOpen: boolean;
  filterPanel: ReactNode;
  onFilterChange: (key: string, value: string) => void;
  onFilterDrawerOpenChange: (open: boolean) => void;
  onLoadMore: () => void;
  onMobileFilterApply: () => void;
  onReset: () => void;
  onSortChange: (sort: string) => void;
  onSearch: (query: string) => void;
  onCloseSearch: () => void;
  hasActiveFilters: boolean;
  isSearchPage: boolean;
  platform: Platform;
  productListingTitle: string;
  mobileResultCount: number;
  result: Product[];
  searchQuery: string;
  shown: Product[];
  sort: string;
  sortPlaceholder?: string;
};

/** 목록과 검색 결과에 공통 상품·필터 영역을 배치합니다. (Arranges shared product results and filters for catalog and search pages.) */
function ProductListingLayout({
  onRetry,
  resultCount,
  hasMore,
  pending,
  error,
  breadcrumbItems,
  activity,
  filterDrawerOpen,
  filterPanel,
  onFilterChange,
  onFilterDrawerOpenChange,
  onLoadMore,
  onMobileFilterApply,
  onReset,
  onSortChange,
  onSearch,
  onCloseSearch,
  hasActiveFilters,
  isSearchPage,
  platform,
  productListingTitle,
  mobileResultCount,
  result,
  searchQuery,
  shown,
  sort,
  sortPlaceholder,
}: ProductListingLayoutProps) {
  const normalizedSearchQuery = searchQuery.trim();

  const content = (
    <ProductListingContent
      onRetry={onRetry}
      hasMore={hasMore}
      pending={pending}
      error={error}
      filterDrawerOpen={filterDrawerOpen}
      filterPanel={filterPanel}
      mobileResultCount={mobileResultCount}
      onFilterDrawerOpenChange={onFilterDrawerOpenChange}
      onLoadMore={onLoadMore}
      onMobileFilterApply={onMobileFilterApply}
      onReset={onReset}
      platform={platform}
      result={result}
      shown={shown}
    />
  );

  if (isSearchPage) {
    return (
      <SearchListingLayout
        key={normalizedSearchQuery}
        query={normalizedSearchQuery}
        platform={platform}
        resultCount={resultCount ?? result.length}
        onSearch={onSearch}
        onClose={onCloseSearch}
        hasActiveFilters={hasActiveFilters}
        filterAction={<ProductFilterTrigger onClick={() => onFilterDrawerOpenChange(true)} />}
      >
        {content}
      </SearchListingLayout>
    );
  }

  return (
    <ContentLayout
      breadcrumbItems={breadcrumbItems}
      className={catalogLayout}
      headerAction={
        platform === 'mobile' ? (
          <ProductFilterTrigger onClick={() => onFilterDrawerOpenChange(true)} />
        ) : (
          <ProductSortDropdown placeholder={sortPlaceholder} onChange={onSortChange} value={sort} />
        )
      }
      stickyHeader={platform === 'web'}
      title={
        <ProductListTitle
          platform={platform}
          resultCount={resultCount ?? result.length}
          searchQuery={normalizedSearchQuery}
          title={productListingTitle}
        />
      }
    >
      {platform === 'mobile' && (
        <ProductActivityNavigation
          activity={activity}
          onActivityChange={(value) => onFilterChange('activity', value)}
          onOpenFilters={() => onFilterDrawerOpenChange(true)}
        />
      )}
      {content}
    </ContentLayout>
  );
}

type ProductListingPageProps = {
  data?: ProductListingBinding;
  searchQuery?: string;
};

const facetKeys = [
  'activity',
  'collection',
  'cushioning',
  'gender',
  'color',
  'runningType',
  'size',
  'support',
  'width',
] as const;

const sortTokenLabels: Record<string, string> = { new: '신상품순', popular: '베스트순' };

const productsPerLoad = 36;

const emptyFilters = (): FilterValues => ({
  activity: [],
  category: '',
  collection: [],
  cushioning: [],
  gender: [],
  minPrice: productListingPriceRange.min,
  maxPrice: productListingPriceRange.defaultMax,
  selectedColors: [],
  runningType: [],
  size: [],
  stability: [],
  width: [],
});

/** URL 필터와 상품 정렬·목록 화면을 연결합니다 (Coordinates catalog URL filters, local price controls, and listing layout). */
export function ProductListingPage({ searchQuery = '', data }: ProductListingPageProps) {
  const context = useContext(ProductListingContext);
  const binding = data ?? context;
  const { pending: requestPending, error: requestError, run } = useRequestAction();
  const platform = usePlatform();
  const params = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const setParams = (next: URLSearchParams) => {
    const query = next.toString();
    router.push(`${pathname}${query ? `?${query}` : ''}`, { scroll: false });
  };
  const [minPrice, setMinPrice] = useState(productListingPriceRange.min);
  const [maxPrice, setMaxPrice] = useState(productListingPriceRange.defaultMax);
  const [filterDrawerOpen, setFilterDrawerOpen] = useState(false);

  const paramsKey = params.toString();
  const category = params.get('category') ?? '';
  const activeFilters = useMemo<FilterValues>(() => {
    const query = new URLSearchParams(paramsKey);
    const support = query.getAll('support');

    return {
      activity: query.getAll('activity'),
      category: query.get('category') ?? '',
      collection: query.getAll('collection'),
      cushioning: query.getAll('cushioning'),
      gender: query.getAll('gender'),
      minPrice,
      maxPrice,
      selectedColors: query.getAll('color'),
      runningType: query.getAll('runningType'),
      size: query.getAll('size'),
      stability: support.length ? support : query.getAll('stability'),
      width: query.getAll('width'),
    };
  }, [maxPrice, minPrice, paramsKey]);
  const [mobileFilters, setMobileFilters] = useState<FilterValues>(activeFilters);
  const selectedSort = params.get('sort');
  const sort = (selectedSort && sortTokenLabels[selectedSort]) || selectedSort || '베스트순';
  const [mobileSort, setMobileSort] = useState(sort);
  const breadcrumbItems = getBreadcrumbItems({
    gender: activeFilters.gender[0] ?? '',
    category,
    activity: activeFilters.activity[0] ?? '',
    sort: selectedSort ?? '',
  });

  const productListingTitle = getProductListingTitle({
    gender: activeFilters.gender[0] ?? '',
    category,
    activity: activeFilters.activity[0] ?? '',
    sort: selectedSort ?? '',
  });
  const result = useMemo(
    () =>
      binding
        ? [...binding.items]
        : sortProducts(filterProducts(products, { ...activeFilters, searchQuery }), sort),
    [binding, activeFilters, searchQuery, sort],
  );
  const listingKey = JSON.stringify([paramsKey, minPrice, maxPrice, searchQuery]);
  const [visibleProductState, setVisibleProductState] = useState({
    key: listingKey,
    count: productsPerLoad,
  });
  const visibleProductCount =
    visibleProductState.key === listingKey ? visibleProductState.count : productsPerLoad;
  const shown = binding ? result : result.slice(0, visibleProductCount);
  const mobileResultCount = binding
    ? (binding.mobileResultCount ?? binding.totalCount)
    : filterProducts(products, { ...mobileFilters, searchQuery }).length;
  const onQueryChange = binding?.onQueryChange;
  const onPreviewQueryChange = binding?.onPreviewQueryChange;
  useEffect(() => {
    onQueryChange?.({ filters: activeFilters, sort, searchQuery });
  }, [onQueryChange, activeFilters, sort, searchQuery]);
  useEffect(() => {
    if (filterDrawerOpen)
      onPreviewQueryChange?.({ filters: mobileFilters, sort: mobileSort, searchQuery });
  }, [onPreviewQueryChange, filterDrawerOpen, mobileFilters, mobileSort, searchQuery]);

  const updateFacet = (key: string, values: string[]) => {
    const next = new URLSearchParams(params.toString());
    next.delete(key);
    values.forEach((value) => next.append(key, value));
    next.delete('page');
    setParams(next);
  };

  const update = (key: string, value: string) => {
    const next = new URLSearchParams(params.toString());
    if (value) next.set(key, value);
    else next.delete(key);
    next.delete('page');
    setParams(next);
  };

  const reset = () => {
    const next = new URLSearchParams();
    for (const key of ['q', 'sort']) {
      const value = params.get(key);
      if (value) next.set(key, value);
    }
    setParams(next);
    setMinPrice(productListingPriceRange.min);
    setMaxPrice(productListingPriceRange.defaultMax);
    setMobileFilters(emptyFilters());
  };

  const openMobileFilters = (open: boolean) => {
    if (open) {
      setMobileFilters(activeFilters);
      setMobileSort(sort);
    }
    setFilterDrawerOpen(open);
  };

  const applyMobileFilters = () => {
    const next = new URLSearchParams(params.toString());
    facetKeys.forEach((key) => {
      next.delete(key);
      const values =
        key === 'color'
          ? mobileFilters.selectedColors
          : key === 'support'
            ? mobileFilters.stability
            : mobileFilters[key];
      values.forEach((value) => next.append(key, value));
    });
    next.delete('page');
    next.set('sort', mobileSort);
    setParams(next);
    setMinPrice(mobileFilters.minPrice);
    setMaxPrice(mobileFilters.maxPrice);
    setFilterDrawerOpen(false);
  };

  const updateMobileFilter = (key: string, values: string[]) => {
    const normalizedKey =
      key === 'support' ? 'stability' : key === 'color' ? 'selectedColors' : key;
    setMobileFilters((previous) => ({ ...previous, [normalizedKey]: values }));
  };

  const displayedFilters = platform === 'mobile' ? mobileFilters : activeFilters;

  const onLoadMore = binding?.onLoadMore;
  const retry = binding?.onRetry ?? (requestError ? onLoadMore : undefined);
  const loading = binding?.pending || requestPending;
  const loadMore = useCallback(() => {
    if (onLoadMore) {
      if (!loading) void run(onLoadMore);
      return;
    }
    setVisibleProductState((previous) => {
      const count = previous.key === listingKey ? previous.count : productsPerLoad;

      return { key: listingKey, count: Math.min(count + productsPerLoad, result.length) };
    });
  }, [listingKey, result.length, onLoadMore, loading, run]);

  const filterPanel = (
    <ProductListingFilterPanel
      mobileSort={
        platform === 'mobile' ? { value: mobileSort, onValueChange: setMobileSort } : undefined
      }
      activity={displayedFilters.activity}
      collection={displayedFilters.collection}
      cushioning={displayedFilters.cushioning}
      gender={displayedFilters.gender}
      minPrice={displayedFilters.minPrice}
      maxPrice={displayedFilters.maxPrice}
      onFilterChange={platform === 'mobile' ? updateMobileFilter : updateFacet}
      onMinPriceChange={(value) =>
        platform === 'mobile'
          ? setMobileFilters((previous) => ({ ...previous, minPrice: value }))
          : setMinPrice(value)
      }
      onMaxPriceChange={(value) =>
        platform === 'mobile'
          ? setMobileFilters((previous) => ({ ...previous, maxPrice: value }))
          : setMaxPrice(value)
      }
      onReset={reset}
      onSelectedColorsChange={(values) =>
        platform === 'mobile' ? updateMobileFilter('color', values) : updateFacet('color', values)
      }
      runningType={displayedFilters.runningType}
      selectedColors={displayedFilters.selectedColors}
      size={displayedFilters.size}
      stability={displayedFilters.stability}
      width={displayedFilters.width}
    />
  );

  return (
    <ProductListingLayout
      activity={activeFilters.activity[0] ?? ''}
      resultCount={binding?.totalCount}
      hasMore={binding?.hasMore}
      pending={loading}
      error={binding?.error || requestError}
      onRetry={
        retry
          ? () => {
              void run(retry);
            }
          : undefined
      }
      breadcrumbItems={breadcrumbItems}
      filterDrawerOpen={filterDrawerOpen}
      filterPanel={filterPanel}
      onFilterChange={update}
      onFilterDrawerOpenChange={openMobileFilters}
      onMobileFilterApply={applyMobileFilters}
      onLoadMore={loadMore}
      onReset={reset}
      onSortChange={(nextSort) => update('sort', nextSort)}
      onSearch={(query) => router.push(`/search?q=${encodeURIComponent(query)}`)}
      onCloseSearch={() => router.push('/products')}
      isSearchPage={pathname === '/search' || Boolean(searchQuery.trim())}
      hasActiveFilters={
        facetKeys.some((key) => params.has(key)) ||
        minPrice !== productListingPriceRange.min ||
        maxPrice !== productListingPriceRange.defaultMax
      }
      platform={platform}
      productListingTitle={productListingTitle}
      mobileResultCount={mobileResultCount}
      result={result}
      searchQuery={searchQuery}
      shown={shown}
      sort={sort}
      sortPlaceholder={selectedSort ? undefined : '정렬기준'}
    />
  );
}

export {
  Fieldset,
  CatalogFilterSection,
  CatalogFilterGroup,
  ColorFilter,
  FilterPillGroup,
  RangeInput,
  PriceRange,
  Tag,
  CatalogFilterPanel,
  Collapsible,
  Disclosure,
  PromotionCard,
  CatalogResults,
};
