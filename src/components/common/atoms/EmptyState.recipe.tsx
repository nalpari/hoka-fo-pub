import { css, sva } from 'styled-system/css';

const historyRoot = {
  minH: '795px',
  pt: '160px',
  pb: '0',
  justifyContent: 'flex-start',
  _mobile: {
    minH: 'calc(100svh - var(--layout-site-header-height) - 106px)',
    py: '0',
    justifyContent: 'center',
  },
} as const;

const productHistoryRoot = {
  flex: '1',
  pt: '160px',
  pb: '0',
  justifyContent: 'flex-start',
  _mobile: { py: '0', justifyContent: 'center' },
} as const;

export const emptyStateRecipe = sva({
  slots: ['root', 'text', 'title', 'description', 'icon', 'action', 'actionContent'],
  base: {
    root: { textAlign: 'center', _mobile: { px: '3' } },
    icon: {
      w: '32px',
      h: '32px',
      placeItems: 'center',
      border: '1px solid var(--color-black-40)',
      borderRadius: 'full',
      color: 'var(--color-text-tertiary)',
    },
    action: { mt: '2' },
  },
  variants: {
    variant: {
      standard: {
        root: {
          gap: '2',
          w: '100%',
          pt: '24',
          pb: '40',
          px: '4',
          bg: 'white.0',
          color: 'black.100',
        },
      },
      minimal: { root: { gap: '2', minH: '180px', pt: '42px' } },
      plain: {},
      page: {
        root: {
          alignItems: 'center',
          justifyContent: 'center',
          gap: '4',
          w: '100%',
          py: '160px',
          px: '3',
          color: 'black.100',
          _mobile: { py: '8' },
        },
        text: { gap: '4', w: '100%', maxW: '520px', _mobile: { maxW: 'none' } },
      },
      content: {
        root: {
          alignItems: 'center',
          justifyContent: 'center',
          gap: '4',
          w: '100%',
          minH: '267px',
          py: '0',
          px: '3',
          color: 'black.100',
          _mobile: { minH: '154px' },
        },
        text: { gap: '4', w: '100%', maxW: '320px', _mobile: { maxW: 'none' } },
      },
    },
    layout: {
      default: {},
      table: {},
      cart: {
        root: {
          w: '520px',
          maxW: '100%',
          alignSelf: 'center',
          alignItems: 'center',
          gap: '40px',
          pt: '0',
          pb: '0',
          px: '0',
          textAlign: 'start',
          _mobile: { w: '343px', px: '0', gap: '32px' },
        },
        text: { gap: '16px', alignItems: 'center' },
        actionContent: {
          w: '100%',
          gap: '2',
          justifyContent: 'center',
          _mobile: { flexDirection: 'column' },
          '& > div': { w: '180px', _mobile: { w: '100%' } },
        },
      },
      claimHistory: {
        root: {
          h: '267px',
          py: '0',
          px: '0',
          display: 'grid',
          placeItems: 'center',
          textAlign: 'start',
          borderBottom: '1px solid #E9EAEB',
          _mobile: { h: 'auto', py: '96px', px: '0', borderBottom: '0' },
        },
      },
      history: { root: productHistoryRoot },
      wishlist: { root: productHistoryRoot },
      restock: { root: productHistoryRoot },
      address: {
        root: { ...historyRoot, _mobile: { ...historyRoot._mobile, mt: '-24px' } },
        actionContent: { w: '180px', _mobile: { w: '100%' } },
      },
      embeddedAddress: {
        actionContent: { w: '180px', _mobile: { w: '100%' } },
        root: {
          minH: '0',
          pt: '8',
          pb: '0',
          justifyContent: 'flex-start',
          _mobile: { mt: '0', py: '0', minH: '0', justifyContent: 'center' },
        },
      },
      reviews: {
        root: {
          minH: '755px',
          pt: '160px',
          pb: '0',
          justifyContent: 'flex-start',
          _mobile: {
            py: '0',
            minH: 'calc(100svh - var(--layout-site-header-height) - 186px)',
            justifyContent: 'center',
          },
        },
      },
      catalog: {
        root: {
          justifyContent: 'flex-start',
          pt: '24',
          pb: '40',
          px: '4',
          _mobile: {
            py: '0',
            pt: '24',
            pb: '40',
            px: 'calc(var(--layout-mobile-inline-gutter) + 12px)',
          },
        },
      },
      search: {
        root: {
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '16px',
          minH: '470px',
          pt: '160px',
          _mobile: {
            minH: 'calc(100svh - var(--layout-site-header-height) - 120px)',
            py: '96px',
            justifyContent: 'center',
          },
        },
        title: { w: '100%', maxW: '500px' },
        description: { w: '100%', maxW: '520px', _mobile: { maxW: '320px' } },
      },
      notices: {
        root: {
          minH: '180px',
          pt: '42px',
          _mobile: {
            borderTop: '1px solid #E9EAEB',
            borderBottom: '1px solid #E9EAEB',
          },
        },
      },
      inquiryPreview: {},
      inquiries: {
        root: {
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
          alignItems: 'center',
          justifyContent: 'center',
          minH: '427px',
          _mobile: { minH: '190px' },
        },
      },
      // Preserve the measured zero padding; the former spacing token 15 was not generated.
      faq: { root: { py: '0' } },
      orderSummary: { root: { borderBottom: '1px solid var(--colors-black-20)' } },
      orders: {
        root: {
          h: '267px',
          pt: '0',
          pb: '0',
          alignItems: 'center',
          justifyContent: 'center',
          borderBottom: '1px solid #E9EAEB',
          _mobile: {
            h: 'auto',
            pt: '96px',
            pb: '160px',
            alignItems: 'stretch',
            justifyContent: 'normal',
            borderBottom: '0',
          },
        },
        title: {
          '&&': {
            fontSize: '16px',
            fontWeight: 'normal',
            lineHeight: '1.5',
            maxW: '320px',
            color: 'var(--color-text-subtle)',
            _mobile: {
              fontSize: '14px',
              fontWeight: 'normal',
              lineHeight: '1.5',
              maxW: 'none',
            },
          },
        },
      },
      launch: {
        root: { py: '0', _mobile: { py: '0', minH: '340px' } },
        // Keep the current mobile weight explicitly instead of relying on a Typography cascade conflict.
        title: {
          '&&': {
            fontSize: '22px',
            fontWeight: '900',
            lineHeight: '1.2',
            _mobile: { fontSize: '22px', fontWeight: '600' },
          },
        },
        description: {
          '&&': {
            fontSize: '16px',
            fontWeight: '400',
            lineHeight: '1.5',
            _mobile: { fontSize: '14px' },
          },
        },
      },
      runningSession: {
        root: {
          h: '516px',
          pt: '0',
          pb: '0',
          px: '0',
          gap: '24px',
          alignItems: 'center',
          justifyContent: 'center',
          _mobile: { h: '504px', px: 'calc(var(--layout-mobile-inline-gutter) + 12px)' },
        },
        title: {
          '&&': { fontFamily: 'var(--font-family-korean)' },
          _mobile: { color: 'black.60' },
        },
      },
      productInquiry: {
        title: {
          display: 'flex',
          minH: '120px',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'start',
        },
      },
      inquiryBoard: {
        title: {
          py: '48px',
          textAlign: 'center',
          borderBottom: '1px solid var(--color-border-default)',
        },
      },
    },
    hasAction: { true: {}, false: {} },
  },
  compoundVariants: [
    { variant: 'page', hasAction: true, css: { root: { gap: '8' } } },
    {
      variant: 'plain',
      layout: ['table', 'notices', 'claimHistory', 'orderSummary'],
      css: {
        root: {
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          h: 'auto',
          minH: '220px',
          py: '0',
          _mobile: { h: '120px', minH: '120px', py: '0', px: '12px' },
        },
        title: { w: '100%', maxW: '320px', textAlign: 'center' },
        description: { w: '100%', maxW: '320px', textAlign: 'center' },
      },
    },
    {
      variant: 'plain',
      layout: 'notices',
      css: { root: { _mobile: { h: '200px', minH: '200px' } } },
    },
  ],
  defaultVariants: { variant: 'standard', layout: 'default', hasAction: false },
});

export type EmptyStateLayout = NonNullable<
  NonNullable<Parameters<typeof emptyStateRecipe>[0]>['layout']
>;

const largeMobileTitle = {
  _mobile: { fontSize: 'var(--font-sizes-20)', fontWeight: 'bold' },
} as const;

const bodyTitle = {
  fontSize: 'var(--font-sizes-16)',
  fontWeight: 'normal',
  lineHeight: 'body',
  _mobile: { fontSize: 'var(--font-sizes-14)', fontWeight: 'normal' },
} as const;

const descriptionMobile = { _mobile: { fontSize: 'var(--font-sizes-14)' } } as const;

const tertiaryBody = { ...bodyTitle, color: 'var(--color-text-tertiary)' } as const;

const emptyStateTypographyRecipe = sva({
  slots: ['title', 'description'],
  base: {
    title: {
      fontFamily: 'hoka',
      transform: 'translateY(1px)',
      color: 'inherit',
      fontSize: 'var(--font-sizes-22)',
      fontWeight: 'black',
      lineHeight: 'hoka',
      letterSpacing: '0',
      _mobile: { fontSize: 'var(--font-sizes-16)', fontWeight: 'bold' },
    },
    description: {
      fontFamily: 'hoka',
      transform: 'translateY(1px)',
      color: 'inherit',
      fontSize: 'var(--font-sizes-16)',
      fontWeight: 'normal',
      lineHeight: 'body',
      letterSpacing: '0',
    },
  },
  variants: {
    titleKorean: {
      true: {
        title: {
          fontFamily: 'korean',
          lineHeight: 'koreanHeading',
          letterSpacing: 'korean',
          _mobile: { fontWeight: 'semibold' },
        },
      },
      false: {},
    },
    descriptionKorean: {
      true: { description: { fontFamily: 'korean', letterSpacing: 'korean' } },
      false: {},
    },
    layout: {
      default: {},
      table: { title: bodyTitle },
      cart: {
        title: {
          fontFamily: 'korean',
          fontStyle: 'normal',
          fontSize: '22px',
          fontWeight: '900',
          lineHeight: '1.2',
          letterSpacing: '-0.02em',
          textAlign: 'center',
          color: 'black.100',
          _mobile: { fontSize: '20px', fontWeight: '700' },
        },
      },
      claimHistory: {
        title: {
          ...bodyTitle,
          maxW: '320px',
          lineHeight: '1.5',
          textAlign: 'center',
          color: 'var(--color-text-subtle)',
          _mobile: { ...bodyTitle._mobile, maxW: 'none', lineHeight: 'body' },
        },
      },
      history: { title: largeMobileTitle, description: descriptionMobile },
      wishlist: { title: largeMobileTitle, description: descriptionMobile },
      restock: { title: largeMobileTitle, description: descriptionMobile },
      address: { title: largeMobileTitle, description: descriptionMobile },
      embeddedAddress: { title: largeMobileTitle, description: descriptionMobile },
      reviews: { title: largeMobileTitle },
      catalog: {},
      search: {
        title: {
          fontSize: '22px',
          fontWeight: '900',
          lineHeight: '1.2',
          color: 'black.100',
          _mobile: { fontSize: '20px', fontWeight: '700' },
        },
        description: {
          ...bodyTitle,
          lineHeight: '1.5',
          color: '#4D4D4D',
        },
      },
      notices: { title: { ...bodyTitle, color: 'var(--color-text-subtle)' } },
      inquiries: { title: tertiaryBody },
      inquiryPreview: { title: tertiaryBody },
      faq: {
        title: {
          ...tertiaryBody,
          fontSize: 'var(--font-sizes-14)',
          _mobile: { fontSize: 'var(--font-sizes-12)', fontWeight: 'normal' },
        },
      },
      orderSummary: { description: descriptionMobile },
      orders: {},
      launch: {},
      runningSession: { title: largeMobileTitle },
      productInquiry: {
        title: {
          ...bodyTitle,
          color: 'var(--color-text-primary)',
          _mobile: { fontSize: 'var(--font-sizes-16)', fontWeight: 'normal' },
        },
      },
      inquiryBoard: { title: { ...tertiaryBody, fontSize: 'var(--font-sizes-14)' } },
    },
  },
  // Apply language defaults before the layout's explicit responsive type scale.
  defaultVariants: { titleKorean: false, descriptionKorean: false, layout: 'default' },
});

type EmptyStateRecipeOptions = NonNullable<Parameters<typeof emptyStateRecipe>[0]>;

// Keep legacy Typography overrides separate from recipe-owned type scales before generating classes.
export function getEmptyStateStyles(
  options: EmptyStateRecipeOptions,
  text: {
    titleKorean: boolean;
    descriptionKorean: boolean;
    customTitle: boolean;
    customDescription: boolean;
  },
) {
  const slots = emptyStateRecipe.raw(options);
  const typography = emptyStateTypographyRecipe.raw({
    layout: options.layout ?? 'default',
    titleKorean: text.titleKorean,
    descriptionKorean: text.descriptionKorean,
  });
  return {
    ...slots,
    title: css.raw(text.customTitle ? {} : typography.title, slots.title),
    description: css.raw(text.customDescription ? {} : typography.description, slots.description),
  };
}
