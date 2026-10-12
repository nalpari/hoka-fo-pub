import { Select } from '@/shared/components/atoms/Select/Select';
import { css } from 'styled-system/css';

const categoryStyle = css({
  borderRight: '1px solid var(--color-black-20)',
  '& select': {
    w: '100%',
    h: '11',
    border: '0',
    bg: 'var(--color-white-000)',
    color: 'var(--color-text-primary)',
    px: '2',
    fontSize: '14' /* 기존 13px */,
    fontWeight: 'var(--font-weights-semibold)',
  },
});

const srOnly = css({
  position: 'absolute',
  w: '1px',
  h: '1px',
  overflow: 'hidden',
  clip: 'rect(0, 0, 0, 0)',
  whiteSpace: 'nowrap',
});

type SearchCategorySelectProps = { value: string; onChange: (value: string) => void };

export function SearchCategorySelect({ value, onChange }: SearchCategorySelectProps) {
  return (
    <label className={categoryStyle}>
      <span className={srOnly}>검색 범위</span>
      <Select onChange={(event) => onChange(event.target.value)} value={value}>
        <option>전체</option>
        <option>상품</option>
        <option>컬렉션</option>
        <option>이벤트</option>
      </Select>
    </label>
  );
}
