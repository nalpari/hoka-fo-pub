import type { StoryObj } from '@storybook/react';
import base, * as scenarios from './AccountUnlockCompletePage.scenarios';

const meta = {
  ...base,
  title: 'PAGES/로그인/7. 계정 잠금 해제 완료/WEB',
  globals: { viewport: 'hoka1600' },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = { ...scenarios.Default, name: 'Default' };
