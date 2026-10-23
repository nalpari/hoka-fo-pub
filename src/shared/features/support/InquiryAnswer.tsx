import { Box, HStack } from 'styled-system/jsx';
import { css } from 'styled-system/css';
import { Typography } from '@/shared/components/atoms/Typography/Typography';

/** 답변 내용을 배경 패널 안에 표시합니다. (Displays the response in a shaded panel.) */
export function InquiryAnswer() {
  return (
    <HStack
      w="100%"
      gap="3"
      mt={{ base: '6', _mobile: '4' }}
      px="30px"
      py={{ base: '6', _mobile: '4' }}
      bg="black.10"
      alignItems="flex-start"
    >
      <Typography variant="body2" weight="medium" tone="primary">
        A
      </Typography>
      <Box
        flex="1"
        minW="0"
        pt="1"
        _mobile={{ pt: '0' }}
        className={css({ display: 'flex', flexDirection: 'column', gap: '3' })}
      >
        <Typography as="p" variant="body4" tone="primary">
          문의 내용 노출 영역 문의 내용 노출 영역 문의 내용 노출 영역
        </Typography>
      </Box>
    </HStack>
  );
}
