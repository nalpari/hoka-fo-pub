import type { ReactNode } from 'react';

import { Box } from 'styled-system/jsx';

type OrderActionBarProps = {
  children: ReactNode;
  variant?: 'default' | 'mobileOnly';
  as?: 'div' | 'section';
  ariaLabel?: string;
};

/** 액션 영역을 모바일 하단에 고정하고 선택적으로 안전 여백을 확보합니다. (Fixes actions to the mobile viewport with optional safe-area spacing.) */
export function OrderActionBar({
  children,
  variant = 'default',
  as = 'div',
  ariaLabel,
}: OrderActionBarProps) {
  const mobileOnly = variant === 'mobileOnly';

  return (
    <Box
      as={as}
      aria-label={ariaLabel}
      display={mobileOnly ? 'none' : undefined}
      _mobile={mobileOnly ? { display: 'block' } : undefined}
      pos={{ base: 'static', _mobile: 'fixed' }}
      bottom="0"
      left="0"
      right="0"
      zIndex={mobileOnly ? '20' : '2'}
      bg="white"
      borderTop={{
        base: '0',
        _mobile: mobileOnly
          ? '1px solid var(--color-border-default)'
          : '1px solid var(--colors-black-20)',
      }}
      px={{ base: '0', _mobile: '4' }}
      pt={{ base: '0', _mobile: '4' }}
      pb={{ base: '0', _mobile: mobileOnly ? 'max(32px, env(safe-area-inset-bottom))' : '8' }}
    >
      {children}
    </Box>
  );
}
