import type { ReactNode } from 'react';
import { css } from 'styled-system/css';
import { HStack, VStack } from 'styled-system/jsx';
import { ButtonLink } from '@/shared/components/atoms/Button/Button';
import { Typography } from '@/shared/components/atoms/Typography/Typography';

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
    left: 'var(--layout-mobile-inline-gutter)',
    w: 'min(calc(100% - var(--layout-mobile-content-inline-space)), 343px)',
    transform: 'none',
  },
});

const title = css({ m: '0' });

const description = css({
  m: '0',
  w: '377px',
});

export function HeroCopy({ content, actions }: HeroCopyProps) {
  return (
    <VStack alignItems="flex-start" className={copy} gap={{ base: '36px', _mobile: '24px' }}>
      <VStack alignItems="flex-start" gap={{ base: '36px', _mobile: '24px' }}>
        <Typography as="h1" className={title} tone="inverse" variant="display">
          {content.title}
        </Typography>
        <Typography as="div" className={description} tone="inverse" variant="body">
          {content.description}
        </Typography>
      </VStack>
      <HStack alignItems="flex-start" gap={{ base: '8px', _mobile: '8px' }}>
        {actions.map((action) => (
          <ButtonLink
            key={`${action.to}-${action.label}`}
            variant="secondary"
            to={action.to}
          >
            {action.label}
          </ButtonLink>
        ))}
      </HStack>
    </VStack>
  );
}
