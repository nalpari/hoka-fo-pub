import type { ComponentPropsWithoutRef, ReactNode } from 'react';

import { Box, Grid, Stack } from 'styled-system/jsx';

import { Typography } from '@/components/common/atoms/Typography/Typography';

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
      <Stack as="section" gap="2" aria-label={title} minH="180px" pt="42px" textAlign="center">
        <EmptyStateTitle>{title}</EmptyStateTitle>
        {description ? (
          <Box mx="0" mb="0">
            <Typography as="p" variant="body3">
              {description}
            </Typography>
          </Box>
        ) : null}
        {action ? <Box>{action}</Box> : null}
      </Stack>
    );
  }

  return (
    <Stack
      gap="2"
      as="section"
      aria-label={title}
      w="100%"
      pt="24"
      pb="40"
      px="4"
      bg="white.0"
      color="black.100"
      textAlign="center"
    >
      <EmptyStateTitle>{title}</EmptyStateTitle>
      {description ? (
        <Box>
          <Typography as="p" variant="body3">
            {description}
          </Typography>
        </Box>
      ) : null}
      {action ? <Box>{action}</Box> : null}
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
      color="var(--color-text-tertiary)"
      aria-hidden="true"
    />
  );
}

export function EmptyStateTitle({ className, children, ...props }: EmptyStateTitleProps) {
  return (
    <Typography
      {...props}
      as="h2"
      variant="heading7"
      className={withClassName('empty-state__title', className)}
    >
      {children}
    </Typography>
  );
}

export function EmptyStateDescription({
  className,
  children,
  ...props
}: EmptyStateDescriptionProps) {
  return (
    <Typography as="p" {...props} className={withClassName('empty-state__description', className)}>
      {children}
    </Typography>
  );
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
