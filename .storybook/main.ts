import type { StorybookConfig } from '@storybook/nextjs-vite';
import { readdirSync } from 'node:fs';

const config: StorybookConfig = {
  stories: async () =>
    readdirSync(new URL('../src/stories/', import.meta.url), { recursive: true, encoding: 'utf8' })
      .filter((file) => /\.stories\.tsx?$/.test(file) && !/mockup/i.test(file))
      .map((file) => `../src/stories/${file.replaceAll('\\', '/')}`),
  staticDirs: ['../public'],
  addons: ['@storybook/addon-a11y', '@storybook/addon-docs'],
  framework: '@storybook/nextjs-vite',
};

export default config;
