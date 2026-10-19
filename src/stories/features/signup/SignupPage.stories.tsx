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
    await userEvent.type(canvas.getByLabelText(/아이디/), 'hokademo1');
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

export const FieldValidation: Story = {
  ...Details,
  tags: ['signup-phone-feedback'],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.type(canvas.getByLabelText(/이름/), '홍길동');
    await userEvent.type(canvas.getByLabelText(/비밀번호/, { selector: 'input' }), 'Hoka12345!');
    const email = canvas.getByLabelText(/이메일/);
    const id = canvas.getByLabelText(/아이디/);
    await userEvent.type(email, 'demo@example');
    await userEvent.type(id, 'ab');
    const submit = canvas.getByRole('button', { name: '가입 완료' });
    await userEvent.click(submit);
    await expect(email).toHaveAccessibleDescription('올바른 이메일 형식으로 입력해 주세요');
    await expect(id).toHaveAccessibleDescription('영문, 숫자 조합으로 4자 이상 입력해 주세요.');
    await userEvent.clear(email);
    await userEvent.type(email, 'first..last@example.com');
    await userEvent.clear(id);
    await userEvent.type(id, 'hoka-demo');
    await userEvent.click(submit);
    await expect(email).toHaveAttribute('aria-invalid', 'true');
    await expect(id).toHaveAttribute('aria-invalid', 'true');
    await userEvent.clear(email);
    await userEvent.type(email, 'demo@example.com');
    await userEvent.clear(id);
    await userEvent.type(id, 'hokademo1');
    await userEvent.click(submit);
    await expect(canvas.getByRole('heading', { name: '회원가입이 완료되었습니다.' })).toBeVisible();
  },
};

export const MobileFieldValidation: Story = {
  ...FieldValidation,
  tags: ['signup-phone-feedback'],
  parameters: { ...Details.parameters, platform: 'mobile' },
  globals: { viewport: 'hoka375' },
  play: FieldValidation.play,
};
