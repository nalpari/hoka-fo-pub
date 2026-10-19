import { ModalDialog } from '@/shared/components/molecules/ModalDialog/ModalDialog';
import { Typography } from '@/shared/components/atoms/Typography/Typography';
import { Button } from '@/shared/components/atoms/Button/Button';
import { Stack } from 'styled-system/jsx';
import { RatingStars, type RatingValue } from '@/shared/components/atoms/RatingStars/RatingStars';
import { TextInput } from '@/shared/components/atoms/TextInput/TextInput';
import { FormField } from '@/shared/components/atoms/FormField/FormField';

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
    <ModalDialog
      footer={
        <Button fullWidth size="short" variant="primary" onClick={onSave}>
          저장
        </Button>
      }
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
        <FormField
          htmlFor="review-body"
          error={invalid && !body.trim() ? '리뷰 내용을 입력해 주세요.' : undefined}
        >
          <TextInput
            id="review-body"
            aria-label="리뷰 내용"
            multiline
            placeholder="상품 사용 경험을 입력해 주세요"
            value={body}
            onChange={(event) => onBodyChange(event.target.value)}
          />
        </FormField>
        {invalid ? (
          <Typography variant="body5" tone="error">
            별점과 리뷰 내용을 입력해 주세요.
          </Typography>
        ) : null}
      </Stack>
    </ModalDialog>
  );
}
