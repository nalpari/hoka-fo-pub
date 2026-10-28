import type { Meta, StoryObj } from '@storybook/react';

import AccountUnlockCompletePage from '@/app/login/account-locked/complete/page';
import { PlatformProvider } from '@/context/platform';

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
  title: 'PAGES/로그인/7. 계정 잠금 해제 완료',
  component: AccountUnlockCompletePage,
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof AccountUnlockCompletePage>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = { decorators: [withPlatform('web')] };

export const Mobile: Story = {
  parameters: { layout: 'fullscreen' },
  decorators: [withPlatform('mobile')],
  globals: { viewport: 'hoka375' },
};
