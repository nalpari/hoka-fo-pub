import type { ComponentPropsWithoutRef, ReactNode } from 'react';
import { css } from 'styled-system/css';
import { Box, Grid, Stack, VStack } from 'styled-system/jsx';

type EmptyStateProps = {
  title: string;
  description?: ReactNode;
  action?: ReactNode;
  variant?: 'standard' | 'minimal';
};

type EmptyStateIconProps = ComponentPropsWithoutRef<'div'>;

type EmptyStateTitleProps = ComponentPropsWithoutRef<'h2'>;

type EmptyStateDescriptionProps = ComponentPropsWithoutRef<'p'>;

type EmptyStateActionProps = ComponentPropsWithoutRef<'div'>;

function withClassName(baseClassName: string, className?: string) {
  return [baseClassName, className].filter(Boolean).join(' ');
}

function EmptyStateRoot({ title, description, action, variant = 'standard' }: EmptyStateProps) {
  if (variant === 'minimal') {
    return (
      <Box as="section" aria-label={title} minH="180px" pt="42px" textAlign="center">
        <h2
          className={css({
            m: '0',
            color: 'var(--color-black-100)',
            fontSize: 'inherit',
            fontWeight: 'inherit',
          })}
        >
          {title}
        </h2>
        {description ? (
          <Box mt="2" mx="0" mb="0">
            <p className={css({ color: 'var(--color-text-muted)' })}>{description}</p>
          </Box>
        ) : null}
        {action ? <Box mt="2">{action}</Box> : null}
      </Box>
    );
  }

  return (
    <Stack
      as="section"
      aria-label={title}
      minH="240px"
      placeContent="center"
      justifyItems="center"
      gap="2.5"
      p="30px"
      bg="var(--color-black-10)"
      textAlign="center"
    >
      <Grid
        w="32px"
        h="32px"
        placeItems="center"
        border="1px solid var(--color-black-40)"
        borderRadius="full"
        color="var(--color-black-50)"
        aria-hidden="true"
      >
        —
      </Grid>
      <VStack gap="1" maxW="320px" mt="1" mx="auto" textAlign="center">
        <h2 className={css({ m: '0', fontSize: '16' /* 기존 18px */ })}>{title}</h2>
        {description ? (
          <p className={css({ m: '0', color: 'var(--color-text-muted)' })}>{description}</p>
        ) : null}
        {action ? <Box mt="2">{action}</Box> : null}
      </VStack>
    </Stack>
  );
}

export function EmptyStateIcon({ className, ...props }: EmptyStateIconProps) {
  return (
    <Grid
      {...props}
      className={withClassName('empty-state__icon', className)}
      w="32px"
      h="32px"
      placeItems="center"
      border="1px solid var(--color-black-40)"
      borderRadius="full"
      color="var(--color-black-50)"
      aria-hidden="true"
    />
  );
}

export function EmptyStateTitle({ className, ...props }: EmptyStateTitleProps) {
  return <h2 {...props} className={withClassName('empty-state__title', className)} />;
}

export function EmptyStateDescription({ className, ...props }: EmptyStateDescriptionProps) {
  return <p {...props} className={withClassName('empty-state__description', className)} />;
}

export function EmptyStateAction({ className, ...props }: EmptyStateActionProps) {
  return <Box {...props} className={withClassName('empty-state__action', className)} mt="2" />;
}

export const EmptyState = Object.assign(EmptyStateRoot, {
  Icon: EmptyStateIcon,
  Title: EmptyStateTitle,
  Description: EmptyStateDescription,
  Action: EmptyStateAction,
});
