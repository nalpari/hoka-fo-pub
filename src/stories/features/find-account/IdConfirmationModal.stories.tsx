import type { Meta, StoryObj } from '@storybook/react';
import { PlatformProvider } from '@/shared/context/platform';
import { IdConfirmationModal } from '@/shared/features/find-account/IdConfirmationModal';

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
  title: 'Pages/Login/FindAccount/IdConfirmationModal',
  component: IdConfirmationModal,
  args: {
    userName: '김호가',
    onOpenChange: () => {},
    onPasswordReset: () => {},
    onConfirm: () => {},
  },
  decorators: [withPlatform('web')],
} satisfies Meta<typeof IdConfirmationModal>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Mobile: Story = {
  parameters: { layout: 'fullscreen' },
  decorators: [withPlatform('mobile')],
  globals: { viewport: 'hoka375' },
};
