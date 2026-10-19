import { Button } from '@/shared/components/atoms/Button/Button';
import { TextInput } from '@/shared/components/atoms/TextInput/TextInput';
import { SearchCategorySelect } from './SearchCategorySelect';
import { css } from 'styled-system/css';

const form = css({
  display: 'grid',
  gridTemplateColumns: '78px minmax(0, 1fr) 66px',
  border: '1px solid var(--color-black-20)',
});

const submit = css({
  border: '0',
  bg: 'var(--color-black-100)',
  color: 'var(--color-text-inverse)',
  fontSize: '14' /* 기존 13px */,
  fontWeight: 'var(--font-weights-bold)',
});

type SearchFormProps = {
  category: string;
  query: string;
  onCategoryChange: (category: string) => void;
  onQueryChange: (query: string) => void;
  onFocusChange: (focused: boolean) => void;
  onSearch: () => void;
};

export function SearchForm({
  category,
  query,
  onCategoryChange,
  onQueryChange,
  onFocusChange,
  onSearch,
}: SearchFormProps) {
  return (
    <form
      className={form}
      onSubmit={(event) => {
        event.preventDefault();
        onSearch();
      }}
    >
      <SearchCategorySelect value={category} onChange={onCategoryChange} />
      <TextInput
        autoFocus
        className={css({
          '&&': {
            w: '100%',
            h: '11',
            minW: '0',
            border: '0',
            bg: 'var(--color-white-000)',
            color: 'var(--color-text-primary)',
            px: '3.5',
            fontSize: '14' /* 기존 13px */,
            _placeholder: { color: 'var(--color-black-40)' },
          },
        })}
        onBlur={() => onFocusChange(false)}
        onChange={(event) => onQueryChange(event.target.value)}
        onFocus={() => onFocusChange(true)}
        placeholder="상품명 혹은 스타일코드 검색"
        type="search"
        value={query}
      />
      <Button className={submit} type="submit" variant="primary">
        검색
      </Button>
    </form>
  );
}
