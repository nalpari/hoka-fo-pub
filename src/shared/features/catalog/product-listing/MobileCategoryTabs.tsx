import { css } from 'styled-system/css';

const categories = [
  { label: '전체보기', activity: '' },
  { label: '로드러닝', activity: 'road-running' },
  { label: '트레일 러닝', activity: 'trail-running' },
  { label: '라이프스타일', activity: 'lifestyle' },
  { label: '하이킹', activity: 'hiking' },
  { label: '워킹', activity: 'walking' },
  { label: '리커버리', activity: 'recovery' },
];

const categoryTabs = css({
  display: 'flex',
  alignItems: 'center',
  gap: '16px',
  h: '46px',
  mb: '16px',
  overflowX: 'auto',
  whiteSpace: 'nowrap',
  scrollbarWidth: 'none',
  '&::-webkit-scrollbar': { display: 'none' },
  '& button': {
    flexShrink: '0',
    h: '100%',
    p: '0',
    border: '0',
    bg: 'transparent',
    color: '#666',
    fontSize: '14px',
    fontWeight: '400',
    cursor: 'pointer',
  },
  '& button[aria-selected="true"]': {
    color: '#111',
    fontWeight: '600',
  },
});

type MobileCategoryTabsProps = {
  activity: string;
  onChange: (activity: string) => void;
};

export function MobileCategoryTabs({ activity, onChange }: MobileCategoryTabsProps) {
  return (
    <nav aria-label="상품 카테고리" className={categoryTabs} role="tablist">
      {categories.map((category) => (
        <button
          aria-selected={activity === category.activity}
          key={category.activity || 'all'}
          onClick={() => onChange(category.activity)}
          role="tab"
          type="button"
        >
          {category.label}
        </button>
      ))}
    </nav>
  );
}
