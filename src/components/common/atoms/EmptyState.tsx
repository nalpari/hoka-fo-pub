import type { ComponentProps, ComponentPropsWithoutRef, ReactNode } from 'react';

import { css } from 'styled-system/css';
import { Box, Grid, Stack } from 'styled-system/jsx';

import { Typography, type TypographyProps } from '@/components/common/atoms/Typography';

import { type EmptyStateLayout, emptyStateRecipe } from './EmptyState.recipe';

type EmptyStateProps = {
  title?: ReactNode;
  description?: ReactNode;
  action?: ReactNode;
  /** 생략하거나 undefined이면 standard를 적용합니다. (Defaults to standard when omitted or undefined.) */
  variant?: 'standard' | 'minimal' | 'plain' | 'page' | 'content';
  /** 화면별 배치를 선택하며 생략 시 variant 기본값을 유지합니다. (Defaults to the variant layout.) */
  layout?: EmptyStateLayout;
  className?: string;
  as?: 'div' | 'section';
  role?: ComponentPropsWithoutRef<'div'>['role'];
  /** 기존 외부 호출의 스타일 override를 유지하며 준비된 배치는 layout을 사용합니다. (Retains legacy overrides; prepared layouts use layout.) */
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
  layout = 'default',
  className,
  titleProps,
  layoutProps,
  role,
  as,
  descriptionProps,
}: EmptyStateProps) {
  const label = typeof title === 'string' ? title : undefined;
  const slots = emptyStateRecipe.raw({ variant, layout, hasAction: Boolean(action) });
  const titleContent = (
    <EmptyStateTitle
      {...titleProps}
      className={withClassName(css(slots.title), titleProps?.className)}
    >
      {title}
    </EmptyStateTitle>
  );
  const descriptionContent = description ? (
    <Typography
      as="p"
      variant="body3"
      {...descriptionProps}
      className={withClassName(css(slots.description), descriptionProps?.className)}
    >
      {description}
    </Typography>
  ) : null;
  // Root action spacing differs from the independently used EmptyState.Action slot.
  const actionContent = action ? (
    <Box _mobile={{ width: variant === 'page' ? '100%' : undefined }}>{action}</Box>
  ) : null;
  const grouped = variant === 'page' || variant === 'content';
  const content = (
    <>
      {grouped ? (
        <Stack css={slots.text}>
          {title ? titleContent : null}
          {descriptionContent}
        </Stack>
      ) : (
        <>
          {titleContent}
          {descriptionContent}
        </>
      )}
      {actionContent}
    </>
  );
  const rootProps = {
    className,
    role,
    css: css.raw(slots.root, layoutProps, {
      _mobile: { ...slots.root._mobile, ...layoutProps?._mobile },
    }),
  };

  if (variant === 'plain') {
    return (
      <Box as={as ?? 'div'} {...rootProps}>
        {content}
      </Box>
    );
  }

  return (
    <Stack as={as ?? 'section'} aria-label={label} {...rootProps}>
      {content}
    </Stack>
  );
}

/** 빈 목록을 나타내는 장식을 표시합니다. (Displays decoration for an empty list.) */
export function EmptyStateIcon({ className, ...props }: EmptyStateIconProps) {
  return (
    <Grid
      {...props}
      className={withClassName('empty-state__icon', className)}
      css={emptyStateRecipe.raw().icon}
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
  return (
    <Box
      {...props}
      className={withClassName('empty-state__action', className)}
      css={emptyStateRecipe.raw().action}
    />
  );
}

/** 빈 목록의 제목·설명·액션을 구성합니다. (Composes an empty state's title, description, and action.) */
export const EmptyState = Object.assign(EmptyStateRoot, {
  Icon: EmptyStateIcon,
  Title: EmptyStateTitle,
  Description: EmptyStateDescription,
  Action: EmptyStateAction,
});
