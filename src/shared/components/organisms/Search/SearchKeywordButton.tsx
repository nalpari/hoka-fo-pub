import { Typography } from '@/shared/components/atoms/Typography/Typography';
import { Button } from '@/shared/components/atoms/Button/Button';
import { css } from 'styled-system/css';

const recentQuery = css({
  border: '0',
  p: '0',
  bg: 'transparent',
  color: 'var(--color-text-subtle)',
  fontSize: 'inherit',
  textAlign: 'left',
  _hover: { textDecoration: 'underline' },
});

type SearchKeywordButtonProps = { query: string; onSearch: (query: string) => void };

export function SearchKeywordButton({ query, onSearch }: SearchKeywordButtonProps) {
  return (
    <Button
      className={recentQuery}
      onMouseDown={(event) => event.preventDefault()}
      onClick={() => onSearch(query)}
    >
      <Typography variant="body4" weight="inherit">
        {query}
      </Typography>
    </Button>
  );
}
