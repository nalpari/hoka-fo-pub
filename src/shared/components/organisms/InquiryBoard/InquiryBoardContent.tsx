import { Grid } from 'styled-system/jsx';
import { Typography } from '@/shared/components/atoms/Typography/Typography';
import type { InquiryBoardEntry } from './InquiryBoard';

export function InquiryBoardContent({ item }: { item: InquiryBoardEntry }) {
  return item.visibility === 'restricted' ? (
    <Typography as="p" variant="body4">
      비공개글은 작성자 본인만 확인할 수 있습니다.
    </Typography>
  ) : (
    <>
      <Typography as="div" variant="body4">
        {item.content}
      </Typography>
      {item.answer != null && (
        <Grid mt="24px" gap="8px">
          <Typography variant="body4" weight="bold">
            답변
          </Typography>
          <Typography as="div" variant="body4">
            {item.answer}
          </Typography>
        </Grid>
      )}
    </>
  );
}
