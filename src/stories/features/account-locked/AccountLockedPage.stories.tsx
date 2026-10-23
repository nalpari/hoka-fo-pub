import type { StoryObj } from '@storybook/react';
import base, * as scenarios from './AccountLockedPage.scenarios';

const meta = {
  ...base,
  title: 'PAGES/로그인/5. 계정 잠금 안내/WEB',
  globals: { viewport: 'hoka1600' },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = { ...scenarios.Default, name: 'Default' };

export const ConfirmNavigation: Story = {
  ...scenarios.ConfirmNavigation,
  name: '확인 후 이동',
};

export const CloseNavigation: Story = { ...scenarios.CloseNavigation, name: '닫기 후 이동' };

export const EscapeNavigation: Story = { ...scenarios.EscapeNavigation, name: 'Escape로 닫기' };
