import type { StoryObj } from '@storybook/react';
import base, * as scenarios from './SignupTermsPage.scenarios';

const meta = {
  ...base,
  title: 'PAGES/회원가입/3. 약관동의/WEB',
  globals: { viewport: 'hoka1600' },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = { ...scenarios.Default, name: 'Default' };

export const RequiredNotice: Story = { ...scenarios.RequiredNotice, name: '필수 약관 안내' };

export const Detail: Story = { ...scenarios.Detail, name: '약관 상세' };

export const PreviousPicker: Story = { ...scenarios.PreviousPicker, name: '이전 약관 선택' };

export const Interactive: Story = { ...scenarios.Interactive, name: '입력 흐름' };

export const DetailInteraction: Story = {
  ...scenarios.DetailInteraction,
  name: '약관 상세 확인',
};
