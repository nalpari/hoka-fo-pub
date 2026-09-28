import type { Meta, StoryObj } from '@storybook/react';
import { MemoryRouter } from 'react-router-dom';
import { ShopShell } from '@/shared/ShopApp';

const meta = {
  title: 'PAGES/PRODUCTS/List',
  component: ShopShell,
  decorators: [
    (Story, context) => (
      <MemoryRouter initialEntries={[context.parameters.route ?? '/products']}>
        <Story />
      </MemoryRouter>
    ),
  ],
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof ShopShell>;

export default meta;

type Story = StoryObj<typeof meta>;

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
  name: '768px',
  args: { platform: 'mobile' },
  globals: { viewport: 'hoka768' },
};

export const Width375: Story = {
  name: '375px',
  args: { platform: 'mobile' },
  globals: { viewport: 'hoka375' },
};

export const MenTrailRunning: Story = {
  name: 'Men / 트레일 러닝',
  args: { platform: 'web' },
  globals: { viewport: 'hoka1600' },
  parameters: { route: '/products?gender=men&activity=trail-running' },
};
