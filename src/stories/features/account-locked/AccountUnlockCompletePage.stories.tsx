import type { StoryObj } from '@storybook/react';
import base, * as scenarios from './AccountUnlockCompletePage.scenarios';

const meta = {
  ...base,
  title: 'PAGES/AUTH/AccountUnlockCompletePage/Web',
  globals: { viewport: 'hoka1600' },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = { ...scenarios.Default, name: 'Default' };
