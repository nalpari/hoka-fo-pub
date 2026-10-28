import type { StoryObj } from '@storybook/react';

import base, * as scenarios from './HomePage.scenarios';

const meta = {
  ...base,
  title: 'PAGES/메인/0. 메인/WEB',
  globals: { viewport: 'hoka1600' },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Width3840: Story = { ...scenarios.Width3840, name: '3840px' };

export const Width2560: Story = { ...scenarios.Width2560, name: '2560px' };

export const Width1920: Story = { ...scenarios.Width1920, name: '1920px' };

export const Width1600: Story = { ...scenarios.Width1600, name: '1600px' };

export const Width1200: Story = { ...scenarios.Width1200, name: '1200px' };
