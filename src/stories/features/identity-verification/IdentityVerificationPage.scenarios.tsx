import { type Meta, type StoryObj } from '@storybook/react';
import { PlatformProvider } from '@/context/platform';

import { IdentityVerificationContent } from '@/stories/route-previews/signup-verifyPreview';

const meta = {
  title: 'PAGES/회원가입/1. 가입여부확인',
  component: IdentityVerificationContent,
  args: { onSelect: () => {} },
} satisfies Meta<typeof IdentityVerificationContent>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Mobile: Story = {
  parameters: { layout: 'fullscreen' },
  decorators: [
    (Story) => (
      <PlatformProvider platform="mobile">
        <div className="platform-mobile" style={{ maxWidth: '100%', width: 360 }}>
          <Story />
        </div>
      </PlatformProvider>
    ),
  ],
};
