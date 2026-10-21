import type { ReactNode } from 'react';
import { css } from 'styled-system/css';
import { HStack, VStack } from 'styled-system/jsx';
import { contentFrame } from 'styled-system/patterns';
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

const title = css({ m: '0' });

const description = css({
  m: '0',
  w: '377px',
  _mobile: { w: '100%', maxW: '100%', overflowWrap: 'anywhere' },
});

export function HeroCopy({ content, actions }: HeroCopyProps) {
  return (
    <VStack
      alignItems="flex-start"
      position="absolute"
      zIndex="1"
      top="50%"
      left="50%"
      className={contentFrame({
        mobileWidth: 'calc(100% - var(--layout-mobile-content-inline-space))',
      })}
      transform="translate(-50%, -50%)"
      _mobile={{
        top: 'auto',
        bottom: '32.33px',
        left: 'var(--layout-mobile-inline-gutter)',
        transform: 'none',
      }}
      gap={{ base: '36px', _mobile: '24px' }}
    >
      <VStack alignItems="flex-start" maxW="100%" gap={{ base: '36px', _mobile: '24px' }}>
        <Typography as="h1" className={title} tone="inverse" variant="display">
          {content.title}
        </Typography>
        <Typography as="div" className={description} tone="inverse" variant="body">
          {content.description}
        </Typography>
      </VStack>
      <HStack alignItems="flex-start" flexWrap="wrap" maxW="100%" gap="8px">
        {actions.map((action) => (
          <ButtonLink
            size="short"
            key={`${action.to}-${action.label}`}
            variant="secondary"
            href={action.to}
          >
            {action.label}
          </ButtonLink>
        ))}
      </HStack>
    </VStack>
  );
}
