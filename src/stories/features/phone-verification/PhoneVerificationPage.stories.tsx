import type { StoryObj } from '@storybook/react';
import base, * as scenarios from './PhoneVerificationPage.scenarios';

const meta = {
  ...base,
  title: 'PAGES/회원가입/2. 휴대폰 인증/WEB',
  globals: { viewport: 'hoka1600' },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = { ...scenarios.Default, name: 'Default' };

export const AccountUnlock: Story = { ...scenarios.AccountUnlock, name: '계정 잠금 해제' };

export const CodeEntry: Story = { ...scenarios.CodeEntry, name: '인증번호 입력' };

export const Expired: Story = { ...scenarios.Expired, name: '인증시간 만료' };

export const Interactive: Story = { ...scenarios.Interactive, name: '입력 흐름' };

export const RequiredAgreements: Story = {
  ...scenarios.RequiredAgreements,
  name: '필수 약관동의',
};
