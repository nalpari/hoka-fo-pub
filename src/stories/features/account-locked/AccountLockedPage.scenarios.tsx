import type { Meta, StoryObj } from '@storybook/react';
import { PlatformProvider } from '@/shared/context/platform';
import { AccountLockedPage } from '@/shared/features/account-locked/AccountLockedPage';

const withRouter = (Story: React.ComponentType) => (
  <>
    <Story />
  </>
);

const withPlatform = (platform: 'web' | 'mobile') => (Story: React.ComponentType) => (
  <PlatformProvider platform={platform}>
    <div
      className={`platform-${platform}`}
      style={platform === 'mobile' ? { maxWidth: '100%', width: 375, minHeight: 812 } : undefined}
    >
      <Story />
    </div>
  </PlatformProvider>
);

const meta = {
  title: 'PAGES/로그인/5. 계정 잠금 안내',
  component: AccountLockedPage,
  decorators: [withRouter, withPlatform('web')],
} satisfies Meta<typeof AccountLockedPage>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Mobile: Story = {
  parameters: { layout: 'fullscreen' },
  decorators: [withPlatform('mobile')],
  globals: { viewport: 'hoka375' },
};
