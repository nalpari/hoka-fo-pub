import { FilterTabs } from '@/shared/components/atoms/FilterTabs/FilterTabs';
import { SearchField } from '@/shared/components/molecules/SearchField/SearchField';
import type { FaqCategory } from '@/shared/features/faq/faq.data';
import { Box, Divider, Stack } from 'styled-system/jsx';

type Props = {
  category: FaqCategory;
  query: string;
  categories: FaqCategory[];
  onCategoryChange: (category: FaqCategory) => void;
  onQueryChange: (query: string) => void;
};

export function FaqControls({
  category,
  query,
  categories,
  onCategoryChange,
  onQueryChange,
}: Props) {
  return (
    <Stack gap="0">
      <Box display="flex" justifyContent="center" py="9" _mobile={{ py: '0' }}>
        <Box w="590px" maxW="100%" _mobile={{ w: '100%' }}>
          <SearchField
            label="질문 또는 답변 검색"
            placeholder="검색어를 입력해주세요"
            value={query}
            onValueChange={onQueryChange}
          />
        </Box>
      </Box>
      <Divider
        aria-hidden="true"
        orientation="horizontal"
        h="2px"
        bg="black.100"
        _mobile={{ display: 'none' }}
      />
      <Box as="nav" aria-label="FAQ 카테고리" pt="3" pb="6" _mobile={{ pt: '4' }}>
        <FilterTabs
          ariaLabel="FAQ 카테고리"
          onValueChange={onCategoryChange}
          options={categories.map((item) => ({ label: item, value: item }))}
          value={category}
          variant="line"
        />
      </Box>
    </Stack>
  );
}
