import type { ComponentPropsWithoutRef } from 'react';
import { css } from 'styled-system/css';

type CardProps = ComponentPropsWithoutRef<'article'>;
type CardHeaderProps = ComponentPropsWithoutRef<'header'>;
type CardFooterProps = ComponentPropsWithoutRef<'footer'>;
type CardContentProps = ComponentPropsWithoutRef<'div'>;
type CardTitleProps = ComponentPropsWithoutRef<'h3'>;
type CardDescriptionProps = ComponentPropsWithoutRef<'p'>;
type CardActionProps = ComponentPropsWithoutRef<'div'>;

const cardFooter = css({
  p: '0 !important',
  bg: 'transparent !important',
  color: 'inherit !important',
  fontSize: 'inherit !important',
});

const cardRoot = css({
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
  '& .image': {
    position: 'relative',
    display: 'grid',
    h: '280px',
    placeItems: 'center',
    bg: '#eee',
    color: '#777',
  },
  '& em': {
    position: 'absolute',
    top: '8px',
    left: '8px',
    p: '4px',
    bg: '#111',
    color: '#fff',
    fontSize: '11px',
    fontStyle: 'normal',
  },
  '& small, & i': {
    color: '#666',
    fontSize: '12px',
  },
  _mobile: {
    '& .image': {
      h: '190px',
      fontSize: '12px',
    },
  },
});

function withClassName(baseClassName: string, className?: string) {
  return [baseClassName, className].filter(Boolean).join(' ');
}

function CardRoot({ className, ...props }: CardProps) {
  return <article {...props} className={withClassName(`card ${cardRoot}`, className)} />;
}

export function CardHeader({ className, ...props }: CardHeaderProps) {
  return <header {...props} className={withClassName('card__header', className)} />;
}

export function CardTitle({ className, ...props }: CardTitleProps) {
  return <h3 {...props} className={withClassName('card__title', className)} />;
}

export function CardDescription({ className, ...props }: CardDescriptionProps) {
  return <p {...props} className={withClassName('card__description', className)} />;
}

export function CardAction({ className, ...props }: CardActionProps) {
  return <div {...props} className={withClassName('card__action', className)} />;
}

export function CardContent({ className, ...props }: CardContentProps) {
  return <div {...props} className={withClassName('card__content', className)} />;
}

export function CardFooter({ className, ...props }: CardFooterProps) {
  return (
    <footer
      {...props}
      className={['card__footer', cardFooter, className].filter(Boolean).join(' ')}
    />
  );
}

export const Card = Object.assign(CardRoot, {
  Header: CardHeader,
  Title: CardTitle,
  Description: CardDescription,
  Action: CardAction,
  Content: CardContent,
  Footer: CardFooter,
});
