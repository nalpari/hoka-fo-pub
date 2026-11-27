import { css } from 'styled-system/css';
import { contentFrame } from 'styled-system/patterns';

export const homeStyles = {
  layout: css({
    _mobile: {
      // Linear 375–768px interpolation; rem bounds preserve user font preferences.
      '--home-title-20': 'clamp(1.25rem, calc(0.65362595rem + 2.54452926vw), 1.875rem)',
      '--home-title-24': 'clamp(1.5rem, calc(0.78435115rem + 3.05343511vw), 2.25rem)',
      '--home-title-30': 'clamp(1.875rem, calc(0.98043893rem + 3.81679389vw), 2.8125rem)',
      '--home-title-40': 'clamp(2.5rem, calc(1.30725191rem + 5.08905852vw), 3.75rem)',
      '--home-body-12': 'clamp(0.75rem, calc(0.57108779rem + 0.76335878vw), 0.9375rem)',
      '--home-body-13': 'clamp(0.8125rem, calc(0.61867844rem + 0.82697201vw), 1.015625rem)',
      '--home-body-16': 'clamp(1rem, calc(0.76145038rem + 1.0178117vw), 1.25rem)',
      '--home-body-30': 'clamp(1.875rem, calc(1.42771947rem + 1.90839695vw), 2.34375rem)',
      '--home-body-40': 'clamp(2.5rem, calc(1.90362595rem + 2.54452926vw), 3.125rem)',
      '--home-pagination-dot': 'clamp(0.375rem, calc(0.19608779rem + 0.76335878vw), 0.5625rem)',
      '--home-pagination-active': 'clamp(2rem, calc(1.04580153rem + 4.07124682vw), 3rem)',
      '--home-pagination-gap': 'clamp(0.4375rem, calc(0.139313rem + 1.272265vw), 0.75rem)',
    },
  }),

  bestSellerMobileRail: css({
    w: '100vw',
    pr: '16px !important',
    overflow: 'visible!',
    '& .swiper-wrapper': { px: '11px' },
  }),

  bestSellerMobileSlide: css({
    // The 375px frame has 151px cards and 10px gaps.
    w: 'calc(40.2667vw + 10px)!',
    px: '5px!',
    '& > *': { w: '100%!' },
  }),

  bestSellerSection: css({
    '& > div': { gap: '20px' },
    '& h2': { lineHeight: '33.5px' },
    '& article.card': { gap: '12px' },
    '& article div:has(> [data-product-gender])': { gap: '0' },
    '& article div:has(> [data-product-price])': { gap: '10px' },
    '& [data-product-gender], & [data-product-name]': { lineHeight: '1.3' },
    '& [data-product-price] span': { lineHeight: '1.3', fontWeight: 'medium' },
    _mobile: {
      '& > div': { gap: '16px' },
      '& h2': { lineHeight: '31px', transform: 'translateY(-3px)' },
      '& article.card': { gap: '8px' },
      '& article div:has(> [data-product-gender])': { gap: '2px' },
      '& article div:has(> [data-product-price])': { gap: '4px' },
      '& [data-product-price] span': { fontSize: 'body.14' },
    },
  }),

  bestSellerTabRail: css({ '&&': { gap: '8px', _mobile: { gap: '6px' } } }),

  bestSellerTab: css({
    '&&': { height: '35px' },
    '& > span': { fontSize: 'body.16', lineHeight: '1.3' },
    _mobile: {
      '&&': { height: '30px', px: '15px' },
      '& > span': { fontSize: 'body.12' },
    },
  }),

  // 312px at a 375px viewport. The slide adds 8px gutters on both sides,
  // leaving a deliberate preview of the following card.
  categoryMobileSlide: css({
    w: 'calc(83.2vw + var(--spacing-4))!',
    '& > *': { w: '100%' },
  }),

  categorySection: css({
    '& h2': { lineHeight: '38.4px', transform: 'translateY(5.5px)' },
    _mobile: {
      '& > div': { gap: '16px' },
      '& h2': { lineHeight: '31px', transform: 'translateY(-3px)' },
    },
  }),

  categoryCard: css({
    '&&': { gap: '0' },
    '& h3': { textStyle: 'en-wide-h8B', lineHeight: '28px' },
    '& .card__header': { gap: '0', mt: '17px' },
    '& .card__footer': { mt: '18px' },
    '& .card__action a > span > span': { textStyle: 'ko-common-b4S', lineHeight: '1.3' },
    _mobile: {
      '& h3': { textStyle: 'en-compact-h6B', lineHeight: '23.04px' },
      '& .card__header': { mt: '16px' },
      '& .card__footer': { mt: '12.5px' },
      '& .card__action a > span > span': { textStyle: 'ko-common-b6S', lineHeight: '1.3' },
    },
  }),

  exploreSection: css({
    '& h2': { lineHeight: '34px' },
    _mobile: {
      '& > div': { gap: '16px' },
      '& h2': { lineHeight: '31px', transform: 'translateY(-3px)' },
    },
  }),

  exploreCard: css({
    '&&': { gap: '0' },
    '& h3': { textStyle: 'en-wide-h8B', lineHeight: '28px' },
    '& .card__header': { gap: '16px', mt: '17px' },
    '& .card__header p': { minH: '0' },
    '& .card__footer': { mt: '14.5px' },
    '& .card__action a > span > span': { textStyle: 'ko-common-b4S', lineHeight: '1.3' },
    _mobile: {
      '&&': { aspectRatio: '375 / 500', p: '16px 16px 50px' },
      // The mobile photo exports already include the designed gradient.
      '& .card__content > div[aria-hidden="true"]': { display: 'none' },
      '& h3': { textStyle: 'en-compact-h6B', lineHeight: '23.04px' },
      '& .card__header': { gap: '12.5px', mt: '0' },
      '& .card__header p': { lineHeight: '18.2px', whiteSpace: 'pre-line' },
      '& .card__footer': { mt: '16.5px' },
      '& .card__action': { gap: '8px' },
      '& .card__action a': {
        minH: 'var(--home-body-40, 40px)',
        '--button-padding-x': 'var(--home-body-16, 16px)',
      },
      '& .card__action a > span > span': { textStyle: 'ko-common-b6B', lineHeight: '1.3' },
    },
  }),

  exploreMobileCopy: css({ fontWeight: 'medium' }),

  heroTitle: css({
    '--hero-title-leading': '76.8px',
    m: '0',
    '&&': {
      fontSize: '80px',
      lineHeight: 'var(--hero-title-leading)',
      transform: 'translateY(-5.5px)',
    },
    _mobile: {
      '--hero-title-leading': '0.96',
      '&&': { fontSize: 'var(--home-title-40, 40px)', transform: 'translateY(-2.5px)' },
    },
  }),

  heroDescription: css({
    '--hero-description-offset': '-1px',
    m: '0',
    w: 'auto',
    transform: 'translateY(var(--hero-description-offset))',
    _mobile: {
      '--hero-description-offset': '2px',
      w: '100%',
      maxW: '100%',
      overflowWrap: 'anywhere',
      '&&': { lineHeight: '1.3' },
    },
  }),

  heroTechnology: css({ fontFamily: 'en' }),

  heroAction: css({
    '& > span > span': { textStyle: 'ko-common-b4S', lineHeight: '1.3' },
    _mobile: { '& > span > span': { textStyle: 'ko-common-b6B', lineHeight: '1.3' } },
  }),

  heroPaginationButton: css({
    '--hero-pagination-dot': '8px',
    '--hero-pagination-active-size': '42px',
    w: 'var(--hero-pagination-dot)',
    h: 'var(--hero-pagination-dot)',
    p: '0',
    border: '0',
    borderRadius: '50px',
    position: 'relative',
    overflow: 'hidden',
    bg: 'color-mix(in srgb, var(--color-white-000) 70%, transparent)',
    cursor: 'pointer',
    transition: 'width 200ms ease',
    '&[aria-pressed="true"]': {
      w: 'var(--hero-pagination-active-size)',
      bg: 'color-mix(in srgb, var(--color-white-000) 50%, transparent)',
    },
    _mobile: {
      '--hero-pagination-dot': 'var(--home-pagination-dot, 6px)',
      '--hero-pagination-active-size': 'var(--home-pagination-active, 32px)',
    },
    _focusVisible: { outline: '2px solid var(--color-text-inverse)', outlineOffset: '3px' },
  }),

  heroProgressBar: css({
    position: 'absolute',
    top: '0',
    bottom: '0',
    left: '0',
    borderRadius: 'inherit',
    bg: 'var(--color-white-000)',
    transitionProperty: 'width',
    transitionTimingFunction: 'linear',
  }),

  heroImage: css({ w: '100%', h: '100%', objectFit: 'cover' }),

  // The slide width includes both 8px gutters. The card itself reaches 253px at 375px.
  shoeFinderMobileSlide: css({
    w: 'calc(min(67.4667vw, 253px) + 16px)!',
    '& > *': { w: '100%' },
  }),

  shoeFinderCard: css({
    '--shoe-finder-text-gap': '14px',
    '--shoe-finder-text-inset': '28px',
    aspectRatio: '371 / 494',
    borderRadius: '10px',
    overflow: 'clip',
    // Allow longer descriptions to increase the height of a narrow card.
    '&&.card': { h: 'auto' },
    '& .card__content': { aspectRatio: '1 / 1', flexShrink: '0' },
    // The Figma text starts inside the square image frame on both platforms.
    '& .card__header': {
      mt: '-4.32%',
      pt: '0',
      px: 'var(--shoe-finder-text-inset)',
      gap: 'var(--shoe-finder-text-gap)',
      flexShrink: '0',
    },
    '& h3': { textStyle: 'en-wide-h8B', lineHeight: '30.72px' },
    '& .card__header p': { minH: '0' },
    '& .card__footer': { flexShrink: '0' },
    '& .card__action': {
      pt: '15.5px',
      px: 'var(--shoe-finder-text-inset)',
      pb: '4px',
    },
    '& .card__action a > span > span': { textStyle: 'ko-common-b4S', lineHeight: '1.3' },
    _mobile: {
      '--shoe-finder-text-gap': '11px',
      '--shoe-finder-text-inset': '16px',
      aspectRatio: '253 / 336.88',
      borderRadius: '8px',
      '& .card__header': { mt: '-10.39%', pt: '0', pr: '14px' },
      '& h3': { textStyle: 'en-compact-h6B', lineHeight: '23.04px' },
      '& .card__action': { pt: '10px' },
      '& .card__action a > span > span': { textStyle: 'ko-common-b6S', lineHeight: '1.3' },
    },
  }),

  heroCopyFrame: contentFrame({
    mobileWidth: 'calc(100% - var(--layout-mobile-content-inline-space))',
  }),

  heroMobileGradient: css({
    background:
      'linear-gradient(180deg, color-mix(in srgb, var(--color-black-100) 0%, transparent) 41.11%, color-mix(in srgb, var(--color-black-100) 30%, transparent) 76.91%)',
  }),
};
