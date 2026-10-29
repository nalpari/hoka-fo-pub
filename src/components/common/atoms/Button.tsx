'use client';

import Link from 'next/link';
import type { LinkProps } from 'next/link';

import { Button as BaseButton, type ButtonProps as BaseButtonProps } from '@base-ui/react/button';
import { forwardRef } from 'react';
import type { ButtonHTMLAttributes, ComponentPropsWithRef, CSSProperties, ReactNode } from 'react';

import { css, cva } from 'styled-system/css';
import { HStack } from 'styled-system/jsx';
import { circle } from 'styled-system/patterns';

import { Icon } from '@/components/common/atoms/Icon';
import { Typography, type TypographyProps } from '@/components/common/atoms/Typography';

const button = cva({
  base: {
    display: 'inline-flex',
    border: '0',
    p: '0',
    bg: 'transparent',
    borderRadius: 'var(--button-radius, 52px)',
    cursor: 'pointer',
    '--button-height': '48px',
    '--button-padding-x': '24px',
    '--button-label-size': '16px',
    '--button-radius': '52px',
    '--button-content-gap': '8px',
    _focusVisible: {
      outline: 'none',
      '& > span': {
        bg: 'var(--button-bg-active, var(--button-bg))',
        color: 'var(--button-color-active, var(--button-color))',
        boxShadow: 'inset 0 0 0 4px var(--button-focus-ring)',
      },
    },
    '&:active:not(:disabled):not([data-disabled]) > span': {
      bg: 'var(--button-bg-active, var(--button-bg))',
      color: 'var(--button-color-active, var(--button-color))',
      boxShadow: 'inset 0 0 0 4px var(--button-focus-ring)',
    },
    '&:hover:not(:active):not(:focus-visible):not(:disabled):not([data-disabled]) > span': {
      bg: 'var(--button-bg-hover, var(--button-bg))',
      color: 'var(--button-color-hover, var(--button-color))',
      boxShadow:
        'inset 0 0 0 var(--button-border-width-hover, var(--button-border-width, 0px)) var(--button-border-color-hover, var(--button-border-color))',
    },
    '&:hover:focus-visible > span': {
      bg: 'var(--button-bg-active, var(--button-bg))',
      color: 'var(--button-color-active, var(--button-color))',
      boxShadow: 'inset 0 0 0 4px var(--button-focus-ring)',
    },
    '&:disabled, &[data-disabled]': {
      cursor: 'not-allowed',
      '& > span': {
        bg: 'var(--button-disabled-bg)!',
        color: 'var(--button-disabled-color)!',
        boxShadow: 'none!',
      },
    },
  },
  variants: {
    density: {
      auto: {
        _mobile: {
          '--button-height': 'var(--home-body-40, 40px)',
          '--button-padding-x': 'var(--home-body-16, 16px)',
          '--button-label-size': 'var(--home-body-14, 14px)',
        },
      },
      wide: {},
      compact: {
        '--button-height': 'var(--home-body-40, 40px)',
        '--button-padding-x': 'var(--home-body-16, 16px)',
        '--button-label-size': 'var(--home-body-14, 14px)',
      },
    },
    fullWidth: { true: { w: '100%', '& > span': { w: '100%' } } },
    language: {
      kr: { fontFamily: 'korean', fontWeight: 'semibold', letterSpacing: 'korean' },
      en: { fontFamily: 'hoka', fontWeight: 'medium', letterSpacing: '0' },
    },
    unframed: {
      true: {
        '--button-disabled-bg': 'transparent',
        '--button-disabled-color': 'var(--color-black-40)',
        _focusVisible: {
          outline: '2px solid var(--button-focus-ring)',
          outlineOffset: '2px',
          '& > span': { boxShadow: 'none' },
        },
        '&:active:not(:disabled):not([data-disabled]) > span': { boxShadow: 'none' },
        '&:hover:focus-visible > span': { boxShadow: 'none' },
      },
    },
  },
});

const frame = css({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  boxSizing: 'border-box',
  minH: 'var(--button-height)',
  borderRadius: 'inherit',
  bg: 'var(--button-bg)',
  color: 'var(--button-color)',
  boxShadow: 'inset 0 0 0 var(--button-border-width, 0px) var(--button-border-color, transparent)',
  transition: 'background-color 160ms ease, color 160ms ease, box-shadow 160ms ease',
});

const content = css.raw({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  boxSizing: 'border-box',
  w: '100%',
  gap: 'var(--button-content-gap)',
  px: 'var(--button-padding-x)',
  py: 'var(--button-padding-y, 0px)',
  minH: 'var(--button-height)',
  whiteSpace: 'nowrap',
});

const label = css.raw({
  fontSize: 'var(--button-label-size)',
  fontWeight: 'var(--button-label-weight, inherit)',
  lineHeight: 'body',
  color: 'inherit',
});

const iconStyle = css({
  display: 'flex',
  flexShrink: '0',
  w: 'var(--button-icon-size)',
  h: 'var(--button-icon-size)',
  color: 'inherit',
});

const iconOnlyButtonStyle = css.raw({
  w: '6',
  h: '6',
  minW: '6',
  '--button-height': '24px',
  '--button-padding-x': '0px',
  '--button-content-gap': '0px',
  '& > span': { w: '100%', h: '100%', minH: '0' },
  '& > span > span': { w: '100%', h: '100%', minH: '0', gap: '0', px: '0' },
});

const secondaryContentColor = css.raw({
  '&:is(:hover, :focus-visible, :active):not(:disabled):not([data-disabled]) > span *': {
    color: 'inherit',
  },
});

const iconButton = css.raw({
  display: 'inline-grid',
  placeItems: 'center',
  w: 'var(--icon-button-size)',
  h: 'var(--icon-button-size)',
  minW: 'var(--icon-button-size)',
  minH: 'var(--icon-button-size)',
  border: '0',
  bg: 'transparent',
  p: '0',
  color: 'var(--icon-button-color, currentColor)',
  '& svg': { color: 'currentColor' },
  '& svg [fill]:not([fill="none"])': { fill: 'currentColor!' },
  '& svg [stroke]:not([stroke="none"])': { stroke: 'currentColor!' },
  _focusVisible: {
    outline: '4px solid var(--button-focus-ring)',
    outlineOffset: '2px',
  },
});

const socialLogin = cva({
  base: { '--button-icon-size': '18px' },
  variants: {
    provider: {
      kakao: {
        '--button-bg': '#fae100!',
        '--button-color': 'token(colors.black.100)!',
        '--button-bg-hover': '#fae100!',
        '--button-color-hover': 'token(colors.black.100)!',
      },
      naver: {
        '--button-bg': '#03c75a!',
        '--button-color': 'token(colors.white.0)!',
        '--button-bg-hover': '#03c75a!',
        '--button-color-hover': 'token(colors.white.0)!',
      },
    },
  },
});

export type ButtonLoadMore = (
  | { remaining: number; counter?: never }
  | { remaining?: never; counter: { current: number; total: number } }
) & {
  label?: ReactNode;
  labelProps?: Pick<TypographyProps, 'variant' | 'mo' | 'web' | 'weight'>;
  counterProps?: Pick<TypographyProps, 'variant' | 'mo' | 'web'>;
};

export type ButtonSocial = {
  provider: 'kakao' | 'naver';
  appearance?: 'login' | 'signup';
};

function renderLoadMoreContent({
  remaining,
  counter,
  label = '더보기',
  labelProps,
  counterProps,
}: ButtonLoadMore) {
  if (counter === undefined)
    return (
      <>
        {label} ({remaining}) ⌄
      </>
    );

  return (
    <HStack gap="1" justifyContent="center">
      <Typography {...(labelProps ?? { variant: 'cta2', weight: 'semibold' })}>{label}</Typography>
      <Typography {...(counterProps ?? { variant: 'body5' })} tone="tertiary">
        ({counter.current}/{counter.total})
      </Typography>
    </HStack>
  );
}

export type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'brand'
  | 'link'
  | 'plain'
  | 'chip'
  | 'filterTrigger'
  | 'headerSearch'
  | 'icon';

export type ButtonSizingProps =
  | { variant: 'link'; size?: 'sm' | 'md' | 'lg' }
  | { variant: 'plain'; size?: 'sm' | 'md' | 'lg' }
  | { variant: 'chip'; size?: never }
  | { variant: 'filterTrigger'; size?: 'compact' | 'regular' }
  | { variant: 'headerSearch'; size?: never }
  | {
      variant?: Exclude<
        ButtonVariant,
        'link' | 'plain' | 'chip' | 'filterTrigger' | 'headerSearch' | 'icon'
      >;
      size?: 'tall' | 'short';
    };

type ButtonTextBaseProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'> & {
  density?: 'auto' | 'wide' | 'compact';
  colorway?: 'black' | 'white';
  language?: 'kr' | 'en';
  fullWidth?: boolean;
  icon?: ReactNode;
  loading?: boolean;
  invalid?: boolean;
  render?: BaseButtonProps['render'];
  nativeButton?: boolean;
};

type ButtonContentProps =
  { loadMore: ButtonLoadMore; children?: never } | { loadMore?: never; children?: ReactNode };

export type ButtonTextProps =
  | (ButtonTextBaseProps & ButtonSizingProps & ButtonContentProps & { social?: never })
  | (Omit<ButtonTextBaseProps, 'icon' | 'fullWidth' | 'className' | 'style' | 'colorway'> & {
      social: ButtonSocial;
      children?: ReactNode;
      size?: 'short' | 'tall';
      variant?: never;
      icon?: never;
      fullWidth?: never;
      className?: never;
      style?: never;
      colorway?: never;
      loadMore?: never;
    });

export type ButtonIconProps = Omit<ComponentPropsWithRef<'button'>, 'color'> & {
  variant: 'icon';
  size?: string | number;
  shape?: 'square' | 'circle';
  tone?: 'default' | 'inverse' | 'disabled';
  color?: CSSProperties['color'];
  loading?: boolean;
  render?: BaseButtonProps['render'];
  nativeButton?: boolean;
  social?: never;
  loadMore?: never;
};

export type ButtonProps = ButtonTextProps | ButtonIconProps;

/** 공통 크기·상태와 접근 가능한 동작을 제공하는 버튼입니다. (Provides a button with shared sizing, states, and accessible behavior.) */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(props, ref) {
  if (props.variant === 'icon') {
    const {
      variant: _variant,
      size = 36,
      shape = 'square',
      tone = 'default',
      color = 'currentColor',
      loading = false,
      className,
      style,
      disabled,
      type = 'button',
      ...iconProps
    } = props;

    // The discriminant selects this branch and must not reach the native button.
    void _variant;

    return (
      <BaseButton
        {...iconProps}
        ref={ref}
        type={type}
        aria-busy={loading || undefined}
        disabled={disabled || loading}
        style={
          {
            '--icon-button-size': typeof size === 'number' ? `${size}px` : size,
            '--icon-button-color':
              tone === 'inverse'
                ? 'var(--color-white-000)'
                : tone === 'disabled'
                  ? 'var(--color-black-40)'
                  : color,
            ...style,
          } as CSSProperties
        }
        className={[
          css(shape === 'circle' && circle.raw({ size: 'var(--icon-button-size)' }), iconButton),
          className,
        ]
          .filter(Boolean)
          .join(' ')}
      />
    );
  }

  const {
    variant = props.social ? 'primary' : 'secondary',
    density,
    colorway = 'black',
    language = 'kr',
    size = variant === 'filterTrigger'
      ? 'compact'
      : variant === 'link' || variant === 'plain'
        ? 'md'
        : 'tall',
    fullWidth = props.social !== undefined,
    loading = false,
    invalid = false,
    icon: customIcon,
    social,
    loadMore,
    className,
    children,
    type = 'button',
    style,
    disabled,
    ...buttonProps
  } = props;
  const icon = social ? <Icon name={`social/${social.provider}`} size="18px" /> : customIcon;
  const resolvedChildren = loadMore ? renderLoadMoreContent(loadMore) : children;
  const iconOnly = Boolean(icon && resolvedChildren == null);
  const primary = variant === 'primary';
  const white = colorway === 'white';
  const unframed = variant === 'link' || variant === 'plain';
  const labelTypographyVariant =
    variant === 'chip'
      ? 'body4'
      : variant === 'headerSearch' || variant === 'filterTrigger'
        ? undefined
        : size === 'short'
          ? 'cta2'
          : size === 'tall'
            ? 'cta1'
            : undefined;
  const resolvedDensity =
    density ??
    (variant === 'filterTrigger'
      ? 'wide'
      : size
        ? size === 'tall' || size === 'lg'
          ? 'wide'
          : 'compact'
        : 'auto');
  const variables: Record<string, string> = {
    '--button-bg': primary
      ? white
        ? 'var(--color-white-000)'
        : 'var(--color-black-100)'
      : white
        ? 'transparent'
        : 'var(--color-white-000)',
    '--button-padding-y': '0px',
    '--button-color': primary
      ? white
        ? 'var(--color-black-100)'
        : 'var(--color-white-000)'
      : white
        ? 'var(--color-white-000)'
        : 'var(--color-black-100)',
    '--button-bg-hover': white && !primary ? 'transparent' : 'var(--color-black-60)',
    '--button-color-hover': 'var(--color-white-000)',
    '--button-bg-active': white && !primary ? 'transparent' : 'var(--color-black-100)',
    '--button-color-active': 'var(--color-white-000)',
    '--button-border-width': primary ? '0px' : '1px',
    '--button-border-color': white ? 'var(--color-white-000)' : 'var(--color-black-100)',
    '--button-border-width-hover': white && !primary ? '2px' : '0px',
    '--button-focus-ring':
      white && !primary ? 'var(--color-white-000)' : 'var(--color-border-tertiary)',
    '--button-disabled-bg': unframed ? 'transparent' : 'var(--color-bg-disabled)',
    '--button-disabled-color': unframed
      ? 'var(--color-black-40)'
      : white
        ? 'var(--color-white-000)'
        : 'var(--color-black-100)',
  };
  if (unframed)
    Object.assign(variables, {
      '--button-bg': 'transparent',
      '--button-bg-hover': 'transparent',
      '--button-bg-active': 'transparent',
      '--button-color': white ? 'var(--color-white-000)' : 'var(--color-black-100)',
      '--button-color-hover': white ? 'var(--color-white-000)' : 'var(--color-black-100)',
      '--button-color-active': white ? 'var(--color-white-000)' : 'var(--color-black-100)',
      '--button-border-width': '0px',
      '--button-border-width-hover': '0px',
      '--button-radius': '0px',
    });
  if (variant === 'link' || variant === 'plain')
    Object.assign(variables, {
      '--button-height': size === 'sm' ? '16px' : 'auto',
      '--button-padding-x': '0px',
      '--button-label-weight': '500',
    });
  if (size === 'sm' && (variant === 'link' || variant === 'plain')) {
    variables['--button-label-size'] = '12px';
  }
  if (variant === 'chip')
    Object.assign(variables, {
      '--button-height': '36px',
      '--button-padding-x': '14px',
      '--button-padding-y': '9px',
      '--button-radius': '999px',
      '--button-bg': 'var(--color-black-20)',
      '--button-color': 'var(--color-black-100)',
      '--button-bg-hover': 'var(--color-black-10)',
      '--button-color-hover': 'var(--color-black-100)',
      '--button-bg-active': 'var(--color-black-20)',
      '--button-color-active': 'var(--color-black-100)',
      '--button-border-width': '0px',
      '--button-disabled-bg': 'var(--color-black-20)',
      '--button-disabled-color': 'var(--color-black-40)',
    });
  if (variant === 'brand')
    Object.assign(variables, {
      '--button-bg': 'var(--color-blue-100)',
      '--button-color': 'var(--color-white-000)',
      '--button-border-width': '0px',
    });
  if (variant === 'filterTrigger')
    Object.assign(variables, {
      '--button-height': '40px',
      '--button-padding-x': size === 'regular' ? '24px' : '14px',
      '--button-radius': '46.8px',
      '--button-border-width': size === 'regular' ? '1px' : '0.9px',
      ...(size === 'regular' ? { '--button-icon-size': '20px' } : {}),
    });
  if (variant === 'headerSearch')
    Object.assign(variables, {
      '--button-height': '40px',
      '--button-padding-x': '15px',
      '--button-radius': '999px',
    });
  if (invalid) variables['--button-border-color'] = 'var(--color-red-100)';
  if (social?.appearance === 'signup')
    Object.assign(variables, {
      '--button-bg': social.provider === 'kakao' ? '#FAE100' : '#03C75A',
      '--button-color':
        social.provider === 'kakao' ? 'var(--color-black-100)' : 'var(--color-white-000)',
      '--button-border-color': social.provider === 'kakao' ? '#FAE100' : '#03C75A',
      '--button-border-width': '0px',
    });
  return (
    <BaseButton
      {...buttonProps}
      ref={ref}
      aria-busy={loading || undefined}
      disabled={disabled || loading}
      type={type}
      style={{ ...variables, ...style } as CSSProperties}
      className={[
        css(
          button.raw({
            density: resolvedDensity,
            fullWidth,
            language,
            unframed,
          }),
          iconOnly && iconOnlyButtonStyle,
          variant === 'secondary' && secondaryContentColor,
          variant === 'link' && { textDecoration: 'underline', textUnderlineOffset: '3px' },
          variant === 'headerSearch' && { w: '178px' },
          social &&
            social.appearance !== 'signup' &&
            socialLogin.raw({ provider: social.provider }),
        ),
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <span className={frame}>
        <span
          className={css(
            content,
            variant === 'plain' && { justifyContent: 'flex-start' },
            variant === 'headerSearch' && { justifyContent: 'space-between' },
          )}
        >
          {iconOnly ? null : (
            <span
              className={css(
                label,
                (variant === 'link' || variant === 'plain') && {
                  lineHeight: '1.3',
                },
              )}
            >
              {labelTypographyVariant ? (
                <Typography
                  as="span"
                  variant={labelTypographyVariant}
                  // The former count wrapper kept the outer scale independent of its label.
                  language={loadMore ? 'en' : undefined}
                  weight={variant === 'chip' ? 'medium' : undefined}
                  style={{ color: 'inherit' }}
                >
                  {resolvedChildren}
                </Typography>
              ) : (
                resolvedChildren
              )}
            </span>
          )}
          {icon ? <span className={iconStyle}>{icon}</span> : null}
        </span>
      </span>
    </BaseButton>
  );
});

export type ButtonLinkProps = Pick<
  LinkProps,
  'href' | 'replace' | 'scroll' | 'prefetch' | 'onNavigate'
> &
  Pick<
    ButtonTextBaseProps,
    | 'className'
    | 'style'
    | 'density'
    | 'colorway'
    | 'language'
    | 'fullWidth'
    | 'icon'
    | 'loading'
    | 'invalid'
    | 'onMouseDown'
  > &
  ButtonSizingProps &
  ({ loadMore: ButtonLoadMore; children?: never } | { loadMore?: never; children: ReactNode }) & {
    social?: never;
  };

/** 공통 버튼의 외형과 수량 표시를 제공하는 탐색 링크입니다. (Provides a navigation link with shared button appearance and optional counts.) */
export function ButtonLink({
  href,
  replace,
  scroll,
  prefetch,
  onNavigate,
  ...buttonProps
}: ButtonLinkProps) {
  return (
    <Button
      {...buttonProps}
      nativeButton={false}
      render={(props) => (
        <Link
          {...props}
          href={href}
          replace={replace}
          scroll={scroll}
          prefetch={prefetch}
          onNavigate={onNavigate}
          role={undefined}
        />
      )}
    />
  );
}
