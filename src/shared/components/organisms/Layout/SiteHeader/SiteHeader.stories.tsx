import type { Meta, StoryObj } from '@storybook/react';
import { MemoryRouter } from 'react-router-dom';
import { SiteHeader } from '@/shared/components/organisms/Layout/SiteHeader/SiteHeader';
import { PlatformProvider } from '@/shared/context/platform';

const meta = {
  title: 'Organisms/Layout/SiteHeader',
  component: SiteHeader,
  decorators: [
    (Story) => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    ),
  ],
} satisfies Meta<typeof SiteHeader>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Web: Story = {
  args: { cart: 2, onMenu: () => undefined },
  render: (args) => (
    <div className="platform-web">
      <PlatformProvider platform="web">
        <SiteHeader {...args} />
      </PlatformProvider>
    </div>
  ),
};

export const Mobile: Story = {
  args: { cart: 2, onMenu: () => undefined },
  render: (args) => (
    <div className="platform-mobile">
      <PlatformProvider platform="mobile">
        <SiteHeader {...args} />
      </PlatformProvider>
    </div>
  ),
};
