import type { StoryObj } from '@storybook/react';

import base, * as scenarios from './LoginPage.scenarios';

const meta = {
  ...base,
  title: 'PAGES/로그인/0. 로그인/WEB',
  globals: { viewport: 'hoka1600' },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = { ...scenarios.Default, name: 'Default' };

export const RememberIdHelp: Story = { ...scenarios.RememberIdHelp, name: '아이디 저장 안내' };

export const Error: Story = { ...scenarios.Error, name: '오류' };

export const LoginFlow: Story = { ...scenarios.LoginFlow, name: '입력과 기본 버튼' };

export const FixedErrors: Story = { ...scenarios.FixedErrors, name: '입력 후에도 고정 오류 유지' };
