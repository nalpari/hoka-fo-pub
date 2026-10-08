import type { Meta, StoryObj } from '@storybook/react';
import { PlatformProvider } from '@/shared/context/platform';
import { MarketingConsentSummaryModal } from './MarketingConsentSummaryModal';

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
  title: 'Pages/AUTH/Registration/MarketingConsentSummaryModal',
  component: MarketingConsentSummaryModal,
  args: {
    preferences: { email: 'no', coupon: 'no', sms: 'no', married: 'no' },
    onOpenChange: () => {},
    onConfirm: () => {},
  },
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof MarketingConsentSummaryModal>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = { decorators: [withPlatform('web')] };

export const Mobile: Story = {
  decorators: [withPlatform('mobile')],
  globals: { viewport: 'hoka375' },
};
