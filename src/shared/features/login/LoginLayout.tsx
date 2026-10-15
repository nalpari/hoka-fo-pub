import type { ReactNode } from 'react';
import { css } from 'styled-system/css';
import { Box } from 'styled-system/jsx';
import { Typography } from '@/shared/components/atoms/Typography/Typography';

const styles = {
  title: css({ m: '0', mb: '10' }),
};

export function LoginLayout({ children }: { children: ReactNode }) {
  return (
    <Box as="main" pt="24" px="5" pb="124px" _mobile={{ pt: '10', px: '4', pb: '8' }}>
      <Box maxW="500px" mx="auto">
        <Typography as="h1" variant="loginTitle" className={styles.title} id="login-title">
          HOKA Korea에
          <br />
          오신것을 환영합니다
        </Typography>
        {children}
      </Box>
    </Box>
  );
}
