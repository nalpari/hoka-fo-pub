import { Typography } from '@/shared/components/atoms/Typography/Typography';
import { SearchKeywordButton } from './SearchKeywordButton';
import { Box } from 'styled-system/jsx';
import { css } from 'styled-system/css';

type RecommendedSearchesProps = { queries: readonly string[]; onSearch: (query: string) => void };

export function RecommendedSearches({ queries, onSearch }: RecommendedSearchesProps) {
  return (
    <Box
      as="section"
      css={{
        '& button': {
          border: '0',
          p: '0',
          bg: 'transparent',
          color: 'var(--color-text-subtle)',
          fontSize: 'inherit',
          textAlign: 'left',
          _hover: { textDecoration: 'underline' },
        },
      }}
      aria-labelledby="recommended-search-title"
    >
      <Typography as="h3" variant="body4" weight="bold" id="recommended-search-title">
        추천 검색어
      </Typography>
      <Box as="ol" counterReset="item">
        {queries.map((suggestion) => (
          <li
            key={suggestion}
            className={css({
              justifyContent: 'flex-start',
              gap: '7px',
              _before: { counterIncrement: 'item', content: "counter(item) '.'" },
            })}
          >
            <SearchKeywordButton query={suggestion} onSearch={onSearch} />
          </li>
        ))}
      </Box>
    </Box>
  );
}
