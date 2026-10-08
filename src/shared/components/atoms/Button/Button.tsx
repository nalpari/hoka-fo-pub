'use client';

import { Button as BaseButton } from '@base-ui/react/button';
import { forwardRef } from 'react';
import type { ButtonHTMLAttributes, CSSProperties, ReactElement, ReactNode } from 'react';
import { Link, type LinkProps } from 'react-router-dom';
import { css, cva } from 'styled-system/css';

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
    '--button-icon-size': '16px',
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
          '--button-height': '40px',
          '--button-padding-x': '16px',
          '--button-label-size': '14px',
        },
      },
      wide: {},
      compact: {
        '--button-height': '40px',
        '--button-padding-x': '16px',
        '--button-label-size': '14px',
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

const content = css({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  w: '100%',
  gap: 'var(--button-content-gap)',
  px: 'var(--button-padding-x)',
  minH: 'var(--button-height)',
  whiteSpace: 'nowrap',
});

const label = css({
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

export type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'secondaryInverse'
  | 'bottomSheetPrimary'
  | 'ghost'
  | 'brand'
  | 'link'
  | 'filterTrigger'
  | 'headerSearch';

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  tone?: ButtonVariant;
  density?: 'auto' | 'wide' | 'compact';
  colorway?: 'black' | 'white';
  language?: 'kr' | 'en';
  /** Legacy sizing; explicit density takes precedence. */
  size?: 'sm' | 'md' | 'lg';
  height?: 'short' | 'tall';
  fullWidth?: boolean;
  icon?: ReactNode;
  loading?: boolean;
  invalid?: boolean;
  render?: ReactElement;
  nativeButton?: boolean;
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  {
    variant = 'secondary',
    tone,
    density,
    colorway = 'black',
    language = 'kr',
    size,
    height,
    fullWidth = false,
    loading = false,
    invalid = false,
    icon,
    className,
    children,
    type = 'button',
    style,
    disabled,
    ...props
  },
  ref,
) {
  const resolvedVariant = tone ?? variant;
  const primary = resolvedVariant === 'primary' || resolvedVariant === 'bottomSheetPrimary';
  const white = colorway === 'white';
  const unframed = resolvedVariant === 'link' || resolvedVariant === 'ghost';
  const inverseLegacy = resolvedVariant === 'secondaryInverse';
  const resolvedDensity =
    density ??
    (height
      ? height === 'tall'
        ? 'wide'
        : 'compact'
      : size
        ? size === 'lg'
          ? 'wide'
          : 'compact'
        : 'auto');
  const variables: Record<string, string> = {
    '--button-bg':
      primary || inverseLegacy
        ? white
          ? 'var(--color-white-000)'
          : 'var(--color-black-100)'
        : white
          ? 'transparent'
          : 'var(--color-white-000)',
    '--button-color':
      primary || inverseLegacy
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
    '--button-border-width': primary || inverseLegacy ? '0px' : '1px',
    '--button-border-color': white ? 'var(--color-white-000)' : 'var(--color-black-100)',
    '--button-border-width-hover': white && !primary ? '2px' : '0px',
    '--button-focus-ring': white && !primary ? 'var(--color-white-000)' : 'var(--color-black-40)',
    '--button-disabled-bg': unframed ? 'transparent' : 'var(--color-black-40)',
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
  if (resolvedVariant === 'link')
    Object.assign(variables, {
      '--button-height': 'auto',
      '--button-padding-x': '0px',
      '--button-label-weight': '500',
    });
  if (size === 'sm' && resolvedVariant === 'link') variables['--button-label-size'] = '12px';
  if (resolvedVariant === 'brand')
    Object.assign(variables, {
      '--button-bg': 'var(--color-blue-100)',
      '--button-color': 'var(--color-white-000)',
      '--button-border-width': '0px',
    });
  if (resolvedVariant === 'filterTrigger')
    Object.assign(variables, {
      '--button-height': '32.2px',
      '--button-padding-x': '14px',
      '--button-radius': '46.8px',
      '--button-border-width': '0.9px',
      '--button-label-size': '14px',
    });
  if (resolvedVariant === 'headerSearch')
    Object.assign(variables, {
      '--button-height': '36px',
      '--button-padding-x': '15px',
      '--button-radius': '999px',
      '--button-label-size': '14px',
      '--button-label-weight': '400',
    });
  if (invalid) variables['--button-border-color'] = 'var(--color-red-100)';
  return (
    <BaseButton
      {...props}
      ref={ref}
      aria-busy={loading || undefined}
      disabled={disabled || loading}
      type={type}
      style={{ ...variables, ...style } as CSSProperties}
      className={[
        button({
          density: resolvedDensity,
          fullWidth: fullWidth || resolvedVariant === 'bottomSheetPrimary',
          language,
          unframed,
        }),
        resolvedVariant === 'link'
          ? css({ textDecoration: 'underline', textUnderlineOffset: '3px' })
          : '',
        resolvedVariant === 'headerSearch' ? css({ w: '178px' }) : '',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <span className={frame}>
        <span
          className={[
            content,
            resolvedVariant === 'headerSearch' ? css({ justifyContent: 'space-between' }) : '',
          ]
            .filter(Boolean)
            .join(' ')}
        >
          <span className={label}>{children}</span>
          {icon ? <span className={iconStyle}>{icon}</span> : null}
        </span>
      </span>
    </BaseButton>
  );
});

export type ButtonLinkProps = Pick<
  LinkProps,
  'to' | 'replace' | 'state' | 'relative' | 'preventScrollReset' | 'viewTransition'
> &
  Pick<
    ButtonProps,
    | 'className'
    | 'style'
    | 'variant'
    | 'size'
    | 'height'
    | 'density'
    | 'colorway'
    | 'language'
    | 'fullWidth'
    | 'icon'
    | 'loading'
    | 'invalid'
  > & {
    children: ReactNode;
  };

/** A navigation link with the same variants and focus treatment as Button. */
export function ButtonLink({
  to,
  children,
  replace,
  state,
  relative,
  preventScrollReset,
  viewTransition,
  ...buttonProps
}: ButtonLinkProps) {
  return (
    <Button
      {...buttonProps}
      nativeButton={false}
      render={
        <Link
          to={to}
          replace={replace}
          state={state}
          relative={relative}
          preventScrollReset={preventScrollReset}
          viewTransition={viewTransition}
        />
      }
    >
      {children}
    </Button>
  );
}
