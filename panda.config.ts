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
        },
      },
      tokens: {
        colors: {
          headerBorder: { value: '#E9EAEB' },
          footerDivider: { value: '#F7F7F9' },
          sale: { value: '#E10F00' },
        },
      },
    },
  },
  jsxFramework: 'react',
  outdir: 'styled-system',
});
