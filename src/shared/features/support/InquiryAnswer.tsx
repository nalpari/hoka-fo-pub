import { Box, HStack } from 'styled-system/jsx';
import { Typography } from '@/shared/components/atoms/Typography/Typography';

export function InquiryAnswer() {
  return (
    <HStack
      gap={{ base: '4', _mobile: '3' }}
      mt="6"
      p="6"
      bg="black.10"
      alignItems="flex-start"
      _mobile={{ p: '4' }}
    >
      <Typography variant="body2">A</Typography>
      <Box flex="1" minW="0">
        <Typography as="p" variant="body4">
          문의 내용 노출 영역 문의 내용 노출 영역 문의 내용 노출 영역
        </Typography>
      </Box>
    </HStack>
  );
}
