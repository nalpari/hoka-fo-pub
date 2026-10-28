import type { StoryObj } from '@storybook/react';

import base, * as scenarios from './FindAccountPage.scenarios';

const meta = {
  ...base,
  title: 'PAGES/로그인/1. 아이디·비밀번호 찾기/WEB',
  globals: { viewport: 'hoka1600' },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = { ...scenarios.Default, name: 'Default' };

export const Error: Story = { ...scenarios.Error, name: '오류' };

export const CodeEntry: Story = { ...scenarios.CodeEntry, name: '인증번호 입력' };

export const IdResult: Story = { ...scenarios.IdResult, name: '아이디찾기 결과' };

export const ResetFromResult: Story = {
  ...scenarios.ResetFromResult,
  name: '찾기 결과에서 비밀번호 재설정',
};
