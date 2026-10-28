import type { StoryObj } from '@storybook/react';

import base, * as scenarios from './AccountLockedPage.scenarios';

const meta = {
  ...base,
  title: 'PAGES/로그인/5. 계정 잠금 안내/Mobile',
  globals: { viewport: 'hoka375' },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = { ...scenarios.Mobile, name: 'Default' };
