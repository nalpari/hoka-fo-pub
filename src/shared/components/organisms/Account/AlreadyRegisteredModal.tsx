import { css } from 'styled-system/css';
import { Stack } from 'styled-system/jsx';
import { Typography } from '@/shared/components/atoms/Typography/Typography';
import { SingleActionDialog } from '@/shared/components/molecules/SingleActionDialog/SingleActionDialog';

const styles = {
  body: css({ gap: '4' }),
  heading: css({ m: '0' }),
  description: css({ m: '0' }),
};

export type AlreadyRegisteredModalProps = {
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
};

export function AlreadyRegisteredModal({ onOpenChange, onConfirm }: AlreadyRegisteredModalProps) {
  return (
    <SingleActionDialog
      open
      onOpenChange={onOpenChange}
      title="회원가입"
      closeLabel="이미 가입한 회원 안내 닫기"
      size="md"
      onConfirm={onConfirm}
      confirmButtonProps={{ size: 'short', fullWidth: true }}
    >
      <Stack gap="4" className={styles.body}>
        <Typography as="h2" variant="body2" className={styles.heading}>
          이미 가입된 회원이 있습니다
        </Typography>
        <Typography as="p" variant="body4" className={styles.description}>
          입력하신 정보로 이미 가입한 회원이 있습니다. 가입정보가 기억나지 않으시면 ID/비밀번호 찾기
          메뉴를 사용하거나 고객센터로 문의해주세요.
        </Typography>
      </Stack>
    </SingleActionDialog>
  );
}
