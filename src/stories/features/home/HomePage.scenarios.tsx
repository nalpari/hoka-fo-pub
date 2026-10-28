import type { Meta, StoryObj } from '@storybook/react';
import { ShopShell } from '@/context/ShopShell';
import HomePage from '@/app/page';

const meta = {
  title: 'PAGES/메인/0. 메인',
  component: ShopShell,
  args: { children: <HomePage /> },
  parameters: { nextjs: { navigation: { pathname: '/' } }, layout: 'fullscreen' },
} satisfies Meta<typeof ShopShell>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Width3840: Story = {
  name: '3840px',
  args: { platform: 'web' },
  globals: { viewport: 'hoka3840' },
};

export const Width2560: Story = {
  name: '2560px',
  args: { platform: 'web' },
  globals: { viewport: 'hoka2560' },
};

export const Width1920: Story = {
  name: '1920px',
  args: { platform: 'web' },
  globals: { viewport: 'hoka1920' },
};

export const Width1600: Story = {
  name: '1600px',
  args: { platform: 'web' },
  globals: { viewport: 'hoka1600' },
};

export const Width1200: Story = {
  name: '1200px',
  args: { platform: 'web' },
  globals: { viewport: 'hoka1200' },
};

export const Width768: Story = {
  parameters: { layout: 'fullscreen' },
  name: '768px',
  args: { platform: 'mobile' },
  globals: { viewport: 'hoka768' },
};

export const Width375: Story = {
  parameters: { layout: 'fullscreen' },
  name: '375px',
  args: { platform: 'mobile' },
  globals: { viewport: 'hoka375' },
};
