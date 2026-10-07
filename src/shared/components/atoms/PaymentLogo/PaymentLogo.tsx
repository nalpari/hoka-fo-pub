import type { CSSProperties, ImgHTMLAttributes } from 'react';
import { css } from 'styled-system/css';

const paymentLogo = css({
  display: 'block',
  flexShrink: '0',
  width: 'var(--payment-logo-width, auto)',
  height: 'auto',
  maxWidth: '100%',
  objectFit: 'contain',
});

const paymentLogoFiles: Record<PaymentLogoProvider, Record<string, string>> = {
  americanExpress: { default: 'american-express.svg' },
  applePay: { default: 'apple-pay.svg' },
  afterpay: { default: 'afterpay.svg' },
  clearpay: {
    black: 'clearpay-black.svg',
    blackMint: 'clearpay-black-mint.svg',
  },
  googlePay: { default: 'google-pay.svg' },
  klarna: {
    old: 'klarna-old.svg',
    colored: 'klarna-colored.svg',
    noBackground: 'klarna-no-background.svg',
  },
  mastercard: { default: 'mastercard.svg' },
  payNow: { default: 'pay-now.svg' },
  paypal: { default: 'paypal.svg' },
  strutfit: { default: 'strutfit.svg' },
  visa: {
    black: 'visa-black.svg',
    colored: 'visa-colored.svg',
  },
};

const paymentLogoDefaults: Record<PaymentLogoProvider, string> = {
  americanExpress: 'default',
  applePay: 'default',
  afterpay: 'default',
  clearpay: 'black',
  googlePay: 'default',
  klarna: 'noBackground',
  mastercard: 'default',
  payNow: 'default',
  paypal: 'default',
  strutfit: 'default',
  visa: 'black',
};

const paymentLogoLabels: Record<PaymentLogoProvider, string> = {
  americanExpress: 'American Express',
  applePay: 'Apple Pay',
  afterpay: 'Afterpay',
  clearpay: 'Clearpay',
  googlePay: 'Google Pay',
  klarna: 'Klarna',
  mastercard: 'Mastercard',
  payNow: 'Pay Now',
  paypal: 'PayPal',
  strutfit: 'Strutfit',
  visa: 'Visa',
};

export type PaymentLogoProvider =
  | 'americanExpress'
  | 'applePay'
  | 'afterpay'
  | 'clearpay'
  | 'googlePay'
  | 'klarna'
  | 'mastercard'
  | 'payNow'
  | 'paypal'
  | 'strutfit'
  | 'visa';

type PaymentLogoBaseProps = Omit<ImgHTMLAttributes<HTMLImageElement>, 'alt' | 'src'> & {
  alt?: string;
  size?: CSSProperties['width'];
};

export type PaymentLogoProps =
  | (PaymentLogoBaseProps & {
      provider:
        | 'americanExpress'
        | 'applePay'
        | 'afterpay'
        | 'googlePay'
        | 'mastercard'
        | 'payNow'
        | 'paypal'
        | 'strutfit';
      variant?: never;
    })
  | (PaymentLogoBaseProps & { provider: 'clearpay'; variant?: 'black' | 'blackMint' })
  | (PaymentLogoBaseProps & {
      provider: 'klarna';
      variant?: 'old' | 'colored' | 'noBackground';
    })
  | (PaymentLogoBaseProps & { provider: 'visa'; variant?: 'black' | 'colored' });

/** Renders a payment-provider logo without changing the provider's supplied colors. */
export function PaymentLogo({
  alt,
  className,
  provider,
  size,
  style,
  variant,
  ...props
}: PaymentLogoProps) {
  const resolvedVariant = variant ?? paymentLogoDefaults[provider];
  const file = paymentLogoFiles[provider][resolvedVariant];

  return (
    <img
      {...props}
      alt={alt ?? paymentLogoLabels[provider]}
      className={[paymentLogo, className].filter(Boolean).join(' ')}
      src={`/images/payment/${file}`}
      style={
        {
          '--payment-logo-width': size,
          ...style,
        } as CSSProperties
      }
    />
  );
}
