import { SearchField } from '@/shared/components/molecules/SearchField/SearchField';
import { Box, Flex } from 'styled-system/jsx';

type Props = {
  query: string;
  onQueryChange: (query: string) => void;
};

export function FaqSearch({ query, onQueryChange }: Props) {
  return (
    <Flex justifyContent="center" pt="6" _mobile={{ pt: '0' }}>
      <Box w="590px" maxW="100%" _mobile={{ w: '100%' }}>
        <SearchField
          label="질문 또는 답변 검색"
          placeholder="검색어를 입력해주세요"
          value={query}
          onValueChange={onQueryChange}
        />
      </Box>
    </Flex>
  );
}
