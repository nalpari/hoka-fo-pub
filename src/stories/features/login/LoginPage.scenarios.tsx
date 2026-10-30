import { getRouter } from '@storybook/nextjs-vite/navigation.mock';
import { type Meta, type StoryObj } from '@storybook/react';
import { expect, fireEvent, userEvent, waitFor, within } from 'storybook/test';
import { PlatformProvider } from '@/context/platform';

import LoginPage from '@/app/login/page';
import LoginErrorPage from '@/app/login/preview-error/page';

const meta = {
  title: 'PAGES/로그인/0. 로그인',
  tags: ['form-audit', 'publishing-preview'],
  component: LoginPage,
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
  parameters: { layout: 'fullscreen', platform: 'mobile' },
  globals: { viewport: 'hoka375' },
};

export const RememberIdHelp: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole('button', { name: '아이디 저장 주의사항' }));
    const help = within(canvasElement.ownerDocument.body).getByRole('dialog');
    await expect(help).toHaveTextContent('주의해주세요');
    await expect(help).toHaveTextContent('공용으로 사용하는 장소에서는');
    await userEvent.keyboard('{Escape}');
    await waitFor(() => expect(help).not.toBeInTheDocument());
    await expect(canvas.getByRole('button', { name: '아이디 저장 주의사항' })).toHaveFocus();
  },
};

export const MobileRememberIdHelp: Story = {
  ...Mobile,
  play: RememberIdHelp.play,
};

export const Error: Story = {
  render: () => <LoginErrorPage />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const notice = canvas.getByText('아이디를 입력해 주세요');
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
    await expect(
      within(canvasElement).getByLabelText(/아이디$/, { selector: 'input' }),
    ).toHaveAttribute('aria-invalid', 'true');
    await expect(
      within(canvasElement).getByLabelText(/비밀번호/, { selector: 'input' }),
    ).toHaveAttribute('aria-invalid', 'true');
    await expect(
      canvas.getByLabelText(/아이디$/, { selector: 'input' }),
    ).toHaveAccessibleDescription('아이디를 입력해 주세요');
    await expect(
      canvas.getByLabelText(/비밀번호/, { selector: 'input' }),
    ).toHaveAccessibleDescription('영문, 숫자, 특수문자를 모두 포함하여 10~12자로 입력해 주세요');
  },
};

export const MobileError: Story = {
  parameters: { layout: 'fullscreen' },
  ...Error,
  ...Mobile,
  play: Error.play,
};

export const LoginFlow: Story = {
  name: '입력과 기본 버튼',
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    getRouter().push.mockClear();
    const id = canvas.getByLabelText(/아이디$/, { selector: 'input' });
    const password = canvas.getByLabelText(/비밀번호/, { selector: 'input' });
    await userEvent.click(canvas.getByRole('button', { name: '로그인' }));
    await expect(canvas.queryByRole('alert')).not.toBeInTheDocument();
    await fireEvent.change(id, { target: { value: 'preview-user' } });
    await expect(id).toHaveValue('preview-user');
    await fireEvent.change(password, { target: { value: 'preview-password' } });
    await expect(password).toHaveValue('preview-password');
    await userEvent.click(canvas.getByRole('button', { name: '비밀번호 보기' }));
    await expect(password).toHaveAttribute('type', 'text');
    await userEvent.click(canvas.getByRole('button', { name: '비밀번호 숨기기' }));
    await expect(password).toHaveAttribute('type', 'password');
    await userEvent.click(canvas.getByRole('checkbox', { name: '아이디 저장' }));
    await expect(canvas.getByRole('checkbox', { name: '아이디 저장' })).toBeChecked();
    await userEvent.click(canvas.getByRole('button', { name: '로그인' }));
    await userEvent.click(password);
    await userEvent.keyboard('{Enter}');
    await expect(id).toHaveValue('preview-user');
    await expect(password).toHaveValue('preview-password');
    await expect(canvas.queryByRole('alert')).not.toBeInTheDocument();
    await expect(getRouter().push).not.toHaveBeenCalled();
    await expect(canvas.getByRole('link', { name: '회원가입' })).toHaveAttribute('href', '/signup');
    await expect(canvas.getByRole('link', { name: '아이디/비밀번호 찾기' })).toHaveAttribute(
      'href',
      '/login/find-account',
    );
    for (const name of ['카카오 로그인', '네이버 로그인']) {
      await userEvent.click(canvas.getByRole('button', { name }));
      await expect(canvas.queryByRole('alert')).not.toBeInTheDocument();
    }
  },
};

export const MobileLoginFlow: Story = { ...Mobile, play: LoginFlow.play };

export const FixedErrors: Story = {
  ...Error,
  play: async (context) => {
    await Error.play?.(context);
    const canvas = within(context.canvasElement);
    await fireEvent.change(canvas.getByLabelText(/아이디$/, { selector: 'input' }), {
      target: { value: 'tester' },
    });
    await fireEvent.change(canvas.getByLabelText(/비밀번호/, { selector: 'input' }), {
      target: { value: 'Hoka12345!' },
    });
    await expect(canvas.getByLabelText(/아이디$/, { selector: 'input' })).toHaveValue('tester');
    await expect(canvas.getByLabelText(/비밀번호/, { selector: 'input' })).toHaveValue(
      'Hoka12345!',
    );
    await userEvent.click(canvas.getByRole('button', { name: '로그인' }));
    await expect(canvas.getAllByRole('alert')).toHaveLength(2);
    await expect(canvas.getByLabelText(/아이디$/, { selector: 'input' })).toHaveAttribute(
      'aria-invalid',
      'true',
    );
    await expect(canvas.getByLabelText(/비밀번호/, { selector: 'input' })).toHaveAttribute(
      'aria-invalid',
      'true',
    );
  },
};

export const MobileFixedErrors: Story = { ...Mobile, ...FixedErrors };
