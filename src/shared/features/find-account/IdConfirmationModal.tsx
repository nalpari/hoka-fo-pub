import { Box, Stack } from 'styled-system/jsx';
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
  const actions = (
    <>
      <Button variant="secondary" size="short" fullWidth onClick={onPasswordReset}>
        비밀번호 재설정
      </Button>
      <Button variant="primary" size="short" fullWidth onClick={onConfirm}>
        확인
      </Button>
    </>
  );

  return (
    <ModalDialog
      footer={platform === 'web' ? actions : undefined}
      open
      size="md"
      onOpenChange={onOpenChange}
      title={platform === 'mobile' ? 'HOKA Korea 회원 안내' : '아이디 / 비밀번호 찾기'}
      closeLabel="안내 닫기"
      mobilePresentation="fullscreen"
    >
      <Stack gap={{ base: '2', _mobile: '0' }}>
        <Typography as="p" variant="body3">
          {displayName ? (
            <Typography as="span" variant="body3" weight="medium">
              {displayName}
            </Typography>
          ) : null}
          {displayName ? '님 ' : ''}가입하신 아이디입니다
        </Typography>
        <Box mt={{ base: '5', _mobile: '6' }}>
          <Typography as="p" mo="heading5" web="heading7">
            honggildong@kakao.com
          </Typography>
        </Box>
        <Box mt={{ base: '6', _mobile: '52px' }} mb="6">
          <Typography as="p" variant="body4" tone="tertiary">
            비밀번호가 생각나지 않으시는 경우 임시비밀번호를 통해 재설정하실 수 있습니다.
          </Typography>
        </Box>
        {platform === 'mobile' ? <Stack gap="2">{actions}</Stack> : null}
      </Stack>
    </ModalDialog>
  );
}
