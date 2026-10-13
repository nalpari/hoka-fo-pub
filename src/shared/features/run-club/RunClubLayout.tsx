import type { ReactNode } from 'react';
import { css } from 'styled-system/css';
import { VStack, Stack } from 'styled-system/jsx';
import { RunClubHistoryLink } from './RunClubHistoryLink';

const styles = {
  page: css({
    w: 'min(calc(100% - 110px), 1532px)',
    mx: 'auto',
    pt: '88px',
    pb: '96px',
    _mobile: { w: '100%', px: 'var(--layout-mobile-inline-gutter)', pt: '40px', pb: '56px' },
  }),
};

type RunClubLayoutProps = { header: ReactNode; children: ReactNode };

export function RunClubLayout({ header, children }: RunClubLayoutProps) {
  return (
    <VStack as="main" gap="4" className={styles.page}>
      {header}
      <Stack gap="8">
        <RunClubHistoryLink />
        {children}
      </Stack>
    </VStack>
  );
}
