import { sva } from 'styled-system/css';

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

export const emptyStateRecipe = sva({
  slots: ['root', 'text', 'title', 'description', 'icon', 'action'],
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
      history: { root: historyRoot },
      wishlist: {
        root: {
          ...historyRoot,
          _mobile: {
            minH: 'calc(100svh - var(--layout-site-header-height) - 156px)',
            pt: '200px',
            pb: '0',
          },
        },
      },
      restock: { root: { ...historyRoot, _mobile: { ...historyRoot._mobile, mt: '-24px' } } },
      address: { root: { ...historyRoot, _mobile: { ...historyRoot._mobile, mt: '-24px' } } },
      embeddedAddress: {
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
      search: { root: { minH: '470px', pt: '158px', _mobile: { minH: 'auto', py: '96px' } } },
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
        title: {
          '&&': {
            fontSize: 'var(--font-sizes-14)',
            fontWeight: 'normal',
            lineHeight: 'body',
            color: 'var(--color-text-subtle)',
            _mobile: { fontWeight: 'normal' },
          },
        },
      },
      launch: {
        root: { py: '0', _mobile: { py: '0', minH: '340px' } },
        // Keep the current mobile weight explicitly instead of relying on a Typography cascade conflict.
        title: {
          '&&': {
            fontSize: '28px',
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
  compoundVariants: [{ variant: 'page', hasAction: true, css: { root: { gap: '8' } } }],
  defaultVariants: { variant: 'standard', layout: 'default', hasAction: false },
});

export type EmptyStateLayout = NonNullable<
  NonNullable<Parameters<typeof emptyStateRecipe>[0]>['layout']
>;
