import { Typography } from '@/shared/components/atoms/Typography/Typography';
import { css } from 'styled-system/css';

const recentQuery = css({
  border: '0',
  p: '0',
  bg: 'transparent',
  color: 'var(--color-text-subtle)',
  fontSize: 'inherit',
  textAlign: 'left',
  cursor: 'pointer',
  _hover: { textDecoration: 'underline' },
});

type SearchKeywordButtonProps = { query: string; onSearch: (query: string) => void };

export function SearchKeywordButton({ query, onSearch }: SearchKeywordButtonProps) {
  return (
    <button
      type="button"
      className={recentQuery}
      onMouseDown={(event) => event.preventDefault()}
      onClick={() => onSearch(query)}
    >
      <Typography variant="body4" weight="inherit">
        {query}
      </Typography>
    </button>
  );
}
