import { usePlatform } from '@/shared/context/platform';
import { Icon } from '@/shared/components/atoms/Icon/Icon';
import { IconButton } from '@/shared/components/atoms/IconButton/IconButton';
import { TextInput } from '@/shared/components/atoms/TextInput/TextInput';
import { Typography } from '@/shared/components/atoms/Typography/Typography';
import { css } from 'styled-system/css';
import { Box, HStack } from 'styled-system/jsx';

type SearchFormProps = {
  query: string;
  onQueryChange: (query: string) => void;
  onSearch: () => void;
  error?: string;
};

export function SearchForm({ query, onQueryChange, onSearch, error = '' }: SearchFormProps) {
  const mobile = usePlatform() === 'mobile';

  return (
    <Box
      as="form"
      id="site-search-form"
      role="search"
      px={mobile ? '16px' : '32px'}
      pt={mobile ? '32px' : '0'}
      onSubmit={(event) => {
        event.preventDefault();
        onSearch();
      }}
    >
      <HStack
        h="56px"
        px="12px"
        gap="8px"
        border="1px solid"
        borderColor={error ? 'red.100' : 'black.100'}
        display={mobile ? 'flex' : 'none'}
      >
        <IconButton type="submit" aria-label="검색 실행" size="16px">
          <Icon src="/images/header/search.svg" size="16px" mask />
        </IconButton>
        <TextInput
          autoFocus
          aria-label="검색어"
          aria-invalid={Boolean(error) || undefined}
          aria-describedby={error ? 'site-search-error' : undefined}
          type="search"
          autoComplete="off"
          value={query}
          onChange={(event) => onQueryChange(event.target.value)}
          placeholder="검색어를 입력해주세요"
          className={css({
            '&&': {
              minH: '0',
              h: '100%',
              border: '0',
              p: '0',
              outline: 'none!',
              fontSize: '14',
              bg: 'transparent',
              '&::-webkit-search-cancel-button': { display: 'none' },
            },
          })}
        />
      </HStack>
      <button type="submit" hidden aria-label="검색 실행" />
      {error ? (
        <Typography
          as="p"
          variant="body5"
          id="site-search-error"
          role="alert"
          className={css({ mt: '8px', color: 'red.100' })}
        >
          {error}
        </Typography>
      ) : null}
    </Box>
  );
}
