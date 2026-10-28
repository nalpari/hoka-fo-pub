import { SingleActionDialog } from '@/components/common/molecules/SingleActionDialog/SingleActionDialog';
import { Typography } from '@/components/common/atoms/Typography/Typography';
import { Stack } from 'styled-system/jsx';
import { RatingStars, type RatingValue } from '@/components/common/atoms/RatingStars/RatingStars';

import { FormField } from '@/components/common/atoms/FormField/FormField';
import { TextareaField } from '@/components/common/molecules/FormFields/TextareaField';

type Props = {
  open: boolean;
  title: string;
  rating: RatingValue;
  body: string;
  invalid: boolean;
  onOpenChange: (open: boolean) => void;
  onRatingChange: (value: RatingValue) => void;
  onBodyChange: (value: string) => void;
  onSave: () => void;
};

export function MyPageReviewDialog({
  open,
  title,
  rating,
  body,
  invalid,
  onOpenChange,
  onRatingChange,
  onBodyChange,
  onSave,
}: Props) {
  return (
    <SingleActionDialog
      confirmLabel="저장"
      onConfirm={onSave}
      closeLabel="리뷰 작성창 닫기"
      onOpenChange={onOpenChange}
      open={open}
      size="sm"
      title={title}
    >
      <Stack gap="5">
        <Typography as="p" variant="body3">
          클리프톤 9은(는) 어떠셨나요?
        </Typography>
        <FormField
          htmlFor="review-rating"
          error={invalid && !rating ? '별점을 선택해 주세요.' : undefined}
        >
          <RatingStars ariaLabel="상품 만족도" value={rating} onValueChange={onRatingChange} />
        </FormField>
        <TextareaField
          id="review-body"
          error={invalid && !body.trim() ? '리뷰 내용을 입력해 주세요.' : undefined}
          inputProps={{
            'aria-label': '리뷰 내용',
            multiline: true,
            placeholder: '상품 사용 경험을 입력해 주세요',
            value: body,
            onChange: (event) => onBodyChange(event.target.value),
          }}
        />
        {invalid ? (
          <Typography variant="body5" tone="error">
            별점과 리뷰 내용을 입력해 주세요.
          </Typography>
        ) : null}
      </Stack>
    </SingleActionDialog>
  );
}
