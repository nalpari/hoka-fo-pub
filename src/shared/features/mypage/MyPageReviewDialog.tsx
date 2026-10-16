import { ModalDialog } from '@/shared/components/molecules/ModalDialog/ModalDialog';
import { Typography } from '@/shared/components/atoms/Typography/Typography';
import { Button } from '@/shared/components/atoms/Button/Button';
import { Stack } from 'styled-system/jsx';
import { RatingInput, type RatingValue } from '@/shared/components/atoms/RatingInput/RatingInput';
import { TextInput } from '@/shared/components/atoms/TextInput/TextInput';

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
        <RatingInput ariaLabel="상품 만족도" value={rating} onValueChange={onRatingChange} />
        <TextInput
          aria-label="리뷰 내용"
          multiline
          placeholder="상품 사용 경험을 입력해 주세요"
          value={body}
          onChange={(event) => onBodyChange(event.target.value)}
        />
        {invalid ? (
          <Typography variant="body5" tone="error">
            별점과 리뷰 내용을 입력해 주세요.
          </Typography>
        ) : null}
      </Stack>
    </ModalDialog>
  );
}
