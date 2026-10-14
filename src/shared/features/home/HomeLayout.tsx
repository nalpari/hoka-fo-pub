import type { ReactNode } from 'react';
import { css } from 'styled-system/css';
import { VStack } from 'styled-system/jsx';
import type { Platform } from '@/shared/lib/device';

const home = css({
  overflow: 'hidden',
  color: 'var(--color-text-primary)',
  bg: 'var(--color-surface-default)',
  fontFamily: 'var(--font-family-base)',
  pb: '24',
  _mobile: {
    pb: '18',
  },
});

export function HomeLayout({ platform, children }: { platform: Platform; children: ReactNode }) {
  return (
    <main className={`${home} home-page-${platform}`}>
      <VStack alignItems="flex-start" gap={{ base: '112px', _mobile: '72px' }}>
        {children}
      </VStack>
    </main>
  );
}
