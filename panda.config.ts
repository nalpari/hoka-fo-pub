import { defineConfig } from '@pandacss/dev';

export default defineConfig({
  // The existing global stylesheet already owns the project reset.
  preflight: false,
  include: ['./src/**/*.{ts,tsx,js,jsx}'],
  exclude: ['./src/**/*.stories.{ts,tsx}'],
  patterns: {
    extend: {
      contentFrame: {
        description:
          'Central desktop content width with caller-owned mobile width and positioning.',
        properties: {
          mobileWidth: { type: 'property', value: 'width' },
        },
        transform(props) {
          const { mobileWidth, ...styles } = props;

          return {
            w: 'min(calc(100% - var(--layout-web-content-inline-space)), var(--layout-web-content-max-width))',
            ...(mobileWidth !== undefined ? { _mobile: { w: mobileWidth } } : {}),
            ...styles,
          };
        },
      },
    },
  },
  conditions: {
    extend: {
      // User-agent platform selection adds this class at the application root.
      mobile: '.platform-mobile &',
      wideDesktop: '@media (min-width: 2240px)',
      ultraWideDesktop: '@media (min-width: 2560px)',
    },
  },
  theme: {
    extend: {
      semanticTokens: {
        colors: {
          text: {
            primary: { value: '{colors.black.100}' },
            inverse: { value: '{colors.white.0}' },
            subtle: { value: '{colors.black.60}' },
            tertiary: { value: '{colors.black.50}' },
          },
          surface: {
            default: { value: '#fff' },
            subtle: { value: '#f3f3f3' },
          },
          bg: {
            disabled: { value: '{colors.black.40}' },
          },
          border: {
            default: { value: '#d8d8d8' },
            tertiary: { value: '{colors.black.40}' },
            strong: { value: '#111' },
          },
          error: { value: '{colors.red.100}' },
          focus: {
            default: { value: '#000' },
          },
          icon: {
            default: { value: '{colors.black.100}' },
            inverse: { value: '{colors.white.0}' },
            disabled: { value: '{colors.black.40}' },
          },
          action: {
            primary: {
              default: { value: '{colors.black.100}' },
              hover: { value: '{colors.black.60}' },
              foreground: { value: '{colors.white.0}' },
              disabled: { value: '{colors.black.40}' },
            },
            secondary: {
              default: { value: '{colors.white.0}' },
              hover: { value: '{colors.black.60}' },
              foreground: { value: '{colors.black.100}' },
              hoverForeground: { value: '{colors.white.0}' },
            },
            focus: { value: '{colors.border.tertiary}' },
            brand: { value: '{colors.blue.100}' },
          },
        },
      },
      tokens: {
        sizes: {
          formField: { value: '60px' },
        },
        aspectRatios: {
          media: {
            productThumbnail: { value: '371 / 428' },
            oneByOne: { value: '1 / 1' },
            twoByOne: { value: '2 / 1' },
            threeByTwo: { value: '3 / 2' },
            fourByOne: { value: '4 / 1' },
            fourByThree: { value: '4 / 3' },
            fourByFive: { value: '4 / 5' },
            fiveByFour: { value: '5 / 4' },
            sixteenByNine: { value: '16 / 9' },
            eightByThree: { value: '8 / 3' },
          },
        },
        colors: {
          black: {
            100: { value: '#000000' },
            60: { value: '#4D4D4D' },
            50: { value: '#777777' },
            40: { value: '#B3B3B3' },
            20: { value: '#E9EAEB' },
            10: { value: '#F7F7F9' },
          },
          white: { 0: { value: '#FFFFFF' } },
          blue: { 100: { value: '#009DFF' } },
          citrus: { 100: { value: '#E1FF04' } },
          mossGreen: { 100: { value: '#5E661F' } },
          offWhite: { 100: { value: '#E8EDF3' } },
          red: { 100: { value: '#A60000' }, 80: { value: '#E10F00' } },
          headerBorder: { value: '#E9EAEB' },
          footerDivider: { value: '#F7F7F9' },
          sale: { value: '{colors.red.80}' },
        },
        shadows: {
          1: { value: '0 4px 4px 0 rgba(0, 0, 0, 0.16)' },
          2: { value: '0 4px 16px 0 rgba(0, 0, 0, 0.16)' },
          3: {
            value:
              '0 12px 12px -8px rgba(0, 0, 0, 0.2), 0 24px 36px 4px rgba(0, 0, 0, 0.14), 0 8px 48px 8px rgba(0, 0, 0, 0.12)',
          },
        },
        fonts: {
          hoka: { value: "'The Future HOKA', Pretendard, Arial, sans-serif" },
          korean: { value: 'Pretendard, Arial, sans-serif' },
          mono: { value: "'The Future HOKA Mono', monospace" },
          story: { value: "'New Spirit', 'The Future HOKA', sans-serif" },
        },
        fontSizes: {
          12: { value: '0.75rem' },
          14: { value: '0.875rem' },
          16: { value: '1rem' },
          18: { value: '1.125rem' },
          20: { value: '1.25rem' },
          22: { value: '1.375rem' },
          24: { value: '1.5rem' },
          28: { value: '1.75rem' },
          32: { value: '2rem' },
          36: { value: '2.25rem' },
          40: { value: '2.5rem' },
          42: { value: '2.625rem' },
          48: { value: '3rem' },
          50: { value: '3.125rem' },
          56: { value: '3.5rem' },
          58: { value: '3.625rem' },
          64: { value: '4rem' },
          72: { value: '4.5rem' },
          80: { value: '5rem' },
          84: { value: '5.25rem' },
          96: { value: '6rem' },
        },
        lineHeights: {
          hoka: { value: '1' },
          koreanHeading: { value: '1.2' },
          body: { value: '1.3' },
        },
        letterSpacings: {
          korean: { value: '-0.02em' },
          mono: { value: '0.1em' },
        },
      },
    },
  },
  jsxFramework: 'react',
  outdir: 'styled-system',
});
