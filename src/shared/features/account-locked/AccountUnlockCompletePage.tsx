import { Box, HStack, Stack } from 'styled-system/jsx';
import { ButtonLink } from '@/shared/components/atoms/Button/Button';
import { Icon } from '@/shared/components/atoms/Icon/Icon';
import { Typography } from '@/shared/components/atoms/Typography/Typography';

export function AccountUnlockCompletePage() {
  return (
    <Box
      as="main"
      minH={{ base: '600px', _mobile: 'calc(100svh - var(--layout-site-header-height))' }}
      pt={{ base: '24', _mobile: '10' }}
      px={{ base: '36', _mobile: '4' }}
      pb={{ base: '124px', _mobile: '8' }}
    >
      <Stack maxW="500px" mx="auto" gap="9">
        <Stack gap="3">
          <HStack as="h1" m="0" gap="2" alignItems="center">
            <Typography as="span" web="heading7" mo="heading5">
              계정 잠금 해제 완료
            </Typography>
            <Icon name="unlock-keyhole" size="18px" />
          </HStack>
          <Box as="p" m="0">
            <Typography as="span" web="bodyKr3" mo="bodyKr3" tone="tertiary">
              계정 잠금 상태가 성공적으로 해제되었습니다.
            </Typography>
            <br />
            <Typography as="span" web="bodyKr3" mo="bodyKr3" tone="tertiary">
              다시 로그인을 진행해 주세요.
            </Typography>
          </Box>
        </Stack>
        <ButtonLink href="/login" variant="primary" fullWidth>
          홈으로
        </ButtonLink>
      </Stack>
    </Box>
  );
}
