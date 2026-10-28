import { getRouter } from '@storybook/nextjs-vite/navigation.mock';
import type { Meta, StoryObj } from '@storybook/react';
import { expect, userEvent, within } from 'storybook/test';
import { PlatformProvider } from '@/context/platform';

import FindAccountPage from '@/app/login/find-account/page';

const withPlatform =
  (platform: 'web' | 'mobile', width?: number) => (Story: React.ComponentType) => (
    <PlatformProvider platform={platform}>
      <div className={`platform-${platform}`} style={width ? { width } : undefined}>
        <Story />
      </div>
    </PlatformProvider>
  );

const meta = {
  title: 'PAGES/로그인/1. 아이디·비밀번호 찾기',
  component: FindAccountPage,
  decorators: [
    (Story) => (
      <>
        <PlatformProvider platform="web">
          <div className="platform-web">
            <Story />
          </div>
        </PlatformProvider>
      </>
    ),
  ],
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof FindAccountPage>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Mobile: Story = {
  parameters: { layout: 'fullscreen' },
  decorators: [withPlatform('mobile', 375)],
  globals: { viewport: 'hoka375' },
};

export const Error: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole('button', { name: '인증번호 요청' }));
  },
};

export const CodeEntry: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.type(canvas.getByLabelText('* 이름'), '홍길동');
    await userEvent.type(canvas.getByLabelText('* 휴대폰 번호'), '01012345678');
    await userEvent.click(canvas.getByRole('button', { name: '인증번호 요청' }));
  },
};

export const MobileError: Story = {
  parameters: { layout: 'fullscreen' },
  ...Mobile,
  name: 'Mobile Error',
  play: Error.play,
};

export const IdResult: Story = {
  play: async (context) => {
    await CodeEntry.play!(context);
    const canvas = within(context.canvasElement);
    await userEvent.type(canvas.getByLabelText('* 인증번호'), '111111');
    await userEvent.click(canvas.getByRole('button', { name: '인증번호 확인' }));
    await expect(canvas.getByRole('alert')).toHaveTextContent('인증번호가 일치하지 않습니다.');
    await userEvent.clear(canvas.getByLabelText('* 인증번호'));
    await userEvent.type(canvas.getByLabelText('* 인증번호'), '900668');
    await userEvent.click(canvas.getByRole('button', { name: '인증번호 확인' }));
    const dialog = within(context.canvasElement.ownerDocument.body).getByRole('dialog');
    await expect(dialog).toHaveTextContent('홍길동님 가입하신 아이디입니다');
    await expect(dialog).toHaveTextContent('honggildong');
  },
};

export const ResetFromResult: Story = {
  play: async (context) => {
    await IdResult.play!(context);
    const dialog = within(context.canvasElement.ownerDocument.body).getByRole('dialog');
    await userEvent.click(within(dialog).getByRole('button', { name: '비밀번호 재설정' }));
    await expect(getRouter().push).toHaveBeenCalledWith('/login/find-account/password-reset');
  },
};

export const MobileIdResult: Story = {
  ...Mobile,
  play: IdResult.play,
};
