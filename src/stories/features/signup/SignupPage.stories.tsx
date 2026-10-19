import type { Meta, StoryObj } from '@storybook/react';
import { expect, userEvent, within } from 'storybook/test';
import { PlatformProvider } from '@/shared/context/platform';
import { SignupPage } from '@/shared/features/signup/SignupPage';

const meta = {
  title: 'Pages/AUTH/Signup',
  component: SignupPage,
  decorators: [
    (Story, context) => {
      const platform = context.parameters.platform === 'mobile' ? 'mobile' : 'web';

      return (
        <>
          <PlatformProvider platform={platform}>
            <div className={`platform-${platform}`}>
              <Story />
            </div>
          </PlatformProvider>
        </>
      );
    },
  ],
  parameters: { nextjs: { navigation: { pathname: '/signup' } }, layout: 'fullscreen' },
} satisfies Meta<typeof SignupPage>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Mobile: Story = {
  parameters: { platform: 'mobile' },
  globals: { viewport: 'hoka375' },
};

export const Details: Story = {
  parameters: { nextjs: { navigation: { query: { step: 'details' } } } },
};

export const MobileDetails: Story = {
  ...Details,
  parameters: { ...Details.parameters, platform: 'mobile' },
  globals: { viewport: 'hoka375' },
};

export const Terms: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole('button', { name: '만 14세 이상 회원가입' }));
  },
};

export const PasswordValidation: Story = {
  ...Details,
  tags: ['password-policy'],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.type(canvas.getByLabelText(/이름/), '홍길동');
    await userEvent.type(canvas.getByLabelText(/이메일/), 'demo@example.com');
    await userEvent.type(canvas.getByLabelText(/아이디/), 'hoka-demo');
    const password = canvas.getByLabelText(/비밀번호/, { selector: 'input' });
    await expect(password).toHaveAttribute('placeholder', '영문, 숫자, 특수문자 포함 10~12자');
    await userEvent.type(password, '12345678');
    await userEvent.click(canvas.getByRole('button', { name: '가입 완료' }));
    await expect(password).toHaveAttribute('aria-invalid', 'true');
    await expect(password).toHaveAccessibleDescription(
      '영문, 숫자, 특수문자를 모두 포함하여 10~12자로 입력해 주세요',
    );
    await expect(
      canvas.queryByRole('heading', { name: '회원가입이 완료되었습니다.' }),
    ).not.toBeInTheDocument();
    await userEvent.clear(password);
    await userEvent.type(password, 'Hoka12345!');
    await userEvent.click(canvas.getByRole('button', { name: '가입 완료' }));
    await expect(canvas.getByRole('heading', { name: '회원가입이 완료되었습니다.' })).toBeVisible();
  },
};

export const MobilePasswordValidation: Story = {
  ...PasswordValidation,
  tags: ['password-policy'],
  parameters: { ...Details.parameters, platform: 'mobile' },
  globals: { viewport: 'hoka375' },
  play: PasswordValidation.play,
};
