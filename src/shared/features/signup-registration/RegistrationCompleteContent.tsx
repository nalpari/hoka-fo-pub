import { Box, Center, Stack } from 'styled-system/jsx';
import { ButtonLink } from '@/shared/components/atoms/Button/Button';
import { Typography } from '@/shared/components/atoms/Typography/Typography';
import { Icon } from '@/shared/components/atoms/Icon/Icon';

export function RegistrationCompleteContent() {
  return (
    <Box as="main" pt="24" px="4" pb="124px">
      <Stack maxW="420px" mx="auto" textAlign="center" gap="8">
        <Typography as="h1" web="heading6" mo="heading4">
          회원가입 완료
        </Typography>
        <Center>
          <Icon src="/images/icon/join-check.svg" size="48px" />
        </Center>
        <Stack gap="4">
          <Typography as="p" variant="body2">
            가입이 성공적으로 이루어졌습니다!
          </Typography>
          <Typography as="p" variant="body4">
            고객님께 알찬 정보, 다양한 이벤트와 혜택을 드리고자
            <br />
            최선을 다하겠습니다
          </Typography>
        </Stack>
        <ButtonLink to="/" variant="primary" size="tall" fullWidth>
          쇼핑하러 가기
        </ButtonLink>
      </Stack>
    </Box>
  );
}
