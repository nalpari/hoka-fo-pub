import type { Meta, StoryObj } from '@storybook/react';
import { expect, fn, userEvent, within } from 'storybook/test';
import { getRouter } from '@storybook/nextjs-vite/navigation.mock';
import { LoginContent } from '@/shared/features/login/LoginContent';
import { LoginPage } from '@/shared/features/login/LoginPage';
import { PlatformProvider } from '@/shared/context/platform';

const meta = {
  title: 'Pages/AUTH/Login',
  component: LoginPage,
  args: { onLogin: fn() },
  decorators: [
    (Story, { parameters }) => {
      const platform = parameters.platform === 'mobile' ? 'mobile' : 'web';
      return (
        <PlatformProvider platform={platform}>
          <div className={`platform-${platform}`}>
            <Story />
          </div>
        </PlatformProvider>
      );
    },
  ],
} satisfies Meta<typeof LoginPage>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Mobile: Story = {
  parameters: { platform: 'mobile' },
  globals: { viewport: 'hoka375' },
};

export const Error: Story = {
  render: () => (
    <LoginContent
      id=""
      password=""
      rememberId={false}
      notice={{ tone: 'error', message: '아이디와 비밀번호를 모두 입력해 주세요.' }}
      onIdChange={fn()}
      onPasswordChange={fn()}
      onRememberChange={fn()}
      onSubmit={(event) => event.preventDefault()}
      onFindAccount={fn()}
      onUnavailable={fn()}
    />
  ),
};

export const LoginFlow: Story = {
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole('button', { name: '로그인' }));
    await expect(args.onLogin).not.toHaveBeenCalled();
    await userEvent.type(canvas.getByLabelText(/이메일 아이디/), 'demo@example.com');
    await userEvent.type(canvas.getByLabelText(/비밀번호/, { selector: 'input' }), 'demo-password');
    await userEvent.click(canvas.getByRole('button', { name: '비밀번호 보기' }));
    await expect(canvas.getByLabelText(/비밀번호/, { selector: 'input' })).toHaveAttribute(
      'type',
      'text',
    );
    await userEvent.click(canvas.getByRole('button', { name: '비밀번호 숨기기' }));
    await userEvent.click(canvas.getByRole('checkbox', { name: '아이디 저장' }));
    await expect(canvas.getByRole('checkbox', { name: '아이디 저장' })).toBeChecked();
    await userEvent.click(canvas.getByRole('button', { name: '로그인' }));
    await expect(args.onLogin).toHaveBeenCalledTimes(1);
    await expect(getRouter().push).toHaveBeenCalledWith('/');
    await expect(canvas.getByRole('status')).toHaveTextContent(
      'demo@example.com 아이디를 저장하고 로그인했습니다. (데모)',
    );
    await expect(canvas.getByRole('link', { name: '회원가입' })).toHaveAttribute('href', '/signup');
  },
};

export const MobileLoginFlow: Story = { ...Mobile, play: LoginFlow.play };

export const UnavailableActions: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    for (const feature of ['카카오 로그인', '네이버 로그인', '비밀번호 찾기']) {
      await userEvent.click(canvas.getByRole('button', { name: feature }));
      await expect(canvas.getByRole('alert')).toHaveTextContent(
        `${feature} 기능은 데모 환경에서 아직 연결되지 않았습니다.`,
      );
    }
    await userEvent.click(canvas.getByRole('button', { name: '아이디 찾기' }));
    await expect(getRouter().push).toHaveBeenCalledWith('/login/find-account');
  },
};
