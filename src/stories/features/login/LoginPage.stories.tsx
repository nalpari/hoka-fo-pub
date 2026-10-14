import type { Meta, StoryObj } from '@storybook/react';
import { LoginContent } from '@/shared/features/login/LoginContent';

const meta = {
  title: 'Pages/AUTH/Login',
  component: LoginContent,
  args: {
    id: '',
    password: '',
    rememberId: false,
    notice: null,
    onIdChange: () => {},
    onPasswordChange: () => {},
    onRememberChange: () => {},
    onSubmit: (event) => event.preventDefault(),
    onFindAccount: () => {},
    onUnavailable: () => {},
  },
} satisfies Meta<typeof LoginContent>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Mobile: Story = {
  decorators: [
    (Story) => (
      <div className="platform-mobile" style={{ width: 375 }}>
        <Story />
      </div>
    ),
  ],
};

export const Error: Story = {
  args: { notice: { tone: 'error', message: '아이디와 비밀번호를 모두 입력해 주세요.' } },
};
