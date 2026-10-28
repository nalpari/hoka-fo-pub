import { Box, Grid, Stack } from 'styled-system/jsx';
import { ContentHeader } from '@/components/common/molecules/ContentHeader/ContentHeader';
import { Typography } from '@/components/common/atoms/Typography/Typography';

const questions = [
  {
    question: 'A/S 기간은 어느 정도 소요될까요?',
    answer:
      '상품 상태와 수선 내용, 부자재 수급에 따라 처리 기간이 달라질 수 있습니다. 예상 일정은 접수 시 A/S 담당자에게 확인해 주세요.',
  },
  {
    question: '무상 또는 유상 수선 여부는 어떻게 확인하나요?',
    answer:
      '구매 정보와 상품 상태를 확인한 후 안내받으실 수 있습니다. 신청 시 구매 내역과 수선이 필요한 부분의 사진을 준비해 주세요. 비용과 수선 가능 여부는 접수 후 판정 결과에 따라 안내됩니다.',
  },
  {
    question: '상품의 수선을 맡기고 싶어요!',
    answer:
      'HOKA A/S 온라인 접수 페이지에서 신청해 주세요. 구매처에 따라 접수 방법이 다를 수 있으므로, 매장이나 다른 판매처에서 구매한 상품은 먼저 구매처에 문의해 주세요.',
  },
];

export function ProductAfterSalesQuestions() {
  return (
    <Grid
      gridTemplateColumns="160px minmax(0, 1fr)"
      gap="8"
      _mobile={{ gridTemplateColumns: '1fr', gap: '6' }}
    >
      <Typography as="h4" variant="heading8">
        궁금하신 점이 있으세요?
      </Typography>
      <Stack gap="8">
        {questions.map(({ question, answer }) => (
          <Box key={question} pb="8" borderBottom="1px solid var(--color-black-20)">
            <ContentHeader
              gap="4"
              titleAs="h5"
              title={<>Q. {question}</>}
              titleProps={{ variant: 'body4', weight: 'bold' }}
              description={<>{answer}</>}
              descriptionProps={{ variant: 'body5' }}
            />
          </Box>
        ))}
      </Stack>
    </Grid>
  );
}
