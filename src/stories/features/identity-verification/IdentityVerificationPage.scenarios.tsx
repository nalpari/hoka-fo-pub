import type { Meta, StoryObj } from '@storybook/react';
import { IdentityVerificationContent } from '@/shared/features/identity-verification/IdentityVerificationContent';

const meta = {
  title: 'PAGES/Signup/IdentityVerification',
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
      <div className="platform-mobile" style={{ maxWidth: '100%', width: 360 }}>
        <Story />
      </div>
    ),
  ],
};
