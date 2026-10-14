import type { Meta, StoryObj } from '@storybook/react';
import { MemoryRouter } from 'react-router-dom';
import { PlatformProvider } from '@/shared/context/platform';
import { AccountLockedPage } from '@/shared/features/account-locked/AccountLockedPage';

const withRouter = (Story: React.ComponentType) => (
  <MemoryRouter>
    <Story />
  </MemoryRouter>
);

const withPlatform = (platform: 'web' | 'mobile') => (Story: React.ComponentType) => (
  <PlatformProvider platform={platform}>
    <div
      className={`platform-${platform}`}
      style={platform === 'mobile' ? { width: 375, minHeight: 812 } : undefined}
    >
      <Story />
    </div>
  </PlatformProvider>
);

const meta = {
  title: 'Pages/AUTH/FindAccount/AccountLockedModal',
  component: AccountLockedPage,
  decorators: [withRouter, withPlatform('web')],
} satisfies Meta<typeof AccountLockedPage>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Mobile: Story = {
  decorators: [withPlatform('mobile')],
  globals: { viewport: 'hoka375' },
};
