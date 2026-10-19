import { Box, Flex, Stack } from 'styled-system/jsx';
import { Button } from '@/shared/components/atoms/Button/Button';
import { Typography } from '@/shared/components/atoms/Typography/Typography';
import { ModalDialog } from '@/shared/components/molecules/ModalDialog/ModalDialog';
import { usePlatform } from '@/shared/context/platform';

type IdConfirmationModalProps = {
  userName?: string;
  onOpenChange: (open: boolean) => void;
  onPasswordReset: () => void;
  onConfirm: () => void;
};

export function IdConfirmationModal({
  userName,
  onOpenChange,
  onPasswordReset,
  onConfirm,
}: IdConfirmationModalProps) {
  const platform = usePlatform();
  const displayName = userName?.trim();

  return (
    <ModalDialog
      footer={
        <Flex w="100%" justifyContent="center" gap="2" _mobile={{ flexDirection: 'column' }}>
          <Button variant="secondary" fullWidth  onClick={onPasswordReset}>
            비밀번호 재설정
          </Button>
          <Button variant="primary" fullWidth  onClick={onConfirm}>
            확인
          </Button>
        </Flex>
      }
      open
      size="md"
      onOpenChange={onOpenChange}
      title={platform === 'mobile' ? 'HOKA Korea 회원 안내' : '아이디 / 비밀번호 찾기'}
      closeLabel="안내 닫기"
      mobilePresentation="fullscreen"
    >
      <Stack gap="2">
        <Typography as="p" variant="body3">
          {displayName ? `${displayName}님 ` : ''}가입하신 아이디입니다
        </Typography>
        <Box mt="5">
          <Typography as="p" variant="headingKr6">
            honggildong@kakao.com
          </Typography>
        </Box>
        <Box my="6">
          <Typography as="p" variant="body4" tone="tertiary">
            비밀번호가 생각나지 않으시는 경우 임시비밀번호를 통해 재설정하실 수 있습니다.
          </Typography>
        </Box>
      </Stack>
    </ModalDialog>
  );
}
