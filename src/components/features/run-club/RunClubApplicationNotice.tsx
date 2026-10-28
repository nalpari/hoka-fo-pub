import { css } from 'styled-system/css';
import { Typography } from '@/components/common/atoms/Typography/Typography';
import { SingleActionDialog } from '@/components/common/molecules/SingleActionDialog/SingleActionDialog';

const styles = {
  modalText: css({ m: '0 0 24px' }),
};

type RunClubApplicationNoticeProps = { open: boolean; onOpenChange: (open: boolean) => void };

export function RunClubApplicationNotice({ open, onOpenChange }: RunClubApplicationNoticeProps) {
  return (
    <SingleActionDialog
      onConfirm={() => onOpenChange(false)}
      open={open}
      onOpenChange={onOpenChange}
      title="세션 신청 안내"
      closeLabel="세션 신청 안내 닫기"
      size="sm"
    >
      <Typography as="p" variant="body3" className={styles.modalText}>
        신청 기능 준비 중입니다.
      </Typography>
    </SingleActionDialog>
  );
}
