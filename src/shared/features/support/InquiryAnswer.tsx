import { Box, HStack } from 'styled-system/jsx';
import { Typography } from '@/shared/components/atoms/Typography/Typography';

export function InquiryAnswer() {
  return (
    <HStack gap={{ base: '4', _mobile: '3' }} mt="4" alignItems="flex-start">
      <Typography web="heading7" mo="body2">
        A
      </Typography>
      <Box flex="1" minW="0" p="4" bg="black.10">
        <Typography as="p" variant="body4">
          문의 내용 노출 영역 문의 내용 노출 영역 문의 내용 노출 영역
        </Typography>
      </Box>
    </HStack>
  );
}
