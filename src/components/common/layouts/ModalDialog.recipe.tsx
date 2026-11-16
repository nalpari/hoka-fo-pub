import { css, sva } from 'styled-system/css';
import type { SystemStyleObject } from 'styled-system/types';

const notice = {
  title: { fontWeight: '700', fontStyle: 'normal', color: 'black.100' },
  message: { fontStyle: 'normal', color: 'black.100' },
  description: { fontStyle: 'normal', color: 'black.100' },
  content: { p: '24px 32px 40px', _mobile: { p: '24px 16px' } },
  footer: {
    px: '32px',
    pb: '40px',
    _mobile: { px: '16px', pb: '24px' },
    '& button': {
      flexDirection: 'column',
      p: '12px 24px',
      w: '180px',
      maxW: '180px',
      h: '48px',
      minH: '48px',
      borderRadius: '52px',
      _mobile: { w: '100%', maxW: 'none', h: '44px', minH: '44px' },
    },
    '& button > span': { p: '0' },
    '& button > span > span': {
      fontFamily: 'korean',
      fontStyle: 'normal',
      fontWeight: '700',
      fontSize: '16px',
      lineHeight: '1.3',
      letterSpacing: '-0.02em',
      _mobile: { fontSize: '15px' },
    },
  },
} satisfies Record<string, SystemStyleObject>;

const contentModal = {
  header: { mb: '24px' },
  title: { fontWeight: '700', color: 'black.100' },
  content: {
    p: '0px 32px 40px',
    fontFamily: 'korean',
    fontSize: '14px',
    fontWeight: '400',
    lineHeight: '1.5',
    letterSpacing: '-0.02em',
    color: 'black.100',
    _mobile: { p: '0px 16px 32px' },
  },
  footer: {
    px: '32px',
    pb: '40px',
    _mobile: { px: '16px', pb: '24px' },
    '& button': {
      p: '12px 24px',
      w: '180px',
      maxW: '180px',
      h: '48px',
      minH: '48px',
      borderRadius: '52px',
      _mobile: { w: '100%', maxW: 'none', h: '42px', minH: '42px' },
    },
    '& button > span': { p: '0' },
    '& button > span > span': {
      fontFamily: 'korean',
      fontWeight: '400',
      fontSize: '16px',
      lineHeight: '1.3',
      letterSpacing: '-0.02em',
      _mobile: { fontSize: '15px', fontWeight: '400' },
    },
  },
} satisfies Record<string, SystemStyleObject>;

export const modalTermsContentRecipe = sva({
  slots: ['root', 'details', 'heading', 'label', 'document', 'date'],
  base: {
    root: { display: 'flex', flexDirection: 'column', gap: '8px', minW: '0' },
    details: { display: 'flex', flexDirection: 'column', gap: '16px', minW: '0' },
    heading: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '8px' },
    label: {
      m: '0',
      fontFamily: 'korean',
      fontSize: '16px',
      fontWeight: '400',
      lineHeight: '1.5',
      letterSpacing: '-0.02em',
      color: 'black.100',
    },
    document: {
      display: 'flex',
      flexDirection: 'column',
      gap: '24px',
      p: '24px 16px',
      border: '1px solid #E9EAEB',
      minW: '0',
      fontFamily: 'korean',
      fontSize: '14px',
      fontWeight: '400',
      lineHeight: '1.5',
      letterSpacing: '-0.02em',
      color: 'black.100',
    },
    date: {
      m: '0',
      fontFamily: 'korean',
      fontSize: '14px',
      fontWeight: '400',
      lineHeight: '1.5',
      letterSpacing: '-0.02em',
      color: '#777777',
      _mobile: { fontSize: '13px' },
    },
  },
});

export const modalDialogRecipe = sva({
  slots: [
    'viewport',
    'backdrop',
    'popup',
    'header',
    'title',
    'content',
    'intro',
    'message',
    'description',
    'footer',
    'actions',
  ],
  base: {
    viewport: {
      position: 'fixed',
      inset: '0',
      zIndex: '100',
      display: 'grid',
      placeItems: 'center',
      p: '24px',
    },
    backdrop: { position: 'fixed', inset: '0', zIndex: '99' },
    popup: {
      w: '100%',
      maxW: '640px',
      maxH: 'calc(100dvh - 48px)',
      overflow: 'auto',
      borderRadius: '10px',
      bg: 'white.0',
      boxShadow: '0 4px 4px color-mix(in srgb, var(--color-black-100) 25%, transparent)',
      _mobile: { maxH: 'calc(100dvh - 32px)' },
    },
    header: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      flexShrink: '0',
      gap: '6px',
      pt: '40px',
      px: '32px',
      _mobile: { pt: '24px', px: '16px' },
    },
    title: {
      m: '0',
      minW: '0',
      flex: '1',
      fontFamily: 'korean',
      fontSize: '24px',
      fontWeight: '400',
      lineHeight: '1.5',
      letterSpacing: '-0.02em',
      _mobile: { fontSize: '20px' },
    },
    content: {
      p: '24px 24px 16px',
      minW: '0',
      overflowWrap: 'anywhere',
      _mobile: { p: '24px 16px 16px' },
    },
    message: {
      m: '0',
      fontFamily: 'korean',
      fontSize: '28px',
      fontWeight: '900',
      lineHeight: '1.2',
      letterSpacing: '-0.02em',
      _mobile: { fontSize: '20px' },
    },
    description: {
      m: '0',
      fontFamily: 'korean',
      fontSize: '16px',
      fontWeight: '400',
      lineHeight: '1.5',
      letterSpacing: '-0.02em',
    },
    footer: {
      display: 'flex',
      justifyContent: 'center',
      flexShrink: '0',
      gap: '8px',
      px: '16px',
      pb: '24px',
      '& button': {
        w: '180px',
        maxW: '100%',
        '--button-height': '48px',
        _mobile: { w: '100%', '--button-height': '44px' },
      },
    },
    actions: { display: 'flex', justifyContent: 'center', gap: '8px', w: '100%', minW: '0' },
  },
  variants: {
    variant: {
      alert: notice,
      confirm: notice,
      terms: contentModal,
      form: contentModal,
      selection: contentModal,
      tracking: { ...contentModal, popup: { h: '804px', _mobile: { h: 'auto' } } },
      detail: contentModal,
      image: {
        popup: {
          border: '1px solid token(colors.black.20)',
          boxShadow: 'none',
          _mobile: { maxH: '100dvh', borderRadius: '20px 20px 0 0' },
        },
        header: { bg: 'white.0', borderBottom: '1px solid token(colors.black.20)' },
        content: { p: '24px', _mobile: { p: '24px 16px 32px' } },
      },
      sizeGuide: {
        popup: { maxW: '768px' },
        content: { p: '24px 32px 40px', overflowX: 'auto', _mobile: { p: '24px 16px 32px' } },
      },
    },
    size: {
      sm: { popup: { maxW: '640px' } },
      lg: { popup: { maxW: '800px' } },
    },
    mobilePresentation: {
      popup: {
        viewport: { _mobile: { p: '16px' } },
        popup: { _mobile: { w: 'calc(100vw - 32px)', maxW: 'none', borderRadius: '24px' } },
      },
      fullscreen: {
        viewport: { _mobile: { p: '0' } },
        popup: {
          _mobile: { w: '100vw', maxW: 'none', h: '100dvh', maxH: '100dvh', borderRadius: '0' },
        },
      },
      bottomSheet: {
        viewport: { _mobile: { alignItems: 'end', p: '0' } },
        popup: {
          _mobile: {
            w: '100vw',
            maxW: '100vw',
            maxH: 'calc(100dvh - 44px)',
            borderRadius: '24px 24px 0 0',
          },
        },
      },
    },
    overlayTone: {
      dark: { backdrop: { bg: 'color-mix(in srgb, var(--color-black-100) 50%, transparent)' } },
      light: { backdrop: { bg: 'color-mix(in srgb, var(--color-white-000) 50%, transparent)' } },
    },
    blur: { true: { backdrop: { backdropFilter: 'blur(48px)' } } },
    hasFooter: {
      true: {
        popup: { display: 'flex', flexDirection: 'column', overflow: 'hidden' },
        content: { flex: '1', minH: '0', overflowY: 'auto' },
      },
    },
    sheet: {
      true: {
        popup: {
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            display: 'block',
            flexShrink: '0',
            w: '36px',
            h: '4px',
            borderRadius: 'full',
            bg: '#E9EAEB',
            mx: 'auto',
            mt: '8px',
          },
        },
        header: { gap: '8px' },
        content: {
          minH: '0',
          flex: '0 1 auto',
          overflowY: 'auto',
          p: '24px 16px 32px',
          _mobile: { p: '24px 16px 32px' },
        },
        footer: { _mobile: { pb: '32px' } },
      },
    },
    scrollable: { true: {} },
    inContent: { true: { footer: { px: '0', pt: '16px', _mobile: { px: '0' } } } },
    scrollFade: {
      true: {
        footer: {
          position: 'relative',
          '&::before': {
            content: '""',
            position: 'absolute',
            right: '0',
            bottom: '100%',
            left: '0',
            h: '80px',
            background: 'linear-gradient(180deg, transparent 0%, var(--color-white-000) 80%)',
            pointerEvents: 'none',
          },
        },
      },
    },
    contentOffset: {
      true: {
        footer: {
          paddingInlineStart: 'calc(24px + var(--modal-footer-content-offset))',
          paddingInlineEnd: '24px',
          _mobile: { paddingInlineStart: '16px', paddingInlineEnd: '16px' },
        },
      },
    },
    actionDirection: {
      horizontal: {},
      vertical: { actions: { flexDirection: 'column', '& button': { w: '100%' } } },
    },
    fullWidthActions: { true: { actions: { '& button': { flex: '1', minW: '0' } } } },
    structured: { true: { content: { display: 'flex', flexDirection: 'column', gap: '16px' } } },
    noticeLayout: {
      result: {
        content: { gap: '0' },
        intro: {
          m: '0',
          mb: '24px',
          fontFamily: 'korean',
          fontSize: '16px',
          fontWeight: '400',
          lineHeight: '1.5',
          letterSpacing: '-0.02em',
          color: 'black.100',
          '& > span': { fontWeight: '500' },
          _mobile: { mb: '24px' },
        },
        message: {
          fontFamily: 'hoka',
          fontSize: '28px',
          fontWeight: '700',
          lineHeight: '1',
          letterSpacing: '0',
          mb: '32px',
          _mobile: { fontSize: '22px', fontWeight: '700', lineHeight: '1', mb: '52px' },
        },
        description: { fontSize: '14px', color: '#777777', _mobile: { mb: '16px' } },
      },
    },
    formLayout: {
      divided: {
        popup: { _mobile: { borderRadius: '0' } },
        title: { fontWeight: '700' },
        content: {
          p: '24px 32px 0',
          flex: '0 1 auto',
          scrollbarWidth: 'none',
          '&::-webkit-scrollbar': { display: 'none' },
          '&::before': {
            content: '""',
            display: 'block',
            borderTop: '2px solid black',
            mb: '24px',
          },
          '& input': { h: '24px!', minH: '24px!', lineHeight: '24px!' },
          '& [data-disabled] label': { color: 'black.100' },
          _mobile: { p: '24px 16px 0' },
        },
        footer: {
          pt: '40px',
          px: '32px',
          pb: '40px',
          _mobile: { pt: '32px', px: '0', pb: '24px' },
        },
      },
    },
  },
  compoundVariants: [
    {
      variant: ['terms', 'selection', 'form', 'tracking', 'detail'],
      hasFooter: true,
      css: {
        content: { pb: '0', _mobile: { pb: '0' } },
        footer: { mt: '40px', pt: '0', _mobile: { mt: '32px', pt: '0' } },
      },
    },
    {
      variant: ['terms', 'selection', 'form', 'tracking', 'detail'],
      inContent: true,
      css: {
        content: { _mobile: { pb: '24px' } },
        footer: { _mobile: { px: '0', pt: '0', pb: '0' } },
      },
    },
    {
      sheet: true,
      scrollable: true,
      css: {
        popup: { h: 'calc(100dvh - 44px)' },
        header: { _mobile: { borderBottom: '1px solid token(colors.black.20)' } },
        content: { flex: '1' },
      },
    },
    {
      sheet: true,
      scrollable: false,
      hasFooter: true,
      css: { content: { p: '24px 16px', _mobile: { p: '24px 16px' } } },
    },
    {
      variant: ['terms', 'selection', 'form', 'tracking', 'detail'],
      sheet: true,
      css: {
        content: { p: '0px 16px 32px', _mobile: { p: '0px 16px 32px' } },
        footer: { _mobile: { pb: '24px' } },
      },
    },
    {
      variant: ['terms', 'selection', 'form', 'tracking', 'detail'],
      sheet: true,
      hasFooter: true,
      css: { content: { pb: '0', _mobile: { pb: '0' } } },
    },
    {
      variant: 'form',
      formLayout: 'divided',
      css: {
        header: { mb: '0' },
        footer: {
          mt: '0',
          pt: '40px',
          _mobile: { mt: '0', pt: '32px' },
          '& button': { _mobile: { h: '44px', minH: '44px' } },
          '& button > span > span': { fontWeight: '700', _mobile: { fontWeight: '700' } },
        },
      },
    },
  ],
});

type ModalRecipeOptions = NonNullable<Parameters<typeof modalDialogRecipe.raw>[0]>;

// Merge style objects before generating classes so caller overrides have deterministic precedence.
export function getModalDialogClasses(
  options: ModalRecipeOptions,
  overrides?: { header?: SystemStyleObject; footer?: SystemStyleObject },
) {
  const slots = modalDialogRecipe.raw(options);
  return {
    ...modalDialogRecipe(options),
    header: css(slots.header, overrides?.header),
    footer: css(slots.footer, overrides?.footer),
  };
}
