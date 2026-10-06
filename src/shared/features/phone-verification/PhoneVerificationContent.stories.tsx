import type { Meta, StoryObj } from '@storybook/react';
import { PhoneVerificationContent } from './PhoneVerificationContent';
import { PhoneVerificationPage } from './PhoneVerificationPage';

const meta = {
  title: 'Pages/Auth/PhoneVerification',
  component: PhoneVerificationContent,
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

export const CodeEntry: Story = {
  args: { requested: true, code: '900668', secondsLeft: 125, resendWait: 125 },
};

export const Expired: Story = {
  args: {
    requested: true,
    secondsLeft: 0,
    resendWait: 0,
    notice: '인증 시간이 만료되었습니다. 인증번호를 재요청해 주세요.',
  },
};

export const Interactive: Story = { render: () => <PhoneVerificationPage /> };
