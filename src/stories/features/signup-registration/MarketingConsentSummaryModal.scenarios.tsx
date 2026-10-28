import type { Meta, StoryObj } from '@storybook/react';
import { PlatformProvider } from '@/context/platform';
import { MarketingConsentSummaryModal } from '@/components/features/signup-registration/MarketingConsentSummaryModal';

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
  title: 'PAGES/회원가입/5. 마케팅 정보 수신동의 안내',
  component: MarketingConsentSummaryModal,
  args: {
    preferences: { email: 'no', sms: 'no', kakao: 'no' },
    onOpenChange: () => {},
    onConfirm: () => {},
  },
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof MarketingConsentSummaryModal>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = { decorators: [withPlatform('web')] };

export const Mobile: Story = {
  parameters: { layout: 'fullscreen' },
  decorators: [withPlatform('mobile')],
  globals: { viewport: 'hoka375' },
};
