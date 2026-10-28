import { getRouter } from '@storybook/nextjs-vite/navigation.mock';
import type { Meta, StoryObj } from '@storybook/react';
import { expect, fireEvent, userEvent, within } from 'storybook/test';
import { PlatformProvider } from '@/context/platform';

import AccountUnlockVerificationPage from '@/app/login/account-locked/verification/page';
import PhoneVerificationPage from '@/app/signup/verify/phone/page';
import { PhoneVerificationContent } from '@/components/phone-verification/PhoneVerificationContent';
import { assertAccountFormLayout } from '@/stories/utils/assertAccountFormLayout';

const meta = {
  title: 'PAGES/회원가입/2. 휴대폰 인증',
  component: PhoneVerificationContent,
  parameters: { layout: 'fullscreen' },
  args: {
    information: {
      name: '',
      birthDate: '',
      nationality: '내국인',
      gender: '남자',
      carrier: 'SKT',
      phone: '',
    },
    agreements: [false, false, false, false],
    requested: false,
    code: '',
    secondsLeft: 180,
    resendWait: 180,
    notice: '',
    detail: null,
    onInformationChange: () => {},
    onAgreementChange: () => {},
    onAllAgree: () => {},
    onCodeChange: () => {},
    onRequest: () => {},
    onConfirm: (event) => event.preventDefault(),
    onDetail: () => {},
  },
} satisfies Meta<typeof PhoneVerificationContent>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvasElement }) => assertAccountFormLayout(canvasElement, 500),
};

export const AccountUnlock: Story = {
  play: Default.play,
  args: {
    title: '계정 잠금 해제',
    description:
      '해킹, 계정탈취 시도 등의 보안이슈로 인하여 계정이잠금 처리되었습니다. 계속 이용 하시려면 본인인증을 통하여 계정잠금을 해제해 주세요.',
  },
};

export const Mobile: Story = {
  parameters: { layout: 'fullscreen' },
  play: Default.play,
  decorators: [
    (Story) => (
      <PlatformProvider platform="mobile">
        <div className="platform-mobile" style={{ width: '100%', maxWidth: 375 }}>
          <Story />
        </div>
      </PlatformProvider>
    ),
  ],
};

export const MobileFieldErrors: Story = {
  parameters: { layout: 'fullscreen' },
  ...Mobile,
  args: {
    fieldErrors: {
      name: '올바른 이름을 입력해주세요',
      birthDate: '생년월일을 입력해주세요',
      gender: '성별을 입력해주세요',
      carrier: '통신사를 선택해주세요',
    },
  },
};

export const MobileAccountUnlock: Story = {
  parameters: { layout: 'fullscreen' },
  ...Mobile,
  args: AccountUnlock.args,
};

export const CodeEntry: Story = {
  play: Default.play,
  args: { requested: true, code: '900668', secondsLeft: 125, resendWait: 125 },
};

export const Expired: Story = {
  play: Default.play,
  args: {
    noticeTone: 'error',
    requested: true,
    secondsLeft: 0,
    resendWait: 0,
    notice: '인증 시간이 만료되었습니다. 인증번호를 재요청해 주세요.',
  },
};

export const Interactive: Story = { render: () => <PhoneVerificationPage /> };

export const RequiredAgreements: Story = {
  render: () => <PhoneVerificationPage />,
  tags: ['signup-phone-feedback'],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.type(canvas.getByLabelText(/이름/), '홍길동');
    await userEvent.type(canvas.getByLabelText(/생년월일/), '19900522');
    await userEvent.type(canvas.getByLabelText(/휴대폰 번호/), '01012345678');
    await userEvent.click(canvas.getByRole('button', { name: '인증번호 요청' }));
    await expect(canvas.getByRole('alert')).toHaveTextContent('필수 약관에 모두 동의해 주세요.');
    await expect(canvas.getByRole('alert')).toHaveStyle({ color: 'rgb(166, 0, 0)' });
    await expect(
      canvas.getByRole('region', { name: '휴대폰 인증약관' }),
    ).toHaveAccessibleDescription('필수 약관에 모두 동의해 주세요.');
    const terms = canvas.getAllByRole('checkbox', { name: /필수/ });
    await userEvent.click(terms[0]);
    await expect(terms[0]).not.toHaveAttribute('aria-invalid', 'true');
    for (const term of terms.slice(1)) await expect(term).toHaveAttribute('aria-invalid', 'true');
    await expect(canvas.getByRole('alert')).toBeVisible();
    await userEvent.click(canvas.getByRole('checkbox', { name: '모두동의' }));
    await expect(canvas.queryByRole('alert')).not.toBeInTheDocument();
    await userEvent.click(canvas.getByRole('button', { name: '인증번호 요청' }));
    await expect(canvas.getByRole('status')).toHaveAttribute('data-tone', 'info');
    await userEvent.click(terms[0]);
    await userEvent.click(canvas.getByRole('button', { name: '인증번호 확인' }));
    await expect(canvas.getByRole('alert')).toHaveTextContent('필수 약관에 모두 동의해 주세요.');
    await expect(
      within(canvasElement.ownerDocument.body).queryByRole('dialog'),
    ).not.toBeInTheDocument();
  },
};

export const MobileRequiredAgreements: Story = {
  parameters: { layout: 'fullscreen' },
  ...RequiredAgreements,
  tags: ['signup-phone-feedback'],
  decorators: Mobile.decorators,
  globals: { viewport: 'hoka375' },
  play: RequiredAgreements.play,
};

export const MobileCodeEntry: Story = {
  parameters: { layout: 'fullscreen' },
  ...Mobile,
  args: CodeEntry.args,
};

async function enterVerificationCode(canvasElement: HTMLElement) {
  const canvas = within(canvasElement);
  await fireEvent.change(canvas.getByLabelText(/이름/), { target: { value: '홍길동' } });
  await expect(canvas.getByLabelText(/이름/)).toHaveValue('홍길동');
  await fireEvent.change(canvas.getByLabelText(/생년월일/), { target: { value: '19900522' } });
  await expect(canvas.getByLabelText(/생년월일/)).toHaveValue('19900522');
  await fireEvent.change(canvas.getByLabelText(/휴대폰 번호/), {
    target: { value: '01012345678' },
  });
  await expect(canvas.getByLabelText(/휴대폰 번호/)).toHaveValue('01012345678');
  await userEvent.click(canvas.getByRole('checkbox', { name: '모두동의' }));
  await userEvent.click(canvas.getByRole('button', { name: '인증번호 요청' }));
  await expect(canvas.getByRole('status')).toHaveAttribute('data-tone', 'info');
  await fireEvent.change(canvas.getByLabelText(/인증번호/), { target: { value: '123456' } });
  await expect(canvas.getByLabelText(/인증번호/)).toHaveValue('123456');
  await userEvent.click(canvas.getByRole('button', { name: '인증번호 확인' }));
}

export const SignupCompletion: Story = {
  render: () => <PhoneVerificationPage />,
  play: async ({ canvasElement }) => {
    await enterVerificationCode(canvasElement);
    const page = within(canvasElement.ownerDocument.body);
    const dialog = await page.findByRole('dialog', { name: '회원가입' });
    await expect(dialog).toHaveTextContent('이미 가입된 회원이 있습니다');
    await userEvent.click(within(dialog).getByRole('button', { name: '확인' }));
    await expect(getRouter().push).toHaveBeenCalledWith('/signup');
  },
};

export const AccountUnlockCompletion: Story = {
  render: () => <AccountUnlockVerificationPage />,
  play: async ({ canvasElement }) => {
    await enterVerificationCode(canvasElement);
    await expect(getRouter().push).toHaveBeenCalledWith('/login/account-locked/complete');
    await expect(
      within(canvasElement.ownerDocument.body).queryByRole('dialog'),
    ).not.toBeInTheDocument();
  },
};
