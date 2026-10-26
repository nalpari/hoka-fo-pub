import { FilterTabs } from '@/shared/components/atoms/FilterTabs/FilterTabs';
import { css } from 'styled-system/css';

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

type MobileCategoryTabsProps = {
  activity: string;
  onChange: (activity: string) => void;
};

export function MobileCategoryTabs({ activity, onChange }: MobileCategoryTabsProps) {
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
