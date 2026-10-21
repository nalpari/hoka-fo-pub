import { useState, type ReactNode } from 'react';
import { Box, Stack } from 'styled-system/jsx';
import { ContentHeader } from '@/shared/components/molecules/ContentHeader/ContentHeader';
import { SearchField } from '@/shared/components/molecules/SearchField/SearchField';
import type { Platform } from '@/shared/lib/device';
import { SearchHeader } from '@/shared/components/organisms/Search/SearchHeader';

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

/** Search has its own introduction and empty state while sharing catalog results and filters. */
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

  return (
    <Box as="main">
      {platform === 'mobile' && <SearchHeader onClose={onClose} />}
      <Stack
        w="min(calc(100% - var(--layout-web-content-inline-space)), var(--layout-web-content-max-width))"
        mx="auto"
        pt="8"
        pb="16"
        gap="10"
        _mobile={{ w: '100%', px: '4', pt: '8', pb: '12', gap: '6' }}
      >
        <Stack as="header" gap="6">
          {platform === 'mobile' && (
            <SearchField
              label="검색어"
              placeholder="검색어를 입력해주세요"
              value={draftQuery}
              onValueChange={setDraftQuery}
              onSearch={() => draftQuery.trim() && onSearch(draftQuery.trim())}
            />
          )}
          <ContentHeader
            titleAs="h1"
            title={`“${query}”에 대한 ${resultCount}개의 검색결과`}
            titleProps={{ web: 'heading6', mo: 'body3', weight: 'medium' }}
          />
          {platform === 'mobile' && (resultCount > 0 || hasActiveFilters) && (
            <Box>{filterAction}</Box>
          )}
        </Stack>
        {resultCount > 0 || hasActiveFilters ? (
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
        )}
      </Stack>
    </Box>
  );
}
