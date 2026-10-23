import type { StoryObj } from '@storybook/react';
import base, * as scenarios from './SignupPage.scenarios';

const meta = {
  ...base,
  title: 'PAGES/회원가입/0. 회원가입 안내/WEB',
  globals: { viewport: 'hoka1600' },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = { ...scenarios.Default, name: 'Default' };

export const KakaoUnavailable: Story = { ...scenarios.KakaoUnavailable, name: '카카오 가입 안내' };
