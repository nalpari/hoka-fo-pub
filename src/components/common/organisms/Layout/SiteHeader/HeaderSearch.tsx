import { IconButton } from '@/components/common/atoms/IconButton/IconButton';
import { Icon } from '@/components/common/atoms/Icon/Icon';
import { TextInput } from '@/components/common/atoms/TextInput/TextInput';
import { HStack } from 'styled-system/jsx';
import { usePlatform } from '@/context/platform';
import { css } from 'styled-system/css';

export type HeaderSearchProps = {
  onSearch: () => void;
  query?: string;
  onQueryChange?: (query: string) => void;
  open?: boolean;
  error?: string;
};

export function HeaderSearch({
  onSearch,
  query = '',
  onQueryChange,
  open = false,
  error,
}: HeaderSearchProps) {
  const platform = usePlatform();

  if (platform === 'web') {
    return (
      <HStack
        id="header-search-control"
        w="178px"
        h="36px"
        flexShrink="0"
        gap="8px"
        px="12px"
        border="1px solid"
        borderColor={error ? 'red.100' : 'black.100'}
        borderRadius="999px"
        bg="white.0"
        _focusWithin={{ borderWidth: '2px' }}
      >
        <TextInput
          id="header-search-input"
          aria-label="검색"
          aria-invalid={Boolean(error) || undefined}
          aria-describedby={error ? 'site-search-error' : undefined}
          aria-expanded={open}
          aria-controls={open ? 'site-search-panel' : undefined}
          aria-haspopup="dialog"
          form="site-search-form"
          type="search"
          autoComplete="off"
          placeholder="검색하기"
          value={query}
          onChange={(event) => onQueryChange?.(event.target.value)}
          onFocus={onSearch}
          onClick={onSearch}
          onKeyDown={(event) => {
            if (event.key === 'Enter' && !open && !event.nativeEvent.isComposing) {
              event.preventDefault();
              onSearch();
              requestAnimationFrame(() =>
                document.querySelector<HTMLFormElement>('#site-search-form')?.requestSubmit(),
              );
            }
            if (event.key === 'ArrowDown') {
              event.preventDefault();
              onSearch();
              requestAnimationFrame(() =>
                document.querySelector<HTMLElement>('#site-search-panel ul button')?.focus(),
              );
            }
          }}
          className={css({
            '&&': {
              minW: '0',
              minH: '0',
              h: '100%',
              p: '0',
              border: '0',
              borderRadius: '0',
              bg: 'transparent',
              fontSize: '14',
              outline: 'none!',
              '&::-webkit-search-cancel-button': { display: 'none' },
            },
          })}
        />
        <IconButton
          size="20px"
          aria-label="검색 실행"
          type="submit"
          form="site-search-form"
          onClick={onSearch}
        >
          <Icon src="/images/header/search.svg" size="16px" mask />
        </IconButton>
      </HStack>
    );
  }

  return (
    <IconButton size="32px" onClick={onSearch} aria-label="검색">
      <Icon src="/images/header/search.svg" size="19px" mask />
    </IconButton>
  );
}
