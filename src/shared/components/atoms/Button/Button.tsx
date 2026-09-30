import { Button as BaseButton } from '@base-ui/react/button';
import { forwardRef } from 'react';
import type { ButtonHTMLAttributes, CSSProperties, ReactElement, ReactNode } from 'react';
import { Link, type LinkProps } from 'react-router-dom';
import { css, cva } from 'styled-system/css';

const button = css({
  display: 'inline-flex',
  border: '0',
  p: '0',
  bg: 'transparent',
  cursor: 'pointer',
  _disabled: { cursor: 'not-allowed', opacity: '0.55' },
  _focusVisible: {
    outline: '2px solid var(--color-focus-ring, var(--focus-ring))',
    outlineOffset: '2px',
  },
});

const buttonFullWidth = css({ w: '100%' });

const buttonFrame = cva({
  base: {
    display: 'inline-flex',
    border:
      'var(--button-border-width, 1px) solid var(--button-border-color, var(--border-strong))',
    borderRadius: 'var(--button-radius, var(--radius-sm, 0))',
    bg: 'var(--button-bg, var(--color-action-secondary-bg))',
    color: 'var(--button-color, var(--color-action-secondary-color))',
    transition: 'background-color 160ms ease, color 160ms ease, border-color 160ms ease',
  },
  variants: {
    variant: {
      primary: {},
      secondary: { border: '0!', borderRadius: '52px' },
      secondaryInverse: { border: '0!', borderRadius: '52px' },
      ghost: {},
      brand: {},
      link: {
        bg: 'transparent!',
        borderColor: 'transparent',
        color: 'var(--color-action-underline-color, #111)',
        border: '0!',
        borderRadius: '0',
      },
      filterTrigger: { borderRadius: 'var(--button-radius)' },
      headerSearch: { w: '178px' },
    },
    fullWidth: { true: { w: '100%' } },
    invalid: {
      true: {
        '--button-border-color': 'var(--color-danger-border, var(--color-error))',
      },
    },
  },
  defaultVariants: { variant: 'secondary' },
});

const buttonContent = cva({
  base: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    minH: 'var(--button-height, 40px)',
    px: 'var(--button-padding-x, 16px)',
    '--button-content-gap': '8px',
    '--button-icon-size': '16px',
    gap: 'var(--button-content-gap)',
    whiteSpace: 'nowrap',
    userSelect: 'none',
    _mobile: { '--button-content-gap': '6px' },
  },
  variants: {
    variant: {
      primary: {},
      secondary: {
        h: '48px',
        minH: '48px',
        py: '12px',
        px: '24px',
        _mobile: {
          h: '40px',
          minH: '40px',
          maxH: '40px',
          py: '12px',
          px: '16px',
        },
      },
      secondaryInverse: {
        h: '48px',
        minH: '48px',
        py: '12px',
        px: '24px',
        _mobile: {
          h: '40px',
          minH: '40px',
          maxH: '40px',
          py: '12px',
          px: '16px',
        },
      },
      ghost: {},
      brand: {},
      link: {
        h: 'auto!',
        minH: 'auto!',
        py: '0!',
        px: '0!',
      },
      filterTrigger: {
        h: 'var(--button-height)',
        minH: 'var(--button-height)',
        py: '8px',
      },
      headerSearch: {
        h: 'var(--button-height)',
        minH: 'var(--button-height)',
        w: '100%',
        justifyContent: 'space-between',
        py: '6px',
      },
    },
    size: {
      sm: { minH: '32px', px: '10px' },
      md: {},
      lg: { minH: '48px', px: '22px' },
    },
    fullWidth: { true: { w: '100%' } },
  },
  defaultVariants: { variant: 'secondary', size: 'md' },
});

const buttonIcon = css({
  display: 'flex',
  flexShrink: '0',
  w: 'var(--button-icon-size)',
  h: 'var(--button-icon-size)',
  color: 'inherit',
  '& > *': { w: '100%!', h: '100%!', color: 'inherit!' },
});

const buttonLabel = cva({
  base: { color: 'inherit', fontWeight: '600', lineHeight: '1' },
  variants: {
    variant: {
      primary: {},
      secondary: {
        fontSize: '16px',
        fontWeight: '600',
        lineHeight: '1.3',
        letterSpacing: '-0.02em',
        _mobile: { fontSize: '14px', fontWeight: '600' },
      },
      secondaryInverse: {
        fontSize: '16px',
        fontWeight: '600',
        lineHeight: '1.3',
        letterSpacing: '-0.02em',
        _mobile: { fontSize: '14px', fontWeight: '600' },
      },
      ghost: {},
      brand: {},
      link: {
        fontSize: '16px',
        fontWeight: '600',
        lineHeight: '1.3',
        letterSpacing: '-0.02em',
        textDecoration: 'underline',
        textDecorationThickness: '1px',
        textUnderlineOffset: '3px',
        _mobile: { fontSize: '14px', textUnderlineOffset: '2px' },
      },
      filterTrigger: {
        fontSize: '14px',
        fontWeight: '600',
        lineHeight: '1.3',
        letterSpacing: '-0.02em',
      },
      headerSearch: {
        display: 'flex',
        flex: '1 0 0',
        minW: '0',
        color: '#4d4d4d',
        fontSize: '14px',
        fontWeight: '400',
        lineHeight: '1.3',
        letterSpacing: '-0.02em',
      },
    },
    size: {
      sm: { fontSize: '12px' },
      md: {},
      lg: { fontSize: '16px' },
    },
  },
});

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?:
    | 'primary'
    | 'secondary'
    | 'secondaryInverse'
    | 'ghost'
    | 'brand'
    | 'link'
    | 'filterTrigger'
    | 'headerSearch';
  size?: 'sm' | 'md' | 'lg';
  tone?:
    | 'primary'
    | 'secondary'
    | 'secondaryInverse'
    | 'ghost'
    | 'brand'
    | 'link'
    | 'filterTrigger'
    | 'headerSearch';
  fullWidth?: boolean;
  icon?: ReactNode;
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
  secondaryInverse: {
    '--button-bg': 'var(--color-action-primary-bg, #111)',
    '--button-color': 'var(--color-action-primary-color, #fff)',
    '--button-border-color': 'var(--color-action-primary-border, var(--border-strong))',
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
    '--button-bg': 'transparent',
    '--button-color': 'var(--color-action-underline-color, #111)',
    '--button-border-color': 'transparent',
  } as CSSProperties,
  filterTrigger: {
    '--button-bg': '#fff',
    '--button-color': '#000',
    '--button-border-color': '#000',
    '--button-border-width': '0.9px',
    '--button-height': '32.2px',
    '--button-padding-x': '14px',
    '--button-radius': '46.8px',
    '--button-content-gap': '7.2px',
  } as CSSProperties,
  headerSearch: {
    '--button-bg': 'var(--hoka-white)',
    '--button-color': 'var(--hoka-black)',
    '--button-border-color': 'var(--hoka-black)',
    '--button-height': '36px',
    '--button-padding-x': '15px',
    '--button-radius': '999px',
  } as CSSProperties,
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  {
    variant = 'secondary',
    tone,
    size = 'md',
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
  }: ButtonProps,
  ref,
) {
  const resolvedVariant = tone ?? variant;
  const label = <span className={buttonLabel({ size, variant: resolvedVariant })}>{children}</span>;

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
      className={[button, fullWidth ? buttonFullWidth : '', className].filter(Boolean).join(' ')}
    >
      <span
        className={buttonFrame({
          fullWidth,
          invalid,
          variant: resolvedVariant,
        })}
      >
        <span
          className={buttonContent({
            fullWidth,
            size,
            variant: resolvedVariant,
          })}
        >
          {label}
          {icon ? <span className={buttonIcon}>{icon}</span> : null}
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
    'className' | 'style' | 'variant' | 'size' | 'fullWidth' | 'icon' | 'loading' | 'invalid'
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
