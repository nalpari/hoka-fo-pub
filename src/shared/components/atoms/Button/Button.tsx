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
  _disabled: { cursor: 'not-allowed' },
  _focusVisible: {
    outline: '4px solid var(--button-focus-ring, var(--color-focus-ring, var(--focus-ring)))',
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
    _hover: {
      bg: 'var(--button-bg-hover, var(--button-bg, var(--color-action-secondary-bg)))',
      color: 'var(--button-color-hover, var(--button-color, var(--color-action-secondary-color)))',
      borderColor:
        'var(--button-border-color-hover, var(--button-border-color, var(--border-strong)))',
    },
    '&:active': {
      bg: 'var(--button-bg-active, var(--button-bg, var(--color-action-secondary-bg)))',
      color: 'var(--button-color-active, var(--button-color, var(--color-action-secondary-color)))',
    },
  },
  variants: {
    variant: {
      primary: {},
      secondary: { border: '0!', borderRadius: '52px' },
      secondaryInverse: { border: '0!', borderRadius: '52px' },
      bottomSheetPrimary: { border: '0!', borderRadius: '52px' },
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
        h: '12',
        minH: '12',
        py: '3',
        px: '6',
        _mobile: {
          h: '10',
          minH: '10',
          maxH: '10',
          py: '3',
          px: '4',
        },
      },
      secondaryInverse: {
        h: '12',
        minH: '12',
        py: '3',
        px: '6',
        _mobile: {
          h: '10',
          minH: '10',
          maxH: '10',
          py: '3',
          px: '4',
        },
      },
      bottomSheetPrimary: {
        h: '12',
        minH: '12',
        py: '3',
        px: '6',
      },
      ghost: {},
      brand: {},
      link: {
        h: 'auto!',
        minH: 'auto!',
        py: '0!',
        px: '0!',
        _mobile: {
          h: 'auto!',
          minH: 'auto!',
          py: '0!',
          px: '0!',
        },
      },
      filterTrigger: {
        h: 'var(--button-height)',
        minH: 'var(--button-height)',
        py: '2',
      },
      headerSearch: {
        h: 'var(--button-height)',
        minH: 'var(--button-height)',
        w: '100%',
        justifyContent: 'space-between',
        py: '1.5',
      },
    },
    size: {
      sm: { minH: '8', px: '2.5' },
      md: {},
      lg: { minH: '12', px: '22px' },
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
  base: {
    color: 'inherit',
    fontFamily: 'var(--font-family-base)',
    fontSize: 'var(--button-label-size, 16px)',
    fontWeight: 'var(--button-label-weight, 500)',
    lineHeight: 'var(--button-label-line-height, 1.3)',
    letterSpacing: 'var(--button-label-letter-spacing, 0)',
  },
  variants: {
    variant: {
      primary: {},
      secondary: {
        '--button-label-size': '16px',
        '--button-label-weight': '500',
      },
      secondaryInverse: {
        '--button-label-size': '16px',
        '--button-label-weight': '500',
      },
      bottomSheetPrimary: {
        '--button-label-size': '16px',
        '--button-label-weight': '500',
      },
      ghost: {},
      brand: {},
      link: {
        // '--button-label-size': '16px',
        '--button-label-weight': '500',
        textDecoration: 'underline',
        textDecorationThickness: '1px',
        textUnderlineOffset: '3px',
        _mobile: { textUnderlineOffset: '2px' },
      },
      filterTrigger: {
        '--button-label-size': '14px',
        '--button-label-weight': '500',
      },
      headerSearch: {
        display: 'flex',
        flex: '1 0 0',
        minW: '0',
        color: 'var(--color-black-60)',
        '--button-label-size': '14px',
        '--button-label-weight': '400',
      },
    },
    size: {
      sm: { '--button-label-size': '12px' },
      md: { '--button-label-size': '14px' },
      lg: { '--button-label-size': '16px' },
    },
  },
});

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?:
    | 'primary'
    | 'secondary'
    | 'secondaryInverse'
    | 'bottomSheetPrimary'
    | 'ghost'
    | 'brand'
    | 'link'
    | 'filterTrigger'
    | 'headerSearch';
  size?: 'sm' | 'md' | 'lg';
  height?: 'short' | 'tall';
  tone?:
    | 'primary'
    | 'secondary'
    | 'secondaryInverse'
    | 'bottomSheetPrimary'
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
    '--button-bg': 'var(--button-primary-bg)',
    '--button-bg-hover': 'var(--button-primary-bg-hover)',
    '--button-bg-active': 'var(--button-primary-bg)',
    '--button-color': 'var(--button-primary-fg)',
    '--button-color-hover': 'var(--button-primary-fg)',
    '--button-border-color': 'var(--button-primary-bg)',
    '--button-border-color-hover': 'var(--button-primary-bg-hover)',
  } as CSSProperties,
  secondary: {
    '--button-bg': 'var(--button-secondary-bg)',
    '--button-bg-hover': 'var(--button-secondary-bg-hover)',
    '--button-bg-active': 'var(--button-primary-bg)',
    '--button-color': 'var(--button-secondary-fg)',
    '--button-color-hover': 'var(--button-secondary-fg-hover)',
    '--button-border-color': 'var(--button-secondary-fg)',
    '--button-border-color-hover': 'var(--button-secondary-bg-hover)',
  } as CSSProperties,
  secondaryInverse: {
    '--button-bg': 'var(--button-primary-bg)',
    '--button-bg-hover': 'var(--button-primary-bg-hover)',
    '--button-color': 'var(--button-primary-fg)',
    '--button-color-hover': 'var(--button-primary-fg)',
    '--button-border-color': 'var(--button-primary-bg)',
  } as CSSProperties,
  bottomSheetPrimary: {
    '--button-bg': 'var(--button-primary-bg)',
    '--button-bg-hover': 'var(--button-primary-bg-hover)',
    '--button-color': 'var(--button-primary-fg)',
    '--button-color-hover': 'var(--button-primary-fg)',
    '--button-border-color': 'var(--button-primary-bg)',
  } as CSSProperties,
  ghost: {
    '--button-bg': 'var(--color-action-ghost-bg, transparent)',
    '--button-color': 'var(--color-action-ghost-color, var(--color-black-100))',
    '--button-border-color': 'var(--color-action-ghost-border, transparent)',
  } as CSSProperties,
  brand: {
    '--button-bg': 'var(--color-blue-100)',
    '--button-bg-hover': 'var(--button-primary-bg-hover)',
    '--button-color': 'var(--color-white-000)',
    '--button-color-hover': 'var(--color-white-000)',
    '--button-border-color': 'var(--color-blue-100)',
  } as CSSProperties,
  link: {
    '--button-bg': 'transparent',
    '--button-color': 'var(--color-action-underline-color, var(--color-black-100))',
    '--button-border-color': 'transparent',
  } as CSSProperties,
  filterTrigger: {
    '--button-bg': 'var(--color-white-000)',
    '--button-color': 'var(--color-black-100)',
    '--button-border-color': 'var(--color-black-100)',
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
    height = 'short',
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
  const isFullWidth = fullWidth || resolvedVariant === 'bottomSheetPrimary';
  const label = <span className={buttonLabel({ variant: resolvedVariant, size })}>{children}</span>;

  return (
    <BaseButton
      {...props}
      ref={ref}
      aria-busy={loading || undefined}
      disabled={disabled || loading}
      type={type}
      style={
        {
          '--button-height':
            height === 'tall' ? 'var(--button-height-tall)' : 'var(--button-height-short)',
          '--button-border-width': '1px',
          '--button-radius': 'var(--button-radius-pill)',
          ...variableStyles[resolvedVariant],
          ...style,
        } as CSSProperties
      }
      className={[button, isFullWidth ? buttonFullWidth : '', className].filter(Boolean).join(' ')}
    >
      <span
        className={buttonFrame({
          fullWidth: isFullWidth,
          invalid,
          variant: resolvedVariant,
        })}
      >
        <span
          className={buttonContent({
            fullWidth: isFullWidth,
            size: resolvedVariant === 'link' ? 'md' : size,
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
    | 'className'
    | 'style'
    | 'variant'
    | 'size'
    | 'height'
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
