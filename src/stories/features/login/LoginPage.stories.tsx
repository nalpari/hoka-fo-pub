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

export const LoginFlow: Story = { ...scenarios.LoginFlow, name: '로그인 흐름' };

export const InvalidFormats: Story = { ...scenarios.InvalidFormats, name: '입력 형식 오류' };

export const UnavailableActions: Story = {
  ...scenarios.UnavailableActions,
  name: '미지원 기능 안내',
};
