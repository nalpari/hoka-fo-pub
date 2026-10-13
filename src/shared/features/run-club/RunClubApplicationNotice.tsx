import { css } from 'styled-system/css';
import { Typography } from '@/shared/components/atoms/Typography/Typography';
import { Button } from '@/shared/components/atoms/Button/Button';
import { ModalDialog } from '@/shared/components/molecules/ModalDialog/ModalDialog';

const styles = {
  modalText: css({ m: '0 0 24px' }),
};

type RunClubApplicationNoticeProps = { open: boolean; onOpenChange: (open: boolean) => void };

export function RunClubApplicationNotice({ open, onOpenChange }: RunClubApplicationNoticeProps) {
  return (
    <ModalDialog
      open={open}
      onOpenChange={onOpenChange}
      title="세션 신청 안내"
      closeLabel="세션 신청 안내 닫기"
      size="sm"
    >
      <Typography as="p" variant="body3" className={styles.modalText}>
        신청 기능 준비 중입니다.
      </Typography>
      <Button variant="primary" fullWidth onClick={() => onOpenChange(false)}>
        확인
      </Button>
    </ModalDialog>
  );
}
