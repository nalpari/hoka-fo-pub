import type { StoryObj } from '@storybook/react';
import base, * as scenarios from './LoginPage.scenarios';

const meta = {
  ...base,
  title: 'PAGES/로그인/0. 로그인/Mobile',
  globals: { viewport: 'hoka375' },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = { ...scenarios.Mobile, name: 'Default' };

export const RememberIdHelp: Story = {
  ...scenarios.MobileRememberIdHelp,
  name: '아이디 저장 안내',
};

export const Error: Story = { ...scenarios.MobileError, name: '오류' };

export const LoginFlow: Story = { ...scenarios.MobileLoginFlow, name: '로그인 흐름' };

export const InvalidFormats: Story = { ...scenarios.MobileInvalidFormats, name: '입력 형식 오류' };
