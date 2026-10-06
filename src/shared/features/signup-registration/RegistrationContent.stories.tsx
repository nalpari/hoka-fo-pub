import type { Meta, StoryObj } from '@storybook/react';
import { MemoryRouter } from 'react-router-dom';
import { RegistrationContent } from './RegistrationContent';
import { RegistrationPage } from './RegistrationPage';
import { RegistrationCompleteContent } from './RegistrationCompleteContent';

const meta = {
  title: 'Pages/Auth/Registration',
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
      id: '',
      name: '',
      password: '',
      confirmation: '',
      birthDate: '',
      phone: '',
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
        <Story />
      </div>
    ),
  ],
};

export const Additional: Story = { args: { stage: 'additional' } };

export const Error: Story = { args: { notice: '비밀번호 재입력 값이 일치하지 않습니다.' } };

export const Complete: Story = { render: () => <RegistrationCompleteContent /> };

export const Interactive: Story = { render: () => <RegistrationPage /> };
