import { expect, userEvent, within } from 'storybook/test';
import FindAccountPage from '@/app/login/find-account/page';
import PhoneVerificationPage from '@/app/signup/verify/phone/page';
import AccountUnlockVerificationPage from '@/app/login/account-locked/verification/page';
import { PhoneVerificationContent } from '@/components/features/phone-verification/PhoneVerificationContent';
import RegistrationPage from '@/app/signup/information/page';
import SignupTermsPage from '@/app/signup/terms/page';
import type { AuditStory as Story } from './shared';
import { enterAddress } from './enterAddress';

export const FindAccount: Story = {
  render: () => <FindAccountPage />,
  play: async ({ canvasElement }) => {
    const c = within(canvasElement);
    await userEvent.click(c.getByRole('button', { name: '인증번호 요청' }));
    await expect(c.getByLabelText(/이름/)).toHaveAttribute('aria-invalid', 'true');
    await expect(c.getByLabelText(/휴대폰 번호/)).toHaveAttribute('aria-invalid', 'true');
    await userEvent.type(c.getByLabelText(/이름/), '홍길동');
    await userEvent.type(c.getByLabelText(/휴대폰 번호/), '01012345678');
    await userEvent.click(c.getByRole('button', { name: '인증번호 요청' }));
    await userEvent.click(c.getByRole('button', { name: '인증번호 확인' }));
    await expect(c.getByLabelText('* 인증번호', { exact: true })).toHaveAttribute(
      'aria-invalid',
      'true',
    );
    await userEvent.type(c.getByLabelText('* 인증번호', { exact: true }), '900668');
    await userEvent.click(c.getByRole('button', { name: '인증번호 확인' }));
    await expect(within(canvasElement.ownerDocument.body).getByRole('dialog')).toHaveTextContent(
      'honggildong',
    );
    await expect(c.getByLabelText('* 인증번호', { exact: true })).not.toHaveAttribute(
      'aria-invalid',
    );
  },
};

export const Phone: Story = {
  render: () => <PhoneVerificationPage />,
  play: async ({ canvasElement }) => {
    const c = within(canvasElement);
    await userEvent.click(c.getByRole('button', { name: '인증번호 요청' }));
    for (const name of [/이름/, /생년월일/, /휴대폰 번호/])
      await expect(c.getByLabelText(name)).toHaveAttribute('aria-invalid', 'true');
    await userEvent.type(c.getByLabelText(/이름/), '홍길동');
    await userEvent.type(c.getByLabelText(/생년월일/), '19900522');
    await userEvent.type(c.getByLabelText(/휴대폰 번호/), '01012345678');
    await userEvent.click(c.getByRole('checkbox', { name: '모두동의' }));
    await userEvent.click(c.getByRole('button', { name: '인증번호 요청' }));
    await expect(c.getByRole('status')).toHaveAttribute('data-tone', 'info');
    await userEvent.click(c.getByRole('button', { name: '인증번호 확인' }));
    await expect(c.getByLabelText(/인증번호/)).toHaveAttribute('aria-invalid', 'true');
    await userEvent.type(c.getByLabelText(/인증번호/), '123456');
    await expect(c.getByLabelText(/인증번호/)).not.toHaveAttribute('aria-invalid');
  },
};

export const PhoneExpired: Story = {
  render: () => (
    <PhoneVerificationContent
      information={{
        name: '',
        birthDate: '',
        nationality: '내국인',
        gender: '남자',
        carrier: 'SKT',
        phone: '',
      }}
      agreements={[true, true, true, true]}
      requested
      code=""
      secondsLeft={0}
      resendWait={0}
      notice="인증 시간이 만료되었습니다."
      noticeTone="error"
      detail={null}
      onInformationChange={() => {}}
      onAgreementChange={() => {}}
      onAllAgree={() => {}}
      onCodeChange={() => {}}
      onRequest={() => {}}
      onConfirm={(e) => e.preventDefault()}
      onDetail={() => {}}
    />
  ),
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByRole('alert')).toHaveStyle({ color: 'rgb(166, 0, 0)' });
  },
};

export const PhoneUnlock: Story = {
  render: () => <AccountUnlockVerificationPage />,
  play: Phone.play,
};

export const Registration: Story = {
  render: () => <RegistrationPage />,
  play: async ({ canvasElement }) => {
    const c = within(canvasElement);
    await userEvent.click(c.getByRole('button', { name: '다음' }));
    for (const id of [
      'email',
      'domain',
      'name',
      'password',
      'confirmation',
      'postalCode',
      'address',
      'addressDetail',
    ])
      await expect(canvasElement.querySelector(`#registration-${id}`)).toHaveAttribute(
        'aria-invalid',
        'true',
      );
    await userEvent.type(c.getByLabelText(/이름/), '홍길동');
    await expect(c.getByLabelText(/이름/)).not.toHaveAttribute('aria-invalid');
    await userEvent.type(c.getByLabelText(/이메일 주소/), 'demo');
    await userEvent.type(c.getByLabelText(/도메인/, { selector: 'input' }), 'example.com');
    await userEvent.click(c.getByRole('button', { name: '이메일 중복확인' }));
    await expect(c.getByRole('status')).toHaveAttribute('data-tone', 'info');
    await userEvent.type(
      c.getByLabelText(/비밀번호/, { selector: '#registration-password' }),
      'Hoka12345!',
    );
    await userEvent.type(c.getByLabelText(/비밀번호 재확인/), 'Hoka12345!');
    await userEvent.click(c.getByRole('button', { name: '다음' }));
    await expect(c.getByRole('status')).toHaveAttribute('data-tone', 'info');
    await enterAddress(canvasElement, '주소 찾기');
    await userEvent.type(c.getByLabelText(/상세주소/), '101호');
    await userEvent.click(c.getByRole('button', { name: '다음' }));
    await expect(c.getByRole('heading', { name: '부가 정보' })).toBeVisible();
  },
};

export const SignupTerms: Story = {
  render: () => <SignupTermsPage />,
  play: async ({ canvasElement }) => {
    const c = within(canvasElement);
    await userEvent.click(c.getByRole('button', { name: '확인' }));
    await expect(c.getByRole('alert')).toHaveStyle({ color: 'rgb(166, 0, 0)' });
    const required = c.getAllByRole('checkbox', { name: /필수/ });
    await userEvent.click(required[0]);
    await expect(required[0]).not.toHaveAttribute('aria-invalid', 'true');
    for (const input of required.slice(1)) {
      await expect(input).toHaveAttribute('aria-invalid', 'true');
      await userEvent.click(input);
    }
    await expect(c.queryByRole('alert')).not.toBeInTheDocument();
  },
};
