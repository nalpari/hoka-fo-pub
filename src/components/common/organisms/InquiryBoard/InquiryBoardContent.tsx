import { Grid, Stack } from 'styled-system/jsx';
import { Typography } from '@/components/common/atoms/Typography/Typography';
import type { InquiryBoardEntry } from './InquiryBoard';

export function InquiryBoardContent({
  item,
  variant = 'default',
}: {
  item: InquiryBoardEntry;
  variant?: 'default' | 'product';
}) {
  return item.visibility === 'restricted' ? (
    <Typography as="p" variant="body4" tone={variant === 'product' ? 'subtle' : undefined}>
      비공개글은 작성자 본인만 확인할 수 있습니다.
    </Typography>
  ) : (
    <Stack gap="6">
      <Typography as="div" variant="body4">
        {item.content}
      </Typography>
      {item.answer != null && (
        <Grid
          gap={variant === 'product' ? '3' : '2'}
          borderTop={variant === 'product' ? '1px solid token(colors.black.20)' : undefined}
          pt={variant === 'product' ? '6' : undefined}
        >
          <Typography variant="body4" weight="bold">
            답변
          </Typography>
          <Typography as="div" variant="body4" tone={variant === 'product' ? 'subtle' : undefined}>
            {item.answer}
          </Typography>
        </Grid>
      )}
    </Stack>
  );
}
