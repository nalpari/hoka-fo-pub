import { Button as BaseButton } from '@base-ui/react/button';
import { forwardRef } from 'react';
import type { ButtonHTMLAttributes, CSSProperties, ReactElement, ReactNode } from 'react';
import { Link, type LinkProps } from 'react-router-dom';
import { cva } from 'styled-system/css';

const button = cva({
  base: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minH: 'var(--button-height, 40px)',
    border:
      'var(--button-border-width, 1px) solid var(--button-border-color, var(--border-strong))',
    borderRadius: 'var(--button-radius, var(--radius-sm, 0))',
    px: 'var(--button-padding-x, 16px)',
    bg: 'var(--button-bg, var(--color-action-secondary-bg))',
    color: 'var(--button-color, var(--color-action-secondary-color))',
    fontWeight: '600',
    lineHeight: '1',
    transition: 'background-color 160ms ease, color 160ms ease, border-color 160ms ease',
    cursor: 'pointer',
    whiteSpace: 'nowrap',
    textDecoration: 'none',
    userSelect: 'none',
    _disabled: {
      cursor: 'not-allowed',
      opacity: '0.55',
    },
    _focusVisible: {
      outline: '2px solid var(--color-focus-ring, var(--focus-ring))',
      outlineOffset: '2px',
    },
  },
  variants: {
    variant: {
      primary: {},
      secondary: {},
      ghost: {},
      brand: {},
      link: {
        h: 'var(--button-link-height)',
        minH: 'var(--button-link-min-height)',
        border: '0',
        borderRadius: 'var(--button-link-radius)',
        py: 'var(--button-link-padding-block)',
        px: 'var(--button-link-padding-inline)',
        bg: 'var(--button-link-bg)',
        color: 'var(--button-link-color)',
        fontFamily: 'var(--button-link-font-family)',
        fontSize: 'var(--button-link-font-size)',
        fontWeight: 'var(--button-link-font-weight)',
        lineHeight: 'var(--button-link-line-height)',
        letterSpacing: 'var(--button-link-letter-spacing)',
        _mobile: {
          h: 'var(--button-link-mobile-height)',
          minH: 'var(--button-link-mobile-min-height)',
          maxH: 'var(--button-link-mobile-max-height)',
          py: 'var(--button-link-mobile-padding-block)',
          px: 'var(--button-link-mobile-padding-inline)',
          fontSize: 'var(--button-link-mobile-font-size)',
          fontWeight: 'var(--button-link-mobile-font-weight)',
        },
      },
    },
    size: {
      sm: { minH: '32px', px: '10px', fontSize: '12px' },
      md: {},
      lg: { minH: '48px', px: '22px', fontSize: '16px' },
    },
    fullWidth: {
      true: { width: '100%' },
    },
    invalid: {
      true: {
        '--button-border-color': 'var(--color-danger-border, var(--color-error))',
      },
    },
    appearance: {
      default: {},
      underline: {
        bg: 'transparent',
        borderColor: 'transparent',
        px: '0',
        color: 'var(--color-action-underline-color, var(--color-action-secondary-color))',
      },
    },
  },
  defaultVariants: { variant: 'secondary', size: 'md', appearance: 'default' },
});

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary' | 'ghost' | 'brand' | 'link';
  size?: 'sm' | 'md' | 'lg';
  tone?: 'primary' | 'secondary' | 'ghost' | 'brand';
  appearance?: 'default' | 'underline';
  fullWidth?: boolean;
  loading?: boolean;
  invalid?: boolean;
  render?: ReactElement;
  nativeButton?: boolean;
};

const variableStyles: Record<NonNullable<ButtonProps['variant']>, CSSProperties> = {
  primary: {
    '--button-bg': 'var(--color-action-primary-bg, #111)',
    '--button-color': 'var(--color-action-primary-color, #fff)',
    '--button-border-color': 'var(--color-action-primary-border, var(--border-strong))',
  } as CSSProperties,
  secondary: {
    '--button-bg': 'var(--color-action-secondary-bg, #fff)',
    '--button-color': 'var(--color-action-secondary-color, #111)',
    '--button-border-color': 'var(--color-action-secondary-border, var(--border-strong))',
  } as CSSProperties,
  ghost: {
    '--button-bg': 'var(--color-action-ghost-bg, transparent)',
    '--button-color': 'var(--color-action-ghost-color, #111)',
    '--button-border-color': 'var(--color-action-ghost-border, transparent)',
  } as CSSProperties,
  brand: {
    '--button-bg': 'var(--color-action-brand-bg, #0082ca)',
    '--button-color': 'var(--color-action-brand-color, #fff)',
    '--button-border-color': 'var(--color-action-brand-border, #0082ca)',
  } as CSSProperties,
  link: {
    '--button-bg': 'var(--button-link-bg)',
    '--button-color': 'var(--button-link-color)',
    '--button-border-color': 'transparent',
  } as CSSProperties,
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  {
    variant = 'secondary',
    tone,
    size = 'md',
    appearance = 'default',
    fullWidth = false,
    loading = false,
    invalid = false,
    className,
    type = 'button',
    style,
    disabled,
    ...props
  }: ButtonProps,
  ref,
) {
  const resolvedVariant = tone ?? variant;

  return (
    <BaseButton
      {...props}
      ref={ref}
      aria-busy={loading || undefined}
      disabled={disabled || loading}
      type={type}
      style={
        {
          '--button-height': '40px',
          '--button-border-width': '1px',
          ...variableStyles[resolvedVariant],
          ...style,
        } as CSSProperties
      }
      className={[
        button({ variant: resolvedVariant, size, fullWidth, invalid, appearance }),
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    />
  );
});

export type ButtonLinkProps = Pick<
  LinkProps,
  'to' | 'replace' | 'state' | 'relative' | 'preventScrollReset' | 'viewTransition'
> &
  Pick<
    ButtonProps,
    'className' | 'variant' | 'size' | 'appearance' | 'fullWidth' | 'loading' | 'invalid'
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
