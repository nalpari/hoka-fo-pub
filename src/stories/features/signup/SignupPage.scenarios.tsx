import type { Meta, StoryObj } from '@storybook/react';
import { expect, userEvent, within } from 'storybook/test';
import { PlatformProvider } from '@/context/platform';

import SignupPage from '@/app/signup/page';

const meta = {
  title: 'PAGES/회원가입/0. 회원가입 안내',
  component: SignupPage,
  decorators: [
    (Story, context) => {
      const platform = context.parameters.platform === 'mobile' ? 'mobile' : 'web';

      return (
        <PlatformProvider platform={platform}>
          <div className={`platform-${platform}`}>
            <Story />
          </div>
        </PlatformProvider>
      );
    },
  ],
  parameters: { nextjs: { navigation: { pathname: '/signup' } }, layout: 'fullscreen' },
} satisfies Meta<typeof SignupPage>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Mobile: Story = {
  parameters: { layout: 'fullscreen', platform: 'mobile' },
  globals: { viewport: 'hoka375' },
};

export const KakaoUnavailable: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole('button', { name: '카카오 계정으로 신규가입' }));
    await expect(within(canvasElement.ownerDocument.body).getByRole('dialog')).toHaveTextContent(
      '카카오 회원가입 기능은 현재 연결되지 않았습니다.',
    );
  },
};
