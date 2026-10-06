import type { Meta, StoryObj } from '@storybook/react';
import { IdentityVerificationContent } from './IdentityVerificationContent';

const meta = {
  title: 'Pages/Auth/IdentityVerification',
  component: IdentityVerificationContent,
  args: { onSelect: () => {} },
} satisfies Meta<typeof IdentityVerificationContent>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Mobile: Story = {
  decorators: [
    (Story) => (
      <div className="platform-mobile" style={{ width: 360 }}>
        <Story />
      </div>
    ),
  ],
};

export const ServiceUnavailable: Story = {
  args: { notice: '휴대폰 인증 서비스 연결을 준비 중입니다.' },
};
