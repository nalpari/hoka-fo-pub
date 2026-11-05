import type { ComponentProps, ComponentPropsWithoutRef, ReactNode } from 'react';

import { Box, Grid, Stack } from 'styled-system/jsx';

import { Typography, type TypographyProps } from '@/components/common/atoms/Typography';

type EmptyStateProps = {
  title: ReactNode;
  description?: ReactNode;
  action?: ReactNode;
  variant?: 'standard' | 'minimal' | 'plain' | 'page' | 'content';
  className?: string;
  as?: 'div' | 'section';
  role?: ComponentPropsWithoutRef<'div'>['role'];
  layoutProps?: Pick<
    ComponentProps<typeof Box>,
    | 'py'
    | 'pt'
    | 'pb'
    | 'px'
    | 'mt'
    | 'borderBottom'
    | '_mobile'
    | 'display'
    | 'flexDirection'
    | 'alignItems'
    | 'justifyContent'
    | 'minH'
    | 'gap'
  >;
  titleProps?: Pick<
    EmptyStateTitleProps,
    'as' | 'variant' | 'web' | 'mo' | 'weight' | 'tone' | 'className'
  >;
  descriptionProps?: Pick<
    TypographyProps,
    'variant' | 'web' | 'mo' | 'weight' | 'tone' | 'className'
  >;
};

type EmptyStateIconProps = ComponentPropsWithoutRef<'div'>;

type EmptyStateTitleProps = ComponentPropsWithoutRef<'h2'> &
  Pick<TypographyProps, 'variant' | 'web' | 'mo' | 'weight' | 'tone'> & {
    as?: 'h2' | 'p' | 'span';
  };

type EmptyStateDescriptionProps = ComponentPropsWithoutRef<'p'>;

type EmptyStateActionProps = ComponentPropsWithoutRef<'div'>;

function withClassName(baseClassName: string, className?: string) {
  return [baseClassName, className].filter(Boolean).join(' ');
}

function EmptyStateRoot({
  title,
  description,
  action,
  variant = 'standard',
  className,
  titleProps,
  layoutProps,
  role,
  as,
  descriptionProps,
}: EmptyStateProps) {
  const label = typeof title === 'string' ? title : undefined;
  const titleContent = <EmptyStateTitle {...titleProps}>{title}</EmptyStateTitle>;
  const descriptionContent = description ? (
    <Typography as="p" variant="body3" {...descriptionProps}>
      {description}
    </Typography>
  ) : null;
  const actionContent = action ? <Box>{action}</Box> : null;

  if (variant === 'page' || variant === 'content') {
    return (
      <Stack
        as={as ?? 'section'}
        className={className}
        aria-label={label}
        role={role}
        alignItems="center"
        justifyContent="center"
        gap={variant === 'page' && actionContent ? '8' : '4'}
        w="100%"
        minH={variant === 'content' ? '267px' : undefined}
        py={variant === 'page' ? '160px' : '0'}
        px="3"
        textAlign="center"
        color="black.100"
        {...layoutProps}
        _mobile={{
          px: '3',
          ...(variant === 'content' ? { minH: '154px' } : { py: '8' }),
          ...layoutProps?._mobile,
        }}
      >
        <Stack
          gap="4"
          w="100%"
          maxW={variant === 'content' ? '320px' : '520px'}
          _mobile={{ maxW: 'none' }}
        >
          {titleContent}
          {descriptionContent}
        </Stack>
        {actionContent}
      </Stack>
    );
  }

  if (variant === 'plain') {
    return (
      <Box
        as={as ?? 'div'}
        className={className}
        role={role}
        textAlign="center"
        {...layoutProps}
        _mobile={{ px: '3', ...layoutProps?._mobile }}
      >
        {titleContent}
        {descriptionContent}
        {actionContent}
      </Box>
    );
  }

  if (variant === 'minimal') {
    return (
      <Stack
        as={as ?? 'section'}
        className={className}
        gap="2"
        aria-label={label}
        role={role}
        minH="180px"
        pt="42px"
        textAlign="center"
        {...layoutProps}
        _mobile={{ px: '3', ...layoutProps?._mobile }}
      >
        {titleContent}
        {description ? (
          <Box mx="0" mb="0">
            {descriptionContent}
          </Box>
        ) : null}
        {actionContent}
      </Stack>
    );
  }

  return (
    <Stack
      gap="2"
      as={as ?? 'section'}
      className={className}
      aria-label={label}
      role={role}
      w="100%"
      pt="24"
      pb="40"
      px="4"
      bg="white.0"
      color="black.100"
      textAlign="center"
      {...layoutProps}
      _mobile={{ px: '3', ...layoutProps?._mobile }}
    >
      {titleContent}
      {description ? <Box>{descriptionContent}</Box> : null}
      {actionContent}
    </Stack>
  );
}

/** 빈 목록을 나타내는 장식을 표시합니다. (Displays decoration for an empty list.) */
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

/** 빈 목록 안내의 제목을 표시합니다. (Displays the title of an empty state.) */
export function EmptyStateTitle({
  className,
  children,
  variant = 'heading7',
  as = 'h2',
  ...props
}: EmptyStateTitleProps) {
  return (
    <Typography
      {...props}
      as={as}
      variant={variant}
      className={withClassName('empty-state__title', className)}
    >
      {children}
    </Typography>
  );
}

/** 빈 목록의 설명을 표시합니다. (Displays an empty list description.) */
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

/** 빈 목록의 후속 액션을 배치합니다. (Arranges an empty list action.) */
export function EmptyStateAction({ className, ...props }: EmptyStateActionProps) {
  return <Box {...props} className={withClassName('empty-state__action', className)} mt="2" />;
}

/** 빈 목록의 제목·설명·액션을 구성합니다. (Composes an empty state's title, description, and action.) */
export const EmptyState = Object.assign(EmptyStateRoot, {
  Icon: EmptyStateIcon,
  Title: EmptyStateTitle,
  Description: EmptyStateDescription,
  Action: EmptyStateAction,
});
