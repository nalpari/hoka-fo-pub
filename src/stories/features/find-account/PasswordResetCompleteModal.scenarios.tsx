import type { Meta, StoryObj } from '@storybook/react';
import { PlatformProvider } from '@/context/platform';
import { PasswordResetCompleteModal } from '@/components/features/find-account/PasswordResetCompleteModal';

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
  title: 'PAGES/로그인/4. 비밀번호 재설정 완료',
  component: PasswordResetCompleteModal,
  args: { onOpenChange: () => {}, onConfirm: () => {} },
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof PasswordResetCompleteModal>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = { decorators: [withPlatform('web')] };

export const Mobile: Story = {
  parameters: { layout: 'fullscreen' },
  decorators: [withPlatform('mobile')],
  globals: { viewport: 'hoka375' },
};
