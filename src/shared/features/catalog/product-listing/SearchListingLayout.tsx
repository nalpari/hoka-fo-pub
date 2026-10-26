import { useState, type ReactNode } from 'react';
import { Box, Stack } from 'styled-system/jsx';
import { ContentHeader } from '@/shared/components/molecules/ContentHeader/ContentHeader';
import { SearchField } from '@/shared/components/molecules/SearchField/SearchField';
import type { Platform } from '@/shared/lib/device';
import { SearchHeader } from '@/shared/components/organisms/Search/SearchHeader';
import { Typography } from '@/shared/components/atoms/Typography/Typography';
import { css } from 'styled-system/css';

type SearchListingLayoutProps = {
  children: ReactNode;
  filterAction: ReactNode;
  onSearch: (query: string) => void;
  onClose: () => void;
  platform: Platform;
  query: string;
  resultCount: number;
  hasActiveFilters: boolean;
};

/** 검색 안내와 빈 상태를 구성하고 상품 목록·필터를 공유합니다. (Composes the search introduction and empty state with shared catalog results and filters.) */
export function SearchListingLayout({
  children,
  filterAction,
  onSearch,
  onClose,
  platform,
  query,
  resultCount,
  hasActiveFilters,
}: SearchListingLayoutProps) {
  const [draftQuery, setDraftQuery] = useState(query);
  const hasResultsOrFilters = resultCount > 0 || hasActiveFilters;
  const results = hasResultsOrFilters ? (
    children
  ) : (
    <ContentHeader
      as="section"
      title="검색된 결과가 없습니다."
      titleProps={{ web: 'body3', mo: 'body4', weight: 'regular', tone: 'subtle' }}
      description="검색어를 정확하게 다시 한번 입력해 주세요."
      descriptionProps={{ web: 'body3', mo: 'body4', weight: 'regular', tone: 'subtle' }}
      alignItems="center"
      justifyContent="center"
      textAlign="center"
      minH="470px"
      gap="0"
      _mobile={{ minH: 'auto', py: '96px' }}
    />
  );

  if (platform === 'mobile') {
    return (
      <Stack as="main" pos="fixed" inset="0" zIndex="80" bg="white.0" gap="0" overflow="hidden">
        <Box as="header" flexShrink="0" bg="white.0">
          <SearchHeader onClose={onClose} />
          <Stack px="4" pt="8" pb="4" gap="8">
            <SearchField
              label="검색어"
              placeholder="검색어를 입력해주세요"
              value={draftQuery}
              onValueChange={setDraftQuery}
              onSearch={() => draftQuery.trim() && onSearch(draftQuery.trim())}
            />
            <ContentHeader
              orientation="horizontal"
              minW="0"
              gap="3"
              titleAs="h1"
              title={
                <>
                  <Typography as="span" className={css({ flexShrink: '0' })}>
                    “
                  </Typography>
                  <Typography
                    as="span"
                    className={css({ minW: '0', overflow: 'hidden', textOverflow: 'ellipsis' })}
                  >
                    {query}
                  </Typography>
                  <Typography
                    as="span"
                    className={css({ flexShrink: '0' })}
                  >{`”에 대한 ${resultCount}개의 검색결과`}</Typography>
                </>
              }
              titleProps={{
                variant: 'body3',
                weight: 'medium',
                className: css({ display: 'flex', minW: '0', whiteSpace: 'nowrap' }),
              }}
              action={hasResultsOrFilters ? <Box flexShrink="0">{filterAction}</Box> : undefined}
            />
          </Stack>
        </Box>
        <Box flex="1" minH="0" overflowY="auto" overscrollBehavior="contain" pb="12">
          {results}
        </Box>
      </Stack>
    );
  }

  return (
    <Box as="main">
      <Stack
        w="min(calc(100% - var(--layout-web-content-inline-space)), var(--layout-web-content-max-width))"
        mx="auto"
        pt="8"
        pb="16"
        gap="10"
        _mobile={{ w: '100%', px: '0', pt: '8', pb: '12', gap: '4' }}
      >
        <Stack as="header" gap="6" _mobile={{ px: '4', gap: '8' }}>
          <ContentHeader
            titleAs="h1"
            title={`“${query}”에 대한 ${resultCount}개의 검색결과`}
            titleProps={{ web: 'heading6', mo: 'body3', weight: 'medium' }}
            gap="6"
            _mobile={{ gap: '4' }}
          />
        </Stack>
        {results}
      </Stack>
    </Box>
  );
}
