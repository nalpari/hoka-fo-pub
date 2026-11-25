import {
  type ComponentProps,
  type ComponentPropsWithoutRef,
  isValidElement,
  type ReactNode,
} from 'react';

import { css } from 'styled-system/css';
import { Box, Grid, HStack, Stack } from 'styled-system/jsx';

import { Typography, type TypographyProps } from '@/components/common/atoms/Typography';

import { type EmptyStateLayout, emptyStateRecipe, getEmptyStateStyles } from './EmptyState.recipe';

type EmptyStateProps = {
  title?: ReactNode;
  /** 기존 장식의 의미와 크기를 유지하는 아이콘 슬롯입니다. (Preserves the supplied decoration and its dimensions.) */
  icon?: ReactNode;
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

type EmptyStateTitleProps = ComponentPropsWithoutRef<'p'> &
  Pick<TypographyProps, 'variant' | 'web' | 'mo' | 'weight' | 'tone'> & {
    as?: 'h2' | 'p' | 'span';
  };

type EmptyStateDescriptionProps = ComponentPropsWithoutRef<'p'>;

type EmptyStateActionProps = ComponentPropsWithoutRef<'div'>;

function hasKoreanText(children: ReactNode): boolean {
  if (typeof children === 'string') return /\p{Script=Hangul}/u.test(children);
  if (Array.isArray(children)) return children.some(hasKoreanText);
  return (
    isValidElement<{ children?: ReactNode }>(children) && hasKoreanText(children.props.children)
  );
}

function hasTypographyOverride(
  props?: Pick<TypographyProps, 'variant' | 'web' | 'mo' | 'weight' | 'tone'>,
) {
  return (
    props?.variant !== undefined ||
    props?.web !== undefined ||
    props?.mo !== undefined ||
    props?.weight !== undefined ||
    props?.tone !== undefined
  );
}

function withClassName(baseClassName: string, className?: string) {
  return [baseClassName, className].filter(Boolean).join(' ');
}

function EmptyStateRoot({
  title,
  icon,
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
  const customTitle = hasTypographyOverride(titleProps);
  const customDescription = hasTypographyOverride(descriptionProps);
  const slots = getEmptyStateStyles(
    { variant, layout, hasAction: Boolean(action) },
    {
      titleKorean: hasKoreanText(title),
      descriptionKorean: hasKoreanText(description),
      customTitle,
      customDescription,
    },
  );
  const titleClassName = withClassName(css(slots.title), titleProps?.className);
  const titleContent = customTitle ? (
    <EmptyStateTitle {...titleProps} className={titleClassName}>
      {title}
    </EmptyStateTitle>
  ) : (
    <Typography
      {...titleProps}
      as={titleProps?.as ?? 'p'}
      className={withClassName('empty-state__title', titleClassName)}
    >
      {title}
    </Typography>
  );
  const descriptionContent = description ? (
    <Typography
      as="p"
      variant={customDescription ? 'b4' : undefined}
      {...descriptionProps}
      className={withClassName(css(slots.description), descriptionProps?.className)}
    >
      {description}
    </Typography>
  ) : null;
  // Root action spacing differs from the independently used EmptyState.Action slot.
  const actionContent = action ? (
    layout === 'cart' ? (
      <HStack css={slots.actionContent}>{action}</HStack>
    ) : (
      <Box css={slots.actionContent} _mobile={{ width: variant === 'page' ? '100%' : undefined }}>
        {action}
      </Box>
    )
  ) : null;
  const grouped = variant === 'page' || variant === 'content' || layout === 'cart';
  const content = (
    <>
      {grouped ? (
        <Stack css={slots.text}>
          {icon}
          {title ? titleContent : null}
          {descriptionContent}
        </Stack>
      ) : (
        <>
          {icon}
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

  if (variant === 'plain' && layout !== 'cart') {
    return (
      <Box as={as ?? 'div'} {...rootProps}>
        {content}
      </Box>
    );
  }

  return (
    <Stack as={as ?? 'section'} aria-label={layout === 'cart' ? undefined : label} {...rootProps}>
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
  variant,
  web,
  mo,
  as = 'p',
  ...props
}: EmptyStateTitleProps) {
  return (
    <Typography
      {...props}
      as={as}
      variant={variant}
      web={web ?? (variant ? undefined : 'h10B')}
      mo={mo ?? (variant ? undefined : 'h8')}
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

/** 빈 목록의 아이콘·제목·설명·액션을 구성합니다. (Composes an empty state's icon, title, description, and action.) */
export const EmptyState = Object.assign(EmptyStateRoot, {
  Icon: EmptyStateIcon,
  Title: EmptyStateTitle,
  Description: EmptyStateDescription,
  Action: EmptyStateAction,
});
