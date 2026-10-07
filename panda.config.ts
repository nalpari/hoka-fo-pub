import { defineConfig } from '@pandacss/dev';

export default defineConfig({
  // The existing global stylesheet already owns the project reset.
  preflight: false,
  include: ['./src/**/*.{ts,tsx,js,jsx}'],
  exclude: ['./src/**/*.stories.{ts,tsx}'],
  conditions: {
    extend: {
      // User-agent platform selection adds this class at the application root.
      mobile: '.platform-mobile &',
    },
  },
  theme: {
    extend: {
      semanticTokens: {
        colors: {
          text: {
            primary: { value: '#000' },
            inverse: { value: '#fff' },
            subtle: { value: '#555' },
          },
          surface: {
            default: { value: '#fff' },
            subtle: { value: '#f3f3f3' },
          },
          border: {
            default: { value: '#d8d8d8' },
            muted: { value: '#B3B3B3' },
            strong: { value: '#111' },
          },
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
            focus: { value: '{colors.black.40}' },
            brand: { value: '{colors.blue.100}' },
          },
        },
      },
      tokens: {
        aspectRatios: {
          media: {
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
          offWhite: { 100: { value: '#E8EDF3' } },
          red: { 100: { value: '#E10F00' } },
          headerBorder: { value: '#E9EAEB' },
          footerDivider: { value: '#F7F7F9' },
          sale: { value: '#E10F00' },
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
          12: { value: '12px' },
          14: { value: '14px' },
          16: { value: '16px' },
          20: { value: '20px' },
          24: { value: '24px' },
          28: { value: '28px' },
          32: { value: '32px' },
          36: { value: '36px' },
          40: { value: '40px' },
          42: { value: '42px' },
          48: { value: '48px' },
          50: { value: '50px' },
          56: { value: '56px' },
          58: { value: '58px' },
          64: { value: '64px' },
          72: { value: '72px' },
          80: { value: '80px' },
          84: { value: '84px' },
          96: { value: '96px' },
        },
        lineHeights: {
          hoka: { value: '0.96' },
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
