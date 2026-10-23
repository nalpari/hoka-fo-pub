import type { StoryObj } from '@storybook/react';
import base, * as scenarios from './RegistrationPage.scenarios';

const meta = {
  ...base,
  title: 'PAGES/회원가입/4. 회원 정보 입력/Mobile',
  globals: { viewport: 'hoka375' },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = { ...scenarios.Mobile, name: 'Default' };

export const Additional: Story = { ...scenarios.MobileAdditional, name: '추가 정보 입력' };

export const PasswordValidation: Story = {
  ...scenarios.MobilePasswordValidation,
  name: '비밀번호 검증',
};

export const EmailCheckState: Story = {
  ...scenarios.MobileEmailCheckState,
  name: '이메일 중복확인',
};

export const AddressSearch: Story = { ...scenarios.MobileAddressSearch, name: '주소 검색' };
