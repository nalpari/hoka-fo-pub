import type { ComponentPropsWithoutRef, ElementType } from 'react';
import { css } from 'styled-system/css';

type CardProps = ComponentPropsWithoutRef<'article'>;
type CardHeaderProps = ComponentPropsWithoutRef<'header'>;
type CardFooterProps = ComponentPropsWithoutRef<'footer'>;
type CardContentProps = ComponentPropsWithoutRef<'div'>;
type CardTitleProps = ComponentPropsWithoutRef<'h3'> & { as?: ElementType };
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
});


function withClassName(...classNames: Array<string | undefined>) {
  return classNames.filter(Boolean).join(' ');
}

function CardRoot({ className, ...props }: CardProps) {
  return <article {...props} className={withClassName(`card ${cardRoot}`, className)} />;
}

export function CardHeader({ className, ...props }: CardHeaderProps) {
  return <header {...props} className={withClassName('card__header', className)} />;
}

export function CardTitle({ as: TitleElement = 'h3', className, ...props }: CardTitleProps) {
  return <TitleElement {...props} className={withClassName('card__title', className)} />;
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
