import { Typography } from '@/components/common/atoms/Typography/Typography';
import { Badge } from '@/components/common/atoms/Badge/Badge';
import { css } from 'styled-system/css';
import { Box, HStack, Stack } from 'styled-system/jsx';

type Props = { item: { title: string; answered: boolean } };

const styles = {
  answeredQuestion: css({ color: 'black.100', _mobile: { color: 'black.50' } }),
  pendingHeader: css({
    display: 'flex',
    flexDirection: { base: 'row', _mobile: 'column' },
    gap: '2',
    alignItems: { base: 'center', _mobile: 'flex-start' },
  }),
  answeredHeader: css({
    display: 'flex',
    flexDirection: 'column',
    gap: { base: '4', _mobile: '2' },
    alignItems: 'flex-start',
  }),
};

/** 문의 상태와 질문 내용을 함께 표시합니다. (Displays an inquiry's status and question.) */
export function InquiryQuestion({ item }: Props) {
  return (
    <HStack
      as="span"
      w="100%"
      gap="3"
      alignItems="flex-start"
      className={item.answered ? styles.answeredQuestion : undefined}
    >
      <Typography variant="body2" weight="medium" tone={item.answered ? 'inherit' : 'primary'}>
        Q
      </Typography>
      <Stack as="span" gap="3" flex="1" minW="0">
        <Box as="span" className={item.answered ? styles.answeredHeader : styles.pendingHeader}>
          <Badge
            shape="round"
            variant={item.answered ? 'filled' : 'line'}
            tone={item.answered ? 'tertiary' : 'primary'}
          >
            {item.answered ? '답변완료' : '접수완료'}
          </Badge>
          <Typography variant="headingKr9" tone="primary">
            {item.title}
          </Typography>
        </Box>
        <Typography as="span" variant="body4" tone="primary">
          문의 내용 노출 영역 문의 내용 노출 영역 문의 내용 노출 영역
        </Typography>
      </Stack>
    </HStack>
  );
}
