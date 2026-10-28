import type { StoryObj } from '@storybook/react';
import base, * as scenarios from './PhoneVerificationPage.scenarios';

const meta = {
  ...base,
  title: 'PAGES/회원가입/2. 휴대폰 인증/Mobile',
  globals: { viewport: 'hoka375' },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = { ...scenarios.Mobile, name: 'Default' };

export const FieldErrors: Story = { ...scenarios.MobileFieldErrors, name: '입력 오류' };

export const RequiredAgreements: Story = {
  ...scenarios.MobileRequiredAgreements,
  name: '필수 약관동의',
};

export const CodeEntry: Story = { ...scenarios.MobileCodeEntry, name: '인증번호 입력' };

export const Completion: Story = {
  ...scenarios.SignupCompletion,
  name: '인증 완료 흐름',
  decorators: scenarios.Mobile.decorators,
};
