import { Box, HStack, Stack } from 'styled-system/jsx';
import { Typography } from '@/shared/components/atoms/Typography/Typography';

type Props = { item: { title: string; answered: boolean } };

export function InquiryQuestion({ item }: Props) {
  return (
    <HStack as="span" w="100%" gap={{ base: '4', _mobile: '3' }} alignItems="flex-start">
      <Typography web="heading7" mo="body2">
        Q
      </Typography>
      <Stack as="span" gap="3" flex="1" minW="0">
        <Stack as="span" gap="2" alignItems="flex-start">
          <Box
            as="span"
            px="2"
            py="1.5"
            borderRadius="full"
            border={item.answered ? undefined : '1px solid'}
            borderColor="black.40"
            bg={item.answered ? 'black.20' : undefined}
          >
            <Typography
              variant="body5"

              tone={item.answered ? 'tertiary' : undefined}
            >
              {item.answered ? '답변완료' : '접수완료'}
            </Typography>
          </Box>
          <Typography variant="heading9">{item.title}</Typography>
        </Stack>
        <Typography as="span" variant="body4">
          문의 내용 노출 영역 문의 내용 노출 영역 문의 내용 노출 영역
        </Typography>
      </Stack>
    </HStack>
  );
}
