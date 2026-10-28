import { Box, Stack } from 'styled-system/jsx';

import { Typography } from '@/components/common/atoms/Typography/Typography';

/** 아이디 조회 결과의 사용자 안내와 재설정 설명을 표시합니다. (Displays the account lookup result and password reset guidance.) */
export function IdConfirmationMessage({ userName }: { userName?: string }) {
  const displayName = userName?.trim();

  return (
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
          honggildong
        </Typography>
      </Box>
      <Box mt={{ base: '6', _mobile: '52px' }} mb="6">
        <Typography as="p" variant="body4" tone="tertiary">
          비밀번호가 생각나지 않으시는 경우 임시비밀번호를 통해 재설정하실 수 있습니다.
        </Typography>
      </Box>
    </Stack>
  );
}
