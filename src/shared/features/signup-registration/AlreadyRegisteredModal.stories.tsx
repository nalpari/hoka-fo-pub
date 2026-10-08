import type { Meta, StoryObj } from '@storybook/react';
import { PlatformProvider } from '@/shared/context/platform';
import { AlreadyRegisteredModal } from './AlreadyRegisteredModal';

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
  title: 'Pages/AUTH/Signup/AlreadyRegisteredModal',
  component: AlreadyRegisteredModal,
  args: { onOpenChange: () => {}, onConfirm: () => {} },
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof AlreadyRegisteredModal>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = { decorators: [withPlatform('web')] };

export const Mobile: Story = {
  decorators: [withPlatform('mobile')],
  globals: { viewport: 'hoka375' },
};
