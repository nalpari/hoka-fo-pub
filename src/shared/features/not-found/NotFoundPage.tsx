import { faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';
import { css } from 'styled-system/css';
import { Box, Stack } from 'styled-system/jsx';
import { ButtonLink } from '@/shared/components/atoms/Button/Button';
import { Icon } from '@/shared/components/atoms/Icon/Icon';
import { Typography } from '@/shared/components/atoms/Typography/Typography';

/** Fallback page rendered for paths that are not registered in the app router. */
export function NotFoundPage() {
  return (
    <Stack
      as="main"
      gap="8"
      alignItems="center"
      pt="100px"
      pb="32"
      px="4"
      textAlign="center"
      color="black.100"
      _mobile={{ minH: 'calc(100svh - var(--layout-site-header-height))' }}
    >
      <Icon fontAwesomeIcon={faTriangleExclamation} size={48} color="black" />
      <Box>
        <Typography as="h1" variant="bodyKr2" weight="semibold">
          요청하신 페이지를 찾을 수 없습니다.
        </Typography>
        <Typography as="p" variant="bodyKr4" className={css({ mt: '3' })}>
          존재하지 않거나, 사용할 수 없는 페이지입니다.
          <br />
          주소가 정확한지 다시 확인해 주세요.
        </Typography>
      </Box>
      <Box w="180px" _mobile={{ w: '100%' }}>
        <ButtonLink href="/" variant="primary" size="tall" fullWidth>
          홈으로
        </ButtonLink>
      </Box>
    </Stack>
  );
}
