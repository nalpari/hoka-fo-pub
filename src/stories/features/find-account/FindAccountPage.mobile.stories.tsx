import type { StoryObj } from '@storybook/react';

import base, * as scenarios from './FindAccountPage.scenarios';

const meta = {
  ...base,
  title: 'PAGES/로그인/1. 아이디·비밀번호 찾기/Mobile',
  globals: { viewport: 'hoka375' },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = { ...scenarios.Mobile, name: 'Default' };

export const Error: Story = { ...scenarios.MobileError, name: '오류' };

export const IdResult: Story = { ...scenarios.MobileIdResult, name: '아이디찾기 결과' };
