import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { expect, userEvent, within } from 'storybook/test';
import { PlatformProvider } from '@/shared/context/platform';
import { RegistrationContent } from '@/shared/features/signup-registration/RegistrationContent';
import { RegistrationPage } from '@/shared/features/signup-registration/RegistrationPage';
import { RegistrationCompleteContent } from '@/shared/features/signup-registration/RegistrationCompleteContent';

const meta = {
  title: 'Pages/AUTH/Registration',
  component: RegistrationContent,
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

export const PasswordValidation: Story = {
  render: () => <RegistrationPage />,
  tags: ['password-policy'],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const password = canvas.getByLabelText(/비밀번호/, { selector: '#registration-password' });
    await userEvent.type(password, 'Hoka1234 !');
    await userEvent.click(canvas.getByRole('button', { name: '다음' }));
    await expect(password).toHaveAttribute('aria-invalid', 'true');
    await expect(password).toHaveAccessibleDescription(
      '영문, 숫자, 특수문자를 모두 포함하여 10~12자로 입력해 주세요',
    );
    await userEvent.clear(password);
    await userEvent.type(password, 'Hoka12345!');
    await userEvent.click(canvas.getByRole('button', { name: '다음' }));
    await expect(password).not.toHaveAttribute('aria-invalid');
  },
};

export const MobilePasswordValidation: Story = {
  ...PasswordValidation,
  tags: ['password-policy'],
  decorators: Mobile.decorators,
  globals: { viewport: 'hoka375' },
  play: PasswordValidation.play,
};

function AddressSearchPreview() {
  const [information, setInformation] = useState(meta.args.information);

  const [addressOpen, setAddressOpen] = useState(true);

  return (
    <RegistrationContent
      {...meta.args}
      information={information}
      addressOpen={addressOpen}
      onAddressOpen={setAddressOpen}
      onChange={(key, value) => setInformation((current) => ({ ...current, [key]: value }))}
    />
  );
}

export const AddressSearch: Story = { render: () => <AddressSearchPreview /> };

export const MobileAddressSearch: Story = {
  render: () => <AddressSearchPreview />,
  decorators: Mobile.decorators,
  globals: { viewport: 'hoka375' },
};
