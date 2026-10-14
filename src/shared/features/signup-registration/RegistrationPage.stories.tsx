import type { Meta, StoryObj } from '@storybook/react';
import { MemoryRouter } from 'react-router-dom';
import { PlatformProvider } from '@/shared/context/platform';
import { RegistrationContent } from './RegistrationContent';
import { RegistrationPage } from './RegistrationPage';
import { RegistrationCompleteContent } from './RegistrationCompleteContent';

const meta = {
  title: 'Pages/AUTH/Registration',
  component: RegistrationContent,
  decorators: [
    (Story) => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    ),
  ],
  args: {
    stage: 'information',
    information: {
      name: '',
      password: '',
      confirmation: '',
      birthDate: '19830522',
      phone: '010-6698-5552',
      postalCode: '',
      address: '',
      addressDetail: '',
      email: '',
      domain: '',
      anniversary: '',
    },
    preferences: { email: 'no', coupon: 'no', sms: 'no', married: 'no' },
    domainChoice: 'direct',
    notice: '',
    duplicateNotice: '',
    addressOpen: false,
    fieldErrors: { email: '', domain: '', name: '', password: '', confirmation: '' },
    onChange: () => {},
    onPreferenceChange: () => {},
    onDomainChoice: () => {},
    onDuplicateCheck: () => {},
    onAddressOpen: () => {},
    onSubmit: (event) => event.preventDefault(),
    onCancel: () => {},
  },
} satisfies Meta<typeof RegistrationContent>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Mobile: Story = {
  decorators: [
    (Story) => (
      <div className="platform-mobile" style={{ width: 375 }}>
        <PlatformProvider platform="mobile">
          <Story />
        </PlatformProvider>
      </div>
    ),
  ],
};

export const Additional: Story = { args: { stage: 'additional' } };

export const MobileAdditional: Story = {
  args: { stage: 'additional' },
  decorators: [
    (Story) => (
      <div className="platform-mobile" style={{ width: 375 }}>
        <PlatformProvider platform="mobile">
          <Story />
        </PlatformProvider>
      </div>
    ),
  ],
  globals: { viewport: 'hoka375' },
};

export const Error: Story = {
  args: {
    fieldErrors: {
      email: '올바른 이메일 형식으로 입력해 주세요',
      domain: '올바른 도메인 형식으로 입력해 주세요',
      name: '올바른 이름을 입력해주세요',
      password: '영문, 숫자, 특수문자를 모두 포함하여 10~12자로 입력해 주세요',
      confirmation: '비밀번호가 일치하지 않습니다',
    },
  },
};

export const Complete: Story = { render: () => <RegistrationCompleteContent /> };

export const Interactive: Story = { render: () => <RegistrationPage /> };
