import { IconButton } from '@/shared/components/atoms/IconButton/IconButton';
import { css } from 'styled-system/css';
import { SearchKeywordButton } from './SearchKeywordButton';

const remove = css({
  border: '0',
  bg: 'transparent',
  color: 'var(--color-black-40)',
  fontSize: '16' /* 기존 17px */,
  lineHeight: 'hoka',
});

type RecentSearchItemProps = {
  query: string;
  onSearch: (query: string) => void;
  onRemove: (query: string) => void;
};

export function RecentSearchItem({ query, onSearch, onRemove }: RecentSearchItemProps) {
  return (
    <li>
      <SearchKeywordButton query={query} onSearch={onSearch} />
      <IconButton
        aria-label={`${query} 삭제`}
        className={remove}
        onMouseDown={(event) => event.preventDefault()}
        onClick={() => onRemove(query)}
        size="26px"
      >
        ×
      </IconButton>
    </li>
  );
}
