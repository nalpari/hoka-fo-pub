import type { ReactNode } from 'react';
import { css } from 'styled-system/css';
import { Box, HStack, VStack } from 'styled-system/jsx';
import { ButtonLink } from '@/shared/components/atoms/Button/Button';

export type HeroCopyContent = {
  title: string;
  description: ReactNode;
};

export type HeroCopyAction = {
  label: string;
  to: string;
};

export type HeroCopyProps = {
  content: HeroCopyContent;
  actions: readonly HeroCopyAction[];
};

const copy = css({
  position: 'absolute',
  zIndex: '1',
  top: '50%',
  left: '50%',
  w: 'min(calc(100% - var(--layout-web-content-inline-space)), var(--layout-web-content-max-width))',
  transform: 'translate(-50%, -50%)',
  _mobile: {
    top: 'auto',
    bottom: '32.33px',
    left: '16px',
    w: 'min(calc(100% - 32px), 343px)',
    transform: 'none',
  },
});

const title = css({
  m: '0',
  fontSize: 'clamp(44px, 4vw, 80px)',
  fontWeight: '900',
  letterSpacing: '-0.07em',
  lineHeight: '0.9625',
  _mobile: { fontSize: '40px' },
});

const description = css({
  m: '0',
  w: '377px',
  fontFamily: 'var(--font-family-base)',
  fontSize: '24px',
  fontWeight: '400',
  lineHeight: '1.3',
  letterSpacing: '-0.02em',
  color: '#fff',
  _mobile: {
    fontSize: '16px',
    fontWeight: '500',
  },
});

export function HeroCopy({ content, actions }: HeroCopyProps) {
  return (
    <VStack alignItems="flex-start" className={copy} gap={{ base: '36px', _mobile: '24px' }}>
      <VStack alignItems="flex-start" gap={{ base: '36px', _mobile: '24px' }}>
        <h1 className={title}>{content.title}</h1>
        <Box className={description}>{content.description}</Box>
      </VStack>
      <HStack alignItems="flex-start" gap={{ base: '8px', _mobile: '8px' }}>
        {actions.map((action) => (
          <ButtonLink key={`${action.to}-${action.label}`} to={action.to} variant="link">
            {action.label}
          </ButtonLink>
        ))}
      </HStack>
    </VStack>
  );
}
