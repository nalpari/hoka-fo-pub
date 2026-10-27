import type { ReactNode } from 'react';
import { Box, VStack } from 'styled-system/jsx';
import type { Platform } from '@/shared/lib/device';

/** 홈 콘텐츠의 공통 폭과 모바일 전용 타이포그래피 변수를 제공합니다. (Provides shared home content width and mobile type scale variables.) */
export function HomeLayout({ platform, children }: { platform: Platform; children: ReactNode }) {
  return (
    <Box
      as="main"
      className={`home-page-${platform}`}
      overflow="hidden"
      color="var(--color-text-primary)"
      bg="var(--color-surface-default)"
      fontFamily="var(--font-family-base)"
      pb="24"
      _mobile={{ pb: '72px' }}
      css={{
        _mobile: {
          // Linear 375–768px interpolation; rem bounds preserve user font preferences.
          '--home-title-20': 'clamp(1.25rem, calc(0.65362595rem + 2.54452926vw), 1.875rem)',
          '--home-title-24': 'clamp(1.5rem, calc(0.78435115rem + 3.05343511vw), 2.25rem)',
          '--home-title-30': 'clamp(1.875rem, calc(0.98043893rem + 3.81679389vw), 2.8125rem)',
          '--home-title-40': 'clamp(2.5rem, calc(1.30725191rem + 5.08905852vw), 3.75rem)',
          '--home-body-12': 'clamp(0.75rem, calc(0.57108779rem + 0.76335878vw), 0.9375rem)',
          '--home-body-13': 'clamp(0.8125rem, calc(0.61867844rem + 0.82697201vw), 1.015625rem)',
          '--home-body-14': 'clamp(0.875rem, calc(0.66626908rem + 0.89058524vw), 1.09375rem)',
          '--home-body-16': 'clamp(1rem, calc(0.76145038rem + 1.0178117vw), 1.25rem)',
          '--home-body-30': 'clamp(1.875rem, calc(1.42771947rem + 1.90839695vw), 2.34375rem)',
          '--home-body-40': 'clamp(2.5rem, calc(1.90362595rem + 2.54452926vw), 3.125rem)',
          '--home-pagination-dot': 'clamp(0.375rem, calc(0.19608779rem + 0.76335878vw), 0.5625rem)',
          '--home-pagination-active': 'clamp(2rem, calc(1.04580153rem + 4.07124682vw), 3rem)',
          '--home-pagination-gap': 'clamp(0.5rem, calc(0.26145038rem + 1.0178117vw), 0.75rem)',
        },
      }}
    >
      <VStack alignItems="flex-start" gap={{ base: '112px', _mobile: '72px' }}>
        {children}
      </VStack>
    </Box>
  );
}
