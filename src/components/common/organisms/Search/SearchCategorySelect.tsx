import { css } from 'styled-system/css';

import { Select } from '@/components/common/atoms/Select/Select';
import { Typography } from '@/components/common/atoms/Typography/Typography';

const categoryStyle = css({
  borderRight: '1px solid var(--color-black-20)',
});

type SearchCategorySelectProps = { value: string; onChange: (value: string) => void };

export function SearchCategorySelect({ value, onChange }: SearchCategorySelectProps) {
  return (
    <label className={categoryStyle}>
      <Typography as="span" srOnly>
        검색 범위
      </Typography>
      <Select
        onChange={(event) => onChange(event.target.value)}
        value={value}
        className={css({
          '&&': {
            w: '100%',
            h: '11',
            border: '0',
            bg: 'var(--color-white-000)',
            color: 'var(--color-text-primary)',
            px: '2',
            fontSize: '14' /* 기존 13px */,
            fontWeight: 'var(--font-weights-semibold)',
          },
        })}
      >
        <option>전체</option>
        <option>상품</option>
        <option>컬렉션</option>
        <option>이벤트</option>
      </Select>
    </label>
  );
}
