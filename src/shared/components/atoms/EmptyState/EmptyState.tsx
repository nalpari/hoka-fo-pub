import type { ComponentPropsWithoutRef, ReactNode } from 'react';
import { css } from 'styled-system/css';
import { Box, Grid, Stack } from 'styled-system/jsx';

type EmptyStateProps = {
  title: string;
  description?: ReactNode;
  action?: ReactNode;
};

type EmptyStateIconProps = ComponentPropsWithoutRef<'div'>;
type EmptyStateTitleProps = ComponentPropsWithoutRef<'h2'>;
type EmptyStateDescriptionProps = ComponentPropsWithoutRef<'p'>;
type EmptyStateActionProps = ComponentPropsWithoutRef<'div'>;

function withClassName(baseClassName: string, className?: string) {
  return [baseClassName, className].filter(Boolean).join(' ');
}

function EmptyStateRoot({ title, description, action }: EmptyStateProps) {
  return (
    <Stack
      as="section"
      aria-label={title}
      minH="240px"
      placeContent="center"
      justifyItems="center"
      gap="10px"
      p="30px"
      bg="#f5f5f5"
      textAlign="center"
    >
      <Grid
        w="32px"
        h="32px"
        placeItems="center"
        border="1px solid #aaa"
        borderRadius="full"
        color="#666"
        aria-hidden="true"
      >
        —
      </Grid>
      <h2 className={css({ m: '4px 0 0', fontSize: '18px' })}>{title}</h2>
      {description ? <p className={css({ m: '0', color: '#666' })}>{description}</p> : null}
      {action ? <Box mt="8px">{action}</Box> : null}
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
      border="1px solid #aaa"
      borderRadius="full"
      color="#666"
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
  return <Box {...props} className={withClassName('empty-state__action', className)} mt="8px" />;
}

export const EmptyState = Object.assign(EmptyStateRoot, {
  Icon: EmptyStateIcon,
  Title: EmptyStateTitle,
  Description: EmptyStateDescription,
  Action: EmptyStateAction,
});
