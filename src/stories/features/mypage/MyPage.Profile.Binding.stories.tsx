import type { Meta, StoryObj } from '@storybook/react';
import { expect, userEvent, within } from 'storybook/test';
import { PlatformProvider } from '@/context/platform';

import { ProfileStatePreview } from '@/app/mypage/profile/_components/ProfileStatePreview';
const meta = {
  title: 'Integration/Profile design',
  parameters: { layout: 'fullscreen' },
  render: () => (
    <PlatformProvider platform="web">
      <div className="platform-web">
        <ProfileStatePreview errors />
      </div>
    </PlatformProvider>
  ),
} satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;
export const SaveFailureAndRetry: Story = {
  name: '회원정보 고정 입력 오류',
  play: async ({ canvasElement }) => {
    const input = within(canvasElement).getByRole('textbox', { name: /이메일 주소/ });
    await expect(input).toHaveAttribute('aria-invalid', 'true');
    await userEvent.type(input, 'runner');
    await expect(input).toHaveAttribute('aria-invalid', 'true');
  },
};
