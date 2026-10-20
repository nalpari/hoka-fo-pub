import type { StoryObj } from '@storybook/react';
import base, * as scenarios from './AccountUnlockCompletePage.scenarios';

const meta = {
  ...base,
  title: 'PAGES/AUTH/AccountUnlockCompletePage/Mobile',
  globals: { viewport: 'hoka375' },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = { ...scenarios.Mobile, name: 'Default' };
