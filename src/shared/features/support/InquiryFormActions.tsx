import { Box, HStack } from 'styled-system/jsx';
import { Button } from '@/shared/components/atoms/Button/Button';

type Props = { onCancel: () => void };

export function InquiryFormActions({ onCancel }: Props) {
  return (
    <HStack
      gap="2"
      justifyContent="center"
      pt="6"
      maxW="368px"
      w="100%"
      mx="auto"
      _mobile={{ pt: '0', maxW: 'none' }}
    >
      <Box flex="1">
        <Button fullWidth size="short" variant="secondary" onClick={onCancel}>
          취소
        </Button>
      </Box>
      <Box flex="1">
        <Button fullWidth size="short" type="submit" variant="primary">
          문의 등록
        </Button>
      </Box>
    </HStack>
  );
}
