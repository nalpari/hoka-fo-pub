import { css } from 'styled-system/css';
import { Stack } from 'styled-system/jsx';
import { Typography } from '@/shared/components/atoms/Typography/Typography';
import { Button } from '@/shared/components/atoms/Button/Button';
import { ModalDialog } from '@/shared/components/molecules/ModalDialog/ModalDialog';

const styles = {
  descriptionSecondLine: css({ display: 'inline', _mobile: { display: 'block' } }),
};

type Props = { onClose: () => void; onConfirm: () => void };

export function AccountLockedContent({ onClose, onConfirm }: Props) {
  return (
    <ModalDialog
      open
      onOpenChange={(open) => !open && onClose()}
      title="아이디 / 비밀번호 찾기"
      closeLabel="안내 닫기"
      size="md"
      footer={
        <Button size="short" variant="primary" fullWidth onClick={onConfirm}>
          확인
        </Button>
      }
    >
      <Stack gap="4">
        <Typography as="h2" variant="body2">
          계정 잠금상태입니다
        </Typography>
        <Typography as="p" variant="body4">
          서비스 이용을 위해 계정잠금을 해제해주세요.&nbsp;
          <Typography as="span" className={styles.descriptionSecondLine}>
            휴대폰 인증화면으로 이동합니다.
          </Typography>
        </Typography>
      </Stack>
    </ModalDialog>
  );
}
