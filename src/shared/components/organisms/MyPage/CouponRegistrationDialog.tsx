import { Typography } from '@/shared/components/atoms/Typography/Typography';
import { SingleActionDialog } from '@/shared/components/molecules/SingleActionDialog/SingleActionDialog';

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function CouponRegistrationDialog({ open, onOpenChange }: Props) {
  return (
    <SingleActionDialog
      closeLabel="쿠폰 등록 결과 닫기"
      open={open}
      onOpenChange={onOpenChange}
      size="sm"
      title="쿠폰등록"
      onConfirm={() => onOpenChange(false)}
    >
      <Typography as="p" variant="body3">
        쿠폰이 등록되었습니다.
      </Typography>
    </SingleActionDialog>
  );
}
