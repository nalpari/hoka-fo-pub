import { Typography } from '@/shared/components/atoms/Typography/Typography';
import { css } from 'styled-system/css';
import { SearchKeywordButton } from './SearchKeywordButton';

const recommended = css({
  '& ol': { counterReset: 'item' },
  '& li': { justifyContent: 'flex-start', gap: '7px' },
  '& li::before': { counterIncrement: 'item', content: "counter(item) '.'" },
  '& button': {
    border: '0',
    p: '0',
    bg: 'transparent',
    color: 'var(--color-text-subtle)',
    fontSize: 'inherit',
    textAlign: 'left',
    _hover: { textDecoration: 'underline' },
  },
});

type RecommendedSearchesProps = { queries: readonly string[]; onSearch: (query: string) => void };

export function RecommendedSearches({ queries, onSearch }: RecommendedSearchesProps) {
  return (
    <section className={recommended} aria-labelledby="recommended-search-title">
      <Typography as="h3" variant="body4" weight="bold" id="recommended-search-title">
        추천 검색어
      </Typography>
      <ol>
        {queries.map((suggestion) => (
          <li key={suggestion}>
            <SearchKeywordButton query={suggestion} onSearch={onSearch} />
          </li>
        ))}
      </ol>
    </section>
  );
}
