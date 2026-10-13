import { Typography } from '@/shared/components/atoms/Typography/Typography';
import type { ComponentPropsWithoutRef, ReactNode } from 'react';
import { css } from 'styled-system/css';
import { Box, Grid } from 'styled-system/jsx';

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
        <EmptyStateTitle>{title}</EmptyStateTitle>
        {description ? (
          <Box mt="2" mx="0" mb="0">
            <Typography as="p" variant="body3">
              {description}
            </Typography>
          </Box>
        ) : null}
        {action ? <Box mt="2">{action}</Box> : null}
      </Box>
    );
  }

  return (
    <Box
      as="section"
      aria-label={title}
      className={css({
        w: '100%',
        pt: '96px',
        pb: '160px',
        px: '4',
        bg: 'white.0',
        color: 'black.100',
        textAlign: 'center',
      })}
    >
      <EmptyStateTitle>{title}</EmptyStateTitle>
      {description ? (
        <Box mt="2">
          <Typography as="p" variant="body3">
            {description}
          </Typography>
        </Box>
      ) : null}
      {action ? <Box mt="2">{action}</Box> : null}
    </Box>
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
