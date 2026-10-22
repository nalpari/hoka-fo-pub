import type { StoryObj } from '@storybook/react';
import base, * as scenarios from './RegistrationPage.scenarios';

const meta = {
  ...base,
  title: 'PAGES/회원가입/4. 회원 정보 입력/WEB',
  globals: { viewport: 'hoka1600' },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = { ...scenarios.Default, name: 'Default' };

export const Additional: Story = { ...scenarios.Additional, name: '추가 정보 입력' };

export const Error: Story = { ...scenarios.Error, name: '오류' };

export const Complete: Story = { ...scenarios.Complete, name: '완료' };

export const Interactive: Story = { ...scenarios.Interactive, name: '입력 흐름' };

export const PasswordValidation: Story = {
  ...scenarios.PasswordValidation,
  name: '비밀번호 검증',
};

export const EmailCheckState: Story = { ...scenarios.EmailCheckState, name: '이메일 중복확인' };

export const AddressSearch: Story = { ...scenarios.AddressSearch, name: '주소 검색' };
