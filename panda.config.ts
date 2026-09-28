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
