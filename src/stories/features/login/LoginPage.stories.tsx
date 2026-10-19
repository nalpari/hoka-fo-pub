import type { Meta, StoryObj } from '@storybook/react';
import { expect, fn, userEvent, within } from 'storybook/test';
import { getRouter } from '@storybook/nextjs-vite/navigation.mock';
import { LoginContent } from '@/shared/features/login/LoginContent';
import { LoginPage } from '@/shared/features/login/LoginPage';
import { PlatformProvider } from '@/shared/context/platform';

const meta = {
  title: 'Pages/AUTH/Login',
  tags: ['form-audit', 'login-validation'],
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
      notice={null}
      errors={{
        id: '올바른 이메일 형식으로 입력해 주세요',
        password: '영문, 숫자, 특수문자를 모두 포함하여 10~12자로 입력해 주세요',
      }}
      onIdChange={fn()}
      onPasswordChange={fn()}
      onRememberChange={fn()}
      onSubmit={(event) => event.preventDefault()}
      onFindAccount={fn()}
      onUnavailable={fn()}
    />
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const notice = canvas.getByText('올바른 이메일 형식으로 입력해 주세요');
    await expect(notice).toHaveAttribute('role', 'alert');
    await expect(
      canvas.getByText('영문, 숫자, 특수문자를 모두 포함하여 10~12자로 입력해 주세요'),
    ).toHaveAttribute('role', 'alert');
    const errorColor = canvasElement.ownerDocument
      .defaultView!.getComputedStyle(notice)
      .getPropertyValue('--colors-red-100')
      .trim();
    await expect(errorColor).not.toBe('');
    await expect(notice).toHaveStyle({ color: errorColor });
    await expect(
      canvas.getByText('영문, 숫자, 특수문자를 모두 포함하여 10~12자로 입력해 주세요'),
    ).toHaveStyle({ color: errorColor });
    await expect(within(canvasElement).getByLabelText(/이메일 아이디/)).toHaveAttribute(
      'aria-invalid',
      'true',
    );
    await expect(
      within(canvasElement).getByLabelText(/비밀번호/, { selector: 'input' }),
    ).toHaveAttribute('aria-invalid', 'true');
    await expect(canvas.getByLabelText(/이메일 아이디/)).toHaveAccessibleDescription(
      '올바른 이메일 형식으로 입력해 주세요',
    );
    await expect(
      canvas.getByLabelText(/비밀번호/, { selector: 'input' }),
    ).toHaveAccessibleDescription('영문, 숫자, 특수문자를 모두 포함하여 10~12자로 입력해 주세요');
  },
};

export const MobileError: Story = { ...Error, ...Mobile, play: Error.play };

export const LoginFlow: Story = {
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole('button', { name: '로그인' }));
    await expect(args.onLogin).not.toHaveBeenCalled();
    await expect(canvas.getAllByRole('alert')).toHaveLength(2);
    await expect(canvas.getByLabelText(/이메일 아이디/)).toHaveAccessibleDescription(
      '올바른 이메일 형식으로 입력해 주세요',
    );
    await expect(canvas.getByLabelText(/이메일 아이디/)).toHaveAttribute('aria-invalid', 'true');
    await expect(canvas.getByLabelText(/비밀번호/, { selector: 'input' })).toHaveAttribute(
      'aria-invalid',
      'true',
    );
    await userEvent.type(canvas.getByLabelText(/이메일 아이디/), 'demo@example.com');
    await expect(canvas.getByLabelText(/이메일 아이디/)).not.toHaveAttribute('aria-invalid');
    await expect(canvas.getByLabelText(/비밀번호/, { selector: 'input' })).toHaveAttribute(
      'aria-invalid',
      'true',
    );
    await userEvent.type(canvas.getByLabelText(/비밀번호/, { selector: 'input' }), 'Hoka12345!');
    await expect(canvas.getByLabelText(/비밀번호/, { selector: 'input' })).not.toHaveAttribute(
      'aria-invalid',
    );
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

export const InvalidFormats: Story = {
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const email = canvas.getByLabelText(/이메일 아이디/);
    const password = canvas.getByLabelText(/비밀번호/, { selector: 'input' });
    const login = canvas.getByRole('button', { name: '로그인' });
    await userEvent.type(email, 'first..last@example.com');
    await userEvent.type(password, 'demo-password');
    await userEvent.click(login);
    await expect(args.onLogin).not.toHaveBeenCalled();
    await expect(canvas.getAllByRole('alert')).toHaveLength(2);
    await expect(password).toHaveAccessibleDescription(
      '영문, 숫자, 특수문자를 모두 포함하여 10~12자로 입력해 주세요',
    );
    await userEvent.clear(email);
    await userEvent.type(email, 'demo@example.com');
    await expect(email).not.toHaveAttribute('aria-invalid');
    for (const value of [
      'Hoka1234!',
      'Hoka123456789!',
      'Hoka123456',
      '123456789!',
      'HokaHoka!!',
      'Hoka1234 !',
    ]) {
      await userEvent.clear(password);
      await userEvent.type(password, value);
      await userEvent.click(login);
      await expect(password).toHaveAttribute('aria-invalid', 'true');
      await expect(args.onLogin).not.toHaveBeenCalled();
    }
    for (const value of ['Hoka12345!', 'Hoka1234567!']) {
      await userEvent.clear(password);
      await userEvent.type(password, value);
      await expect(password).not.toHaveAttribute('aria-invalid');
      await expect(canvas.queryByRole('alert')).not.toBeInTheDocument();
    }
    await userEvent.click(login);
    await expect(args.onLogin).toHaveBeenCalledTimes(1);
    await expect(canvas.getByRole('status')).toHaveAttribute('data-tone', 'success');
  },
};

export const MobileInvalidFormats: Story = { ...Mobile, play: InvalidFormats.play };

export const UnavailableActions: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    for (const feature of ['카카오 로그인', '네이버 로그인']) {
      await userEvent.click(canvas.getByRole('button', { name: feature }));
      await expect(canvas.getByRole('alert')).toHaveTextContent(
        `${feature} 기능은 데모 환경에서 아직 연결되지 않았습니다.`,
      );
      await expect(canvas.getByLabelText(/이메일 아이디/)).not.toHaveAttribute('aria-invalid');
      await expect(canvas.getByLabelText(/비밀번호/, { selector: 'input' })).not.toHaveAttribute(
        'aria-invalid',
      );
    }
    await userEvent.click(canvas.getByRole('button', { name: '아이디/비밀번호 찾기' }));
    await expect(getRouter().push).toHaveBeenCalledWith('/login/find-account');
  },
};
