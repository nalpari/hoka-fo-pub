'use client';

import Link from 'next/link';
import type { LinkProps } from 'next/link';

import { Button as BaseButton, type ButtonProps as BaseButtonProps } from '@base-ui/react/button';
import { forwardRef } from 'react';
import type { ButtonHTMLAttributes, ComponentPropsWithRef, CSSProperties, ReactNode } from 'react';
import { type Platform, usePlatform } from '@/context/platform';

import { css, cva } from 'styled-system/css';
import { HStack } from 'styled-system/jsx';
import { circle } from 'styled-system/patterns';

import { Icon, type IconProps } from '@/components/common/atoms/Icon';
import { Typography, type TypographyProps } from '@/components/common/atoms/Typography';

const button = cva({
  base: {
    display: 'inline-flex',
    border: '0',
    p: '0',
    borderRadius: 'var(--button-radius, 52px)',
    cursor: 'pointer',
    alignItems: 'center',
    justifyContent: 'center',
    boxSizing: 'border-box',
    minH: 'var(--button-height)',
    bg: 'var(--button-bg)',
    color: 'var(--button-color)',
    boxShadow:
      'inset 0 0 0 var(--button-border-width, 0px) var(--button-border-color, transparent)',
    transition: 'background-color 160ms ease, color 160ms ease, box-shadow 160ms ease',
    '--button-radius': '52px',
    _focusVisible: {
      outline: '4px solid var(--button-focus-ring)',
      outlineOffset: '0px',
      bg: 'var(--button-bg-active, var(--button-bg))',
      color: 'var(--button-color-active, var(--button-color))',
      boxShadow: 'none',
    },
    '&:active:not(:disabled):not([data-disabled])': {
      outline: '4px solid var(--button-focus-ring)',
      outlineOffset: '0px',
      bg: 'var(--button-bg-active, var(--button-bg))',
      color: 'var(--button-color-active, var(--button-color))',
      boxShadow: 'none',
    },
    '&:hover:not(:active):not(:focus-visible):not(:disabled):not([data-disabled])': {
      bg: 'var(--button-bg-hover, var(--button-bg))',
      color: 'var(--button-color-hover, var(--button-color))',
      boxShadow:
        'inset 0 0 0 var(--button-border-width-hover, var(--button-border-width, 0px)) var(--button-border-color-hover, var(--button-border-color))',
    },
    '&:hover:focus-visible': {
      outline: '4px solid var(--button-focus-ring)',
      outlineOffset: '0px',
      bg: 'var(--button-bg-active, var(--button-bg))',
      color: 'var(--button-color-active, var(--button-color))',
      boxShadow: 'none',
    },
    '&:disabled, &[data-disabled]': {
      cursor: 'not-allowed',
      bg: 'var(--button-disabled-bg)!',
      color: 'var(--button-disabled-color)!',
      boxShadow: 'none!',
    },
  },
  variants: {
    size: {
      tall: {
        '--button-height': '48px',
        '--button-padding-x': '24px',
      },
      short: {
        '--button-height': 'var(--home-body-40, 40px)',
        '--button-padding-x': 'var(--home-body-16, 16px)',
      },
      sm: { '--button-height': '16px' },
      md: { '--button-height': 'auto' },
      lg: { '--button-height': 'auto' },
    },
    fullWidth: { true: { w: '100%', '& > span': { w: '100%' } } },
    language: {
      kr: { fontFamily: 'korean', fontWeight: 'semibold', letterSpacing: 'korean' },
      en: { fontFamily: 'hoka', fontWeight: 'medium', letterSpacing: '0' },
    },
    unframed: {
      true: {
        '--button-padding-x': '0px',
        '--button-disabled-bg': 'transparent',
        '--button-disabled-color': 'var(--color-black-40)',
        _focusVisible: {
          outline: '2px solid var(--button-focus-ring)',
          outlineOffset: '2px',
          boxShadow: 'none',
        },
        '&:active:not(:disabled):not([data-disabled])': {
          outline: 'none',
          boxShadow: 'none',
        },
        '&:hover:focus-visible': { boxShadow: 'none' },
      },
    },
  },
});

const content = css.raw({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  boxSizing: 'border-box',
  w: '100%',
  gap: '4px',
  px: 'var(--button-padding-x)',
  py: 'var(--button-padding-y, 0px)',
  whiteSpace: 'nowrap',
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
  | { remaining: number; counter?: never; count?: never }
  | { remaining?: never; counter: { current: number; total: number }; count?: never }
  | { remaining?: never; counter?: never; count: number; appearance: 'text' | 'inline' }
) & {
  label?: ReactNode;
  labelProps?: Pick<TypographyProps, 'variant' | 'mo' | 'web' | 'weight'>;
  counterProps?: Pick<TypographyProps, 'variant' | 'mo' | 'web'>;
} & (
    | {
        appearance?: never;
        countPlacement?: never;
        direction?: 'up' | 'down';
        indicator?: never;
      }
    | {
        appearance: 'text';
        countPlacement?: 'inline' | 'separate';
        direction?: never;
        indicator?: ReactNode;
      }
    | { appearance: 'inline'; countPlacement?: never; direction?: never; indicator?: ReactNode }
  );

export type ButtonSocial = {
  provider: 'kakao' | 'naver';
  appearance?: 'login' | 'signup';
};

function renderLoadMoreContent(
  {
    remaining,
    counter,
    label = '더보기',
    labelProps,
    counterProps,
    count,
    appearance,
    countPlacement = 'separate',
    indicator,
    direction = 'down',
  }: ButtonLoadMore,
  platform: Platform,
) {
  const countLabel = counter ? `${counter.current}/${counter.total}` : (count ?? remaining);

  if (appearance === 'inline') {
    return (
      <HStack as="span" display="inline-flex" gap="2">
        <span>
          {label} ({countLabel})
        </span>
        {indicator}
      </HStack>
    );
  }

  if (appearance === 'text') {
    return (
      <HStack gap="1">
        {countPlacement === 'inline' ? (
          <Typography {...labelProps}>
            {label} ({countLabel})
          </Typography>
        ) : (
          <>
            <Typography {...labelProps}>{label}</Typography>
            <Typography {...counterProps}>({countLabel})</Typography>
          </>
        )}
        {indicator}
      </HStack>
    );
  }

  if (counter === undefined)
    return (
      <>
        {label} ({remaining}) ⌄
      </>
    );

  return (
    <HStack
      as="span"
      gap={{ base: '8px', _mobile: '6px' }}
      // alignItems="center"
      // justifyContent="center"
    >
      <HStack as="span" gap="0" alignItems="center">
        <Typography {...(labelProps ?? { web: 'cta1', mo: 'cta2', weight: 'regular' })}>
          {label}
        </Typography>
        <Typography {...(counterProps ?? { web: 'cta1', mo: 'cta2', weight: 'regular' })}>
          ({counter.current}/{counter.total})
        </Typography>
      </HStack>
      <Icon
        name="chevron-down-regular"
        size={platform === 'mobile' ? '14px' : '18px'}
        style={direction === 'up' ? { transform: 'rotate(180deg)' } : undefined}
      />
    </HStack>
  );
}

export type ButtonVariant =
  'primary' | 'secondary' | 'link' | 'plain' | 'chip' | 'filterTrigger' | 'unstyled' | 'icon';

export type ButtonSizingProps =
  | { variant: 'link'; size?: 'sm' | 'md' | 'lg' }
  | { variant: 'plain'; size?: 'sm' | 'md' | 'lg' }
  | { variant: 'chip'; size?: never }
  | { variant: 'filterTrigger'; size?: 'compact' }
  | {
      variant?: Exclude<
        ButtonVariant,
        'link' | 'plain' | 'chip' | 'filterTrigger' | 'unstyled' | 'icon'
      >;
      size?: 'tall' | 'short';
    };

type ButtonTextBaseProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'> & {
  colorway?: 'black' | 'white';
  language?: 'kr' | 'en';
  fullWidth?: boolean;
  iconLeft?: IconProps['name'];
  iconRight?: IconProps['name'];
  iconSize?: IconProps['size'];
  iconColor?: IconProps['color'];
  loading?: boolean;
  invalid?: boolean;
  render?: BaseButtonProps['render'];
  nativeButton?: boolean;
};

type ButtonContentProps =
  { loadMore: ButtonLoadMore; children?: never } | { loadMore?: never; children?: ReactNode };

export type ButtonTextProps =
  | (ButtonTextBaseProps & ButtonSizingProps & ButtonContentProps & { social?: never })
  | (Omit<
      ButtonTextBaseProps,
      | 'fullWidth'
      | 'className'
      | 'style'
      | 'colorway'
      | 'iconLeft'
      | 'iconRight'
      | 'iconSize'
      | 'iconColor'
      | 'disabled'
      | 'loading'
    > & {
      social: ButtonSocial;
      disabled?: never;
      loading?: never;
      iconLeft?: never;
      iconRight?: never;
      iconSize?: never;
      iconColor?: never;
      children?: ReactNode;
      size?: 'short' | 'tall';
      variant?: never;
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

export type ButtonUnstyledProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant: 'unstyled';
  loading?: boolean;
  size?: never;
  social?: never;
  loadMore?: never;
};

export type ButtonProps = ButtonTextProps | ButtonIconProps | ButtonUnstyledProps;

/** 공통 크기·상태와 접근 가능한 동작을 제공하는 버튼입니다. (Provides a button with shared sizing, states, and accessible behavior.) */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(props, ref) {
  const platform = usePlatform();

  if (props.variant === 'unstyled') {
    const { variant: _variant, loading, disabled, type = 'button', ...nativeProps } = props;
    void _variant;

    return (
      <BaseButton
        {...nativeProps}
        ref={ref}
        type={type}
        disabled={disabled || loading}
        aria-busy={loading || nativeProps['aria-busy']}
      />
    );
  }

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
    social,
    iconLeft,
    iconRight,
    iconSize = 16,
    iconColor,
    loadMore,
    className,
    children,
    type = 'button',
    style,
    disabled,
    ...buttonProps
  } = props;
  const resolvedChildren = loadMore ? renderLoadMoreContent(loadMore, platform) : children;
  const primary = variant === 'primary';
  const white = colorway === 'white';
  const unframed = variant === 'link' || variant === 'plain';
  const labelTypographyVariant = unframed
    ? typeof resolvedChildren === 'string' || typeof resolvedChildren === 'number'
      ? size === 'sm'
        ? 'body5'
        : size === 'lg'
          ? 'body3'
          : 'body4'
      : undefined
    : variant === 'chip'
      ? 'body4'
      : variant === 'filterTrigger'
        ? undefined
        : size === 'short'
          ? 'cta2'
          : size === 'tall'
            ? 'cta1'
            : undefined;
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
    '--button-disabled-bg': unframed
      ? 'transparent'
      : white
        ? 'var(--color-black-40)'
        : 'var(--color-black-20)',
    '--button-disabled-color': unframed
      ? 'var(--color-black-40)'
      : white
        ? 'var(--color-white-000)'
        : 'var(--color-black-40)',
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
  if (variant === 'filterTrigger')
    Object.assign(variables, {
      '--button-height': '40px',
      '--button-padding-x': '14px',
      '--button-radius': '46.8px',
      '--button-border-width': '0.9px',
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
            size:
              size === 'short' || size === 'sm' || size === 'md' || size === 'lg' ? size : 'tall',
            fullWidth,
            language,
            unframed,
          }),
          variant === 'secondary' && secondaryContentColor,
          variant === 'link' && { textDecoration: 'underline', textUnderlineOffset: '3px' },
          social &&
            social.appearance !== 'signup' &&
            socialLogin.raw({ provider: social.provider }),
        ),
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <span className={css(content, variant === 'plain' && { justifyContent: 'flex-start' })}>
        {iconLeft ? <Icon name={iconLeft} size={iconSize} color={iconColor} /> : null}
        {labelTypographyVariant ? (
          <Typography
            as="span"
            variant={labelTypographyVariant}
            // The former count wrapper kept the outer scale independent of its label.
            language={loadMore ? 'en' : undefined}
            weight={unframed || variant === 'chip' ? 'medium' : undefined}
            style={{ color: 'inherit' }}
          >
            {resolvedChildren}
          </Typography>
        ) : (
          resolvedChildren
        )}
        {iconRight ? <Icon name={iconRight} size={iconSize} color={iconColor} /> : null}
        {social ? <Icon name={social.provider} size={18} /> : null}
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
    | 'colorway'
    | 'language'
    | 'fullWidth'
    | 'iconLeft'
    | 'iconRight'
    | 'iconSize'
    | 'iconColor'
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
